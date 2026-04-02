const desktop = document.getElementById("desktop-canvas");
const desktopIcons = document.getElementById("desktop-icons");
const taskbarButtons = document.querySelectorAll(".taskbar-button[data-app]");
const cursorGlow = document.getElementById("cursor-glow");
const body = document.body;
const tabletHub = document.getElementById("tablet-hub");
const tabletAppGrid = document.getElementById("tablet-app-grid");
const tabletDock = document.getElementById("tablet-dock");
const mobileHub = document.getElementById("mobile-hub");
const mobileAppGrid = document.getElementById("mobile-app-grid");
const mobileDock = document.getElementById("mobile-dock");
const studioScene = document.getElementById("studio-scene");
const desktopShell = document.getElementById("desktop-shell");
const systemSurface = document.getElementById("system-surface");
const oceanIllustration = document.querySelector(".ocean-illustration");
const customFishLayer = document.getElementById("custom-fish-layer");
const fishStudioPanel = document.getElementById("fish-studio-panel");
const fishStudioDesktopSlot = document.getElementById("fish-studio-desktop-slot");
const fishDesignerCanvas = document.getElementById("fish-designer-canvas");
const fishPresetRow = document.getElementById("fish-preset-row");
const fishNameInput = document.getElementById("fish-name-input");
const saveFishButton = document.getElementById("save-fish-button");
const oceanAudioToggle = document.getElementById("ocean-audio-toggle");
const oceanAudioStatus = document.getElementById("ocean-audio-status");
const sceneScreenOverlay = document.getElementById("scene-screen-overlay");
const scenePanelCard = document.getElementById("scene-panel-card");
const scenePanelContent = document.getElementById("scene-panel-content");
const scenePanelClose = document.getElementById("scene-panel-close");
const entryLayer = document.getElementById("entry-layer");
const entryWindow = document.getElementById("entry-window");
const entryContent = document.getElementById("entry-content");
const residentMascot = document.getElementById("resident-mascot");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const profile = {
  name: "Sweety Agarwal",
  firstName: "Sweety",
  role: "Interaction and Visual Designer",
  location: "Chhatarpur, India",
  phone: "+91 8920183531",
  email: "sagarwa130ct2004@gmail.com",
  behanceUrl: "https://www.behance.net/sweetyagarwal5",
  linkedinUrl: "",
  instagramUrl: "",
  resumeUrl: "file:///C:/Users/sweet/Downloads/Resume_SweetyAgarwal.pdf",
  profileImage: "https://pps.services.adobe.com/api/profile/90A51F5764BF70F70A495C36@65532a2e63c0a029495ea7.e/image/05bfb27a-6ff1-46e8-b8dc-bf4c6f96208b/276"
};

const defaultEmailSubject = `Portfolio inquiry for ${profile.name}`;
const defaultEmailMessage = `Hi ${profile.firstName}, I'd love to discuss a project around UX/UI, branding, packaging, or visual storytelling.`;

const desktopApps = [
  { id: "projects", label: "Works", subtitle: "All projects", icon: "&#xE8B7;" },
  { id: "gallery", label: "Gallery", subtitle: "Photography archive", icon: "&#xE91B;" },
  { id: "resume", label: "Resume", subtitle: "Education + work", icon: "&#xE8A5;" },
  { id: "skills", label: "Skills", subtitle: "Tools + practice", icon: "&#xE713;" },
  { id: "about", label: "About", subtitle: "Journey + approach", icon: "&#xE77B;" },
  { id: "contact", label: "Contact", subtitle: "Say hello", icon: "&#xE8A8;" }
];

const adaptiveDockApps = ["home", "projects", "gallery", "resume", "contact"];
const featuredAdaptiveProjects = ["digital-library", "nammamove", "aera", "kanpeki"];
const fishStorageKey = "sweety-ocean-fish-v5";
const legacyFishStorageKeys = ["sweety-ocean-fish-v2", "sweety-ocean-fish-v3", "sweety-ocean-fish-v4"];
const fishMonthlyLimit = 4;
const fishCanvasSize = { width: 360, height: 220 };
const fishPresetThumbnailSize = { width: 248, height: 160 };
const fishPresetAssets = window.fishPresetAssets || {};
const oceanAmbienceStorageKey = "sweety-ocean-ambience-muted";
const oceanAmbienceMaxGain = 0.2;
const fishPresets = [
  {
    id: "golden-bloom",
    label: "Golden Bloom",
    starterName: "Bloom",
    assetKey: "golden-bloom",
    accent: "#f2c93e"
  },
  {
    id: "ember-glide",
    label: "Ember Glide",
    starterName: "Ember",
    assetKey: "ember-glide",
    accent: "#ff7a37"
  },
  {
    id: "cobalt-drift",
    label: "Cobalt Drift",
    starterName: "Cobalt",
    assetKey: "cobalt-drift",
    accent: "#6b83d6"
  },
  {
    id: "midnight-banner",
    label: "Midnight Banner",
    starterName: "Banner",
    assetKey: "midnight-banner",
    accent: "#4b5f97"
  },
  {
    id: "ink-darter",
    label: "Ink Darter",
    starterName: "Inkie",
    assetKey: "ink-darter",
    accent: "#425d9e"
  },
  {
    id: "pearl-sail",
    label: "Pearl Sail",
    starterName: "Pearl",
    assetKey: "pearl-sail",
    accent: "#9ec9ea"
  },
  {
    id: "seafoam-wisp",
    label: "Seafoam Wisp",
    starterName: "Wisp",
    assetKey: "seafoam-wisp",
    accent: "#99dce2"
  },
  {
    id: "lagoon-ribbon",
    label: "Lagoon Ribbon",
    starterName: "Ribbon",
    assetKey: "lagoon-ribbon",
    accent: "#8fb7c8"
  },
  {
    id: "tangerine-flicker",
    label: "Tangerine Flicker",
    starterName: "Flicker",
    assetKey: "tangerine-flicker",
    accent: "#ff9800"
  },
  {
    id: "ruby-petal",
    label: "Ruby Petal",
    starterName: "Ruby",
    assetKey: "ruby-petal",
    accent: "#c8465a"
  }
];
const fishAssetCache = new Map();
const fishBrushPalette = [
  "#fff4cf",
  "#ff9a76",
  "#ffd968",
  "#85f5d6",
  "#8ad0ff",
  "#c6b3ff",
  "#182b4d"
];
const fishStudioState = {
  presetId: fishPresets[0].id,
  brushColor: fishBrushPalette[0],
  brushSize: 7,
  strokes: [],
  activeStroke: null,
  activePointerId: null,
  savedFish: []
};
const oceanAmbienceState = {
  enabled: true,
  hasStarted: false,
  masterGain: null
};
const cursorState = {
  currentX: window.innerWidth / 2,
  currentY: window.innerHeight / 2,
  targetX: window.innerWidth / 2,
  targetY: window.innerHeight / 2,
  frameId: 0,
  initialized: false
};

const projectData = [
  {
    id: "digital-library",
    desktopLabel: "Digital Library",
    title: "A Digital Library | UX/UI Case Study",
    category: "UX/UI Case Study",
    coverImage: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/5504e4242231863.6968b9b0aae27.jpg",
    detailImages: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/051be9242231863.Y3JvcCwzODM1LDMwMDAsODUsMA.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/5504e4242231863.6968b9b0aae27.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/f4ec43242231863.6968b9b0a5997.jpg"
    ],
    url: "https://www.behance.net/gallery/242231863/A-Digital-Library-UXUI-Case-Study",
    overview: "A digital product case study focused on making online reading feel more discoverable, accessible, and calm for modern users.",
    challenge: "The design problem was to make search, browsing, and reading flow more intuitive without losing depth or content richness.",
    process: "The project moves through user research, problem framing, information architecture, wireframes, and interface exploration to shape a clearer reading journey.",
    outcome: "The final concept presents a more legible, user-centered system that supports exploration and turns the digital library into a more welcoming product.",
    tools: ["UX design", "UI design", "Research", "Information architecture", "Wireframing", "Figma"]
  },
  {
    id: "nammamove",
    desktopLabel: "NammaMove",
    title: "NammaMove - Local Fitness Made Easy",
    category: "Mobile UX",
    coverImage: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/9d5070246228971.69c004b11dc6f.jpg",
    detailImages: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/462614246228971.Y3JvcCwxMzgwLDEwODAsNTM2LDA.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/9d5070246228971.69c004b11dc6f.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/7b0011246228971.69c004b1217db.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/44fc27246228971.69c004b120f92.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/90c03e246228971.69c004b122049.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/2b6d81246228971.69c004b122f58.jpg"
    ],
    url: "https://www.behance.net/gallery/246228971/NammaMove-Local-Fitness-Made-Easy",
    overview: "A location-aware fitness experience designed to help people in Bengaluru move smoothly from wanting to work out to actually booking an activity nearby.",
    challenge: "The goal was to reduce the friction of comparing formats, locations, and timings before the user has even committed to moving.",
    process: "The concept uses personalized onboarding, location-based recommendations, and a straightforward home flow to turn a vague intent into a clear next step.",
    outcome: "The product direction makes local wellness feel more approachable by surfacing relevant choices faster and simplifying the booking path.",
    tools: ["Mobile UX", "Service discovery", "Onboarding", "Interaction design", "Prototyping"]
  },
  {
    id: "aera",
    desktopLabel: "AERA",
    title: "AERA - Decoding Personal Scent Chemistry",
    category: "Speculative UX",
    coverImage: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/dc9a3a245917491.69b84e95901c7.png",
    detailImages: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/76885c245917491.Y3JvcCw4MTMsNjM2LDU4NSwzOA.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/dc9a3a245917491.69b84e95901c7.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/923708245917491.69b84e95906f7.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/26a2d4245917491.69b854f9db356.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/7ac3ea245917491.69b854f9da2f7.png"
    ],
    url: "https://www.behance.net/gallery/245917491/AERA-Decoding-Personal-Scent-Chemistry",
    overview: "A speculative product and interface concept created during FigBuild 2026 to make the invisible relationship between scent and body chemistry feel legible.",
    challenge: "Fragrance reacts differently on every person, yet the experience of choosing scent rarely explains why that happens.",
    process: "AERA combines sensor-led thinking, AI interpretation, and a mobile interface direction wrapped in an art nouveau-inspired visual language.",
    outcome: "The result is a narrative-rich UX concept that feels both futuristic and personal, translating chemistry into a tangible design experience.",
    tools: ["Speculative design", "UX concepting", "Sensor storytelling", "AI experience", "Visual language"]
  },
  {
    id: "kanpeki",
    desktopLabel: "Kanpeki",
    title: "Kanpeki: Packaging Redesign",
    category: "Packaging Design",
    coverImage: "https://mir-s3-cdn-cf.behance.net/project_modules/max_632/96242d242374529.696bac38ca13e.jpg",
    detailImages: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/cbd411242374529.Y3JvcCwyNTAwLDE5NTUsMCwxMjM.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_632/96242d242374529.696bac38ca13e.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/dd4eec242374529.696bac38ca7b3.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/5bd32d242374529.696bac38cb078.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/f45da3242374529.696bac38c9ab9.jpg"
    ],
    url: "https://www.behance.net/gallery/242374529/Kanpeki-Packaging-Redesign",
    overview: "A packaging refresh that focuses on clarity, shelf impact, and a more premium brand experience while keeping the original skincare identity recognizable.",
    challenge: "The system needed to feel easier to understand at a glance while still preserving the cues users already associate with the brand.",
    process: "The redesign sharpens hierarchy, improves usability, and refines the visual balance of form, typography, and pack presence.",
    outcome: "The concept gives the brand a cleaner package family that feels more confident in retail and more intuitive in use.",
    tools: ["Packaging design", "Brand refresh", "Hierarchy", "Adobe Illustrator", "Visual merchandising"]
  },
  {
    id: "awake-not-aware",
    desktopLabel: "Awake, Not Aware",
    title: "Awake, But Not Aware: Sleep Deprivation",
    category: "Information Design",
    coverImage: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/a92be8242373443.696ba6a19c1df.jpg",
    detailImages: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/834320242373443.Y3JvcCw0NDg0LDM1MDcsMjMzLDA.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/a92be8242373443.696ba6a19c1df.jpg"
    ],
    url: "https://www.behance.net/gallery/242373443/Awake-But-Not-Aware-Sleep-Deprivation",
    overview: "An information-led visual narrative that turns research on sleep deprivation into a clearer and more emotionally readable story.",
    challenge: "Sleep deprivation is deeply common but often hard to visualize, so the brief was to turn technical insight into communication people can grasp quickly.",
    process: "The project uses data hierarchy, pacing, and graphic contrast to organize research into digestible and memorable visual moments.",
    outcome: "The final piece makes an invisible issue feel immediate and relatable through structured storytelling rather than information overload.",
    tools: ["Infographics", "Data storytelling", "Information hierarchy", "Editorial pacing", "Visual communication"]
  },
  {
    id: "olympic-pictograms",
    desktopLabel: "Olympic Pictograms",
    title: "Olympic Pictograms Form Language",
    category: "Visual System",
    coverImage: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/97d246235973919.68e29ff2c97bf.jpg",
    detailImages: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/8469a1235973919.Y3JvcCwxMjAwLDkzOCwwLDEzMA.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/hd/97d246235973919.68e29ff2c97bf.jpg"
    ],
    url: "https://www.behance.net/gallery/235973919/Olympic-Pictograms-Form-Language",
    overview: "A symbol system study that explores how Olympic pictograms can feel both instantly legible and visibly connected through one formal language.",
    challenge: "Sports icons need clarity at speed, but they also need to work as a family with shared rhythm and proportions.",
    process: "The system is shaped through geometric reduction, controlled proportions, and a focus on movement cues across different sports.",
    outcome: "The result is a coherent set of pictograms that reads quickly while still carrying a distinct visual personality.",
    tools: ["Visual systems", "Pictogram design", "Adobe Illustrator", "Form studies", "Consistency rules"]
  },
  {
    id: "pictorial-roast",
    desktopLabel: "Pictorial Roast",
    title: "The Pictorial Roast",
    category: "Data Storytelling",
    coverImage: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/282029235977609.68e2b17087f07.jpg",
    detailImages: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/ce8090235977609.Y3JvcCw5MDIsNzA1LDExNDgsNTQ3.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/282029235977609.68e2b17087f07.jpg"
    ],
    url: "https://www.behance.net/gallery/235977609/The-Pictorial-Roast",
    overview: "A coffee-themed visual story that uses pictorial graphs and illustration to make information feel warmer, more engaging, and easier to retain.",
    challenge: "The piece looks for a way to keep information readable while making the data feel more expressive and inviting.",
    process: "The design leans on pictorial graph construction, visual rhythm, and a more playful editorial approach to data.",
    outcome: "The final composition shows how numbers can stay readable while gaining tone, personality, and narrative flow.",
    tools: ["Data visualization", "Illustration", "Pictorial graphs", "Graphic design", "Excel"]
  },
  {
    id: "book-cover",
    desktopLabel: "Book Cover",
    title: "Book Cover Jacket Redesign",
    category: "Editorial Design",
    coverImage: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/acd7b8235974269.68e2a1a3623b0.jpg",
    detailImages: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/57086e235974269.Y3JvcCwzNzc1LDI5NTMsMTg2LDA.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/acd7b8235974269.68e2a1a3623b0.jpg"
    ],
    url: "https://www.behance.net/gallery/235974269/Book-Cover-Jacket-Redesign",
    overview: "An editorial redesign that treats the book jacket as a contemporary storytelling surface rather than just a protective wrapper.",
    challenge: "The brief was to reframe a familiar title with a stronger visual voice while preserving the emotional atmosphere of the original narrative.",
    process: "Typography, illustration, and art direction come together to test tone, composition, and narrative emphasis on the cover.",
    outcome: "The redesigned jacket feels more concept-driven and memorable, building a sharper editorial identity around the book.",
    tools: ["Editorial design", "Typography", "Illustration", "Adobe Photoshop", "Adobe Illustrator"]
  },
  {
    id: "little-match-girl",
    desktopLabel: "Little Match Girl",
    title: "A Booklet Reimagining \"The Little Match Girl\"",
    category: "Narrative Editorial",
    coverImage: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/5aa34f235974591.68e2a33317d17.jpg",
    detailImages: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/308579235974591.Y3JvcCwxMjcwLDk5NCw2Niww.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/5aa34f235974591.68e2a33317d17.jpg"
    ],
    url: "https://www.behance.net/gallery/235974591/A-Booklet-Reimagining-The-Little-Match-Girl",
    overview: "A booklet concept that retells a familiar story through illustration, pacing, and a more tactile editorial structure.",
    challenge: "The aim was to keep the emotional weight of the story intact while translating it into a sequence that feels visually intimate and immersive.",
    process: "The piece combines illustration, typography, and page rhythm to move the reader through the narrative with more atmosphere.",
    outcome: "The final booklet turns a literary retelling into a designed reading experience with stronger visual continuity and mood.",
    tools: ["Booklet design", "Illustration", "Editorial storytelling", "Adobe Creative Cloud", "Procreate"]
  },
  {
    id: "design-in-action",
    desktopLabel: "Design in Action",
    title: "Design in Action: From Concept to Outcome",
    category: "Campaign Process",
    coverImage: "https://mir-s3-cdn-cf.behance.net/projects/max_808/bb5c92235972663.Y3JvcCwyMTk5LDE3MjAsMTc0LDc4OQ.jpg",
    detailImages: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/bb5c92235972663.Y3JvcCwyMTk5LDE3MjAsMTc0LDc4OQ.jpg",
      "https://mir-s3-cdn-cf.behance.net/projects/max_808/bb5c92235972663.Y3JvcCwyMTk5LDE3MjAsMTc0LDc4OQ.jpg"
    ],
    url: "https://www.behance.net/gallery/235972663/Design-in-Action-From-Concept-to-Outcome",
    overview: "A process-driven project that traces how an idea develops into a more complete graphic and advertising outcome.",
    challenge: "The focus was not just on the final visual but on showing how concept, iteration, and hand-led exploration shape the result.",
    process: "The work combines illustration, graphic composition, and campaign thinking to make development itself part of the story.",
    outcome: "It reads as both a finished visual piece and a reflection on how design decisions evolve from sketch to delivery.",
    tools: ["Graphic design", "Advertising", "Illustration", "Adobe InDesign", "Adobe Photoshop", "Adobe Illustrator"]
  },
  {
    id: "abstracting-nature",
    desktopLabel: "Abstracting Nature",
    title: "Abstracting Nature",
    category: "Graphic Exploration",
    coverImage: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/36eb77235973315.68e29d35300a4.jpg",
    detailImages: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/87cc08235973315.Y3JvcCwxMjAwLDkzOCwwLDEzMA.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/hd/36eb77235973315.68e29d35300a4.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/69fbf8235973315.68e29d352e4a2.jpg"
    ],
    url: "https://www.behance.net/gallery/235973315/Abstracting-Nature",
    overview: "A visual exploration that studies how natural forms can be observed, simplified, and translated into more abstract graphic compositions.",
    challenge: "The design task was to reduce the complexity of nature without losing the energy and character of the original forms.",
    process: "The work moves from observation to reduction, using illustration and composition to test balance, rhythm, and pattern.",
    outcome: "The resulting series feels organic yet controlled, showing how abstraction can still retain a strong sense of source material.",
    tools: ["Graphic design", "Illustration", "Abstraction", "Form studies", "Composition"]
  },
  {
    id: "environment-design",
    desktopLabel: "Environment Design",
    title: "Environment Design",
    category: "Illustration",
    coverImage: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/4d8fd2200178043.665e3e171ed07.jpg",
    detailImages: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/543879200178043.Y3JvcCwyMTAwLDE2NDIsMCwzMDE.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/4d8fd2200178043.665e3e171ed07.jpg"
    ],
    url: "https://www.behance.net/gallery/200178043/Environment-Design",
    overview: "An illustration-led environment study built through drawing, sketching, and hand-rendered spatial exploration.",
    challenge: "The project looks at how mood and place can be communicated through composition and drawing without relying on heavy narrative text.",
    process: "Hand sketching and iterative environment building are used to shape depth, texture, and a believable sense of setting.",
    outcome: "The final visuals highlight a strong drawing foundation and an ability to build atmosphere through spatial illustration.",
    tools: ["Drawing", "Illustration", "Sketching", "Hand rendering", "Environment building"]
  },
  {
    id: "becoming-me",
    desktopLabel: "Art of Becoming Me",
    title: "The Art of Becoming Me",
    category: "Personal Narrative",
    coverImage: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/e5e2ce246229813.69c00a091f60f.jpg",
    detailImages: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/75a6ad246229813.Y3JvcCwzMTcwLDI0ODAsMTY0LDA.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/e5e2ce246229813.69c00a091f60f.jpg"
    ],
    url: "https://www.behance.net/gallery/246229813/The-Art-of-Becoming-Me",
    overview: "A visual timeline of personal growth that maps the journey from curiosity to a more conscious, systems-led design practice.",
    challenge: "The brief was inward-facing: how do you represent your own evolution in a way that feels honest, visual, and structured?",
    process: "The project turns milestones, shifts in mindset, and personal reflection into a designed narrative sequence.",
    outcome: "It becomes a self-portrait through design, showing how different phases of learning shaped a more intentional creative voice.",
    tools: ["Narrative design", "Reflection", "Timeline thinking", "Systems perspective", "Visual storytelling"]
  }
];

