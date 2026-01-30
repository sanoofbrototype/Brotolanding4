
// Webflow touch check
!function (o, c) { var n = c.documentElement, t = " w-mod-"; n.className += t + "js", ("ontouchstart" in o || o.DocumentTouch && c instanceof DocumentTouch) && (n.className += t + "touch") }(window, document);

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Canonical & OG Tags
    initCanonicalLinks();

    // 2. Initialize GSAP Animations (Rotary + Scroll Trigger if needed)
    initGSAPAnimations();

    // 3. Initialize International Telephone Input
    initIntlTelInput();

    // 4. Initialize CTA Modal
    initCTAModal();

    // 5. Initialize Video Carousel (Auto + Manual Scroll)
    initCarousel();

    // 6. Initialize Hero Text Animations
    initHeroAnimations();

    // 7. Initialize Roadmap Animations (Native Merge)
    initRoadmapAnimations();
});

// --- Feature Functions ---

function initRoadmapAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Initial Splitting
    if (typeof Splitting === 'function') {
        Splitting();
    }

    const type1 = [...document.querySelectorAll("[data-splitting][data-effect1]")];
    const type2 = [...document.querySelectorAll("[data-splitting][data-effect2]")];
    const type3 = [...document.querySelectorAll("[data-splitting][data-effect3]")];
    const type4 = [...document.querySelectorAll("[data-splitting][data-effect4]")];
    const type5 = [...document.querySelectorAll("[data-splitting][data-effect5]")];
    const type6 = [...document.querySelectorAll("[data-splitting][data-effect6]")];
    const type7 = [...document.querySelectorAll("[data-splitting][data-effect7]")];
    const type8 = [...document.querySelectorAll("[data-splitting][data-effect8]")];
    const type9 = [...document.querySelectorAll("[data-splitting][data-effect9]")];
    const type10 = [...document.querySelectorAll("[data-splitting][data-effect10]")];

    // Effect 1
    type1.forEach((title) => {
        gsap.fromTo(title,
            { transformOrigin: "0% 50%", rotate: 3 },
            { ease: "none", rotate: 0, scrollTrigger: { trigger: title, start: "top bottom", end: "center center", scrub: true } }
        );
        gsap.fromTo(title.querySelectorAll(".word"),
            { "will-change": "opacity", opacity: 0.1 },
            { ease: "none", opacity: 1, stagger: 0.05, scrollTrigger: { trigger: title, start: "top bottom-=10%", end: "center center", scrub: true } }
        );
    });

    // Effect 2
    type2.forEach((title) => {
        const chars = title.querySelectorAll(".char");
        chars.forEach((char) => gsap.set(char.parentNode, { perspective: 1000 }));
        gsap.fromTo(chars,
            { "will-change": "opacity, transform", opacity: 0, rotateX: () => gsap.utils.random(-120, 120), z: () => gsap.utils.random(-200, 200) },
            { ease: "none", opacity: 1, rotateX: 0, z: 0, stagger: 0.02, scrollTrigger: { trigger: title, start: "top bottom", end: "center center", scrub: true } }
        );
    });

    // Effect 3 (Words that move)
    type3.forEach((title) => {
        const chars = title.querySelectorAll(".char");
        chars.forEach((char) => gsap.set(char.parentNode, { perspective: 1000 }));
        gsap.fromTo(chars,
            { "will-change": "opacity, transform", opacity: 0.2, z: -800 },
            { ease: "back.out(1.2)", opacity: 1, z: 0, stagger: 0.04, scrollTrigger: { trigger: title, start: "top bottom", end: "center center", scrub: true } }
        );
    });

    // Effect 4
    type4.forEach((title) => {
        const chars = title.querySelectorAll(".char");
        chars.forEach((char) => gsap.set(char.parentNode, { perspective: 1000 }));
        gsap.fromTo(chars,
            { "will-change": "opacity, transform", transformOrigin: "50% 0%", opacity: 0, rotationX: -90, z: -200 },
            { ease: "power1", opacity: 1, stagger: 0.05, rotationX: 0, z: 0, scrollTrigger: { trigger: title, start: "top bottom", end: "center center", scrub: true } }
        );
    });

    // Effect 5 (Lucid Dreaming)
    type5.forEach((title) => {
        const chars = title.querySelectorAll(".char");
        chars.forEach((char) => gsap.set(char.parentNode, { perspective: 1000 }));
        gsap.fromTo(chars,
            { "will-change": "opacity, transform", transformOrigin: "50% 100%", opacity: 0, rotationX: 90 },
            { ease: "power4", opacity: 1, stagger: { each: 0.03, from: "random" }, rotationX: 0, scrollTrigger: { trigger: title, start: "top bottom", end: "center center", scrub: true } }
        );
    });

    // Effect 6
    type6.forEach((title) => {
        const chars = title.querySelectorAll(".char");
        chars.forEach((char) => gsap.set(char.parentNode, { perspective: 1000 }));
        gsap.fromTo(chars,
            { "will-change": "opacity, transform", transformOrigin: "50% 50%", opacity: 0, rotationX: 0, rotationY: 0, display: "inline-block" },
            { ease: "power2", opacity: 1, stagger: 0.05, scrollTrigger: { trigger: title, start: "top bottom", end: "center center", scrub: true } }
        );
    });

    // Effect 7
    type7.forEach(title => {
        const chars = title.querySelectorAll(".char");
        gsap.fromTo(chars, { opacity: 0 }, { opacity: 1, stagger: 0.1, scrollTrigger: { trigger: title, start: "top bottom", end: "center center", scrub: true } });
    });

    // Effect 8
    type8.forEach(title => {
        const chars = title.querySelectorAll(".char");
        gsap.fromTo(chars, { scale: 0 }, { scale: 1, stagger: 0.05, scrollTrigger: { trigger: title, start: "top bottom", end: "center center", scrub: true } });
    });

    // Effect 9
    type9.forEach(title => {
        const chars = title.querySelectorAll(".char");
        gsap.fromTo(chars, { y: 100, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, scrollTrigger: { trigger: title, start: "top bottom", end: "center center", scrub: true } });
    });

    // Effect 10
    type10.forEach(title => {
        const chars = title.querySelectorAll(".char");
        gsap.fromTo(chars, { filter: "blur(10px)", opacity: 0 }, { filter: "blur(0px)", opacity: 1, stagger: 0.05, scrollTrigger: { trigger: title, start: "top bottom", end: "center center", scrub: true } });
    });

    // Description Animations (Fade Up)
    const descriptions = gsap.utils.toArray('.roadmap-desc');
    descriptions.forEach(desc => {
        gsap.fromTo(desc,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 0.8, // Match description opacity in CSS
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: desc,
                    start: "top bottom-=10%", // Start animating when it enters lower part of screen
                    end: "center center",
                    toggleActions: "play reverse play reverse", // Play on enter, reverse on leave
                    // scrub: true // Optional: uncomment if you want it tied to scroll like headings
                }
            }
        );
    });
}

