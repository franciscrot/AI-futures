// deck.js
window.deck = [
  // ================================
  // 30 ACTION CARDS
  // ================================
  {
    id: 1,
    name: "1: Optimise visuals, video, and media",
    type: "action",
    description: `* Use fewer images where possible.
* Compress images using tools like ShortPixel, TinyPNG, or ImageOptim.
* Prefer efficient formats: SVG for icons, WEBP or AVIF over JPG or PNG.
* Enable lazy loading to defer offscreen media.
* Use responsive image markup or an image resizing API to serve the right resolution for each device.
* Experiment with shallow depth of field, constrained colour palettes, and dark mode styling.
* Write good alt text to enhance accessibility and SEO.
* Optimise video: limit autoplay, compress with Handbrake.fr, and avoid high-resolution defaults.
* Choose green video platforms—YouTube and Vimeo may not be optimal; explore Mave.io.
* Prefer WebM and MP4 over MOV and AVI, depending on compression and resolution needs.`,
    tooltip: "Optimise visuals, video, and media",
    links: `* Sustainable Website Tips in the DHCC Toolkit  
* Try Shortpixel, TinyPNG, ImageOptim, or ImageAlpha for image compression.  
* Use Handbrake.fr to compress video.  
* Explore greener video platforms like Mave.io.`,
    imagePath: "images/1.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 2,
    name: "2: Use green web development practices",
    type: "action",
    description: `* Minify HTML, CSS, and JavaScript to reduce page size and energy use.
* Use clean, efficient code—avoid unnecessary complexity or outdated libraries.
* Cache assets effectively with proper headers and a CDN.
* Benchmark page performance with tools like Lighthouse or EcoGrader.
* Prefer static site generators or server-side rendering where appropriate.
* Use lightweight fonts, limit custom animations, and avoid oversized frameworks.
* Electricity Maps offers a global carbon intensity API to make your front end carbon-aware.`,
    tooltip: "Develop greenly!",
    imagePath: "images/2.jpg",
    effect(player, AI1, AI2) { }
  },
  {
    id: 3,
    name: "3: Streamline user journeys",
    type: "action",
    description: `* Simplify site structure—reduce the number of clicks to reach important content.
* Delete outdated or redundant content to reduce load and confusion.
* Use a clear visual hierarchy with consistent design elements and obvious calls to action.
* Add a search function to help users find content directly.
* Minimise energy-intensive interactions (e.g. unnecessary reloads or live updates).
* Test your website’s usability and fix inefficient navigation flows.`,
    tooltip: "Simplify user journeys! If you like, describe how terrible it was before, and how amazing it is now.",
    imagePath: "images/6.jpg",
    effect() { }
  },
  {
    id: 4,
    name: "4: Audit your digital dependencies",
    type: "action",
    description: `* Review all third-party plugins, libraries, and trackers on your site.
* Ask: what functionality is truly needed? What’s redundant?
* Consider replacing heavyweight frameworks (like full Bootstrap) with lighter or modular alternatives.
* Use only the parts of libraries you need—avoid default imports that load unused code.
* Replace library functionality with plain CSS or JavaScript if possible.
* Audit cookies, analytics scripts, and embedded services that may load external resources.`,
    tooltip: "Audit those dependencies! If you want, describe some of the weird unnecessary stuff you decided to remove.",
    imagePath: "images/3.jpg",
    effect() { }
  },
  {
    id: 5,
    name: "5: Build green CI/CD pipelines",
    type: "action",
    description: `* Optimise CI/CD pipelines: remove redundant builds, cache dependencies, and reduce test duplication.
* Use carbon-aware scheduling—trigger builds during periods of low grid carbon intensity (Electricity Maps can help).
* Explore GreenOps or Sustainable DevOps (SusDevOps) practices to track and control your carbon 'spend.'
* Use infrastructure-as-code to modularise deployments, right-size instances, and enable auto-shutdown defaults.
* Prefer serverless or event-based architectures for reduced idle time.`,
    tooltip: "Build those CI/CD pipelines!",
    imagePath: "images/5.jpg",
    effect() { }
  },
  {
    id: 6,
    name: "6: Choose sustainable tools, languages, and architectures",
    type: "action",
    description: `* Write efficient code—avoid bloated logic, excessive loops, or unnecessary calls.
* Be cautious of vibe coding and any AI-generated code.
* Consider low-energy languages like Rust and Go.
* Avoid overprovisioning infrastructure; right-size your deployments.
* Explore serverless, container-based, or autoscaling architectures to reduce waste.
* Explore sustainable software resources from Green Software Foundation, Green Web Foundation, and Green Coding Solutions.`,
    tooltip: "Choose sustainable tools, languages, and architectures!",
    imagePath: "images/4.jpg",
    effect() { }
  },
  {
    id: 7,
    name: "7: Avoid wasteful or disproportionate methods in data science / ML",
    type: "action",
    description: `* Measure emissions with tools like CodeCarbon (directional) and GPU/DCGM telemetry at the cluster level.
* Check out the AI Energy Score project: https://huggingface.co/spaces/AIEnergyScore/Leaderboard.
* Track energy at service-tier granularity (OpenTelemetry, power meters).
* Prefer reuse to retraining: PEFT, LoRA, RAG, retrieval pipelines, prompt engineering.
* BUT consider that a smaller, specialist model might be better in the long-term than a more general purpose one.
* Use model distillation to reduce size and energy cost.
* Optimise training cycles: reduce search space, limit tuning passes, and choose efficient architectures.
* Streamline data movement by cleaning ETL pipelines and avoiding dataset over-fetching.
* Try out GSF's Software Carbon Intensity (SCI) to define emissions relative to a task.`,
    tooltip: "If you're training models, describe how you’re making them leaner and greener.",
    imagePath: "images/7.jpg",
    effect() { }
  },
  {
    id: 8,
    name: "8: Know which everyday activities are fine",
    type: "action",
    description: `* Try to foster a rough awareness of big, medium, small, and teeny-tiny impacts.
* Then we can pick our battles. People’s attention and energy is limited, and nobody likes being guilt-tripped: let’s focus on the behaviour changes that really matter.
* You may have heard the advice not to send ‘thank you’ emails, to save carbon. But a typical short text email has a completely miniscule impact compared to a single Google search or a ChatGPT query.
* This advice is really a way to individualise responsibility, and a distraction from working together to drive real change.
`,
    tooltip: "Sweat the servers, but don't sweat the small stuff!",
    imagePath: "images/8.jpg",
    effect() { }
  },
  {
    id: 9,
    name: "9: Use efficient internet connections",
    type: "action",
    description: `* Cellular data connections (like 4G and 5G) use more energy than WiFi.
* WiFi uses more energy than ethernet connections (plugging your device in).
* Plug in when you can!`,
    tooltip: "Plug in!",
    imagePath: "images/9.jpg",
    effect() { }
  },
  {
    id: 10,
    name: "10: Optimise our WiFi network",
    type: "action",
    description: `* We use off-peak profiles (e.g. reduced transmit power, narrower channels, scaled PoE), so the network can run in a lighter mode when usage is low.
* We enable seamless roaming and channel optimisation (e.g. 802.11r/k/v, automatic channel selection) to help reduce retries, interference, and redundant coverage.
* We treat switching and PoE as managed power systems—set realistic per-port budgets, avoid 'always-on high,' and adjust using telemetry (e.g. retry rates, RF noise, client counts, coverage).
* For small labs, home offices etc., we experiment with predictable low-power / sleep schedules, enable beamforming and dynamic channels, and experiment with Energy Efficient Ethernet (802.3az) and PoE right-sizing.
`,
    tooltip: "Optimise that WiFi network!",
    imagePath: "images/10.jpg",
    effect() { }
  },
  {
    id: 11,
    name: "11: Don't store data we don't need",
    type: "action",
    description: `* We define what 'needed' means and delete or archive everything else — we mostly avoid 'just in case' storage.
* We use automated lifecycle rules (e.g. 30/90/180-day expiry) on temp folders, staging buckets, caches, logs, and model outputs, so unused files don’t accumulate.
* We run regular clean-ups with visual tools (e.g. WinDirStat, TreeSize, Baobab, ncdu) to surface '“dark data' such as duplicates, abandoned exports, and old checkpoints.
* We are so good at naming conventions and metadata. We actually know what most things are.
* We prioritise the biggest storage consumers first — large media, datasets, experiments, and exports. We don't spend ages manually reading and deleting text files.`,
    tooltip: "Does this data spark joy?",
    imagePath: "images/11.jpg",
    effect() { }
  },
  {
    id: 12,
    name: "12: Use near-line and off-line storage",
    type: "action",
    description: `* We keep long-term data we rarely access in near-line or offline “cold” storage (e.g. archive cloud tiers, magnetic tape, offline drives), instead of leaving it on hot, always-available systems.
* We classify data by how often we actually use it — active data stays online; legacy research, past projects, and compliance archives move to slower, cheaper, lower-energy tiers.
* We automate the move: after a set period (e.g. 90/180/365 days), data shifts from hot storage to archival tiers, so we don’t manually drag it around forever.
* We document where it lives and how to retrieve it, so archives don’t turn into digital attics full of mystery folders.
* You wouldn’t keep a kettle constantly boiling just in case you want tea.`,
    tooltip: "Fancy a cuppa? It'll be done in 20 ticks!",
    imagePath: "images/12.jpg",
    effect() { }
  },
  {
    id: 13,
    name: "13: Benchmark our digital activities",
    type: "action",
    description: `* We benchmark our digital footprint — we learn about the environmental impacts of the digital tools, cloud services, and workflows we rely on.
* We use tools such as Digital Carbon Footprint (digitalemissions.org/dcf) and DIMPACT (dimpact.org) to estimate emissions from websites, streaming, cloud use, and online services.
* For software and ML workloads, we experiment with estimators like CodeCarbon and Green Algorithms; for cloud platforms we try Cloud Carbon Footprint, provider dashboards (e.g. AWS, Azure, GCP sustainability reports), third party providers like Greenpixie.
* We treat estimates as indicative: enough to reveal hotspots and guide sensible changes.
* We re-run benchmarks when our tools, workloads, or hosting setups change, so improvements are not one-off.`,
    tooltip: "Mark that bench! Bench that mark!",
    imagePath: "images/13.jpg",
    effect() { }
  },
  {
    id: 14,
    name: "14: Extend our devices' life spans",
    type: "action",
    description: `* We extend our devices' life spans through repair, maintenance, and upgrades to reduce waste and cost.
    * We prioritise repair over replacement. We buy extended warranties, choose repairable devices.
    * We work with the sector to advocate for stronger 'right to repair' legislation.
    * We work with charities and communities to host Restart Parties and repair cafes.
* We protect against avoidable damage with sturdy cases, bumpers, and screen protectors.
* We look after batteries and components by using and storing devices within the recommended temperature range (cool, dry, out of direct sun) and by avoiding long periods of charging in hot environments.
* We use built-in battery health features (e.g. charge-limit or 'optimised charging' settings) so devices don’t sit at 100% charge all the time, helping batteries last longer.
* We invest in IT support.`,
    tooltip: "What's the oldest most post-apocalyptic looking piece of junk in your organisation?",
    imagePath: "images/14.jpg",
    effect() { }
  },
  {
    id: 15,
    name: "15: Use Life Cycle Analysis (LCA)",
    type: "action",
    description: `* We use Life Cycle Analysis (LCA) to understand the environmental impacts of our digital systems from end to end — not just energy use, but also hardware production, infrastructure, and end-of-life.
* LCAs work pretty well for physical products (e.g. minerals → manufacturing → shipping → use → disposal), but they are harder for software. We collaborate on developing shared methodologies and standards.
* We use recognised frameworks such as ISO 14040/14044 and ISO 14067, and datasets like ecoinvent or the European Life Cycle Database, to estimate embodied impacts in hardware and infrastructure.
* For the use-phase of compute, we experiment with tools such as Green Algorithms or telemetry-based methods (not as full LCAs, but to understand how runtime, GPU/CPU usage, and location can influence carbon emissions).
`,
    tooltip: "Analyse, analyse, as though your Life Cycle depended on it!",
    imagePath: "images/15.jpg",
    effect() { }
  },
  {
    id: 16,
    name: "16: Advocate for right to repair",
    type: "action",
    description: `* Manufacturers must provide spare parts, documentation, diagnostics, and firmware access for the full realistic lifespan of devices.
* We push to outlaw digital lock-in tactics (such as parts pairing, undocumented serialisation, and software gating that make independent repairs risky).
* We advocate for anti-obsolescence regulation, preventing companies from bricking usable hardware through e.g. forced updates.
* We push for incentives like repair vouchers, subsidised community repair networks, mandatory repairability indices, minimum support periods, to make repair actually cheaper and easier.
* We work against a culture of planned obsolescence.
* On the software side, we advocate for greater interoperability, the right to exit, and the 'end-to-end' principle, and against platform lock-in and enshittification.
`,
    tooltip: "More cyberpunk policy!",
    imagePath: "images/16.jpg",
    effect() { }
  },
  {
    id: 17,
    name: "17: Improve our e-waste recycling",
    type: "action",
    description: `* Many electronics cannot be fully recycled, and informal channels often recover only valuable metals before dumping toxic remains.
* We work with certified recyclers that publish transparent downstream flows (e.g. R2, e-Stewards) and comply with standards like WEEE, not dodgy brokers.
* We prioritise reuse and repair first, because most e-waste ends up downcycled (mixed plastics, residual metals) or becomes hazardous waste even in legal facilities.
* We acknowledge how informal e-waste work emerges as a practical response to colonial power relations, and our decision-making supports labour in the Global South.
* We expect manufacturers to design for safe disassembly and to share end-of-life responsibility.`,
    tooltip: "E-waste not e-want not?",
    imagePath: "images/17.jpg",
    effect() { }
  },
  {
    id: 18,
    name: "18: Design for humans, not angels",
    type: "action",
    description: `* We encourage sustainable habits, but we don’t rely on goodwill alone. People are busy, distracted, and pressured. Systems must support them rather than just guilt-trip them.
* When employees meet obstacles in trying to work sustainably, we have credible mechanisms for capturing these obstacles and acting on them.
* We redesign policies, tools, and defaults to make sustainable choices the path of least resistance.`,
    tooltip: "Who are some of the humans in YOUR organisation?",
    imagePath: "images/18.jpg",
    effect() { }
  },
  {
    id: 19,
    name: "19: Check suppliers for greenwashing",
    type: "action",
    description: `* Our suppliers claim to be sustainable, but we do our own detective work, drawing on resources such as Corporate Responsibility Monitor and Zero Carbon Analytics.
* We watch out for classic greenwashing, e.g. leaving out parts of Scope 3, reporting only carbon while ignoring other greenhouse gases, picking a convenient baseline year, or publishing market-based emissions while hiding location-based emissions.
* We scrutinise “carbon neutral” pledges and offsetting schemes — we know all about the dodgy additionality of many voluntary carbon credits and clean energy certificates.
* Regulatory capture can also function as greenwashing. We watch out for big tech's influence on carbon accounting (GHG Protocol), the standards and certifications that signal sustainability.
* We learn from people doing serious work in this space — Cathleen Berger, Holly and Will Alpine, Mark Butcher, Chris Adams — so we can read sustainability claims clearly instead of getting bamboozled by methodological complexity.`,
    tooltip: "Crack this case wide open!",
    imagePath: "images/19.jpg",
    effect() { }
  },
  {
    id: 20,
    name: "20: Pivot to policy",
    type: "action",
    description: `* When we hit sustainability problems that can't be solved at the company level, we don’t stop there. We turn those experiences into evidence and push for policy changes.
* We share what we learn with the sector, with regulators, standards bodies, trade groups, and civil society, so structural barriers (e.g. supply chains, infrastructure, pricing) can be addressed, not just patched internally.
* Our Chief Sustainability Officer is constantly campaigning for decisions to be taken out of their hands, for more things to be made mandatory.
* We recognise that what we want and need as humans may be different from what we need as stakeholders of our organisation. We remember that our organisation is made of people who care about the future, and we act together when private fixes are not enough.
`,
    tooltip: "Grab your big policymaker net and go a-huntin'!",
    imagePath: "images/20.jpg",
    effect() { }
  },
  {
    id: 21,
    name: "21: Pivot to protest",
    type: "action",
    description: `* We foster real collaboration with climate and digital-rights activists.
* We learn from movements like Artists Against AI and the Green Screen Climate Justice & Digital Rights Coalition, which expose extractive AI practices, resist unconsented training, and organise workers to protect cultural and ecological futures.
* Grassroots environmentalists have always played a key role in fighting greenwashing and getting climate science adopted by policymakers.
* We stand with those building alternatives rather than insisting everything must be solved inside the organisation.`,
    tooltip: "Who in your organisation is really not on board with this?",
    imagePath: "images/21.jpg",
    effect() { }
  },
  {
    id: 22,
    name: "22: Understand green energy procurement",
    type: "action",
    description: `* We don’t treat '100% renewable' claims as proof of decarbonisation, but ask whether suppliers use RECs/REGOs, PPAs, green tariffs, etc. 
* We want 24/7 (hourly + locational) matching, although we also know this isn't going to solve everything.
* We want both market-based data (which includes the 'offsetting' of purchased clean energy instruments) and location-based data (which is based on estimates of actual emissions from the local grid).
* We base our decisions on additionality: our procurement should help create new renewable capacity or displace fossil generation, not just reassign existing clean energy from someone else.
* We know PUE isn't everything. A data centre packed inefficient idling servers with no heat recycling, replaced every six months, entirely fuelled by the dirtiest coal you've seen in your life, can still have a lovely low PUE.
* We are aware of the politics of carbon accounting, including the role big tech are playing in initiatives like the GHG Protocol (e.g. Scope 2) and SBTi, and controversies around 24/7 matching and project-based emissions.`,
    tooltip: "What's on your procurement questionnaire?",
    imagePath: "images/22.jpg",
    effect() { }
  },
  {
    id: 23,
    name: "23: Measure our carbon for AI and the cloud",
    type: "action",
    description: `* When we started our digital sustainability journey, we used IT spend and Emissions Factors to estimate emissions. How far we've come!
    * We get good estimates of the carbon emissions of our digital work, especially AI and cloud, using tools like CodeCarbon, Green Algorithms, and Cloud Carbon Footprint.
* The big cloud datas provide some data on the carbon implications of our cloud usage, but we're constantly on their case to improve their tools (more accurate, timely, transparent, and granular data please!).
* We track where and when workloads run, because grid carbon intensity changes by region and hour.
* We recognise limitations, and we model what's missing as best we can: embodied carbon in devices, data centres and network infrastructure, indirect and systemic impacts, rebound effects, demand substitutions, enabled emissions, environmental pressures and harms such as water use and biodiversity loss.`,
    tooltip: "How big is your AI carbon footprint? And how long are the footnotes?",
    imagePath: "images/23.jpg",
    effect() { }
  },
  {
    id: 24,
    name: "24: Use grid-aware demand management",
    type: "action",
    description: `* We practice grid-aware computing (see also carbon-aware computing). We schedule digital workloads at environmentally optimal times and places.
* We use greener cloud regions (spatial demand shifting).
* When possible, we run heavy compute during periods of renewable surplus (temporal demand shifting) — when the wind is blowing, the sun is shining, and clean energy would otherwise be curtailed or wasted.
* We explore tools like the Green Software Foundation’s Carbon Aware SDK (and services such as Carbonrunner.io) to help shift non-urgent workloads across time or region, instead of running everything immediately.
* We are cautious not to add  more volatility to the grid, and we understand that the long-term, systemic aim is to have a predictable, smooth demand curve (sudden peaks can bring coal-fired peaking plants online).
* We also explore demand shaping: changing the nature of what we serve, according to the carbon intensity of the grid. For example, images on our website are opt-in when the grid is not green. We've got really good at alt text descriptions too.`,
    tooltip: "On a scale of 1 to 5, how aware are you of grid?",
    imagePath: "images/24.jpg",
    effect() { }
  },
  {
    id: 25,
    name: "25: Know when not to use AI",
    type: "action",
    description: `* We have lots of ways of saying no to AI. It could be the outcome of an AI Impact Assessment, or of a stakeholder consultation, or a carbon footprinting tool, for example.
    * We resist AI when it has disproportionate environmental costs, replaces human relationships, extracts labour unfairly, exploits datasets in ethically dubious ways, or expands data surveillance.
* When the AI version and the no-AI version are evenly matched, we usually go with the no-AI version. 
* We recognise the value of keeping traditional skills, approaches, and systems alive and kicking. We invest in people-powered, low-tech, and community-led alternatives that preserve autonomy and dignity over automation and escalation.
 `,
    tooltip: "Human says no!",
    imagePath: "images/25.jpg",
    effect() { }
  },
  {
    id: 26,
    name: "26: Understand different kinds of AI",
    type: "action",
    description: `* We know that different AI systems have radically different footprints.
    * Foundation models can be thousands of times heavier than small classifiers or fine-tuned specialist models.
* We recognise the difference between big general-purpose generative models, mid-size task-tuned models, discriminative models, and traditional ML. 
* We choose the smallest tool that solves the problem.
* We dismiss dubious research claiming to offset AI's environmental costs with speculative environmental benefits, and recognise that AI is not 'self-offsetting' at the global level.
`,
    tooltip: "Ah, the elusive lesser spotted red-crested GPT-3!",
    imagePath: "images/26.jpg",
    effect() { }
  },
  {
    id: 27,
    name: "27: Align measurement to maturity",
    type: "action",
    description: `* Measurement can be tough, so we start simple, by using spend-based Emissions Factors (e.g. £1 on cloud = X kg CO₂e) as a rough proxy. Factors are available from national inventories, DEFRA/BEIS, and maybe some cloud provider dashboards.
* As time goes by, we improve our measurement methodology. We don't want to let the challenges of measurement delay taking action.
* Spend is not the same as emissions, price signals can change (discounts, vendor deals, procurement quirks), and high-cost services can be low-carbon while low-cost services can be dirty.
* As we mature, we move from spend-based estimates to activity-based measurements: actual energy use, grid carbon intensity by region and hour, workload footprints, embodied emissions of hardware, and lifecycle impacts.
* We improve measurement to make good decisions, like fewer unnecessary workloads, better scheduling, greener hosting choices, longer device lifetimes, and procurement that rewards real decarbonisation.
* Conventionally people talk about 'measurement,' although technically speaking a lot of this stuff is actually 'estimating' or 'modelling.'`,
    tooltip: "Cut your coat according to your carbon!",
    imagePath: "images/27.jpg",
    effect() { }
  },
  {
    id: 28,
    name: "28: Get ready for more carbon tax",
    type: "action",
    description: `* To future-proof our organisation, we have introduced an internal carbon price.
* Carbon taxes increase costs for carbon-intensive operations. They reduce emissions by making polluting options more expensive, and they also generate public revenue that can fund climate mitigation or adaptation.
* We track border measures like the Carbon Border Adjustment Mechanism (CBAM), which aims to prevent 'carbon leakage' when production shifts to countries with weaker regulations. But we recognise serious concerns about its effects on Global South exporters and trade justice.
* Carbon taxes are one way of trying to impose a 'price on carbon.' Other mechanisms include cap-and-trade schemes (where companies have a government-mandated carbon allocation, and heavily polluting companies can buy the surplus credits from cleaner companies.`,
    tooltip: "How much is that carbon in the window?",
    imagePath: "images/28.jpg",
    effect() { }
  },
  {
    id: 29,
    name: "29: Understand our place in the energy transition",
    type: "action",
    description: `* We created a Net Zero Action Plan using a '5Ws' approach: What are we doing? Who benefits or bears cost? When do impacts occur? Where do emissions arise? Why are we doing this at all?
* Where we use voluntary carbon credits, we follow a Beyond Value Chain Mitigation approach and report our footprint and our credit portfolio side by side. We don't subtract one from the other (you can't subtract apples from oranges).
* We have begun to ask: is our core business model contributing to overconsumption or energy demand escalation? We're getting ready to change our core business.
* Climate change is fundamentally a distributional problem. Emissions are not shared evenly. Research shows that millionaire lifestyles alone will consume around two-thirds of the remaining carbon budget by 2050.`,
    tooltip: "Time for an organisational mid-life crisis?",
    imagePath: "images/29.jpg",
    effect() { }
  },
  {
    id: 30,
    name: "30: Update our procurement policies",
    type: "action",
    description: `* We use procurement as a way of making change happen. Suppliers must answer clear sustainability questions about energy use, lifecycle impacts, labour practices, and AI risks.
* We empower procurement teams to make sustainable purchases, even if it's not the cheapest option.
* For hardware and hosting, we favour products and services with credible ecolabels and criteria (e.g. EPEAT, TCO Certified, EU Green Public Procurement for ICT, ITU-T L.1304 and SDCA for data centres) and we look for repairability, reuse, and circularity.
* For cloud and AI services, we expect transparency on data centres (PUE, lifecycle impacts, location-based and market-based energy data), and we ask for governance artefacts like model cards, data provenance, and alignment with frameworks such as NIST AI RMF or ISO/IEC 42001.
* We bake these expectations into procurement policies, RFPs, questionnaires and guidance, and contracts, train procurement staff to use them. We give sustainability a real weight in scoring, and we have ambitious sustainable procurement targets.`,
    tooltip: "What cannot be procured must be endured.",
    imagePath: "images/30.jpg",
    effect() { }
  },

  // ================================
  // 30 EVENT CARDS
  // ================================
  // Event cards 31–60
  {
    id: 31,
    name: "31: Web traffic increases",
    type: "event",
    description: `Web traffic increases: Gain a progress point for each of these actions: 1, 2, 3, 4, 5 and 6.`,
    tooltip: "Progress Points for Actions 1, 2, 3, 4, 5, 6.",
    imagePath: "images/31.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [1, 2, 3, 4, 5, 6].forEach(id => { if (p.actionsPlayed.has(id)) bonus += 1; });
        p.progress += bonus;
      });
    }
  },
  {
    id: 32,
    name: "32: Search engine results favour green web design",
    type: "event",
    description: `Search engine results favour green web design: Sustainable practices improve your site's rankings, rewarding your green efforts. Gain a Progress Point for each of these actions: 1, 2, 3, 4, 5, 6.`,
    tooltip: "Progress Points for Actions 1, 2, 3, 4, 5, 6.",
    imagePath: "images/32.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [1, 2, 3, 4, 5, 6].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 33,
    name: "33: Subsidies support digital sustainability",
    type: "event",
    description: `Subsidies support digital sustainability: Benefit as funding and incentives promote environmentally friendly practices. Gain a Progress Point for each of these actions: 8, 9, 12, 13.`,
    tooltip: "Progress Points for Actions 8, 9, 12, 13.",
    imagePath: "images/33.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [8, 9, 12, 13].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 34,
    name: "34: Digital sustainability leadership is attracting and retaining the best talent",
    type: "event",
    description: `Digital sustainability leadership is attracting and retaining the best talent: Your green initiatives create a competitive advantage in recruitment. Gain a Progress Point for each of these actions: 8, 9, 11, 18.`,
    tooltip: "Progress Points for Actions 8, 9, 11, 18.",
    imagePath: "images/34.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [8, 9, 11, 18].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 35,
    name: "35: Attitudes shift",
    type: "event",
    description: `Attitudes are shifting. More people embrace solarpunk, wabi sabi digital design, permacomputing, slow media, digital minimalism, unplugging, convivial technology, and decomputing. Convert Progress Points into Sustainability Points.`,
    tooltip: "Progress Points converted into Sustainability Points!",
    imagePath: "images/35.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        p.sustainability += p.progress;
        p.progress = 0;
      });
    }
  },
  {
    id: 36,
    name: "36: Climate activism is making an impact",
    type: "event",
    description: `Climate activists are significantly disrupting polluters, leading to tangible environmental benefits. Gain a Progress Point for each of these actions: 19, 21, 24, 25.`,
    tooltip: "Progress Points for Actions 19, 21, 24, 25.",
    imagePath: "images/36.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [19, 21, 24, 25].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 37,
    name: "37: Listing rules change",
    type: "event",
    description: `Listing rules change: New regulatory criteria alter market dynamics for companies that fail to meet sustainability standards. Everyone loses all Progress Points unless they have played 17, 22, or 23.`,
    tooltip: "Lose Progress Points unless you've played 17, 22, 23!",
    imagePath: "images/37.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        if (!p.actionsPlayed.has(17) && !p.actionsPlayed.has(22) && !p.actionsPlayed.has(23)) {
          p.progress = 0;
        }
      });
    }
  },

  {
    id: 38,
    name: "38: Boycott",
    type: "event",
    description: `An NGO leads a successful boycott campaign targeting digital sustainability practices that hinder progress. Convert all Progress Points to Sustainability Points.`,
    tooltip: "Convert Progress Points to Sustainability Points!",
    imagePath: "images/38.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        p.sustainability += p.progress;
        p.progress = 0;
      });
    }
  },
  {
    id: 39,
    name: "39: Resource scarcity",
    type: "event",
    description: `Water scarcity: This card highlights challenges arising from limited water resources impacting digital infrastructure. All players lose all Progress Points unless they have played 11, 12, or 27.`,
    tooltip: "Lose Progress Points unless you've played 11, 12, or 27.",
    imagePath: "images/39.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        if (!p.actionsPlayed.has(11) && !p.actionsPlayed.has(12) && !p.actionsPlayed.has(27)) {
          p.progress = 0;
        }
      });
    }
  },

  {
    id: 40,
    name: "40: Price of carbon rises",
    type: "event",
    description: `Policymakers impose a price on carbon emissions, reflecting the true environmental cost of digital operations. Gain a Progress Point for each of these actions: 19, 23, 27, 28.`,
    tooltip: "Gain Progress Points for Actions 19, 23, 27, 28.",
    imagePath: "images/40.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [19, 28, 23, 27].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 41,
    name: "41: New data storage medium",
    type: "event",
    description: `New data storage medium: Leverage emerging technologies to store data more efficiently and sustainably. Gain a Progress Point for each of these actions: 11, 12, 27, 30.`,
    tooltip: "Event: Gain progress for actions 11, 12, 27, 30.",
    imagePath: "images/41.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [11, 12, 30, 27].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 42,
    name: "42: New e-waste laws",
    type: "event",
    description: `A new law allocates responsibility for e-waste among producers, retailers, and corporate customers, driving greener practices. Gain a progress point for each of these actions: 24, 15, 16, 17.`,
    tooltip: "Event: Gain progress for actions 14, 15, 16, 17.",
    imagePath: "images/42.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [14, 15, 16, 17].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 43,
    name: "43: Shareholder activism",
    type: "event",
    description: `Shareholders mobilise, using their financial influence to push companies toward more sustainable practices. Convert all Progress Points into Sustainability Points.`,
    tooltip: "Event: Convert all progress into sustainability.",
    imagePath: "images/43.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        p.sustainability += p.progress;
        p.progress = 0;
      });
    }
  },
  {
    id: 44,
    name: "44: ESG gets a make-over",
    type: "event",
    description: `ESG gets a make-over: Modernise your environmental, social, and governance practices for better sustainability results. Gain a Progress Point for each of these actions: 7, 17, 20, 22.`,
    tooltip: "Event: Gain progress for actions 7, 17, 20, 22.",
    imagePath: "images/44.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [7, 17, 20, 22].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 45,
    name: "45: Low carbon tech disruptions",
    type: "event",
    description: `Low carbon tech disruptions: Breakthroughs in low carbon technology create both opportunities and challenges. Lose all Progress Points unless you have played one of these actions: 10, 12, or 23.`,
    tooltip: "Event: Players without actions 10, 12, or 23 lose all progress.",
    imagePath: "images/45.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        if (![10, 12, 23].some(id => p.actionsPlayed.has(id))) {
          p.progress = 0;
        }
      });
    }
  },
  {
    id: 46,
    name: "46: Reporting requirements tighten",
    type: "event",
    description: `Your organisation is now legally mandated to provide real-time reports on climate-related risks and opportunities. Gain a Progress Point for each of these actions: 7, 13, 15, 19.`,
    tooltip: "Event: Gain progress for actions 7, 13, 15, 19.",
    imagePath: "images/46.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [7, 13, 15, 19].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 47,
    name: "47: Impairment law gets a reboot",
    type: "event",
    description: `Organisations must now disclose when an asset becomes stranded, triggering a swift revaluation of its worth. Gain a Progress Point for each of these actions: 14, 16, 18, 30.`,
    tooltip: "Event: Gain progress for actions 14, 16, 30, 18.",
    imagePath: "images/47.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [14, 16, 30, 18].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 48,
    name: "48: Climate impacts disrupt supply chains",
    type: "event",
    description: `Global events interfere with production and logistics, challenging sustainable practices. Gain a Progress Point for each of these actions: 10, 16, 19, 25.`,
    tooltip: "Event: Gain progress for actions.",
    imagePath: "images/48.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [19, 25, 16, 10].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 49,
    name: "49: Global carbon price",
    type: "event",
    description: `As governments adjust policies, the true cost of carbon emissions becomes a market reality. Gain a Progress Point for each of these actions: 13, 23, 24, 28.`,
    tooltip: "Event: Gain progress for actions.",
    imagePath: "images/49.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [28, 23, 24, 13].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 50,
    name: "50: Digital divide closes",
    type: "event",
    description: `Digital divide closes: Increased digital access narrows socioeconomic gaps while accelerating progress. Gain a progress point for each of these actions: 14, 18, 26, 29.`,
    tooltip: "Event: Gain progress for actions.",
    imagePath: "images/50.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [18, 26, 29, 14].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },

  {
    id: 51,
    name: "51: Technological breakthrough",
    type: "event",
    description: `A technological breakthrough propels digital sustainability forward, opening up new pathways for progress. All players convert all Progress Points into Sustainability Points.`,
    tooltip: "Event: Convert all progress into sustainability.",
    imagePath: "images/51.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        p.sustainability += p.progress;
        p.progress = 0;
      });
    }
  },
  {
    id: 52,
    name: "52: Geopolitical disruption",
    type: "event",
    description: `Global political shifts and conflicts influence sustainability policies and practices. Players who have not played actions 10, 18, or 29 lose all Progress Points.`,
    tooltip: "Event: Players without actions 10, 18, or 29 lose all progress.",
    imagePath: "images/52.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        if (![10, 18, 29].some(id => p.actionsPlayed.has(id))) {
          p.progress = 0;
        }
      });
    }
  },
  {
    id: 53,
    name: "53: Vaporware",
    type: "event",
    description: `xSpice's data center on the Moon is a flop, exemplifying overhyped technology failures. Players who have not played actions 8, 20, or 26 lose all Progress Points.`,
    tooltip: "Event: Players without actions 8, 20, or 26 lose all progress.",
    imagePath: "images/53.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        if (![8, 20, 26].some(id => p.actionsPlayed.has(id))) {
          p.progress = 0;
        }
      });
    }
  },
  {
    id: 54,
    name: "54: Global South Green New Deal",
    type: "event",
    description: `Ambitious policy initiatives empower emerging markets to drive sustainable growth. All players convert all Progress Points into Sustainability Points.`,
    tooltip: "Event: Convert all progress into sustainability.",
    imagePath: "images/54.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        p.sustainability += p.progress;
        p.progress = 0;
      });
    }
  },
  {
    id: 55,
    name: "55: Tech giant fails to deliver",
    type: "event",
    description: `Tech giant Giggle fails to meet its decarbonisation pledges, undermining public trust in corporate sustainability promises. Gain a Progress Point for each of these actions you have played: 20, 21, 25, 30.`,
    tooltip: "Event: Gain progress for actions 20, 21, 25, 30.",
    imagePath: "images/55.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [20, 21, 25, 30].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 56,
    name: "56: Negative emissions technologies are not scaling up",
    type: "event",
    description: `Negative emissions technologies struggle to deliver, spotlighting the need for fundamental carbon reductions. Gain a Progress Point for each of these actions you have played: 20, 21, 24, 29`,
    tooltip: "Event: Gain progress for actions.",
    imagePath: "images/56.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [20, 21, 29, 24].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 57,
    name: "57: Geoengineering efforts are deferring carbon reduction",
    type: "event",
    description: `Geoengineering creates temporary fixes but delays meaningful carbon reductions. Lose all Progress Points unless you have played actions 21, 25, or 28.`,
    tooltip: "Event: Players without actions 21, 25, or 28 lose all progress.",
    imagePath: "images/57.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        if (![21, 25, 28].some(id => p.actionsPlayed.has(id))) {
          p.progress = 0;
        }
      });
    }
  },
  {
    id: 58,
    name: "58: Carbon leakage",
    type: "event",
    description: `Carbon leakage: Emissions shift across borders due to uneven regulatory environments. Gain a Progress Point for each of these actions you have played: 22, 26, 28, 29.`,
    tooltip: "Event: Gain progress for actions 22, 28, 26, 29.",
    imagePath: "images/58.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [22, 28, 26, 29].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 59,
    name: "59: Major climate impact",
    type: "event",
    description: `Extreme weather events and systemic disruptions drive a sense of urgency in climate response. Lose all Progress Points unless you have played 10, 15, or 30.`,
    tooltip: "Event: Players without actions 10, 15, or 30 lose all progress.",
    imagePath: "images/59.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        if (![10, 15, 30].some(id => p.actionsPlayed.has(id))) {
          p.progress = 0;
        }
      });
    }
  },
  {
    id: 60,
    name: "60: Big policy shift",
    type: "event",
    description: `Landmark changes in policy reshape global approaches to sustainability. All players convert all Progress Points into Sustainability Points.`,
    tooltip: "Event: Convert all progress into sustainability.",
    imagePath: "images/60.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        p.sustainability += p.progress;
        p.progress = 0;
      });
    }
  }
];

// Snapshot once (same object refs, new array)
window.__DECK_SNAPSHOT__ = window.deck.map(card => ({ ...card }));



