import * as React from "react";
import Nav from "../components/Nav";

const Chapter1 = () => {
    return (
        <>
            <Nav />
            <div style={{
                backgroundImage: 'url(chemin/vers/votre/image.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh'
            }}>

            </div >
        </>
    );
}

export default Chapter1;