function initHeroAnimations() {
    const heading = document.getElementById('hero-heading-anim');
    const paragraph = document.getElementById('hero-paragraph-anim');

    // Helper: Wrap letters
    const wrapLetters = (text, startIndex, className) => {
        return text.split('').map((char, i) => {
            if (char === ' ') return ' '; // Use normal space for natural wrapping
            return `<span class="${className} animate__animated animate__fadeInLeft" style="animation-duration: 0.5s; animation-delay: ${(startIndex + i) * 0.018}s;">${char}</span>`;
        }).join('');
    };

    // Animate Heading
    if (heading) {
        const hText1 = "Become a Software";
        const hText2 = " Engineer?";

        const html1 = wrapLetters(hText1, 0, 'hero-gradient-text');
        // Add length of first part to start index of second part so delay continues smoothly
        const html2 = wrapLetters(hText2, hText1.length, 'hero-gradient-text');

        heading.innerHTML = html1 + '<br />' + html2;
        heading.style.opacity = '1';
    }

    // Animate Paragraph
    if (paragraph) {
        const lines = [
            "If you know how to read and write in English",
            "and have the basic knowledge to do addition,",
            "subtraction, multiplication and division,",
            "congratulations you too can become a",
            "software engineer."
        ];

        let charCount = 0;
        // Start delay for paragraph (after heading)
        const baseDelay = 30; // ~0.9s if * 0.03

        const htmlConfig = lines.map((line, index) => {
            const wrappedLine = wrapLetters(line, baseDelay + charCount, 'hero-white-text');
            charCount += line.length;
            return `<span class="hero-line-block">${wrappedLine}</span>`;
        }).join('');

        paragraph.innerHTML = htmlConfig;
        paragraph.style.opacity = '1';
    }
}

function initCanonicalLinks() {
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    let canonicalURL = canonicalTag ? canonicalTag.getAttribute('href') : window.location.href;
    let metaTag = document.querySelector('meta[property="og:url"]');
    if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', 'og:url');
        document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', canonicalURL);
}

function initGSAPAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Programs Section Rotary Animation - Independent for each instance
        const sections = document.querySelectorAll(".section-portfolio"); // Support multiple sections

        sections.forEach(section => {
            const trigger = section.querySelector(".trigger");
            if (trigger) {
                const items = gsap.utils.toArray(".item", section);
                const indicators = gsap.utils.toArray(".indicator", section);
                const indicatorProgress = indicators.map(ind => ind.querySelector(".indicator-progress"));
                const isMobile = window.matchMedia("(max-width: 991px)").matches;

                // Programs: 10 items
                const desktopRanges = [
                    [0, 35], [8, 43], [16, 51], [24, 59], [32, 67],
                    [40, 75], [48, 83], [56, 91], [64, 99], [72, 107]
                ];
                const mobileRanges = [
                    [0, 25], [8, 33], [16, 41], [24, 49], [32, 57],
                    [40, 65], [48, 73], [56, 81], [64, 89], [72, 97]
                ];
                const ranges = isMobile ? mobileRanges : desktopRanges;

                function getMobileOpacityKeyframes() {
                    return [{ opacity: 0, duration: 0.4 }, { opacity: 1, duration: 0.1 }, { opacity: 0, duration: 0.1 }, { opacity: 0, duration: 0.4 }];
                }

                items.forEach((item, i) => {
                    if (ranges[i]) {
                        const [startPercent, endPercent] = ranges[i];
                        gsap.fromTo(item, { rotate: 90, opacity: 0 }, {
                            rotate: -90,
                            keyframes: getMobileOpacityKeyframes(),
                            ease: "none",
                            scrollTrigger: {
                                trigger: trigger,
                                scrub: true,
                                start: `top+=${startPercent}% bottom`,
                                end: `top+=${endPercent}% top`
                            }
                        });
                    }
                });

                ScrollTrigger.create({
                    trigger: trigger,
                    scrub: true,
                    start: "top bottom",
                    end: "bottom top",
                    onUpdate: self => {
                        let scrollProgress = self.progress;
                        let min = 0.15, max = 0.85;
                        let normalized = (scrollProgress - min) / (max - min);
                        normalized = Math.max(0, Math.min(1, normalized));
                        const SEGMENT = 1 / indicators.length;
                        indicators.forEach((ind, i) => {
                            const start = i * SEGMENT;
                            let progress = (normalized - start) / SEGMENT;
                            progress = Math.max(0, Math.min(1, progress));
                            const barWidth = progress > 0 ? (20 + progress * 80) : 0;
                            if (indicatorProgress[i]) {
                                gsap.to(indicatorProgress[i], { width: `${barWidth}%`, duration: 0.1, overwrite: true, ease: "power1.out" });
                            }
                            ind.classList.toggle("is-active", progress > 0 && progress < 1);
                        });
                    }
                });
            }
        });
    }
}

function initIntlTelInput() {
    var input = document.querySelector("#phone");
    if (input) {
        window.intlTelInput(input, {
            initialCountry: "in",
            separateDialCode: true,
            autoPlaceholder: "off",
            dropdownContainer: document.body,
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js"
        });
    }
}

function initCTAModal() {
    const modal = document.getElementById('cta-modal');
    const triggerBtns = document.querySelectorAll('.trigger-cta-modal');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.getElementById('career-path-form');

    if (modal && triggerBtns.length > 0 && closeBtn) {
        // Animation Helper
        const animateText = () => {
            const heading = document.getElementById('cta-text-animated');
            if (!heading || heading.dataset.animated === 'true') return;

            console.log("Animating CTA Text..."); // Debug

            // Note: We use our custom robust class

            const text1 = "Talk To Our Career Experts ";
            const text2 = "To Help You Find A Suitable ";
            const text3 = "Career Path";

            // Helper to wrap letters
            const wrapLetters = (text, startIndex) => {
                return text.split('').map((char, i) => {
                    if (char === ' ') return '<span>&nbsp;</span>';
                    // Use .cta-gradient-text which has specific background-clip properties
                    return `<span class="cta-gradient-text animate__animated animate__fadeInLeft" style="display:inline-block; animation-duration: 0.5s; animation-delay: ${(startIndex + i) * 0.03}s;">${char}</span>`;
                }).join('');
            };

            heading.innerHTML = wrapLetters(text1, 0) + '<br />' + wrapLetters(text2, text1.length) + '<br />' + wrapLetters(text3, text1.length + text2.length);
            heading.dataset.animated = 'true';
            heading.style.opacity = '1'; // Make visible after setup
        };

        // Initialize Animation Trigger (Scroll)
        const ctaText = document.getElementById('cta-text-animated');
        if (ctaText) {
            ctaText.style.opacity = '0'; // Hide initially

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateText();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 }); // Trigger when 50% visible

            observer.observe(ctaText);
        }

        // Open Modal
        triggerBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                console.log("CTA Button Clicked"); // Debug
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                // animateText(); // Removed: triggered by scroll now
            });
        });

        // Close Modal
        closeBtn.addEventListener('click', function () {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close on Outside Click
        window.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Form Submit
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                alert('Thank you! Our career expert will contact you shortly.');
                form.reset();
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        // Trigger on First Scroll
        const onFirstScroll = () => {
            // Logic kept for modal auto-open, but animation is separate now
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            window.removeEventListener('scroll', onFirstScroll);
        };
        window.addEventListener('scroll', onFirstScroll);
    }
}

