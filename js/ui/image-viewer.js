// =========================
// Fullscreen Viewer
// =========================
let currentImages = [];

let currentImageIndex = 0;

function showImage(index) {

  if (!currentImages.length) return;

  if (index < 0) {
    index = currentImages.length - 1;
  }

  if (index >= currentImages.length) {
    index = 0;
  }

  currentImageIndex = index;

  viewerImage.src =
    currentImages[index].src;
}

export function setupImageViewer() {

  const images =
    document.querySelectorAll(
      ".zoomable"
    );

  let zoom = 1;

  let panX = 0;
  let panY = 0;

  let isDragging = false;

  let startX = 0;
  let startY = 0;

  function updateTransform() {

    viewerImage.style.transform =
      `
      translate(${panX}px, ${panY}px)
      scale(${zoom})
      `;
  }

images.forEach((image, index) => {

  image.onclick = () => {

    currentImages = [...images];

    currentImageIndex = index;

    showImage(index);

    viewer.classList.add("active");

    zoom = 1;

    panX = 0;
    panY = 0;

    updateTransform();
  };
  });

  // =========================
  // Zoom
  // =========================

  viewer.addEventListener(
    "wheel",
    e => {

      e.preventDefault();

      zoom += e.deltaY * -0.001;

      zoom = Math.min(
        Math.max(1, zoom),
        6
      );

      updateTransform();
    }
  );

  // =========================
  // Drag Start
  // =========================

  viewer.addEventListener(
    "mousedown",
    e => {

      if (e.button !== 0) return;

      e.preventDefault();

      isDragging = true;

      startX = e.clientX - panX;
      startY = e.clientY - panY;

      viewer.classList.add(
        "dragging"
      );
    }
  );

  // =========================
  // Drag Move
  // =========================

  window.addEventListener(
    "mousemove",
    e => {

      if (!isDragging) return;

      panX = e.clientX - startX;
      panY = e.clientY - startY;

      updateTransform();
    }
  );

  // =========================
  // Drag End
  // =========================

  window.addEventListener(
    "mouseup",
    () => {

      isDragging = false;

      viewer.classList.remove(
        "dragging"
      );
    }
  );

  // =========================
  // ESC
  // =========================

  document.addEventListener(
    "keydown",
    e => {

      if (!viewer.classList.contains("active")) {
        return;
      }

      if (e.key === "Escape") {

        viewer.classList.remove(
          "active"
        );
      }

      if (e.key === "ArrowRight") {

        showImage(
          currentImageIndex + 1
        );
      }

      if (e.key === "ArrowLeft") {

        showImage(
          currentImageIndex - 1
        );
      }
    }
  );
}

const closeButton =
  document.getElementById(
    "viewer-close"
  );

closeButton.onclick = (e) => {

  e.stopPropagation();

  viewer.classList.remove(
    "active"
  );
};

const prevButton =
  document.getElementById(
    "viewer-prev"
  );

const nextButton =
  document.getElementById(
    "viewer-next"
  );

prevButton.onclick = () => {

  showImage(
    currentImageIndex - 1
  );
};

nextButton.onclick = () => {

  showImage(
    currentImageIndex + 1
  );
};

const viewer =
  document.getElementById(
    "image-viewer"
  );

const viewerImage =
  document.getElementById(
    "viewer-image"
  );
