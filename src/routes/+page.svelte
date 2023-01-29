<script lang="ts">
	import type { ActionData, PageData } from "./$types";
	import { ProfileFormData } from "./ProfileFormData";

    export let data: PageData;
    export let form: ActionData;

    $: formMode = 'create';

    // formDefault must match the shape of the form to be rendered 
    // and also fill in the defaults or the prior form submission w/ validation errors
    let formDefault: {[key: string]: string} = form?.formValue ? {...form?.formValue} : new ProfileFormData();

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

    <form method="POST" action="?/{formMode}">
		<div>
			<label for="fullname"> Mode '{formMode}'</label>
            <button on:click|preventDefault={toggleFormMode}>{formMode} [toggle]</button>
        </div>

        <div>
			<label for="fullname"> Full Name </label>
			<input
				type="text"
				name="fullname"
				class=""
				placeholder="Full Name"
                value={formDefault.fullname}
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
                value={formDefault.email}
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
                value={formDefault.profile.address || ''}
			/>
            {#if form?.errors?.['profile.address']}
            <span class="error-text">{form?.errors['profile.address']}</span>
            {/if}
		</div>

        <!-- dynamic section -->
        <h3>Contacts</h3>
        {#if formDefault?.contacts?.length > 0 }
            {#each formDefault.contacts as c, idx}
                <div>
                    <label for="contacts.{idx}.contacttype">contact type </label>
                    <input
                        type="text"
                        name="contacts.{idx}.contacttype"
                        class=""
                        placeholder="contact type"
                        value={formDefault.contacts[idx]?.contacttype}
                    />
                    {#if form?.errors?.[`contacts[${idx}].contacttype`]}
                    <span class="error-text">{form?.errors?.[`contacts[${idx}].contacttype`]}</span>
                    {/if}
                </div>
                <div>
                    <label for="contacts.{idx}.name">contact name </label>
                    <input
                        type="text"
                        name="contacts.{idx}.name"
                        class=""
                        placeholder="contact name"
                        value={formDefault.contacts[idx]?.name}
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
