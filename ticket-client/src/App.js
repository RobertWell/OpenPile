// import logo from './logo.svg';
import "./_App/App.css";
import Layout from "./_App/Layout";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Switch, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Progress, ProtectedRoute, Snack } from "Components";
import Home from "./pages/Home";
import { useActions } from "./hooks/useActions";
import { useSelector } from "react-redux";
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 432,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      light: "#5e92f3",
      main: "#1565c0",
      dark: "#003c8f",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#82e9de",
      main: "#4db6ac",
      dark: "#00867d",
      contrastText: "#ffffff",
    },

    third: {
      light: "#ffffff",
      main: "#e0e0e0",
      dark: "#aeaeae",
      contrastText: "#303030",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
  },
  brand_icon: {
    512: "assets/burn-512.png",
  },

  typography: {
    fontFamily: [
      "Noto Sans TC",
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    // htmlFontSize: 10,
  },
  spot_background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",

  overrides: {
    MuiAppBar: {
      root: {
        // transform:'translateZ(0)',
      },
    },
  },
  props: {
    MuiIconButton: {
      // disableRipple:
    },
  },
});

const LogLazy = lazy(() => import("./pages/LogPage"));
const BuildLazy = lazy(() => import("./pages/BuildProduct"));
const ProductLazy = lazy(() => import("./pages/Product"));
const TicketLazy = lazy(() => import("./pages/Tickets"));
const OrderLazy = lazy(() => import("./pages/Order"));
const AuthCenterLazy = lazy(() => import("./pages/AuthCenter"));
const CategorizedProductLazy = lazy(() => import("./pages/CategorizedProduct"));
const AboutUsLazy = lazy(() => import("./pages/AboutUs"));

function App() {
  const location = useLocation();
  const { current_user, fetch_tickets, delete_tickets } = useActions();
  useEffect(() => {
    current_user(fetch_tickets, delete_tickets);
  }, [location.pathname, current_user]);

  const auth = useSelector((state) => state.auth);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout>
          <Suspense fallback={<Progress />}>            
            <Switch>
              <ProtectedRoute
                allow={auth.email}
                path="/identity"
                redirect="/auth/login"
              >
                <AuthCenterLazy />
              </ProtectedRoute>
              <Route path="/auth">
                <LogLazy />
              </Route>

              <ProtectedRoute
                allow={auth.email}
                path="/build"
                redirect="/auth/login"
              >
                <BuildLazy />
              </ProtectedRoute>
              <ProtectedRoute
                allow={auth.email}
                path="/ticket"
                redirect="/auth/login"
              >
                <TicketLazy />
              </ProtectedRoute>
              <ProtectedRoute
                allow={auth.email}
                path="/order/:id"
                redirect="/auth/login"
              >
                <OrderLazy />
              </ProtectedRoute>

              <Route path="/product/:id">
                <ProductLazy />
              </Route>
              <Route path="/CategorizedProduct/:group">
                <CategorizedProductLazy />
              </Route>
              <Route path="/AboutUs">
                <AboutUsLazy />
              </Route>

              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Suspense>
        </Layout>
        <Snack />
        <CssBaseline />
      </ThemeProvider>
    </div>
  );
}

export default App;
