const doodles = [
  {
    title: "A Sleepy Cloud ☁️",
    desc: "Soft and fluffy, this little cloud is ready for a nap.",
    steps: [
      "Draw a big oval in the middle — that's the cloud's tummy.",
      "Add two smaller ovals on top, overlapping the big one.",
      "Put a tiny oval on the far left and right sides.",
      "Give it two little closed eyes — just curved lines.",
      "Add tiny 'zzz' floatng above it.",
    ],
  },
  {
    title: "A Shy Cactus 🌵",
    desc: "Round, a little poky, but very sweet at heart.",
    steps: [
      "Draw a tall rounded rectangle for the body.",
      "Add a small arm curving out from the left side.",
      "Add another arm curving out from the right, a bit higher.",
      "Draw tiny lines along the body and arms — those are spines!",
      "Add a small pink flower on top. Just a blob with petals.",
      "Give it two tiny eyes and a little smile.",
    ],
  },
  {
    title: "A Happy Snail 🐌",
    desc: "Slow, curly, and full of joy.",
    steps: [
      "Draw a big circle — that'll be the snail's shell.",
      "Inside it, draw a spiral starting from the center.",
      "Attach a little teardrop body coming out the bottom right.",
      "Add a small round head at the front of the body.",
      "Draw two long antennae on top with tiny circles at the tips.",
      "Give it a big goofy smile and dot eyes.",
    ],
  },
  {
    title: "A Tiny Mushroom 🍄",
    desc: "Round cap, polka dots, very magical.",
    steps: [
      "Draw a rounded dome shape — the cap.",
      "Add a short wide stem underneath it.",
      "Draw a wavy line across where cap meets stem.",
      "Add 3–4 small circles on the cap for spots.",
      "Put two tiny eyes and a smile on the stem.",
    ],
  },
  {
    title: "A Cozy Mug ☕",
    desc: "Warm, steam rising, completely content.",
    steps: [
      "Draw a rounded rectangle — slightly wider at the top.",
      "Add a C-shaped handle on the right side.",
      "Draw a wavy line near the top for liquid level.",
      "Add two wiggly lines rising from the top for steam.",
      "Give the mug a tiny face — sleepy eyes and a smile.",
    ],
  },
  {
    title: "A Wobbly Star ⭐",
    desc: "Not perfectly pointed — and that's what makes it great.",
    steps: [
      "Draw a triangle pointing up.",
      "Draw another triangle pointing down, overlapping the first.",
      "Round out the star points a little — make them slightly wobbly.",
      "Add a cute round face in the center.",
      "Draw tiny sparkle lines around it — short dashes radiating out.",
    ],
  },
  {
    title: "A Chubby Bird 🐦",
    desc: "Round body, tiny wings, big personality.",
    steps: [
      "Draw a big circle for the body.",
      "Add a smaller circle on top for the head.",
      "Draw a tiny triangle beak on the side of the head.",
      "Add two small ovals on the sides for wings.",
      "Give it stick legs with little forked feet.",
      "Add big round eyes with tiny shine dots.",
    ],
  },
  {
    title: "A Little House 🏠",
    desc: "Simple and warm, with a chimney and everything.",
    steps: [
      "Draw a square for the main walls.",
      "Add a triangle on top for the roof.",
      "Draw a small rectangle chimney poking up from the roof.",
      "Add a tiny square window on each side.",
      "Draw a door in the center — slightly rounded at the top.",
    ],
  },
];

let currentDoodle = null;
let currentStep = 0;
let shownSteps = [];

const note = document.getElementById('stickyNote');
const noteContent = document.getElementById('noteContent');
const progressFill = document.getElementById('progressFill');
const progressTrack = document.getElementById('progressTrack');

function setProgress(val) {
  progressFill.style.width = val + '%';
}

function renderIntro() {
  setProgress(0);
  noteContent.innerHTML = `
    <div class="intro-icon">✏️</div>
    <div class="note-title">hey there!<br>let's doodle.</div>
    <div class="note-desc">I'll give you a cute little drawing idea + steps to make it. No skill needed — just a pen and a smile.</div>
    <div class="note-tagline">✦ one shape at a time ✦</div>
    <div class="note-divider"></div>
    <div class="btn-row">
      <button class="btn btn-generate" id="generateBtn">✏️ Generate Doodle</button>
    </div>
  `;
  document.getElementById('generateBtn').addEventListener('click', generate);
}

function renderDoodle() {
  const d = currentDoodle;
  const totalSteps = d.steps.length;
  const progress = Math.round(((currentStep) / totalSteps) * 100);
  setProgress(progress);

  const isLast = currentStep >= totalSteps;

  let historyHTML = '';
  if (shownSteps.length > 0) {
    historyHTML = '<div class="steps-history">';
    shownSteps.forEach((s, i) => {
      historyHTML += `<div class="step-past">✓ Step ${i + 1}: ${s}</div>`;
    });
    historyHTML += '</div>';
  }

  let currentStepHTML = '';
  if (!isLast && currentStep < totalSteps) {
    currentStepHTML = `
      <div class="step-number">Step ${currentStep + 1} of ${totalSteps}</div>
      <div class="step-text reveal" id="stepText">${d.steps[currentStep]}</div>
    `;
  }

  let buttonsHTML = '';
  if (isLast) {
    buttonsHTML = `
      <div class="done-message">🎉 You did it!</div>
      <div class="btn-row">
        <button class="btn btn-pic" id="picBtn">Take a pic 📸</button>
        <button class="btn btn-small" id="newBtn">✦ Generate New Doodle</button>
      </div>
    `;
  } else {
    buttonsHTML = `
      <div class="btn-row-inline">
        <button class="btn btn-next" id="nextBtn">Next Step →</button>
        <button class="btn btn-small" id="newBtn">New</button>
      </div>
    `;
  }

  noteContent.innerHTML = `
    <div class="note-label">doodle idea ✦</div>
    <div class="note-title">${d.title}</div>
    <div class="note-desc">${d.desc}</div>
    <div class="note-divider"></div>
    ${historyHTML}
    ${currentStepHTML}
    <div class="note-divider"></div>
    ${buttonsHTML}
  `;

  if (!isLast) {
    document.getElementById('nextBtn').addEventListener('click', nextStep);
  } else {
    document.getElementById('picBtn').addEventListener('click', () => {
      alert("📸 Nice! Show someone your doodle — they'll love it!");
    });
  }

  document.getElementById('newBtn').addEventListener('click', generate);
}

function nextStep() {
  if (currentStep < currentDoodle.steps.length) {
    shownSteps.push(currentDoodle.steps[currentStep]);
    currentStep++;
    renderDoodle();
  }
}

function generate() {
  note.classList.remove('pop-in');
  note.classList.add('crumple-out');

  setTimeout(() => {
    // pick a different doodle from the current one
    let pool = doodles.filter(d => d !== currentDoodle);
    currentDoodle = pool[Math.floor(Math.random() * pool.length)];
    currentStep = 0;
    shownSteps = [];

    note.classList.remove('crumple-out');
    note.style.opacity = '0';
    note.style.transform = 'rotate(-3deg) scale(0.82)';

    renderDoodle();

    // trigger reflow
    void note.offsetWidth;

    note.style.opacity = '';
    note.style.transform = '';
    note.classList.add('pop-in');

    note.addEventListener('animationend', () => {
      note.classList.remove('pop-in');
    }, { once: true });

  }, 360);
}

// init
renderIntro();
