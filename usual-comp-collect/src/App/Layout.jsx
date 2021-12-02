import { Link } from "react-router-dom";
import { useState } from "react";
import "./Layout.scss";
function Layout({ children }) {
  const [active, setActive] = useState(false);
  return (
    <div className={"container"}>
      <div className={active ? "navigation" : "navigation active"}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/t1">T1: Upload Files/File</Link>
          </li>
          <li>
            <Link to="/t2">T2: Chart.js常用圖</Link>
          </li>
          <li>
            <Link to="/t3">T3: 常見置中對齊</Link>
          </li>

        </ul>
 
      </div>

      <div className={active ? "main active" : "main"}>
        <div className={active ? "topbar active" : "topbar"}>
          <a href="/" className="logo">
            Portfolio
          </a>
          <div
            className={active ? "toggle active" : "toggle"}
            onClick={(e) => {
              setActive(!active);
            }}
          >
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
        </div>
          <div className={'spacer'}>123</div>
        {children}
      </div>
    </div>
  );
}

export default Layout;
