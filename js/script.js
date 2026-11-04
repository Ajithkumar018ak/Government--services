/* =========================================================
   CIVICCONNECT - COMPLETE WEBSITE JAVASCRIPT
   Vanilla JavaScript | No Framework
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =====================================================
       ELEMENT SELECTOR
    ====================================================== */

    const select = (selector) => document.querySelector(selector);
    const selectAll = (selector) => document.querySelectorAll(selector);


    /* =====================================================
       01. CINEMATIC 3D PRELOADER
    ====================================================== */

    const preloader = select("#preloader");
    const preloaderStage = select("#preloaderStage");
    const loaderProgressFill = select("#loaderProgressFill");
    const loaderPercent = select("#loaderPercent");
    const loaderStatusText = select("#loaderStatusText");

    let loaderFinished = false;
    let loaderStartTime = null;

    const loaderDuration = 18000;

    const loaderPhases = [
        {
            start: 0,
            end: 4000,
            className: "phase-building",
            text: "INITIALIZING DIGITAL INDIA"
        },
        {
            start: 4000,
            end: 7500,
            className: "phase-documents",
            text: "PREPARING GOVERNMENT DOCUMENTS"
        },
        {
            start: 7500,
            end: 10500,
            className: "phase-justice",
            text: "PROTECTING CITIZEN RIGHTS"
        },
        {
            start: 10500,
            end: 14000,
            className: "phase-services",
            text: "CONNECTING DIGITAL SERVICES"
        },
        {
            start: 14000,
            end: 16000,
            className: "phase-verified",
            text: "VERIFYING DIGITAL ACCESS"
        },
        {
            start: 16000,
            end: 18000,
            className: "phase-logo",
            text: "WELCOME TO CIVICCONNECT"
        }
    ];

    if (preloader) {

        document.body.style.overflow = "hidden";

        function updatePreloader(timestamp) {

            if (!loaderStartTime) {
                loaderStartTime = timestamp;
            }

            const elapsed = timestamp - loaderStartTime;

            const progress = Math.min(
                (elapsed / loaderDuration) * 100,
                100
            );

            const percentage = Math.floor(progress);

            if (loaderProgressFill) {
                loaderProgressFill.style.width = percentage + "%";
            }

            if (loaderPercent) {
                loaderPercent.textContent = percentage;
            }

            if (preloaderStage) {

                const currentPhase = loaderPhases.find(
                    phase =>
                        elapsed >= phase.start &&
                        elapsed < phase.end
                );

                if (currentPhase) {

                    loaderPhases.forEach(phase => {
                        preloaderStage.classList.remove(phase.className);
                    });

                    preloaderStage.classList.add(currentPhase.className);

                    if (loaderStatusText) {
                        loaderStatusText.textContent = currentPhase.text;
                    }

                }

            }

            if (elapsed < loaderDuration) {

                requestAnimationFrame(updatePreloader);

            } else {

                finishPreloader();

            }

        }

        function finishPreloader() {

            if (loaderFinished) return;

            loaderFinished = true;

            if (loaderProgressFill) {
                loaderProgressFill.style.width = "100%";
            }

            if (loaderPercent) {
                loaderPercent.textContent = "100";
            }

            if (loaderStatusText) {
                loaderStatusText.textContent = "WELCOME TO CIVICCONNECT";
            }

            preloader.classList.add("preloader-complete");

            setTimeout(() => {

                preloader.style.display = "none";

                document.body.style.overflow = "";

                document.body.classList.add("site-loaded");

                initializeScrollAnimations();

            }, 1000);

        }

        requestAnimationFrame(updatePreloader);

    } else {

        document.body.style.overflow = "";

        initializeScrollAnimations();

    }


    /* =====================================================
       02. MOBILE NAVIGATION DRAWER
    ====================================================== */

    const mobileMenuBtn = select("#mobileMenuBtn");
    const mobileDrawer = select("#mobileDrawer");
    const mobileOverlay = select("#mobileOverlay");
    const drawerClose = select("#drawerClose");
    const drawerLoginBtn = select("#drawerLoginBtn");

    function openMobileMenu() {

        if (!mobileDrawer || !mobileOverlay) return;

        mobileDrawer.classList.add("active");
        mobileOverlay.classList.add("active");

        document.body.classList.add("drawer-open");

        mobileDrawer.setAttribute("aria-hidden", "false");

        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute("aria-expanded", "true");
        }

    }

    function closeMobileMenu() {

        if (!mobileDrawer || !mobileOverlay) return;

        mobileDrawer.classList.remove("active");
        mobileOverlay.classList.remove("active");

        document.body.classList.remove("drawer-open");

        mobileDrawer.setAttribute("aria-hidden", "true");

        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute("aria-expanded", "false");
        }

    }

    mobileMenuBtn?.addEventListener("click", openMobileMenu);

    drawerClose?.addEventListener("click", closeMobileMenu);

    mobileOverlay?.addEventListener("click", closeMobileMenu);

    selectAll(".drawer-content a").forEach(link => {

        link.addEventListener("click", closeMobileMenu);

    });


    /* =====================================================
       03. STICKY HEADER
    ====================================================== */

    const siteHeader = select("#siteHeader");

    function handleStickyHeader() {

        if (!siteHeader) return;

        if (window.scrollY > 50) {

            siteHeader.classList.add("header-scrolled");

        } else {

            siteHeader.classList.remove("header-scrolled");

        }

    }

    window.addEventListener("scroll", handleStickyHeader, {
        passive: true
    });

    handleStickyHeader();


    /* =====================================================
       04. HERO IMAGE SLIDER
    ====================================================== */

    const heroSlides = selectAll(".hero-slide");
    const heroDotsContainer = select("#heroDots");

    const heroPrev = select("#heroPrev");
    const heroNext = select("#heroNext");

    let currentSlide = 0;
    let heroInterval;

    const heroTotalSlides = heroSlides.length;

    if (heroTotalSlides > 0) {

        if (heroDotsContainer) {

            heroSlides.forEach((slide, index) => {

                const dot = document.createElement("button");

                dot.className = "hero-dot";

                dot.setAttribute(
                    "aria-label",
                    `Go to slide ${index + 1}`
                );

                if (index === 0) {
                    dot.classList.add("active");
                }

                dot.addEventListener("click", () => {
                    showHeroSlide(index);
                    restartHeroSlider();
                });

                heroDotsContainer.appendChild(dot);

            });

        }

        function showHeroSlide(index) {

            currentSlide = (index + heroTotalSlides) % heroTotalSlides;

            heroSlides.forEach((slide, slideIndex) => {

                slide.classList.toggle(
                    "active",
                    slideIndex === currentSlide
                );

            });

            selectAll(".hero-dot").forEach((dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex === currentSlide
                );

            });

        }

        function nextHeroSlide() {
            showHeroSlide(currentSlide + 1);
        }

        function previousHeroSlide() {
            showHeroSlide(currentSlide - 1);
        }

        function startHeroSlider() {

            clearInterval(heroInterval);

            heroInterval = setInterval(nextHeroSlide, 5500);

        }

        function restartHeroSlider() {
            startHeroSlider();
        }

        heroNext?.addEventListener("click", () => {

            nextHeroSlide();

            restartHeroSlider();

        });

        heroPrev?.addEventListener("click", () => {

            previousHeroSlide();

            restartHeroSlider();

        });

        startHeroSlider();

    }


    /* =====================================================
       05. LOGIN MODAL
    ====================================================== */

    const loginModal = select("#loginModal");

    const loginModalOpen = select("#loginModalOpen");
    const loginModalClose = select("#loginModalClose");
    const loginModalOverlay = select("#loginModalOverlay");

    const loginForm = select("#loginForm");
    const loginMessage = select("#loginMessage");

    let previousBodyOverflow = "";

    function openLoginModal() {

        if (!loginModal) return;

        closeMobileMenu();

        previousBodyOverflow = document.body.style.overflow;

        loginModal.classList.add("active");

        loginModal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        setTimeout(() => {

            select("#loginEmail")?.focus();

        }, 200);

    }

    function closeLoginModal() {

        if (!loginModal) return;

        loginModal.classList.remove("active");

        loginModal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = previousBodyOverflow;

    }

    loginModalOpen?.addEventListener("click", openLoginModal);

    drawerLoginBtn?.addEventListener("click", () => {

        closeMobileMenu();

        openLoginModal();

    });

    loginModalClose?.addEventListener("click", closeLoginModal);

    loginModalOverlay?.addEventListener("click", closeLoginModal);


    /* =====================================================
       06. LOGIN TAB SWITCHING
    ====================================================== */

    const loginTabs = selectAll("[data-login-tab]");

    let currentLoginType = "citizen";

    loginTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            loginTabs.forEach(item => {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            currentLoginType = tab.dataset.loginTab;

            if (loginMessage) {

                loginMessage.textContent =
                    currentLoginType === "admin"
                        ? "Admin demo login selected."
                        : "Citizen demo login selected.";

                loginMessage.className = "login-message";

            }

        });

    });


    /* =====================================================
       07. PASSWORD SHOW / HIDE
    ====================================================== */

    const passwordToggle = select("#passwordToggle");
    const loginPassword = select("#loginPassword");

    passwordToggle?.addEventListener("click", () => {

        if (!loginPassword) return;

        const isPassword = loginPassword.type === "password";

        loginPassword.type = isPassword ? "text" : "password";

        passwordToggle.innerHTML = isPassword
            ? '<i class="fa-regular fa-eye-slash"></i>'
            : '<i class="fa-regular fa-eye"></i>';

        passwordToggle.setAttribute(
            "aria-label",
            isPassword ? "Hide password" : "Show password"
        );

    });


    /* =====================================================
       08. DEMO LOGIN FORM
    ====================================================== */

    loginForm?.addEventListener("submit", event => {

        event.preventDefault();

        if (!loginForm.checkValidity()) {

            loginForm.reportValidity();

            return;

        }

        const email = select("#loginEmail")?.value.trim();

        const password = select("#loginPassword")?.value;

        if (!email || !password) return;

        if (loginMessage) {

            loginMessage.textContent =
                `${currentLoginType.toUpperCase()} demo login submitted.`;

            loginMessage.classList.add("success");

        }

        showToast(
            "Demo Login",
            "This is a frontend demo. No real authentication is connected."
        );

    });


    /* =====================================================
       09. GLOBAL SEARCH MODAL
    ====================================================== */

    const searchModal = select("#searchModal");

    const headerSearchBtn = select("#headerSearchBtn");

    const searchModalClose = select("#searchModalClose");

    const searchModalOverlay = select("#searchModalOverlay");

    const globalSearchInput = select("#globalSearchInput");

    function openSearchModal() {

        if (!searchModal) return;

        previousBodyOverflow = document.body.style.overflow;

        searchModal.classList.add("active");

        searchModal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        setTimeout(() => {
            globalSearchInput?.focus();
        }, 200);

    }

    function closeSearchModal() {

        if (!searchModal) return;

        searchModal.classList.remove("active");

        searchModal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = previousBodyOverflow;

    }

    headerSearchBtn?.addEventListener("click", openSearchModal);

    searchModalClose?.addEventListener("click", closeSearchModal);

    searchModalOverlay?.addEventListener("click", closeSearchModal);


    /* =====================================================
       10. SEARCH FUNCTIONALITY
    ====================================================== */

    const searchableItems = [

        {
            name: "Aadhaar Services",
            keywords: "aadhaar identity uidai card enrolment",
            url: "services.html#aadhaar"
        },

        {
            name: "PAN Card Services",
            keywords: "pan card tax income",
            url: "services.html#pan"
        },

        {
            name: "Voter ID Services",
            keywords: "voter election electoral id",
            url: "services.html#voter"
        },

        {
            name: "Passport Services",
            keywords: "passport travel seva",
            url: "services.html#passport"
        },

        {
            name: "Certificates",
            keywords: "birth death income community certificate",
            url: "services.html#certificates"
        },

        {
            name: "Driving Licence",
            keywords: "driving licence vehicle transport",
            url: "services.html#transport"
        },

        {
            name: "Government Schemes",
            keywords: "schemes welfare benefits scholarship",
            url: "schemes.html"
        },

        {
            name: "Education Scholarships",
            keywords: "education student scholarship",
            url: "schemes.html#education"
        },

        {
            name: "Farmer Welfare",
            keywords: "farmer agriculture rural",
            url: "schemes.html#agriculture"
        },

        {
            name: "Healthcare Support",
            keywords: "health healthcare medical hospital",
            url: "schemes.html#healthcare"
        }

    ];

    function performSearch(query) {

        const searchTerm = query.trim().toLowerCase();

        if (!searchTerm) {

            showToast(
                "Search Required",
                "Please enter a service or scheme name."
            );

            return;

        }

        const result = searchableItems.find(item => {

            return (
                item.name.toLowerCase().includes(searchTerm) ||
                item.keywords.includes(searchTerm)
            );

        });

        if (result) {

            window.location.href = result.url;

        } else {

            showToast(
                "No Results Found",
                "Try searching Aadhaar, PAN, Voter ID or Schemes."
            );

        }

    }

    const heroSearchForm = select("#heroSearchForm");

    heroSearchForm?.addEventListener("submit", event => {

        event.preventDefault();

        const query = select("#serviceSearch")?.value || "";

        performSearch(query);

    });

    const globalSearchForm = select("#globalSearchForm");

    globalSearchForm?.addEventListener("submit", event => {

        event.preventDefault();

        const query = globalSearchInput?.value || "";

        performSearch(query);

    });


    /* =====================================================
       11. POPULAR SEARCH LINKS
    ====================================================== */

    selectAll(".popular-searches a").forEach(link => {

        link.addEventListener("click", event => {

            const text = link.textContent.trim();

            if (text) {

                const matchingItem = searchableItems.find(item =>
                    item.name.toLowerCase().includes(text.toLowerCase())
                );

                if (matchingItem) {

                    event.preventDefault();

                    window.location.href = matchingItem.url;

                }

            }

        });

    });


    /* =====================================================
       12. SCROLL REVEAL ANIMATION
    ====================================================== */

    function initializeScrollAnimations() {

        const revealElements = selectAll(
            ".section-heading, " +
            ".service-card, " +
            ".scheme-card, " +
            ".quick-access-item, " +
            ".online-service-item, " +
            ".governance-feature, " +
            ".step-card, " +
            ".document-card, " +
            ".benefit-card, " +
            ".department-card, " +
            ".announcement-item, " +
            ".announcement-featured, " +
            ".faq-item, " +
            ".resource-card, " +
            ".accessibility-container"
        );

        if (!("IntersectionObserver" in window)) {

            revealElements.forEach(element => {
                element.classList.add("revealed");
            });

            return;

        }

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       13. BACK TO TOP BUTTONS
    ====================================================== */

    const floatingBackToTop = select("#floatingBackToTop");

    const backToTop = select("#backToTop");

    function handleBackToTop() {

        const visible = window.scrollY > 450;

        floatingBackToTop?.classList.toggle("show", visible);

    }

    window.addEventListener("scroll", handleBackToTop, {
        passive: true
    });

    floatingBackToTop?.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    backToTop?.addEventListener("click", event => {

        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       14. TOAST NOTIFICATION
    ====================================================== */

    const toastNotification = select("#toastNotification");

    const toastTitle = select("#toastTitle");

    const toastMessage = select("#toastMessage");

    const toastClose = select("#toastClose");

    let toastTimer;

    function showToast(title, message) {

        if (!toastNotification) return;

        if (toastTitle) {
            toastTitle.textContent = title;
        }

        if (toastMessage) {
            toastMessage.textContent = message;
        }

        toastNotification.classList.add("active");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {

            toastNotification.classList.remove("active");

        }, 4500);

    }

    toastClose?.addEventListener("click", () => {

        toastNotification?.classList.remove("active");

        clearTimeout(toastTimer);

    });


    /* =====================================================
       15. FAQ ACCORDION
    ====================================================== */

    const faqItems = selectAll(".faq-item");

    faqItems.forEach(item => {

        item.addEventListener("toggle", () => {

            if (!item.open) return;

            faqItems.forEach(otherItem => {

                if (otherItem !== item) {
                    otherItem.open = false;
                }

            });

        });

    });


    /* =====================================================
       16. ESCAPE KEY SUPPORT
    ====================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMobileMenu();

            closeLoginModal();

            closeSearchModal();

        }

    });


    /* =====================================================
       17. HERO SLIDER TOUCH SUPPORT
    ====================================================== */

    const heroSection = select(".hero-section");

    let touchStartX = 0;
    let touchEndX = 0;

    heroSection?.addEventListener("touchstart", event => {

        touchStartX = event.changedTouches[0].screenX;

    }, {
        passive: true
    });

    heroSection?.addEventListener("touchend", event => {

        touchEndX = event.changedTouches[0].screenX;

        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > 60) {

            if (difference > 0) {

                showHeroSlide(currentSlide + 1);

            } else {

                showHeroSlide(currentSlide - 1);

            }

            restartHeroSlider();

        }

    }, {
        passive: true
    });


    /* =====================================================
       18. HEADER ACTIVE NAVIGATION
    ====================================================== */

    const navigationLinks = selectAll(".main-navigation .nav-link");

    navigationLinks.forEach(link => {

        link.addEventListener("click", () => {

            navigationLinks.forEach(nav => {
                nav.classList.remove("active");
            });

            link.classList.add("active");

        });

    });


    /* =====================================================
       19. SMOOTH SCROLL FOR INTERNAL LINKS
    ====================================================== */

    selectAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", event => {

            const targetId = anchor.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetElement = select(targetId);

            if (!targetElement) return;

            event.preventDefault();

            closeMobileMenu();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       20. IMAGE FALLBACK
    ====================================================== */

    selectAll("img").forEach(image => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

            image.style.backgroundColor = "#e9eef4";

        });

    });


    /* =====================================================
       21. PAGE VISIBILITY
    ====================================================== */

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            clearInterval(heroInterval);

        } else if (heroTotalSlides > 1) {

            startHeroSlider();

        }

    });


    /* =====================================================
       22. INITIALIZE WEBSITE
    ====================================================== */

    handleStickyHeader();

    handleBackToTop();

    console.log(
        "%c CIVICCONNECT ",
        "background:#0b2745;color:#ffffff;font-size:18px;padding:10px;font-weight:bold;"
    );

    console.log(
        "Digital Government Services | Website Initialized Successfully"
    );

});









