import "../styles/chapter2.css";
import * as React from "react";
import Card from "../components/Card";
import data from "../assets/datas.json";

const Chapter2 = () => {
    const [modal, setModal] = React.useState(false);
    const [currentBreakerIndex, setCurrentBreakerIndex] = React.useState(0);

    const handleDjButton = (index) => {
        setModal(!modal);
        document.body.classList.toggle("modal-open");
        setCurrentBreakerIndex(index);
    }

    return (
        <>
            { modal ?
                <Card handleDjButton={ handleDjButton } breaker={data.breaker[currentBreakerIndex]} />
            :
                null
            }

            <div id="chapter_2" className="chapter_container">
                <h2 className="titre">LA CULTURE HIP-POP EN FRANCE</h2>
                <div className="chapter_content">
                    <div className="text">
                        <p>La culture hip-hop en France est une force dynamique et influente qui englobe la musique, la danse, l'art visuel, la mode et l'expression verbale.
                        </p>
                        <p>En France,c'est dans les quartiers populaires franciliens qu'elle a d'abord élu domicile au début des années 80, générant un bouillonnement créatif et l'émergence de talents reconnus
                        </p>
                        <p>
                            L'arrivée du hip-hop sur le territoire français est en grande partie attribuée à <span className="clickable_name" onClick={() => handleDjButton(5)}>DJ Dee Nasty</span>, considéré comme le pionnier en la matière. C'est à San Francisco, en 1975, qu'il découvre les prémices du mouvement, notamment à travers le breakdance.
                        </p>
                    </div>
                    <div className="grid2">
                        <img className="pic1" src="/Pics1.png" alt="Image" />
                        <img className="pic2" src="/Pics2.png" alt="Image" />
                    </div>
                </div>
            </div >
        </>
    );
}

export default Chapter2;