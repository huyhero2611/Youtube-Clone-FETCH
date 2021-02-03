import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";
function Application() {
  const user = null;
  return user ? (
    <ProfilePage />
  ) : (
    <Router>
      <Switch>
        <Route path="signUp" component={<SignUp />} />
        <Route path="/" component={<SignIn />} />
        <Route path="passwordReset" component={<PasswordReset />} />
      </Switch>
    </Router>
  );
}
export default Application;
