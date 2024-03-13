import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const createAccountAction = async () => {
        try {
            if (password !== confirmPassword) {
                setError('Password and confirm password do not match');
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (exc) {
            setError(exc.message);
        }
    }
    return (
        <>
            <h1>Create account</h1>
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
            <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button onClick={createAccountAction}>Create account</button>
            <Link to="/login">Log In</Link>
        </>
    )
}
export default CreateAccountPage;