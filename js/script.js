const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) {
        return;
    }

    button.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        faqItems.forEach((otherItem) => {
            const otherButton = otherItem.querySelector(".faq-question");
            const otherAnswer = otherItem.querySelector(".faq-answer");

            otherItem.classList.remove("active");

            if (otherButton) {
                otherButton.setAttribute("aria-expanded", "false");
            }

            if (otherAnswer) {
                otherAnswer.style.maxHeight = null;
            }
        });

        if (!isOpen) {
            item.classList.add("active");
            button.setAttribute("aria-expanded", "true");
            answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
    });
});

const statNumbers = document.querySelectorAll(".stat-number");

const animateNumber = (element) => {
    const target = Number(element.dataset.target);
    const suffix = element.dataset.suffix || "";
    const duration = 1400;
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * target);

        element.textContent = `${value}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = `${target}${suffix}`;
        }
    };

    requestAnimationFrame(updateNumber);
};

if ("IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                statNumbers.forEach((number) => animateNumber(number));
                observer.disconnect();
            });
        },
        {
            threshold: 0.35
        }
    );

    const statsSection = document.querySelector(".stats-section");

    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}