const photographyArchive = [
  {
    id: "img-1938",
    title: "Front-Facing Gold",
    category: "Studio portrait",
    image: "gallery-source/IMG_1938.JPG",
    description: "A direct portrait built around eye contact, warm low-key lighting, and the sharp glint of jewelry against the darker set."
  },
  {
    id: "img-1927",
    title: "Velvet Profile",
    category: "Studio portrait",
    image: "gallery-source/IMG_1927.JPG",
    description: "A side-lit seated portrait where the black drape and negative space make the posture feel sculptural and poised."
  },
  {
    id: "img-1928",
    title: "Scarlet Recline",
    category: "Draped portrait",
    image: "gallery-source/IMG_1928.JPG",
    description: "A reclining frame where layered red textiles and soft falloff light turn the scene into something theatrical and intimate."
  },
  {
    id: "img-1931",
    title: "Afterglow on Red",
    category: "Low-angle portrait",
    image: "gallery-source/IMG_1931.JPG",
    description: "A floor-level portrait that lets the red fabric pool around the subject while the gaze anchors the image."
  },
  {
    id: "img-1937",
    title: "Half-Hidden Light",
    category: "Close crop",
    image: "gallery-source/IMG_1937.JPG",
    description: "A tighter portrait where the hand partly veils the face and the lighting shifts attention to gesture and jewelry."
  },
  {
    id: "img-1939",
    title: "Crimson Wrap",
    category: "Textile portrait",
    image: "gallery-source/IMG_1939.JPG",
    description: "A shoulder-led portrait where the red cloth acts like both garment and backdrop, tightening the frame around the face."
  },
  {
    id: "img-1940",
    title: "Folded Pose",
    category: "Seated portrait",
    image: "gallery-source/IMG_1940.JPG",
    description: "An intimate seated composition that uses crossed arms, jewelry, and fabric folds to create a more reflective silhouette."
  },
  {
    id: "img-1944",
    title: "Silver Statement",
    category: "Close portrait",
    image: "gallery-source/IMG_1944.JPG",
    description: "A close-up that lets the large earring, sharp eye contact, and dark background carry the whole frame."
  },
  {
    id: "img-1963",
    title: "Motion in Red",
    category: "Movement study",
    image: "gallery-source/IMG_1963.JPG",
    description: "A movement-led image where the swing of the skirt becomes the main line of energy in the composition."
  },
  {
    id: "img-1973",
    title: "Turning Frame",
    category: "Movement study",
    image: "gallery-source/IMG_1973.JPG",
    description: "A dance-like portrait that uses rotation and fabric movement to contrast the stillness of the studio background."
  },
  {
    id: "img-1979",
    title: "Patterned Rest",
    category: "Floor portrait",
    image: "gallery-source/IMG_1979.JPG",
    description: "A quieter portrait where the patterned textile softens the scene and turns the pose into an introspective pause."
  },
  {
    id: "img-1982",
    title: "Held Gaze",
    category: "Seated portrait",
    image: "gallery-source/IMG_1982.JPG",
    description: "A seated portrait that brings the subject closer to the patterned backdrop and pushes eye contact to the center."
  },
  {
    id: "img-1924",
    title: "Stillness Before the Frame",
    category: "Studio portrait",
    image: "gallery-source/IMG_1924.JPG",
    description: "A quieter seated portrait where denim, warm light, and a lowered gaze offer a calm counterpoint to the red-draped sequence."
  },
  {
    id: "img-1932",
    title: "Soft Blur, Sharp Mood",
    category: "Atmospheric portrait",
    image: "gallery-source/IMG_1932.JPG",
    description: "A softened portrait that lets blur and body language guide the mood before the face fully resolves."
  },
  {
    id: "whatsapp-1",
    title: "Through the Monitor",
    category: "Behind the scenes",
    image: "gallery-source/WhatsApp-1.jpeg",
    description: "A behind-the-scenes frame where the camera monitor becomes the main viewing window into the portrait setup."
  },
  {
    id: "whatsapp-2",
    title: "Screen Test",
    category: "Behind the scenes",
    image: "gallery-source/WhatsApp-2.jpeg",
    description: "A tighter monitor-based composition that turns crop marks, screen glow, and a single eye into part of the final image."
  }
];

const skillGroups = [
  {
    title: "Software",
    items: [
      { name: "Figma", meta: "UX flows and UI systems", icon: "&#xE8A9;" },
      { name: "Adobe Illustrator", meta: "Vector and identity work", icon: "&#xE8B9;" },
      { name: "Adobe Photoshop", meta: "Image treatment and layouts", icon: "&#xE8B9;" },
      { name: "After Effects", meta: "Motion and visual pacing", icon: "&#xE8B2;" },
      { name: "InDesign", meta: "Editorial structure", icon: "&#xE8A5;" },
      { name: "Blender", meta: "3D exploration", icon: "&#xE8B8;" }
    ]
  },
  {
    title: "Practice",
    items: [
      { name: "UX/UI", meta: "User-centered product thinking", icon: "&#xE8A9;" },
      { name: "Branding", meta: "Identity systems", icon: "&#xE8D3;" },
      { name: "Packaging", meta: "Physical brand surfaces", icon: "&#xE8B7;" },
      { name: "Illustration", meta: "Visual storytelling", icon: "&#xE8B9;" },
      { name: "Infographics", meta: "Data-led clarity", icon: "&#xE8C1;" },
      { name: "Editorial", meta: "Narrative pacing", icon: "&#xE8A5;" }
    ]
  },
  {
    title: "Making",
    items: [
      { name: "Research", meta: "Problem framing and insight", icon: "&#xE8CB;" },
      { name: "Prototyping", meta: "Interactions and flows", icon: "&#xE8AB;" },
      { name: "Sketching", meta: "Fast concept exploration", icon: "&#xE8BA;" },
      { name: "Painting", meta: "Material and color practice", icon: "&#xE8BE;" },
      { name: "Visual Storytelling", meta: "Meaning through sequence", icon: "&#xE8D2;" },
      { name: "Front-end Learning", meta: "HTML, CSS, and JS", icon: "&#xE8A7;" }
    ]
  }
];

const windowRegistry = new Map();
const shortcutSlots = new Map();
let topZIndex = 30;
let windowOffset = 0;
let scenePanelHideTimer = 0;
let entryAdvanceTimer = 0;
let entryBlinkTimer = 0;
let residentBlinkTimer = 0;
let entryPoseTimer = 0;
let entryPoseTimerSecondary = 0;
let residentGuideTimer = 0;
let residentGuideHideTimer = 0;
let residentSpeechCleanupTimer = 0;
let residentSpeechSequence = 0;
let activeResidentSpeechResolver = null;
let entrySpeechCleanupTimer = 0;
let entrySpeechSequence = 0;
let activeEntrySpeechResolver = null;

const residentCompanion = {
  name: "Miso"
};

const entryIntroScreen = {
  title: "Come in. I'll walk with you.",
  note: "A soft hello before you step inside.",
  voiceText: `Hi. I'm ${residentCompanion.name}. Come in. I'll stay with you for a moment and help you get your bearings.`,
  pose: "tilt"
};

const entryState = {
  stage: "intro",
  canAdvance: false,
  visitorName: "",
  unlocked: false
};

function getResidentGuideLines() {
  const visitorName = entryState.visitorName.trim() || "friend";

  return [
    {
      target: "workspace",
      message: `Hi ${visitorName}, I'm ${residentCompanion.name}. I'm glad you're here.`
    },
    {
      target: "works",
      message: "If you want the quickest feel for Sweety's work, start with Works."
    },
    {
      target: "navigation",
      message: "The dock keeps the main rooms close: works, gallery, resume, and contact."
    },
    {
      target: "workspace",
      message: "Open whatever catches your eye. Nothing here needs to be followed in order."
    },
    {
      target: "workspace",
      message: "I'll leave you to explore."
    }
  ];
}

const appContent = {
  home: {
    title: "Start",
    subtitle: "Workspace overview",
    size: { width: 900, height: 580 },
    icon: "&#xE80F;",
    render: () => `
      <div class="hero-grid">
        <section class="window-card">
          <p class="eyebrow">Workspace intro</p>
          <h2 class="headline">Hi, I'm ${escapeHtml(profile.firstName)}.</h2>
          <p class="lede">
            A communication designer exploring product thinking, editorial storytelling,
            packaging, illustration, and immersive visual systems.
          </p>
          <p class="tagline">
            This portfolio is designed like a desktop so visitors can move through the work
            the same way ideas usually unfold: non-linearly, by opening one thread at a time.
          </p>
          <div class="contact-links">
            ${renderInternalButton("projects", "Open all works", "&#xE8B7;")}
            ${renderInternalButton("gallery", "Photography gallery", "&#xE91B;", true)}
            ${renderInternalButton("resume", "Open resume", "&#xE8A5;", true)}
          </div>
        </section>
        <section class="window-card">
          <p class="eyebrow">At a glance</p>
          <p><strong>${escapeHtml(profile.role)}</strong></p>
          <p>${escapeHtml(profile.location)}</p>
          <p>${projectData.length} Behance projects mapped as desktop shortcuts.</p>
          <p>Focus areas: UX/UI, packaging, information design, editorial storytelling, and illustration.</p>
          <div class="contact-links">
            ${renderExternalLink(profile.behanceUrl, "Behance profile", "&#xE8A7;")}
            ${renderExternalLink(profile.resumeUrl, "Resume PDF", "&#xE8A5;", true)}
            ${renderOptionalLink(profile.linkedinUrl, "LinkedIn", "&#xE8A7;", true)}
            ${renderOptionalLink(profile.instagramUrl, "Instagram", "&#xE8A7;", true)}
          </div>
        </section>
      </div>
    `
  },
  projects: {
    title: "Works",
    subtitle: "Behance project library",
    size: { width: 1060, height: 720 },
    icon: "&#xE8B7;",
    render: () => `
      <div class="toolbar-row">
        <div>
          <h3>All Works</h3>
          <p class="tagline">Each project opens its own detailed portfolio window and links back to Behance.</p>
        </div>
        ${renderExternalLink(profile.behanceUrl, "Open Behance", "&#xE8A7;")}
      </div>
      <div class="projects-grid">
        ${projectData.map(renderProjectCard).join("")}
      </div>
    `
  },
  gallery: {
    title: "Gallery",
    subtitle: "Portrait series and studio frames",
    size: { width: 1140, height: 760 },
    icon: "&#xE91B;",
    iconImage: photographyArchive[0].image,
    render: () => `
      <article class="gallery-layout">
        <section class="gallery-hero">
          <section class="window-card gallery-intro-card">
            <p class="eyebrow">Photography archive</p>
            <h2 class="headline">Warm portraits, red textiles, and movement.</h2>
            <p class="lede">
              A dedicated gallery built from your shared image set, arranged like a studio wall of portraits,
              gesture studies, and behind-the-scenes frames rather than a standard project list.
            </p>
            <p class="tagline">
              The sequence moves from still portraiture into red-fabric motion studies and ends with monitor-led
              documentation from the same shoot, so the page feels like one coherent visual session.
            </p>
            <div class="tag-row">
              ${Array.from(new Set(photographyArchive.map(item => item.category)))
                .map(tag => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join("")}
            </div>
          </section>

          <figure class="window-card gallery-feature-card">
            <div class="gallery-feature-photo">
              <img src="${escapeAttribute(photographyArchive[0].image)}" alt="${escapeAttribute(`${photographyArchive[0].title} cover image`)}" loading="lazy">
            </div>
            <figcaption class="gallery-feature-meta">
              <strong>${escapeHtml(photographyArchive[0].title)}</strong>
              <span>${escapeHtml(photographyArchive[0].category)}</span>
              <p class="project-meta">${escapeHtml(photographyArchive[0].description)}</p>
            </figcaption>
          </figure>
        </section>

        <section class="gallery-board" aria-label="Photography gallery board">
          ${photographyArchive.map(renderPhotographyCard).join("")}
        </section>
      </article>
    `
  },
  resume: {
    title: "Resume",
    subtitle: "Education, experience, highlights",
    size: { width: 980, height: 690 },
    icon: "&#xE8A5;",
    render: () => `
      <div class="resume-grid">
        <section class="window-card">
          <p class="eyebrow">Profile</p>
          <p>
            Interaction and visual designer interested in visual storytelling, branding,
            illustration, and user-centered digital experiences.
          </p>
          <p><strong>Phone</strong><br>${escapeHtml(profile.phone)}</p>
          <p><strong>Email</strong><br>${escapeHtml(profile.email)}</p>
          <div class="contact-links">
            ${renderExternalLink(profile.resumeUrl, "Open PDF", "&#xE8A5;")}
            ${renderExternalLink(profile.behanceUrl, "Behance", "&#xE8A7;", true)}
          </div>
        </section>
        <section class="window-card">
          <p class="eyebrow">Education</p>
          <p><strong>Pearl Academy</strong><br>UG Communication Design, UX/UI specialization, 2023 to present</p>
          <p><strong>Hansraj College, Delhi University</strong><br>B.Com. (Prog.), 2023 to present</p>
          <p><strong>G D Goenka Public School</strong><br>12th: 95%, Commerce with Maths<br>10th: 90%</p>
        </section>
        <section class="window-card">
          <p class="eyebrow">Experience</p>
          <p><strong>Madhouse Studio Pvt Ltd</strong><br>2D Design Intern<br>25 May 2025 to 25 July 2025</p>
          <p>
            Worked on branding and event creatives, including support for Vivo Creatorcon,
            while collaborating with senior graphic designers on visual systems and show collateral.
          </p>
        </section>
        <section class="window-card">
          <p class="eyebrow">Highlights</p>
          <p>2nd place at Bit by Design for Atlas Way, a destination editorial experience reimagining Rajasthan.</p>
          <p>Google UX Design certificate and Meta Front-End Development coursework in progress.</p>
          <p>Research presented at ADA 2026 on immersive product display and purchase intention.</p>
          <p>Placed in Frame Fusion, Sketch Hour, and Comic Zone, and participated in the World Illustration Award 2026.</p>
        </section>
      </div>
    `
  },
  about: {
    title: "About",
    subtitle: "Journey and design lens",
    size: { width: 920, height: 600 },
    icon: "&#xE8D4;",
    render: () => `
      <div class="hero-grid">
        <section class="window-card">
          <p class="eyebrow">Story</p>
          <h2 class="headline">${escapeHtml(profile.name)}</h2>
          <p class="lede">
            I'm drawn to design that feels thoughtful on the surface and rigorous underneath:
            systems that communicate clearly, visuals that carry emotion, and interfaces that
            make people feel oriented rather than overwhelmed.
          </p>
          <p class="tagline">
            My practice moves fluidly between UX/UI, packaging, editorial work, and illustration,
            but the through-line is always the same: shaping information into something people can feel and use.
          </p>
        </section>
        <section class="window-card">
          <p class="eyebrow">How I work</p>
          <p><strong>Research first.</strong> I like to understand the system before styling it.</p>
          <p><strong>Visuals with purpose.</strong> Form should carry meaning, not just decoration.</p>
          <p><strong>Clear storytelling.</strong> I care about hierarchy, pacing, and what the user understands at each step.</p>
          <p><strong>Craft matters.</strong> From icons to layouts to packaging details, finish is part of the concept.</p>
        </section>
      </div>
    `
  },
  skills: {
    title: "Skills",
    subtitle: "Tools, craft, and process",
    size: { width: 980, height: 700 },
    icon: "&#xE8A9;",
    render: () => `
      <div class="skills-layout">
        ${skillGroups.map(group => `
          <section class="window-card skills-group">
            <div class="skills-header">
              <h3>${escapeHtml(group.title)}</h3>
              <span class="small-label">${group.items.length} items</span>
            </div>
            <div class="skills-grid">
              ${group.items.map(item => `
                <article class="skill-tile">
                  <div class="skill-icon">${renderUiIcon(item.icon)}</div>
                  <div>
                    <strong>${escapeHtml(item.name)}</strong>
                    <p class="project-meta">${escapeHtml(item.meta)}</p>
                  </div>
                </article>
              `).join("")}
            </div>
          </section>
        `).join("")}
      </div>
    `
  },
  contact: {
    title: "Contact",
    subtitle: "Start a conversation",
    size: { width: 940, height: 600 },
    icon: "&#xE8A8;",
    render: () => `
      <div class="contact-grid">
        <section class="window-card">
          <p class="eyebrow">Reach out</p>
          <h3>Let's build something thoughtful.</h3>
          <p>
            If you're working on a brand, interface, packaging idea, or visual narrative,
            I'd love to hear what you're imagining and where design can help.
          </p>
          <div class="contact-links">
            ${renderExternalLink(buildMailtoHref(), "Email", "&#xE8A8;")}
            ${renderExternalLink("tel:+918920183531", "Call", "&#xE717;", true)}
            ${renderExternalLink(profile.behanceUrl, "Behance", "&#xE8A7;", true)}
            ${renderExternalLink(profile.resumeUrl, "Resume PDF", "&#xE8A5;", true)}
            ${renderOptionalLink(profile.linkedinUrl, "LinkedIn", "&#xE8A7;", true)}
            ${renderOptionalLink(profile.instagramUrl, "Instagram", "&#xE8A7;", true)}
          </div>
        </section>
        <section class="window-card">
          <p class="eyebrow">Draft message</p>
          <form class="contact-form">
            <label>
              Name
              <input type="text" name="name" placeholder="Your name">
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="you@example.com">
            </label>
            <label>
              Project note
              <textarea name="projectNote" placeholder="Tell me a little about your idea.">${defaultEmailMessage}</textarea>
            </label>
            <button type="submit">
              ${renderUiIcon("&#xE8A8;")}
              <span>Start conversation</span>
            </button>
          </form>
        </section>
      </div>
    `
  }
};

function getShellMode() {
  if (window.innerWidth <= 760) return "mobile";
  if (window.innerWidth <= 1180) return "tablet";
  return "desktop";
}

function getAppMeta(appId) {
  const desktopApp = desktopApps.find(app => app.id === appId);
  if (desktopApp) {
    return desktopApp;
  }

  const definition = appContent[appId];
  if (definition) {
    return {
      id: appId,
      label: definition.title,
      subtitle: definition.subtitle || "",
      icon: definition.icon || "&#xE80F;",
      iconImage: definition.iconImage || ""
    };
  }

  return {
    id: appId,
    label: appId,
    subtitle: "",
    icon: "&#xE80F;"
  };
}

function getSymbolSvg(symbol) {
  const symbols = {
    search: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5"></circle>
        <path d="M16 16L21 21"></path>
      </svg>
    `,
    home: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 10.5L12 3l9 7.5"></path>
        <path d="M5.5 9.5V20h13V9.5"></path>
        <path d="M9.5 20v-5.5h5V20"></path>
      </svg>
    `,
    projects: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 7.5h6l2 2H21v8.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <path d="M3 7.5V6a2 2 0 0 1 2-2h4.5l2 2H19a2 2 0 0 1 2 2v1.5"></path>
      </svg>
    `,
    gallery: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="14" rx="2.5"></rect>
        <circle cx="9" cy="10" r="1.5"></circle>
        <path d="M6 16l4-3.5 3 2 2.5-2 2.5 3.5"></path>
      </svg>
    `,
    resume: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5z"></path>
        <path d="M14 3.5V8h4"></path>
        <path d="M9 12h6"></path>
        <path d="M9 15.5h6"></path>
      </svg>
    `,
    skills: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.5l1.5 3.5 3.5 1.5-3.5 1.5L12 14l-1.5-3.5L7 9l3.5-1.5z"></path>
        <path d="M6 15l1 2.5 2.5 1L7 19.5 6 22l-1-2.5-2.5-1L5 17.5z"></path>
        <path d="M17.5 13l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"></path>
      </svg>
    `,
    about: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5"></circle>
        <path d="M5 19a7 7 0 0 1 14 0"></path>
      </svg>
    `,
    contact: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="6" width="17" height="12" rx="2.5"></rect>
        <path d="M5.5 8l6.5 5 6.5-5"></path>
      </svg>
    `,
    left: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15.5 5l-7 7 7 7"></path>
      </svg>
    `,
    right: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.5 5l7 7-7 7"></path>
      </svg>
    `,
    up: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 18V6"></path>
        <path d="M7 11l5-5 5 5"></path>
      </svg>
    `,
    refresh: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 12a8 8 0 1 1-2.3-5.7"></path>
        <path d="M20 4v5h-5"></path>
      </svg>
    `,
    minimize: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 18h12"></path>
      </svg>
    `,
    maximize: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="6" y="6" width="12" height="12" rx="1.5"></rect>
      </svg>
    `,
    restore: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 9h9v9H9z"></path>
        <path d="M6 15V6h9"></path>
      </svg>
    `,
    close: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 7l10 10"></path>
        <path d="M17 7L7 17"></path>
      </svg>
    `,
    external: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 5h5v5"></path>
        <path d="M10 14L19 5"></path>
        <path d="M19 13v5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 18V7A1.5 1.5 0 0 1 6.5 5H12"></path>
      </svg>
    `,
    phone: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.5 4.5h9A1.5 1.5 0 0 1 18 6v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 18V6a1.5 1.5 0 0 1 1.5-1.5z"></path>
        <path d="M10 17.2h4"></path>
      </svg>
    `,
    motion: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 7.5v9l8-4.5z"></path>
      </svg>
    `,
    cube: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.5l7 4v9l-7 4-7-4v-9z"></path>
        <path d="M12 3.5v9l7 4"></path>
        <path d="M12 12.5l-7 4"></path>
      </svg>
    `,
    brush: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 5l5 5"></path>
        <path d="M6 18c0-2.2 1.8-4 4-4h3L19 8l-3-3-6 6v3c0 2.2-1.8 4-4 4z"></path>
      </svg>
    `,
    pencil: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 20l4.2-1 9.6-9.6-3.2-3.2L5 15.8z"></path>
        <path d="M13.8 6.2l3.2 3.2"></path>
      </svg>
    `,
    paint: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4.5c4.7 0 8 3 8 6.8 0 2.7-1.8 4.7-4.2 4.7h-1.3c-1 0-1.8.8-1.8 1.8v.4c0 .9-.7 1.6-1.6 1.6C7.2 19.8 4 16.6 4 12.2 4 7.8 7.5 4.5 12 4.5z"></path>
        <circle cx="8.5" cy="10" r="1"></circle>
        <circle cx="11.5" cy="8.5" r="1"></circle>
        <circle cx="14.7" cy="9" r="1"></circle>
      </svg>
    `,
    chart: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 18.5V10"></path>
        <path d="M12 18.5V6"></path>
        <path d="M19 18.5v-8"></path>
        <path d="M4 18.5h16"></path>
      </svg>
    `,
    tag: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 12l-8 8-8-8V5h7z"></path>
        <circle cx="9" cy="9" r="1.3"></circle>
      </svg>
    `,
    layers: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4l8 4-8 4-8-4z"></path>
        <path d="M4 12l8 4 8-4"></path>
        <path d="M4 16l8 4 8-4"></path>
      </svg>
    `,
    info: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5"></circle>
        <path d="M12 10.5v5"></path>
        <circle cx="12" cy="7.5" r=".8" fill="currentColor" stroke="none"></circle>
      </svg>
    `,
    sparkle: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4l1.5 3.5L17 9l-3.5 1.5L12 14l-1.5-3.5L7 9l3.5-1.5z"></path>
        <path d="M18 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"></path>
      </svg>
    `
  };

  return symbols[symbol] || symbols.home;
}

