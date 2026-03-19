import { Box, Card, CardContent, Container, Typography } from '@mui/material';

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      sx={{ background: 'linear-gradient(135deg, #24124D 0%, #5B3DF5 45%, #00B8D9 100%)' }}
    >
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 2 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h4">{title}</Typography>
            <Typography color="text.secondary" mt={1} mb={3}>{subtitle}</Typography>
            {children}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
