import logo from './logo.svg';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Dashboard from './Components/Dashboard';
const THEME = createTheme({
  typography: {
   "fontFamily": `'Rubik', sans-serif`,
   "fontSize": 14,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  }
});

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
