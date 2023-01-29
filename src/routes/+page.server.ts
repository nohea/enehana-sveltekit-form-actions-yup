import { mockProfileData } from '$lib/MockData';
import type { Actions } from '@sveltejs/kit';
import { flatten, unflatten } from 'flat';
import { ProfileFormData } from './ProfileFormData';
import { ProfileFormDataSchema } from './ProfileFormDataSchema';

let profileFormDataSchema = ProfileFormDataSchema;
const validateOptions = {
  abortEarly: false,
  strict: true,
  recursive: true,
};

// formValue will model the form rendering
// it could be a default value, or else a validation error response to modify and resubmit
let formValue: {[key: string]: string};

export const actions: Actions = {
  create: async ({ cookies, request }) => {
    console.log("action: create");
    const fd = await request.formData();
    console.log("fd.forEach() ");
    fd.forEach((val, key) => {
      console.log(`${key}: `, val);
    });
    //formValue = formDataToProfileData(fd);
    formValue = formDataToFormValue(fd);
    console.log("formValue ", formValue);

    // do create
    try {
      const result = await profileFormDataSchema.validate(formValue, validateOptions);
    }
    catch(error) {
      console.log('error: ', error);
      console.log('error.value: ', error.value);
      const errors = error.inner.reduce((acc, err) => {
        return { ...acc, [err.path]: err.message };
      }, {});
      console.log('errors: ', errors);

      return {
        status: 'error',
        errors: errors,
        formValue: {...error.value},
      };
    }
     
    return { 
      status: 'inserted',
      formValue,
    };
  },
  update: async ({ cookies, request }) => {
    console.log("action: update");
    formValue = mockProfileData();
    console.log("formValue ", formValue);
    console.log("flatten(formValue) ", flatten(formValue));
    console.log("unflatten(formValue) ", unflatten(flatten(formValue)));

    // do update
     
    return { 
      status: 'updated',
      formValue,
    };
  }
};

function formDataToFormValue(fd: FormData) {
  console.log('formDataToFormValue()');
  const formMap: {[key: string]: string} = {};

  for(const key of fd.keys()) {
    const val = fd.get(key) as string;
    console.log('val ', val);
    formMap[key] = val || '';
  }

  const formValue = unflatten(formMap);
  console.log('unflatten(formMap): ', formValue);
  return formValue;

  // const pd = new ProfileFormData({...formMap});
  // return pd;
}

