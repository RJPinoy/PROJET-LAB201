import * as React from "react";

const Card = ({ handleDjButton, breaker }) => {
    console.log(breaker);

    return (
        <>
            <div className="card_container">
                <div className="card">
                    <button id="exit_card" onClick={ handleDjButton }>X</button>
                    <div className="card_content">
                        <div className="card_image" style={{ backgroundImage: `url(${breaker.picture})` }}></div>
                        <div className="card_text">
                            <h2>{ breaker.name }</h2>
                            <h3>A.K.A { breaker.aka }</h3>
                            <p>{ breaker.content }</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Card;