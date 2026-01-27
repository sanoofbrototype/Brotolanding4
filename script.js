
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
document.addEventListener("DOMContentLoaded", () => {
    if (typeof Splide !== 'undefined' && document.querySelector("#testimonial-carousel")) {
        const testimonialSplide = new Splide("#testimonial-carousel", {
            type: 'loop',
            perPage: 4,
            gap: '2rem',
            arrows: false,
            pagination: true,
            drag: true, // Ensure manual scrolling is enabled
            // Autoscroll config
            autoScroll: {
                speed: 0.5,
                pauseOnHover: true,
                pauseOnFocus: true,
            },
            breakpoints: {
                991: {
                    perPage: 2,
                    gap: '1.5rem',
                },
                767: {
                    perPage: 2,
                    gap: '1rem',
                },
            },
        });

        testimonialSplide.mount(window.splide.Extensions);

        // Video Playback Logic
        const carousel = document.querySelector("#testimonial-carousel");
        const videoWrappers = carousel.querySelectorAll('.video-wrapper');

        videoWrappers.forEach(wrapper => {
            const video = wrapper.querySelector('video');
            const playBtn = wrapper.querySelector('.play-btn');

            if (video && playBtn) {
                // Play Button Click
                playBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent slide click if any
                    toggleVideo(video, wrapper);
                });

                // Video Click
                video.addEventListener('click', () => {
                    toggleVideo(video, wrapper);
                });

                // Ended Event
                video.addEventListener('ended', () => {
                    wrapper.classList.remove('is-playing');
                    // Resume autoscroll
                    if (testimonialSplide.Components.AutoScroll) {
                        testimonialSplide.Components.AutoScroll.play();
                    }
                });
            }
        });

        function toggleVideo(video, wrapper) {
            if (video.paused) {
                // Pause all other videos
                videoWrappers.forEach(w => {
                    const v = w.querySelector('video');
                    if (v && v !== video && !v.paused) {
                        v.pause();
                        w.classList.remove('is-playing');
                    }
                });

                // Play this video
                video.play();
                wrapper.classList.add('is-playing');

                // Pause autoscroll
                if (testimonialSplide.Components.AutoScroll) {
                    testimonialSplide.Components.AutoScroll.pause();
                }

            } else {
                // Pause this video
                video.pause();
                wrapper.classList.remove('is-playing');

                // Resume autoscroll
                if (testimonialSplide.Components.AutoScroll) {
                    testimonialSplide.Components.AutoScroll.play();
                }
            }
        }
    }
});
