export function parseProps(content) {

  const props = {};

  content
    .split("\n")
    .forEach(line => {

      const clean = line.trim();

      if (!clean || !clean.includes("=")) {
        return;
      }

      const i =
        clean.indexOf("=");

      const key =
        clean
          .slice(0, i)
          .trim()
          .toLowerCase();

      const value =
        clean
          .slice(i + 1)
          .trim();

      props[key] = value;
    });

  return props;
}


export function renderCopyIcon() {

  return `
    <span class="copy-icon">
      󰆏
    </span>
  `;
}


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