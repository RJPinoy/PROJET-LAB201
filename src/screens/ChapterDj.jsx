import "../styles/chapterDj.css";
import * as React from "react";
import Card from "../components/Card";

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
        <div id="chapter_dj" className={`chapter_container ${isVisible ? "visible" : ""}`} ref={ djSetRef }>
            { modal ?
                <Card modal={ modal } handleDjButton={ handleDjButton }/>
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