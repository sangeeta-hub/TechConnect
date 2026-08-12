// ==========================================
// TECHCONNECT - MAIN JAVASCRIPT
// ==========================================


// ==========================================
// 1. MOBILE NAVIGATION
// ==========================================

const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        hamburger.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
        });

    });

}


// Close mobile menu when clicking outside

document.addEventListener("click", event => {

    if (!hamburger || !navMenu) return;

    const clickedInsideMenu =
        navMenu.contains(event.target);

    const clickedHamburger =
        hamburger.contains(event.target);

    if (!clickedInsideMenu && !clickedHamburger) {

        navMenu.classList.remove("active");
        hamburger.classList.remove("active");

    }

});


// ==========================================
// 2. DARK / LIGHT MODE
// ==========================================

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("techconnect-theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    if (themeToggle) {
        themeToggle.textContent = "☀️";
    }

}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (
            document.body.classList.contains("dark-mode")
        ) {

            themeToggle.textContent = "☀️";

            localStorage.setItem(
                "techconnect-theme",
                "dark"
            );

        } else {

            themeToggle.textContent = "🌙";

            localStorage.setItem(
                "techconnect-theme",
                "light"
            );

        }

    });

}


// ==========================================
// 3. ANIMATED STATISTICS COUNTERS
// ==========================================

const counters =
    document.querySelectorAll(".stat-number");


const animateCounter = counter => {

    const target =
        Number(
            counter.getAttribute("data-target")
        );

    let currentValue = 0;

    const increment =
        Math.max(
            1,
            Math.ceil(target / 80)
        );


    const updateCounter = () => {

        currentValue += increment;

        if (currentValue >= target) {

            counter.textContent = target;

            return;

        }

        counter.textContent = currentValue;

        requestAnimationFrame(updateCounter);

    };


    updateCounter();

};


if (counters.length > 0) {

    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        !entry.target.classList.contains(
                            "counted"
                        )
                    ) {

                        entry.target.classList.add(
                            "counted"
                        );

                        animateCounter(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

}


// ==========================================
// 4. BACK TO TOP BUTTON
// ==========================================

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// ==========================================
// 5. SCROLL REVEAL ANIMATION
// ==========================================

const revealElements =
    document.querySelectorAll(
        ".preview-card, " +
        ".event-card, " +
        ".stat-card, " +
        ".cta-content, " +
        ".objective-card, " +
        ".program-card, " +
        ".vm-card, " +
        ".facility-item, " +
        ".full-event-card, " +
        ".faq-card"
    );


if (revealElements.length > 0) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

}


// ==========================================
// 6. HEADER SHADOW
// ==========================================

const header =
    document.querySelector(".header");


window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 20) {

        header.style.boxShadow =
            "0 8px 30px rgba(15, 23, 42, 0.08)";

    } else {

        header.style.boxShadow = "none";

    }

});


// ==========================================
// 7. EVENT FILTERING
// ==========================================

const filterButtons =
    document.querySelectorAll(".filter-btn");

const fullEventCards =
    document.querySelectorAll(".full-event-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedFilter =
            button.getAttribute("data-filter");


        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        fullEventCards.forEach(card => {

            const category =
                card.getAttribute(
                    "data-category"
                );


            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {

                card.classList.remove(
                    "hide-event"
                );

            } else {

                card.classList.add(
                    "hide-event"
                );

            }

        });

    });

});


// ==========================================
// 8. FEATURED EVENT COUNTDOWN
// ==========================================

const countdownElement =
    document.getElementById(
        "eventCountdown"
    );


if (countdownElement) {

    const eventDate =
        new Date(
            "November 15, 2026 09:30:00"
        ).getTime();


    const updateCountdown = () => {

        const now =
            new Date().getTime();

        const distance =
            eventDate - now;


        if (distance <= 0) {

            countdownElement.innerHTML =
                "<p>The event has started!</p>";

            return;

        }


        const days =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (
                    distance %
                    (1000 * 60 * 60 * 24)
                ) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (
                    distance %
                    (1000 * 60 * 60)
                ) /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (
                    distance %
                    (1000 * 60)
                ) /
                1000
            );


        const daysElement =
            document.getElementById("days");

        const hoursElement =
            document.getElementById("hours");

        const minutesElement =
            document.getElementById(
                "minutes"
            );

        const secondsElement =
            document.getElementById(
                "seconds"
            );


        if (daysElement) {

            daysElement.textContent =
                String(days).padStart(
                    2,
                    "0"
                );

        }


        if (hoursElement) {

            hoursElement.textContent =
                String(hours).padStart(
                    2,
                    "0"
                );

        }


        if (minutesElement) {

            minutesElement.textContent =
                String(minutes).padStart(
                    2,
                    "0"
                );

        }


        if (secondsElement) {

            secondsElement.textContent =
                String(seconds).padStart(
                    2,
                    "0"
                );

        }

    };


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );

}


