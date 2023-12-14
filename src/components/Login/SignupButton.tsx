import { useAuth0 } from "@auth0/auth0-react";
import ModalButtonTemplate from "../Modal/ModalButtonTemplate";
import SignupFlow from "./SignupFlow";

const SignupButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        // <ModalButtonTemplate template={<SignupFlow />} uniqueModalName="signupModal" buttonText="Sign up" buttonColor="secondary" />
        <button className="btn btn-secondary" onClick={() => loginWithRedirect()}>Sign Up</button>
    )
}

export default SignupButton;