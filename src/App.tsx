import { Route, Switch } from "wouter";
import "./App.css";
import LoginButton from "./components/Login/LoginButton";
import SignupButton from "./components/Login/SignupButton";
import Menu from "./components/Menu/Menu";
import Login from "./routes/login";
import Home from "./routes/landing-page/home";

function App() {
  const isLoggedIn = false;

  if (isLoggedIn) {
    return <Menu />
  }
  return <div>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
      <Route component={Home} />
    </Switch>
  </div>;
}

export default App;
