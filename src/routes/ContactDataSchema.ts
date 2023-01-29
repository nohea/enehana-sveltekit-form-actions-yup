import { object, string, number, date, type InferType, array } from 'yup';

export const ContactDataSchema = object({
  contacttype: string().required(),
  name: string().required(),
});
