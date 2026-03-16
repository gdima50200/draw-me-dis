// =============================================
// DRAW ME DIS! — script.js
// =============================================

// --- DATA ---

const animals = [
  "mouse", "frog", "duck", "bunny", "hedgehog",
  "turtle", "penguin", "fox", "owl", "cat",
  "snail", "bear cub", "axolotl", "capybara"
];

const objects = [
  "teacup", "mushroom", "flower pot", "donut", "lantern",
  "watering can", "umbrella", "ice cream cone", "treasure chest",
  "tiny boat", "stack of books", "birdhouse"
];

const patterns = [
  "spirals", "polka dots", "waves", "checkerboard",
  "bubbles", "zigzags", "stars", "crosshatching",
  "fish scales", "tiny hearts", "honeycomb"
];

// --- STATE ---

let currentAnimal = "";
let currentObject = "";
let currentPattern = "";
let currentSteps = [];
let currentStepIndex = 0;

// --- FUNCTIONS ---

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateIdea() {
  currentAnimal  = randomItem(animals);
  currentObject  = randomItem(objects);
  currentPattern = randomItem(patterns);

  currentSteps = generateSteps(currentAnimal, currentObject, currentPattern);
  currentStepIndex = 0;

  // Show the idea
  const ideaDisplay = document.getElementById("idea-display");
  ideaDisplay.textContent =
    `Your doodle: a ${currentAnimal} with a ${currentObject}, ` +
    `decorated with ${currentPattern}!`;

  // Reveal first step
  showStep(0);

  // Show steps section, hide name/reset from previous round
  document.getElementById("steps-section").classList.remove("hidden");
  document.getElementById("name-section").classList.add("hidden");
  document.getElementById("reset-btn").classList.add("hidden");
  document.getElementById("name-result").classList.add("hidden");
  document.getElementById("doodle-name").value = "";

  // Make sure next button is visible
  document.getElementById("next-btn").classList.remove("hidden");
}

function generateSteps(animal, object, pattern) {
  return [
    `Draw a simple outline shape in the center of your page to form the body of a ${animal}. Keep it small — fist-sized is perfect.`,
    `Add the details that make it clearly a ${animal}: think about its most recognizable features like ears, a beak, fins, or spines.`,
    `Draw a ${object} next to or underneath your ${animal}. It can be leaning, floating, or held in a tiny paw.`,
    `Connect your ${animal} and the ${object} with a fun little interaction. Maybe the ${animal} is peeking over it, sitting on it, or hugging it.`,
    `Add tiny details: eyes, texture, little patterns on the ${object}. Make it feel alive!`,
    `Now fill the background with ${pattern}. Cover empty space bit by bit — no rush.`,
    `That's it! Your doodle is complete. Give it a name below. ✨`
  ];
}

function showStep(index) {
  const stepLabel   = document.getElementById("step-label");
  const stepDisplay = document.getElementById("step-display");
  const nextBtn     = document.getElementById("next-btn");
  const total       = currentSteps.length;

  const isLast = index === total - 1;

  stepLabel.textContent   = isLast ? "Final Step" : `Step ${index + 1} of ${total - 1}`;
  stepDisplay.textContent = currentSteps[index];

  if (isLast) {
    nextBtn.classList.add("hidden");
    document.getElementById("name-section").classList.remove("hidden");
    document.getElementById("reset-btn").classList.remove("hidden");
  }
}

function showNextStep() {
  currentStepIndex++;
  if (currentStepIndex < currentSteps.length) {
    showStep(currentStepIndex);
  }
}

function saveName() {
  const input  = document.getElementById("doodle-name");
  const result = document.getElementById("name-result");
  const name   = input.value.trim();

  if (!name) {
    result.textContent = "Give it a name first!";
    result.classList.remove("hidden");
    return;
  }

  result.textContent = `"${name}" — a masterpiece! 🎉`;
  result.classList.remove("hidden");
}

function resetDoodle() {
  currentAnimal  = "";
  currentObject  = "";
  currentPattern = "";
  currentSteps   = [];
  currentStepIndex = 0;

  document.getElementById("idea-display").textContent =
    "Press the button below to get your doodle idea!";

  document.getElementById("steps-section").classList.add("hidden");
  document.getElementById("name-section").classList.add("hidden");
  document.getElementById("reset-btn").classList.add("hidden");
  document.getElementById("name-result").classList.add("hidden");
  document.getElementById("doodle-name").value = "";
}
