
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


// GSAP Animations
document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Programs Section Rotary Animation
        const section = document.querySelector(".section-portfolio");
        if (section) {
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
        }
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

// CTA Modal Logic
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('cta-modal');
    const triggerBtns = document.querySelectorAll('.trigger-cta-modal');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.getElementById('career-path-form');

    if (modal && triggerBtns.length > 0 && closeBtn) {
        // Open Modal
        triggerBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
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
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            window.removeEventListener('scroll', onFirstScroll);
        };
        window.addEventListener('scroll', onFirstScroll);
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
        let startX, scrollLeft;
        let isDragging = false;
        let touchStartX = 0;
        let dragStartX, dragStartY, dragStartTime;

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
                            // resetState (via 'pause' event) will handle icon reset
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
});
