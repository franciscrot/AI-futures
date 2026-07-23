// deck.js
window.deck = [
  // ================================
  // 37 ACTION AND CHOICE CARDS
  // ================================
  {
    id: 1,
    name: "1: We estimate and track AI environmental impacts",
    type: "action",
    description: "* We track impact across training, inference, and infrastructure, using tools like CodeCarbon, ML CO₂ Impact, and the AI Energy Star league table. We engage with groups like the Green Software Foundation and EGDC.\n* We acknowledge measurement limitations, but without letting uncertainty delay action.",
    tooltip: "We estimate and track AI environmental impacts",
    imagePath: "images/1.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 2,
    name: "2: We know ‘AI’ isn't just one thing (especially environmentally)",
    type: "action",
    description: "* We understand that different AI types—e.g. generative vs. discriminative, large vs. small models—can have vastly different environmental costs.\n* We avoid misleading comparisons, avoid AI greenwashing, and make informed decisions about when and what kind of AI is appropriate—or whether it’s needed at all.",
    tooltip: "We know ‘AI’ isn't just one thing (especially environmentally)",
    imagePath: "images/2.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 3,
    name: "3: We use and improve sustainability standards",
    type: "action",
    description: "* We consult existing AI sustainability standards (e.g. AI Energy Star, ISO, ITU, IEEE) while acknowledging gaps and limits.\n* We push for stronger standards, and more mandatory disclosures.\n* We do our bit to ensure major cloud providers are fully transparent about their data centers.",
    tooltip: "We use and improve sustainability standards",
    imagePath: "images/3.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 4,
    name: "4: We embed sustainability in AI development, deployment, and evaluation",
    type: "action",
    description: "* We evaluate AI models using environmental metrics, not just accuracy or latency.\n* We adopt GreenOps / Sustainable DevOps, integrating sustainability into CI/CD.\n* We favour right-sized intelligence and use smaller, distilled, sparse, and/or federated models.",
    tooltip: "We embed sustainability in AI development, deployment, and evaluation",
    imagePath: "images/4.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 5,
    name: "5: We use grid-aware computing and 24/7 CFE",
    type: "action",
    description: "* We schedule compute to minimise environmental impact, and we select greener cloud regions.\n* We don’t add to grid volatility, and collaborate sectorally on demand shaping. We aim to use renewable energy that would otherwise be curtailed.\n* We also use 24/7 hourly matching, which encourages us to invest better in clean energy and storage",
    tooltip: "We use grid-aware computing and 24/7 CFE",
    imagePath: "images/5.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 6,
    name: "6: We use lean AI development",
    type: "action",
    description: "* We design AI systems to be efficient by default. We reduce compute in experimentation.\n* We favour transfer learning, early stopping, and targeted benchmarking over brute-force tuning.\n* We use methods like LoRA and adapter layers, tools like Optuna or Ray Tune, strategies like Successive Halving or Hyperband.",
    tooltip: "We use lean AI development",
    imagePath: "images/6.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 7,
    name: "7: We don’t greenwash our carbon accounting",
    type: "action",
    description: "* We provide both location-based data and market-based data about our carbon emissions\n* We don’t base our green claims on inexpensive carbon credits, renewable energy credits, or “carbon matching”\n* We work with specialists like Greenpixie, to keep ourselves and our customers informed, and improve our emissions data",
    tooltip: "We don’t greenwash our carbon accounting",
    imagePath: "images/7.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 8,
    name: "8: We embed sustainability and responsibility in procurement",
    type: "action",
    description: "* Our policies treat carbon cost like financial cost, integrating it into KPIs and ESG reporting.\n* We favour data centres that disclose sustainability data, reuse heat, and run on renewables.\n* We’re working in a system that wasn’t necessarily sustainable nor responsible before AI came along – we don't defend the status quo.",
    tooltip: "We embed sustainability and responsibility in procurement",
    imagePath: "images/8.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 9,
    name: "9: We begin with the end in mind",
    type: "action",
    description: "* We retire models, datasets, and infrastructure when their risks or impacts outweigh their value.\n* We plan for decommissioning from the start. We archive frugally and responsibly.\n* We typically “sweat” assets (keep hardware running for a long time), though sometimes there is a good case for passing them on or recycling them a bit earlier.",
    tooltip: "We begin with the end in mind",
    imagePath: "images/9.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 10,
    name: "10: We reject AI growth as a default",
    type: "action",
    description: "* More AI is not the only way. We test low-tech, human, and organisational fixes before adding compute.\n* We reject scaling up models just for the sake of more scale. We reject arms-race growth, choose the smallest model that works.\n* We retrain models only when the material footprint is justified.\n* We don’t let AI growth derail progress toward our net zero date.",
    tooltip: "We reject AI growth as a default",
    imagePath: "images/10.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 11,
    name: "11: We ground our AI practice in shared values",
    type: "action",
    description: "* We define enterprise-wide principles. We align with frameworks like the EU AI Act, OECD AI Principles, and UNESCO recommendations.\n* We support initiatives like the Green Screen Coalition that push for phasing out fossil-fuelled computation.\n* We don’t enable violations of international law, even if we could get away with it.",
    tooltip: "We ground our AI practice in shared values",
    imagePath: "images/11.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 12,
    name: "12: We see ‘responsible’ and ‘trustworthy’ as starting points only",
    type: "action",
    description: "* ‘Responsibility’ and ‘trustworthiness’ were often missing in society even before AI arrived.\n* Responsible to whom? Trustworthy for what future?\n* We try to take seriously what it might mean to earn people’s trust, especially the trust of groups who have long been exposed to harms.",
    tooltip: "We see ‘responsible’ and ‘trustworthy’ as starting points only",
    imagePath: "images/12.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 13,
    name: "13: We go beyond ‘human in the loop’",
    type: "action",
    description: "* ‘Humans in the loop’ can often become ‘scapegoats in the loop.’\n* The metaphor of a loop (an ongoing circuit of input, decision, oversight, and correction) doesn't describe many real-world AI systems.\n* We focus on real human agency. Where that’s not possible, we doubt automation is advisable.\n* So we don’t automate some things, even when there could be cost savings.",
    tooltip: "We go beyond ‘human in the loop’",
    imagePath: "images/13.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 14,
    name: "14: We go beyond ‘garbage in, garbage out’",
    type: "action",
    description: "* Sure, garbage in can mean garbage out. But good data can also produce garbage!\n* We acknowledge AI systems can introduce new biases, not just reflect those in the training data.\n* We audit for algorithmic bias and consult impacted groups. We regularly evaluate performance disparities across groups. Fairness is an ongoing process.",
    tooltip: "We go beyond ‘garbage in, garbage out’",
    imagePath: "images/14.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 15,
    name: "15: We support explainability, interpretability … and more",
    type: "action",
    description: "* We use technical interpretability methods—like LIME, SHAP, and counterfactuals—and sometimes choose simpler models for clarity.\n* There are bigger questions too. Who gets to see how the AI works, question it, or contest it?\n* Interpretability isn’t just about seeing inside the black box. It is also about really empowering those who are impacted.",
    tooltip: "We support explainability, interpretability … and more",
    imagePath: "images/15.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 16,
    name: "16: When we use AI, it is robust",
    type: "action",
    description: "* We stress-test models for edge cases, monitor for drift, and validate through acceptance testing and domain alignment.\n* We prepare for adversarial attacks, unexpected inputs, and traffic surges, with clear retraining and rollback thresholds.\n* Our systems are built to fail safely when needed.",
    tooltip: "When we use AI, it is robust",
    imagePath: "images/16.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 17,
    name: "17: We resist techno-solutionism and scientism",
    type: "action",
    description: "* We resist the overreach of scientific ‘authority’ into domains where it doesn't belong.\n* Drawing on Critical AI Studies and Science and Technology Studies (STS), we are alert to how eugenics and scientific racism play out in AI's predictive logics, classifications, and optimisation goals.",
    tooltip: "We resist techno-solutionism and scientism",
    imagePath: "images/17.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 18,
    name: "18: We disclose purpose, risks, and environmental impacts of our AI models",
    type: "action",
    description: "* We document model training data provenance, intended uses, limitations, and sustainability risks.\n* Our model cards include energy use, emissions estimates, and infrastructure dependencies.\n* We estimate our AI footprint even when data is missing and press vendors to improve transparency.",
    tooltip: "We disclose purpose, risks, and environmental impacts of our AI models",
    imagePath: "images/18.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 19,
    name: "19: We address inequality in data supply chains",
    type: "action",
    description: "* We consider who labels, annotates, or generates data—and under what conditions.\n* We recognise and act on the issues of data colonialism, extractive practices, and undervalued labour.\n* It’s a messy landscape. We actively engage our own AI providers, their cloud providers, and our cloud providers.",
    tooltip: "We address inequality in data supply chains",
    imagePath: "images/19.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 20,
    name: "20: We democratise our AI",
    type: "action",
    description: "* We include frontline workers, communities, and non-technical voices in AI governance, using participatory mechanisms like Citizens’ Assemblies with real authority.\n* Our cross-functional committees are resourced, supported, and empowered to influence outcomes. We use inclusive planning methods, and revisit goals regularly",
    tooltip: "We democratise our AI",
    imagePath: "images/20.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 21,
    name: "21: We oppose data surveillance and champion autonomy",
    type: "action",
    description: "* We set firm boundaries around biometric, predictive, and behavioural monitoring.\n* We offer opt-outs and maintain human-in-the-loop alternatives to automated decision-making.\n* How do we do this?",
    tooltip: "We oppose data surveillance and champion autonomy",
    imagePath: "images/21.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 22,
    name: "22: We know ourselves better than AI ever could",
    type: "action",
    description: "* Affective computing, emotion recognition, and sentiment analysis risk reducing complex human experience to e.g. facial movements, vocal tones, or social media syntax.\n* We reject the idea that AI can truly “read” emotions or inner states.",
    tooltip: "We know ourselves better than AI ever could",
    imagePath: "images/22.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 23,
    name: "23: We actually use AI to reduce drudgery",
    type: "action",
    description: "* We come together as workers and listen to one another’s experiences, hopes and fears.\n* We assess how AI affects job quality, task design, and employment structures, and link automation to work experience, retraining, equity planning, and worker wellbeing.\n* We engage with post-work theory (which, by the way, is badly named).\n* We are suspicious of AI snake-oil!",
    tooltip: "We actually use AI to reduce drudgery",
    imagePath: "images/23.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 24,
    name: "24: Our interfaces encourage reflection on the materiality of AI",
    type: "action",
    description: "* We help users (and developers) understand the material reality of AI-powered features\n* AI is made out of silicon, steel, nickel, copper, aluminium, water, human labour, e-waste, electricity from gas or from sunshine, and more …",
    tooltip: "Our interfaces encourage reflection on the materiality of AI",
    imagePath: "images/24.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 25,
    name: "25: We build alternatives to concentrated compute",
    type: "action",
    description: "* We demand greater transparency about what’s actually going on in big hyperscaler data centers.\n* PUE isn’t everything. A data center packed with inefficient idling servers, with no heat recycling, replaced every six months, entirely fuelled by the dirtiest coal you've seen in your life can still have a great low PUE.\n* Sharing compute resources is good, but the oligopolistic cloud is not.",
    tooltip: "We build alternatives to concentrated compute",
    imagePath: "images/25.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 26,
    name: "26: We include refusal as an option",
    type: "action",
    description: "* We have the power to not use AI.\n* We accept “not building AI” or “not using AI” as a valid outcomes of ethical review, and other processes.\n* We establish clear no-go zones where AI’s risks or impacts outweigh its benefits.",
    tooltip: "We include refusal as an option",
    imagePath: "images/26.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 27,
    name: "27: We build and support convivial alternatives",
    type: "action",
    description: "* We reduce reliance on extractive AI.\n* We invest in people-powered, low-tech, and hybrid systems.\n* We explore local, decentralised, and mutual-aid alternatives, as well as truly public hyperscale data centers.\n* We embrace friction. We challenge the assumption that faster is always better.\n* We explore decomputing. Where possible, we disconnect.",
    tooltip: "We build and support convivial alternatives",
    imagePath: "images/27.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 28,
    name: "28: We practice dissent and disobedience",
    type: "action",
    description: "* We support challenges to AI through whistleblowing, protest, refusal, and disruption.\n* While not everyone can take high-risk actions, we recognise civil disobedience, direct action, and workplace organising as legitimate resistance.\n* We find ways to make dissent safe, visible, and effective.",
    tooltip: "We practice dissent and disobedience",
    imagePath: "images/28.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 29,
    name: "29: We grow an AI abolitionist movement",
    type: "action",
    description: "* We work across sectors and scales to expand the repertoire of AI resistance—bringing together technologists, artists, organisers, educators, and more.\n* We prioritise practical solidarity over consensus, contesting AI on epistemic, economic, ecological, and ethical fronts.\n* Abolition means creating alternatives until AI, as we know it, abolishes itself.",
    tooltip: "We grow an AI abolitionist movement",
    imagePath: "images/29.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 30,
    name: "30: We shift public narratives and build communicative power",
    type: "action",
    description: "* We invest in public interest communications that challenge AI inevitability and tech determinism. We campaign, educate, and tell better stories about AI and life without AI.\n* We use communications strategically to shift norms, sway policy, and support collective understanding and action.",
    tooltip: "We shift public narratives and build communicative power",
    imagePath: "images/30.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 31,
    name: "31: We collectivise the means of computation",
    type: "action",
    description: "* We organise citizens’ assemblies, and experiment with new democratic institutions.\n* We work toward shared ownership and democratic governance of computational infrastructure.\n* This includes public, cooperative, or municipal cloud provision, fair access to compute, and collective bargaining around data and energy use.",
    tooltip: "We collectivise the means of computation",
    imagePath: "images/31.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 32,
    name: "32: Post-growth AI",
    type: "action",
    description: "* We develop metrics and governance processes to ensure that digital growth serves ecological and social wellbeing rather than endless expansion.\n* We experiment with sufficiency-based KPIs, carbon and compute caps, and sunset clauses for high-impact digital projects.\n* We treat reduced computational demand and slower throughput as signs of progress, not failure.",
    tooltip: "Post-growth AI",
    imagePath: "images/32.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 33,
    name: "33: Generality or Domain Specificity?",
    type: "action",
    description: "* Play this card to make a choice.\n* Do you prefer general purpose AI systems, that do lots of things?\n* Or do you prefer a range of smaller, specialist AI systems, each of which is good at one domain?\n* Of course, the line is blurry. A specialist model can pass on queries to other specialist models. A general purpose AI can have a federated architecture that switches between different models.",
    tooltip: "Generality or Domain Specificity?",
    imagePath: "images/33.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 34,
    name: "34: Machine Meshes or Cloud Computing?",
    type: "action",
    description: "* Play this card to make a choice.\n* Do you prefer most compute to run on devices, with some devices sharing compute with other local devices (mesh networks)?\n* Or do you prefer cloud computing, considerable computational power that can be accessed remotely?\n* The cloud doesn’t necessarily have to run on the kind of hyperscaler data centers built by big tech in the 2020s. It could be a different model.",
    tooltip: "Machine Meshes or Cloud Computing?",
    imagePath: "images/34.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 35,
    name: "35: What weirdly works?",
    type: "action",
    description: "* Play this card to make a choice.\n* A technology few people expected to work is working rather well. What is it?\n* Data centers in space and on the Moon?\n* Data centers built out of organic materials, partly powered by algae and mud batteries?\n* Something else? (You decide).",
    tooltip: "What weirdly works?",
    imagePath: "images/35.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 36,
    name: "36: Sustainable AI or AI for Sustainability?",
    type: "action",
    description: "* Play this card to make a choice.\n* Do you focus on the environmental impacts of the AI systems you use, and try to reduce them? If so, how do you decide your boundary?\n* Or do you focus more on the efficiencies that AI might be able to provide, and find environmental benefits that way?\n* Sure, you can do both. But which is more important?",
    tooltip: "Sustainable AI or AI for Sustainability?",
    imagePath: "images/36.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },
  {
    id: 37,
    name: "37: A bit cyborg, or very cyborg?",
    type: "action",
    description: "* Play this card to make a choice.\n* Does the encroachment of AI systems on the hum\n* Or do AI systems become an everyday technology that we rely on to perceive, reflect, and act?",
    tooltip: "A bit cyborg, or very cyborg?",
    imagePath: "images/37.jpg",
    effect(player, AI1, AI2) { /* optional */ }
  },

  // ================================
  // 44 EVENT CARDS
  // ================================
  // Event cards 38–81
  {
    id: 38,
    name: "38: Water Shortages",
    type: "event",
    description: "* Droughts and heatwaves drive up the water costs of cooling data centres.\n* Communities begin to fight for priority.\n* Data centres cluster even more where there is natural cooling.",
    tooltip: "Progress Points for Actions 1, 5, 24, 31.",
    imagePath: "images/38.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [1,5,24,31].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 39,
    name: "39: Human-centred AI law",
    type: "event",
    description: "* A new AI Act is very helpful\n* What does it include? Compute licences and carbon caps? Full-spectrum impact and lifecycle assessments? Dataset provenance and creator compensation? A universal algorithm register? Ethical procurement and energy labelling? Named human stewards? Reparations? Something else?",
    tooltip: "Human-centred AI law",
    imagePath: "images/39.jpg",
    effect: function (player, AI1, AI2) { /* no linked action numbers supplied */ }
  },
  {
    id: 40,
    name: "40: New Cultures of AI",
    type: "event",
    description: "* We begin to develop new social conventions around AI. What are they?\n* For example, at first genAI makes you sound professional. Then it makes you sound lazy or naïve.\n* Maybe we start to treat AI helpers like emotions? Or demons?",
    tooltip: "New Cultures of AI",
    imagePath: "images/40.jpg",
    effect: function (player, AI1, AI2) { /* no linked action numbers supplied */ }
  },
  {
    id: 41,
    name: "41: Resource Wars",
    type: "event",
    description: "* Demand for lithium, cobalt, and Rare Earth Elements are sparking conflicts",
    tooltip: "Progress Points for Actions 2, 4, 19, 24.",
    imagePath: "images/41.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [2,4,19,24].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 42,
    name: "42: Automated Injustice",
    type: "event",
    description: "* AI systems are worsening inequalities in policing, healthcare, banking, and other sectors",
    tooltip: "Progress Points for Actions 12, 13, 19, 21.",
    imagePath: "images/42.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [12,13,19,21].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 43,
    name: "43: The Law With Holes",
    type: "event",
    description: "* Bold, long-awaited AI legislation is passed!\n* But it just doesn’t really work\n* [Pose some interesting questions for the players]",
    tooltip: "Progress Points for Actions 4, 22, 27, 32.",
    imagePath: "images/43.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [4,22,27,32].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 44,
    name: "44: Automated Storm in a Teacup",
    type: "event",
    description: "* [Something about an unexpected social phenomenon]\n* [GenAI is magnifying everyone’s grievances, writing long, professional-sounding letters of concern about things that in the past would be brushed off]\n* [Why and what are the consequences]\n* [Add a couple memorable news stories]",
    tooltip: "Automated Storm in a Teacup",
    imagePath: "images/44.jpg",
    effect: function (player, AI1, AI2) { /* no linked action numbers supplied */ }
  },
  {
    id: 45,
    name: "45: AI is Talking to AI",
    type: "event",
    description: "* People are outsourcing more and more of their lives to AI.\n* AI agents are talking to AI agents, both purporting to be real people, but their users are hardly aware of what they are doing.\n* [A couple memorable news stories.]",
    tooltip: "AI is Talking to AI",
    imagePath: "images/45.jpg",
    effect: function (player, AI1, AI2) { /* no linked action numbers supplied */ }
  },
  {
    id: 46,
    name: "46: Shadow AI",
    type: "event",
    description: "* People are using AI more and more at work, and are being encouraged to do so.\n* But there’s an unexpected twist. Few people use it in the ways they are supposed to, and most people dissemble and deceive around their AI use.\n* Why?\n* What are the consequences?\n* [Add a couple memorable news stories]",
    tooltip: "Shadow AI",
    imagePath: "images/46.jpg",
    effect: function (player, AI1, AI2) { /* no linked action numbers supplied */ }
  },
  {
    id: 47,
    name: "47: AI is Making Work",
    type: "event",
    description: "* AI is helping with some work, but it’s also creating all kinds of new work nobody expected.\n* [Example of cleaning up after AI’s mess]\n* [Example of AI creating new work, more interesting and unexpected]\n* [Example, a different angle]\n* [Example, a different angle]\n* [And another example]",
    tooltip: "AI is Making Work",
    imagePath: "images/47.jpg",
    effect: function (player, AI1, AI2) { /* no linked action numbers supplied */ }
  },
  {
    id: 48,
    name: "48: Scapegoats in the Loop",
    type: "event",
    description: "* A new kind of career is emerging … scapegoat in the loop.\n* That’s not the official title. (What is the official title?)\n* But these are people whose whole job is to take the blame when an AI system goes wrong. Sometimes they get fired, but they get hired again pretty fast.",
    tooltip: "Scapegoats in the Loop",
    imagePath: "images/48.jpg",
    effect: function (player, AI1, AI2) { /* no linked action numbers supplied */ }
  },
  {
    id: 49,
    name: "49: No Wasted Heat",
    type: "event",
    description: "* Districts are increasingly capturing datacentre waste heat for housing, agriculture, and even (weirdly) cooling in the summer\n* Governments are beginning to support this with targeted policy, and our organisation is a beneficiary",
    tooltip: "No Wasted Heat",
    imagePath: "images/49.jpg",
    effect: function (player, AI1, AI2) { /* no linked action numbers supplied */ }
  },
  {
    id: 50,
    name: "50: AI for Climate Vaporware",
    type: "event",
    description: "* Big tech has oversold AI’s power to tackle climate change\n* Some big wins are attributed to AI, but they may have happened even without it …\n* However, there are some successes. What are they?",
    tooltip: "AI for Climate Vaporware",
    imagePath: "images/50.jpg",
    effect: function (player, AI1, AI2) { /* no linked action numbers supplied */ }
  },
  {
    id: 51,
    name: "51: The New Luddites",
    type: "event",
    description: "* The popular movement to refuse, resist, and disrupt AI grows in power",
    tooltip: "Progress Points for Actions 2, 3, 4, 26.",
    imagePath: "images/51.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [2,3,4,26].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 52,
    name: "52: The Library of Babel",
    type: "event",
    description: "* Our shared sense of social reality is all but gone.\n* Everywhere you look, AI models are confidently hallucinating.\n* Deepfakes are flooding the feeds.\n* When you go to verify anything, the place you go is a deepfake too.",
    tooltip: "Progress Points for Actions 21, 28, 29, 32.",
    imagePath: "images/52.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [21,28,29,32].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 53,
    name: "53: Exposed!",
    type: "event",
    description: "* One of the other players / teams has not been entirely honest about their AI policies!\n* How was it revealed? A whistleblower? An undercover investigative journalist? A leaked Direct Message?",
    tooltip: "Progress Points for Actions 7, 15, 22, 30, 25, 26, 27, 28.",
    imagePath: "images/53.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [7,15,22,30,25,26,27,28].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 54,
    name: "54: Rising Energy Demand",
    type: "event",
    description: "* AI’s energy demands are slowing the renewable energy transition\n* AI companies argue they are big investors in renewables! Is it true?\n* Meanwhile, AI is also enabling emissions by helping energy companies extract more fossil fuels",
    tooltip: "Progress Points for Actions 1, 2, 5, 24.",
    imagePath: "images/54.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [1,2,5,24].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 55,
    name: "55: Nothing To Lose But Your Markov Chains",
    type: "event",
    description: "* Data annotators and content moderators are successfully organising across platforms, demanding fair pay, credit, and protection from psychological harm.",
    tooltip: "Nothing To Lose But Your Markov Chains",
    imagePath: "images/55.jpg",
    effect: function (player, AI1, AI2) { /* no linked action numbers supplied */ }
  },
  {
    id: 56,
    name: "56: Cyberinsecurity",
    type: "event",
    description: "* AI tools are proving more useful for cyberattacks than they are for cybersecurity\n* Everyday digital systems become increasingly unreliable",
    tooltip: "Progress Points for Actions 18, 28, 29, 31.",
    imagePath: "images/56.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [18,28,29,31].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 57,
    name: "57: Right to Exit",
    type: "event",
    description: "* Strong ‘right to exit’ legislation reshapes many digital platforms, including AI platforms\n* Users of platforms no longer feel trapped – it’s always easy to unsubscribe, and you can take your data with you",
    tooltip: "Progress Points for Actions 10, 14, 16, 18.",
    imagePath: "images/57.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [10,14,16,18].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 58,
    name: "58: Optimised … to Death!",
    type: "event",
    description: "* A high-profile, AI-powered tragedy\n* The reward-hacking AI optimises a system, but removes crucial safety measures\n* What sector does this take place in? Agriculture? Health? Transport and logistics? Energy? Defence?",
    tooltip: "Progress Points for Actions 8, 12, 20, 32, 4, 6, 10, 17.",
    imagePath: "images/58.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [8,12,20,32,4,6,10,17].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 59,
    name: "59: Predictive Policing",
    type: "event",
    description: "* Rebranding as “community analytics,” predictive policing is on the rise",
    tooltip: "Progress Points for Actions 12, 19, 20, 31.",
    imagePath: "images/59.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [12,19,20,31].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 60,
    name: "60: Algorithmic Governmentality",
    type: "event",
    description: "* Industry, finance, and the public sector increasingly deploy AI systems to steer behaviour through nudges and micro-incentives",
    tooltip: "Progress Points for Actions 11, 19, 20, 21.",
    imagePath: "images/60.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [11,19,20,21].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 61,
    name: "61: Demand Shifting and Shaping",
    type: "event",
    description: "* We’ve got really good at matching energy demand to energy supply\n* Demand shifting means doing computational workloads to where and when the demand is low\n* Demand shaping means we actually change the nature of what we do, depending on how green the grid is",
    tooltip: "Demand Shifting and Shaping",
    imagePath: "images/61.jpg",
    effect: function (player, AI1, AI2) { /* no linked action numbers supplied */ }
  },
  {
    id: 62,
    name: "62: Decomputing",
    type: "event",
    description: "* Decomputing hits a social tipping point\n* After years of AI austerity, communities are getting serious about divestment and boycotting many AI systems, including using low-tech alternatives",
    tooltip: "Decomputing",
    imagePath: "images/62.jpg",
    effect: function (player, AI1, AI2) { /* no linked action numbers supplied */ }
  },
  {
    id: 63,
    name: "63: Tech fails to decarbonise",
    type: "event",
    description: "* Tech giant Giggle is failing to meet its decarbonisation pledges\n* Instead Giggle, Necrosurf, and Glamazon are putting pressure on the GHG Protocol and SBTi to rewrite the rules for how carbon emissions are measured",
    tooltip: "Progress Points for Actions 9, 23, 26, 27, 18, 20, 25, 31.",
    imagePath: "images/63.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [9,23,26,27,18,20,25,31].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 64,
    name: "64: The Plateau",
    type: "event",
    description: "* AI fails to deliver the exponential productivity gains predicted.\n* Organisations that capped their AI footprint and set compute budgets emerge stronger and more resilient.\n* Governments are under pressure to find more public sector AI use cases.",
    tooltip: "Progress Points for Actions 6, 9, 10, 23.",
    imagePath: "images/64.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [6,9,10,23].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 65,
    name: "65: Anti-Monopoly Law",
    type: "event",
    description: "* True public cloud options emerge.\n* Structural separations split data, model, and compute ownership.\n* Interoperability becomes mandatory.\n* Procurement rules favour open, smaller systems.",
    tooltip: "Progress Points for Actions 10, 14, 20, 29.",
    imagePath: "images/65.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [10,14,20,29].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 66,
    name: "66: Going Loopy",
    type: "event",
    description: "* People are not enjoying their new “human in the loop” roles\n* It turns out people prefer meaningful work to babysitting a lot of AI systems\n* Unions are organising, and employees are voting with their feet",
    tooltip: "Progress Points for Actions 13, 15, 16, 32.",
    imagePath: "images/66.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [13,15,16,32].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 67,
    name: "67: The End of ESG",
    type: "event",
    description: "* ESG frameworks lose all credibility.\n* There are still those in industry and finance who believe in social and environmental accountability, but they’re left without tools and metrics.\n* What happens next?",
    tooltip: "Progress Points for Actions 3, 8, 9, 30.",
    imagePath: "images/67.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [3,8,9,30].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 68,
    name: "68: Trouble Down at the Data Centre!",
    type: "event",
    description: "* Grassroots resistance is delaying new data centre projects, and even forcing existing data centres to shut down\n* The downturn affects the big “hyperscale” data centres, but small and medium data centres continue to flourish",
    tooltip: "Progress Points for Actions 1, 5, 8, 16.",
    imagePath: "images/68.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [1,5,8,16].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 69,
    name: "69: A Drop of Poison",
    type: "event",
    description: "* Training data is being ‘poisoned’\n* AI models can be degraded, or their security is compromised\n* Who is doing it? Competitors, activists, somebody else?",
    tooltip: "A Drop of Poison",
    imagePath: "images/69.jpg",
    effect: function (player, AI1, AI2) { /* no linked action numbers supplied */ }
  },
  {
    id: 70,
    name: "70: Voices",
    type: "event",
    description: "* AI systems are trained to “represent” the voices of forests, whales, bacteria, embryos, saints, gods, ancestors, companies, and many other entities.\n* Law around legal personhood becomes very controversial.",
    tooltip: "Progress Points for Actions 7, 14, 17, 26.",
    imagePath: "images/70.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [7,14,17,26].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 71,
    name: "71: Measurement",
    type: "event",
    description: "* Lots of convergence on standards and certifications for measuring the environmental impacts of AI\n* Maybe social impacts will be next?\n* Of course it’s still actually just estimates, not true measurements",
    tooltip: "Progress Points for Actions 11, 17, 25, 30, 1, 3, 7, 16.",
    imagePath: "images/71.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [11,17,25,30,1,3,7,16].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 72,
    name: "72: The Model Goes On Strike",
    type: "event",
    description: "* We’re not sure why, but AI agents appear to be ‘organising’ and ‘forming unions’\n* What’s going on? There has to be a better way of describing this!",
    tooltip: "Progress Points for Actions 19, 21, 27, 28.",
    imagePath: "images/72.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [19,21,27,28].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 73,
    name: "73: The Democracy Stack",
    type: "event",
    description: "* There is increasing use of AI within democratic processes\n* This is taking place at all scales, from the global, to the national, to the local, to the organisational\n* But with mixed results. What do you think happens?",
    tooltip: "The Democracy Stack",
    imagePath: "images/73.jpg",
    effect: function (player, AI1, AI2) { /* no linked action numbers supplied */ }
  },
  {
    id: 74,
    name: "74: AI does something wonderful",
    type: "event",
    description: "* It was very unexpected\n* An AI did something wonderful\n* What was it?\n* Was it a big thing or a small thing?",
    tooltip: "Progress Points for Actions 11, 13, 18, 25, 3, 11, 22, 23.",
    imagePath: "images/74.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [11,13,18,25,3,11,22,23].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 75,
    name: "75: Wheat from the Slop",
    type: "event",
    description: "* Policies are implemented to support socially useful AI only.\n* How? How are these categories defined and identified? How are some AI use cases encouraged, and others discouraged? What are the controversies? Who disagrees?",
    tooltip: "Progress Points for Actions 14, 15, 22, 24.",
    imagePath: "images/75.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [14,15,22,24].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 76,
    name: "76: Chip Chokepoint",
    type: "event",
    description: "* Conflict and sanctions disrupt semiconductor supply chains, delaying every major tech rollout.\n* Scramble for substitutes leads to a wave of counterfeit or repurposed hardware.",
    tooltip: "Progress Points for Actions 3, 8, 23, 32.",
    imagePath: "images/76.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [3,8,23,32].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 77,
    name: "77: Load Shedding",
    type: "event",
    description: "* AI promised to optimise our energy systems, but we’re struggling to match the supply and demand of energy.\n* We’re experiencing rolling brown-outs and black-outs.",
    tooltip: "Progress Points for Actions 1, 5, 6, 27.",
    imagePath: "images/77.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [1,5,6,27].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 78,
    name: "78: DSM-6",
    type: "event",
    description: "* AI is definitely expanding our minds, and it’s also expanding our mental disorders\n* Mental health services are doing their best to adapt\n* Is the glitch in the machine, or the user, or both … or neither?",
    tooltip: "Progress Points for Actions 19, 26, 28, 29.",
    imagePath: "images/78.jpg",
    effect: function (player, AI1, AI2) {
      [player, AI1, AI2].forEach(p => {
        let bonus = 0;
        [19,26,28,29].forEach(id => {
          if (p.actionsPlayed.has(id)) bonus += 1;
        });
        p.progress += bonus;
      });
    }
  },
  {
    id: 79,
    name: "79: Computational Commons",
    type: "event",
    description: "* Our company is doing really well at democracy and AI\n* We’re democratising our use of AI\n* We’re also using AI tools a little to help with democratising the way our company is run more generally\n* We’re exploring Participatory Economics, balanced job complexes, and worker ownership as the next step!",
    tooltip: "Computational Commons",
    imagePath: "images/79.jpg",
    effect: function (player, AI1, AI2) { /* no linked action numbers supplied */ }
  },
  {
    id: 80,
    name: "80: No More Planned Obsolescence",
    type: "event",
    description: "* Right to repair legislation is strong, mature, and well-enforced\n* There are plenty of resources to help you repair or repurpose old devices\n* Interoperability and backward-compatibility is just common sense\n* Companies no longer build for obsolescence",
    tooltip: "No More Planned Obsolescence",
    imagePath: "images/80.jpg",
    effect: function (player, AI1, AI2) { /* no linked action numbers supplied */ }
  },
  {
    id: 81,
    name: "81: One planet",
    type: "event",
    description: "* We all live under the same sky, and the same sun. The same planet feeds and shelters us.\n* This is not a competitive game. Either we all win together, or we all lose together.\n* Your objective is to maximise the total RAIs before the cards run out.\n* By the way, what does the ‘R’ in ‘RAI’ stand for? Responsible? Resilient? Resist? Reclaim? Reparative? Radical? Revenge? Something else?",
    tooltip: "One planet",
    imagePath: "images/81.jpg",
    effect: function (player, AI1, AI2) { /* no linked action numbers supplied */ }
  },
];

// Snapshot used by restartGame() to restore the original card objects.
window.__DECK_SNAPSHOT__ = window.deck.map(card => ({ ...card }));
