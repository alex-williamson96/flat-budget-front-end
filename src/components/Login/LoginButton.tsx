import ModalButtonTemplate from "../Modal/ModalButtonTemplate";
import LoginFlow from "./LoginFlow";

const LoginButton = () => {
  return (
    <ModalButtonTemplate template={<LoginFlow />} uniqueModalName="loginModal" buttonText="Log in" />
  );
};

export default LoginButton;
