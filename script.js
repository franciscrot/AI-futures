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
    progress: 0,
    sustainability: 0,
    actionsPlayed: new Set(),
    eventsPlayed: new Set(),
  };
  AI1 = {
    name: AI1Name,
    hand: [],
    progress: 0,
    sustainability: 0,
    actionsPlayed: new Set(),
    eventsPlayed: new Set(),
  };
  AI2 = {
    name: AI2Name,
    hand: [],
    progress: 0,
    sustainability: 0,
    actionsPlayed: new Set(),
    eventsPlayed: new Set(),
  };

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
    prompt: (companyName) =>
      `Does ${companyName} prefer general-purpose AI systems, or smaller, domain-specific AI systems?`,
    options: [
      { value: "general-purpose", label: "General-purpose AI systems" },
      { value: "domain-specific", label: "Smaller, domain-specific AI systems" },
    ],
  },
  34: {
    prompt: (companyName) =>
      `Where does most of ${companyName}'s compute take place?`,
    options: [
      { value: "machine-meshes", label: "On devices and local machine meshes" },
      { value: "cloud-computing", label: "In remotely accessible cloud computing" },
    ],
  },
  35: {
    prompt: (companyName) =>
      `Which unexpected technology is working rather well for ${companyName}?`,
    options: [
      { value: "space-data-centres", label: "Data centres in space and on the Moon" },
      {
        value: "organic-data-centres",
        label: "Organic data centres powered partly by algae and mud batteries",
      },
    ],
  },
  36: {
    prompt: (companyName) =>
      `Which environmental priority matters more to ${companyName}?`,
    options: [
      { value: "sustainable-ai", label: "Reducing the impacts of AI itself" },
      {
        value: "ai-for-sustainability",
        label: "Using AI to achieve wider environmental benefits",
      },
    ],
  },
  37: {
    prompt: (companyName) =>
      `Are most workers at ${companyName} a bit cyborg, or very cyborg?`,
    options: [
      { value: "a-bit-cyborg", label: "A bit cyborg" },
      { value: "very-cyborg", label: "Very cyborg" },
    ],
  },
};

window.playerChoices = {};

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
    config.options.forEach((option, index) => {
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
  progress: 0,
  sustainability: 0,
  actionsPlayed: new Set(),
  eventsPlayed: new Set(),
};
let AI1 = {
  name: AI1Name,
  hand: [],
  progress: 0,
  sustainability: 0,
  actionsPlayed: new Set(),
  eventsPlayed: new Set(),
};
let AI2 = {
  name: AI2Name,
  hand: [],
  progress: 0,
  sustainability: 0,
  actionsPlayed: new Set(),
  eventsPlayed: new Set(),
};

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

function prepareSubdecks() {
  if (!Array.isArray(window.deck)) return;

  const subdeckA = [];
  const subdeckB = [];

  deck.forEach((card) => {
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
    typeText.textContent = card.type;
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
    cardDiv.addEventListener("click", () => playPlayerCard(index));
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
}

function logAIPlay(aiName, card) {
  const aiLogDiv = el("aiLog");
  if (!aiLogDiv) return;

  const entry = document.createElement("div");
  entry.innerHTML = `<strong>${aiName}</strong> played <em>${card.name}</em>: ${card.tooltip || "Effect applied."}`;
  entry.className = "ai-entry";

  aiLogDiv.appendChild(entry);

  // scroll the new entry into view
  entry.scrollIntoView({ behavior: "smooth", block: "end" });
}

function logSkippedCard(card) {
  const aiLogDiv = el("aiLog");
  if (!aiLogDiv) return;

  const entry = document.createElement("div");
  entry.innerHTML = `<strong>${player.name}</strong> skipped <em>${card.name}</em>. No effect was applied.`;
  entry.className = "ai-entry";
  aiLogDiv.appendChild(entry);
  entry.scrollIntoView({ behavior: "smooth", block: "end" });
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

let emptyDeckStreak = 0;
async function playPlayerCard(index) {
  const selectedCard = player.hand[index];
  if (!selectedCard) return;

  const isSkipping = skipArmed;

  if (!isSkipping && CHOICE_CARD_OPTIONS[selectedCard.id]) {
    await promptForCardChoice(selectedCard);
  }

  const chosenCard = player.hand.splice(index, 1)[0];
  if (!chosenCard) return;

  if (isSkipping) {
    consumeSkipToken();
    logSkippedCard(chosenCard);
  } else {
    safeEffectInvoke(chosenCard, player, AI1, AI2);

    if (chosenCard.type === "action") player.actionsPlayed.add(chosenCard.id);
    else if (chosenCard.type === "event") player.eventsPlayed.add(chosenCard.id);

    logAIPlay(player.name, chosenCard);
  }

  if (Array.isArray(window.deck) && deck.length) player.hand.push(deck.pop());
  playAI1Card();
  playAI2Card();

  renderPlayerHand();
  updateGameInfo();
  updatePlayedLists();

  // check for empty deck and show game results
  function checkDeck() {
    if (window.deck.length === 0) {
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
