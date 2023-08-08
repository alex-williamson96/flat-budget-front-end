import { Route, Switch } from "wouter";
import "./App.css";
import Menu from "./components/Menu/Menu";
import Login from "./routes/login";
import Home from "./routes/landing-page/home";
import Footer from "./components/UI/Footer/Footer";

function App() {
  const isLoggedIn = false;

  if (isLoggedIn) {
    return (
      <div>
        <Menu />
        <Footer />
      </div>)
  }
  return <div>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
      <Route component={Home} />
    </Switch>
    <Footer />
  </div>;
}

export default App;
