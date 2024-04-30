import * as React from "react";

const Card = ({ handleDjButton }) => {
    return (
        <>
            <div className="card_container">
                <div className="card">
                    <button id="exit_card" onClick={ handleDjButton }>X</button>
                    <div className="card_content">
                        <div className="card_image"></div>
                        <div>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, tempora officia. Suscipit deleniti, inventore ipsam cupiditate tempora maxime alias numquam deserunt obcaecati facilis, aliquid dolore quidem cum? Atque, deserunt minima!</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Card;