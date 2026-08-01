import {
  processRightTag,
  processLeftTag,
  processBothTag,
  processConfusionTag
} from "./typography.js";

import {
  processInlineIDs,
  processImagedIDs,
  processDataIDs
} from "./ids.js";

import {
  processTabLinks
} from "./tab-links.js";

import { renderCopyIcon } from "../core/utils.js";

const componentProcessors = [
  processRightTag,
  processLeftTag,
  processBothTag,
  processConfusionTag,
  processInlineIDs,
  processImagedIDs,
  processDataIDs,

  processTabLinks
];


export function processCustomComponents(html) {

  for (const processor of componentProcessors) {

    html = processor(html);
  }

  return html;
}