/* =========================================================
   CIVICCONNECT — APPLE STYLE SCROLL ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       AUTO ADD REVEAL ATTRIBUTES
    ===================================== */

    const revealGroups = [
        ".section-heading",
        ".service-card",
        ".scheme-card",
        ".step-card",
        ".document-card",
        ".benefit-card",
        ".department-card",
        ".announcement-item",
        ".resource-card",
        ".quick-access-item",
        ".governance-feature",
        ".online-service-item"
    ];

    revealGroups.forEach(selector => {

        document.querySelectorAll(selector).forEach((element, index) => {

            if (!element.hasAttribute("data-reveal")) {
                element.setAttribute("data-reveal", "up");
            }

        });

    });


    /* =====================================
       IMAGE REVEAL
    ===================================== */

    const imageGroups = [
        ".service-image",
        ".scheme-image",
        ".online-services-image",
        ".digital-governance-visual",
        ".announcement-featured",
        ".support-image"
    ];

    imageGroups.forEach(selector => {

        document.querySelectorAll(selector).forEach(element => {
            element.setAttribute("data-image-reveal", "");
        });

    });


    /* =====================================
       STAGGER GROUPS
    ===================================== */

    const staggerGroups = [
        ".services-grid",
        ".schemes-grid",
        ".steps-grid",
        ".document-grid",
        ".benefits-grid",
        ".department-grid",
        ".resources-grid"
    ];

    staggerGroups.forEach(selector => {

        document.querySelectorAll(selector).forEach(element => {

            element.setAttribute("data-stagger", "");

            element.querySelectorAll(":scope > *").forEach(child => {
                child.removeAttribute("data-reveal");
            });

        });

    });


    /* =====================================
       INTERSECTION OBSERVER
    ===================================== */

    const observerOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -55px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            }

        });

    }, observerOptions);


    document.querySelectorAll(
        "[data-reveal], [data-stagger], [data-image-reveal], " +
        ".section-heading, .digital-governance-visual, " +
        ".digital-governance-content, .support-content, " +
        ".final-cta-section"
    ).forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================
       SCROLL PROGRESS BAR
    ===================================== */

    const progressBar = document.createElement("div");

    progressBar.className = "scroll-progress";

    document.body.appendChild(progressBar);


    let scrollTicking = false;

    function updateScrollProgress() {

        const scrollTop = window.scrollY;

        const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

        progressBar.style.width = `${progress}%`;

        scrollTicking = false;

    }

    window.addEventListener("scroll", () => {

        if (!scrollTicking) {

            requestAnimationFrame(updateScrollProgress);

            scrollTicking = true;

        }

    }, { passive: true });


    updateScrollProgress();


    /* =====================================
       APPLE STYLE PARALLAX
    ===================================== */

    const parallaxElements = document.querySelectorAll(
        ".digital-governance-visual, " +
        ".online-services-image, " +
        ".announcement-featured, " +
        ".support-image"
    );

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        window.matchMedia("(min-width: 769px)").matches) {

        let parallaxTicking = false;

        function updateParallax() {

            parallaxElements.forEach(element => {

                const rect = element.getBoundingClientRect();

                if (rect.bottom < 0 || rect.top > window.innerHeight) return;

                const image = element.querySelector("img");

                if (!image) return;

                const center = rect.top + rect.height / 2;

                const distance =
                    (center - window.innerHeight / 2) * 0.035;

                image.style.transform =
                    `scale(1.08) translateY(${distance}px)`;

            });

            parallaxTicking = false;

        }

        window.addEventListener("scroll", () => {

            if (!parallaxTicking) {

                requestAnimationFrame(updateParallax);

                parallaxTicking = true;

            }

        }, { passive: true });

        updateParallax();

    }

});












