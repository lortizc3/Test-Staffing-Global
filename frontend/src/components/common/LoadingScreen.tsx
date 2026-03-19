import { Box, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export function LoadingScreen() {
  const { t } = useTranslation();

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap={2}
    >
      <CircularProgress />
      <Typography variant="body1">{t('common.loadingApp')}</Typography>
    </Box>
  );
}
