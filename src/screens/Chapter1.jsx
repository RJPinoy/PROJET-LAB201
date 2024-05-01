import "../styles/chapter1.css";

const Chapter1 = () => {
    return (
        <>
            <div id="chapter_1" className="chapter_container">
                <h1 className="titre">PREMIERS PAS</h1>
                <div className="chapter1_content">
                    <div className="text">
                        <p>Le breaking, également connu sous le nom de breakdance, est un style de danse urbaine qui a émergé dans les années 1970 dans les quartiers défavorisés de New York.</p>
                        <p>Influencé par diverses formes de danse, y compris le funk, le soul, le jazz et le martial arts, le breaking a été façonné par la culture hip-hop émergente de l'époque.</p>
                        <p>Les danseurs, appelés "b-boys" et "b-girls", ont développé des mouvements acrobatiques et expressifs, combinant des figures au sol, des tours, des mouvements de bras et de jambes pour créer une forme de danse dynamique et visuellement impressionnante.</p>
                    </div>

                    <div className="images">
                        <img src="/Pics.png" alt="Image" />
                        <img src="/asset_grille.png" alt="Image" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chapter1;