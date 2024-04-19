import * as React from "react";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { Link } from "react-router-dom";

const BackOffice = ({ user }) => {
    const handleSignOut = async () => {
        signOut(FIREBASE_AUTH).then(() => {
            // Sign-out successful.
            console.log("Signed out successfully");
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    return (
        <>
            <p>Welcome { user.email }</p>
            <Link to={ '/' }>
                <button onClick={ handleSignOut }>Sign out</button>
            </Link>
        </>
    );
}
 
export default BackOffice;