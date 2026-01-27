
// Webflow touch check
!function (o, c) { var n = c.documentElement, t = " w-mod-"; n.className += t + "js", ("ontouchstart" in o || o.DocumentTouch && c instanceof DocumentTouch) && (n.className += t + "touch") }(window, document);

// Canonical/OG URL fix
window.addEventListener('DOMContentLoaded', (event) => {
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    let canonicalURL = canonicalTag ? canonicalTag.getAttribute('href') : window.location.href;
    let metaTag = document.querySelector('meta[property="og:url"]');
    if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', 'og:url');
        document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', canonicalURL);
});

// Splide Init
document.addEventListener("DOMContentLoaded", () => {
    // Check if Splide exists to avoid errors
    if (typeof Splide !== 'undefined' && document.querySelector("#logos")) {
        new Splide("#logos", {
            autoWidth: true,
            arrows: false,
            pagination: false,
            focus: 'center',
            direction: 'ltr',
            gap: '2rem',
            type: 'loop',

            autoScroll: {
                autoStart: true,
                speed: 0.4,
            },
            intersection: {
                inView: {
                    autoScroll: true,
                },
                outView: {
                    autoScroll: false,
                },
            }
        }).mount(window.splide.Extensions);
    }
});

// GSAP Animations
document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const triggerSelector = ".trigger";
        // Check if trigger element exists
        if (document.querySelector(triggerSelector)) {
            const items = gsap.utils.toArray(".item");
            const indicators = gsap.utils.toArray(".indicator");
            const indicatorProgress = indicators.map(ind => ind.querySelector(".indicator-progress"));

            // Define the percentage ranges for each item (as [start%, end%])
            const desktopRanges = [
                [0, 35],
                [8, 43],
                [16, 51],
                [24, 59],
                [32, 67],
                [40, 75],
                [48, 83],
                [56, 91],
                [64, 99],
                [72, 107]
            ];

            const mobileRanges = [
                [0, 25],
                [8, 33],
                [16, 41],
                [24, 49],
                [32, 57],
                [40, 65],
                [48, 73],
                [56, 81],
                [64, 89],
                [72, 97]
            ];

            // Detect mobile device (adjust the breakpoint as needed)
            const isMobile = window.matchMedia("(max-width: 991px)").matches;
            const ranges = isMobile ? mobileRanges : desktopRanges;

            // Keyframes helper for "flat-fade-flat"
            function getOpacityKeyframes() {
                return [
                    { opacity: 0.3, duration: 0.4 },  // 0-40%
                    { opacity: 1, duration: 0.1 },    // 40-50%
                    { opacity: 0.3, duration: 0.1 },  // 50-60%
                    { opacity: 0.3, duration: 0.4 }   // 60-100%
                ];
            }

            // Keyframes helper for mobile (fades background programs completely)
            function getMobileOpacityKeyframes() {
                return [
                    { opacity: 0, duration: 0.4 },    // 0-40%
                    { opacity: 1, duration: 0.1 },    // 40-50%
                    { opacity: 0, duration: 0.1 },    // 50-60%
                    { opacity: 0, duration: 0.4 }     // 60-100%
                ];
            }

            // Animate each .item as before
            items.forEach((item, i) => {
                if (ranges[i]) {
                    const [startPercent, endPercent] = ranges[i];
                    // Always use the "0 opacity" keyframes (previously mobile-only)
                    // to ensure background programs are fully faded out on all devices.
                    const keyframes = getMobileOpacityKeyframes();
                    const baseOpacity = 0;

                    gsap.fromTo(item,
                        { rotate: 90, opacity: baseOpacity },
                        {
                            rotate: -90,
                            keyframes: keyframes,
                            ease: "none",
                            scrollTrigger: {
                                trigger: triggerSelector,
                                scrub: true,
                                start: `top+=${startPercent}% bottom`,
                                end: `top+=${endPercent}% top`
                            }
                        }
                    );
                }
            });

            // ===== Indicator fill logic: sequential, filling between 25%–75% scroll =====
            ScrollTrigger.create({
                trigger: triggerSelector,
                scrub: true,
                start: "top bottom",
                end: "bottom top",
                onUpdate: self => {
                    let scrollProgress = self.progress; // 0–1 over full .trigger scroll
                    let min = 0.15;
                    let max = 0.85;
                    let normalized = (scrollProgress - min) / (max - min); // 0–1 within [25%, 75%]
                    normalized = Math.max(0, Math.min(1, normalized));     // clamp

                    const INDICATOR_COUNT = indicators.length;
                    const SEGMENT = 1 / INDICATOR_COUNT;

                    indicators.forEach((ind, i) => {
                        const start = i * SEGMENT;
                        const end = (i + 1) * SEGMENT;
                        let progress = (normalized - start) / SEGMENT;
                        progress = Math.max(0, Math.min(1, progress));

                        // Only show the baseline 20% once active
                        const barWidth = progress > 0 ? (20 + progress * 80) : 0;

                        gsap.to(indicatorProgress[i], {
                            width: `${barWidth}%`,
                            duration: 0.1,
                            overwrite: true,
                            ease: "power1.out"
                        });

                        ind.classList.toggle("is-active", progress > 0 && progress < 1);
                    });
                }
            });
        }

        // Footer Color Animation
        if (document.querySelector(".footer") && document.querySelector(".footer-color")) {
            gsap.set(".footer-color", { opacity: 0, yPercent: 30 });
            gsap.to(".footer-color", {
                opacity: 1,
                yPercent: 0,
                ease: "none",
                scrollTrigger: {
                    markers: false,
                    trigger: ".footer",
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: 2,
                    invalidateOnRefresh: true,
                }
            });
        }
    }
});



