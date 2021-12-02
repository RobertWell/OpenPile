// import logo from './logo.svg';
import "./App.css";
import Layout from "./Layout";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Employees from "../pages/Employees";
const theme = createTheme({
  palette: {
    primary: {
      light: "#8793c7",
      main: "#253053",
      dark: "#00072a",
      contrastText: "#f6f6f6",
    },
    secondary: {
      light: "#cb8ce6",
      main: "#7b1fa2",
      dark: "#4a0072",
      contrastText: "#f6f6f6",
    },

    third:{
      light: "#63a4ff",
      main: "#1976d2",
      dark: "#004ba0",
      contrastText: "#f6f6f6",
    },

  },

  typography: {
    fontFamily: "Noto Sans TC",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",

  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)',
      }
    }
  },
  props:{
    MuiIconButton:{
      // disableRipple:true
    }
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout>
        <Employees />

        </Layout>
        <CssBaseline />
      </ThemeProvider>
    </div>
  );
}

export default App;
