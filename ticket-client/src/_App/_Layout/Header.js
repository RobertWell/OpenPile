import { CssBaseline } from "@material-ui/core";
import CustomAppBar from "./CustomAppBar/CustomAppBar";
import SideDrawer from "./SideDrawer";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { useActions } from "hooks/useActions";
import { useHistory } from "react-router-dom";
import { GroupList } from "Composables/GroupList";
// import {buildClient} from "@api"

function Scroll(props) {
  const { children, window } = props;

  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 1,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

Scroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};



const Header = ({ drawerWidth, user, anchor, ...others }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawer = () => setOpenDrawer(!openDrawer);
  const [tabItem, setTabItem] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // console.log("----------tabItem", tabItem);
    if (tabItem !== false)
      history.push(`/CategorizedProduct/${GroupList[tabItem]["path"]}`);
  }, [tabItem]);

  const { sign_out } = useActions();
  const SignOutHandler = () => {
    sign_out();
    history.push("/");
  };
  // console.log(user);

  const SignInHandler = () => {
    history.push("/auth/login");
  };

  const AuthCenterHander = () => {
    history.push("/identity");
  };

  const AboutUsHandler =()=>{
    history.push('/AboutUs')
  }

  const width = anchor === "top" || anchor === "bottom" ? null : drawerWidth;

  return (
    <div>
      <CssBaseline />
      <Scroll {...others}>
        <CustomAppBar
          setTabItem={setTabItem}
          GroupList={GroupList}
          drawerWidth={width}
          handleDrawer={handleDrawer}
          user={user}
        />
      </Scroll>

      <SideDrawer
        GroupList={GroupList}
        anchor={anchor}
        handleDrawer={handleDrawer}
        openDrawer={openDrawer}
        drawerWidth={width}
        user={user}
        SignOutHandler={SignOutHandler}
        SignInHandler={SignInHandler}
        AuthCenterHander={AuthCenterHander}
        AboutUsHandler={AboutUsHandler}
      />
            <CssBaseline />
    </div>
  );
};

export default Header;