// ==========================================
// 9. GALLERY FILTERING
// ==========================================

const galleryFilterButtons =
    document.querySelectorAll(
        ".gallery-filter-btn"
    );

const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );


galleryFilterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCategory =
            button.getAttribute(
                "data-gallery-filter"
            );


        galleryFilterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        galleryItems.forEach(item => {

            const itemCategory =
                item.getAttribute(
                    "data-gallery-category"
                );


            if (
                selectedCategory === "all" ||
                itemCategory === selectedCategory
            ) {

                item.classList.remove(
                    "hide-gallery-item"
                );

            } else {

                item.classList.add(
                    "hide-gallery-item"
                );

            }

        });

    });

});


// ==========================================
// 10. GALLERY LIGHTBOX
// ==========================================

const galleryLightbox =
    document.getElementById(
        "galleryLightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const lightboxTitle =
    document.getElementById(
        "lightboxTitle"
    );

const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );

const lightboxPrev =
    document.getElementById(
        "lightboxPrev"
    );

const lightboxNext =
    document.getElementById(
        "lightboxNext"
    );


let currentGalleryIndex = 0;

const galleryArray =
    Array.from(galleryItems);


function getVisibleGalleryItems() {

    return galleryArray.filter(
        item =>
            !item.classList.contains(
                "hide-gallery-item"
            )
    );

}


function showGalleryImage(index) {

    const visibleGalleryItems =
        getVisibleGalleryItems();


    if (
        visibleGalleryItems.length === 0
    ) {
        return;
    }


    if (index < 0) {

        index =
            visibleGalleryItems.length - 1;

    }


    if (
        index >=
        visibleGalleryItems.length
    ) {

        index = 0;

    }


    currentGalleryIndex = index;


    const currentItem =
        visibleGalleryItems[
            currentGalleryIndex
        ];


    const image =
        currentItem.querySelector("img");

    const title =
        currentItem.getAttribute(
            "data-title"
        );


    if (
        lightboxImage &&
        image
    ) {

        lightboxImage.src =
            image.src;

        lightboxImage.alt =
            image.alt;

    }


    if (lightboxTitle) {

        lightboxTitle.textContent =
            title || "";

    }

}


galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const visibleGalleryItems =
            getVisibleGalleryItems();


        currentGalleryIndex =
            visibleGalleryItems.indexOf(
                item
            );


        showGalleryImage(
            currentGalleryIndex
        );


        if (galleryLightbox) {

            galleryLightbox.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";

        }

    });

});


function closeGalleryLightbox() {

    if (!galleryLightbox) return;

    galleryLightbox.classList.remove(
        "active"
    );

    document.body.style.overflow = "";

}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeGalleryLightbox
    );

}


if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            showGalleryImage(
                currentGalleryIndex + 1
            );

        }
    );

}


if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            showGalleryImage(
                currentGalleryIndex - 1
            );

        }
    );

}


if (galleryLightbox) {

    galleryLightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                galleryLightbox
            ) {

                closeGalleryLightbox();

            }

        }
    );

}


// Keyboard gallery controls

document.addEventListener(
    "keydown",
    event => {

        if (
            !galleryLightbox ||
            !galleryLightbox.classList.contains(
                "active"
            )
        ) {
            return;
        }


        if (event.key === "Escape") {

            closeGalleryLightbox();

        }


        if (event.key === "ArrowRight") {

            showGalleryImage(
                currentGalleryIndex + 1
            );

        }


        if (event.key === "ArrowLeft") {

            showGalleryImage(
                currentGalleryIndex - 1
            );

        }

    }
);


