import { object, string, number, date, type InferType, array } from 'yup';
import { ContactDataSchema } from './ContactDataSchema';
import { ProfileDataSchema } from './ProfileDataSchema';

export const ProfileFormDataSchema = object({
  fullname: string().required(),
  email: string().email().required(),
  profile: ProfileDataSchema,
  contacts: array(ContactDataSchema),
});

