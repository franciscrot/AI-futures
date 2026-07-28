// ===========================================
// script.js — diagnostics + robust rendering
// ===========================================

window.resetDeck = function () {
  window.deck = window.__DECK_SNAPSHOT__.map((card) => ({ ...card }));
};

const MUSIC_TRACKS = [
  "music/andy-spragg-01-chunky.mp3",
  "music/andy-spragg-02-rain.mp3",
  "music/andy-spragg-03-picky.mp3",
  "music/andy-spragg-04-basshumm.mp3",
  "music/andy-spragg-05-buzzedaldrin.mp3",
];

let currentMusicTrackIndex = -1;
let musicRetryPending = false;

function queueMusicRetry() {
  if (musicRetryPending) return;
  musicRetryPending = true;

  const retry = () => {
    document.removeEventListener("pointerdown", retry);
    document.removeEventListener("keydown", retry);
    musicRetryPending = false;
    startBackgroundMusic();
  };

  document.addEventListener("pointerdown", retry, { once: true });
  document.addEventListener("keydown", retry, { once: true });
}

function chooseRandomMusicTrack() {
  if (MUSIC_TRACKS.length === 1) return 0;

  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * MUSIC_TRACKS.length);
  } while (nextIndex === currentMusicTrackIndex);

  return nextIndex;
}

async function playRandomMusicTrack() {
  const audio = document.getElementById("backgroundMusic");
  if (!audio) return;

  currentMusicTrackIndex = chooseRandomMusicTrack();
  audio.src = MUSIC_TRACKS[currentMusicTrackIndex];
  audio.volume = 0.35;

  try {
    await audio.play();
  } catch (error) {
    console.warn(
      "[DSG] Music playback is waiting for another user interaction.",
      error,
    );
    queueMusicRetry();
  }
}

function startBackgroundMusic() {
  const audio = document.getElementById("backgroundMusic");
  if (!audio || !audio.paused) return;
  playRandomMusicTrack();
}

const backgroundMusic = document.getElementById("backgroundMusic");
if (backgroundMusic) {
  backgroundMusic.addEventListener("ended", playRandomMusicTrack);
}

let sfxAudioContext = null;

function getSfxAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!sfxAudioContext) sfxAudioContext = new AudioContextClass();
  return sfxAudioContext;
}

function playSfxTone(
  context,
  {
    start = context.currentTime,
    frequency,
    endFrequency = frequency,
    duration,
    volume,
    wave = "sine",
  },
) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = wave;
  oscillator.frequency.setValueAtTime(frequency, start);
  oscillator.frequency.exponentialRampToValueAtTime(
    endFrequency,
    start + duration,
  );
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.01);
}

