import "../styles/chapter1.css";

const Chapter1 = () => {
    return (
        <>
            <div id="chapter_1" className="chapter_container">
                <h2 className="titre">PREMIERS PAS</h2>

                <div className="chapter_content">
                    <div className="text">
                        <p>Le breaking, également connu sous le nom de breakdance, est un style de danse urbaine qui a émergé dans les années 1970 dans les quartiers défavorisés de New York.</p>
                        <p>Influencé par diverses formes de danse, y compris le funk, le soul, le jazz et le martial arts, le breaking a été façonné par la culture hip-hop émergente de l'époque.</p>
                        <p>Les danseurs, appelés "b-boys" et "b-girls", ont développé des mouvements acrobatiques et expressifs, combinant des figures au sol, des tours, des mouvements de bras et de jambes pour créer une forme de danse dynamique et visuellement impressionnante.</p>
                    </div>

                    <div className="grid">
                        <img className="pic1" src="/Pics.png" alt="Image" />
                    </div>

                    <div className="video">
                        <div className="video_title">
                            <p>South Bronx, NYC - 83</p>
                        </div>
                        <div className="video_content">
                            <iframe width="100%" height="80%" src="https://www.youtube.com/embed/UWgt6Y-V5Ns?si=2F8sh3FC-3I0X7on" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Chapter1;