// Modal Logic
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('cta-modal');
    // Select all trigger buttons by class instead of ID
    const triggerBtns = document.querySelectorAll('.trigger-cta-modal');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.getElementById('career-path-form');

    if (modal && triggerBtns.length > 0 && closeBtn) {
        // Open Modal for each trigger button
        triggerBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Close Modal
        closeBtn.addEventListener('click', function () {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
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
                // Gather Data (for demo purposes logging to console)
                const formData = new FormData(form);
                const data = {};
                formData.forEach((value, key) => data[key] = value);


                alert('Thank you! Our career expert will contact you shortly.');
                form.reset();
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        // Trigger on First Scroll
        const onFirstScroll = () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            window.removeEventListener('scroll', onFirstScroll);
        };
        window.addEventListener('scroll', onFirstScroll);
    }
});

// Initialize International Telephone Input
document.addEventListener('DOMContentLoaded', function () {
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
});

// Testimonial Carousel Init
// Custom Carousel Init (Ported from Brototypelanding)
document.addEventListener("DOMContentLoaded", () => {
    // Video Carousel Hybrid Scroll (Auto + Manual)
    const trackContainers = document.querySelectorAll('.carousel-track-container');

    trackContainers.forEach(container => {
        const track = container.querySelector('.carousel-track');
        // Ensure we handle the case where track might be null (defensive coding)
        if (!track) return;

        const isReverse = track.classList.contains('reverse-track');

        // State for Drag/Swipe
        let isDown = false;
        let startX;
        let scrollLeft;
        let isDragging = false;
        let touchStartX = 0;

        // Desktop: Continuous Marquee
        if (window.innerWidth > 768) {
            // Auto-scroll speed
            const speed = 0.5; // Adjusted speed

            // State
            let isPaused = false;
            // let animationId; // unused

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
            isDragging = false;
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('active');
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('active');
            setTimeout(() => {
                // container.dataset.wasDragging = "false"; // Legacy check
                isDragging = false;
            }, 50);
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;

            if (Math.abs(x - startX) > 5) {
                // container.dataset.wasDragging = "true"; // Legacy check
                isDragging = true;
            }
            container.scrollLeft = scrollLeft - walk;
        });

        // Click Interception (Capture Phase)
        container.addEventListener('click', (e) => {
            // If we determined it was a drag (via mouse or touch), stop the click
            if (isDragging) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    });

    // Video Cards Click Logic
    const videoCards = document.querySelectorAll('.video-facade-card');
    videoCards.forEach(card => {
        const video = card.querySelector('.story-thumb-video');
        const playBtn = card.querySelector('.play-button-small');
        const container = card.closest('.carousel-track-container');

        if (video) {
            const resetState = () => {
                // When paused or ended, show default state
                if (video.paused || video.ended) {
                    video.controls = false;
                    if (playBtn) playBtn.style.display = 'flex'; // Ensure flex
                    if (container) container.dataset.isPlaying = "false";
                }
            };

            video.addEventListener('pause', resetState);
            video.addEventListener('ended', resetState);
        }

        card.addEventListener('click', function (e) {
            // The container capture listener above handles drag prevention.
            // If we are here, it's a valid click.

            const video = this.querySelector('.story-thumb-video');
            const playBtn = this.querySelector('.play-button-small');

            if (video) {
                // Pause all other videos
                document.querySelectorAll('.story-thumb-video').forEach(v => {
                    if (v !== video && !v.paused) {
                        v.pause();
                        // Reset UI for others immediately
                        v.controls = false;
                        const otherCard = v.closest('.story-card');
                        const otherBtn = otherCard.querySelector('.play-button-small');
                        if (otherBtn) otherBtn.style.display = 'flex';
                    }
                });

                video.muted = false;
                video.controls = true;

                // Robust Play
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Auto-play prevented:", error);
                    });
                }

                if (playBtn) playBtn.style.display = 'none';
                video.style.opacity = '1';

                if (container) {
                    container.dataset.isPlaying = "true"; // Stop auto-scroll

                    // Center the card Logic (Robust)
                    const containerRect = container.getBoundingClientRect();
                    const cardRect = this.getBoundingClientRect();
                    const currentScroll = container.scrollLeft;

                    const relativeCardLeft = cardRect.left - containerRect.left;

                    // Center generic calculation
                    // Target = CurrentScroll + (CardRelativeLeft) - (HalfContainer) + (HalfCard)
                    const targetScroll = currentScroll + relativeCardLeft - (containerRect.width / 2) + (cardRect.width / 2);

                    container.scrollTo({
                        left: targetScroll,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
