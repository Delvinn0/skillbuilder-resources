// =========================
// Typography
// =========================

export function processRightTag(html) {

  return html.replace(

    /\[R\](.*?)\[\/R\]/g,

    (_, text) => `
    <span class="right-tag"> ${text} </span>
    `
  );
}

export function processLeftTag(html) {

  return html.replace(

    /\[L\](.*?)\[\/L\]/g,

    (_, text) => `
    <span class="left-tag"> ${text} </span>
    `
  );
}

export function processBothTag(html) {

  return html.replace(

    /\[B\](.*?)\[\/B\]/g,

    (_, text) => `
    <span class="both-tag"> ${text} </span>
    `
  );
}

export function processConfusionTag(html) {

  return html.replace(

    /\[C\](.*?)\[\/C\]/g,

    (_, text) => `
    <span class="confusion"> ${text} </span>
    `
  );
}
