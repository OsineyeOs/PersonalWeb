document.addEventListener("DOMContentLoaded", () => {
    console.log("Website Loaded Successfully!");

    // Smooth Scrolling
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").replace(/\.html$/, "");
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });

                // Update Active Class
                document.querySelectorAll("nav a").forEach(link => link.classList.remove("active"));
                this.classList.add("active");
            } else {
                // Redirect if section doesn't exist
                window.location.href = this.getAttribute("href");
            }
        });
    });

    // Highlight Active Section While Scrolling
    window.addEventListener("scroll", () => {
        const sections = document.querySelectorAll("section");
        let scrollPos = window.scrollY + 100; // Offset to detect active section

        sections.forEach(section => {
            if (
                scrollPos >= section.offsetTop &&
                scrollPos < section.offsetTop + section.offsetHeight
            ) {
                let activeId = section.getAttribute("id");
                document.querySelectorAll("nav a").forEach(link => link.classList.remove("active"));
                document.querySelector(`nav a[href*="${activeId}"]`)?.classList.add("active");
            }
        });
    });
});
