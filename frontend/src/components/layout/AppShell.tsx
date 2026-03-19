import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Avatar, Box, Button, Chip, Container, Stack, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../features/auth/auth-context';
import { LanguageSwitcher } from '../common/LanguageSwitcher';

export function AppShell() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: 'linear-gradient(180deg, #F7F8FF 0%, #EEF7FF 100%)',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="xl">
        <Stack gap={3}>
          <Box
            sx={{
              p: { xs: 2.5, md: 3 },
              borderRadius: 6,
              background: 'linear-gradient(135deg, #24124D 0%, #5B3DF5 50%, #00B8D9 100%)',
              color: 'white',
            }}
          >
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={3}>
              <Box>
                <Typography variant="h4">{t('app.name')}</Typography>
                <Typography mt={1} sx={{ opacity: 0.9 }}>
                  {t('app.tagline')}
                </Typography>
              </Box>

              <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5} alignItems={{ xs: 'flex-start', sm: 'center' }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar>{user?.name?.charAt(0)}</Avatar>
                  <Box>
                    <Typography fontWeight={700}>{user?.name}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {user?.email}
                    </Typography>
                  </Box>
                </Stack>
                <Chip label={user ? t(`auth.roles.${user.role}`) : ''} color="secondary" variant="filled" />
                <LanguageSwitcher />
                <Button
                  variant="contained"
                  color="warning"
                  startIcon={<AddTaskRoundedIcon />}
                  onClick={() => navigate('/app/tasks/new')}
                >
                  {t('app.actions.newTask')}
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<LogoutRoundedIcon />}
                  onClick={() => void logout()}
                >
                  {t('common.logout')}
                </Button>
              </Stack>
            </Stack>
          </Box>
          <Outlet />
        </Stack>
      </Container>
    </Box>
  );
}
