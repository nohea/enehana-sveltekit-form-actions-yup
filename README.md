# enehana-sveltekit-form-actions-yup

SvelteKit Form Actions bound to TypeScript class + Validation (yup)

## running

git clone from github

## Developing

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

# notes

![logical design diagram](static/SvelteKit-Form-Actions-bound-to-TypeScript-class-Validation-yup.png?raw=true)


## SvelteKit page (Profile Form create/update)

+page.svelte

- formDefault is the model for rendering the html form
- The model could be a blank default, a redisplayed for from a prior failed submit, or loaded from a data store (update)
- SvelteKit Form Actions are used, and support use:enhance
- Errors display alongside form fields
- Dynamic arrays are supported

+page.server.ts (Form Actions)

- unflatten(formData)
- validate(formValue)
- return insert|update|error
- errors contain key/error message
- return formValue to redisplay if needed

ProfileFormData.ts (models form render)

ProfileFormDataSchema.ts (yup)