/* =========================================================
   CIVICCONNECT - ABOUT PAGE INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       01. CINEMATIC HERO IMAGE SLIDER
    ====================================================== */

    const hero = document.querySelector(".about-hero");
    const slides = document.querySelectorAll(".about-hero-bg img");

    const slideCounter = document.getElementById("aboutSlideCount");
    const slideProgress = document.getElementById("aboutSlideProgress");

    if (hero && slides.length > 0) {

        let currentSlide = 0;
        let sliderTimer = null;
        let progressFrame = null;

        const duration = 6000;
        let startTime = 0;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        function updateSlide(index) {

            slides.forEach((slide, i) => {

                slide.classList.toggle(
                    "active",
                    i === index
                );

            });

            if (slideCounter) {

                slideCounter.textContent =
                    String(index + 1).padStart(2, "0") +
                    " / " +
                    String(slides.length).padStart(2, "0");

            }

        }

        function animateProgress(timestamp) {

            if (!startTime) {
                startTime = timestamp;
            }

            const elapsed = timestamp - startTime;

            const progress = Math.min(
                (elapsed / duration) * 100,
                100
            );

            if (slideProgress) {
                slideProgress.style.width = progress + "%";
            }

            if (elapsed < duration) {

                progressFrame =
                    requestAnimationFrame(animateProgress);

            } else {

                nextSlide();

            }

        }

        function startSlider() {

            stopSlider();

            updateSlide(currentSlide);

            if (reduceMotion || document.hidden) {
                return;
            }

            startTime = 0;

            if (slideProgress) {
                slideProgress.style.width = "0%";
            }

            progressFrame =
                requestAnimationFrame(animateProgress);

        }

        function stopSlider() {

            if (progressFrame) {

                cancelAnimationFrame(progressFrame);
                progressFrame = null;

            }

            startTime = 0;

        }

        function nextSlide() {

            stopSlider();

            currentSlide =
                (currentSlide + 1) % slides.length;

            startSlider();

        }

        startSlider();

        document.addEventListener("visibilitychange", function () {

            if (document.hidden) {

                stopSlider();

            } else {

                startSlider();

            }

        });

        // Pause slider when the hero is outside the viewport.

        if ("IntersectionObserver" in window) {

            const heroObserver = new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {
                            startSlider();
                        } else {
                            stopSlider();
                        }

                    });

                },
                {
                    threshold: 0.1
                }
            );

            heroObserver.observe(hero);

        }

    }


    /* =====================================================
       02. AUTOMATIC SCROLL REVEAL SETUP
    ====================================================== */

    const revealSelectors = [
        ".about-trust-item",
        ".about-intro-images",
        ".about-intro-content",
        ".about-stat-heading",
        ".about-stat",
        ".about-centered-heading",
        ".about-purpose-card",
        ".about-experience-content",
        ".about-experience-image",
        ".about-digital-card",
        ".about-value-card",
        ".about-commitment-image",
        ".about-commitment-content",
        ".about-cta-content",
        ".about-cta-btn"
    ];

    const revealElements = document.querySelectorAll(
        revealSelectors.join(",")
    );

    revealElements.forEach(function (element, index) {

        if (
            element.classList.contains("about-reveal") ||
            element.classList.contains("about-reveal-left") ||
            element.classList.contains("about-reveal-right") ||
            element.classList.contains("about-reveal-scale")
        ) {
            return;
        }

        element.classList.add("about-reveal");

        if (
            element.matches(
                ".about-intro-images, .about-experience-content, .about-commitment-image"
            )
        ) {

            element.classList.remove("about-reveal");
            element.classList.add("about-reveal-left");

        }

        if (
            element.matches(
                ".about-intro-content, .about-experience-image, .about-commitment-content"
            )
        ) {

            element.classList.remove("about-reveal");
            element.classList.add("about-reveal-right");

        }

        if (
            element.matches(
                ".about-stat, .about-purpose-card, .about-value-card, .about-digital-card"
            )
        ) {

            element.style.transitionDelay =
                (index % 4) * 0.08 + "s";

        }

    });


    /* =====================================================
       03. INTERSECTION OBSERVER
    ====================================================== */

    const allRevealElements = document.querySelectorAll(
        ".about-reveal, .about-reveal-left, .about-reveal-right, .about-reveal-scale"
    );

    const motionPreference = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (motionPreference || !("IntersectionObserver" in window)) {

        allRevealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    } else {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        allRevealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       04. SMOOTH ABOUT PAGE ANCHOR SCROLL
    ====================================================== */

    const aboutAnchorLinks = document.querySelectorAll(
        '.about-hero a[href^="#"], .about-text-link[href^="#"]'
    );

    aboutAnchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       05. ABOUT IMAGE LOAD HANDLING
    ====================================================== */

    const aboutImages = document.querySelectorAll(
        ".about-hero img, .about-intro img, .about-experience img, .about-digital img, .about-commitment img"
    );

    aboutImages.forEach(function (img) {

        img.addEventListener("error", function () {

            console.warn(
                "CivicConnect image not found:",
                img.getAttribute("src")
            );

        });

    });


    /* =====================================================
       06. HERO PARLIAMENT POINTER EFFECT
       Desktop only - subtle 3D movement
    ====================================================== */

    const parliamentScene = document.querySelector(
        ".parliament-scene"
    );

    const parliamentBuilding = document.querySelector(
        ".parliament-building"
    );

    const isMobile = window.matchMedia(
        "(max-width: 768px)"
    ).matches;

    if (
        parliamentScene &&
        parliamentBuilding &&
        !isMobile &&
        !motionPreference
    ) {

        parliamentScene.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    parliamentScene.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) / rect.width;

                const y =
                    (event.clientY - rect.top) / rect.height;

                const rotateY = (x - 0.5) * 14;
                const rotateX = (0.5 - y) * 8;

                parliamentBuilding.style.setProperty(
                    "--pointer-rotate-x",
                    rotateX + "deg"
                );

                parliamentBuilding.style.setProperty(
                    "--pointer-rotate-y",
                    rotateY + "deg"
                );

                parliamentBuilding.classList.add(
                    "pointer-active"
                );

            }
        );

        parliamentScene.addEventListener(
            "mouseleave",
            function () {

                parliamentBuilding.classList.remove(
                    "pointer-active"
                );

                parliamentBuilding.style.removeProperty(
                    "--pointer-rotate-x"
                );

                parliamentBuilding.style.removeProperty(
                    "--pointer-rotate-y"
                );

            }
        );

    }

});




