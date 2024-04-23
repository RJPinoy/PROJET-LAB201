import "../styles/backOffice.css";
import * as React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { doc, collection, setDoc, getDocs, updateDoc, writeBatch } from "firebase/firestore";
import { FIREBASE_AUTH, firestore, storage } from "../../firebaseConfig";

const BackOffice = ({ user }) => {
    const [videos, setVideos] = React.useState([]);
    const [videoUpload, setVideoUpload] = React.useState(null);
    const [videosList, setVideosList] = React.useState([]);
    const [uploading, setUploading] = React.useState(false);
    const [uploadError, setUploadError] = React.useState(null);

    const videosListRef = ref(storage, "videos/");

    React.useEffect(() => {
        listAll(videosListRef)
            .then((response) => {
                const promises = response.items.map((item) => getDownloadURL(item));
                Promise.all(promises).then((urls) => {
                    setVideosList(urls);
                });
            })
            .catch((error) => {
                console.error("Error listing videos:", error);
            });

        getData();
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

        setUploading(true); // Set uploading status to true

        uploadBytes(videoRef, videoUpload)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    const metadata = {
                        name: videoUpload.name,
                        type: videoUpload.type,
                        lastModifiedDate: videoUpload.lastModifiedDate,
                        size: videoUpload.size,
                        url: url,
                        homepage: false,
                    };
                    sendVideoToFirestore(metadata);
                });
            })
            .catch((error) => {
                setUploadError(error.message); // Set error message if upload fails
                console.error("Error uploading video:", error);
            })
            .finally(() => {
                setUploading(false); // Set uploading status to false after upload completes or fails
            });
    };

    const sendVideoToFirestore = async (metadata) => {
        try {
            await setDoc(doc(firestore, "videos", metadata.name), metadata);
            console.log("Document written with ID: ", metadata.name);
            window.location.reload();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const getData = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "videos"));
            let videoArray = [];
            querySnapshot.forEach((doc) => {
                videoArray.push(doc.data());
            });

            setVideos(videoArray);
        } catch (error) {
            console.error("Error getting documents:", error);
        }
    };

    const handleCheck = async (video) => {
        console.log("should change homepage bool :", video.name);
        try {
            const querySnapshot = await getDocs(collection(firestore, "videos"));
            const batch = writeBatch(firestore);

            querySnapshot.forEach((doc) => {
                const docRef = doc.ref;
                const currentData = doc.data();
                batch.update(docRef, { homepage: !currentData.homepage });
            });

            await batch.commit();
            console.log("All documents updated successfully.");
            window.location.reload();
        } catch (e) {
            console.error("Error updating documents: ", e);
        }
    };

    return (
        <>
            <nav className="user-info">
                <p>Welcome {user.email}</p>
                <Link to="/">
                    <button className="sign-out-button" onClick={handleSignOut}>
                        Sign out
                    </button>
                </Link>
            </nav>

            <div className="backoffice-container">
                <div className="video-upload-section">
                    <div className="video-upload-input">
                        <input type="file" accept="video/mp4" onChange={(e) => setVideoUpload(e.target.files[0])} />
                        <button className="upload-button" onClick={uploadVideo}>
                            Upload video
                        </button>
                    </div>
                    {uploading && <p>Uploading video...</p>} {/* Show uploading status */}
                    {uploadError && <p className="error-message">{uploadError}</p>} {/* Show error message */}
                </div>

                <table className="video-table">
                    <thead>
                        <tr>
                            <th>Current Homepage Video</th>
                            <th>Video</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Size (octets)</th>
                            <th>URL</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {videosList.length > 0 ? (
                            videosList.map((url, index) => (
                                <tr key={index}>
                                    <td>{videos[index].homepage ? "X" : null}</td>
                                    <td>
                                        <video width={100} height={100} controls>
                                            <source src={url} type="video/mp4" />
                                            Sorry, your browser doesn't support videos.
                                        </video>
                                    </td>
                                    <td>{videos[index].name}</td>
                                    <td>{videos[index].type}</td>
                                    <td>{videos[index].size}</td>
                                    <td>{videos[index].url}</td>
                                    <td>
                                        <button onClick={() => handleCheck(videos[index])}>Set as homepage video</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No video added yet...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default BackOffice;