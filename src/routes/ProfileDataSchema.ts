import { object, string, number, date, type InferType, array } from 'yup';

export const ProfileDataSchema = object({
  address: string().required(),
});
