import "../styles/nav.css";
import * as React from "react";

const Nav = () => {
    const [currentSection, setCurrentSection] = React.useState(null);

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
        
        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setCurrentSection(entry.target.id);
                }
            });
        }, { threshold: 0.5 }); // Adjust threshold as needed

        const sections = document.querySelectorAll('.chapter_container');
        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        return () => {
            sections.forEach(section => {
                sectionObserver.unobserve(section);
            });
        };
    }, []);

    return (
        <>
            <div id="sidebar">
                <ul>
                    <li className={currentSection === "chapter_1" ? "active" : ""}>
                        <span>——</span> <a href="#chapter_1">Les Origines du breaking</a>
                    </li>
                    <li className={currentSection === "chapter_3" ? "active" : ""}>
                        <span>——</span> <a href="#chapter_3">La culture Hip-Hop en France</a>
                    </li>
                    <li className={currentSection === "chapter_dj" ? "active" : ""}>
                        <span>——</span> <a href="#chapter_dj">Les champions du breacking</a>
                    </li>
                    <li className={currentSection === "chapter_4" ? "active" : ""}>
                        <span>——</span> <a href="#chapter_4">Le breacking aux jeux olympiques</a>
                    </li>
                </ul>
            </div>
        </>
    );
}
 
export default Nav;