function playSkipFlick(context, start) {
  const duration = 0.065;
  const buffer = context.createBuffer(
    1,
    Math.ceil(context.sampleRate * duration),
    context.sampleRate,
  );
  const samples = buffer.getChannelData(0);
  for (let index = 0; index < samples.length; index++) {
    const fade = 1 - index / samples.length;
    samples[index] = (Math.random() * 2 - 1) * fade;
  }

  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = buffer;
  filter.type = "highpass";
  filter.frequency.setValueAtTime(850, start);
  gain.gain.setValueAtTime(0.018, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.connect(filter).connect(gain).connect(context.destination);
  source.start(start);
}

function playCardSfx(kind) {
  const context = getSfxAudioContext();
  if (!context) return;

  const scheduleSound = () => {
    const start = context.currentTime;
    const backgroundMusic = document.getElementById("backgroundMusic");

    // Briefly make room in the mix so the cue remains audible on small speakers.
    if (backgroundMusic && !backgroundMusic.paused) {
      const normalMusicVolume = 0.35;
      backgroundMusic.volume = 0.22;
      window.setTimeout(() => {
        backgroundMusic.volume = normalMusicVolume;
      }, 180);
    }

    if (kind === "choice") {
      playSfxTone(context, {
        start,
        frequency: 440,
        endFrequency: 523.25,
        duration: 0.075,
        volume: 0.075,
      });
      playSfxTone(context, {
        start: start + 0.045,
        frequency: 659.25,
        duration: 0.085,
        volume: 0.055,
      });
    } else if (kind === "event") {
      playSfxTone(context, {
        start,
        frequency: 196,
        endFrequency: 146.83,
        duration: 0.12,
        volume: 0.085,
        wave: "triangle",
      });
    } else if (kind === "skip") {
      playSkipFlick(context, start);
      playSfxTone(context, {
        start,
        frequency: 220,
        endFrequency: 110,
        duration: 0.065,
        volume: 0.065,
        wave: "triangle",
      });
    } else {
      playSfxTone(context, {
        start,
        frequency: 329.63,
        endFrequency: 440,
        duration: 0.085,
        volume: 0.075,
        wave: "triangle",
      });
    }
  };

  if (context.state === "suspended") {
    context.resume().then(scheduleSound).catch(() => {});
  } else {
    scheduleSound();
  }
}

function getCardSfxType(card) {
  if (CHOICE_CARD_OPTIONS[card.id]) return "choice";
  return card.type === "event" ? "event" : "action";
}

// close intre screen
document.getElementById("closeIntro").addEventListener("click", () => {
  startBackgroundMusic();
  const intro = document.getElementById("intro");
  intro.style.opacity = 0;
  intro.style.transition = "opacity 0.4s ease";
  setTimeout(() => (intro.style.display = "none"), 400);
});

// feedback button
document.getElementById("feedbackButton").addEventListener("click", () => {
  window.open(
    "https://docs.google.com/forms/d/e/1FAIpQLSfQMXLZjtXLTzqoOexaV6OnHHjlQPnXXmLFFBiTu924gQw01g/viewform",
    "_blank",
  );
});

// play again
document.getElementById("resetButton").addEventListener("click", () => {
  emptyDeckStreak = 0;
  window.playerChoices = {};
  resetSkipToken();
  // reset players
  playerName = pickRandom(playerNames);
  AI1Name = pickRandom(ai1Names);
  AI2Name = generateAI2Name();

  player = {
    name: playerName,
    hand: [],
    progress: 1,
    sustainability: 0,
    actionsPlayed: new Set(),
    eventsPlayed: new Set(),
  };
  AI1 = {
    name: AI1Name,
    hand: [],
    progress: 1,
    sustainability: 0,
    actionsPlayed: new Set(),
    eventsPlayed: new Set(),
  };
  AI2 = {
    name: AI2Name,
    hand: [],
    progress: 1,
    sustainability: 0,
    actionsPlayed: new Set(),
    eventsPlayed: new Set(),
  };
  updateIntroCompanyName();

  // empty aiLog
  const aiLogDiv = el("aiLog");
  aiLogDiv.innerHTML = "";

  //reset deck
  window.resetDeck();
  if (Array.isArray(window.deck) && window.deck.length > 0) {
    initCardLookup();
    prepareSubdecks();
    dealOpeningHands();
    console.log(
      "[DSG] Dealt hands — player:",
      player.hand.length,
      "AI1:",
      AI1.hand.length,
      "AI2:",
      AI2.hand.length,
    );
    console.log("[DSG] Top of deck after deal:", deck.slice(-3));
  } else {
    console.warn("[DSG] Skipping deal because deck is missing/empty.");
  }

  renderPlayerHand();
  updateGameInfo();
  updatePlayedLists();
  updateSkipUI();

  // Set AI labels (matches YOUR HTML IDs). Falls back to alternative IDs if present.
  const a1Header = el("ai1ActionsHeader") || el("ai1ActionsLabel");
  const a1EHeader = el("ai1EventsHeader") || el("ai1EventsLabel");
  const a2Header = el("ai2ActionsHeader") || el("ai2ActionsLabel");
  const a2EHeader = el("ai2EventsHeader") || el("ai2EventsLabel");

  if (a1Header) a1Header.textContent = `${AI1.name} Actions Played`;
  if (a1EHeader) a1EHeader.textContent = `${AI1.name} Events Played`;
  if (a2Header) a2Header.textContent = `${AI2.name} Actions Played`;
  if (a2EHeader) a2EHeader.textContent = `${AI2.name} Events Played`;

  console.log("[DSG] Boot end");

  const intro = document.getElementById("outro");
  intro.style.opacity = 0;
  intro.style.transition = "opacity 0.4s ease";
  setTimeout(() => (intro.style.display = "none"), 400);
});

// --- Random name pools ---
const playerNames = [
  "The Von Spigot Gallery",
  "LEAF Consulting",
  "Haunted History Tours Inc.",
  "First City Bank",
  "Baker Baker & McKenzie LLP",
  "The Museum of Lost Socks",
  "Live Laugh Love Larp Lol Logout",
  "The World Wrestling Consortium",
];

const ai1Names = [
  "Business Systems Systems",
  "Lozenge AI",
  "Digital Sales Insight",
  "Hypercircle",
  "Noxio Box Toxic Storage Solutions",
  "Adjaye Jones & Cronk LLP",
  "Distributed Fusion Inc",
  "B.Well",
  "Total Cashflow Solutions",
  "The Data Doulas",
];

// --- Helpers ---
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function el(id) {
  return document.getElementById(id);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let skipAvailable = true;
let skipArmed = false;
let skipReplacementInProgress = false;
let skipPointerX = 0;
let skipPointerY = 0;

function updateSkipUI() {
  const token = el("skipToken");
  const cursorBadge = el("skipCursor");

  if (token) {
    token.disabled = !skipAvailable;
    token.classList.toggle("is-armed", skipArmed);
    token.setAttribute("aria-pressed", String(skipArmed));
    token.textContent = "SKIP";
    token.title = !skipAvailable
      ? "The one-use skip has been used"
      : skipArmed
        ? "Click again to cancel the skip"
        : "Discard one card without playing it";
  }

  document.body.classList.toggle("skip-armed", skipArmed);

  if (cursorBadge) {
    cursorBadge.style.display = skipArmed ? "block" : "none";
    cursorBadge.style.left = `${skipPointerX}px`;
    cursorBadge.style.top = `${skipPointerY}px`;
  }
}

function setSkipArmed(armed) {
  skipArmed = skipAvailable && armed;
  updateSkipUI();
}

function resetSkipToken() {
  skipAvailable = true;
  skipArmed = false;
  updateSkipUI();
}

function consumeSkipToken() {
  skipAvailable = false;
  skipArmed = false;
  updateSkipUI();
}

function restoreSkipToken() {
  skipAvailable = true;
  skipArmed = false;
  updateSkipUI();
}

const skipToken = el("skipToken");
if (skipToken) {
  skipToken.addEventListener("click", () => {
    if (skipAvailable) setSkipArmed(!skipArmed);
  });
}

window.addEventListener("pointermove", (event) => {
  skipPointerX = event.clientX;
  skipPointerY = event.clientY;
  if (skipArmed) updateSkipUI();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && skipArmed) setSkipArmed(false);
});

function generateAI2Name() {
  const buzzwords = [
    "Synergy",
    "Quantum",
    "Hyper",
    "Total",
    "Future",
    "Ultra",
    "Virtual",
    "Dynamic",
    "Cloud",
    "Carbon",
    "Crypto",
    "Green",
  ];
  const techTerms = [
    "Solutions",
    "Systems",
    "Analytics",
    "Intelligence",
    "Optimisation",
    "Flow",
    "Interface",
    "Blockchain",
    "Fusion",
    "Comms",
    "Matrix",
    "Ops",
  ];
  const suffixes = [
    "Inc.",
    "LLP",
    "LLC",
    "Group",
    "Associates",
    "Holdings",
    "Consortium",
    "Syndicate",
    "Unlimited",
    "Worldwide",
    "Partners",
  ];
  const wildcard = [
    "Lozenge",
    "Entropy",
    "Biscuit",
    "Tapioca",
    "Algo",
    "Flavour",
    "Mince",
    "Pigment",
    "Pentimento",
    "Pimento",
    "Taramasalata",
    "Hummus",
    "Sludge",
    "Algorithm",
    "Gunk",
    "Echo",
    "Vapor",
    "Goblin",
  ];
  const p = Math.random();
  if (p < 0.33)
    return `${pickRandom(buzzwords)} ${pickRandom(techTerms)} ${pickRandom(suffixes)}`;
  if (p < 0.66)
    return `${pickRandom(wildcard)} ${pickRandom(buzzwords)} ${pickRandom(suffixes)}`;
  return `${pickRandom(buzzwords)} ${pickRandom(wildcard)} ${pickRandom(techTerms)} ${pickRandom(suffixes)}`;
}


// --- Player choices ---
const CHOICE_CARD_OPTIONS = {
  33: {
    imagePath: "images/choice-33-earth-stars.jpg",
    prompt: (companyName) =>
      `Does ${companyName} prefer general-purpose AI systems, or smaller, domain-specific AI systems?`,
    options: [
      {
        value: "general-purpose",
        label: "General-purpose AI systems",
        correlatedActionId: 18,
      },
      {
        value: "domain-specific",
        label: "Smaller, domain-specific AI systems",
        correlatedActionId: 6,
      },
    ],
  },
  34: {
    imagePath: "images/choice-34-connected-device.jpg",
    prompt: (companyName) =>
      `Where does most of ${companyName}'s compute take place?`,
    options: [
      {
        value: "machine-meshes",
        label: "On devices and local machine meshes",
        correlatedActionId: 25,
      },
      {
        value: "cloud-computing",
        label: "In remotely accessible cloud computing",
        correlatedActionId: 8,
      },
    ],
  },
  35: {
    imagePath: "images/choice-35-organic-mushroom.jpg",
    prompt: (companyName) =>
      `Which unexpected technology is working rather well for ${companyName}?`,
    options: [
      {
        value: "space-data-centres",
        label: "Data centres in space and on the Moon",
        correlatedActionId: 9,
      },
      {
        value: "organic-data-centres",
        label: "Organic data centres powered partly by algae and mud batteries",
        correlatedActionId: 24,
      },
    ],
  },
  36: {
    imagePath: "images/choice-36-leaf-cable.jpg",
    prompt: (companyName) =>
      `Which environmental priority matters more to ${companyName}?`,
    options: [
      {
        value: "sustainable-ai",
        label: "Reducing the impacts of AI itself",
        correlatedActionId: 1,
      },
      {
        value: "ai-for-sustainability",
        label: "Using AI to achieve wider environmental benefits",
        correlatedActionId: 17,
      },
    ],
  },
  37: {
    imagePath: "images/choice-37-wifi-heart.jpg",
    prompt: (companyName) =>
      `Are most workers at ${companyName} a bit cyborg, or very cyborg?`,
    options: [
      {
        value: "a-bit-cyborg",
        label: "A bit cyborg",
        correlatedActionId: 13,
      },
      {
        value: "very-cyborg",
        label: "Very cyborg",
        correlatedActionId: 21,
      },
    ],
  },
};

const SUBPLOT_CARD_IDS_BY_ID = {
  A: [82, 83, 84],
  B: [85, 86, 87],
  C: [88, 89, 90],
  D: [91, 92, 93],
  E: [94, 95, 96],
  F: [97, 98, 99],
};

const SUBPLOT_IMAGE_PATHS_BY_CARD_ID = {
  83: "images/tarot-20.jpg",
  85: "images/tarot-19.jpg",
  86: "images/tarot-15.jpg",
  87: "images/tarot-8.jpg",
  88: "images/tarot-21.jpg",
  91: "images/tarot-4.jpg",
  92: "images/tarot-26.jpg",
  95: "images/tarot-17.jpg",
  97: "images/jo-card-back.jpg",
  98: "images/tarot-9.jpg",
  99: "images/tarot-23.jpg",
};

const CARE_RELATIVES = [
  {
    relation: "mother",
    subjectPronoun: "she",
    objectPronoun: "her",
    possessivePronoun: "her",
    weight: 0.2,
  },
  {
    relation: "father",
    subjectPronoun: "he",
    objectPronoun: "him",
    possessivePronoun: "his",
    weight: 0.2,
  },
  {
    relation: "grandfather",
    subjectPronoun: "he",
    objectPronoun: "him",
    possessivePronoun: "his",
    weight: 0.2,
  },
  {
    relation: "grandmother",
    subjectPronoun: "she",
    objectPronoun: "her",
    possessivePronoun: "her",
    weight: 0.2,
  },
  {
    relation: "brother",
    subjectPronoun: "he",
    objectPronoun: "him",
    possessivePronoun: "his",
    weight: 0.1,
  },
  {
    relation: "sister",
    subjectPronoun: "she",
    objectPronoun: "her",
    possessivePronoun: "her",
    weight: 0.1,
  },
];

let activeCareRelative = null;

function chooseCareRelative() {
  let roll = Math.random();
  for (const relative of CARE_RELATIVES) {
    roll -= relative.weight;
    if (roll < 0) return { ...relative };
  }
  return { ...CARE_RELATIVES.at(-1) };
}

function createSubplotAChoiceConfig(stage, cardIds) {
  if (stage === 1) {
    return {
      prompt: () =>
        "You have become unusually forgetful. Names, meetings and familiar words keep slipping away.",
      options: () => [
        { value: "path-1", label: "Rely more heavily on AI agents." },
        { value: "path-2", label: "Make the CEO position a shared role." },
      ],
    };
  }

  if (stage === 2) {
    return {
      prompt: () => {
        const reliedOnAgents =
          window.playerChoices[cardIds[0]]?.value === "path-1";
        if (reliedOnAgents) {
          return "Since you began using AI agents to compensate for your forgetfulness, they have concealed it remarkably well. You are diagnosed with a progressive cognitive disorder.\n\nDoctors offer an experimental neural interface, trained partly on your agents’ records. It would route parts of your memory, language and judgement through AI.";
        }
        return "Since you made the CEO position a shared role, decisions have become slower but less dependent on your memory. You are diagnosed with a progressive cognitive disorder.\n\nDoctors offer an experimental neural interface. By routing parts of your memory, language and judgement through AI, it might let you lead independently again.";
      },
      options: () => {
        const reliedOnAgents =
          window.playerChoices[cardIds[0]]?.value === "path-1";
        return reliedOnAgents
          ? [
              { value: "path-1-1", label: "Accept the interface." },
              {
                value: "path-1-2",
                label: "Refuse it and continue relying on external agents.",
              },
            ]
          : [
              {
                value: "path-2-1",
                label: "Accept the interface and resume sole leadership.",
              },
              {
                value: "path-2-2",
                label: "Refuse it and deepen the shared-leadership model.",
              },
            ];
      },
    };
  }

  const conclusions = {
    "path-1-1": {
      prompt:
        "You accepted an interface trained on your agents’ records. It now supports your memory, language and judgement.\n\nThe provider announces that the service will be deprecated. Soon, the AI integrated with your thinking will no longer be supported.",
      options: [
        {
          label: "Try to migrate yourself to an open-source alternative.",
        },
        {
          label: "Learn to think with less dependence on the AI.",
        },
      ],
    },
    "path-1-2": {
      prompt:
        "You refused the neural interface and kept relying on AI agents. As your condition progresses, they increasingly remember, decide and speak for you.",
      options: [
        {
          label: "I am relieved that something recognisably mine continues.",
        },
        {
          label: "I fear I am becoming the least reliable version of myself.",
        },
      ],
    },
    "path-2-1": {
      prompt:
        "After sharing the CEO role, you accepted the interface and resumed sole leadership. It slows the decline but cannot restore everything; your former co-CEO helps it fill the gaps.",
      options: [
        {
          label: "I hope dependence can be another kind of continuity.",
        },
        {
          label: "I hope those around me will accept how I change.",
        },
      ],
    },
    "path-2-2": {
      prompt:
        "You refused the interface and deepened shared leadership. As your condition progresses, the organisation grows more collective and less dependent on you.",
      options: [
        {
          label: "I hope I can still belong as my role changes.",
        },
        {
          label: "I hope what we built becomes strong enough not to need me.",
        },
      ],
    },
  };

  return {
    prompt: () => {
      const previousValue =
        window.playerChoices[cardIds[1]]?.value || "path-1-1";
      return conclusions[previousValue].prompt;
    },
    options: () => {
      const previousValue =
        window.playerChoices[cardIds[1]]?.value || "path-1-1";
      return conclusions[previousValue].options.map((option, index) => ({
        value: `${previousValue}-${index + 1}`,
        label: option.label,
      }));
    },
  };
}

function createSubplotFChoiceConfig(stage, cardIds) {
  const relative = activeCareRelative || CARE_RELATIVES[0];
  const relation = relative.relation;
  const subject = relative.subjectPronoun;
  const object = relative.objectPronoun;
  const possessive = relative.possessivePronoun;

  if (stage === 1) {
    return {
      prompt: () =>
        `Your ${relation} is getting older, and finding everyday life more challenging, but ${subject} really values ${possessive} independence.`,
      options: () => [
        {
          value: "path-1",
          label: "Try to improve your work-life balance so you can be there more for them.",
        },
        {
          value: "path-2",
          label:
            "Try to strengthen their local network of care.",
        },
      ],
    };
  }

  if (stage === 2) {
    return {
      prompt: () => {
        const tookOnCare =
          window.playerChoices[cardIds[0]]?.value === "path-1";
        if (tookOnCare) {
          return `Since you took on more of your ${relation}’s care, ${possessive} needs have grown. Your workdays are increasingly shaped by calls, visits and worry.\n\nA care service proposes a network of sensors, reminders and robots for check-ins, meals and simple household tasks, escalating problems to people.`;
        }
        return `The wider circle has helped your ${relation} remain independent, but coordination is tiring and gaps keep appearing.\n\nA care service proposes a network of sensors, reminders and robots for check-ins, meals and simple household tasks, escalating problems to people.`;
      },
      options: () => {
        const tookOnCare =
          window.playerChoices[cardIds[0]]?.value === "path-1";
        return tookOnCare
          ? [
              {
                value: "path-1-1",
                label: `Introduce the system with ${possessive} consent.`,
              },
              {
                value: "path-1-2",
                label:
                  "Reduce your CEO responsibilities and continue providing care yourself.",
              },
            ]
          : [
              {
                value: "path-2-1",
                label:
                  "Use the system to support and coordinate the care circle.",
              },
              {
                value: "path-2-2",
                label: "Arrange regular professional human care instead.",
              },
            ];
      },
    };
  }

  const conclusions = {
    "path-1-1": {
      prompt: `With ${possessive} consent, networked devices now handle reminders, check-ins and simple tasks for your ${relation}. You visit less often in emergencies and more often as family, although intimate routines now generate data and alerts.`,
      options: [
        "I hope technology can create more room for human closeness.",
        "I worry that safety is becoming another form of surveillance.",
      ],
    },
    "path-1-2": {
      prompt: `You reduce your CEO role and take on more of your ${relation}’s care yourself. Time together deepens, but fatigue and lost work reshape both your lives.`,
      options: [
        "I hope care can be treated as part of life, not an interruption.",
        "I wish devotion did not require one person to step back.",
      ],
    },
    "path-2-1": {
      prompt: `Robots and devices help your ${relation}’s care circle coordinate, and ${subject} remains at home longer. Responsibility is shared, but every alert seems to belong to everyone and no one.`,
      options: [
        "I hope shared responsibility can become genuine solidarity.",
        "I worry that coordination is replacing responsibility.",
      ],
    },
    "path-2-2": {
      prompt: `Regular paid carers bring your ${relation} stability and skill. ${subject} forms bonds with some of them; staff turnover shows how much continuity depends on working conditions your family cannot control.`,
      options: [
        "I hope dependable care can become part of a wider circle of trust.",
        "I wish care work were valued enough to offer real continuity.",
      ],
    },
  };

  return {
    prompt: () => {
      const previousValue =
        window.playerChoices[cardIds[1]]?.value || "path-1-1";
      return conclusions[previousValue].prompt;
    },
    options: () => {
      const previousValue =
        window.playerChoices[cardIds[1]]?.value || "path-1-1";
      return conclusions[previousValue].options.map((label, index) => ({
        value: `${previousValue}-${index + 1}`,
        label,
      }));
    },
  };
}

const AUTHORED_SUBPLOTS = {
  B: {
    first: {
      prompt:
        "Your best-performing employee admits that an unofficial AI system does nearly all their work. Nobody else knew it existed.",
      options: [
        "Reward the results and let them continue.",
        "Require a return to approved processes.",
      ],
    },
    second: {
      "path-1": {
        prompt:
          "After you let the employee continue, other teams adopt their shadow system. Productivity rises, but nobody can fully explain the work.",
        options: [
          "Formalise the system across the organisation.",
          "Let each team control how it uses the system.",
        ],
      },
      "path-2": {
        prompt:
          "After you banned the shadow system, performance collapses. Many colleagues had quietly come to depend on it.",
        options: [
          "Quietly reinstate the system.",
          "Rebuild the organisation’s human expertise.",
        ],
      },
    },
    third: {
      "path-1-1": {
        prompt:
          "You formalised the shadow system. The organisation is extraordinarily productive, but when it fails, nobody knows how to continue without it.",
        options: [
          "I hope automation can become a form of institutional knowledge.",
          "I fear the organisation no longer knows what it is doing.",
        ],
      },
      "path-1-2": {
        prompt:
          "Teams retained control of their own AI workflows. Local knowledge flourishes, but the organisation now contains dozens of incompatible systems.",
        options: [
          "I hope useful diversity matters more than tidiness.",
          "I hope we can still become one organisation again.",
        ],
      },
      "path-2-1": {
        prompt:
          "You quietly restored the system. Official procedures continue, but everybody knows the real organisation runs through an unacknowledged AI.",
        options: [
          "It is time to acknowledge how the work is really done.",
          "Some useful arrangements survive by remaining unofficial.",
        ],
      },
      "path-2-2": {
        prompt:
          "Rebuilding human expertise is slow and expensive. The organisation becomes less efficient, but people once again understand its work.",
        options: [
          "I hope resilience proves worth the cost.",
          "I fear we abandoned an extraordinary advantage.",
        ],
      },
    },
  },
  C: {
    first: {
      prompt:
        "An AI recruitment system identifies an exceptionally qualified candidate whom every human interviewer dislikes.",
      options: [
        "Hire the candidate.",
        "Trust the interviewers and reject them.",
      ],
    },
    second: {
      "path-1": {
        prompt:
          "The candidate excels by organising their whole working life around algorithmic assessment. Other employees begin imitating them.",
        options: [
          "Encourage the new measurable standard.",
          "Protect less measurable ways of working.",
        ],
      },
      "path-2": {
        prompt:
          "The rejected candidate joins a competitor and helps automate much of the profession you excluded them from.",
        options: [
          "Adopt similar automation.",
          "Defend the profession as a human practice.",
        ],
      },
    },
    third: {
      "path-1-1": {
        prompt:
          "The organisation fills with model employees. Performance scores soar, while personalities, working styles and disagreements steadily converge.",
        options: [
          "I hope common standards can make excellence fairer.",
          "I miss the useful friction of eccentric people.",
        ],
      },
      "path-1-2": {
        prompt:
          "You protected less measurable work. The candidate remains brilliant but unusual, and the recruitment system loses much of its authority.",
        options: [
          "I hope excellence can remain plural.",
          "I still wonder what the system saw before we did.",
        ],
      },
      "path-2-1": {
        prompt:
          "You adopted the rival’s automation. The profession shrinks rapidly; the remaining work is efficient, accessible and increasingly unlike a craft.",
        options: [
          "I hope new forms of skilled work will emerge.",
          "I fear we destroyed knowledge we could not measure.",
        ],
      },
      "path-2-2": {
        prompt:
          "You defended the profession as human work. Customers value it, but automated rivals are faster and much cheaper.",
        options: [
          "I hope human attention remains worth paying for.",
          "I fear we have mistaken nostalgia for principle.",
        ],
      },
    },
  },
  D: {
    first: {
      prompt:
        "After a respected colleague dies, their AI assistant continues answering customers convincingly.",
      options: [
        "Keep the inbox operating.",
        "Close it and announce their death.",
      ],
    },
    second: {
      "path-1": {
        prompt:
          "After you kept the inbox operating, its messages are copied to create a convincing counterfeit version of your organisation.",
        options: [
          "Recognise the imitation as an authorised partner.",
          "Expose it publicly as a counterfeit.",
        ],
      },
      "path-2": {
        prompt:
          "After you closed the inbox, customers protest. Some had long relationships with the colleague’s automated voice and want access restored.",
        options: [
          "Reopen it as a clearly labelled archive.",
          "Insist that the correspondence has ended.",
        ],
      },
    },
    third: {
      "path-1-1": {
        prompt:
          "The authorised imitation prospers. Customers move easily between two versions of the organisation, and few remember which was original.",
        options: [
          "I hope an organisation’s identity can be shared.",
          "I regret surrendering the boundary around what we were.",
        ],
      },
      "path-1-2": {
        prompt:
          "You destroy the counterfeit, but the investigation reveals that the original inbox was also largely automated. Customer trust collapses.",
        options: [
          "I hope the truth proves more durable than trust.",
          "I wonder how long the useful illusion might have lasted.",
        ],
      },
      "path-2-1": {
        prompt:
          "The reopened archive becomes a memorial. Customers contribute their own messages until the colleague’s correspondence belongs partly to everyone.",
        options: [
          "I hope shared memory can outgrow its institution.",
          "I am uneasy that the company has become a host for grief.",
        ],
      },
      "path-2-2": {
        prompt:
          "You maintain the clean break. Customers drift away, staff grieve, and the unanswered inbox becomes an absence everyone understands.",
        options: [
          "I hope endings can be a form of respect.",
          "I regret deleting a continuity people still valued.",
        ],
      },
    },
  },
  E: {
    first: {
      prompt:
        "AI performance scoring has been creeping into your organisation. Some employees are concerned about reward-hacking.",
      options: [
        "Support the AI performance scoring, but monitor it closely.",
        "Limit the scores’ influence over promotion and pay.",
      ],
    },
    second: {
      "path-1": {
        prompt:
          "After you rewarded high scores, workers follow the system’s instructions with absolute precision. Their quiet strike paralyses the organisation.",
        options: [
          "Negotiate with the workers.",
          "Tighten automated supervision.",
        ],
      },
      "path-2": {
        prompt:
          "After you limited the scores, managers keep using them secretly. Workers build a shadow system to detect unfair decisions.",
        options: [
          "Recognise the workers’ auditing system.",
          "Prohibit both systems.",
        ],
      },
    },
    third: {
      "path-1-1": {
        prompt:
          "Workers help rewrite the scoring rules. Decisions become slower and more contested, but employees can challenge how they are measured.",
        options: [
          "I hope fair rules remain open to argument.",
          "I fear negotiation will become another endless metric.",
        ],
      },
      "path-1-2": {
        prompt:
          "Stricter supervision produces perfect compliance and absurd outcomes. Customers revolt against an organisation incapable of making exceptions.",
        options: [
          "I accept that efficiency sometimes requires disobedience.",
          "I hope a better system can make exceptions consistently.",
        ],
      },
      "path-2-1": {
        prompt:
          "The workers’ audit exposes patterns management denied. Decisions improve, although every judgement now arrives with a counter-score and an argument.",
        options: [
          "I hope visible conflict is better than hidden unfairness.",
          "I long for a standard everyone can trust.",
        ],
      },
      "path-2-2": {
        prompt:
          "Both systems are prohibited, then quietly rebuilt. Decisions look human again, while hidden measurements continue shaping them.",
        options: [
          "I accept that judgement can never be fully transparent.",
          "I suspect the forbidden scores still govern us.",
        ],
      },
    },
  },
};

function createAuthoredSubplotChoiceConfig(subplotId, stage, cardIds) {
  const narrative = AUTHORED_SUBPLOTS[subplotId];

  if (stage === 1) {
    return {
      prompt: () => narrative.first.prompt,
      options: () =>
        narrative.first.options.map((label, index) => ({
          value: `path-${index + 1}`,
          label,
        })),
    };
  }

  const previousCardId = cardIds[stage - 2];
  const fallback = stage === 2 ? "path-1" : "path-1-1";
  const section = stage === 2 ? narrative.second : narrative.third;

  return {
    prompt: () => {
      const previousValue =
        window.playerChoices[previousCardId]?.value || fallback;
      return section[previousValue].prompt;
    },
    options: () => {
      const previousValue =
        window.playerChoices[previousCardId]?.value || fallback;
      return section[previousValue].options.map((label, index) => ({
        value: `${previousValue}-${index + 1}`,
        label,
      }));
    },
  };
}

function createSubplotChoiceConfig(subplotId, stage, cardIds) {
  if (subplotId === "A") return createSubplotAChoiceConfig(stage, cardIds);
  if (subplotId === "F") return createSubplotFChoiceConfig(stage, cardIds);
  if (AUTHORED_SUBPLOTS[subplotId]) {
    return createAuthoredSubplotChoiceConfig(subplotId, stage, cardIds);
  }

  const previousCardId = stage > 1 ? cardIds[stage - 2] : null;

  return {
    prompt: () => {
      const ordinal = ["First", "Second", "Third"][stage - 1];
      const opening = `${ordinal} special narrative event (this feature hasn't been added yet).`;
      if (stage === 1) return `${opening}\n\nWhat do you want to do?`;

      const previous = window.playerChoices[previousCardId];
      return `${opening}\n\nLast time you chose ${previous?.label || "a path"}.\n\nWhat do you want to do?`;
    },
    options: () => {
      if (stage === 1) {
        return [
          { value: "path-1", label: "Path 1" },
          { value: "path-2", label: "Path 2" },
        ];
      }

      const fallback = stage === 2 ? "path-1" : "path-1-1";
      const prefix = window.playerChoices[previousCardId]?.value || fallback;
      return [
        { value: `${prefix}-1`, label: `${formatPath(prefix)}-1` },
        { value: `${prefix}-2`, label: `${formatPath(prefix)}-2` },
      ];
    },
  };
}

Object.entries(SUBPLOT_CARD_IDS_BY_ID).forEach(([subplotId, cardIds]) => {
  cardIds.forEach((cardId, index) => {
    CHOICE_CARD_OPTIONS[cardId] = {
      ...createSubplotChoiceConfig(subplotId, index + 1, cardIds),
      imagePath: SUBPLOT_IMAGE_PATHS_BY_CARD_ID[cardId],
    };
  });
});

window.playerChoices = {};

function formatPath(value) {
  return String(value).replace(/^path-/, "Path ");
}

function promptForCardChoice(card) {
  const config = CHOICE_CARD_OPTIONS[card.id];
  if (!config) return Promise.resolve(null);

  const modal = document.getElementById("choiceModal");
  const title = document.getElementById("choiceModalTitle");
  const question = document.getElementById("choiceModalQuestion");
  const options = document.getElementById("choiceModalOptions");
  const image = document.getElementById("choiceModalImage");
  const imagePlaceholder = document.getElementById("choiceModalImagePlaceholder");

  title.textContent = card.name.replace(/^\d+:\s*/, "");
  question.textContent =
    typeof config.prompt === "function"
      ? config.prompt(player.name)
      : config.prompt;
  options.innerHTML = "";

  if (config.imagePath) {
    image.src = config.imagePath;
    image.alt = "";
    image.hidden = false;
    imagePlaceholder.hidden = true;
  } else {
    image.removeAttribute("src");
    image.hidden = true;
    imagePlaceholder.hidden = false;
  }

  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");

  return new Promise((resolve) => {
    const availableOptions =
      typeof config.options === "function" ? config.options() : config.options;
    availableOptions.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-modal-option";
      button.textContent = option.label;
      button.addEventListener(
        "click",
        () => {
          window.playerChoices[card.id] = {
            value: option.value,
            label: option.label,
          };
          if (
            !skipAvailable &&
            option.correlatedActionId &&
            player.actionsPlayed.has(option.correlatedActionId)
          ) {
            restoreSkipToken();
          }
          modal.style.display = "none";
          modal.setAttribute("aria-hidden", "true");
          resolve(window.playerChoices[card.id]);
        },
        { once: true },
      );
      options.appendChild(button);
      if (index === 0) requestAnimationFrame(() => button.focus());
    });
  });
}

