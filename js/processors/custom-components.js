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

import { renderCopyIcon } from "../core/utils.js";

const componentProcessors = [
  processRightTag,
  processLeftTag,
  processBothTag,
  processConfusionTag,
  processInlineIDs,
  processImagedIDs,
  processDataIDs
];


export function processCustomComponents(html) {

  for (const processor of componentProcessors) {

    html = processor(html);
  }

  return html;
}