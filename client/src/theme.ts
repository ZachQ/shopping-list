import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, sans-serif',
    button: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '20px',
      letterSpacing: '0px',
      backgroundColor: '#1871E8',
    },
  },
  palette: {
    primary: {
      main: '#4D81B7',
    },
    secondary: {
        main: '#1871E8',
    },
    text: {
      primary: '#000000',
      secondary: '#7D7A7A',
    },
  },
});

export default theme;