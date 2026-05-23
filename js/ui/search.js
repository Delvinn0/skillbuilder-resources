import {
  searchInput,
  searchCount
} from "../core/elements.js";

import {
  marker,
  getResults,
  setResults,
  getCurrentIndex,
  setCurrentIndex
} from "../core/state.js";


// =========================
// Search
// =========================

export function resetSearch() {

  marker.unmark();

  searchInput.value = "";

  searchCount.textContent = "";

  setResults([]);

  setCurrentIndex(0);
}


// =========================
// Events
// =========================

searchInput.addEventListener(
  "input",
  handleSearch
);

searchInput.addEventListener(
  "keydown",
  navigateSearchResults
);


// =========================
// Handle Search
// =========================

export function handleSearch() {

  const query =
    searchInput.value.trim();

  setCurrentIndex(0);

  marker.unmark({

    done: () => {

      if (!query) {

        setResults([]);

        searchCount.textContent = "";

        return;
      }

      marker.mark(query, {

        separateWordSearch: false,

        done: () => {

          const marks =
            Array.from(
              document.querySelectorAll("mark")
            );

          setResults(marks);

          updateCurrentResult();
        }
      });
    }
  });
}


// =========================
// Navigation
// =========================

export function navigateSearchResults(e) {

  const results =
    getResults();

  let currentIndex =
    getCurrentIndex();

  if (!results.length) return;

  if (e.key !== "Enter") return;

  e.preventDefault();

  if (e.shiftKey) {

    currentIndex--;

    if (currentIndex < 0) {

      currentIndex =
        results.length - 1;
    }

  } else {

    currentIndex++;

    if (currentIndex >= results.length) {

      currentIndex = 0;
    }
  }

  setCurrentIndex(currentIndex);

  updateCurrentResult();
}


// =========================
// Update Current Result
// =========================

export function updateCurrentResult() {

  const results =
    getResults();

  const currentIndex =
    getCurrentIndex();

  results.forEach(result => {

    result.classList.remove(
      "current-result"
    );
  });

  const current =
    results[currentIndex];

  if (!current) return;

  current.classList.add(
    "current-result"
  );

  current.scrollIntoView({

    behavior: "smooth",

    block: "center"
  });

  searchCount.textContent =
    `${currentIndex + 1}/${results.length}`;
}