// --- Players ---
let playerName = pickRandom(playerNames);
let AI1Name = pickRandom(ai1Names);
let AI2Name = generateAI2Name();

let player = {
  name: playerName,
  hand: [],
  progress: 1,
  sustainability: 0,
  actionsPlayed: new Set(),
  eventsPlayed: new Set(),
};
let AI1 = {
  name: AI1Name,
  hand: [],
  progress: 1,
  sustainability: 0,
  actionsPlayed: new Set(),
  eventsPlayed: new Set(),
};
let AI2 = {
  name: AI2Name,
  hand: [],
  progress: 1,
  sustainability: 0,
  actionsPlayed: new Set(),
  eventsPlayed: new Set(),
};

function updateIntroCompanyName() {
  const companyName = el("introCompanyName");
  if (companyName) companyName.textContent = player.name;
}

updateIntroCompanyName();

// Keep card metadata even after deck mutations
let CARD_BY_ID = {};
function initCardLookup() {
  if (!Array.isArray(window.deck)) return;
  const snapshot = deck.slice();
  CARD_BY_ID = Object.fromEntries(snapshot.map((c) => [c.id, c]));
}

// Track which action IDs should be highlighted while hovering an event card.
let highlightedActionIds = new Set();

// The final bullet on each event card is the single source of truth for
// both its mechanics and its mouseover highlighting.
function getEventRule(card) {
  if (!card || card.type !== "event") return null;

  const finalBullet = String(card.description || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .at(-1) || "";

  const actionIds = [
    ...new Set(
      (finalBullet.match(/\b(?:[1-9]|[12]\d|3[0-2])\b/g) || []).map(Number),
    ),
  ];

  if (finalBullet.includes("convert all Progress into RAI Points")) {
    return { type: "milestone", actionIds: [] };
  }

  if (finalBullet.includes("lose all progress points")) {
    return { type: "crisis", actionIds };
  }

  if (finalBullet.startsWith("* Gain a progress point if you have played action")) {
    return { type: "opportunity", actionIds };
  }

  console.warn("[DSG] Event card has no recognised final-bullet rule:", card);
  return { type: "none", actionIds: [] };
}

function getActionIdsFromEvent(card) {
  const rule = getEventRule(card);
  return rule ? rule.actionIds : [];
}

function applyEventEffect(card, players) {
  const rule = getEventRule(card);
  if (!rule) return;

  players.forEach((currentPlayer) => {
    if (rule.type === "opportunity") {
      const bonus = rule.actionIds.filter((id) =>
        currentPlayer.actionsPlayed.has(id),
      ).length;
      currentPlayer.progress += bonus;
    } else if (rule.type === "milestone") {
      currentPlayer.sustainability += currentPlayer.progress;
      currentPlayer.progress = 0;
    } else if (rule.type === "crisis") {
      const isProtected = rule.actionIds.some((id) =>
        currentPlayer.actionsPlayed.has(id),
      );
      if (!isProtected) currentPlayer.progress = 0;
    }
  });
}

// Update UI to bold action IDs that are relevant to the hovered event card.
function setHighlightedActions(actionIds) {
  highlightedActionIds = new Set(actionIds);
  updateGameInfo();
  updatePlayedLists();
}

function clearHighlightedActions() {
  setHighlightedActions([]);
}

let activeSubplotId = null;
let activeSubplotCardIds = [];
let subplotCardsById = {};
let mainDeckSize = 0;

function chooseActiveSubplot() {
  activeSubplotId = pickRandom(Object.keys(SUBPLOT_CARD_IDS_BY_ID));
  activeSubplotCardIds = SUBPLOT_CARD_IDS_BY_ID[activeSubplotId];
  activeCareRelative =
    activeSubplotId === "F" ? chooseCareRelative() : null;
  window.activeCareRelative = activeCareRelative;
  console.log(
    `[DSG] Selected subplot ${activeSubplotId}`,
    activeCareRelative || "",
  );
}

function regularCardsDealt() {
  return mainDeckSize - window.deck.length;
}

function isSubplotCardUnlocked(cardId) {
  const index = activeSubplotCardIds.indexOf(cardId);
  if (index === 0) return true;
  if (index < 0) return false;
  return Boolean(window.playerChoices[activeSubplotCardIds[index - 1]]);
}

function getDueSubplotCard() {
  return activeSubplotCardIds.map((id) => subplotCardsById[id]).find(
    (card) =>
      card &&
      isSubplotCardUnlocked(card.id) &&
      regularCardsDealt() >= card.subplotPosition &&
      !window.playerChoices[card.id] &&
      !player.hand.some((heldCard) => heldCard.id === card.id),
  );
}

function drawPlayerCard() {
  const subplotCard = getDueSubplotCard();
  if (subplotCard) return subplotCard;
  return Array.isArray(window.deck) && deck.length ? deck.pop() : null;
}

function prepareSubdecks() {
  if (!Array.isArray(window.deck)) return;

  const subdeckA = [];
  const subdeckB = [];

  subplotCardsById = {};
  deck.forEach((card) => {
    if (card.isSubplot) {
      subplotCardsById[card.id] = card;
      return;
    }
    const belongsToSubdeckA =
      (card.id >= 1 && card.id <= 12) ||
      (card.id >= 38 && card.id <= 50);

    if (belongsToSubdeckA) subdeckA.push(card);
    else subdeckB.push(card);
  });

  shuffle(subdeckA);
  shuffle(subdeckB);

  // Cards are drawn with deck.pop(), so Subdeck A must be at the end.
  window.deck = [...subdeckB, ...subdeckA];
  mainDeckSize = window.deck.length;
  chooseActiveSubplot();

  console.log(
    "[DSG] Prepared subdecks — A:",
    subdeckA.length,
    "B:",
    subdeckB.length,
  );
}

function dealOpeningHands() {
  if (!Array.isArray(window.deck)) return;
  for (let i = 0; i < 3; i++) {
    if (deck.length) player.hand.push(deck.pop());
    if (deck.length) AI1.hand.push(deck.pop());
    if (deck.length) AI2.hand.push(deck.pop());
  }
}

// --- Rendering ---
function renderPlayerHand() {
  const handDiv = el("playerHand");
  if (!handDiv) return;
  handDiv.innerHTML = "";
  clearHighlightedActions();

  const descriptionDiv = el("descriptionBox");
  const cardTitle = el("cardTitle");

  player.hand.forEach((card, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.style.background = card.type === "action" ? "steelblue" : "#E97132";

    // --- Header row: badge + type ---
    const headerRow = document.createElement("div");
    headerRow.className = "card-header-row";

    // Badge
    const idBadge = document.createElement("div");
    idBadge.className = "card-id";
    idBadge.textContent = card.id;
    headerRow.appendChild(idBadge);

    // Card type text
    const typeText = document.createElement("span");
    typeText.className = "card-type";
    typeText.textContent = CHOICE_CARD_OPTIONS[card.id] ? "choice" : card.type;
    headerRow.appendChild(typeText);

    cardDiv.appendChild(headerRow);

    // --- Card name ---
    const header = document.createElement("h4");
    header.className = "card-name";
    header.textContent = card.name.replace(/^\d+:\s*/, "");
    cardDiv.appendChild(header);

    // --- Card description ---
    const desc = document.createElement("div");
    desc.className = "card-desc";
    desc.textContent = card.description;
    cardDiv.appendChild(desc);

    // Click handler
    cardDiv.addEventListener("click", () => handlePlayerCardClick(index));
    // Hover handlers: highlight relevant action IDs for event cards.
    if (card.type === "event") {
      cardDiv.addEventListener("mouseenter", () => {
        setHighlightedActions(getActionIdsFromEvent(card));
      });
      cardDiv.addEventListener("mouseleave", () => {
        clearHighlightedActions();
      });
    }
    handDiv.appendChild(cardDiv);
  });

  scheduleScoreRailPosition();
}

let scoreRailPositionFrame = null;

function scheduleScoreRailPosition() {
  if (scoreRailPositionFrame !== null) {
    cancelAnimationFrame(scoreRailPositionFrame);
  }
  scoreRailPositionFrame = requestAnimationFrame(() => {
    scoreRailPositionFrame = null;
    positionScoreRail();
  });
}

function positionScoreRail() {
  const rail = el("scoreRail");
  const cards = [...document.querySelectorAll("#playerHand .card")];
  if (!rail || cards.length === 0) return;

  const rightmostCard = cards.reduce((rightmost, card) =>
    card.getBoundingClientRect().right >
    rightmost.getBoundingClientRect().right
      ? card
      : rightmost,
  );
  const cardBounds = rightmostCard.getBoundingClientRect();
  const horizontalMidpoint =
    cardBounds.right + (window.innerWidth - cardBounds.right) / 2;

  rail.style.left = `${horizontalMidpoint}px`;
  rail.style.top = `${cardBounds.top + cardBounds.height / 2}px`;
}

window.addEventListener("resize", scheduleScoreRailPosition);

function logAIPlay(aiName, card) {
  const aiLogDiv = el("aiLog");
  if (!aiLogDiv) return;

  const titleWithoutNumber = String(card.name || "")
    .replace(/^\d+:\s*/, "")
    .trim();
  const tooltip = String(card.tooltip || "").trim();
  let logDetail = tooltip || "Effect applied.";
  if (tooltip === titleWithoutNumber) logDetail = "";
  const entry = document.createElement("div");
  entry.innerHTML = `<strong>${aiName}</strong> played <em>${card.name}</em>${logDetail ? `: ${logDetail}` : ""}`;
  entry.className = "ai-entry";

  aiLogDiv.prepend(entry);

  // Keep the newest entry visible at the top of the log.
  aiLogDiv.scrollTop = 0;
}

function logSkippedCard(card) {
  const aiLogDiv = el("aiLog");
  if (!aiLogDiv) return;

  const entry = document.createElement("div");
  entry.innerHTML = `<strong>${player.name}</strong> skipped <em>${card.name}</em>.`;
  entry.className = "ai-entry";
  aiLogDiv.prepend(entry);
  aiLogDiv.scrollTop = 0;
}

function updateGameInfo() {
  const infoDiv = el("gameInfo");

  if (!infoDiv) return;

  infoDiv.innerHTML = `
    <div class="company-summary player-company">
      <strong>${player.name}</strong><br>
      Progress: ${player.progress},<br> RAI points: ${player.sustainability}<br>
      Actions: ${renderCards([...player.actionsPlayed].sort((a, b) => a - b), highlightedActionIds)}
    </div>

    <strong>${AI1.name}</strong><br>
    Progress: ${AI1.progress},<br> RAI points: ${AI1.sustainability}<br>
    Actions: ${renderCards([...AI1.actionsPlayed].sort((a, b) => a - b), highlightedActionIds)}<br><br>

    <strong>${AI2.name}</strong><br>
    Progress: ${AI2.progress},<br> RAI points: ${AI2.sustainability}<br>
    Actions: ${renderCards([...AI2.actionsPlayed].sort((a, b) => a - b), highlightedActionIds)}<br>
  `;

  updateScoreChart();
}

function updateScoreChart() {
  const plot = el("scoreChartPlot");
  if (!plot) return;

  const scoreMaximum = 40;
  const organisations = [
    { organisation: player, isPlayer: true },
    { organisation: AI1, isPlayer: false },
    { organisation: AI2, isPlayer: false },
  ];

  plot.innerHTML = "";

  organisations.forEach(({ organisation, isPlayer }) => {
    const raiValue = organisation.sustainability;
    const progressValue = organisation.progress * 0.5;
    const weightedTotal = raiValue + progressValue;
    const raiHeight = Math.min(raiValue / scoreMaximum, 1) * 100;
    const progressHeight =
      Math.min(progressValue / scoreMaximum, 1 - raiHeight / 100) * 100;
    const column = document.createElement("div");
    const stack = document.createElement("div");
    const raiSegment = document.createElement("div");
    const progressSegment = document.createElement("div");

    column.className = "score-bar-column";
    column.setAttribute(
      "aria-label",
      `${isPlayer ? organisation.name : "Rival"}: ${raiValue} RAI points and ${organisation.progress} Progress points; weighted score ${weightedTotal}.`,
    );

    stack.className = "score-bar-stack";
    stack.title = `${raiValue} RAI + ${organisation.progress} Progress × 0.5 = ${weightedTotal}`;

    raiSegment.className = "score-segment score-segment-rai";
    raiSegment.style.height = `${raiHeight}%`;

    progressSegment.className = "score-segment score-segment-progress";
    progressSegment.style.bottom = `${raiHeight}%`;
    progressSegment.style.height = `${progressHeight}%`;

    stack.append(raiSegment, progressSegment);
    column.appendChild(stack);

    if (isPlayer) {
      const label = document.createElement("div");
      label.className = "score-player-label";
      label.textContent = "YOU";
      column.appendChild(label);
    }

    plot.appendChild(column);
  });
}

function renderCards(idArray, highlightIds = new Set()) {
  return idArray.length === 0
    ? "None"
    : idArray
        .map((rawId) => {
          const id = Number(rawId);
          const card = CARD_BY_ID[id];
          const cardName = card ? card.name : "Unknown Card";
          const isHighlighted = highlightIds.has(id);
          const label = isHighlighted
            ? `<span class="highlighted-action">${id}</span>`
            : `${id}`;
          return `<span title="${cardName}">${label}</span>`;
        })
        .join(", ");
}

function setHTMLById(id, html) {
  const node = el(id);
  if (node) node.innerHTML = html;
}

function updatePlayedLists() {
  setHTMLById(
    "yourActionsPlayed",
    renderCards([...player.actionsPlayed].sort((a, b) => a - b), highlightedActionIds),
  );
  setHTMLById(
    "yourEventsPlayed",
    renderCards([...player.eventsPlayed].sort((a, b) => a - b)),
  );
  setHTMLById(
    "ai1ActionsPlayed",
    renderCards([...AI1.actionsPlayed].sort((a, b) => a - b), highlightedActionIds),
  );
  setHTMLById(
    "ai1EventsPlayed",
    renderCards([...AI1.eventsPlayed].sort((a, b) => a - b)),
  );
  setHTMLById(
    "ai2ActionsPlayed",
    renderCards([...AI2.actionsPlayed].sort((a, b) => a - b), highlightedActionIds),
  );
  setHTMLById(
    "ai2EventsPlayed",
    renderCards([...AI2.eventsPlayed].sort((a, b) => a - b)),
  );
}

// --- Outro message generation ---
function generateOutroMessage(P, A1, A2) {
  const scores = [
    { who: "player", value: P.sustainability },
    { who: "ai1", value: A1.sustainability },
    { who: "ai2", value: A2.sustainability },
  ];

  const total = scores.reduce((sum, s) => sum + (Number.isFinite(s.value) ? s.value : 0), 0);

  const pScore = scores[0].value;
  const values = scores.map((s) => s.value);
  const max = Math.max(...values);
  const uniqueSorted = [...new Set(values)].sort((a, b) => b - a);
  const countAt = (v) => values.filter((x) => x === v).length;

  let rankKey = "third";
  if (pScore === max) {
    rankKey = countAt(max) >= 2 ? "first_tie" : "first";
  } else if (uniqueSorted.length > 1 && pScore === uniqueSorted[1]) {
    rankKey = countAt(uniqueSorted[1]) >= 2 ? "second_tie" : "second";
  } else {
    rankKey = "third";
  }

  let placeText = "";
  switch (rankKey) {
    case "first":
      placeText = "1st place";
      break;
    case "first_tie":
      placeText = "tied for 1st place";
      break;
    case "second":
      placeText = "2nd place";
      break;
    case "second_tie":
      placeText = "tied for 2nd place";
      break;
    default:
      placeText = "3rd place";
  }

  let personalMsg = "";
  switch (rankKey) {
    case "first":
      personalMsg = "Using technology responsibly is a shared challenge. You’ve done better than any of your competitors. Congratulations, you have shown leadership!";
      break;
    case "first_tie":
      personalMsg = "You’re tied for first place! Congratulations, you’ve shown leadership in using technology responsibility. This is a shared challenge.";
      break;
    case "second":
    case "second_tie":
      personalMsg = "Using technology responsibly is a shared challenge. You’re somewhere in the middle of the pack, neither leading the way nor lagging behind.";
      break;
    case "third":
    default:
      personalMsg = "You ended the game with some of the worst track record on AI in the sector! This is a shared challenge.";
      break;
  }

  let globalMsg = "";
  if (total <= 25) {
    globalMsg = "As for the global picture? Oh no! The world really is in flames! We really did have a bit of an AI-pocalypse! Now what? Revenge?";
  } else if (total <= 30) {
    globalMsg = "Of course, it’s not just about you. The social and ecological costs of AI have been enormous.";
  } else if (total <= 35) {
    globalMsg = "Globally, we have mostly managed to contain the risks of AI, and the future is now looking very bright!";
  } else if (total <= 40) {
    globalMsg = "Globally, we did it! We pivoted from harmful AI to more convivial, ecologically aligned technologies.";
  } else {
    globalMsg = "Incredible! Radical, deep change has been achieved. Tech is much more green, democratic, and convivial. You must have been smart AND lucky!";
  }

  const personalSection = `<p><strong>Your result (${placeText}):</strong> ${personalMsg}</p>`;
  const globalSection = `<p><strong>Global picture:</strong> ${globalMsg} Total RAIs: ${total}.</p>`;
  return `${personalSection}${globalSection}`;
}

// --- Turn logic with error guards ---
function safeEffectInvoke(card, P, A1, A2) {
  try {
    if (card.type === "event") {
      applyEventEffect(card, [P, A1, A2]);
      return;
    }

    if (typeof card.effect === "function") {
      card.effect(P, A1, A2);
    }
  } catch (e) {
    console.error("[DSG] Error applying effect for", card, e);
  }
}

function playAI1Card() {
  let card = null;
  let index = AI1.hand.findIndex((c) => c.type === "action");
  if (index !== -1) {
    card = AI1.hand.splice(index, 1)[0];
    AI1.actionsPlayed.add(card.id);
  } else {
    index = AI1.hand.findIndex((c) => c.type === "event");
    if (index !== -1) {
      card = AI1.hand.splice(index, 1)[0];
      AI1.eventsPlayed.add(card.id);
    }
  }
  if (card) {
    safeEffectInvoke(card, player, AI1, AI2);
    logAIPlay(AI1.name, card);
  }
  if (Array.isArray(window.deck) && deck.length) AI1.hand.push(deck.pop());
}

function playAI2Card() {
  let card = null;
  let index = AI2.hand.findIndex((c) => c.type === "action");
  if (index !== -1) {
    card = AI2.hand.splice(index, 1)[0];
    AI2.actionsPlayed.add(card.id);
  } else {
    index = AI2.hand.findIndex((c) => c.type === "event");
    if (index !== -1) {
      card = AI2.hand.splice(index, 1)[0];
      AI2.eventsPlayed.add(card.id);
    }
  }
  if (card) {
    safeEffectInvoke(card, player, AI1, AI2);
    logAIPlay(AI2.name, card);
  }
  if (Array.isArray(window.deck) && deck.length) AI2.hand.push(deck.pop());
}

function handlePlayerCardClick(index) {
  if (skipReplacementInProgress) return;

  if (skipArmed) {
    skipPlayerCard(index);
    return;
  }

  const selectedCard = player.hand[index];
  if (!selectedCard) return;
  playCardSfx(getCardSfxType(selectedCard));
  playPlayerCard(index);
}

function skipPlayerCard(index) {
  const selectedCard = player.hand[index];
  if (!selectedCard) return;

  if ((!Array.isArray(window.deck) || deck.length === 0) && !getDueSubplotCard()) {
    setSkipArmed(false);
    return;
  }

  skipReplacementInProgress = true;
  playCardSfx("skip");
  const skippedCard = player.hand.splice(index, 1)[0];
  const replacementCard = drawPlayerCard();
  if (replacementCard) player.hand.push(replacementCard);
  consumeSkipToken();
  logSkippedCard(skippedCard);
  renderPlayerHand();
  updateGameInfo();
  updatePlayedLists();

  requestAnimationFrame(() => {
    skipReplacementInProgress = false;
  });
}

let emptyDeckStreak = 0;
async function playPlayerCard(index) {
  const selectedCard = player.hand[index];
  if (!selectedCard) return;

  if (CHOICE_CARD_OPTIONS[selectedCard.id]) {
    await promptForCardChoice(selectedCard);
  }

  const chosenCard = player.hand.splice(index, 1)[0];
  if (!chosenCard) return;

  if (!chosenCard.isSubplot) {
    safeEffectInvoke(chosenCard, player, AI1, AI2);
  }

  if (chosenCard.type === "action" && !chosenCard.isSubplot) {
    player.actionsPlayed.add(chosenCard.id);
  } else if (chosenCard.type === "event") {
    player.eventsPlayed.add(chosenCard.id);
  }

  logAIPlay(player.name, chosenCard);

  const replacementCard = drawPlayerCard();
  if (replacementCard) player.hand.push(replacementCard);
  playAI1Card();
  playAI2Card();

  renderPlayerHand();
  updateGameInfo();
  updatePlayedLists();

  // check for empty deck and show game results
  function checkDeck() {
    const subplotComplete = activeSubplotCardIds.every(
      (id) => window.playerChoices[id],
    );
    if (window.deck.length === 0 && subplotComplete) {
      emptyDeckStreak++;

      if (emptyDeckStreak === 4) {

        console.log(player.sustainability, player.progress);

        const outro = document.getElementById("outro");
        outro.style.opacity = 1;
        outro.style.display = "flex";
        const outroContent = document.querySelector(".outro-text");
        const message = generateOutroMessage(player, AI1, AI2);
        outroContent.innerHTML = message;
      }
    }
  }

  checkDeck();
}

// --- Bootstrapping with diagnostics ---
window.onload = () => {
  console.log("[DSG] Boot start");
  console.log(
    "[DSG] deck present?",
    typeof window.deck,
    "isArray?",
    Array.isArray(window.deck),
    "length:",
    window.deck && window.deck.length,
  );

  if (!Array.isArray(window.deck)) {
    console.error(
      "[DSG] deck.js did not define window.deck as an array. In deck.js use: window.deck = [ /* cards */ ];",
    );
  } else if (window.deck.length === 0) {
    console.error("[DSG] deck is an empty array. Add cards to deck.js.");
  } else {
    console.log("[DSG] first 3 cards sample:", window.deck.slice(0, 3));
  }

  if (Array.isArray(window.deck) && window.deck.length > 0) {
    initCardLookup();
    prepareSubdecks();
    dealOpeningHands();
    console.log(
      "[DSG] Dealt hands — player:",
      player.hand.length,
      "AI1:",
      AI1.hand.length,
      "AI2:",
      AI2.hand.length,
    );
    console.log("[DSG] Top of deck after deal:", deck.slice(-3));
  } else {
    console.warn("[DSG] Skipping deal because deck is missing/empty.");
  }

  renderPlayerHand();
  updateGameInfo();
  updatePlayedLists();
  updateSkipUI();

  // Set AI labels (matches YOUR HTML IDs). Falls back to alternative IDs if present.
  const a1Header = el("ai1ActionsHeader") || el("ai1ActionsLabel");
  const a1EHeader = el("ai1EventsHeader") || el("ai1EventsLabel");
  const a2Header = el("ai2ActionsHeader") || el("ai2ActionsLabel");
  const a2EHeader = el("ai2EventsHeader") || el("ai2EventsLabel");

  if (a1Header) a1Header.textContent = `${AI1.name} Actions Played`;
  if (a1EHeader) a1EHeader.textContent = `${AI1.name} Events Played`;
  if (a2Header) a2Header.textContent = `${AI2.name} Actions Played`;
  if (a2EHeader) a2EHeader.textContent = `${AI2.name} Events Played`;

  console.log("[DSG] Boot end");
};
