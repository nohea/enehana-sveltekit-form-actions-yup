import { ProfileFormDataSchema } from 'src/routes/ProfileFormDataSchema';
import { assert, describe, it } from 'vitest'

// Only this suite (and others marked with only) are run
describe.only('profile form validate', () => {
  it('test', async () => {

    // do create
    const formValue = {
        id: '454',
        fullname: 'Mock existing name',
        profile: {
          address: 'out there',
          gender: undefined,
        },
        contacts: [
          {email: 'ked@example.com', name: 'K Ed', contacttype: 'regular',},
          {email: 'noone@example.com', name: 'No One', contacttype: '',},
        ]
      };
    
        

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

