import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#f8be69',
    },
    secondary: {
      main: '#f8be69',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
