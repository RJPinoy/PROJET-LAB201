import * as React from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);

    if (isLoading) {
        setIsLoading(false);
    }

    const signIn = async () => {
        console.log('email : ', email.target.value, 'password : ', password.target.value)
        setIsLoading(true);
        try {
            const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email.target.value, password.target.value);
            console.log(response)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div>
                <h2>Login</h2>
                <input placeholder='Email' required={ true } onInput={ setEmail }/>
                <input placeholder='Password' type="password" required={ true } onInput={ setPassword } />
                {
                    isLoading ? 
                    <p>Loading...</p>
                    :
                    <div>
                        <button onClick={ signIn }>Sign in</button>
                        <Link to={ '/' }>
                            <button>Continue as invited</button>
                        </Link>
                    </div>
                }
            </div>
        </>
    );
}
 
export default Login;