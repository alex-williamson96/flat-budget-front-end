import { useAuth0 } from "@auth0/auth0-react";
import ModalButtonTemplate from "../Modal/ModalButtonTemplate";
import LoginFlow from "./LoginFlow";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    // <ModalButtonTemplate template={<LoginFlow />} uniqueModalName="loginModal" buttonText="Log in" />
    <button className="btn btn-primary" onClick={() => loginWithRedirect().finally(
      () => {
        return;
      }
    )}>Log In</button>
  );
};

export default LoginButton;
