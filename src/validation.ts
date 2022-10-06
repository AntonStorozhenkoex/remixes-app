import { boolean, number, object, string } from 'yup';

export const validationSchema = object({
  name: string()
    .required('Name is required')
    .min(3, 'Min length is 3 characters')
    .max(50, 'Max length is 50 characters'),
  authorEmail: string().required('Author email is required').email('Email invalid'),
  isStore: boolean(),
  description: string().max(500, 'Max length is 500 characters'),
  price: number()
    .required('Price is required')
    .min(1, 'Min value is 1')
    .max(1000, 'Max value is 1000 '),
  trackLength: number()
    .required('Track length email is required')
    .min(1, 'Min value is 1')
    .max(300, 'Max value is 300'),
  genre: string().required('Genre email is required')
});
