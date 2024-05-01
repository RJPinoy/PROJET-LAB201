import "../styles/chapterDj.css";
import * as React from "react";
import Card from "../components/Card";
import data from "../assets/datas.json";

const ChapterDj = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [currentBreakerIndex, setCurrentBreakerIndex] = React.useState(0);
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

    const handleDjButton = (index) => {
        setModal(!modal);
        document.body.classList.toggle("modal-open");
        setCurrentBreakerIndex(index);
    }

    return (
        <div id="chapter_dj" className={'chapter_container'} ref={ djSetRef }>
            { modal ?
                <Card handleDjButton={ handleDjButton } breaker={data.breaker[currentBreakerIndex]} />
            :
                null
            }
            <div id="dj_set" className={ `${ isVisible ? "visible" : "" }` } >
                <div id="button_top_left" onClick={() => handleDjButton(0)}></div>
                <div id="button_second_left" onClick={() => handleDjButton(1)}></div>
                <div id="button_third_left" onClick={() => handleDjButton(2)}></div>
                <div id="button_end_left" onClick={() => handleDjButton(3)}></div>
                <div id="button_bottom_left" onClick={() => handleDjButton(4)}></div>
                {/* <div id="button_top_right" onClick={() => handleDjButton(5)}></div> */}
                {/* <div id="button_bottom_right" onClick={() => handleDjButton(6)}></div> */}
            </div>
        </div>
    );
}

export default ChapterDj;