import * as React from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const signIn = async () => {
        setIsLoading(true);
        setError(null); // Clear any previous errors
        try {
            const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log(response);
            // Handle successful sign-in, e.g., redirect the user
        } catch (e) {
            console.error(e);
            setError("Failed to sign in. Please check your credentials."); // Set the error message
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-form">
            <h4>Login</h4>
            <input className="input-field" placeholder='Email' required={true} value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="input-field" placeholder='Password' type="password" required={true} value={password} onChange={(e) => setPassword(e.target.value)} />
            {
                isLoading ?
                    <p>Loading...</p>
                    :
                    <div className="button-container">
                        
            {error && <p className="error-message">{error}</p>} {/* Display error message if there's an error */}
                        <button className="signin-button" onClick={signIn}>Sign in</button>
                    </div>
            }
        </div>
    );
};

export default Login;