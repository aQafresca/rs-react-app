import z from 'zod';

const passwordSchema = z
  .string()
  .nonempty({ message: 'field required' })
  .refine((val) => /[A-Z]/.test(val), { message: 'Must contain at least 1 uppercase letter' })
  .refine((val) => /[a-z]/.test(val), { message: 'Must contain at least 1 lowercase letter' })
  .refine((val) => /[0-9]/.test(val), { message: 'Must contain at least 1 number' })
  .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), { message: 'Must contain at least 1 special character' });

export const registerSchema = z
  .object({
    email: z.string().min(1).email({ message: 'invalid email' }),
    password: passwordSchema,
    name: z
      .string()
      .min(1)
      .refine((val) => /^[A-ZА-Я]/.test(val), {
        message: 'Name must start with an uppercase letter',
      }),
    age: z
      .string()
      .nonempty({ message: 'Age is required' })
      .refine(
        (val) => {
          const num = Number(val);

          return !isNaN(num) && num >= 1 && num <= 99;
        },
        { message: 'Age must be a number between 1 and 99' },
      ),
    gender: z.enum(['male', 'female'], {
      message: 'Please select your gender',
    }),
    accept: z.boolean().refine((val) => val === true, {
      message: 'Please accept the agreement',
    }),
    confirmPassword: z.string(),
    country: z.string().nonempty({ message: 'Country is required' }),
    avatarBase64: z
      .string()
      .nonempty({ message: 'File is required' })
      .refine((val) => val.startsWith('data:image/jpeg') || val.startsWith('data:image/png'), {
        message: 'Only PNG or JPEG are allowed',
      })
      .refine(
        (val) => {
          const sizeInBytes = Math.ceil(((val.length - val.indexOf(',') - 1) * 3) / 4);

          return sizeInBytes <= 2 * 1024 * 1024;
        },
        { message: 'File must be smaller than 2MB' },
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type TUserFormInputs = z.infer<typeof registerSchema>;
export type TFormSchema = z.input<typeof registerSchema>;

export const userFormDefaultValues: TUserFormInputs = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  age: '',
  gender: 'male',
  accept: false,
  avatarBase64: '',
  country: '',
};
