<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData, PageData } from "./$types";
	import { ProfileFormData } from "./ProfileFormData";

    export let data: PageData;
    export let form: ActionData;

    $: formMode = 'create';

    // formDefault must match the shape of the form to be rendered 
    // and also fill in the defaults or the prior form submission w/ validation errors
    $: formDefault = setFormDefault(form?.formValue);
    // $: console.log('formDefault ', formDefault);
    // $: console.log('form.formValue changed ', form?.formValue);
    // $: setFormDefault(form?.formValue);
    
    function setFormDefault(formValue) {
        if(formValue) {
            console.log('setFormDefault() from form.formValue');
            console.log('formValue: ', formValue);
            return formValue;
        }
        else {
            console.log('setFormDefault() from new ProfileFormData()');
            return new ProfileFormData();
        }
    }

    function toggleFormMode() {
        if(formMode === 'create') {
            formMode = 'update';
        }
        else {
            formMode = 'create';
        }
    }
</script>

<main>
<div>
	<h1>SvelteKit Form Actions bound to TypeScript class + Validation (yup)</h1>

	<h4>Test Form</h4>

    {#if data}
        <div>data: {JSON.stringify(data)}</div>
    {/if}
    {#if form}
        <div>form: {JSON.stringify(form)}</div>
    {/if}

    <form method="POST" action="?/{formMode}" use:enhance>
		<div>
			<label for="fullname"> Mode '{formMode}'</label>
            <button on:click|preventDefault={toggleFormMode}>{formMode} [toggle]</button>
        </div>

        {#if formMode === 'update'}
			<input
				type="hidden"
				name="id"
                value={formDefault.id}
			/>
            <div>id: {formDefault.id}</div>
        {/if}

        <div>
			<label for="fullname"> Full Name </label>
			<input
				type="text"
				name="fullname"
				class=""
				placeholder="Full Name"
                bind:value={formDefault.fullname}
			/>
            {#if form?.errors?.fullname}
            <span class="error-text">{form?.errors?.fullname}</span>
            {/if}
		</div>

        <div>
			<label for="email"> Email </label>
			<input
				type="text"
				name="email"
				class=""
				placeholder="email"
                bind:value={formDefault.email}
			/>
            {#if form?.errors?.email}
            <span class="error-text">{form?.errors?.email}</span>
            {/if}
		</div>

        <div>
			<label for="profile.address">Profile Address </label>
			<input
				type="text"
				name="profile.address"
				class=""
				placeholder="Profile Address"
                bind:value={formDefault.profile.address}
			/>
            {#if form?.errors?.['profile.address']}
            <span class="error-text">{form?.errors['profile.address']}</span>
            {/if}
		</div>

        <!-- dynamic section -->
        <h3>Contacts</h3>
        {#if formDefault?.contacts }
            {#each formDefault.contacts as c, idx}
                <div>
                    <label for="contacts.{idx}.contacttype">contact type </label>
                    <input
                        type="text"
                        name="contacts.{idx}.contacttype"
                        class=""
                        placeholder="contact type"
                        bind:value={formDefault.contacts[idx].contacttype}
                    />
                    {#if form?.errors?.[`contacts[${idx}].contacttype`]}
                    <span class="error-text">{form?.errors?.[`contacts[${idx}].contacttype`]}</span>
                    {/if}
                    <span>formDefault.contacts[{idx}]: {JSON.stringify(formDefault.contacts[idx])}</span>
                </div>
                <div>
                    <label for="contacts.{idx}.name">contact name </label>
                    <input
                        type="text"
                        name="contacts.{idx}.name"
                        class=""
                        placeholder="contact name"
                        bind:value={formDefault.contacts[idx].name}
                    />
                    {#if form?.errors?.[`contacts[${idx}].name`]}
                    <span class="error-text">{form?.errors?.[`contacts[${idx}].name`]}</span>
                    {/if}
                </div>
            {/each}
            <div>
                <a href="#" class="btn" on:click|preventDefault={() => {
                    formDefault.contacts = [
                        ...formDefault.contacts
                        , { contacttype: '', name: '', }
                    ]
                }}>add a contact</a>
            </div>
    
        {/if}

		<input type="submit" name="submit" value="submit button" />
	</form>

    <div>formDefault.contacts: {JSON.stringify(formDefault?.contacts)}</div>
    <div>form?.formValue: {JSON.stringify(form?.formValue)}</div>
</div>

<!-- <div>
	<b>$form: </b>
	<pre>{JSON.stringify($form)}</pre>
</div>
<div>
	<b>$errors: </b>
	<pre>{JSON.stringify($errors)}</pre>
</div> -->

</main>

<style>
    label {
        display: inline-block;
        width: 200px;
    }

	.error-text {
		color: red;
        display: inline-block;
	}

    .btn {
        border: 1px dotted blue;
    }
</style>
