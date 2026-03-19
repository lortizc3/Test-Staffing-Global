import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, MenuItem, Stack, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { authApi } from '../api/auth.api';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useAuth } from '../features/auth/auth-context';

type FormValues = {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'MEMBER';
};

export function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t('auth.validation.nameMin')),
        email: z.string().email(t('auth.validation.email')),
        password: z.string().min(8, t('auth.validation.passwordMin')),
        role: z.enum(['ADMIN', 'MEMBER'], { message: t('auth.validation.requiredRole') }),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'MEMBER' },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setError('');
      const response = await authApi.register(values);
      login(response.token, response.user);
      navigate('/app');
    } catch {
      setError(t('auth.register.error'));
    }
  };

  return (
    <AuthLayout title={t('auth.register.pageTitle')} subtitle={t('auth.register.pageSubtitle')}>
      <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <Stack spacing={2}>
          {error ? <Alert severity="error">{error}</Alert> : null}
          <TextField label={t('auth.register.name')} fullWidth {...register('name')} error={Boolean(errors.name)} helperText={errors.name?.message} />
          <TextField label={t('auth.register.email')} fullWidth {...register('email')} error={Boolean(errors.email)} helperText={errors.email?.message} />
          <TextField label={t('auth.register.password')} type="password" fullWidth {...register('password')} error={Boolean(errors.password)} helperText={errors.password?.message} />
          <TextField select label={t('auth.register.role')} fullWidth defaultValue="MEMBER" {...register('role')} error={Boolean(errors.role)} helperText={errors.role?.message}>
            <MenuItem value="MEMBER">{t('auth.roles.MEMBER')}</MenuItem>
            <MenuItem value="ADMIN">{t('auth.roles.ADMIN')}</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>{t('auth.register.submit')}</Button>
          <Button component={Link} to="/login">{t('auth.register.login')}</Button>
        </Stack>
      </form>
    </AuthLayout>
  );
}
