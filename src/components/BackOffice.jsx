import "../styles/backOffice.css";
import * as React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, collection, setDoc, getDocs, writeBatch, deleteDoc } from "firebase/firestore";
import { FIREBASE_AUTH, firestore, storage } from "../../firebaseConfig";

const BackOffice = ({ user }) => {
    const [currentVideo, setCurrentVideo] = React.useState();
    const [videos, setVideos] = React.useState([]);
    const [videoUpload, setVideoUpload] = React.useState(null);
    const [videosList, setVideosList] = React.useState([]);
    const [uploading, setUploading] = React.useState(false);
    const [uploadError, setUploadError] = React.useState(null);
    const [addModal, setAddModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);

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

            
        // Check upload duration every minute
        const uploadStartTime = Date.now(); // Record upload start time

        const checkDurationInterval = setInterval(() => {
            const uploadDuration = Date.now() - uploadStartTime;
            const minutesElapsed = Math.floor(uploadDuration / (1000 * 60));
            if (minutesElapsed >= 1) {
                // If more than a minute has passed, show slow network message
                setUploadError("Slow network is detected.");
                clearInterval(checkDurationInterval); // Stop checking duration
            }
        }, 60000); // Check every minute
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
            const batch = writeBatch(firestore);
    
            // Update the clicked video to true
            const videoDocRef = doc(firestore, "videos", video.name);
            batch.update(videoDocRef, { homepage: true });
    
            // Set all other videos to false
            const querySnapshot = await getDocs(collection(firestore, "videos"));
            querySnapshot.forEach((doc) => {
                if (doc.id !== video.name) {
                    const docRef = doc.ref;
                    batch.update(docRef, { homepage: false });
                }
            });
    
            await batch.commit();
            console.log("All documents updated successfully.");
            window.location.reload();
        } catch (e) {
            console.error("Error updating documents: ", e);
        }
    };

    const handleDelete = (video) => {
        setDeleteModal(true);
        setCurrentVideo(video)
    };

    const handleAdd = () => {
        setAddModal(!addModal);
    }

    const confirmDelete = async (video) => {
        console.log("should delete :", video.name);
        try {
            // Delete the file
            deleteObject(ref(storage, `videos/${ video.name }`)).then(() => {
                // File deleted successfully
                console.log("File deleted successfully in the storage.");
                deleteVideoToFirestore(video);
            })
        } catch (e) {
            console.error("Error updating documents: ", e);
        }
    };

    const deleteVideoToFirestore = async (metadata) => {
        try {
            await deleteDoc(doc(firestore, "videos", metadata.name));
            console.log("Document deleted with ID: ", metadata.name);
            window.location.reload();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const sizeToReadableFormat = (size) => {
        if (size < 1024) {
            return size + " B";
        } else if (size < 1024 * 1024) {
            return (size / 1024).toFixed(2) + " KB";
        } else {
            return (size / (1024 * 1024)).toFixed(2) + " MB";
        }
    };

    return (
        <>
            { deleteModal ?
                <>
                    <div className="delete-modal">
                        <div className="modal-content">
                            <p>Are you sure you want to delete this video <span style={{ color: 'red' }}>{ currentVideo.name }</span>?</p>
                            <div className="modal-buttons">
                                <button onClick={ () => setDeleteModal(false) }>Cancel</button>
                                <button onClick={ () => confirmDelete(currentVideo) }>Delete</button>
                            </div>
                        </div>
                    </div>
                </>
            :
                null
            }

            { addModal ?
                <>
                    <div className="delete-modal">
                        <div className="modal-content">
                            <div className="video-upload-section">
                                <div className="video-upload-input">
                                    <input type="file" accept="video/mp4" onChange={(e) => setVideoUpload(e.target.files[0])} />
                                    <button className="upload-button" onClick={uploadVideo}>
                                        Upload video
                                    </button>
                                </div>
                                {uploading && 
                                    <>
                                        <p>Uploading video... Please wait... This can take a few minutes...</p>
                                        <div className="loader"></div>
                                    </>
                                } {/* Show uploading status */}
                                {uploadError && <p className="error-message">{ uploadError }</p>} {/* Show error message */}
                            </div>

                            <div className="exit_button">
                                <button onClick={ handleAdd }>X</button>
                            </div>
                        </div>
                    </div>
                </>
            :
                null
            }

            <nav className="user-info">
                <Link to="/">
                    <button>
                        Homepage
                    </button>
                </Link>
                
                <div>
                    <p>Welcome {user.email}</p>
                    <Link to="/">
                        <button className="sign-out-button" onClick={handleSignOut}>
                            Sign out
                        </button>
                    </Link>
                </div>
            </nav>

            <div className="backoffice-container">
                <div className="add_button">
                    <button onClick={ handleAdd }>Add a video</button>
                </div>

                <table className="video-table">
                    <thead>
                        <tr>
                            <th>Current Homepage Video</th>
                            <th>Video</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Size</th>
                            <th>Set video to homepage</th>
                            <th>Delete video</th>
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
                                    <td>{ sizeToReadableFormat(videos[index].size) }</td>
                                    <td>
                                        <button onClick={() => handleCheck(videos[index])}>Set as homepage video</button>
                                    </td>
                                    <td>
                                        <button style={{ backgroundColor: '#f44336' }} onClick={() => handleDelete(videos[index])}>
                                            DELETE
                                        </button>
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