function resolveIconName(icon) {
  const iconMap = {
    "&#xE80F;": "home",
    "&#xE8B7;": "projects",
    "&#xE91B;": "gallery",
    "&#xE8A5;": "resume",
    "&#xE8A9;": "skills",
    "&#xE713;": "sparkle",
    "&#xE77B;": "about",
    "&#xE8D4;": "info",
    "&#xE8A8;": "contact",
    "&#xE717;": "phone",
    "&#xE8A7;": "external",
    "&#xE8AB;": "motion",
    "&#xE8B2;": "motion",
    "&#xE8B8;": "cube",
    "&#xE8B9;": "brush",
    "&#xE8BA;": "pencil",
    "&#xE8BE;": "paint",
    "&#xE8C1;": "chart",
    "&#xE8CB;": "search",
    "&#xE8D2;": "layers",
    "&#xE8D3;": "tag",
    "&#xE721;": "search",
    "&#xE72A;": "right",
    "&#xE72B;": "left",
    "&#xE72C;": "refresh",
    "&#xE74A;": "up",
    "&#xE921;": "minimize",
    "&#xE922;": "maximize",
    "&#xE923;": "restore",
    "&#xE8BB;": "close",
    "&#xE710;": "sparkle"
  };

  return iconMap[icon] || iconMap[String(icon)] || String(icon || "home");
}

function renderAdaptiveSymbol(symbol) {
  return `<span class="adaptive-symbol" aria-hidden="true">${getSymbolSvg(symbol)}</span>`;
}

function renderUiIcon(icon, className = "") {
  return `<span class="ui-symbol${className ? ` ${className}` : ""}" aria-hidden="true">${getSymbolSvg(resolveIconName(icon))}</span>`;
}

function renderAdaptiveLauncher(item, shell, type = "app") {
  if (type === "project") {
    return `
      <button class="adaptive-launcher adaptive-project-launcher" type="button" data-project-launch="${item.id}" data-track-app="projects" aria-label="Open ${escapeHtml(item.title)}">
        <span class="adaptive-launcher-icon image-icon">
          <img src="${escapeAttribute(item.coverImage)}" alt="" loading="lazy">
        </span>
        <span class="adaptive-launcher-label">
          <strong>${escapeHtml(item.desktopLabel)}</strong>
          <span>${escapeHtml(item.category)}</span>
        </span>
      </button>
    `;
  }

  const meta = getAppMeta(item.id || item);
  return `
    <button class="adaptive-launcher adaptive-app-launcher" type="button" data-app-launch="${meta.id}" data-track-app="${meta.id}" aria-label="Open ${escapeHtml(meta.label)}">
      <span class="adaptive-launcher-icon${shell === "mobile" ? " mobile-icon" : ""}${meta.iconImage ? " image-icon" : " system-icon"}">
        ${meta.iconImage
          ? `<img src="${escapeAttribute(meta.iconImage)}" alt="" loading="lazy">`
          : renderAdaptiveSymbol(meta.id)}
      </span>
      <span class="adaptive-launcher-label">
        <strong>${escapeHtml(meta.label)}</strong>
        <span>${escapeHtml(meta.subtitle)}</span>
      </span>
    </button>
  `;
}

function renderAdaptiveDock(shell) {
  return adaptiveDockApps.map(appId => {
    const meta = getAppMeta(appId);
    return `
      <button class="adaptive-dock-button" type="button" data-app-launch="${meta.id}" data-track-app="${meta.id}" aria-label="Open ${escapeHtml(meta.label)}">
        <span class="adaptive-dock-icon${meta.iconImage ? " image-icon" : " system-icon"}">
          ${meta.iconImage
            ? `<img src="${escapeAttribute(meta.iconImage)}" alt="" loading="lazy">`
            : renderAdaptiveSymbol(meta.id)}
        </span>
      </button>
    `;
  }).join("");
}

function renderAdaptiveShells() {
  const featuredProjects = featuredAdaptiveProjects
    .map(id => projectData.find(project => project.id === id))
    .filter(Boolean);

  if (tabletAppGrid) {
    tabletAppGrid.innerHTML = [
      ...desktopApps.map(app => renderAdaptiveLauncher(app, "tablet")),
      ...featuredProjects.map(project => renderAdaptiveLauncher(project, "tablet", "project"))
    ].join("");
  }

  if (tabletDock) {
    tabletDock.innerHTML = renderAdaptiveDock("tablet");
  }

  if (mobileAppGrid) {
    mobileAppGrid.innerHTML = [
      ...desktopApps.map(app => renderAdaptiveLauncher(app, "mobile")),
      ...featuredProjects.slice(0, 2).map(project => renderAdaptiveLauncher(project, "mobile", "project"))
    ].join("");
  }

  if (mobileDock) {
    mobileDock.innerHTML = renderAdaptiveDock("mobile");
  }
}

function updateAdaptiveShell() {
  const shellMode = getShellMode();
  body.dataset.shell = shellMode;
  setCursorMode(shellMode === "desktop" ? "default" : "hidden");
  moveFishStudioPanel();
  syncTaskbarState();
}

function moveFishStudioPanel() {
  if (!fishStudioPanel || !fishStudioDesktopSlot) {
    return;
  }

  if (fishStudioPanel.parentElement !== fishStudioDesktopSlot) {
    fishStudioDesktopSlot.appendChild(fishStudioPanel);
  }
}

const scenePanels = {
  default: () => `
    <p class="scene-panel-kicker">Study Table</p>
    <h2>Start inside the room.</h2>
    <p>
      This desk is the narrative entrance to the portfolio. Hover over objects to wake them up,
      then click the one you want to explore first.
    </p>
    <ul class="scene-panel-list">
      <li>The laptop opens the full desktop workspace.</li>
      <li>The iPad, photo frame, phone, papers, canvas, and notebook each reveal a different page first.</li>
      <li>The lamp switches the entire experience between light and dark mode.</li>
    </ul>
    <div class="scene-panel-actions">
      ${renderSceneAppButton("home", "Enter workspace", "&#xE80F;")}
    </div>
  `,
  works: () => `
    <p class="scene-panel-kicker">iPad</p>
    <h2>Selected Works</h2>
    <p>
      The tablet is a quick look at the project library: product work, packaging, information design,
      editorial storytelling, and visual systems.
    </p>
    <div class="scene-project-preview">
      ${projectData.slice(0, 4).map(project => `
        <article class="scene-project-chip">
          <img src="${escapeAttribute(project.coverImage)}" alt="">
          <div>
            <strong>${escapeHtml(project.desktopLabel)}</strong>
            <span>${escapeHtml(project.category)}</span>
          </div>
        </article>
      `).join("")}
    </div>
    <div class="scene-panel-actions">
      ${renderSceneAppButton("projects", "Open all works", "&#xE8B7;")}
    </div>
  `,
  about: () => `
    <p class="scene-panel-kicker">Photo Frame</p>
    <h2>About Me</h2>
    <p>
      I work across UX/UI, branding, packaging, editorial design, and illustration, but what ties
      everything together is a focus on clarity, structure, and emotional readability.
    </p>
    <p>
      I like projects that ask for both thought and craft: understanding the system first, then shaping
      the visual language so it feels intuitive, calm, and memorable.
    </p>
    <div class="scene-panel-actions">
      ${renderSceneAppButton("about", "Open about page", "&#xE8D4;")}
    </div>
  `,
  contact: () => `
    <p class="scene-panel-kicker">Phone</p>
    <h2>Contact</h2>
    <p>Reach out for interfaces, identity systems, packaging directions, editorial work, or visual storytelling projects.</p>
    <div class="scene-contact-list">
      ${renderExternalLink(buildMailtoHref(), "Email me", "&#xE8A8;")}
      ${renderExternalLink("tel:+918920183531", "Call me", "&#xE717;", true)}
      ${renderExternalLink(profile.behanceUrl, "Behance profile", "&#xE8A7;", true)}
    </div>
    <div class="scene-panel-actions">
      ${renderSceneAppButton("contact", "Open contact page", "&#xE8A8;")}
    </div>
  `,
  resume: () => `
    <p class="scene-panel-kicker">Papers</p>
    <h2>Resume and Experience</h2>
    <p>
      Communication Design at Pearl Academy, B.Com. at Hansraj College, and internship experience at
      Madhouse Studio working on branding and event creatives.
    </p>
    <ul class="scene-panel-list">
      <li>Pearl Academy, Communication Design with UX/UI focus.</li>
      <li>Hansraj College, Delhi University, B.Com. (Prog.).</li>
      <li>Madhouse Studio Pvt Ltd, 2D Design Intern.</li>
      <li>Google UX Design certificate and research presentation at ADA 2026.</li>
    </ul>
    <div class="scene-panel-actions">
      ${renderSceneAppButton("resume", "Open resume page", "&#xE8A5;")}
      ${renderExternalLink(profile.resumeUrl, "Open PDF", "&#xE8A5;", true)}
    </div>
  `,
  skills: () => `
    <p class="scene-panel-kicker">Notebook</p>
    <h2>Skills and Tools</h2>
    <p>
      Research, interface systems, packaging, illustration, editorial pacing, and data-led storytelling,
      supported by Figma and Adobe tools.
    </p>
    <div class="scene-tag-grid">
      ${skillGroups.flatMap(group => group.items.slice(0, 2)).slice(0, 6).map(item => `
        <span class="scene-tag-pill">${escapeHtml(item.name)}</span>
      `).join("")}
    </div>
    <div class="scene-panel-actions">
      ${renderSceneAppButton("skills", "Open skills page", "&#xE8A9;")}
    </div>
  `,
  canvas: () => `
    <p class="scene-panel-kicker">Canvas</p>
    <h2>Personal Practice</h2>
    <p>
      The canvas stands for the more intuitive side of the practice: observation, abstraction,
      experimentation, and visual storytelling before the work becomes a full system.
    </p>
    <p>
      It is where image-making and concept-building meet, and it informs the way interfaces,
      packaging, and editorial projects eventually take shape.
    </p>
    <div class="scene-panel-actions">
      ${renderSceneAppButton("projects", "Open work library", "&#xE8B7;")}
    </div>
  `
};

function initializeScene() {
  initializeTheme();
  if (!studioScene || !sceneScreenOverlay || !scenePanelCard || !scenePanelContent || !scenePanelClose) {
    body.dataset.stage = "desktop";
    return;
  }

  hideScenePanel(true);

  document.addEventListener("click", event => {
    const panelTrigger = event.target.closest("[data-scene-panel]");
    if (panelTrigger) {
      renderScenePanel(panelTrigger.dataset.scenePanel);
      return;
    }

    const enterTrigger = event.target.closest("[data-scene-enter]");
    if (enterTrigger) {
      enterDesktop();
      return;
    }

    const appTrigger = event.target.closest("[data-scene-open-app]");
    if (appTrigger) {
      enterDesktop(appTrigger.dataset.sceneOpenApp === "home" ? "" : appTrigger.dataset.sceneOpenApp);
      return;
    }

    if (event.target.closest("[data-scene-theme-toggle]")) {
      toggleTheme();
      return;
    }

    if (event.target.closest("#scene-panel-close")) {
      hideScenePanel();
      return;
    }

    if (
      body.dataset.stage === "scene" &&
      !scenePanelCard.hidden &&
      !event.target.closest("#scene-panel-card") &&
      event.target.closest(".studio-room")
    ) {
      hideScenePanel();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && body.dataset.stage === "scene") {
      hideScenePanel();
    }
  });
}

function renderScenePanel(key) {
  if (!sceneScreenOverlay || !scenePanelCard || !scenePanelContent || !scenePanelClose) {
    return;
  }

  const renderer = scenePanels[key];
  if (!renderer) {
    hideScenePanel();
    return;
  }

  window.clearTimeout(scenePanelHideTimer);
  scenePanelCard.dataset.panel = key;
  scenePanelCard.hidden = false;
  scenePanelCard.classList.remove("is-open");
  scenePanelContent.innerHTML = renderer();
  scenePanelClose.hidden = false;
  sceneScreenOverlay.dataset.open = "true";

  window.requestAnimationFrame(() => {
    scenePanelCard.classList.add("is-open");
    scenePanelCard.focus();
  });
}

function hideScenePanel(immediate = false) {
  if (!sceneScreenOverlay || !scenePanelCard || !scenePanelContent || !scenePanelClose) {
    return;
  }

  window.clearTimeout(scenePanelHideTimer);
  sceneScreenOverlay.dataset.open = "false";
  scenePanelClose.hidden = true;
  scenePanelCard.classList.remove("is-open");

  const finishHide = () => {
    scenePanelCard.hidden = true;
    scenePanelCard.dataset.panel = "";
    scenePanelContent.innerHTML = "";
  };

  if (immediate) {
    finishHide();
    return;
  }

  scenePanelHideTimer = window.setTimeout(finishHide, 220);
}

function enterDesktop(appKey = "") {
  body.dataset.stage = "desktop";
  if (scenePanelCard) {
    hideScenePanel(true);
  }

  if (appKey) {
    window.setTimeout(() => createWindow(appKey), 420);
  }
}

function initializeTheme() {
  let savedTheme = "";
  try {
    savedTheme = window.localStorage.getItem("sweety-theme") || "";
  } catch (_error) {
    savedTheme = "";
  }

  if (savedTheme === "dark" || savedTheme === "light") {
    body.dataset.theme = savedTheme;
  }
}

function toggleTheme() {
  const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
  body.dataset.theme = nextTheme;

  try {
    window.localStorage.setItem("sweety-theme", nextTheme);
  } catch (_error) {
    // Ignore storage failures and still allow the theme switch.
  }
}

function clearEntryTimers() {
  window.clearTimeout(entryAdvanceTimer);
  window.clearTimeout(entryBlinkTimer);
  window.clearTimeout(residentBlinkTimer);
  window.clearTimeout(entryPoseTimer);
  window.clearTimeout(entryPoseTimerSecondary);
}

function clearResidentGuideTimers() {
  window.clearTimeout(residentGuideTimer);
  window.clearTimeout(residentGuideHideTimer);
  window.clearTimeout(residentSpeechCleanupTimer);
}

function clearGuideFocus() {
  document.querySelectorAll(".guide-focus").forEach(element => {
    element.classList.remove("guide-focus");
  });
}

function getResidentSpeechSynthesis() {
  if (!("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance !== "function") {
    return null;
  }

  return window.speechSynthesis;
}

function primeResidentSpeech() {
  getResidentSpeechSynthesis()?.getVoices();
}

function pickResidentSpeechVoice() {
  const speech = getResidentSpeechSynthesis();
  if (!speech) {
    return null;
  }

  const voices = speech.getVoices();
  if (!voices.length) {
    return null;
  }

  const rankVoice = voice => {
    const lang = (voice.lang || "").toLowerCase();
    const name = (voice.name || "").toLowerCase();
    let score = 0;

    if (lang.startsWith("en-in")) {
      score += 90;
    } else if (lang.startsWith("en-gb")) {
      score += 72;
    } else if (lang.startsWith("en-us")) {
      score += 64;
    } else if (lang.startsWith("en")) {
      score += 48;
    }

    if (voice.default) {
      score += 10;
    }

    if (
      name.includes("natural")
      || name.includes("neural")
      || name.includes("enhanced")
      || name.includes("premium")
      || name.includes("online")
    ) {
      score += 16;
    }

    if (
      name.includes("heera")
      || name.includes("priya")
      || name.includes("neha")
      || name.includes("samantha")
      || name.includes("zira")
      || name.includes("aria")
      || name.includes("ava")
      || name.includes("serena")
      || name.includes("female")
    ) {
      score += 18;
    }

    if (
      name.includes("robot")
      || name.includes("espeak")
      || name.includes("compact")
    ) {
      score -= 18;
    }

    return score;
  };

  return [...voices].sort((left, right) => rankVoice(right) - rankVoice(left))[0] || null;
}

function estimateResidentSpeechDuration(text) {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(prefersReducedMotion.matches ? 1700 : 2600, 900 + (wordCount * 220));
}

function clearResidentSpeakingState() {
  if (!residentMascot) {
    return;
  }

  residentMascot.classList.remove("is-speaking");
  residentMascot.querySelector(".cat-mascot")?.classList.remove("is-speaking");
}

function cancelResidentSpeech() {
  window.clearTimeout(residentSpeechCleanupTimer);
  residentSpeechSequence += 1;
  const conclude = activeResidentSpeechResolver;
  activeResidentSpeechResolver = null;
  clearResidentSpeakingState();

  const speech = getResidentSpeechSynthesis();
  if (speech && (speech.speaking || speech.pending)) {
    speech.cancel();
  }

  conclude?.("cancelled");
}

function speakResidentGuide(text, catRoot) {
  const speech = getResidentSpeechSynthesis();
  const duration = estimateResidentSpeechDuration(text);

  window.clearTimeout(residentSpeechCleanupTimer);
  clearResidentSpeakingState();

  const sequence = ++residentSpeechSequence;
  let settled = false;
  let resolveFinished;
  const finished = new Promise(resolve => {
    resolveFinished = resolve;
  });
  const conclude = status => {
    if (settled) {
      return;
    }

    settled = true;
    window.clearTimeout(residentSpeechCleanupTimer);

    if (activeResidentSpeechResolver === conclude) {
      activeResidentSpeechResolver = null;
    }

    if (sequence === residentSpeechSequence) {
      clearResidentSpeakingState();
    }

    resolveFinished?.({ status, duration });
  };

  activeResidentSpeechResolver = conclude;

  if (!speech || !catRoot) {
    conclude("estimated");
    return { duration, finished };
  }

  const utterance = new window.SpeechSynthesisUtterance(text);
  const voice = pickResidentSpeechVoice();

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || "en-IN";
  } else {
    utterance.lang = "en-IN";
  }

  utterance.rate = 0.96;
  utterance.pitch = 1.08;
  utterance.volume = 0.94;
  utterance.onstart = () => {
    if (sequence !== residentSpeechSequence || !residentMascot) {
      return;
    }

    residentMascot.classList.add("is-speaking");
    catRoot.classList.add("is-speaking");
  };
  utterance.onend = () => conclude("ended");
  utterance.onerror = () => conclude("error");

  speech.cancel();
  window.setTimeout(() => {
    if (sequence !== residentSpeechSequence) {
      conclude("cancelled");
      return;
    }

    try {
      speech.speak(utterance);
      const watchdogStartedAt = Date.now();
      const pollSpeechCompletion = () => {
        if (settled || sequence !== residentSpeechSequence) {
          return;
        }

        if (!speech.speaking && !speech.pending) {
          conclude("watchdog");
          return;
        }

        if (Date.now() - watchdogStartedAt > Math.max(duration * 4, 20000)) {
          conclude("watchdog-timeout");
          return;
        }

        residentSpeechCleanupTimer = window.setTimeout(pollSpeechCompletion, 320);
      };

      residentSpeechCleanupTimer = window.setTimeout(pollSpeechCompletion, duration + 900);
    } catch (_error) {
      conclude("estimated");
    }
  }, 36);

  return { duration, finished };
}

function getEntryVoiceLine() {
  if (entryState.stage === "intro") {
    return entryIntroScreen.voiceText;
  }

  return "Tell me your name, and I'll let you in.";
}

function clearEntrySpeakingState() {
  entryContent?.querySelector(".entry-voice-shell")?.classList.remove("is-speaking");
  entryContent?.querySelector(".cat-mascot")?.classList.remove("is-speaking");
}

function stopEntrySpeech({ bumpSequence = true } = {}) {
  window.clearTimeout(entrySpeechCleanupTimer);
  const conclude = activeEntrySpeechResolver;
  activeEntrySpeechResolver = null;
  clearEntrySpeakingState();

  if (bumpSequence) {
    entrySpeechSequence += 1;
  }

  const speech = getResidentSpeechSynthesis();
  if (speech && (speech.speaking || speech.pending)) {
    speech.cancel();
  }

  conclude?.("cancelled");
}

function cancelEntrySpeech() {
  stopEntrySpeech();
}

function speakEntryLine(text, catRoot) {
  stopEntrySpeech({ bumpSequence: false });

  const speech = getResidentSpeechSynthesis();
  const voicePanel = entryContent?.querySelector(".entry-voice-shell");
  const duration = estimateResidentSpeechDuration(text);
  const sequence = ++entrySpeechSequence;
  let settled = false;
  let resolveFinished;
  const finished = new Promise(resolve => {
    resolveFinished = resolve;
  });

  const conclude = status => {
    if (settled) {
      return;
    }

    settled = true;
    window.clearTimeout(entrySpeechCleanupTimer);

    if (activeEntrySpeechResolver === conclude) {
      activeEntrySpeechResolver = null;
    }

    if (sequence === entrySpeechSequence) {
      clearEntrySpeakingState();
    }

    resolveFinished?.({ status, duration });
  };

  activeEntrySpeechResolver = conclude;

  const begin = () => {
    if (sequence !== entrySpeechSequence) {
      return;
    }

    voicePanel?.classList.add("is-speaking");
    catRoot?.classList.add("is-speaking");
  };

  if (!catRoot) {
    conclude("missing-target");
    return { duration, finished };
  }

  if (!speech) {
    begin();
    entrySpeechCleanupTimer = window.setTimeout(() => conclude("estimated"), duration);
    return { duration, finished };
  }

  const utterance = new window.SpeechSynthesisUtterance(text);
  const voice = pickResidentSpeechVoice();

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || "en-IN";
  } else {
    utterance.lang = "en-IN";
  }

  utterance.rate = 1;
  utterance.pitch = 1.12;
  utterance.volume = 0.94;
  utterance.onstart = begin;
  utterance.onend = () => conclude("ended");
  utterance.onerror = () => conclude("error");

  speech.cancel();
  window.setTimeout(() => {
    if (sequence !== entrySpeechSequence) {
      conclude("cancelled");
      return;
    }

    try {
      speech.speak(utterance);
      const watchdogStartedAt = Date.now();
      const pollSpeechCompletion = () => {
        if (settled || sequence !== entrySpeechSequence) {
          return;
        }

        if (!speech.speaking && !speech.pending) {
          conclude("watchdog");
          return;
        }

        if (Date.now() - watchdogStartedAt > Math.max(duration * 4, 14000)) {
          conclude("watchdog-timeout");
          return;
        }

        entrySpeechCleanupTimer = window.setTimeout(pollSpeechCompletion, 320);
      };

      entrySpeechCleanupTimer = window.setTimeout(pollSpeechCompletion, duration + 900);
    } catch (_error) {
      begin();
      entrySpeechCleanupTimer = window.setTimeout(() => conclude("estimated"), duration);
    }
  }, 36);

  return { duration, finished };
}

