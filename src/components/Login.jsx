import * as React from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        console.log('email : ', email, 'password : ', password)
        setIsLoading(true);
        // try {
        //     const response = await signInWithEmailAndPassword(auth, email, password);
        //     console.log(response)
        // } catch (e) {
        //     console.log(e)
        // } finally {
        //     setIsLoading(false);
        // }
    }

    const SignUp = async () => {
        console.log('Should create an account')
        setIsLoading(true);
        // try {
        //     const response = await createUserWithEmailAndPassword(auth, email, password);
        //     console.log(response)
        // } catch (e) {
        //     console.log(e)
        // } finally {
        //     setIsLoading(false);
        // }
    }

    if (isLoading) {
        setIsLoading(false);
    }

    return (
        <>
            <div>
                    <p>Login</p>
                    <input placeholder='Email' onChange={ setEmail }/>
                    <input placeholder='Password' onChange={ setPassword } />
                    {
                        isLoading ? 
                        <p>Loading...</p>
                        :
                        <div>
                            <button onClick={ signIn }>LOG IN</button>
                            <button onClick={ SignUp }>SIGN UP</button>
                        </div>
                    }
            </div>
        </>
    );
}
 
export default Login;