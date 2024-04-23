import Login from "../components/Login";
import BackOffice from "../components/BackOffice";
import * as React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";

const AdminBackOffice = () => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const root = document.getElementById('root');
    root.style.height = window.innerHeight + 'px';

    React.useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            // console.log(user);
            setUser(user);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            { user ?
                <BackOffice user={ user }/>
            :
                <Login />
            }
        </>
    );
};

export default AdminBackOffice;