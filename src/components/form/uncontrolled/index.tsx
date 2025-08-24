import { useUserStore } from '@components/core/store/useIUserStore.ts';
import AutocompleteField from '@components/country';
import FormField from '@components/form/field';
import UploadImage from '@components/upload/image';
import { useRef, useState } from 'react';
import * as React from 'react';
import z from 'zod';

import type { TCloseFormDataProps } from '@/type';
import { registerSchema } from '@/validation/form.ts';

import styles from './uncontrolled.module.scss';

type FormErrors = Record<string, string>;

const UncontrolledFormData = ({ onClose }: TCloseFormDataProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [avatarBase64, setAvatarBase64] = useState<string>('');
  const [country, setCountry] = useState('');
  const setUserData = useUserStore((state) => state.setUserData);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    const transformedData = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      name: data.name,
      age: data.age,
      gender: data.gender as 'male' | 'female',
      accept: Boolean(data.accept),
      avatarBase64,
      country,
    };

    try {
      setErrors({});
      registerSchema.parse(transformedData);
      setUserData(transformedData);
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};

        error.issues.forEach((err) => {
          const fieldName = typeof err.path[0] === 'string' ? err.path[0] : '_form';

          fieldErrors[fieldName] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
      <h3>Uncontrolled</h3>
      <FormField
        type={'email'}
        name={'email'}
        label={'Email '}
        placeholder={'example@gmail.com'}
        error={errors.email}
      />
      <FormField
        type={'password'}
        name={'password'}
        label={'Password '}
        placeholder={'************'}
        error={errors.password}
      />
      <FormField
        type={'password'}
        name={'confirmPassword'}
        label={'Confirm Password '}
        placeholder={'************'}
        error={errors.confirmPassword}
      />
      <FormField type={'text'} name={'name'} label={'Name '} placeholder={'example'} error={errors.name} />
      <FormField type={'number'} name={'age'} label={'Age '} min={1} max={99} error={errors.age} />
      <FormField
        type={'radio'}
        name={'gender'}
        options={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ]}
        error={errors.gender}
      />
      <AutocompleteField
        label="Country: "
        name="country"
        value={country}
        onChange={setCountry}
        error={errors.country}
      />
      <UploadImage name={'avatar'} onFileChange={setAvatarBase64} error={errors.avatarBase64} />
      <FormField type={'checkbox'} name={'accept'} label={'I accept Terms and Conditions'} error={errors.accept} />
      <button type={'submit'}>Submit</button>
    </form>
  );
};

export default UncontrolledFormData;
