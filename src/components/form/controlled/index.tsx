import { useUserStore } from '@components/core/store/useIUserStore.ts';
import AutocompleteField from '@components/country';
import FormField from '@components/form/field';
import UploadImage from '@components/upload/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { type JSX } from 'react';
import { type SubmitHandler, useForm, Controller } from 'react-hook-form';

import type { TCloseFormDataProps } from '@/type';
import { registerSchema, userFormDefaultValues, type TFormSchema } from '@/validation/form.ts';

import styles from './controlled.module.scss';

const ControlledFormData = ({ onClose }: TCloseFormDataProps) => {
  const setUserData = useUserStore((state) => state.setUserData);

  const { control, handleSubmit, formState } = useForm<TFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: userFormDefaultValues,
    mode: 'onChange',
  });

  const { isValid } = formState;

  const onSubmit: SubmitHandler<TFormSchema> = (data): void => {
    try {
      setUserData(data);
      onClose();
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h3>Controlled</h3>
      <Controller
        name={'email'}
        control={control}
        render={({ field, fieldState }): JSX.Element => (
          <FormField
            {...field}
            label={'Email: '}
            type={'email'}
            autoFocus
            error={fieldState.error?.message || ''}
            placeholder={'example@gmail.com'}
          />
        )}
      />
      <Controller
        name={'password'}
        control={control}
        render={({ field, fieldState }): JSX.Element => (
          <FormField
            {...field}
            label={'Password: '}
            type={'password'}
            error={fieldState.error?.message || ''}
            placeholder={'************'}
          />
        )}
      />
      <Controller
        name={'confirmPassword'}
        control={control}
        render={({ field, fieldState }): JSX.Element => (
          <FormField
            {...field}
            label={'confirmPassword: '}
            type={'password'}
            error={fieldState.error?.message || ''}
            placeholder={'************'}
          />
        )}
      />
      <Controller
        name={'name'}
        control={control}
        render={({ field, fieldState }): JSX.Element => (
          <FormField
            {...field}
            label={'Name: '}
            type={'text'}
            error={fieldState.error?.message || ''}
            placeholder={'example'}
          />
        )}
      />
      <Controller
        name={'age'}
        control={control}
        render={({ field, fieldState }): JSX.Element => (
          <FormField
            {...field}
            label={'Age: '}
            type={'number'}
            min={1}
            max={99}
            error={fieldState.error?.message || ''}
          />
        )}
      />
      <Controller
        name={'gender'}
        control={control}
        render={({ field, fieldState }): JSX.Element => (
          <FormField
            {...field}
            type={'radio'}
            options={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ]}
            error={fieldState.error?.message || ''}
          />
        )}
      />
      <Controller
        name="country"
        control={control}
        render={({ field, fieldState }) => (
          <AutocompleteField
            {...field}
            label="Country: "
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name={'avatarBase64'}
        control={control}
        render={({ field, fieldState }): JSX.Element => (
          <UploadImage {...field} error={fieldState.error?.message || ''} />
        )}
      />
      <Controller
        name={'accept'}
        control={control}
        render={({ field, fieldState }): JSX.Element => (
          <FormField
            {...field}
            type={'checkbox'}
            label={'I accept Terms and Conditions'}
            value={field.value ? 'on' : ''}
            onChange={(e) => field.onChange(e.target.checked)}
            error={fieldState.error?.message || ''}
          />
        )}
      />
      <button type={'submit'} disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default ControlledFormData;
