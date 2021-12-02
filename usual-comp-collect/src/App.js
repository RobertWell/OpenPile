import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.scss";
import Layout from "./App/Layout";

const T1Lazy = lazy(() => import("./Pages/T1.jsx"));
const T2Lazy = lazy(() => import("./Pages/T2.jsx"));
const T3Lazy = lazy(() => import("./Pages/T3.jsx"));
const HomeLazy = lazy(() => import("./Pages/Home"));
function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Suspense fallback={<p>Loading~~~~</p>}>
            <Switch>
              <Route path="/t1">
                <T1Lazy />
              </Route>
              <Route path="/t2">
                <T2Lazy />
              </Route>
              <Route path="/t3">
                <T3Lazy />
              </Route>
              <Route path="/">
                <HomeLazy />
              </Route>
            </Switch>
          </Suspense>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
