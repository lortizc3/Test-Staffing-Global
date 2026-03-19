import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Stack, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { authApi } from '../api/auth.api';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useAuth } from '../features/auth/auth-context';

type FormValues = {
  email: string;
  password: string;
};

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const schema = useMemo(
    () =>
      z.object({
        email: z.string().email(t('auth.validation.email')),
        password: z.string().min(8, t('auth.validation.passwordMin')),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: 'admin@teamboard.dev', password: 'Admin123*' },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setError('');
      const response = await authApi.login(values);
      login(response.token, response.user);
      navigate('/app');
    } catch {
      setError(t('auth.login.error'));
    }
  };

  return (
    <AuthLayout title={t('auth.login.pageTitle')} subtitle={t('auth.login.pageSubtitle')}>
      <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <Stack spacing={2}>
          {error ? <Alert severity="error">{error}</Alert> : null}
          <TextField label={t('auth.login.email')} fullWidth {...register('email')} error={Boolean(errors.email)} helperText={errors.email?.message} />
          <TextField label={t('auth.login.password')} type="password" fullWidth {...register('password')} error={Boolean(errors.password)} helperText={errors.password?.message} />
          <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>{t('auth.login.submit')}</Button>
          <Button component={Link} to="/register">{t('auth.login.register')}</Button>
        </Stack>
      </form>
    </AuthLayout>
  );
}
