import { alpha, createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#5B3DF5' },
    secondary: { main: '#00B8D9' },
    success: { main: '#16A34A' },
    warning: { main: '#F59E0B' },
    error: { main: '#E11D48' },
    background: {
      default: '#F4F7FB',
      paper: '#FFFFFF',
    },
  },
  shape: { borderRadius: 5 },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: `0 18px 45px ${alpha('#5B3DF5', 0.08)}`,
          border: `1px solid ${alpha('#5B3DF5', 0.08)}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          paddingInline: 18,
        },
      },
    },
  },
});
