import { Route, Switch } from "wouter";
import "./App.css";
import Menu from "./components/Menu/Menu";
import Login from "./routes/login";
import Home from "./routes/landing-page/home";
import Footer from "./components/UI/Footer/Footer";
import About from "./routes/landing-page/about";
import Philosophy from "./routes/landing-page/philosophy";
import GetStarted from "./routes/landing-page/get-started";
import Header from "./components/LandingPage/Header";

function App() {
  const isLoggedIn = false;

  if (isLoggedIn) {
    return (
      <div>
        <Menu />
        <Footer />
      </div>)
  }
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/philosophy" component={Philosophy} />
        <Route path="/get-started" component={GetStarted} />
        <Route component={Home} />
      </Switch>
      <Footer />
    </div>);
}

export default App;
