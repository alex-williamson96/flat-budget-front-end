import "./App.css";
import Login from "./routes/login";
import Home from "./routes/landing-page/home";
import Philosophy from "./routes/landing-page/philosophy";
import GetStarted from "./routes/landing-page/get-started";
import { Switch, Route } from "wouter";
import Header from "./components/LandingPage/Header";
import Menu from "./components/Menu/Menu";
import Footer from "./components/UI/Footer/Footer";
import useAuthStore from "./stores/auth-store";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import authConfig from '../config.json'

function App() {
  // const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const [accessToken, setAccessToken] = useState(null);

  const {
    isLoading,
    error,
    isAuthenticated,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,

  } = useAuth0();

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently().catch(data => data);
        setAccessToken(accessToken);
        localStorage.setItem('token', accessToken)
      } catch (e: any) {
        console.log(e)
      }
    };
    getAccessToken();
  }, [getAccessTokenSilently]);



  const securedAPITest = () => {
    fetch("http://localhost:8080/auth0/private", {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (resJson) {
      })
      .catch((e) => console.error(e));
  };

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isAuthenticated) {
    return (
      <div>
        <Menu />
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
