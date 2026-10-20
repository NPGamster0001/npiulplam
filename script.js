const hearts = document.getElementById("hearts");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const overlay = document.getElementById("overlay");

const symbols = ["♥", "♡", "❤"];
const colors = ["#ff4d6d", "#ff758f", "#ff8fab", "#ffb3c6", "#e11d48", "#ffffff"];

function createFallingHeart(fromTop) {
  const heart = document.createElement("span");
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${14 + Math.random() * 28}px`;
  heart.style.color = colors[Math.floor(Math.random() * colors.length)];
  heart.style.animationDuration = `${7 + Math.random() * 10}s`;
  heart.style.animationDelay = fromTop ? `${Math.random() * 8}s` : "0s";
  heart.style.setProperty("--drift", `${-70 + Math.random() * 140}px`);
  heart.style.opacity = `${0.45 + Math.random() * 0.5}`;
  hearts.appendChild(heart);

  if (!fromTop) {
    heart.addEventListener("animationend", () => heart.remove());
  }
}

for (let i = 0; i < 36; i += 1) {
  createFallingHeart(true);
}

setInterval(() => createFallingHeart(false), 380);

function burstHearts() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < 28; i += 1) {
    const heart = document.createElement("span");
    heart.className = "burst";
    heart.textContent = symbols[i % symbols.length];
    heart.style.left = `${centerX}px`;
    heart.style.top = `${centerY}px`;
    heart.style.fontSize = `${18 + Math.random() * 26}px`;
    heart.style.color = colors[i % colors.length];
    const angle = (Math.PI * 2 * i) / 28;
    const dist = 80 + Math.random() * 180;
    heart.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
    heart.style.setProperty("--ty", `${Math.sin(angle) * dist}px`);
    hearts.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
}

function moveNoButton() {
  const padding = 16;
  const maxX = Math.max(padding, window.innerWidth - noBtn.offsetWidth - padding);
  const maxY = Math.max(padding, window.innerHeight - noBtn.offsetHeight - padding);
  const x = padding + Math.random() * (maxX - padding);
  const y = padding + Math.random() * (maxY - padding);

  noBtn.classList.add("flee");
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("mousemove", moveNoButton);
noBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveNoButton();
});
noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  moveNoButton();
});

yesBtn.addEventListener("click", () => {
  overlay.hidden = false;
  noBtn.style.display = "none";
  burstHearts();
});