document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       01. MOBILE NAVIGATION
    ===================================== */

    const menuToggle = document.getElementById("servicesMenuToggle");
    const mobileMenu = document.getElementById("servicesMobileMenu");

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {
            const isOpen = mobileMenu.classList.toggle("menu-open");

            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("menu-open");
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    /* =====================================
       02. 3D DOOR OPENING
    ===================================== */

    const doorStage = document.getElementById("doorStage");

    if (doorStage) {
        window.setTimeout(() => {
            doorStage.classList.add("doors-open");
        }, 650);
    }


    /* =====================================
       03. HERO CAROUSEL DATA
    ===================================== */

    const heroSlides = document.querySelectorAll(".hero-slide");

    const heroCategory = document.getElementById("heroCategory");
    const heroTitle = document.getElementById("heroTitle");
    const heroDescription = document.getElementById("heroDescription");

    const heroRightIndex = document.getElementById("heroRightIndex");
    const heroRightTitle = document.getElementById("heroRightTitle");
    const heroRightDescription = document.getElementById("heroRightDescription");

    const heroCurrent = document.getElementById("heroCurrent");
    const heroImageNumber = document.getElementById("heroImageNumber");
    const heroProgress = document.getElementById("heroProgress");

    const heroPrev = document.getElementById("heroPrev");
    const heroNext = document.getElementById("heroNext");

    const leftContent = document.getElementById("heroLeftContent");
    const rightContent = document.getElementById("heroRightContent");

    const heroData = [

        {
            category: "CITIZEN SERVICES",

            title: "Services that<br><span>move you forward.</span>",

            description:
                "Discover essential public services designed to make everyday government interactions easier, faster and more accessible.",

            rightTitle: "Citizen<br>Documentation",

            rightDescription:
                "Access essential certificates, identity documentation and important citizen records through a simple process."
        },

        {
            category: "DIGITAL GOVERNMENT",

            title: "A smarter way<br><span>to access services.</span>",

            description:
                "Explore digital service information and discover a more convenient way to understand public service processes.",

            rightTitle: "Digital<br>Public Services",

            rightDescription:
                "Find useful digital service information, application guidance and the right channels for your requirements."
        },

        {
            category: "WELFARE & BENEFITS",

            title: "Support that<br><span>reaches everyone.</span>",

            description:
                "Discover public welfare information and understand the support programmes available to eligible citizens.",

            rightTitle: "Welfare &<br>Benefits",

            rightDescription:
                "Explore welfare-related information, public programmes and guidance to help you understand available support."
        },

        {
            category: "CITIZEN ASSISTANCE",

            title: "Here to help<br><span>at every step.</span>",

            description:
                "Find the right information and guidance to make your public service journey clearer and more accessible.",

            rightTitle: "Citizen<br>Assistance",

            rightDescription:
                "Get guidance on service information, understand where to find help and take your next step with confidence."
        }

    ];


    /* =====================================
       04. CAROUSEL FUNCTIONS
    ===================================== */

    let currentSlide = 0;
    let carouselTimer = null;
    let isChanging = false;

    const carouselDelay = 5500;

    function animateContent(element) {
        if (!element) return;

        element.classList.remove("hero-content-changing");

        // Restart CSS animation
        void element.offsetWidth;

        element.classList.add("hero-content-changing");
    }


    function updateHeroContent(index) {

        const data = heroData[index];

        heroCategory.textContent = data.category;
        heroTitle.innerHTML = data.title;
        heroDescription.textContent = data.description;

        heroRightIndex.textContent =
            `0${index + 1} / 04`;

        heroRightTitle.innerHTML = data.rightTitle;
        heroRightDescription.textContent = data.rightDescription;

        heroCurrent.textContent = `0${index + 1}`;
        heroImageNumber.textContent = `0${index + 1}`;

        heroProgress.style.width =
            `${((index + 1) / heroSlides.length) * 100}%`;

        animateContent(leftContent);
        animateContent(rightContent);
    }


    function changeSlide(nextIndex) {

        if (isChanging || heroSlides.length === 0) return;

        isChanging = true;

        const previousSlide = heroSlides[currentSlide];
        const nextSlide = heroSlides[nextIndex];

        if (previousSlide === nextSlide) {
            isChanging = false;
            return;
        }

        /*
         * Previous image first turns black.
         * New image appears after the black transition.
         */

        previousSlide.classList.remove("active");
        previousSlide.classList.add("is-leaving");

        window.setTimeout(() => {

            previousSlide.classList.remove("is-leaving");

            currentSlide = nextIndex;

            nextSlide.classList.add("active");

            updateHeroContent(currentSlide);

            window.setTimeout(() => {
                isChanging = false;
            }, 850);

        }, 420);
    }


    function nextSlide() {
        const nextIndex = (currentSlide + 1) % heroSlides.length;
        changeSlide(nextIndex);
    }


    function previousSlide() {
        const previousIndex =
            (currentSlide - 1 + heroSlides.length) % heroSlides.length;

        changeSlide(previousIndex);
    }


    /* =====================================
       05. AUTO SLIDER
    ===================================== */

    function stopCarousel() {
        if (carouselTimer) {
            clearInterval(carouselTimer);
            carouselTimer = null;
        }
    }

    function startCarousel() {
        stopCarousel();

        carouselTimer = window.setInterval(() => {
            nextSlide();
        }, carouselDelay);
    }


    if (heroSlides.length > 0) {

        updateHeroContent(0);

        if (heroNext) {
            heroNext.addEventListener("click", () => {
                nextSlide();
                startCarousel();
            });
        }

        if (heroPrev) {
            heroPrev.addEventListener("click", () => {
                previousSlide();
                startCarousel();
            });
        }

        startCarousel();

        // Pause automatic sliding when browser tab is hidden
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                stopCarousel();
            } else {
                startCarousel();
            }
        });

        // Pause when user moves away from the hero
        const heroSection = document.getElementById("serviceHero");

        if ("IntersectionObserver" in window && heroSection) {

            const heroObserver = new IntersectionObserver(entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting && !document.hidden) {
                        startCarousel();
                    } else {
                        stopCarousel();
                    }

                });

            }, {
                threshold: 0.15
            });

            heroObserver.observe(heroSection);
        }
    }


    /* =====================================
       06. SCROLL REVEAL ANIMATIONS
    ===================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading-row, " +
        ".center-section-heading, " +
        ".intro-feature-image, " +
        ".intro-feature-content, " +
        ".service-card, " +
        ".digital-services-content, " +
        ".digital-services-visual, " +
        ".process-card, " +
        ".citizen-first-image, " +
        ".citizen-first-content, " +
        ".faq-heading, " +
        ".faq-item, " +
        ".services-cta-inner"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal-visible");

                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("reveal-visible");
        });
    }


    /* =====================================
       07. FAQ ACCORDION
    ===================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        item.addEventListener("toggle", () => {

            if (!item.open) return;

            faqItems.forEach(otherItem => {

                if (otherItem !== item) {
                    otherItem.open = false;
                }

            });

        });

    });


    /* =====================================
       08. IMAGE ERROR CHECK
    ===================================== */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {
            console.warn("Image not found:", image.getAttribute("src"));
        });

    });

});