function getResidentGuideSelectors(target) {
  const shell = body.dataset.shell || "desktop";
  const selectorMap = {
    desktop: {
      works: [
        '.desktop-shortcut[data-app-launch="projects"]',
        '.action-button[data-app-launch="projects"]',
        '.desktop-shortcut[data-project-launch="digital-library"]'
      ],
      navigation: [
        '.taskbar',
        '.taskbar-button[data-app="projects"]',
        '.taskbar-button[data-app="gallery"]',
        '.taskbar-button[data-app="resume"]'
      ],
      workspace: [
        '.desktop-field',
        '.widgets-stack'
      ]
    },
    tablet: {
      works: [
        '.tablet-feature-card .tablet-action[data-app-launch="projects"]',
        '.tablet-apps-card',
        '.tablet-app-grid [data-project-launch="digital-library"]'
      ],
      navigation: [
        '.tablet-dock'
      ],
      workspace: [
        '.tablet-surface',
        '.tablet-apps-card'
      ]
    },
    mobile: {
      works: [
        '.mobile-chip[data-app-launch="projects"]',
        '.mobile-apps-card'
      ],
      navigation: [
        '.mobile-dock',
        '.mobile-searchbar'
      ],
      workspace: [
        '.mobile-hero-card',
        '.mobile-feature-card',
        '.mobile-apps-card'
      ]
    }
  };

  return selectorMap[shell]?.[target] || [];
}

function applyGuideFocus(target) {
  clearGuideFocus();

  const selectors = getResidentGuideSelectors(target);
  let primaryTarget = null;
  selectors.forEach(selector => {
    const element = document.querySelector(selector);
    if (!element) {
      return;
    }

    if (!primaryTarget) {
      primaryTarget = element;
    }
    element.classList.add("guide-focus");
  });

  return primaryTarget;
}

function renderCatMascot(context = "entry", pose = "default") {
  return `
    <div class="cat-mascot cat-pose-${pose}" data-cat-context="${context}">
      <svg viewBox="0 0 280 260" aria-hidden="true" focusable="false">
        <g class="cat-stage-ring" aria-hidden="true">
          <ellipse cx="140" cy="234" rx="74" ry="12"></ellipse>
        </g>
        <g class="cat-figure">
          <g class="cat-tail-group">
            <path class="cat-tail" d="M200 184C225 168 237 138 231 107C227 86 214 66 196 55C206 80 207 108 198 136C191 156 180 172 166 188"></path>
          </g>
          <g class="cat-body-group">
            <path class="cat-body" d="M82 232C64 232 54 217 54 192C54 125 82 82 135 82C186 82 214 113 223 181C228 213 213 232 182 232H82Z"></path>
          </g>
          <g class="cat-paws-group">
            <rect class="cat-paw cat-paw-left" x="110" y="184" width="18" height="50" rx="9"></rect>
            <rect class="cat-paw cat-paw-right" x="143" y="182" width="18" height="52" rx="9"></rect>
          </g>
          <g class="cat-head-group">
            <path class="cat-head" d="M102 118C83 118 70 104 70 79C70 46 90 24 120 24L136 50H148L164 24C194 24 214 46 214 79C214 104 201 118 182 118H102Z"></path>
            <g class="cat-eye cat-eye-left">
              <ellipse class="cat-eye-shape" cx="121" cy="87" rx="18" ry="12"></ellipse>
              <rect class="cat-eye-lid" x="100" y="71" width="42" height="15" rx="7.5"></rect>
              <g class="cat-pupil-group">
                <circle class="cat-eye-pupil" cx="121" cy="87" r="4.8"></circle>
              </g>
            </g>
            <g class="cat-eye cat-eye-right">
              <ellipse class="cat-eye-shape" cx="164" cy="87" rx="18" ry="12"></ellipse>
              <rect class="cat-eye-lid" x="143" y="71" width="42" height="15" rx="7.5"></rect>
              <g class="cat-pupil-group">
                <circle class="cat-eye-pupil" cx="164" cy="87" r="4.8"></circle>
              </g>
            </g>
            <rect class="cat-mouth" x="131" y="110" width="22" height="4" rx="2"></rect>
            <circle class="cat-cheek" cx="87" cy="112" r="4.3"></circle>
            <circle class="cat-cheek" cx="198" cy="112" r="4.3"></circle>
          </g>
        </g>
      </svg>
    </div>
  `;
}

function renderEntryProgress() {
  return "";
}

function renderEntrySkipButton(label = "Skip intro") {
  return `
    <button class="entry-skip" type="button" data-entry-skip>${escapeHtml(label)}</button>
  `;
}

function renderEntryScreen() {
  if (!entryContent || !entryWindow) {
    return;
  }

  body.dataset.entryScreen = entryState.stage;
  entryWindow.dataset.state = entryState.stage;
  entryWindow.hidden = false;

  if (entryState.stage === "intro") {
    entryContent.innerHTML = `
      <section class="entry-screen entry-screen-splash entry-screen-intro">
        <div class="entry-stage-shell entry-stage-shell-splash">
          <div class="entry-cat-stage">
            <button class="entry-cat-trigger" type="button" data-entry-cat aria-label="Interact with the welcome guide">
              ${renderCatMascot("entry", entryIntroScreen.pose)}
            </button>
          </div>
        </div>
        <div class="entry-copy-block entry-copy-block-intro">
          <p class="entry-kicker">welcome</p>
          <h2 class="entry-title" id="entry-title">${escapeHtml(entryIntroScreen.title)}</h2>
          <p class="entry-intro-note">${escapeHtml(entryIntroScreen.note)}</p>
          <div class="entry-footer">
            ${renderEntrySkipButton()}
          </div>
        </div>
      </section>
    `;
    bindEntryScreenInteractions();
    return;
  }

  entryContent.innerHTML = `
    <section class="entry-screen entry-screen-login">
      <div class="entry-stage-shell entry-stage-shell-login">
        <div class="entry-cat-stage">
          <button class="entry-cat-trigger" type="button" data-entry-cat aria-label="Interact with the workspace gatekeeper">
            ${renderCatMascot("entry", "guard")}
          </button>
        </div>
      </div>
      <form class="entry-login-panel" id="entry-login-form" novalidate>
        <p class="entry-kicker">gatekeeper</p>
        <label class="entry-login-label" for="entry-name" id="entry-title">Enter your name.</label>
        <input class="entry-name-input" id="entry-name" name="entry-name" type="text" placeholder="your name" autocomplete="name" spellcheck="false">
        <button class="entry-cta" type="submit">enter</button>
        <p class="entry-cue">No password. Just presence.</p>
      </form>
    </section>
  `;
  bindEntryScreenInteractions();
}

function transitionEntryScreen(nextStep, direction = "forward") {
  const currentScreen = entryContent?.querySelector(".entry-screen");
  if (!currentScreen || prefersReducedMotion.matches) {
    nextStep();
    return;
  }

  currentScreen.dataset.exitDirection = direction;
  currentScreen.classList.add("is-exiting");
  window.setTimeout(nextStep, 240);
}

function setCatTracking(catRoot, x = 0, y = 0) {
  if (!catRoot) {
    return;
  }

  catRoot.style.setProperty("--cat-track-x", `${x.toFixed(2)}px`);
  catRoot.style.setProperty("--cat-track-y", `${y.toFixed(2)}px`);
}

function resetCatTracking(catRoot) {
  setCatTracking(catRoot, 0, 0);
}

function setCatTrackingTowardElement(catRoot, targetElement) {
  if (!catRoot || !targetElement) {
    resetCatTracking(catRoot);
    return;
  }

  const catRect = catRoot.getBoundingClientRect();
  const targetRect = targetElement.getBoundingClientRect();
  const catCenterX = catRect.left + (catRect.width / 2);
  const catCenterY = catRect.top + (catRect.height / 2);
  const targetCenterX = targetRect.left + (targetRect.width / 2);
  const targetCenterY = targetRect.top + (targetRect.height / 2);
  const deltaX = (targetCenterX - catCenterX) / Math.max(window.innerWidth, 1);
  const deltaY = (targetCenterY - catCenterY) / Math.max(window.innerHeight, 1);

  setCatTracking(
    catRoot,
    clamp(deltaX * 18, -3.6, 3.6),
    clamp(deltaY * 5, -0.3, 0.16)
  );
}

function triggerCatBlink(catRoot, duration = 220) {
  if (!catRoot) {
    return;
  }

  catRoot.classList.add("is-blinking");
  window.setTimeout(() => {
    catRoot.classList.remove("is-blinking");
  }, duration);
}

function triggerCatReact(catRoot, duration = 620) {
  if (!catRoot) {
    return;
  }

  catRoot.classList.add("is-reacting");
  window.setTimeout(() => {
    catRoot.classList.remove("is-reacting");
  }, duration);
}

function setCatPose(catRoot, pose) {
  if (!catRoot) {
    return;
  }

  Array.from(catRoot.classList)
    .filter(className => className.startsWith("cat-pose-"))
    .forEach(className => catRoot.classList.remove(className));

  catRoot.classList.add(`cat-pose-${pose}`);
}

function updateCatTrackingFromPointer(event, host, catRoot, range = 2.6) {
  if (!host || !catRoot) {
    return;
  }

  const bounds = host.getBoundingClientRect();
  const offsetX = ((event.clientX - bounds.left) / bounds.width) - 0.5;
  const offsetY = ((event.clientY - bounds.top) / bounds.height) - 0.5;
  const trackX = clamp(offsetX * range * 1.55, -range * 0.9, range * 0.9);
  const trackY = clamp(offsetY * 0.9, -0.45, 0.18);
  setCatTracking(catRoot, trackX, trackY);
}

function updateEntryCatFromInput(input, catRoot) {
  if (!input || !catRoot) {
    return;
  }

  const cursorIndex = typeof input.selectionStart === "number" ? input.selectionStart : input.value.length;
  const safeLength = Math.max(input.value.length, 1);
  const progress = clamp(cursorIndex / safeLength, 0, 1);
  const intensity = clamp(input.value.length / 10, 0, 1);
  const trackX = (progress - 0.5) * 3.4;
  const trackY = input.matches(":focus") ? (-0.12 - (intensity * 0.1)) : 0;
  setCatPose(catRoot, input.value.trim() ? "listen" : "guard");
  setCatTracking(catRoot, trackX, trackY);
}

function queueIntroAdvance() {
  clearEntryTimers();
  cancelEntrySpeech();
  entryState.canAdvance = false;
  const introCat = entryContent?.querySelector(".cat-mascot");

  entryPoseTimer = window.setTimeout(() => {
    setCatPose(introCat, "settle");
    triggerCatReact(introCat, 820);
  }, prefersReducedMotion.matches ? 260 : 980);

  entryBlinkTimer = window.setTimeout(() => {
    triggerCatBlink(introCat, prefersReducedMotion.matches ? 160 : 260);
  }, prefersReducedMotion.matches ? 520 : 1680);

  entryPoseTimerSecondary = window.setTimeout(() => {
    setCatPose(introCat, "splash");
  }, prefersReducedMotion.matches ? 720 : 2260);

  entryAdvanceTimer = window.setTimeout(() => {
    if (entryState.stage !== "intro") {
      return;
    }

    transitionEntryScreen(() => {
      entryState.stage = "login";
      renderEntryScreen();
    }, "fade");
  }, prefersReducedMotion.matches ? 1000 : 2920);
}

function queueLoginVoicePrompt() {
  clearEntryTimers();
  cancelEntrySpeech();
  const catRoot = entryContent?.querySelector(".cat-mascot");
  if (!catRoot) {
    return;
  }

  entryBlinkTimer = window.setTimeout(() => {
    triggerCatBlink(catRoot, prefersReducedMotion.matches ? 140 : 220);
  }, prefersReducedMotion.matches ? 280 : 560);

  entryPoseTimer = window.setTimeout(() => {
    triggerCatReact(catRoot, prefersReducedMotion.matches ? 260 : 460);
  }, prefersReducedMotion.matches ? 520 : 940);
}

function skipEntryIntro() {
  if (
    entryState.stage !== "intro"
    || entryContent?.querySelector(".entry-screen")?.classList.contains("is-exiting")
  ) {
    return;
  }

  clearEntryTimers();
  cancelEntrySpeech();
  entryState.canAdvance = false;

  transitionEntryScreen(() => {
    entryState.stage = "login";
    renderEntryScreen();
  }, "fade");
}

function handleEntryLoginSubmit(event) {
  event.preventDefault();

  const input = entryContent?.querySelector("#entry-name");
  const catRoot = entryContent?.querySelector(".cat-mascot");
  if (!input || !catRoot) {
    return;
  }

  cancelEntrySpeech();
  const value = input.value.trim();
  if (!value) {
    catRoot.classList.remove("is-approval");
    catRoot.classList.add("is-ignore");
    setCatPose(catRoot, "turnaway");
    triggerCatReact(catRoot, 700);
    setCatTracking(catRoot, -1.4, 0.08);
    window.setTimeout(() => {
      catRoot.classList.remove("is-ignore");
      updateEntryCatFromInput(input, catRoot);
    }, 680);
    return;
  }

  entryState.visitorName = value;
  catRoot.classList.remove("is-ignore");
  setCatPose(catRoot, "approve");
  catRoot.classList.add("is-approval");
  triggerCatReact(catRoot, 760);
  triggerCatBlink(catRoot, prefersReducedMotion.matches ? 140 : 220);
  primeResidentSpeech();
  startUnlockSequence();
}

function bindEntryCatInteractions(screen, catRoot) {
  const catTrigger = screen.querySelector("[data-entry-cat]");

  screen.addEventListener("pointermove", event => {
    if (entryState.stage === "login" && event.target.closest("input, button, form")) {
      return;
    }

    updateCatTrackingFromPointer(event, screen, catRoot, entryState.stage === "login" ? 2 : 2.6);
  });

  screen.addEventListener("pointerleave", () => {
    if (entryState.stage === "login") {
      const input = entryContent?.querySelector("#entry-name");
      updateEntryCatFromInput(input, catRoot);
      return;
    }

    resetCatTracking(catRoot);
  });

  if (!catTrigger) {
    return;
  }

  catTrigger.addEventListener("pointerenter", () => {
    triggerCatBlink(catRoot, 180);
  });

  catTrigger.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    triggerCatReact(catRoot, 680);
    triggerCatBlink(catRoot, 190);
  });
}

function bindEntryScreenInteractions() {
  const screen = entryContent?.querySelector(".entry-screen");
  const catRoot = entryContent?.querySelector(".cat-mascot");
  if (!screen || !catRoot) {
    return;
  }

  screen.querySelector("[data-entry-skip]")?.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    skipEntryIntro();
  });

  bindEntryCatInteractions(screen, catRoot);

  if (entryState.stage === "intro") {
    queueIntroAdvance();
    return;
  }

  const form = entryContent.querySelector("#entry-login-form");
  const input = entryContent.querySelector("#entry-name");
  if (!form || !input) {
    return;
  }

  form.addEventListener("submit", handleEntryLoginSubmit);
  ["input", "keyup", "click", "focus"].forEach(eventName => {
    input.addEventListener(eventName, () => updateEntryCatFromInput(input, catRoot));
  });
  input.addEventListener("blur", () => resetCatTracking(catRoot));
  queueLoginVoicePrompt();
  window.requestAnimationFrame(() => input.focus());
}

function scheduleResidentMascotBlink() {
  if (!residentMascot || body.dataset.stage !== "desktop") {
    return;
  }

  window.clearTimeout(residentBlinkTimer);
  residentBlinkTimer = window.setTimeout(() => {
    triggerCatBlink(residentMascot.querySelector(".cat-mascot"), prefersReducedMotion.matches ? 120 : 210);
    scheduleResidentMascotBlink();
  }, 4200 + Math.round(Math.random() * 900));
}

function mountResidentMascot() {
  if (!residentMascot) {
    return;
  }

  residentMascot.innerHTML = `
    <div class="resident-guide-bubble" id="resident-guide-bubble" aria-hidden="true">
      <p class="resident-guide-copy" id="resident-guide-copy"></p>
      <div class="resident-guide-actions">
        <button class="resident-guide-skip" type="button" data-resident-skip>Skip guide</button>
      </div>
    </div>
    <div class="resident-mascot-shell">
      ${renderCatMascot("resident", "loaf")}
    </div>
  `;
  residentMascot.classList.add("is-visible");
  residentMascot.classList.remove("is-dismissing", "is-speaking", "is-walking-out");

  if (residentMascot.dataset.bound === "true") {
    return;
  }

  residentMascot.dataset.bound = "true";
  residentMascot.addEventListener("pointermove", event => {
    if (residentMascot.classList.contains("is-guiding")) {
      return;
    }
    const catRoot = residentMascot.querySelector(".cat-mascot");
    updateCatTrackingFromPointer(event, residentMascot, catRoot, 2.1);
  });
  residentMascot.addEventListener("pointerleave", () => {
    if (residentMascot.classList.contains("is-guiding")) {
      return;
    }
    resetCatTracking(residentMascot.querySelector(".cat-mascot"));
  });
  residentMascot.addEventListener("click", event => {
    if (!event.target.closest("[data-resident-skip]")) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    dismissResidentGuide();
  });
}

function showResidentGuideLine(step) {
  if (!residentMascot) {
    const duration = prefersReducedMotion.matches ? 1700 : 2600;
    return {
      duration,
      finished: Promise.resolve({ status: "estimated", duration })
    };
  }

  const bubble = residentMascot.querySelector("#resident-guide-bubble");
  const copy = residentMascot.querySelector("#resident-guide-copy");
  const catRoot = residentMascot.querySelector(".cat-mascot");
  if (!bubble || !copy || !catRoot) {
    const duration = estimateResidentSpeechDuration(step.message);
    return {
      duration,
      finished: Promise.resolve({ status: "estimated", duration })
    };
  }

  const primaryTarget = applyGuideFocus(step.target);
  const speechState = speakResidentGuide(step.message, catRoot);

  residentMascot.classList.remove("is-walking-out");
  copy.textContent = step.message;
  bubble.setAttribute("aria-hidden", "false");
  bubble.classList.add("is-visible");
  residentMascot.classList.add("is-guiding");
  triggerCatBlink(catRoot, prefersReducedMotion.matches ? 140 : 210);
  triggerCatReact(catRoot, prefersReducedMotion.matches ? 260 : 520);
  window.requestAnimationFrame(() => {
    setCatTrackingTowardElement(catRoot, primaryTarget);
  });

  return speechState;
}

function dismissResidentGuide() {
  if (!residentMascot) {
    return;
  }

  clearResidentGuideTimers();
  window.clearTimeout(residentBlinkTimer);
  cancelResidentSpeech();
  clearGuideFocus();
  residentMascot.querySelector("#resident-guide-bubble")?.classList.remove("is-visible");
  residentMascot.querySelector("#resident-guide-bubble")?.setAttribute("aria-hidden", "true");
  residentMascot.classList.remove("is-guiding");
  residentMascot.classList.add("is-dismissing", "is-walking-out");

  const catRoot = residentMascot.querySelector(".cat-mascot");
  if (catRoot) {
    setCatPose(catRoot, "walk");
    resetCatTracking(catRoot);
  }

  residentGuideHideTimer = window.setTimeout(() => {
    residentMascot.classList.remove("is-visible", "is-dismissing", "is-walking-out", "is-speaking");
    residentMascot.innerHTML = "";
  }, prefersReducedMotion.matches ? 260 : 1180);
}

function startResidentIntroduction() {
  if (!residentMascot || body.dataset.stage !== "desktop") {
    return;
  }

  clearResidentGuideTimers();
  cancelResidentSpeech();
  primeResidentSpeech();
  const catRoot = residentMascot.querySelector(".cat-mascot");
  const bubble = residentMascot.querySelector("#resident-guide-bubble");
  if (!catRoot || !bubble) {
    return;
  }

  bubble.classList.remove("is-visible");
  bubble.setAttribute("aria-hidden", "true");

  const residentGuideLines = getResidentGuideLines();
  const poses = ["observe", "tilt", "approve"];
  let index = 0;

  const advanceGuide = () => {
    if (index >= residentGuideLines.length) {
      dismissResidentGuide();
      return;
    }

    setCatPose(catRoot, poses[index] || "loaf");
    const guideState = showResidentGuideLine(residentGuideLines[index]);
    index += 1;
    guideState.finished.then(result => {
      if (
        result.status === "cancelled"
        || !residentMascot
        || body.dataset.stage !== "desktop"
      ) {
        return;
      }

      residentGuideTimer = window.setTimeout(advanceGuide, prefersReducedMotion.matches ? 120 : 240);
    });
  };

  residentGuideTimer = window.setTimeout(advanceGuide, prefersReducedMotion.matches ? 200 : 560);
}

function startUnlockSequence() {
  clearEntryTimers();
  cancelEntrySpeech();
  entryState.canAdvance = false;
  entryState.stage = "unlocking";
  body.dataset.stage = "unlocking";
  body.dataset.entryScreen = "unlocking";
  entryWindow?.classList.add("is-unlocking");

  const activeCat = entryContent?.querySelector(".cat-mascot");
  setCatPose(activeCat, "approve");

  entryAdvanceTimer = window.setTimeout(() => {
    entryState.unlocked = true;
    body.dataset.stage = "desktop";
    body.dataset.entryScreen = "complete";
    entryLayer?.classList.add("is-complete");
    if (entryWindow) {
      entryWindow.hidden = true;
      entryWindow.classList.remove("is-unlocking");
    }
    mountResidentMascot();
    scheduleResidentMascotBlink();
    startResidentIntroduction();
  }, prefersReducedMotion.matches ? 360 : 980);
}

function handleEntryKeydown(event) {
  if (body.dataset.stage === "desktop") {
    if (event.key === "Escape" && residentMascot?.classList.contains("is-guiding")) {
      event.preventDefault();
      dismissResidentGuide();
    }
    return;
  }

  if (entryState.unlocked) {
    return;
  }

  if (
    entryState.stage === "intro"
    && event.key === "Escape"
  ) {
    event.preventDefault();
    skipEntryIntro();
  }
}

