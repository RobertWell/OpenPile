import React, { lazy, Suspense } from "react"

import AppNav from "./components/AppNav"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import "./App.scss"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

// stackable: 放在Grid即可!
// Popup 無法使用...(需要jQuery......)
// 整套系統只有JQuery的Example，導致動態很難實現...用semantic-ui-react

const BlogLazy = lazy(() => import("./pages/Blog"))

function App() {
  return (
    <div className="App">
      <AppNav />

      <div className="m-padding-tb-large m-container">
        <Suspense fallback={<div>Loading</div>}>
          <Switch>
            <Route path="/blog" component={BlogLazy} />
            <Route path="/" component={Home} />
          </Switch>
        </Suspense>
      </div>

      <Footer />
    </div>
  )
}

export default App