/* ==========================================
   CIVICCONNECT DOOR OPENING INTRO
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const doorStage = document.getElementById("doorStage");

    if (!doorStage) return;

    // Start with closed doors
    doorStage.classList.remove("is-open");

    const openDoors = () => {

        setTimeout(() => {
            doorStage.classList.add("is-open");
        }, 500);

    };

    if (document.readyState === "complete") {
        openDoors();
    } else {
        window.addEventListener("load", openDoors, {
            once: true
        });
    }

});














/* =====================================================
   CIVICCONNECT - SCHEMES PAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. HERO CAROUSEL
    ===================================================== */

    const slides = document.querySelectorAll(".scheme-slide");
    const dots = document.querySelectorAll(".scheme-dot");
    const prevBtn = document.querySelector(".scheme-prev");
    const nextBtn = document.querySelector(".scheme-next");

    let currentSlide = 0;
    let carouselTimer;

    function showSlide(index) {
        if (!slides.length) return;

        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentSlide);
            slide.setAttribute(
                "aria-hidden",
                i === currentSlide ? "false" : "true"
            );
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
            dot.setAttribute("aria-current",
                i === currentSlide ? "true" : "false"
            );
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startCarousel() {
        stopCarousel();
        if (slides.length > 1) {
            carouselTimer = setInterval(nextSlide, 5000);
        }
    }

    function stopCarousel() {
        clearInterval(carouselTimer);
    }

    if (slides.length) {
        showSlide(0);
        startCarousel();
    }

    nextBtn?.addEventListener("click", () => {
        nextSlide();
        startCarousel();
    });

    prevBtn?.addEventListener("click", () => {
        prevSlide();
        startCarousel();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            startCarousel();
        });
    });

    const heroCarousel = document.querySelector(".scheme-hero-carousel");

    heroCarousel?.addEventListener("mouseenter", stopCarousel);
    heroCarousel?.addEventListener("mouseleave", startCarousel);


    /* =====================================================
       2. FAQ ACCORDION
    ===================================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");

        question?.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            faqItems.forEach((faq) => {
                faq.classList.remove("active");

                const btn = faq.querySelector(".faq-question");
                btn?.setAttribute("aria-expanded", "false");
            });

            if (!isActive) {
                item.classList.add("active");
                question.setAttribute("aria-expanded", "true");
            }
        });
    });


    /* =====================================================
       3. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".scheme-card, .featured-card, .state-scheme-card, " +
        ".welfare-card, .process-card, .section-heading"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("revealed");
        });
    }


    /* =====================================================
       4. MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.querySelector("#menuToggle");
    const mobileOverlay = document.querySelector("#mobileOverlay");
    const mobileDrawer = document.querySelector("#mobileDrawer");
    const drawerClose = document.querySelector("#drawerClose");

    function openDrawer() {
        mobileOverlay?.classList.add("active");
        mobileDrawer?.classList.add("active");
        menuToggle?.classList.add("active");

        mobileOverlay?.setAttribute("aria-hidden", "false");
        menuToggle?.setAttribute("aria-expanded", "true");

        document.body.classList.add("drawer-open");
    }

    function closeDrawer() {
        mobileOverlay?.classList.remove("active");
        mobileDrawer?.classList.remove("active");
        menuToggle?.classList.remove("active");

        mobileOverlay?.setAttribute("aria-hidden", "true");
        menuToggle?.setAttribute("aria-expanded", "false");

        document.body.classList.remove("drawer-open");
    }

    menuToggle?.addEventListener("click", openDrawer);
    drawerClose?.addEventListener("click", closeDrawer);
    mobileOverlay?.addEventListener("click", closeDrawer);

    mobileDrawer?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeDrawer);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeDrawer();
        }
    });


    /* =====================================================
       5. BACK TO TOP
    ===================================================== */

    const backToTop = document.querySelector("#backToTop");

    backToTop?.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    /* =====================================================
       6. SCROLL PROGRESS
    ===================================================== */

    const scrollProgress = document.querySelector("#scrollProgress");

    function updateScrollProgress() {
        if (!scrollProgress) return;

        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollableHeight > 0
            ? (window.scrollY / scrollableHeight) * 100
            : 0;

        scrollProgress.style.width = `${progress}%`;
    }

    window.addEventListener("scroll", updateScrollProgress, {
        passive: true
    });

    updateScrollProgress();


    /* =====================================================
       7. CURRENT YEAR
    ===================================================== */

    const yearElement = document.querySelector("#currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});











/* =====================================================
   CIVICCONNECT MOBILE DRAWER
===================================================== */

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileOverlay = document.getElementById("mobileOverlay");
const mobileDrawer = document.getElementById("mobileDrawer");
const drawerClose = document.getElementById("drawerClose");
const drawerLoginBtn = document.getElementById("drawerLoginBtn");

function openMobileMenu() {
    mobileOverlay?.classList.add("active");
    mobileDrawer?.classList.add("active");
    document.body.classList.add("drawer-open");

    mobileMenuBtn?.setAttribute("aria-expanded", "true");
}

function closeMobileMenu() {
    mobileOverlay?.classList.remove("active");
    mobileDrawer?.classList.remove("active");
    document.body.classList.remove("drawer-open");

    mobileMenuBtn?.setAttribute("aria-expanded", "false");
}

mobileMenuBtn?.addEventListener("click", openMobileMenu);
drawerClose?.addEventListener("click", closeMobileMenu);
mobileOverlay?.addEventListener("click", closeMobileMenu);

mobileDrawer?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});

