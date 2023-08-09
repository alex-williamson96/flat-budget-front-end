import { useState } from "react";
import SignupFlow from './SignupFlow';
import AuthService from "../../services/security/auth-service";

const LoginFlow = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    (document.getElementById('loginModal') as HTMLFormElement).close();
    console.log('hello')
    const user = AuthService.login(username, password).then(
      (res) => {
        console.log('res:')
        console.log(res)
      }
    );
    console.log(user);
  }

  const handleCreateAccount = () => {
    console.log("handleCreateAccount");
    setShowCreate(!showCreate);
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
          <span className="label-text">Password</span>
        </label>
        <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" value={password} onChange={e => setPassword(e.target.value)} />
        <label className="label">
        </label>
      </div>
      <div className="btn btn-primary" onClick={onSubmit}>Log In</div>
      <div className="divider">Or create an account here!</div>
      <div className="btn btn-accent" onClick={handleCreateAccount}>{showCreate ? 'Close Account Creation' : 'Create Account'}</div>
      {showCreate && <SignupFlow />}
    </div>
  )
}

export default LoginFlow;