function initCarousel() {
    const trackContainers = document.querySelectorAll('.carousel-track-container');

    trackContainers.forEach(container => {
        const track = container.querySelector('.carousel-track');
        if (!track) return;

        const isReverse = track.classList.contains('reverse-track');

        // State for Drag/Swipe
        let isDown = false;
        let startX, scrollLeft;
        let isDragging = false;
        let touchStartX = 0;
        let dragStartX, dragStartY, dragStartTime;

        // Desktop: Continuous Marquee
        if (window.innerWidth > 768) {
            // Auto-scroll speed
            const speed = 0.5;

            // State
            let isPaused = false;

            // Interaction Listeners
            container.addEventListener('mouseenter', () => isPaused = true);
            container.addEventListener('mouseleave', () => isPaused = false);

            function animate() {
                if (!isPaused && container.dataset.isPlaying !== "true") {
                    const maxScroll = container.scrollWidth / 2; // Assuming duplication

                    if (isReverse) {
                        container.scrollLeft -= speed;
                        if (container.scrollLeft <= 0) {
                            container.scrollLeft = maxScroll;
                        }
                    } else {
                        container.scrollLeft += speed;
                        if (container.scrollLeft >= maxScroll) {
                            container.scrollLeft = 0;
                        }
                    }
                }
                requestAnimationFrame(animate);
            }

            // Initialize Reverse Position
            if (isReverse) {
                setTimeout(() => {
                    container.scrollLeft = container.scrollWidth / 2;
                }, 100);
            }
            animate();
        } else {
            // Mobile: Snap Interval Scrolling
            let intervalId;
            const startMobileScroll = () => {
                clearInterval(intervalId);
                intervalId = setInterval(() => {
                    // Pause if playing or user is touching/interacting
                    if (container.dataset.isPlaying === "true" || isDown) return;

                    const card = container.querySelector('.carousel-slide');
                    if (!card) return;

                    const cardWidth = card.offsetWidth;
                    const scrollAmount = cardWidth; // Scroll 1 item

                    if (isReverse) {
                        // Start from right/middle for reverse
                        if (container.scrollLeft <= 0) {
                            container.scrollTo({ left: container.scrollWidth / 2, behavior: 'auto' });
                        } else {
                            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                        }
                    } else {
                        const maxScroll = container.scrollWidth / 2;
                        if (container.scrollLeft >= maxScroll) {
                            container.scrollTo({ left: 0, behavior: 'auto' });
                        } else {
                            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                        }
                    }
                }, 3000);
            };

            if (isReverse) {
                setTimeout(() => {
                    container.scrollTo({ left: container.scrollWidth / 2, behavior: 'auto' });
                }, 100);
            }

            startMobileScroll();

            // Mobile Touch Interaction to pause/resume auto-scroll AND detect swipes
            container.addEventListener('touchstart', (e) => {
                isDown = true;
                touchStartX = e.touches[0].clientX;
                isDragging = false;
                clearInterval(intervalId);
            }, { passive: true });

            container.addEventListener('touchmove', (e) => {
                if (Math.abs(e.touches[0].clientX - touchStartX) > 10) {
                    isDragging = true;
                }
            }, { passive: true });

            container.addEventListener('touchend', () => {
                isDown = false;
                setTimeout(startMobileScroll, 4000); // Resume after delay
                setTimeout(() => { isDragging = false; }, 50);
            });
        }

        // --- Drag/Manual Scroll Implementation (Mouse) ---
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.classList.add('active');
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;

            // Record start for click-vs-drag detection
            dragStartX = e.pageX;
            dragStartY = e.pageY;
            dragStartTime = Date.now();
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('active');
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('active');
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });

        // Testimonial Card Interaction (within this container)
        const videoCards = container.querySelectorAll('.video-facade-card');
        videoCards.forEach(card => {
            const video = card.querySelector('.story-thumb-video');
            const playBtn = card.querySelector('.play-button-small');

            if (video) {
                const resetState = () => {
                    if (video.paused || video.ended) {
                        video.controls = false;
                        if (playBtn) {
                            playBtn.style.display = 'flex';
                            playBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>';
                        }

                        // Fix for Race Condition: Only reset isPlaying if NO other video is playing in this container
                        const allVideos = container.querySelectorAll('.story-thumb-video');
                        const isAnyPlaying = Array.from(allVideos).some(v => !v.paused && !v.ended && v.readyState > 2);

                        if (!isAnyPlaying) {
                            container.dataset.isPlaying = "false";
                        }
                        card.classList.remove('is-playing');
                    }
                };
                video.addEventListener('pause', resetState);
                video.addEventListener('ended', resetState);
            }

            // 1. Direct "Play Button" Click (Bypasses drag checks for instant feedback)
            if (playBtn) {
                playBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent bubbling to card
                    if (video) {
                        if (video.paused) {
                            // Play Logic
                            document.querySelectorAll('.story-thumb-video').forEach(v => {
                                if (v !== video && !v.paused) {
                                    v.pause();
                                    v.controls = false;
                                    const otherCard = v.closest('.story-card');
                                    const otherBtn = otherCard.querySelector('.play-button-small');
                                    if (otherBtn) {
                                        otherBtn.style.display = 'flex';
                                        otherBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>';
                                    }
                                }
                            });
                            video.muted = false;
                            video.controls = false; // Disable native controls to force custom UI
                            video.play().catch(err => console.log("Play error:", err));

                            // Change to Pause Icon and Keep Visible
                            playBtn.style.display = 'flex';
                            playBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';

                            video.style.opacity = '1';
                            container.dataset.isPlaying = "true";
                            card.classList.add('is-playing');

                            // Center the Card
                            const containerRect = container.getBoundingClientRect();
                            const cardRect = card.getBoundingClientRect();
                            const targetScroll = container.scrollLeft + (cardRect.left - containerRect.left) - (containerRect.width / 2) + (cardRect.width / 2);

                            container.scrollTo({
                                left: targetScroll,
                                behavior: 'smooth'
                            });
                        } else {
                            // Pause Logic
                            video.pause();
                        }
                    }
                });
            }

            // 2. Card Interaction (MouseUp for robust drag-vs-click detection on the video area)
            card.addEventListener('mouseup', function (e) {
                // Determine source: If it was the play button, ignore (handled above)
                if (e.target.closest('.play-button-small')) return;

                // Robust Click-vs-Drag Check using variables captured in mousedown
                const moveX = Math.abs(e.pageX - dragStartX);
                const moveY = Math.abs(e.pageY - dragStartY);
                const timeDiff = Date.now() - dragStartTime;

                // Threshold: 30px movement OR > 600ms duration
                if (moveX > 30 || moveY > 30 || timeDiff > 600) return;

                if (video) {
                    if (video.paused) {
                        // Pause all other videos
                        document.querySelectorAll('.story-thumb-video').forEach(v => {
                            if (v !== video && !v.paused) {
                                v.pause();
                                v.controls = false;
                                const otherCard = v.closest('.story-card');
                                const otherBtn = otherCard.querySelector('.play-button-small');
                                if (otherBtn) otherBtn.style.display = 'flex';
                            }
                        });

                        video.muted = false;
                        video.controls = false; // Disable native controls
                        video.play().catch(err => console.log("Play error:", err));

                        // Sync UI with Button Logic (Pause Icon)
                        if (playBtn) {
                            playBtn.style.display = 'flex';
                            playBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
                        }

                        video.style.opacity = '1';
                        container.dataset.isPlaying = "true";
                        card.classList.add('is-playing');

                        // Center the Card
                        const containerRect = container.getBoundingClientRect();
                        const cardRect = card.getBoundingClientRect();
                        const targetScroll = container.scrollLeft + (cardRect.left - containerRect.left) - (containerRect.width / 2) + (cardRect.width / 2);

                        container.scrollTo({
                            left: targetScroll,
                            behavior: 'smooth'
                        });
                    } else {
                        video.pause();
                    }
                }
            });
        });
    });
}
