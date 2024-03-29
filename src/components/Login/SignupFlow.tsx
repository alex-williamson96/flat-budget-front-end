import { useState } from "react";
import AuthService from "../../services/security/auth-service";

export interface UserSignup {
  username: string,
  password: string,
  email: string,
}

const SignupFlow = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    console.log(username, email, password);
    (document.getElementById('signupModal') as HTMLFormElement).close();
    (document.getElementById('loginModal') as HTMLFormElement).close();

    const user = AuthService.register({ username, email, password }).then(
      (res) => {

      }
    );
  }

  return (
    <div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs" value={username} onChange={e => setUsername(e.target.value)} />
        <label className="label">
        </label>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input type="text" placeholder="user@flatbudget.com" className="input input-bordered w-full max-w-xs" value={email} onChange={e => setEmail(e.target.value)} />
        <label className="label">
        </label>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" value={password} onChange={e => setPassword(e.target.value)} />
        <label className="label">
        </label>
      </div>
      <div className="btn btn-secondary" onClick={onSubmit}>Create New Account</div>
    </div>
  )
}

export default SignupFlow;