document.addEventListener("DOMContentLoaded", function () {

    const pageName = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".site-nav .nav-link").forEach(function (link) {
        if (link.getAttribute("href") === pageName) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    const searchBox = document.getElementById("serviceSearch");
    const serviceCards = document.querySelectorAll(".service-card");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const noServices = document.getElementById("noServices");

    let selectedFilter = "all";

    function filterServices() {
        if (!searchBox || !noServices) return;

        const searchText = searchBox.value.toLowerCase().trim();
        let visibleCount = 0;

        serviceCards.forEach(function (card) {
            const matchesText = card.textContent.toLowerCase().includes(searchText);
            const matchesCategory = selectedFilter === "all" ||
                card.dataset.category === selectedFilter;

            card.hidden = !(matchesText && matchesCategory);

            if (!card.hidden) visibleCount++;
        });

        noServices.hidden = visibleCount > 0;
    }

    if (searchBox) {
        searchBox.addEventListener("input", filterServices);
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            selectedFilter = button.dataset.filter;

            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");
            filterServices();
        });
    });

    
    function validateForm(formId, messageId, successText) {
        const form = document.getElementById(formId);
        const message = document.getElementById(messageId);

        if (!form || !message) return;

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.classList.add("was-validated");
                message.className = "alert alert-danger mt-3";
                message.textContent = "Please complete the form correctly.";
                form.reportValidity();
                return;
            }

            message.className = "alert alert-success mt-3";
            message.textContent = successText +
                " This is a demonstration form; no information is sent to a server.";

            form.reset();
            form.classList.remove("was-validated");
        });
    }

    validateForm("bookingForm", "bookingMessage",
        "Thank you! Your booking enquiry has been received.");

    validateForm("contactForm", "contactMessage",
        "Thank you! Your message has been received.");

    const galleryImages = document.querySelectorAll(".gallery-item img");
    const modalElement = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("imageModalLabel");

    if (modalElement && modalImage && window.bootstrap) {
        const imageModal = new bootstrap.Modal(modalElement);

        galleryImages.forEach(function (image) {
            image.addEventListener("click", function () {
                modalImage.src = image.src;
                modalImage.alt = image.alt;

                const caption = image.parentElement.querySelector("figcaption");
                modalTitle.textContent = caption ?
                    caption.textContent : "Gallery Picture";

                imageModal.show();
            });
        });

        modalElement.addEventListener("hidden.bs.modal", function () {
            modalImage.src = "";
        });
    }
});
