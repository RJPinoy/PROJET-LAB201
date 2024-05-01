import "../styles/chapter4.css";

const Chapter4 = () => {
    return (
        <>
            <div id="chapter_4" className="chapter_container">
                <h2 className="title">Le breaking aux jeux olympiques</h2>
                <div className="content">
                    <div className="text">
                        <p>
                            Le breaking a fait son apparition au programme des Jeux Olympiques de la Jeunesse de Buenos Aires, en 2018. Après le grand succès rencontré par la discipline lors de cette manifestation, c'est à l'occasion des Jeux de Paris 2024 que le breaking entrera encore un peu plus dans le monde de l'olympisme. 
                            <br />
                            <br />
                            Il s'inscrira cette fois au programme des Jeux Olympiques, en tant que sport additionnel en compagnie du surf, du skateboard et de l'escalade.</p>
                    </div>
                    <div className="video">
                        <div className="video_title">
                            <p>JOJ 2018 / Break Dance : Martin Lejeune termine en argent !</p>
                        </div>
                        <div className="video_content">
                            {/* <button>
                                <img src="/play_button.png" alt="Play" />
                            </button> */}
                            <iframe width="100%" height="80%" src="https://www.youtube.com/embed/cZ1mm_SPlA4?si=nwzifKuLILphtDpD&amp;start=382" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chapter4;