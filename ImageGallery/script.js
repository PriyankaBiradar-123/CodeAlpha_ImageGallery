
// ===================================
// LENSORA - IMAGE GALLERY
// ===================================

// 1. IMAGE COLLECTION

const images = [
    {
        title: "Mountain Paradise",
        category: "nature",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900"
    },
    {
        title: "Alpine Dawn",
        category: "nature",
        image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=900"
    },
    {
        title: "Misty Highlands",
        category: "nature",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900"
    },
    {
        title: "Forest Escape",
        category: "nature",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900"
    },
    {
        title: "Ocean Dreams",
        category: "nature",
        image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=900"
    },
    {
        title: "Golden Sunset",
        category: "nature",
        image: "https://images.unsplash.com/photo-1472120435266-53107fd0c44a?w=900"
    },
    {
        title: "City Adventures",
        category: "travel",
        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900"
    },
    {
        title: "Venice Canals",
        category: "travel",
        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=900"
    },
    {
        title: "Island Horizon",
        category: "travel",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900"
    },
    {
        title: "Coastal Journey",
        category: "travel",
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900"
    },
    {
        title: "Desert Journey",
        category: "travel",
        image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900"
    },
    {
        title: "Ancient Streets",
        category: "travel",
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=900"
    },
    {
        title: "Modern Architecture",
        category: "architecture",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900"
    },
    {
        title: "Glass Facade",
        category: "architecture",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900"
    },
    {
        title: "Concrete Curves",
        category: "architecture",
        image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=900"
    },
    {
        title: "Urban Geometry",
        category: "architecture",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900"
    },
    {
        title: "Wild Beauty",
        category: "wildlife",
        image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=900"
    },
    {
        title: "Elephant Trail",
        category: "wildlife",
        image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=900"
    },
    {
        title: "Quiet Giraffe",
        category: "wildlife",
        image: "https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=900"
    },
    {
        title: "Into the Wild",
        category: "wildlife",
        image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=900"
    }
];


// 2. GET HTML ELEMENTS

const galleryGrid = document.getElementById("galleryGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const imageCount = document.getElementById("imageCount");
const noResults = document.getElementById("noResults");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const lightboxCounter = document.getElementById("lightboxCounter");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");


// 3. VARIABLES

let activeCategory = "all";
let searchText = "";
let visibleImages = [];
let currentIndex = 0;


// 4. DISPLAY IMAGES

function displayImages() {

    // Filter images according to category and search
    visibleImages = images.filter((image) => {

        const matchesCategory =
            activeCategory === "all" ||
            image.category === activeCategory;

        const matchesSearch =
            image.title.toLowerCase().includes(searchText) ||
            image.category.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    // Clear previous gallery
    galleryGrid.innerHTML = "";

    // Update image count
    imageCount.textContent =
        `${visibleImages.length} photograph${visibleImages.length === 1 ? "" : "s"}`;

    // Show message if no images match
    noResults.hidden = visibleImages.length !== 0;

    // Create gallery cards
    visibleImages.forEach((image, index) => {

        const card = document.createElement("div");
        card.className = "gallery-card";
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `Open photograph: ${image.title}`);

        const img = document.createElement("img");
        img.src = image.image;
        img.alt = image.title;
        img.loading = "lazy";

        const info = document.createElement("div");
        info.className = "card-info";

        const title = document.createElement("h3");
        title.textContent = image.title;

        const category = document.createElement("p");
        category.textContent = image.category;

        info.appendChild(title);
        info.appendChild(category);

        card.appendChild(img);
        card.appendChild(info);

        // Open image when clicked
        card.addEventListener("click", () => {
            openLightbox(index);
        });

        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox(index);
            }
        });

        galleryGrid.appendChild(card);
    });
}


// 5. CATEGORY FILTER

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active class from all buttons
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        // Activate selected button
        button.classList.add("active");
        filterButtons.forEach((filterButton) => {
            filterButton.setAttribute("aria-pressed", String(filterButton === button));
        });

        // Get selected category
        activeCategory = button.dataset.category;

        // Refresh gallery
        displayImages();
    });

});


// 6. SEARCH FUNCTION

searchInput.addEventListener("input", () => {

    searchText = searchInput.value.toLowerCase().trim();

    displayImages();

});


// 7. OPEN LIGHTBOX

function openLightbox(index) {

    currentIndex = index;

    updateLightbox();

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closeBtn.focus();
}


// 8. UPDATE LIGHTBOX IMAGE

function updateLightbox() {

    const image = visibleImages[currentIndex];

    if (!image) return;

    lightboxImage.src = image.image;
    lightboxImage.alt = image.title;

    lightboxTitle.textContent = image.title;

    lightboxCategory.textContent =
        image.category.toUpperCase();

    lightboxCounter.textContent =
        `${currentIndex + 1} / ${visibleImages.length}`;

}


// 9. NEXT IMAGE

function nextImage() {

    if (visibleImages.length === 0) return;

    currentIndex =
        (currentIndex + 1) % visibleImages.length;

    updateLightbox();

}


// 10. PREVIOUS IMAGE

function previousImage() {

    if (visibleImages.length === 0) return;

    currentIndex =
        (currentIndex - 1 + visibleImages.length) %
        visibleImages.length;

    updateLightbox();

}


// 11. CLOSE LIGHTBOX

function closeLightbox() {

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


// 12. BUTTON EVENTS

nextBtn.addEventListener("click", nextImage);

prevBtn.addEventListener("click", previousImage);

closeBtn.addEventListener("click", closeLightbox);


// Close when clicking outside the image

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


// 13. KEYBOARD SUPPORT

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        nextImage();
    }

    if (event.key === "ArrowLeft") {
        previousImage();
    }

});


// 14. INITIALIZE GALLERY

displayImages();

console.log("Lensora Image Gallery Loaded Successfully!");
