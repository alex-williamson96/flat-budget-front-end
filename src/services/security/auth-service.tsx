import { UserSignup } from "../../components/Login/SignupFlow";
import useAuthStore from "../../stores/auth-store";
import { RequestHelper } from "../requests";

const baseURL = "http://localhost:8080/api/v1/security/auth";

const requestHelper = new RequestHelper(baseURL);

const login = async (username: string, password: string) => {
  return await requestHelper.post('/signIn', {
    username, password
  });
}

const register = async (user: UserSignup) => {
  return await requestHelper.post(
    '/register',
    user
  );
}

const refreshToken = async () => {
  return await requestHelper.post('/refreshToken', {});

}

const AuthService = {
  login,
  register,
  refreshToken
}

export default AuthService;