import { content } from "./elements.js";

import {
  processCustomComponents
} from "../processors/custom-components.js";

import {
  processImageComponents
} from "../processors/image-components.js";

import {
  generateOutline
} from "../ui/outline.js";

import {
  setupCopyables
} from "../ui/clipboard.js";

import {
  setupImageViewer
} from "../ui/image-viewer.js";

import { renderCopyIcon } from "../core/utils.js";


export async function getMarkdown(path) {

  const response =
    await fetch(path);
    

  if (!response.ok) {
    throw new Error(
      `Failed to load: ${path}. Maybe it is still being worked on or just don't extist`
    );
  }

  return await response.text();
}


export async function getTitle(path) {

  try {

    const markdown =
      await getMarkdown(path);

    const firstHeading =
      markdown.match(/^#\s(.+)/m);

    return {
      title:
        firstHeading
        ? firstHeading[1]
        : path,

      exists: true
    };

  } catch {

    return {
      title: "🚧 WIP",
      exists: false
    };
  }
}

export async function loadMarkdown(path) {

  const markdown =
    await getMarkdown(path);

  let html =
    marked.parse(markdown);

  html =
    processCustomComponents(html);

  html =
    processImageComponents(html);

  content.innerHTML = html;

  generateOutline();

  setupCopyables();

  setupImageViewer();
}