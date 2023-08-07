import { Link } from "wouter";
import LoginFlow from "../components/Login/LoginFlow";
import LoginButton from "../components/Login/LoginButton";
import SignupButton from "../components/Login/SignupButton";

const Login = () => {
    return <div className="flex justify-center h-screen w-full p-10 flex-col">
        <Link to="home"><button type="button" className="btn">Return home</button></Link>
        <LoginFlow />
    </div>
}

export default Login;