function initializeEntryExperience() {
  initializeTheme();
  primeResidentSpeech();

  if (!entryLayer || !entryWindow || !entryContent) {
    body.dataset.stage = "desktop";
    mountResidentMascot();
    scheduleResidentMascotBlink();
    startResidentIntroduction();
    return;
  }

  body.dataset.stage = "entry";
  entryLayer.classList.remove("is-complete");
  entryState.canAdvance = false;
  entryState.stage = "intro";
  renderEntryScreen();
  document.addEventListener("keydown", handleEntryKeydown);
}

function initializeFishStudio() {
  if (
    !fishStudioPanel
    || !fishDesignerCanvas
    || !fishPresetRow
    || !fishNameInput
    || !saveFishButton
  ) {
    return;
  }

  primeFishPresetAssets();
  renderFishPresetButtons();
  fishNameInput.placeholder = getActiveFishPreset().starterName;
  if (!fishNameInput.value.trim()) {
    fishNameInput.value = getActiveFishPreset().starterName;
  }

  if (oceanIllustration && !oceanIllustration.complete) {
    oceanIllustration.addEventListener("load", drawFishDesignerCanvas, { once: true });
  }

  cleanupLegacyOceanFishStorage();
  fishStudioState.savedFish = loadSavedOceanFish();
  persistOceanFish();
  renderCustomFishSchool();
  drawFishDesignerCanvas();

  if (fishStudioPanel.dataset.bound === "true") {
    return;
  }

  fishStudioPanel.dataset.bound = "true";

  fishPresetRow.addEventListener("click", event => {
    const presetButton = event.target.closest("[data-fish-preset]");
    if (!presetButton) return;
    setActiveFishPreset(presetButton.dataset.fishPreset);
  });

  fishNameInput.addEventListener("input", () => {
    drawFishDesignerCanvas();
  });

  fishDesignerCanvas.addEventListener("pointerdown", beginFishSketch);
  fishDesignerCanvas.addEventListener("pointermove", continueFishSketch);
  fishDesignerCanvas.addEventListener("pointerup", finishFishSketch);
  fishDesignerCanvas.addEventListener("pointercancel", finishFishSketch);
  fishDesignerCanvas.addEventListener("pointerleave", finishFishSketch);

  saveFishButton.addEventListener("click", saveFishToOcean);
}

function getActiveFishPreset() {
  return fishPresets.find(preset => preset.id === fishStudioState.presetId) || fishPresets[0];
}

function setActiveFishPreset(presetId) {
  const previousPreset = getActiveFishPreset();
  fishStudioState.presetId = presetId;
  const nextPreset = getActiveFishPreset();

  if (!fishNameInput) {
    renderFishPresetButtons();
    drawFishDesignerCanvas();
    return;
  }

  const currentName = fishNameInput.value.trim();
  if (!currentName || currentName === previousPreset.starterName) {
    fishNameInput.value = nextPreset.starterName;
  }

  fishNameInput.placeholder = nextPreset.starterName;
  renderFishPresetButtons();
  drawFishDesignerCanvas();
}

function renderFishPresetButtons() {
  if (!fishPresetRow) return;

  fishPresetRow.innerHTML = fishPresets.map(preset => `
    <button
      class="fish-preset-button${preset.id === fishStudioState.presetId ? " is-active" : ""}"
      type="button"
      data-fish-preset="${preset.id}"
      aria-pressed="${preset.id === fishStudioState.presetId ? "true" : "false"}"
      style="--preset-accent:${preset.accent};"
    >
      <span class="fish-preset-thumb" aria-hidden="true">
        <img class="fish-preset-art" src="${escapeAttribute(getFishPresetThumbnailSource(preset))}" alt="">
      </span>
      <span>${escapeHtml(preset.label)}</span>
    </button>
  `).join("");
}

function beginFishSketch(event) {
  if (!fishDesignerCanvas) return;
  if (event.pointerType === "mouse" && event.button !== 0) return;

  const point = getFishCanvasPoint(event);
  const stroke = {
    color: fishStudioState.brushColor,
    size: fishStudioState.brushSize,
    points: [point]
  };

  fishStudioState.activePointerId = event.pointerId;
  fishStudioState.activeStroke = stroke;
  fishStudioState.strokes = [...fishStudioState.strokes, stroke];
  fishDesignerCanvas.setPointerCapture(event.pointerId);
  drawFishDesignerCanvas();
}

function continueFishSketch(event) {
  if (fishStudioState.activePointerId !== event.pointerId || !fishStudioState.activeStroke) {
    return;
  }

  fishStudioState.activeStroke.points.push(getFishCanvasPoint(event));
  drawFishDesignerCanvas();
}

function finishFishSketch(event) {
  if (fishStudioState.activePointerId !== event.pointerId) {
    return;
  }

  if (fishDesignerCanvas?.hasPointerCapture(event.pointerId)) {
    fishDesignerCanvas.releasePointerCapture(event.pointerId);
  }

  fishStudioState.activePointerId = null;
  fishStudioState.activeStroke = null;
  drawFishDesignerCanvas();
}

function getFishCanvasPoint(event) {
  const rect = fishDesignerCanvas.getBoundingClientRect();
  return {
    x: clamp(((event.clientX - rect.left) * fishCanvasSize.width) / Math.max(rect.width, 1), 0, fishCanvasSize.width),
    y: clamp(((event.clientY - rect.top) * fishCanvasSize.height) / Math.max(rect.height, 1), 0, fishCanvasSize.height)
  };
}

function drawFishDesignerCanvas() {
  if (!fishDesignerCanvas) return;
  const ctx = fishDesignerCanvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, fishCanvasSize.width, fishCanvasSize.height);
  drawFishCanvasBackdrop(ctx);
  drawFishArtwork(ctx, getActiveFishPreset(), fishStudioState.strokes, getCurrentFishName(), {
    showShadow: false
  });

  const activeImage = getFishPresetImageRecord(getActiveFishPreset());
  if (!activeImage?.loaded) {
    ctx.fillStyle = "rgba(235, 250, 255, 0.86)";
    ctx.font = '500 12px "Inter", "Segoe UI", sans-serif';
    ctx.fillText("Loading the imported fish artwork...", 18, 200);
  }
}

function drawFishCanvasBackdrop(ctx) {
  if (oceanIllustration?.complete && oceanIllustration.naturalWidth > 0 && oceanIllustration.naturalHeight > 0) {
    drawCoverImage(
      ctx,
      oceanIllustration,
      0,
      0,
      fishCanvasSize.width,
      fishCanvasSize.height
    );
    return;
  }

  drawFishCanvasFallbackBackdrop(ctx);
}

