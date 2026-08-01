export function renderDescription(description) {

  if (!description) {
    return "";
  }

  return `
    <p class="image-description">
      ${description}
    </p>
  `;
}