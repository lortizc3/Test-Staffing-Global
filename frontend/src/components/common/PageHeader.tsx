import { Stack, Typography } from '@mui/material';

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Stack spacing={0.5} mb={2}>
      <Typography variant="h5">{title}</Typography>
      <Typography color="text.secondary">{subtitle}</Typography>
    </Stack>
  );
}