function drawCoverImage(ctx, image, x, y, width, height) {
  const imageWidth = Math.max(image?.naturalWidth || image?.width || 1, 1);
  const imageHeight = Math.max(image?.naturalHeight || image?.height || 1, 1);
  const scale = Math.max(width / imageWidth, height / imageHeight);
  const drawWidth = imageWidth * scale;
  const drawHeight = imageHeight * scale;
  const drawX = x + ((width - drawWidth) / 2);
  const drawY = y + ((height - drawHeight) / 2);
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

function drawFishCanvasFallbackBackdrop(ctx) {
  const background = ctx.createLinearGradient(0, 0, 0, fishCanvasSize.height);
  background.addColorStop(0, "#7ce1ea");
  background.addColorStop(0.52, "#2ca9cb");
  background.addColorStop(1, "#0f4c88");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, fishCanvasSize.width, fishCanvasSize.height);

  ctx.fillStyle = "rgba(16, 186, 214, 0.22)";
  ctx.beginPath();
  ctx.moveTo(112, 34);
  ctx.bezierCurveTo(150, 12, 224, 12, 274, 34);
  ctx.bezierCurveTo(240, 49, 196, 56, 144, 55);
  ctx.quadraticCurveTo(118, 48, 112, 34);
  ctx.fill();

  ctx.fillStyle = "rgba(14, 165, 201, 0.2)";
  ctx.beginPath();
  ctx.moveTo(254, 86);
  ctx.bezierCurveTo(284, 70, 326, 72, 348, 94);
  ctx.bezierCurveTo(326, 100, 305, 110, 285, 126);
  ctx.quadraticCurveTo(266, 110, 254, 86);
  ctx.fill();

  ctx.fillStyle = "rgba(18, 159, 198, 0.2)";
  [[40, 82, 18], [62, 74, 12], [84, 90, 14]].forEach(([x, y, radius]) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  });

  drawCanvasWhaleSilhouette(ctx, 196, 58, 0.58, "rgba(22, 174, 206, 0.42)");
  drawCanvasSharkSilhouette(ctx, 304, 96, 0.34, "rgba(20, 152, 193, 0.38)");
  drawCanvasMiniFish(ctx, 56, 92, 0.18, "rgba(19, 146, 184, 0.36)");
  drawCanvasMiniFish(ctx, 82, 103, 0.14, "rgba(19, 146, 184, 0.3)");
  drawCanvasMiniFish(ctx, 108, 90, 0.16, "rgba(19, 146, 184, 0.32)");

  ctx.fillStyle = "#2199bf";
  ctx.beginPath();
  ctx.moveTo(0, 146);
  ctx.quadraticCurveTo(48, 130, 92, 142);
  ctx.quadraticCurveTo(136, 152, 186, 140);
  ctx.quadraticCurveTo(238, 126, 298, 146);
  ctx.quadraticCurveTo(332, 156, 360, 146);
  ctx.lineTo(360, 220);
  ctx.lineTo(0, 220);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#1979aa";
  ctx.beginPath();
  ctx.moveTo(0, 166);
  ctx.quadraticCurveTo(62, 148, 118, 160);
  ctx.quadraticCurveTo(160, 170, 214, 154);
  ctx.quadraticCurveTo(270, 138, 330, 170);
  ctx.lineTo(360, 220);
  ctx.lineTo(0, 220);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#173f74";
  ctx.beginPath();
  ctx.moveTo(0, 186);
  ctx.quadraticCurveTo(52, 170, 96, 184);
  ctx.quadraticCurveTo(144, 198, 195, 176);
  ctx.quadraticCurveTo(252, 150, 320, 192);
  ctx.lineTo(360, 220);
  ctx.lineTo(0, 220);
  ctx.closePath();
  ctx.fill();

  drawCanvasLeafPlant(ctx, 36, 203, 0.92, "#173f74");
  drawCanvasLeafPlant(ctx, 82, 206, 0.72, "#173f74");
  drawCanvasLeafPlant(ctx, 296, 203, 1, "#173f74");
  drawCanvasLeafPlant(ctx, 336, 210, 0.82, "#173f74");
  drawCanvasBranchCoral(ctx, 126, 205, 0.74, "#173f74");
  drawCanvasBranchCoral(ctx, 266, 208, 0.58, "#173f74");

  ctx.fillStyle = "rgba(228, 251, 255, 0.3)";
  [[34, 18, 6], [26, 8, 4], [308, 48, 5], [318, 28, 8], [296, 74, 4]].forEach(([x, y, radius]) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawCanvasLeafPlant(ctx, x, baseY, scale, color) {
  ctx.save();
  ctx.fillStyle = color;
  const leaves = [
    { offsetX: -10, width: 18, height: 54, bend: -14 },
    { offsetX: 0, width: 22, height: 76, bend: -6 },
    { offsetX: 14, width: 18, height: 62, bend: 12 }
  ];

  leaves.forEach(leaf => {
    const leafX = x + (leaf.offsetX * scale);
    const width = leaf.width * scale;
    const height = leaf.height * scale;
    ctx.beginPath();
    ctx.moveTo(leafX, baseY);
    ctx.quadraticCurveTo(leafX + (leaf.bend * scale), baseY - (height * 0.42), leafX, baseY - height);
    ctx.quadraticCurveTo(leafX - width, baseY - (height * 0.46), leafX, baseY);
    ctx.fill();
  });
  ctx.restore();
}

function drawCanvasBranchCoral(ctx, x, baseY, scale, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  ctx.lineWidth = 4 * scale;

  const branches = [
    { startX: 0, startY: 0, endX: -10, endY: -60 },
    { startX: -2, startY: -22, endX: -24, endY: -78 },
    { startX: 2, startY: -18, endX: 20, endY: -72 },
    { startX: -8, startY: -44, endX: -36, endY: -92 },
    { startX: 10, startY: -42, endX: 36, endY: -98 }
  ];

  branches.forEach(branch => {
    ctx.beginPath();
    ctx.moveTo(x + (branch.startX * scale), baseY + (branch.startY * scale));
    ctx.lineTo(x + (branch.endX * scale), baseY + (branch.endY * scale));
    ctx.stroke();
  });
  ctx.restore();
}

function drawCanvasWhaleSilhouette(ctx, centerX, centerY, scale, color) {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(-188, 24);
  ctx.quadraticCurveTo(-130, -30, -20, -32);
  ctx.quadraticCurveTo(42, -40, 118, -8);
  ctx.quadraticCurveTo(156, -18, 204, 10);
  ctx.quadraticCurveTo(190, 14, 174, 26);
  ctx.quadraticCurveTo(188, 46, 172, 68);
  ctx.quadraticCurveTo(144, 104, 84, 94);
  ctx.quadraticCurveTo(42, 124, -34, 126);
  ctx.quadraticCurveTo(-136, 128, -188, 66);
  ctx.quadraticCurveTo(-204, 42, -188, 24);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(38, -26);
  ctx.quadraticCurveTo(48, -64, 82, -76);
  ctx.quadraticCurveTo(70, -44, 74, -18);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(150, 8);
  ctx.quadraticCurveTo(182, 4, 208, 20);
  ctx.quadraticCurveTo(184, 24, 164, 42);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawCanvasSharkSilhouette(ctx, centerX, centerY, scale, color) {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(-96, 18);
  ctx.quadraticCurveTo(-52, -18, 24, -10);
  ctx.quadraticCurveTo(62, -22, 100, 8);
  ctx.quadraticCurveTo(84, 8, 68, 24);
  ctx.quadraticCurveTo(58, 46, 34, 58);
  ctx.quadraticCurveTo(-10, 70, -56, 60);
  ctx.quadraticCurveTo(-72, 76, -100, 84);
  ctx.quadraticCurveTo(-84, 52, -62, 34);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-6, -10);
  ctx.quadraticCurveTo(8, -42, 32, -46);
  ctx.quadraticCurveTo(26, -22, 20, -6);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawCanvasMiniFish(ctx, centerX, centerY, scale, color) {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(-48, 6);
  ctx.quadraticCurveTo(-26, -12, 14, -8);
  ctx.quadraticCurveTo(34, -12, 54, 6);
  ctx.quadraticCurveTo(36, 8, 20, 20);
  ctx.quadraticCurveTo(-6, 24, -28, 20);
  ctx.quadraticCurveTo(-38, 28, -56, 30);
  ctx.quadraticCurveTo(-48, 16, -40, 10);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function getFishPresetAssetSource(preset) {
  return fishPresetAssets[preset.assetKey] || "";
}

function getFishPresetThumbnailSource(preset) {
  const record = ensureFishPresetImage(preset);
  return record?.thumbSource || getFishPresetAssetSource(preset);
}

function primeFishPresetAssets() {
  fishPresets.forEach(preset => {
    ensureFishPresetImage(preset);
  });
}

function ensureFishPresetImage(preset) {
  if (fishAssetCache.has(preset.id)) {
    return fishAssetCache.get(preset.id);
  }

  const source = getFishPresetAssetSource(preset);
  if (!source) {
    const record = {
      image: null,
      loaded: false,
      error: true,
      thumbSource: "",
      cropBounds: null,
      artworkCanvas: null,
      artworkBounds: null
    };
    fishAssetCache.set(preset.id, record);
    return record;
  }

  const image = new Image();
  const record = {
    image,
    loaded: false,
    error: false,
    thumbSource: source,
    cropBounds: null,
    artworkCanvas: null,
    artworkBounds: null
  };
  image.decoding = "async";
  image.addEventListener("load", () => {
    record.loaded = true;
    const renderData = createFishPresetRenderData(image, source);
    if (renderData) {
      record.thumbSource = renderData.thumbnailSource;
      record.cropBounds = renderData.cropBounds;
      record.artworkCanvas = renderData.artworkCanvas;
      record.artworkBounds = renderData.artworkBounds;
      if (fishPresetRow) {
        renderFishPresetButtons();
      }
    }
    if (fishDesignerCanvas) {
      drawFishDesignerCanvas();
    }
  });
  image.addEventListener("error", () => {
    record.error = true;
  });
  image.src = source;
  fishAssetCache.set(preset.id, record);
  return record;
}

function getFishPresetImageRecord(preset) {
  return ensureFishPresetImage(preset);
}

function createFishPresetRenderData(image, source) {
  const sourceSize = getFishAssetRenderSize(
    source,
    Math.max(image?.naturalWidth || 0, 1),
    Math.max(image?.naturalHeight || 0, 1)
  );
  const sourceWidth = sourceSize.width;
  const sourceHeight = sourceSize.height;
  const sourceCanvas = document.createElement("canvas");
  sourceCanvas.width = sourceWidth;
  sourceCanvas.height = sourceHeight;
  const sourceContext = sourceCanvas.getContext("2d", { willReadFrequently: true });

  if (!sourceContext) {
    return null;
  }

  sourceContext.clearRect(0, 0, sourceWidth, sourceHeight);
  sourceContext.drawImage(image, 0, 0, sourceWidth, sourceHeight);

  const artworkBounds = getOpaqueCanvasBounds(sourceContext, sourceWidth, sourceHeight);
  if (!artworkBounds) {
    return null;
  }

  const bleed = Math.max(18, Math.round(Math.max(artworkBounds.width, artworkBounds.height) * 0.1));
  const cropLeft = Math.max(artworkBounds.left - bleed, 0);
  const cropTop = Math.max(artworkBounds.top - bleed, 0);
  const cropRight = Math.min(artworkBounds.right + bleed, sourceWidth - 1);
  const cropBottom = Math.min(artworkBounds.bottom + bleed, sourceHeight - 1);
  const cropWidth = Math.max((cropRight - cropLeft) + 1, 1);
  const cropHeight = Math.max((cropBottom - cropTop) + 1, 1);
  const artworkPadding = Math.max(12, Math.round(Math.max(cropWidth, cropHeight) * 0.04));
  const artworkCanvas = document.createElement("canvas");
  artworkCanvas.width = cropWidth + (artworkPadding * 2);
  artworkCanvas.height = cropHeight + (artworkPadding * 2);
  const artworkContext = artworkCanvas.getContext("2d");

  if (!artworkContext) {
    return null;
  }

  artworkContext.clearRect(0, 0, artworkCanvas.width, artworkCanvas.height);
  artworkContext.drawImage(
    sourceCanvas,
    cropLeft,
    cropTop,
    cropWidth,
    cropHeight,
    artworkPadding,
    artworkPadding,
    cropWidth,
    cropHeight
  );

  const targetCanvas = document.createElement("canvas");
  targetCanvas.width = fishPresetThumbnailSize.width;
  targetCanvas.height = fishPresetThumbnailSize.height;
  const targetContext = targetCanvas.getContext("2d");

  if (!targetContext) {
    return null;
  }

  const maxDrawWidth = targetCanvas.width * 0.9;
  const maxDrawHeight = targetCanvas.height * 0.82;
  const scale = Math.min(maxDrawWidth / artworkCanvas.width, maxDrawHeight / artworkCanvas.height);
  const drawWidth = artworkCanvas.width * scale;
  const drawHeight = artworkCanvas.height * scale;
  const drawX = (targetCanvas.width - drawWidth) / 2;
  const drawY = (targetCanvas.height - drawHeight) / 2;

  targetContext.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
  targetContext.drawImage(
    artworkCanvas,
    0,
    0,
    artworkCanvas.width,
    artworkCanvas.height,
    drawX,
    drawY,
    drawWidth,
    drawHeight
  );

  return {
    artworkCanvas,
    artworkBounds: {
      width: artworkCanvas.width,
      height: artworkCanvas.height
    },
    thumbnailSource: targetCanvas.toDataURL("image/png"),
    cropBounds: {
      left: cropLeft - artworkPadding,
      top: cropTop - artworkPadding,
      width: artworkCanvas.width,
      height: artworkCanvas.height,
      visualCenterX: (artworkBounds.centerX - cropLeft) + artworkPadding,
      visualCenterY: (artworkBounds.centerY - cropTop) + artworkPadding
    }
  };
}

function getFishAssetRenderSize(source, fallbackWidth, fallbackHeight) {
  const safeFallbackWidth = Math.max(fallbackWidth || 0, 1);
  const safeFallbackHeight = Math.max(fallbackHeight || 0, 1);
  const svgMarkup = decodeSvgDataUri(source);

  if (!svgMarkup) {
    return {
      width: safeFallbackWidth,
      height: safeFallbackHeight
    };
  }

  const viewBoxMatch = svgMarkup.match(/viewBox\s*=\s*["']([^"']+)["']/i);
  if (!viewBoxMatch) {
    return {
      width: safeFallbackWidth,
      height: safeFallbackHeight
    };
  }

  const parts = viewBoxMatch[1]
    .trim()
    .split(/[\s,]+/)
    .map(Number);

  if (parts.length < 4 || parts.slice(0, 4).some(value => !Number.isFinite(value))) {
    return {
      width: safeFallbackWidth,
      height: safeFallbackHeight
    };
  }

  const viewBoxWidth = Math.max(parts[2], 1);
  const viewBoxHeight = Math.max(parts[3], 1);
  const longEdgeTarget = 1200;
  const scale = longEdgeTarget / Math.max(viewBoxWidth, viewBoxHeight);

  return {
    width: Math.max(Math.round(viewBoxWidth * scale), 1),
    height: Math.max(Math.round(viewBoxHeight * scale), 1)
  };
}

function decodeSvgDataUri(source) {
  if (typeof source !== "string" || !source.startsWith("data:image/svg+xml")) {
    return "";
  }

  const base64Prefix = "data:image/svg+xml;base64,";
  if (source.startsWith(base64Prefix)) {
    try {
      return atob(source.slice(base64Prefix.length));
    } catch (_error) {
      return "";
    }
  }

  const commaIndex = source.indexOf(",");
  if (commaIndex === -1) {
    return "";
  }

  try {
    return decodeURIComponent(source.slice(commaIndex + 1));
  } catch (_error) {
    return "";
  }
}

function getOpaqueCanvasBounds(context, width, height) {
  const imageData = context.getImageData(0, 0, width, height);
  const { data } = imageData;
  let left = width;
  let right = -1;
  let top = height;
  let bottom = -1;
  let alphaWeight = 0;
  let weightedX = 0;
  let weightedY = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = data[((y * width) + x) * 4 + 3];
      if (alpha === 0) {
        continue;
      }

      if (x < left) left = x;
      if (x > right) right = x;
      if (y < top) top = y;
      if (y > bottom) bottom = y;

      const weight = alpha / 255;
      alphaWeight += weight;
      weightedX += x * weight;
      weightedY += y * weight;
    }
  }

  if (right < left || bottom < top) {
    return null;
  }

  return {
    left,
    right,
    top,
    bottom,
    centerX: alphaWeight ? (weightedX / alphaWeight) : (left + right) / 2,
    centerY: alphaWeight ? (weightedY / alphaWeight) : (top + bottom) / 2,
    width: (right - left) + 1,
    height: (bottom - top) + 1
  };
}

function getFishArtworkBox(imageRecord) {
  const maxWidth = 316;
  const maxHeight = 156;
  const sourceWidth = Math.max(imageRecord?.artworkBounds?.width || imageRecord?.cropBounds?.width || imageRecord?.image?.naturalWidth || 300, 1);
  const sourceHeight = Math.max(imageRecord?.artworkBounds?.height || imageRecord?.cropBounds?.height || imageRecord?.image?.naturalHeight || 170, 1);
  const scale = Math.min(maxWidth / sourceWidth, maxHeight / sourceHeight);
  const width = sourceWidth * scale;
  const height = sourceHeight * scale;

  return {
    x: (fishCanvasSize.width - width) / 2,
    y: 42 + ((maxHeight - height) / 2),
    width,
    height
  };
}

function drawFishArtworkPlaceholder(ctx, preset, fishName) {
  const box = getFishArtworkBox(null);
  const glow = ctx.createLinearGradient(box.x, box.y, box.x + box.width, box.y + box.height);
  glow.addColorStop(0, `${preset.accent}cc`);
  glow.addColorStop(1, "rgba(255, 255, 255, 0.35)");

  ctx.save();
  ctx.fillStyle = "rgba(7, 34, 55, 0.22)";
  ctx.beginPath();
  ctx.ellipse(box.x + (box.width / 2), box.y + box.height + 12, box.width * 0.24, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = glow;
  drawRoundedRectPath(ctx, box.x + 34, box.y + 30, box.width - 68, box.height - 60, 999);
  ctx.fill();
  ctx.restore();

  drawFishNameRibbon(ctx, fishName, preset);
}

function drawFishArtwork(ctx, preset, strokes, fishName, options = {}) {
  const imageRecord = getFishPresetImageRecord(preset);
  if (!imageRecord?.image || !imageRecord.loaded) {
    drawFishArtworkPlaceholder(ctx, preset, fishName);
    return;
  }

  const box = getFishArtworkBox(imageRecord);
  const showGhostLayer = options.showGhostLayer !== false;
  const showNameRibbon = options.showNameRibbon !== false;
  if (options.showShadow) {
    ctx.save();
    ctx.fillStyle = "rgba(5, 18, 30, 0.18)";
    ctx.beginPath();
    ctx.ellipse(
      box.x + (box.width / 2),
      box.y + box.height + 10,
      Math.max(36, box.width * 0.22),
      Math.max(10, box.height * 0.08),
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.restore();
  }

  drawFishPresetImage(ctx, imageRecord, box);

  if (strokes.length) {
    const overlayCanvas = document.createElement("canvas");
    overlayCanvas.width = fishCanvasSize.width;
    overlayCanvas.height = fishCanvasSize.height;
    const overlayContext = overlayCanvas.getContext("2d");

    if (overlayContext) {
      drawFishStrokes(overlayContext, strokes, { opacity: 0.82 });
      overlayContext.globalCompositeOperation = "destination-in";
      drawFishPresetImage(overlayContext, imageRecord, box);

      ctx.save();
      ctx.globalAlpha = 0.94;
      ctx.drawImage(overlayCanvas, 0, 0);
      ctx.restore();
    }
  }

  if (showGhostLayer) {
    ctx.save();
    ctx.globalAlpha = 0.16;
    drawFishPresetImage(ctx, imageRecord, box);
    ctx.restore();
  }

  if (showNameRibbon) {
    drawFishNameRibbon(ctx, fishName, preset);
  }
}

function drawFishPresetImage(ctx, imageRecord, box) {
  const artworkCanvas = imageRecord?.artworkCanvas;
  if (artworkCanvas) {
    ctx.drawImage(artworkCanvas, box.x, box.y, box.width, box.height);
    return;
  }

  const cropBounds = imageRecord?.cropBounds;
  if (!imageRecord?.image) {
    return;
  }

  if (!cropBounds) {
    ctx.drawImage(imageRecord.image, box.x, box.y, box.width, box.height);
    return;
  }

  const scale = box.width / Math.max(cropBounds.width, 1);
  const visualCenterX = Number.isFinite(cropBounds.visualCenterX)
    ? cropBounds.visualCenterX
    : cropBounds.width / 2;
  const visualCenterY = Number.isFinite(cropBounds.visualCenterY)
    ? cropBounds.visualCenterY
    : cropBounds.height / 2;
  const centeredDrawX = clamp(
    box.x + (box.width / 2) - (visualCenterX * scale),
    12,
    fishCanvasSize.width - box.width - 12
  );
  const centeredDrawY = clamp(
    box.y + (box.height / 2) - (visualCenterY * scale),
    18,
    fishCanvasSize.height - box.height - 10
  );

  ctx.drawImage(
    imageRecord.image,
    cropBounds.left,
    cropBounds.top,
    cropBounds.width,
    cropBounds.height,
    centeredDrawX,
    centeredDrawY,
    box.width,
    box.height
  );
}

function drawFishBase(ctx, preset) {
  traceFishSilhouette(ctx, preset);
  ctx.fillStyle = preset.body;
  ctx.fill();

  ctx.save();
  traceFishSilhouette(ctx, preset);
  ctx.clip();

  ctx.fillStyle = preset.fin;
  ctx.beginPath();
  ctx.ellipse(126, 112, 42, 48, 0.1, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = preset.stripe;
  ctx.beginPath();
  ctx.ellipse(194, 96, 72, 22, -0.12, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = preset.accent;
  ctx.beginPath();
  ctx.ellipse(224, 126, 58, 18, 0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawFishPattern(ctx, preset) {
  switch (preset.shape) {
    case "dart":
      drawDartPattern(ctx, preset);
      return;
    case "fan":
      drawFanPattern(ctx, preset);
      return;
    default:
      drawKoiPattern(ctx, preset);
  }
}

function drawKoiPattern(ctx, preset) {
  ctx.fillStyle = preset.accent;
  [[168, 92, 22, 14], [208, 118, 16, 12], [134, 122, 18, 11]].forEach(([x, y, radiusX, radiusY]) => {
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, -0.18, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.strokeStyle = preset.fin;
  ctx.lineWidth = 5;
  for (let index = 0; index < 4; index += 1) {
    const x = 126 + (index * 30);
    ctx.beginPath();
    ctx.moveTo(x, 78);
    ctx.quadraticCurveTo(x - 6, 111, x + 8, 142);
    ctx.stroke();
  }
}

function drawDartPattern(ctx, preset) {
  ctx.strokeStyle = preset.fin;
  ctx.lineWidth = 6;
  for (let index = 0; index < 5; index += 1) {
    const x = 106 + (index * 34);
    ctx.beginPath();
    ctx.moveTo(x, 76);
    ctx.lineTo(x + 24, 144);
    ctx.stroke();
  }

  ctx.strokeStyle = preset.accent;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(120, 110);
  ctx.quadraticCurveTo(196, 86, 274, 110);
  ctx.stroke();
}

function drawFanPattern(ctx, preset) {
  ctx.strokeStyle = preset.fin;
  ctx.lineWidth = 5;
  for (let index = 0; index < 4; index += 1) {
    const radius = 24 + (index * 13);
    ctx.beginPath();
    ctx.arc(194, 112, radius, Math.PI * 0.88, Math.PI * 0.1, true);
    ctx.stroke();
  }

  ctx.fillStyle = preset.accent;
  [[174, 94, 7], [206, 86, 8], [230, 118, 6], [166, 132, 9]].forEach(([x, y, radius]) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawFishStrokes(ctx, strokes, options = {}) {
  const opacity = clamp(Number(options.opacity) || 1, 0.1, 1);
  strokes.forEach(stroke => {
    if (!stroke.points?.length) return;

    ctx.strokeStyle = stroke.color.startsWith("#")
      ? hexToRgba(stroke.color, opacity)
      : stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    stroke.points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
        return;
      }

      ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  });
}

function drawFishOutline(ctx, preset) {
  traceFishSilhouette(ctx, preset);
  ctx.lineWidth = 2.2;
  ctx.strokeStyle = "rgba(16, 46, 83, 0.42)";
  ctx.stroke();
}

function drawFishDetails(ctx, preset) {
  const detailMap = {
    koi: { eyeX: 260, eyeY: 100, gillX: 232, gillY: 110, gillCurve: 18 },
    dart: { eyeX: 272, eyeY: 104, gillX: 244, gillY: 110, gillCurve: 14 },
    fan: { eyeX: 252, eyeY: 101, gillX: 226, gillY: 112, gillCurve: 16 }
  };
  const detail = detailMap[preset.shape] || detailMap.koi;

  ctx.strokeStyle = "rgba(18, 55, 96, 0.42)";
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(detail.gillX, detail.gillY - 22);
  ctx.quadraticCurveTo(detail.gillX - detail.gillCurve, detail.gillY, detail.gillX, detail.gillY + 18);
  ctx.stroke();

  ctx.fillStyle = "#0f2136";
  ctx.beginPath();
  ctx.arc(detail.eyeX, detail.eyeY, 5.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 255, 255, 0.78)";
  ctx.beginPath();
  ctx.arc(detail.eyeX + 2, detail.eyeY - 2, 1.6, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(15, 33, 54, 0.36)";
  ctx.beginPath();
  ctx.moveTo(detail.eyeX + 16, detail.eyeY + 8);
  ctx.quadraticCurveTo(detail.eyeX + 23, detail.eyeY + 11, detail.eyeX + 26, detail.eyeY + 7);
  ctx.stroke();
}

function drawFishNameRibbon(ctx, fishName, preset) {
  const label = (fishName || preset.starterName || preset.label).trim().slice(0, 24);
  if (!label) return;

  ctx.save();
  ctx.font = '700 12px "Inter", "Segoe UI", sans-serif';
  const width = clamp(ctx.measureText(label).width + 24, 70, 156);
  const x = (fishCanvasSize.width - width) / 2;
  const y = 24;

  drawRoundedRectPath(ctx, x, y, width, 26, 10);
  ctx.fillStyle = "rgba(21, 63, 104, 0.82)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.24)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "#f5fbff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x + (width / 2), y + 13);
  ctx.restore();
}

function traceFishSilhouette(ctx, preset) {
  switch (preset.shape) {
    case "dart":
      traceDartSilhouette(ctx);
      return;
    case "fan":
      traceFanSilhouette(ctx);
      return;
    default:
      traceKoiSilhouette(ctx);
  }
}

function traceKoiSilhouette(ctx) {
  ctx.beginPath();
  ctx.ellipse(192, 110, 86, 52, 0, 0, Math.PI * 2);

  ctx.moveTo(118, 110);
  ctx.quadraticCurveTo(76, 72, 44, 110);
  ctx.quadraticCurveTo(76, 148, 118, 110);

  ctx.moveTo(154, 76);
  ctx.quadraticCurveTo(186, 30, 224, 80);
  ctx.quadraticCurveTo(188, 74, 154, 76);

  ctx.moveTo(160, 144);
  ctx.quadraticCurveTo(194, 186, 226, 136);
  ctx.quadraticCurveTo(190, 144, 160, 144);

  ctx.moveTo(210, 126);
  ctx.quadraticCurveTo(236, 158, 252, 118);
  ctx.quadraticCurveTo(230, 120, 210, 126);
}

function traceDartSilhouette(ctx) {
  ctx.beginPath();
  ctx.moveTo(90, 110);
  ctx.quadraticCurveTo(150, 54, 244, 74);
  ctx.quadraticCurveTo(306, 86, 324, 110);
  ctx.quadraticCurveTo(306, 134, 244, 146);
  ctx.quadraticCurveTo(150, 166, 90, 110);

  ctx.moveTo(112, 110);
  ctx.quadraticCurveTo(76, 72, 40, 110);
  ctx.quadraticCurveTo(76, 148, 112, 110);

  ctx.moveTo(156, 82);
  ctx.quadraticCurveTo(190, 42, 226, 88);
  ctx.quadraticCurveTo(186, 82, 156, 82);

  ctx.moveTo(170, 138);
  ctx.quadraticCurveTo(202, 168, 232, 130);
  ctx.quadraticCurveTo(198, 136, 170, 138);
}

function traceFanSilhouette(ctx) {
  ctx.beginPath();
  ctx.ellipse(194, 112, 72, 58, 0, 0, Math.PI * 2);

  ctx.moveTo(126, 112);
  ctx.quadraticCurveTo(88, 58, 50, 112);
  ctx.quadraticCurveTo(88, 166, 126, 112);

  ctx.moveTo(152, 68);
  ctx.quadraticCurveTo(196, 28, 234, 86);
  ctx.quadraticCurveTo(190, 72, 152, 68);

  ctx.moveTo(156, 154);
  ctx.quadraticCurveTo(198, 196, 236, 136);
  ctx.quadraticCurveTo(194, 150, 156, 154);

  ctx.moveTo(218, 124);
  ctx.quadraticCurveTo(244, 150, 258, 116);
  ctx.quadraticCurveTo(238, 118, 218, 124);
}

function drawRoundedRectPath(ctx, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  ctx.closePath();
}

function getCurrentFishName() {
  return (fishNameInput?.value || "").trim().slice(0, 24) || getActiveFishPreset().starterName;
}

function saveFishToOcean() {
  if (!customFishLayer) return;

  const activePreset = getActiveFishPreset();
  const activeImage = getFishPresetImageRecord(activePreset);
  if (!activeImage?.loaded) {
    return;
  }

  const fishName = getCurrentFishName();
  const artwork = exportCurrentFishArtwork(fishName);
  if (!artwork) {
    return;
  }

  fishStudioState.savedFish = pruneOceanFishRecords([
    ...fishStudioState.savedFish,
    createOceanFishRecord(fishName, artwork, activePreset)
  ]);
  persistOceanFish();
  renderCustomFishSchool();
  fishStudioState.strokes = [];
  drawFishDesignerCanvas();
}

function exportCurrentFishArtwork(fishName) {
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = fishCanvasSize.width;
  exportCanvas.height = fishCanvasSize.height;
  const ctx = exportCanvas.getContext("2d");
  if (!ctx) return "";

  drawFishArtwork(ctx, getActiveFishPreset(), fishStudioState.strokes, fishName, {
    showShadow: false,
    showGhostLayer: false,
    showNameRibbon: false
  });

  const artworkBounds = getOpaqueCanvasBounds(ctx, fishCanvasSize.width, fishCanvasSize.height);
  if (!artworkBounds) {
    return "";
  }

  const bleed = 24;
  const cropLeft = Math.max(artworkBounds.left - bleed, 0);
  const cropTop = Math.max(artworkBounds.top - bleed, 0);
  const cropRight = Math.min(artworkBounds.right + bleed, fishCanvasSize.width - 1);
  const cropBottom = Math.min(artworkBounds.bottom + bleed, fishCanvasSize.height - 1);
  const cropWidth = Math.max((cropRight - cropLeft) + 1, 1);
  const cropHeight = Math.max((cropBottom - cropTop) + 1, 1);
  const exportPadding = 12;
  const croppedCanvas = document.createElement("canvas");
  croppedCanvas.width = cropWidth + (exportPadding * 2);
  croppedCanvas.height = cropHeight + (exportPadding * 2);
  const croppedContext = croppedCanvas.getContext("2d");

  if (!croppedContext) {
    return exportCanvas.toDataURL("image/png");
  }

  croppedContext.clearRect(0, 0, croppedCanvas.width, croppedCanvas.height);
  croppedContext.drawImage(
    exportCanvas,
    cropLeft,
    cropTop,
    cropWidth,
    cropHeight,
    exportPadding,
    exportPadding,
    cropWidth,
    cropHeight
  );

  return croppedCanvas.toDataURL("image/png");
}

function createOceanFishRecord(name, image, preset) {
  const depthScale = Math.random() * 0.34 + 0.82;
  const drift = Math.round(10 + (Math.random() * 16));
  const createdAt = Date.now();
  return {
    id: `fish-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    image,
    presetId: preset?.id || "",
    monthKey: getCurrentOceanMonthKey(new Date(createdAt)),
    createdAt,
    top: Math.round(16 + (Math.random() * 50)),
    size: Math.round((112 + (Math.random() * 58)) * depthScale),
    duration: Number((24 + (Math.random() * 16)).toFixed(2)),
    delay: Number((Math.random() * -24).toFixed(2)),
    bobDuration: Number((5.6 + (Math.random() * 4.4)).toFixed(2)),
    swayDuration: Number((6.4 + (Math.random() * 4.2)).toFixed(2)),
    rollDuration: Number((4.8 + (Math.random() * 3.2)).toFixed(2)),
    finDuration: Number((2.2 + (Math.random() * 1.8)).toFixed(2)),
    drift,
    travelLiftOne: Math.round(drift * -0.4),
    travelDropOne: Math.round(drift * 0.3),
    travelLiftTwo: Math.round(drift * -0.18),
    travelDropTwo: Math.round(drift * 0.1),
    floatLift: Math.round(drift * -0.38),
    floatDrop: Math.round(drift * 0.22),
    tilt: Number((1.6 + (Math.random() * 3.2)).toFixed(2)),
    restLeft: Number((12 + (Math.random() * 64)).toFixed(2)),
    depthScale: Number(depthScale.toFixed(2)),
    direction: "forward"
  };
}

function renderCustomFishSchool() {
  if (!customFishLayer) return;

  customFishLayer.innerHTML = fishStudioState.savedFish.map(fish => `
    <div
      class="user-fish"
      style="
        --fish-top:${fish.top}%;
        --fish-size:${fish.size}px;
        --fish-duration:${fish.duration}s;
        --fish-delay:${fish.delay}s;
        --fish-bob-duration:${fish.bobDuration}s;
        --fish-sway-duration:${fish.swayDuration}s;
        --fish-roll-duration:${fish.rollDuration}s;
        --fish-fin-duration:${fish.finDuration}s;
        --fish-travel-lift-1:${fish.travelLiftOne}px;
        --fish-travel-drop-1:${fish.travelDropOne}px;
        --fish-travel-lift-2:${fish.travelLiftTwo}px;
        --fish-travel-drop-2:${fish.travelDropTwo}px;
        --fish-float-up:${fish.floatLift}px;
        --fish-float-down:${fish.floatDrop}px;
        --fish-tilt:${fish.tilt}deg;
        --fish-rest-left:${fish.restLeft}%;
        --fish-depth-scale:${fish.depthScale};
      "
    >
      <div class="user-fish-path">
        <div class="user-fish-swimmer">
          <div class="user-fish-figure">
            <img class="user-fish-art" src="${escapeAttribute(fish.image)}" alt="${escapeAttribute(`${fish.name} swimming in the ocean`)}">
          </div>
          <span class="user-fish-caption">${escapeHtml(fish.name)}</span>
        </div>
      </div>
    </div>
  `).join("");
}

function loadSavedOceanFish() {
  try {
    const raw = JSON.parse(window.localStorage.getItem(fishStorageKey) || "[]");
    if (!Array.isArray(raw)) {
      return [];
    }

    return pruneOceanFishRecords(
      raw
        .map(sanitizeOceanFishRecord)
        .filter(Boolean)
    );
  } catch (_error) {
    return [];
  }
}

function sanitizeOceanFishRecord(fish) {
  if (!fish || typeof fish.image !== "string" || !fish.image) {
    return null;
  }

  const monthKey = typeof fish.monthKey === "string" ? fish.monthKey : "";
  if (!/^\d{4}-\d{2}$/.test(monthKey)) {
    return null;
  }

  const createdAt = Number(fish.createdAt);

  return {
    id: String(fish.id || `fish-${Date.now()}`),
    name: String(fish.name || "Ocean Fish").slice(0, 24),
    image: fish.image,
    presetId: String(fish.presetId || ""),
    monthKey,
    createdAt: Number.isFinite(createdAt) ? createdAt : 0,
    top: clamp(Number(fish.top) || 24, 12, 68),
    size: clamp(Number(fish.size) || 132, 88, 220),
    duration: clamp(Number(fish.duration) || 28, 16, 56),
    delay: clamp(Number(fish.delay) || 0, -24, 0),
    bobDuration: clamp(Number(fish.bobDuration) || 7.2, 3.2, 12),
    swayDuration: clamp(Number(fish.swayDuration) || 7.6, 4, 14),
    rollDuration: clamp(Number(fish.rollDuration) || 6.1, 3, 10),
    finDuration: clamp(Number(fish.finDuration) || 3.1, 1.8, 5),
    drift: clamp(Number(fish.drift) || 16, 6, 28),
    travelLiftOne: clamp(Number(fish.travelLiftOne) || -6, -18, -2),
    travelDropOne: clamp(Number(fish.travelDropOne) || 5, 2, 12),
    travelLiftTwo: clamp(Number(fish.travelLiftTwo) || -3, -10, -1),
    travelDropTwo: clamp(Number(fish.travelDropTwo) || 2, 1, 6),
    floatLift: clamp(Number(fish.floatLift) || -6, -16, -2),
    floatDrop: clamp(Number(fish.floatDrop) || 4, 1, 10),
    tilt: clamp(Number(fish.tilt) || 2.6, 1, 6),
    restLeft: clamp(Number(fish.restLeft) || 38, 8, 82),
    depthScale: clamp(Number(fish.depthScale) || 1, 0.7, 1.25),
    direction: "forward"
  };
}

function persistOceanFish() {
  try {
    fishStudioState.savedFish = pruneOceanFishRecords(fishStudioState.savedFish);
    window.localStorage.setItem(fishStorageKey, JSON.stringify(fishStudioState.savedFish));
  } catch (_error) {
    // Ignore storage failures and keep the current session fish visible.
  }
}

function getCurrentOceanMonthKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function pruneOceanFishRecords(records) {
  const currentMonthKey = getCurrentOceanMonthKey();
  return records
    .filter(fish => fish && fish.monthKey === currentMonthKey)
    .sort((leftFish, rightFish) => leftFish.createdAt - rightFish.createdAt)
    .slice(-fishMonthlyLimit);
}

function cleanupLegacyOceanFishStorage() {
  try {
    legacyFishStorageKeys.forEach(storageKey => {
      if (storageKey !== fishStorageKey) {
        window.localStorage.removeItem(storageKey);
      }
    });
  } catch (_error) {
    // Ignore cleanup failures and let the new storage take over.
  }
}

function hexToRgba(hex, alpha) {
  const normalized = hex.replace("#", "");
  const safeHex = normalized.length === 3
    ? normalized.split("").map(character => `${character}${character}`).join("")
    : normalized.padEnd(6, "0").slice(0, 6);
  const red = Number.parseInt(safeHex.slice(0, 2), 16);
  const green = Number.parseInt(safeHex.slice(2, 4), 16);
  const blue = Number.parseInt(safeHex.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function renderDesktopIcons() {
  const appIcons = desktopApps.map(app => `
    <button class="desktop-shortcut" type="button" data-shortcut-id="app-${app.id}" data-app-launch="${app.id}" aria-label="Open ${escapeHtml(app.label)}">
      <span class="desktop-shortcut-thumb system-thumb">
        <span class="ms-icon" aria-hidden="true">${app.icon}</span>
      </span>
      <span class="desktop-shortcut-label">
        <strong>${escapeHtml(app.label)}</strong>
        <span>${escapeHtml(app.subtitle)}</span>
      </span>
    </button>
  `);

  const projectIcons = projectData.map(project => `
    <button class="desktop-shortcut" type="button" data-shortcut-id="project-${project.id}" data-project-launch="${project.id}" aria-label="Open ${escapeHtml(project.title)}">
      <span class="desktop-shortcut-thumb">
        <img class="desktop-shortcut-image" src="${escapeAttribute(project.coverImage)}" alt="" loading="lazy">
        <span class="shortcut-badge">
          <span class="ms-icon" aria-hidden="true">&#xE8B9;</span>
        </span>
      </span>
      <span class="desktop-shortcut-label">
        <strong>${escapeHtml(project.desktopLabel)}</strong>
        <span>${escapeHtml(project.category)}</span>
      </span>
    </button>
  `);

  desktopIcons.innerHTML = [...appIcons, ...projectIcons].join("");
  initializeDesktopShortcuts();
}

function renderProjectCard(project) {
  return `
    <article class="project-card" data-project="${project.id}" tabindex="0" aria-label="Open ${escapeHtml(project.title)}">
      <div class="project-thumb">
        <img class="project-thumb-image" src="${escapeAttribute(project.coverImage)}" alt="" loading="lazy">
      </div>
      <div class="project-card-header">
        <div>
          <h3>${escapeHtml(project.title)}</h3>
          <p class="project-meta">${escapeHtml(project.category)}</p>
        </div>
        <span class="project-chip">
          ${renderUiIcon("&#xE8A7;")}
          <span>Open</span>
        </span>
      </div>
      <p class="project-meta">${escapeHtml(project.overview)}</p>
    </article>
  `;
}

function renderPhotographyCard(photo, index) {
  const tiltValues = ["-2.2deg", "1.6deg", "-1.4deg", "2.1deg", "-1deg", "1.2deg"];
  const tags = [photo.category];

  return `
    <article class="photo-card" style="--gallery-tilt:${tiltValues[index % tiltValues.length]};">
      <div class="photo-card-frame">
        <img class="photo-card-image" src="${escapeAttribute(photo.image)}" alt="${escapeAttribute(`${photo.title} archive cover`)}" loading="lazy">
      </div>
      <div class="photo-card-body">
        <p class="eyebrow">${escapeHtml(photo.category)}</p>
        <h3>${escapeHtml(photo.title)}</h3>
        <p class="project-meta">${escapeHtml(photo.description)}</p>
        <div class="tag-row">
          ${tags.map(tag => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join("")}
        </div>
      </div>
    </article>
  `;
}

function initializeDesktopShortcuts() {
  const shortcuts = Array.from(desktopIcons.querySelectorAll(".desktop-shortcut"));
  shortcuts.forEach((shortcut, index) => {
    const shortcutId = shortcut.dataset.shortcutId;
    if (!shortcutSlots.has(shortcutId)) {
      shortcutSlots.set(shortcutId, index);
    }
  });

  bindDesktopShortcutDragging(shortcuts);
  applyShortcutPositions();
}

function bindDesktopShortcutDragging(shortcuts) {
  shortcuts.forEach(shortcut => {
    if (shortcut.dataset.dragBound === "true") return;
    shortcut.dataset.dragBound = "true";

    shortcut.addEventListener("pointerdown", event => startShortcutDrag(event, shortcut));
    shortcut.addEventListener("click", event => {
      if (shortcut.dataset.justDragged === "true") {
        event.preventDefault();
        event.stopPropagation();
        shortcut.dataset.justDragged = "false";
      }
    }, true);
  });
}

function getDesktopGridMetrics() {
  const itemWidth = 96;
  const itemHeight = 108;
  const gapX = 16;
  const gapY = 12;
  const stepX = itemWidth + gapX;
  const stepY = itemHeight + gapY;
  const totalItems = desktopIcons.querySelectorAll(".desktop-shortcut").length;
  const availableHeight = Math.max(desktopIcons.clientHeight, window.innerHeight - 158);
  const rows = Math.max(1, Math.floor((availableHeight + gapY) / stepY));
  const columns = Math.max(1, Math.ceil(totalItems / rows));

  return { itemWidth, itemHeight, gapX, gapY, stepX, stepY, columns, rows, totalItems, availableHeight };
}

function applyShortcutPositions(skipShortcutId = "") {
  const metrics = getDesktopGridMetrics();
  const minimumHeight = (metrics.rows * metrics.stepY) + 24;
  desktopIcons.style.minHeight = `${Math.max(minimumHeight, window.innerHeight - 158)}px`;

  desktopIcons.querySelectorAll(".desktop-shortcut").forEach(shortcut => {
    const shortcutId = shortcut.dataset.shortcutId;
    if (shortcutId === skipShortcutId) return;

    const slot = shortcutSlots.get(shortcutId) ?? 0;
    const position = getShortcutSlotPosition(slot, metrics);
    shortcut.style.left = `${position.left}px`;
    shortcut.style.top = `${position.top}px`;
  });
}

function getShortcutSlotPosition(slot, metrics) {
  const row = slot % metrics.rows;
  const column = Math.floor(slot / metrics.rows);

  return {
    left: column * metrics.stepX,
    top: row * metrics.stepY
  };
}

function startShortcutDrag(event, shortcut) {
  if (window.innerWidth <= 760) return;
  if (event.button !== 0) return;

  event.preventDefault();
  shortcut.focus();

  const metrics = getDesktopGridMetrics();
  const shortcutId = shortcut.dataset.shortcutId;
  const originalSlot = shortcutSlots.get(shortcutId) ?? 0;
  const startLeft = parseFloat(shortcut.style.left) || 0;
  const startTop = parseFloat(shortcut.style.top) || 0;
  const pointerStartX = event.clientX;
  const pointerStartY = event.clientY;
  let hasMoved = false;

  shortcut.classList.add("dragging");
  shortcut.setPointerCapture(event.pointerId);

  function onPointerMove(moveEvent) {
    const deltaX = moveEvent.clientX - pointerStartX;
    const deltaY = moveEvent.clientY - pointerStartY;

    if (!hasMoved && Math.hypot(deltaX, deltaY) > 4) {
      hasMoved = true;
    }

    const maxLeft = Math.max(0, desktopIcons.clientWidth - metrics.itemWidth);
    const maxTop = Math.max(0, desktopIcons.clientHeight - metrics.itemHeight);
    const left = clamp(startLeft + deltaX, 0, maxLeft);
    const top = clamp(startTop + deltaY, 0, maxTop);

    shortcut.style.left = `${left}px`;
    shortcut.style.top = `${top}px`;
  }

  function onPointerUp() {
    shortcut.classList.remove("dragging");
    shortcut.releasePointerCapture(event.pointerId);
    shortcut.removeEventListener("pointermove", onPointerMove);
    shortcut.removeEventListener("pointerup", onPointerUp);
    shortcut.removeEventListener("pointercancel", onPointerUp);

    if (!hasMoved) {
      applyShortcutPositions();
      return;
    }

    const left = parseFloat(shortcut.style.left) || 0;
    const top = parseFloat(shortcut.style.top) || 0;
    const targetSlot = getNearestShortcutSlot(left, top, metrics);
    const occupyingId = getShortcutIdAtSlot(targetSlot, shortcutId);

    if (occupyingId) {
      shortcutSlots.set(occupyingId, originalSlot);
    }

    shortcutSlots.set(shortcutId, targetSlot);
    shortcut.dataset.justDragged = "true";
    window.setTimeout(() => {
      shortcut.dataset.justDragged = "false";
    }, 220);
    applyShortcutPositions();
  }

  shortcut.addEventListener("pointermove", onPointerMove);
  shortcut.addEventListener("pointerup", onPointerUp);
  shortcut.addEventListener("pointercancel", onPointerUp);
}

function getNearestShortcutSlot(left, top, metrics) {
  const maxColumn = Math.max(0, Math.ceil(metrics.totalItems / metrics.rows) - 1);
  const column = clamp(Math.round(left / metrics.stepX), 0, maxColumn);
  const row = clamp(Math.round(top / metrics.stepY), 0, metrics.rows - 1);
  return clamp((column * metrics.rows) + row, 0, metrics.totalItems - 1);
}

function getShortcutIdAtSlot(slot, ignoreId = "") {
  for (const [shortcutId, shortcutSlot] of shortcutSlots.entries()) {
    if (shortcutId !== ignoreId && shortcutSlot === slot) {
      return shortcutId;
    }
  }

  return "";
}

function buildProjectDefinition(project) {
  const images = project.detailImages.slice(0, 6);
  const figureCaptions = buildFigureCaptions(project);
  const heroImage = images[0];
  const storyImages = images.slice(1);
  const storyPagesMarkup = storyImages.map((image, index) => `
    <figure class="project-figure behance-page">
      <div class="detail-image behance-page-frame">
        <img src="${escapeAttribute(image)}" alt="${escapeAttribute(figureCaptions[index + 1].alt)}" loading="lazy">
      </div>
    </figure>
  `).join("");

  return {
    title: project.title,
    subtitle: project.category,
    size: { width: 1180, height: 780 },
    iconImage: project.coverImage,
    render: () => `
      <article class="case-study-flow">
        <section class="window-card case-study-intro-card">
          <p class="eyebrow">${escapeHtml(project.category)}</p>
          <h2 class="headline">${escapeHtml(project.title)}</h2>
          <p class="lede">${escapeHtml(project.overview)}</p>
          <p class="tagline">${escapeHtml(buildProjectIntro(project))}</p>
          <div class="project-primary-cta">
            ${renderExternalLink(project.url, "View this project on Behance", "&#xE8A7;")}
          </div>
        </section>

        <figure class="project-figure behance-page behance-page-hero">
          <div class="detail-image behance-page-frame behance-page-frame-hero">
            <img src="${escapeAttribute(heroImage)}" alt="${escapeAttribute(figureCaptions[0].alt)}" loading="eager">
          </div>
        </figure>

        <section class="window-card case-study-summary-card">
          <article class="case-study-summary-section">
            <h4>Challenge</h4>
            <p>${escapeHtml(project.challenge)}</p>
          </article>
          <article class="case-study-summary-section">
            <h4>Process</h4>
            <p>${escapeHtml(project.process)}</p>
          </article>
          <article class="case-study-summary-section">
            <h4>Outcome</h4>
            <p>${escapeHtml(project.outcome)}</p>
          </article>
        </section>

        ${storyPagesMarkup ? `
          <section class="case-study-pages" aria-label="${escapeAttribute(`${project.desktopLabel} project pages`)}">
            ${storyPagesMarkup}
          </section>
        ` : ""}

        <section class="window-card narrative-block">
          <p class="eyebrow">Project walkthrough</p>
          <h3>What the visuals communicate</h3>
          <p>${escapeHtml(buildVisualNarrative(project))}</p>
          <p>${escapeHtml(buildProjectDepth(project))}</p>
        </section>

        <section class="window-card case-study-tools-card">
          <p class="eyebrow">Tools and focus</p>
          <div class="tag-row">
            ${project.tools.map(tool => `<span class="tag-pill">${escapeHtml(tool)}</span>`).join("")}
          </div>
        </section>

      </article>
    `
  };
}

function buildFigureCaptions(project) {
  return project.detailImages.map((_, index) => {
    if (index === 0) {
      return {
        alt: `${project.title} main project visual`,
        caption: `The opening visual establishes the tone, hierarchy, and overall design direction of ${project.desktopLabel}.`
      };
    }

    if (index === 1) {
      return {
        alt: `${project.title} supporting detail visual`,
        caption: `This supporting frame shows how the project develops its structure and translates the core idea into a clearer visual system.`
      };
    }

    return {
      alt: `${project.title} gallery visual ${index + 1}`,
      caption: `This gallery view extends the story of ${project.desktopLabel}, showing additional detail in layout, interaction, composition, and final presentation.`
    };
  });
}

function buildProjectIntro(project) {
  return `${project.desktopLabel} is shaped as a ${project.category.toLowerCase()} project where clarity, storytelling, and visual finish work together so the concept feels both useful and memorable.`;
}

function buildVisualNarrative(project) {
  return `The imagery in ${project.desktopLabel} is not treated as decoration. Each visual is used to make the project's core idea easier to understand, whether that means guiding a user through an interface, clarifying information, or building a stronger emotional response to the narrative and form.`;
}

function buildProjectDepth(project) {
  return `${project.process} In the final output, that structure is carried through the composition, image treatment, and hierarchy so the viewer can quickly understand what the project is doing, why the design decisions matter, and how the final direction answers the original challenge.`;
}

function getWindowShellModel(definition, taskbarKey, registryKey) {
  const isProjectWindow = registryKey.startsWith("project-");

  if (isProjectWindow) {
    return {
      breadcrumbs: ["Home", "Works", definition.title],
      searchLabel: "Search work details",
      commands: ["Open", "Sort", "View", "Share"],
      detailsLabel: "Preview"
    };
  }

  const shellMap = {
    home: {
      breadcrumbs: ["Home"],
      searchLabel: "Search portfolio",
      commands: ["Quick access", "Pin", "Sort", "Share"],
      detailsLabel: "Overview"
    },
    projects: {
      breadcrumbs: ["Home", "Works"],
      searchLabel: "Search works",
      commands: ["New", "Sort", "View", "Filter"],
      detailsLabel: "Details"
    },
    gallery: {
      breadcrumbs: ["Home", "Pictures", "Gallery"],
      searchLabel: "Search gallery",
      commands: ["Slideshow", "Sort", "View", "Filter"],
      detailsLabel: "Tiles"
    },
    resume: {
      breadcrumbs: ["Home", "Documents", "Resume"],
      searchLabel: "Search resume",
      commands: ["Open", "Share", "Print", "Download"],
      detailsLabel: "Summary"
    },
    skills: {
      breadcrumbs: ["Home", "Workspace", "Skills"],
      searchLabel: "Search skills",
      commands: ["Browse", "Group", "View", "Filter"],
      detailsLabel: "List"
    },
    about: {
      breadcrumbs: ["Home", "Profile", "About"],
      searchLabel: "Search profile",
      commands: ["Profile", "Story", "View", "Share"],
      detailsLabel: "Details"
    },
    contact: {
      breadcrumbs: ["Home", "Mail", "Contact"],
      searchLabel: "Search contact",
      commands: ["Email", "Call", "Copy", "Share"],
      detailsLabel: "Details"
    }
  };

  return shellMap[taskbarKey] || {
    breadcrumbs: ["Home", definition.title],
    searchLabel: `Search ${definition.title}`,
    commands: ["Open", "Sort", "View"],
    detailsLabel: "Details"
  };
}

function renderWindowShell(model) {
  return `
    <div class="window-shellbar" aria-hidden="true">
      <div class="shell-nav">
        <span class="shell-icon-button">${renderUiIcon("&#xE72B;")}</span>
        <span class="shell-icon-button">${renderUiIcon("&#xE72A;")}</span>
        <span class="shell-icon-button">${renderUiIcon("&#xE74A;")}</span>
        <span class="shell-icon-button">${renderUiIcon("&#xE72C;")}</span>
      </div>
      <div class="shell-address">
        <span class="shell-crumb shell-crumb-home">
          ${renderUiIcon("&#xE80F;")}
        </span>
        ${model.breadcrumbs.map((crumb, index) => `
          <span class="shell-divider">${index === 0 ? "" : "&#8250;"}</span>
          <span class="shell-crumb">${escapeHtml(crumb)}</span>
        `).join("")}
      </div>
      <div class="shell-search">
        ${renderUiIcon("&#xE721;")}
        <span>${escapeHtml(model.searchLabel)}</span>
      </div>
    </div>
    <div class="window-commandbar" aria-hidden="true">
      <div class="command-group">
        ${model.commands.map(command => `
          <span class="command-chip">
            ${renderUiIcon("&#xE710;")}
            <span>${escapeHtml(command)}</span>
          </span>
        `).join("")}
      </div>
      <span class="command-details">${escapeHtml(model.detailsLabel)}</span>
    </div>
  `;
}

function createWindow(appKey, options = {}) {
  const definition = options.definition || appContent[appKey];
  const registryKey = options.registryKey || appKey;
  const taskbarKey = options.taskbarKey || appKey;
  if (!definition) return;

  if (windowRegistry.has(registryKey)) {
    focusWindow(windowRegistry.get(registryKey));
    return;
  }

  const mobileView = window.innerWidth <= 760;
  const windowEl = document.createElement("section");
  windowEl.className = "window";
  windowEl.dataset.app = registryKey;
  windowEl.dataset.taskbar = taskbarKey;
  windowEl.setAttribute("role", "dialog");
  windowEl.setAttribute("aria-label", `${definition.title} window`);
  windowEl.tabIndex = -1;
  windowEl.style.width = mobileView ? "auto" : `${definition.size.width}px`;
  windowEl.style.height = mobileView ? "auto" : `${definition.size.height}px`;

  const position = getWindowPosition(definition.size);
  if (!mobileView) {
    windowEl.style.left = `${position.left}px`;
    windowEl.style.top = `${position.top}px`;
  }

  windowEl.style.zIndex = ++topZIndex;
  const shellModel = getWindowShellModel(definition, taskbarKey, registryKey);
  windowEl.innerHTML = `
    <div class="window-header">
      <div class="window-header-left">
        ${renderWindowBadge(definition)}
        <div class="window-header-meta">
          <div class="window-title">${escapeHtml(definition.title)}</div>
          <div class="window-subtitle">${escapeHtml(definition.subtitle)}</div>
        </div>
      </div>
      <div class="window-controls">
        <button class="control-button control-minimize" aria-label="Minimize window" type="button">
          ${renderUiIcon("&#xE921;")}
        </button>
        <button class="control-button control-expand" aria-label="Maximize window" type="button">
          ${renderUiIcon("&#xE922;")}
        </button>
        <button class="control-button control-close" aria-label="Close window" type="button">
          ${renderUiIcon("&#xE8BB;")}
        </button>
      </div>
    </div>
    ${renderWindowShell(shellModel)}
    <div class="window-body">${definition.render()}</div>
  `;

  desktopShell.appendChild(windowEl);
  windowRegistry.set(registryKey, windowEl);
  focusWindow(windowEl);
  windowEl.focus();
  bindWindowControls(windowEl, registryKey);
  bindLaunchers(windowEl);
  bindContactForms(windowEl);
  bindProjectCards(windowEl);
  syncTaskbarState();
}

function openProjectWindow(projectId) {
  const project = projectData.find(item => item.id === projectId);
  if (!project) return;

  createWindow("projects", {
    registryKey: `project-${project.id}`,
    taskbarKey: "projects",
    definition: buildProjectDefinition(project)
  });
}

function bindLaunchers(scope = document) {
  scope.querySelectorAll("[data-app-launch]").forEach(button => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => createWindow(button.dataset.appLaunch));
  });

  scope.querySelectorAll("[data-project-launch]").forEach(button => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => openProjectWindow(button.dataset.projectLaunch));
  });
}

function bindContactForms(scope = document) {
  scope.querySelectorAll(".contact-form").forEach(form => {
    if (form.dataset.bound === "true") return;
    form.dataset.bound = "true";
    form.addEventListener("submit", handleContactFormSubmit);
  });
}

function handleContactFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  const formData = new FormData(form);
  openMailDraft({
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    projectNote: String(formData.get("projectNote") || "")
  });
}

function bindProjectCards(scope) {
  scope.querySelectorAll(".project-card").forEach(card => {
    if (card.dataset.bound === "true") return;
    card.dataset.bound = "true";
    const openCard = () => openProjectWindow(card.dataset.project);

    card.addEventListener("click", openCard);
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCard();
      }
    });
  });
}

function bindWindowControls(windowEl, registryKey) {
  const header = windowEl.querySelector(".window-header");
  const expandButton = windowEl.querySelector(".control-expand");

  windowEl.querySelector(".control-close").addEventListener("click", () => closeWindow(registryKey));
  windowEl.querySelector(".control-minimize").addEventListener("click", () => closeWindow(registryKey, 150));
  expandButton.addEventListener("click", () => toggleExpand(windowEl, expandButton));

  header.addEventListener("mousedown", event => startDrag(event, windowEl));
  windowEl.addEventListener("mousedown", () => focusWindow(windowEl));
}

function closeWindow(registryKey, delay = 220) {
  const windowEl = windowRegistry.get(registryKey);
  if (!windowEl) return;

  windowEl.classList.add("closing");
  window.setTimeout(() => {
    windowEl.remove();
    windowRegistry.delete(registryKey);
    syncTaskbarState();
  }, delay);
}

function toggleExpand(windowEl, button) {
  if (window.innerWidth <= 760) return;

  const expanded = windowEl.dataset.expanded === "true";
  if (expanded) {
    windowEl.style.width = windowEl.dataset.prevWidth;
    windowEl.style.height = windowEl.dataset.prevHeight;
    windowEl.style.left = windowEl.dataset.prevLeft;
    windowEl.style.top = windowEl.dataset.prevTop;
    windowEl.dataset.expanded = "false";
    button.innerHTML = renderUiIcon("&#xE922;");
    button.setAttribute("aria-label", "Maximize window");
    return;
  }

  windowEl.dataset.prevWidth = windowEl.style.width;
  windowEl.dataset.prevHeight = windowEl.style.height;
  windowEl.dataset.prevLeft = windowEl.style.left;
  windowEl.dataset.prevTop = windowEl.style.top;
  windowEl.style.width = `${Math.min(window.innerWidth - 36, 1240)}px`;
  windowEl.style.height = `${Math.min(window.innerHeight - 114, 820)}px`;
  windowEl.style.left = "18px";
  windowEl.style.top = "18px";
  windowEl.dataset.expanded = "true";
  button.innerHTML = renderUiIcon("&#xE923;");
  button.setAttribute("aria-label", "Restore window");
  focusWindow(windowEl);
}

function syncTaskbarState() {
  const openKeys = Array.from(windowRegistry.keys());
  document.querySelectorAll(".taskbar-button[data-app], [data-track-app]").forEach(button => {
    const appKey = button.dataset.trackApp || button.dataset.app;
    const isActive = appKey === "projects"
      ? openKeys.some(key => key === "projects" || key.startsWith("project-"))
      : windowRegistry.has(appKey);

    button.classList.toggle("active", isActive);
  });
}

function renderWindowBadge(definition) {
  if (definition.iconImage) {
    return `<div class="window-app-badge image-badge" style="background-image:url('${escapeAttribute(definition.iconImage)}')"></div>`;
  }

  return `
    <div class="window-app-badge">
      ${renderUiIcon(definition.icon || "&#xE80F;")}
    </div>
  `;
}

function renderSceneAppButton(appKey, label, icon, secondary = false) {
  return `
    <button class="action-link scene-panel-button${secondary ? " secondary" : ""}" type="button" data-scene-open-app="${appKey}">
      ${renderUiIcon(icon)}
      <span>${escapeHtml(label)}</span>
    </button>
  `;
}

function renderExternalLink(href, label, icon, secondary = false) {
  const linkAttrs = href.startsWith("http")
    ? ' target="_blank" rel="noreferrer"'
    : "";

  return `
    <a class="action-link${secondary ? " secondary" : ""}" href="${escapeAttribute(href)}"${linkAttrs}>
      ${renderUiIcon(icon)}
      <span>${escapeHtml(label)}</span>
    </a>
  `;
}

function renderOptionalLink(href, label, icon, secondary = false) {
  return href ? renderExternalLink(href, label, icon, secondary) : "";
}

function renderInternalButton(appKey, label, icon, secondary = false) {
  return `
    <button class="action-link${secondary ? " secondary" : ""}" type="button" data-app-launch="${appKey}">
      ${renderUiIcon(icon)}
      <span>${escapeHtml(label)}</span>
    </button>
  `;
}

function focusWindow(windowEl) {
  windowEl.style.zIndex = ++topZIndex;
}

function getWindowPosition(size) {
  const maxLeft = Math.max(18, window.innerWidth - size.width - 18);
  const maxTop = Math.max(18, window.innerHeight - size.height - 88);
  const centeredLeft = Math.round((window.innerWidth - size.width) / 2);
  const centeredTop = Math.round((window.innerHeight - size.height) / 2) - 24;
  const left = clamp(centeredLeft + ((windowOffset % 5) * 28) - 56, 18, maxLeft);
  const top = clamp(centeredTop + ((windowOffset % 4) * 22) - 28, 18, maxTop);
  windowOffset += 1;
  return { left, top };
}

function startDrag(event, windowEl) {
  if (window.innerWidth <= 760) return;
  if (event.target.closest(".window-controls")) return;

  focusWindow(windowEl);
  const rect = windowEl.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  function onMove(moveEvent) {
    const maxLeft = window.innerWidth - rect.width - 10;
    const maxTop = window.innerHeight - rect.height - 84;
    windowEl.style.left = `${clamp(moveEvent.clientX - offsetX, 10, maxLeft)}px`;
    windowEl.style.top = `${clamp(moveEvent.clientY - offsetY, 10, maxTop)}px`;
  }

  function onUp() {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
  }

  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUp);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateClock() {
  const now = new Date();
  const timeEl = document.getElementById("clock-time");
  const dateEl = document.getElementById("clock-date");
  const timeText = now.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit"
  });
  const dateText = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  const tabletDate = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short"
  });

  if (timeEl) {
    timeEl.textContent = timeText;
  }

  if (dateEl) {
    dateEl.textContent = dateText;
  }

  const tabletTimeEl = document.getElementById("tablet-time");
  const tabletDateEl = document.getElementById("tablet-date");
  const mobileTimeEl = document.getElementById("mobile-time");

  if (tabletTimeEl) {
    tabletTimeEl.textContent = timeText;
  }

  if (tabletDateEl) {
    tabletDateEl.textContent = tabletDate;
  }

  if (mobileTimeEl) {
    mobileTimeEl.textContent = timeText;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function buildMailtoHref({ subject = defaultEmailSubject, body = "" } = {}) {
  const queryParts = [];

  if (subject) {
    queryParts.push(`subject=${encodeURIComponent(subject)}`);
  }

  if (body) {
    queryParts.push(`body=${encodeURIComponent(body)}`);
  }

  return `mailto:${profile.email}${queryParts.length ? `?${queryParts.join("&")}` : ""}`;
}

function openMailDraft({ name = "", email = "", projectNote = "" } = {}) {
  const senderName = name.trim();
  const senderEmail = email.trim();
  const note = projectNote.trim();
  const subject = senderName ? `Portfolio inquiry from ${senderName}` : defaultEmailSubject;
  const contactDetails = [];

  if (senderName) {
    contactDetails.push(`Name: ${senderName}`);
  }

  if (senderEmail) {
    contactDetails.push(`Email: ${senderEmail}`);
  }

  const body = [contactDetails.join("\n"), note || defaultEmailMessage]
    .filter(Boolean)
    .join("\n\n");

  window.location.href = buildMailtoHref({ subject, body });
}

const customCursorInteractiveSelector = [
  "a",
  "button",
  "[role='button']",
  "[data-app-launch]",
  "[data-project-launch]",
  "[data-scene-panel]",
  "[data-scene-enter]",
  "[data-scene-open-app]",
  ".desktop-shortcut",
  ".project-card",
  ".control-button",
  ".taskbar-button",
  ".action-link",
  ".toolbar-link",
  "input[type='range']",
  ".fish-preset-button",
  ".ocean-audio-toggle",
  ".adaptive-launcher",
  ".adaptive-dock-icon",
  ".tablet-action",
  ".mobile-chip"
].join(", ");

// Keep the click sound local so the portfolio doesn't rely on an external audio file.
let uiAudioContext = null;
let activeSoundPointerId = null;
const uiNoiseBufferCache = new Map();
const oceanNoiseBufferCache = new Map();

function getUiAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }

  if (!uiAudioContext) {
    uiAudioContext = new AudioContextClass();
  }

  if (uiAudioContext.state === "suspended") {
    uiAudioContext.resume().catch(() => {});
  }

  return uiAudioContext;
}

function getUiNoiseBuffer(audioContext) {
  const cacheKey = `${audioContext.sampleRate}:2048`;
  if (uiNoiseBufferCache.has(cacheKey)) {
    return uiNoiseBufferCache.get(cacheKey);
  }

  const buffer = audioContext.createBuffer(1, 2048, audioContext.sampleRate);
  const channel = buffer.getChannelData(0);
  for (let index = 0; index < channel.length; index += 1) {
    channel[index] = (Math.random() * 2) - 1;
  }

  uiNoiseBufferCache.set(cacheKey, buffer);
  return buffer;
}

function getOceanNoiseBuffer(audioContext) {
  const cacheKey = `${audioContext.sampleRate}:8`;
  if (oceanNoiseBufferCache.has(cacheKey)) {
    return oceanNoiseBufferCache.get(cacheKey);
  }

  const frameCount = audioContext.sampleRate * 8;
  const buffer = audioContext.createBuffer(2, frameCount, audioContext.sampleRate);
  for (let channelIndex = 0; channelIndex < buffer.numberOfChannels; channelIndex += 1) {
    const channel = buffer.getChannelData(channelIndex);
    let brown = 0;
    for (let index = 0; index < channel.length; index += 1) {
      const white = (Math.random() * 2) - 1;
      brown = (brown + (0.04 * white)) / 1.04;
      channel[index] = clamp(((brown * 3.3) + (white * 0.14)) * 0.22, -1, 1);
    }
  }

  oceanNoiseBufferCache.set(cacheKey, buffer);
  return buffer;
}

function createStereoNode(audioContext, pan = 0) {
  if (typeof audioContext.createStereoPanner === "function") {
    const stereoPanner = audioContext.createStereoPanner();
    stereoPanner.pan.value = pan;
    return stereoPanner;
  }

  return audioContext.createGain();
}

function ensureOceanAmbienceGraph(audioContext) {
  if (oceanAmbienceState.masterGain) {
    return;
  }

  const masterGain = audioContext.createGain();
  const ambienceCompressor = audioContext.createDynamicsCompressor();
  ambienceCompressor.threshold.value = -26;
  ambienceCompressor.knee.value = 18;
  ambienceCompressor.ratio.value = 2.4;
  ambienceCompressor.attack.value = 0.03;
  ambienceCompressor.release.value = 0.28;
  masterGain.gain.value = 0.0001;
  masterGain.connect(ambienceCompressor);
  ambienceCompressor.connect(audioContext.destination);

  const createOceanLayer = ({
    baseGain,
    lfoDepth,
    lfoRate,
    highpassFrequency,
    lowpassFrequency,
    pan,
    offset = 0
  }) => {
    const source = audioContext.createBufferSource();
    source.buffer = getOceanNoiseBuffer(audioContext);
    source.loop = true;

    const highpassFilter = audioContext.createBiquadFilter();
    highpassFilter.type = "highpass";
    highpassFilter.frequency.value = highpassFrequency;

    const lowpassFilter = audioContext.createBiquadFilter();
    lowpassFilter.type = "lowpass";
    lowpassFilter.frequency.value = lowpassFrequency;
    lowpassFilter.Q.value = 0.4;

    const layerGain = audioContext.createGain();
    layerGain.gain.value = baseGain;

    const stereoNode = createStereoNode(audioContext, pan);
    const lfo = audioContext.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = lfoRate;

    const lfoGain = audioContext.createGain();
    lfoGain.gain.value = lfoDepth;

    source.connect(highpassFilter);
    highpassFilter.connect(lowpassFilter);
    lowpassFilter.connect(layerGain);
    layerGain.connect(stereoNode);
    stereoNode.connect(masterGain);
    lfo.connect(lfoGain);
    lfoGain.connect(layerGain.gain);

    source.start(audioContext.currentTime, offset);
    lfo.start(audioContext.currentTime);

    return {
      source,
      lfo
    };
  };

  const surfLayer = createOceanLayer({
    baseGain: 0.24,
    lfoDepth: 0.054,
    lfoRate: 0.05,
    highpassFrequency: 64,
    lowpassFrequency: 1440,
    pan: -0.14,
    offset: 1.2
  });

  const foamLayer = createOceanLayer({
    baseGain: 0.1,
    lfoDepth: 0.026,
    lfoRate: 0.11,
    highpassFrequency: 620,
    lowpassFrequency: 4200,
    pan: 0.18,
    offset: 4.1
  });

  const deepLayer = createOceanLayer({
    baseGain: 0.14,
    lfoDepth: 0.032,
    lfoRate: 0.032,
    highpassFrequency: 24,
    lowpassFrequency: 340,
    pan: 0.04,
    offset: 0.6
  });

  oceanAmbienceState.masterGain = masterGain;
  oceanAmbienceState.hasStarted = true;
  oceanAmbienceState.layers = [surfLayer, foamLayer, deepLayer];
}

function getOceanAmbienceTargetGain() {
  return oceanAmbienceState.enabled && !document.hidden
    ? oceanAmbienceMaxGain
    : 0.0001;
}

function setOceanAmbienceLevel(targetGain, { immediate = false } = {}) {
  if (!oceanAmbienceState.masterGain) {
    return;
  }

  const audioContext = oceanAmbienceState.masterGain.context;
  const now = audioContext.currentTime;
  const gain = oceanAmbienceState.masterGain.gain;
  const nextGain = Math.max(targetGain, 0.0001);
  gain.cancelScheduledValues(now);

  if (immediate) {
    gain.setValueAtTime(nextGain, now);
    return;
  }

  gain.setValueAtTime(Math.max(gain.value, 0.0001), now);
  gain.exponentialRampToValueAtTime(nextGain, now + 1.6);
}

function persistOceanAmbiencePreference() {
  try {
    window.localStorage.removeItem(oceanAmbienceStorageKey);
  } catch (_error) {
    // Ignore preference persistence failures and keep the current session state.
  }
}

function updateOceanAudioToggle() {
  if (!oceanAudioToggle || !oceanAudioStatus) {
    return;
  }

  const statusText = oceanAmbienceState.enabled
    ? (oceanAmbienceState.hasStarted ? "Ocean sound on" : "On by default")
    : "Muted";

  oceanAudioToggle.dataset.state = oceanAmbienceState.enabled
    ? (oceanAmbienceState.hasStarted ? "on" : "ready")
    : "off";
  oceanAudioToggle.setAttribute("aria-pressed", oceanAmbienceState.enabled ? "true" : "false");
  oceanAudioToggle.setAttribute(
    "aria-label",
    oceanAmbienceState.enabled ? "Turn ocean ambience off" : "Turn ocean ambience on"
  );
  oceanAudioStatus.textContent = statusText;
}

function unlockOceanAmbience() {
  if (!oceanAmbienceState.enabled) {
    updateOceanAudioToggle();
    return;
  }

  const audioContext = getUiAudioContext();
  if (!audioContext) {
    updateOceanAudioToggle();
    return;
  }

  ensureOceanAmbienceGraph(audioContext);
  setOceanAmbienceLevel(getOceanAmbienceTargetGain());
  updateOceanAudioToggle();
}

function initializeOceanAmbience() {
  if (!oceanAudioToggle) {
    return;
  }

  oceanAmbienceState.enabled = true;
  persistOceanAmbiencePreference();
  updateOceanAudioToggle();

  if (oceanAudioToggle.dataset.bound === "true") {
    return;
  }

  oceanAudioToggle.dataset.bound = "true";
  oceanAudioToggle.addEventListener("click", () => {
    oceanAmbienceState.enabled = !oceanAmbienceState.enabled;

    if (oceanAmbienceState.enabled) {
      unlockOceanAmbience();
      return;
    }

    setOceanAmbienceLevel(0.0001, { immediate: true });
    updateOceanAudioToggle();
  });
}

function playUiClickSound({ release = false } = {}) {
  const audioContext = getUiAudioContext();
  if (!audioContext) {
    return;
  }

  const now = audioContext.currentTime + 0.002;
  const toneEnvelope = audioContext.createGain();
  toneEnvelope.gain.setValueAtTime(0.0001, now);
  toneEnvelope.gain.exponentialRampToValueAtTime(release ? 0.02 : 0.05, now + 0.002);
  toneEnvelope.gain.exponentialRampToValueAtTime(0.0001, now + (release ? 0.05 : 0.065));
  toneEnvelope.connect(audioContext.destination);

  const tone = audioContext.createOscillator();
  tone.type = release ? "triangle" : "square";
  tone.frequency.setValueAtTime(release ? 1320 : 960, now);
  tone.frequency.exponentialRampToValueAtTime(release ? 760 : 420, now + (release ? 0.04 : 0.055));

  const toneFilter = audioContext.createBiquadFilter();
  toneFilter.type = "lowpass";
  toneFilter.frequency.setValueAtTime(release ? 2600 : 2100, now);

  tone.connect(toneFilter);
  toneFilter.connect(toneEnvelope);
  tone.start(now);
  tone.stop(now + (release ? 0.05 : 0.07));

  const noise = audioContext.createBufferSource();
  noise.buffer = getUiNoiseBuffer(audioContext);

  const noiseFilter = audioContext.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.setValueAtTime(release ? 1800 : 1350, now);
  noiseFilter.Q.setValueAtTime(1.2, now);

  const noiseEnvelope = audioContext.createGain();
  noiseEnvelope.gain.setValueAtTime(release ? 0.0025 : 0.006, now);
  noiseEnvelope.gain.exponentialRampToValueAtTime(0.0001, now + (release ? 0.02 : 0.03));
  noiseEnvelope.connect(audioContext.destination);

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseEnvelope);
  noise.start(now);
  noise.stop(now + 0.035);
}

