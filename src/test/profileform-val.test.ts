import { ProfileFormData } from 'src/routes/ProfileFormData';
import { ProfileFormDataSchema } from 'src/routes/ProfileFormDataSchema';
import { assert, describe, it } from 'vitest'
import type { string } from 'yup';

// Only this suite (and others marked with only) are run
describe.only('profile form validate', () => {
  it('test', async () => {

    // do create
    const formValue = mockProfileData();
    const validateOptions = {
        abortEarly: false,
        strict: true,
        recursive: true,
    };
    try {
        const result = await ProfileFormDataSchema.validate(formValue, validateOptions);
    }
    catch(error) {
        console.log('error ', error);
        assert.equal(error.errors.find((x: string) => x.indexOf('.contacttype is a required field') >= 0), 'contacts[1].contacttype is a required field');
    }

  })
})

