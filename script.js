const DAMPING = 6;
const DELAY = 20;

function* shuffle(word) {
  let abc = "abcdefghijklmnopqrstuvwxyz";
  let w = [...word];
  let steps = (w.length + 1) * DAMPING;

  for (let step = 0; step < steps; step++) {
    for (let k = 0; k < w.length; k++) {
      if (step >= steps - w.length * DAMPING + k * DAMPING) w[k] = word[k];
      else w[k] = abc[0 | (Math.random() * abc.length)];
    }
    yield w.join("");
  }
}

async function delay(n) {
  return new Promise((r) => setTimeout(r, n));
}

async function animate(el) {
  let word = el.textContent;
  for (let w of shuffle(word)) {
    if (!el.matches(":hover")) break;
    el.textContent = w;
    await delay(DELAY);
  }
  el.textContent = word;
}

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".nav_menu_link");

  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", () => animate(item));
  });
});