function isInteractiveSoundTarget(target) {
  return target instanceof Element && Boolean(target.closest(customCursorInteractiveSelector));
}

function setCursorMode(mode = "default") {
  if (!cursorGlow) {
    return;
  }

  cursorGlow.dataset.mode = mode;
}

function renderCursorGlowFollow() {
  if (!cursorGlow) {
    return;
  }

  cursorState.frameId = 0;
  const shellMode = body.dataset.shell || getShellMode();
  const shouldSnap = prefersReducedMotion.matches || shellMode !== "desktop";
  const deltaX = cursorState.targetX - cursorState.currentX;
  const deltaY = cursorState.targetY - cursorState.currentY;

  if (shouldSnap || !cursorState.initialized) {
    cursorState.currentX = cursorState.targetX;
    cursorState.currentY = cursorState.targetY;
    cursorState.initialized = true;
  } else {
    const distance = Math.hypot(deltaX, deltaY);
    const easing = distance > 180 ? 0.48 : 0.34;
    cursorState.currentX += deltaX * easing;
    cursorState.currentY += deltaY * easing;
  }

  cursorGlow.style.left = `${cursorState.currentX}px`;
  cursorGlow.style.top = `${cursorState.currentY}px`;

  if (!shouldSnap) {
    const remainingX = cursorState.targetX - cursorState.currentX;
    const remainingY = cursorState.targetY - cursorState.currentY;
    if (Math.abs(remainingX) > 0.2 || Math.abs(remainingY) > 0.2) {
      cursorState.frameId = window.requestAnimationFrame(renderCursorGlowFollow);
    }
  }
}