// ==========================================
// 11. CONTACT FORM VALIDATION
// ==========================================

const contactForm =
    document.getElementById(
        "contactForm"
    );

const fullNameInput =
    document.getElementById(
        "fullName"
    );

const emailInput =
    document.getElementById(
        "email"
    );

const phoneInput =
    document.getElementById(
        "phone"
    );

const subjectInput =
    document.getElementById(
        "subject"
    );

const messageInput =
    document.getElementById(
        "message"
    );

const agreementInput =
    document.getElementById(
        "agreement"
    );

const characterCount =
    document.getElementById(
        "characterCount"
    );

const formSuccess =
    document.getElementById(
        "formSuccess"
    );


function setFormError(
    input,
    errorElementId,
    message
) {

    const errorElement =
        document.getElementById(
            errorElementId
        );


    if (input) {

        input.classList.add(
            "input-error"
        );

    }


    if (errorElement) {

        errorElement.textContent =
            message;

    }

}


function clearFormError(
    input,
    errorElementId
) {

    const errorElement =
        document.getElementById(
            errorElementId
        );


    if (input) {

        input.classList.remove(
            "input-error"
        );

    }


    if (errorElement) {

        errorElement.textContent = "";

    }

}


// Message character counter

if (
    messageInput &&
    characterCount
) {

    messageInput.setAttribute(
        "maxlength",
        "500"
    );


    messageInput.addEventListener(
        "input",
        () => {

            characterCount.textContent =
                `${messageInput.value.length} / 500`;

        }
    );

}


// Contact form submit

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            let formIsValid = true;


            // NAME

            const nameValue =
                fullNameInput.value.trim();


            if (
                nameValue.length < 3
            ) {

                setFormError(
                    fullNameInput,
                    "nameError",
                    "Please enter at least 3 characters."
                );

                formIsValid = false;

            } else {

                clearFormError(
                    fullNameInput,
                    "nameError"
                );

            }


            // EMAIL

            const emailValue =
                emailInput.value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    emailValue
                )
            ) {

                setFormError(
                    emailInput,
                    "emailError",
                    "Please enter a valid email address."
                );

                formIsValid = false;

            } else {

                clearFormError(
                    emailInput,
                    "emailError"
                );

            }


            // PHONE

            const phoneValue =
                phoneInput.value
                    .replace(/\s+/g, "");

            const phonePattern =
                /^[0-9]{10}$/;


            if (
                !phonePattern.test(
                    phoneValue
                )
            ) {

                setFormError(
                    phoneInput,
                    "phoneError",
                    "Please enter a valid 10-digit phone number."
                );

                formIsValid = false;

            } else {

                clearFormError(
                    phoneInput,
                    "phoneError"
                );

            }


            // SUBJECT

            if (
                subjectInput.value === ""
            ) {

                setFormError(
                    subjectInput,
                    "subjectError",
                    "Please select a subject."
                );

                formIsValid = false;

            } else {

                clearFormError(
                    subjectInput,
                    "subjectError"
                );

            }


            // MESSAGE

            const messageValue =
                messageInput.value.trim();


            if (
                messageValue.length < 20
            ) {

                setFormError(
                    messageInput,
                    "messageError",
                    "Please enter at least 20 characters."
                );

                formIsValid = false;

            } else {

                clearFormError(
                    messageInput,
                    "messageError"
                );

            }


            // AGREEMENT

            const agreementError =
                document.getElementById(
                    "agreementError"
                );


            if (
                !agreementInput.checked
            ) {

                if (agreementError) {

                    agreementError.textContent =
                        "Please confirm before submitting.";

                }

                formIsValid = false;

            } else {

                if (agreementError) {

                    agreementError.textContent =
                        "";

                }

            }


            // SUCCESS

            if (formIsValid) {

                if (formSuccess) {

                    formSuccess.textContent =
                        "Thank you! Your message has been validated successfully.";

                    formSuccess.classList.add(
                        "show"
                    );

                }


                contactForm.reset();


                if (characterCount) {

                    characterCount.textContent =
                        "0 / 500";

                }


                setTimeout(
                    () => {

                        if (formSuccess) {

                            formSuccess.classList.remove(
                                "show"
                            );

                        }

                    },
                    5000
                );

            }

        }
    );

}