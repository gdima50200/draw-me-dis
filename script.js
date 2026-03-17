// =============================================
// DRAW ME DIS! — script.js
// =============================================


// — Star field —

function createStars() {
  var container = document.getElementById('starField');
  var count = 90;

  for (var i = 0; i < count; i++) {
    var star = document.createElement('div');
    star.className = 'star';

    star.style.left = (Math.random() * 100) + '%';
    star.style.top  = (Math.random() * 100) + '%';

    var size = Math.random() < 0.65 ? 1 : 2;
    star.style.width  = size + 'px';
    star.style.height = size + 'px';

    if (Math.random() < 0.33) {
      star.classList.add('twinkle');
      star.style.setProperty('--twinkle-dur',   (2.5 + Math.random() * 3.5) + 's');
      star.style.setProperty('--twinkle-delay', (Math.random() * 5) + 's');
    }

    container.appendChild(star);
  }
}

createStars();


// — Doodle data —

var doodles = [
  {
    title: "A Sleepy Cloud",
    desc: "Soft and fluffy, this little cloud is ready for a nap.",
    steps: [
      "Draw a big oval in the middle — that's the cloud's tummy.",
      "Add two smaller ovals on top, overlapping the big one.",
      "Put a tiny oval on the far left and right sides.",
      "Give it two little closed eyes — just curved lines.",
      "Add tiny 'zzz' floating above it. Done!",
    ],
  },
  {
    title: "A Shy Cactus",
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
    title: "A Happy Snail",
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
    title: "A Tiny Mushroom",
    desc: "Round cap, polka dots, very magical.",
    steps: [
      "Draw a rounded dome shape — the cap.",
      "Add a short wide stem underneath it.",
      "Draw a wavy line across where cap meets stem.",
      "Add 3-4 small circles on the cap for spots.",
      "Put two tiny eyes and a smile on the stem.",
    ],
  },
  {
    title: "A Cozy Mug",
    desc: "Warm, steam rising, completely content.",
    steps: [
      "Draw a rounded rectangle — slightly wider at the top.",
      "Add a C-shaped handle on the right side.",
      "Draw a wavy line near the top for the liquid level.",
      "Add two wiggly lines rising from the top for steam.",
      "Give the mug a tiny face — sleepy eyes and a smile.",
    ],
  },
  {
    title: "A Wobbly Star",
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
    title: "A Chubby Bird",
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
    title: "A Little House",
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


// — State —

var currentDoodle = null;
var currentStep   = 0;
var shownSteps    = [];

var note         = document.getElementById('stickyNote');
var noteContent  = document.getElementById('noteContent');
var progressFill = document.getElementById('progressFill');


// — Helpers —

function setProgress(pct) {
  progressFill.style.width = pct + '%';
}


// — Render functions —

function renderIntro() {
  setProgress(0);
  noteContent.innerHTML = ''
    + '<div class="intro-icon">&#x270F;&#xFE0F;</div>'
    + '<div class="note-title">hey there!<br>let\'s doodle.</div>'
    + '<div class="note-desc">I\'ll give you a cute little drawing idea and walk you through it step by step. No skill needed — just a pen and a smile.</div>'
    + '<div class="note-tagline">&#x2726; one shape at a time &#x2726;</div>'
    + '<div class="note-divider"></div>'
    + '<div class="btn-row">'
    +   '<button class="btn btn-generate" id="generateBtn">&#x270F;&#xFE0F; Generate Doodle</button>'
    + '</div>';

  document.getElementById('generateBtn').addEventListener('click', generate);
}

function renderDoodle() {
  var d          = currentDoodle;
  var totalSteps = d.steps.length;
  var isLast     = currentStep >= totalSteps;

  var pct = isLast ? 100 : Math.round((currentStep / totalSteps) * 100);
  setProgress(pct);

  var historyHTML = '';
  if (shownSteps.length > 0) {
    historyHTML += '<div class="steps-history">';
    shownSteps.forEach(function(s, i) {
      historyHTML += '<div class="step-past">&#x2713; Step ' + (i + 1) + ': ' + s + '</div>';
    });
    historyHTML += '</div>';
  }

  var stepHTML = '';
  if (!isLast) {
    stepHTML = ''
      + '<div class="step-number">Step ' + (currentStep + 1) + ' of ' + totalSteps + '</div>'
      + '<div class="step-text reveal">' + d.steps[currentStep] + '</div>';
  }

  var btnsHTML = '';
  if (isLast) {
    btnsHTML = ''
      + '<div class="done-message">&#x1F389; You did it!</div>'
      + '<div class="btn-row">'
      +   '<button class="btn btn-pic" id="picBtn">Show someone! &#x1F4F8;</button>'
      +   '<button class="btn btn-small" id="newBtn">&#x2726; New Doodle</button>'
      + '</div>';
  } else {
    btnsHTML = ''
      + '<div class="btn-row-inline">'
      +   '<button class="btn btn-next" id="nextBtn">Next Step &#x2192;</button>'
      +   '<button class="btn btn-small" id="newBtn">New</button>'
      + '</div>';
  }

  noteContent.innerHTML = ''
    + '<div class="note-label">doodle idea &#x2726;</div>'
    + '<div class="note-title">' + d.title + '</div>'
    + '<div class="note-desc">' + d.desc + '</div>'
    + '<div class="note-divider"></div>'
    + historyHTML
    + stepHTML
    + '<div class="note-divider"></div>'
    + btnsHTML;

  if (!isLast) {
    document.getElementById('nextBtn').addEventListener('click', nextStep);
  } else {
    document.getElementById('picBtn').addEventListener('click', function() {
      alert('Snap a photo and show someone — they\'ll love it!');
    });
  }
  document.getElementById('newBtn').addEventListener('click', generate);
}


// — Actions —

function nextStep() {
  if (currentStep < currentDoodle.steps.length) {
    shownSteps.push(currentDoodle.steps[currentStep]);
    currentStep++;
    renderDoodle();
  }
}

function generate() {
  // Vary the crumple direction slightly each time
  var midRot = (2 + Math.random() * 4) * (Math.random() < 0.5 ? 1 : -1);
  var endRot = (5 + Math.random() * 5) * (Math.random() < 0.5 ? 1 : -1);
  note.style.setProperty('--crumple-mid', midRot + 'deg');
  note.style.setProperty('--crumple-end', endRot + 'deg');

  var popStart = (-2 - Math.random() * 3) + 'deg';
  note.style.setProperty('--popin-start', popStart);

  note.classList.remove('pop-in');
  note.classList.add('crumple-out');

  setTimeout(function() {
    // Pick a different doodle from the current one
    var pool = doodles.filter(function(d) { return d !== currentDoodle; });
    currentDoodle = pool[Math.floor(Math.random() * pool.length)];
    currentStep   = 0;
    shownSteps    = [];

    note.classList.remove('crumple-out');
    note.style.opacity   = '0';
    note.style.transform = 'rotate(' + popStart + ') scale(0.82)';

    renderDoodle();

    void note.offsetWidth; // force reflow

    note.style.opacity   = '';
    note.style.transform = '';
    note.classList.add('pop-in');

    note.addEventListener('animationend', function() {
      note.classList.remove('pop-in');
    }, { once: true });

  }, 380);
}


// — Init —
renderIntro();
