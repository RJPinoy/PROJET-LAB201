import * as React from "react";
import "../styles/home.css";

const HomeScreen = () => {
    const [videoFinished, setVideoFinished] = React.useState(false);
    const [showVolumeInput, setShowVolumeInput] = React.useState(false);
    const [volumeInputValue, setVolumeInputValue] = React.useState(0.5);

    React.useEffect(() => {
        const root = document.getElementById('root');
        const skipButton = document.getElementById('skip_video_button');
        const soundButton = document.getElementById('sound_video_button');
        let timeoutId;
    
        // Add event listener for mousemove event
        root.addEventListener('mousemove', () => {
            // Show the skip button and reset the timer
            skipButton.style.opacity = 1;
            soundButton.style.opacity = 1;

            clearTimeout(timeoutId); // Clear the previous timeout
            timeoutId = setTimeout(() => {
                // Hide the skip button after 1 second of inactivity
                skipButton.style.opacity = 0;
                soundButton.style.opacity = 0;
            }, 100);
        });

        soundButton.addEventListener('mouseleave', () => {
            setShowVolumeInput(false);
        })
    }, []);

    const toggleVolumeInput = () => {
        setShowVolumeInput(!showVolumeInput);
    };

    const handleVolumeChange = (event) => {
        setVolumeInputValue(event.target.value);
        const video = document.getElementById("intro_video");
        if (video) {
            video.volume = volumeInputValue;
        }
    };

    const handleVideoEnd = () => {
        setVideoFinished(true);
    };

    return (
        <>
            {!videoFinished ?
                <div id="div_intro_video">
                    <video id="intro_video" width={'100%'} height={'100%'} autoPlay controls onEnded={ handleVideoEnd }>
                        <source src="/breaking_montage_test.mp4" type="video/mp4" />
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
                                <img width="30" height="30" src="https://img.icons8.com/ios/50/room-sound.png" alt="room-sound"/>
                            </button>
                        )}
                    </div>
                    <button id="skip_video_button" onClick={ handleVideoEnd }>Skip</button>
                </div>
                :
                <>
                    <main>
                        <section>
                            <article>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum pariatur, accusamus quisquam consectetur sed iste ratione animi id maxime tempora quod quam tenetur, officia quas ullam ea, natus quae expedita!</article>
                            <article>Lorem ipsum dolor sit amet.</article>
                        </section>
                    </main>
                </>
            }
        </>
    );
}
 
export default HomeScreen;