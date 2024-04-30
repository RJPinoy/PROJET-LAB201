import "../styles/nav.css";
import * as React from "react";

const Nav = () => {
    React.useEffect(() => {
        // Function to handle smooth scrolling
        const smoothScroll = (target) => {
            const element = document.querySelector(target);
            if (element) {
                window.scrollTo({
                    behavior: "smooth",
                    top: element.offsetTop
                });
            }
        };

        // Event listener for navigation links
        const handleClick = (event) => {
            event.preventDefault(); // Prevent default link behavior
            const target = event.target.getAttribute("href"); // Get the target ID from the href attribute
            smoothScroll(target); // Smoothly scroll to the target
        };

        // Attach event listeners to navigation links
        const links = document.querySelectorAll("#sidebar a");
        links.forEach(link => {
            link.addEventListener("click", handleClick);
        });
    }, []);

    return (
        <>
            <div id="sidebar">
                <ul>
                    <li>
                        <span>——</span> <a href="#chapter_1">PREMIER PAS</a>
                    </li>
                    <li>
                        <span>——</span> <a href="#chapter_dj">CHAPITRE 2</a>
                    </li>
                    <li>
                        <span>——</span> <a href="#chapter_3">CHAPITRE 3</a>
                    </li>
                    <li>
                        <span>——</span> <a href="#chapter_4">CHAPITRE 4</a>
                    </li>
                </ul>
            </div>
        </>
    );
}
 
export default Nav;