import "../styles/chapterDj.css";
import * as React from "react";

const ChapterDj = () => {
    const [isVisible, setIsVisible] = React.useState(false);
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

    return (
        <div id="chapter_dj" className={`chapter_container ${isVisible ? "visible" : ""}`} ref={djSetRef}>
            <div id="dj_set">
                <div id="button_top_left"></div>
                <div id="button_bottom_left"></div>
                <div id="button_top_right"></div>
                <div id="button_bottom_right"></div>
            </div>
        </div>
    );
}

export default ChapterDj;