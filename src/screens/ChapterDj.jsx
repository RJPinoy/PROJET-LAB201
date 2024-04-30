import "../styles/chapterDj.css";
import * as React from "react";

const ChapterDj = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const djSetRef = React.useRef(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.5
            }
        );

        console.log(observer)

        if (djSetRef.current) {
            observer.observe(djSetRef.current);
        }

        return () => {
            if (djSetRef.current) {
                observer.unobserve(djSetRef.current);
            }
        };
    }, []);

    const handleDjButton = () => {
        setModal(!modal);
        document.body.classList.toggle("modal-open");
    }

    return (
        <div id="chapter_dj" className={`chapter_container ${isVisible ? "visible" : ""}`} ref={djSetRef}>
            { modal ?
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
            :
                null
            }
            <div id="dj_set">
                <div id="button_top_left" onClick={ handleDjButton }></div>
                <div id="button_second_left" onClick={ handleDjButton }></div>
                <div id="button_third_left" onClick={ handleDjButton }></div>
                <div id="button_end_left" onClick={ handleDjButton }></div>
                <div id="button_bottom_left" onClick={ handleDjButton }></div>
                <div id="button_top_right" onClick={ handleDjButton }></div>
                <div id="button_bottom_right" onClick={ handleDjButton }></div>
            </div>
        </div>
    );
}

export default ChapterDj;