drawerLoginBtn?.addEventListener("click", () => {
    closeMobileMenu();
    document.getElementById("loginModalOpen")?.click();
});















/* =====================================================
   CIVICCONNECT — LOGIN, SEARCH & NOTIFICATION SYSTEM
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. LOGIN MODAL ELEMENTS
    ===================================================== */

    const loginModal = document.getElementById("loginModal");
    const loginModalOpen = document.getElementById("loginModalOpen");
    const loginModalClose = document.getElementById("loginModalClose");
    const loginModalOverlay = document.getElementById("loginModalOverlay");

    const loginForm = document.getElementById("loginForm");
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    const loginMessage = document.getElementById("loginMessage");

    const loginTabs = document.querySelectorAll("[data-login-tab]");
    const passwordToggle = document.getElementById("passwordToggle");

    let selectedRole = "citizen";


    /* =====================================================
       2. OPEN & CLOSE LOGIN MODAL
    ===================================================== */

    function openLoginModal() {
        if (!loginModal) return;

        loginModal.classList.add("active");
        loginModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        setTimeout(() => loginEmail?.focus(), 200);
    }

    function closeLoginModal() {
        if (!loginModal) return;

        loginModal.classList.remove("active");
        loginModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    }

    loginModalOpen?.addEventListener("click", openLoginModal);
    loginModalClose?.addEventListener("click", closeLoginModal);
    loginModalOverlay?.addEventListener("click", closeLoginModal);


    /* =====================================================
       3. CITIZEN / ADMIN TAB SWITCHING
    ===================================================== */

    loginTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            selectedRole = tab.dataset.loginTab;

            loginTabs.forEach(item => {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            if (loginMessage) {
                loginMessage.textContent = "";
            }

            if (selectedRole === "admin") {
                loginEmail.placeholder = "Enter admin email address";
                loginPassword.placeholder = "Enter admin password";
            } else {
                loginEmail.placeholder = "Enter your email address";
                loginPassword.placeholder = "Enter your password";
            }

        });

    });


    /* =====================================================
       4. PASSWORD SHOW / HIDE
    ===================================================== */

    passwordToggle?.addEventListener("click", () => {

        if (!loginPassword) return;

        const isPassword = loginPassword.type === "password";

        loginPassword.type = isPassword ? "text" : "password";

        passwordToggle.innerHTML = isPassword
            ? '<i class="fa-regular fa-eye-slash"></i>'
            : '<i class="fa-regular fa-eye"></i>';

        passwordToggle.setAttribute(
            "aria-label",
            isPassword ? "Hide password" : "Show password"
        );

    });


    /* =====================================================
       5. LOGIN FORM SUBMISSION
    ===================================================== */

    loginForm?.addEventListener("submit", event => {

        event.preventDefault();

        const email = loginEmail.value.trim();
        const password = loginPassword.value.trim();

        if (!email || !password) {
            showLoginMessage("Please enter your email and password.", "error");
            return;
        }

        if (!loginEmail.checkValidity()) {
            showLoginMessage("Please enter a valid email address.", "error");
            loginEmail.focus();
            return;
        }

        if (selectedRole === "citizen") {

            showLoginMessage("Citizen login successful. Redirecting...", "success");

            setTimeout(() => {
                window.location.href = "citizen-dashboard.html";
            }, 700);

        } else if (selectedRole === "admin") {

            showLoginMessage("Admin login successful. Redirecting...", "success");

            setTimeout(() => {
                window.location.href = "admin-dashboard.html";
            }, 700);

        }

    });


    function showLoginMessage(message, type) {

        if (!loginMessage) return;

        loginMessage.textContent = message;
        loginMessage.className = "login-message " + type;

    }


    /* =====================================================
       6. LOGIN FROM MOBILE DRAWER
    ===================================================== */

    const drawerLoginBtn = document.getElementById("drawerLoginBtn");

    drawerLoginBtn?.addEventListener("click", () => {

        document.getElementById("mobileOverlay")?.classList.remove("active");
        document.getElementById("mobileDrawer")?.classList.remove("active");

        document.body.classList.remove("drawer-open");

        openLoginModal();

    });


    /* =====================================================
       7. SEARCH MODAL
    ===================================================== */

    const searchModal = document.getElementById("searchModal");
    const headerSearchBtn = document.getElementById("headerSearchBtn");
    const searchModalClose = document.getElementById("searchModalClose");
    const searchModalOverlay = document.getElementById("searchModalOverlay");
    const globalSearchForm = document.getElementById("globalSearchForm");
    const globalSearchInput = document.getElementById("globalSearchInput");

    function openSearchModal() {

        searchModal?.classList.add("active");
        searchModal?.setAttribute("aria-hidden", "false");

        setTimeout(() => globalSearchInput?.focus(), 200);

    }

    function closeSearchModal() {

        searchModal?.classList.remove("active");
        searchModal?.setAttribute("aria-hidden", "true");

    }

    headerSearchBtn?.addEventListener("click", openSearchModal);
    searchModalClose?.addEventListener("click", closeSearchModal);
    searchModalOverlay?.addEventListener("click", closeSearchModal);


    /* =====================================================
       8. GLOBAL SEARCH
    ===================================================== */

    globalSearchForm?.addEventListener("submit", event => {

        event.preventDefault();

        const searchValue = globalSearchInput.value.trim().toLowerCase();

        if (!searchValue) {
            globalSearchInput.focus();
            return;
        }

        const searchRoutes = [
            {
                keywords: ["aadhaar", "aadhar"],
                url: "services.html#aadhaar"
            },
            {
                keywords: ["pan", "pan card"],
                url: "services.html#pan"
            },
            {
                keywords: ["certificate", "birth certificate"],
                url: "services.html#certificates"
            },
            {
                keywords: ["scheme", "government scheme"],
                url: "schemes.html"
            },
            {
                keywords: ["contact", "support", "help"],
                url: "contact.html"
            },
            {
                keywords: ["about"],
                url: "about.html"
            }
        ];

        const matchedRoute = searchRoutes.find(route =>
            route.keywords.some(keyword => searchValue.includes(keyword))
        );

        closeSearchModal();

        if (matchedRoute) {
            window.location.href = matchedRoute.url;
        } else {
            showToast(
                "No Results Found",
                "We couldn't find a matching service. Try another keyword."
            );
        }

    });


    /* =====================================================
       9. TOAST NOTIFICATION
    ===================================================== */

    const toastNotification = document.getElementById("toastNotification");
    const toastTitle = document.getElementById("toastTitle");
    const toastMessage = document.getElementById("toastMessage");
    const toastClose = document.getElementById("toastClose");

    let toastTimer;

    function showToast(title, message) {

        if (!toastNotification) return;

        if (toastTitle) toastTitle.textContent = title;
        if (toastMessage) toastMessage.textContent = message;

        toastNotification.classList.add("active");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toastNotification.classList.remove("active");
        }, 4000);

    }

    toastClose?.addEventListener("click", () => {
        toastNotification?.classList.remove("active");
        clearTimeout(toastTimer);
    });


    /* =====================================================
       10. ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeLoginModal();
            closeSearchModal();
        }

    });

});
