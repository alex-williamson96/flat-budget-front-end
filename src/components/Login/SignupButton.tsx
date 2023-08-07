import ModalButtonTemplate from "../Modal/ModalButtonTemplate";
import SignupFlow from "./SignupFlow";

const SignupButton = () => {
    return (<ModalButtonTemplate template={<SignupFlow />} uniqueModalName="signupModal" buttonText="Sign up" buttonColor="secondary"/>)
}

export default SignupButton;