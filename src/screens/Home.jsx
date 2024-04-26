import * as React from "react";
import "../styles/home.css";
import { firestore } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Chapter1 from "./Chapter1";
import ChapterDj from "./ChapterDj";

const HomeScreen = () => {
    const [videoHomepage, setVideoHomepage] = React.useState();
    const [videoFinished, setVideoFinished] = React.useState(false);
    const [showVolumeInput, setShowVolumeInput] = React.useState(false);
    const [volumeInputValue, setVolumeInputValue] = React.useState(0.5);
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchVideo = async () => {
        const q = query(collection(firestore, "videos"), where("homepage", "==", true));

        try {
            const videosSnapshot = await getDocs(q);
            videosSnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                setVideoHomepage(doc.data())
            });
        } catch (error) {
            console.error("Error fetching video names:", error);
        }
    };

    React.useEffect(() => {
        fetchVideo();
        setIsLoading(false);
    }, []);

    React.useEffect(() => {
        if (videoHomepage) {
            const root = document.getElementById('root');
            const skipButton = document.getElementById('skip_video_button');
            const soundButton = document.getElementById('sound_video_button');
            let timeoutId;
        
            // Add event listener for mousemove event
            const handleMouseMove = () => {
                // Show the skip button and reset the timer
                skipButton.style.opacity = 1;
                soundButton.style.opacity = 1;
    
                clearTimeout(timeoutId); // Clear the previous timeout
                timeoutId = setTimeout(() => {
                    // Hide the skip button after 1 second of inactivity
                    skipButton.style.opacity = 0;
                    soundButton.style.opacity = 0;
                }, 500);
            };
    
            const handleSoundButtonMouseLeave = () => {
                setShowVolumeInput(false);
            };
    
            root?.addEventListener('mousemove', handleMouseMove);
            soundButton?.addEventListener('mouseleave', handleSoundButtonMouseLeave);
    
            return () => {
                root?.removeEventListener('mousemove', handleMouseMove);
                soundButton?.removeEventListener('mouseleave', handleSoundButtonMouseLeave);
            };
        }
    }, [videoHomepage]);

    const toggleVolumeInput = () => {
        setShowVolumeInput(!showVolumeInput);
    };

    const handleVolumeChange = (event) => {
        setVolumeInputValue(event.target.value);
        const video = document.getElementById("intro_video");
        if (video) {
            console.log(volumeInputValue)
            video.muted = false;
            video.volume = volumeInputValue;

            volumeInputValue <= 0.01 ? video.muted = true : null;
        }
    };

    const handleVideoEnd = () => {
        setVideoFinished(true);
    };

    if(isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            {!videoFinished ?
                <div id="div_intro_video">
                    { videoHomepage ?
                        <>
                            <video id="intro_video" width={'100%'} height={'100%'} autoPlay muted onEnded={ handleVideoEnd }>
                                <source src={ videoHomepage.url } type="video/mp4" />
                                Sorry, your browser doesn't support videos.
                            </video>

                            <div id="sound_video_button">
                                {showVolumeInput ? (
                                    <input 
                                        id="input_volume"
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01" 
                                        value={ volumeInputValue }
                                        onChange={ handleVolumeChange } 
                                    />
                                ) : (
                                    <button onClick={ toggleVolumeInput }>
                                        <img width="20" height="20" src="https://img.icons8.com/ios/50/room-sound.png" alt="room-sound"/>
                                    </button>
                                )}
                            </div>
                            <button id="skip_video_button" onClick={ handleVideoEnd }>Skip</button>
                        </>
                    :
                        <h2>Almost there..</h2>
                    }
                </div>
                :
                <>
                    <main>
                        <section>
                            <article>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum pariatur, accusamus quisquam consectetur sed iste ratione animi id maxime tempora quod quam tenetur, officia quas ullam ea, natus quae expedita!</article>
                            <article>Lorem ipsum dolor sit amet.</article>
                        </section>
                    </main>

                    <Chapter1 />
                    <ChapterDj />
                </>
            }
        </>
    );
}

export default HomeScreen;