import "./App.css";
import Login from "./routes/login";
import Home from "./routes/landing-page/home";
import Philosophy from "./routes/landing-page/philosophy";
import GetStarted from "./routes/landing-page/get-started";
import { Switch, Route } from "wouter";
import Header from "./components/LandingPage/Header";
import Menu from "./components/Menu/Menu";
import Footer from "./components/UI/Footer/Footer";
import useAuthStore from "./stores/authStore";

function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
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