function updateCursorGlowPosition(clientX, clientY, { immediate = false } = {}) {
  if (!cursorGlow) {
    return;
  }

  cursorState.targetX = clientX;
  cursorState.targetY = clientY;

  if (immediate) {
    cursorState.currentX = clientX;
    cursorState.currentY = clientY;
    cursorState.initialized = true;
    cursorGlow.style.left = `${clientX}px`;
    cursorGlow.style.top = `${clientY}px`;
    if (cursorState.frameId) {
      window.cancelAnimationFrame(cursorState.frameId);
      cursorState.frameId = 0;
    }
    return;
  }

  if (!cursorState.frameId) {
    renderCursorGlowFollow();
  }
}

function getCursorMode(target) {
  if (!(target instanceof Element)) {
    return "default";
  }

  if (
    target.closest(
      "input:not([type='range']):not([type='checkbox']):not([type='radio']):not([type='submit']):not([type='button']), textarea, [contenteditable='true']"
    )
  ) {
    return "text";
  }

  if (target.closest("#fish-designer-canvas")) {
    return "draw";
  }

  if (target.closest(customCursorInteractiveSelector)) {
    return "interactive";
  }

  return "default";
}

taskbarButtons.forEach(button => {
  button.addEventListener("click", () => createWindow(button.dataset.app));
});

document.addEventListener("pointermove", event => {
  if (!cursorGlow) return;
  updateCursorGlowPosition(event.clientX, event.clientY);
  setCursorMode(getCursorMode(event.target));
}, { passive: true });

document.addEventListener("pointerdown", () => {
  unlockOceanAmbience();
}, { capture: true, passive: true });

document.addEventListener("keydown", event => {
  if (event.metaKey || event.ctrlKey || event.altKey) {
    return;
  }

  unlockOceanAmbience();
}, true);

document.addEventListener("mouseout", event => {
  if (!cursorGlow || event.relatedTarget) {
    return;
  }

  setCursorMode("hidden");
});

document.addEventListener("pointerdown", event => {
  if (event.button !== 0 || !isInteractiveSoundTarget(event.target)) {
    return;
  }

  activeSoundPointerId = event.pointerId;
  unlockOceanAmbience();
  playUiClickSound();
}, true);

document.addEventListener("pointerup", event => {
  if (event.button !== 0 || activeSoundPointerId !== event.pointerId) {
    return;
  }

  activeSoundPointerId = null;
  playUiClickSound({ release: true });
}, true);

document.addEventListener("pointercancel", () => {
  activeSoundPointerId = null;
}, true);

window.addEventListener("blur", () => {
  activeSoundPointerId = null;
  setCursorMode("hidden");
});

document.addEventListener("visibilitychange", () => {
  setOceanAmbienceLevel(getOceanAmbienceTargetGain());
  updateOceanAudioToggle();
});

window.addEventListener("resize", () => {
  updateCursorGlowPosition(window.innerWidth / 2, window.innerHeight / 2, { immediate: true });
  updateAdaptiveShell();
  applyShortcutPositions();

  if (window.innerWidth <= 1180) {
    windowRegistry.forEach(windowEl => {
      windowEl.style.left = "";
      windowEl.style.top = "";
    });
    return;
  }

  windowRegistry.forEach(windowEl => {
    if (windowEl.style.left && windowEl.style.top) return;

    const position = getWindowPosition({
      width: windowEl.offsetWidth || 920,
      height: windowEl.offsetHeight || 680
    });

    windowEl.style.left = `${position.left}px`;
    windowEl.style.top = `${position.top}px`;
  });
});

renderDesktopIcons();
initializeFishStudio();
initializeOceanAmbience();
renderAdaptiveShells();
bindLaunchers();
bindContactForms();
initializeEntryExperience();
updateAdaptiveShell();
updateClock();
window.setInterval(updateClock, 30000);
