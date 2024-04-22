import "../styles/backOffice.css";
import * as React from "react";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { Link } from "react-router-dom";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const BackOffice = ({ user }) => {
    const [videoUpload, setVideoUpload] = React.useState(null);
    const [videosList, setVideosList] = React.useState([]);
    const videosListRef = ref(storage, "videos/");

    React.useEffect(() => {
        listAll(videosListRef).then((response) => {
            console.log(response.items);
            const promises = response.items.map((item) => getDownloadURL(item));
            Promise.all(promises).then((urls) => {
                setVideosList(urls);
            });
        }).catch((error) => {
            console.error("Error listing videos:", error);
        });
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(FIREBASE_AUTH);
            console.log("Signed out successfully");
        } catch (error) {
            console.log(error);
        }
    };

    const uploadVideo = () => {
        if (videoUpload == null) return;

        const videoRef = ref(storage, `videos/${videoUpload.name}`);
        uploadBytes(videoRef, videoUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setVideosList((prev) => [...prev, url])
            })
        });
    };

    return (
        <>
            <div>
                <p>Welcome { user.email }</p>
                <Link to="/">
                    <button onClick={ handleSignOut }>Sign out</button>
                </Link>
            </div>

            <div>
                <div>
                    <input type="file" accept="video/mp4" onChange={(e) => { setVideoUpload(e.target.files[0]) }} />
                    <button onClick={ uploadVideo }>Upload video</button>
                </div>

                <div>
                    { videosList.length > 0 ?
                        videosList.map((url, index) => (
                            <video key={index} width="200px" height="200px" controls>
                                <source src={url} type="video/mp4" />
                                Sorry, your browser doesn't support videos.
                            </video>
                        ))
                    :
                        <p>No video added yet...</p>
                    }
                </div>
            </div>
        </>
    );
};

export default BackOffice;