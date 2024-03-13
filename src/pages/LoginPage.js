import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const logInAction = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (exc){
            setError(exc.message);
        }
    }
    return (
        <>
            <h1>Log In</h1>
            {error && <p className="error">{error}</p>}
            <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={logInAction}>Log In</button>
            <Link to="/create-account">Register</Link>
        </>
    )
}
export default LoginPage;