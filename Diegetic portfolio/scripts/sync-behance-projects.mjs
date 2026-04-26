import fs from "node:fs";
import path from "node:path";

const workspaceRoot = process.cwd();
const configPath = path.join(workspaceRoot, "behance-sync.config.json");
const metaPath = path.join(workspaceRoot, "behance-project-meta.json");
const outputPath = path.join(workspaceRoot, "behance-projects.generated.js");

const defaultConfig = {
  profileUsername: "sweetyagarwal5",
  profileUrl: "https://www.behance.net/sweetyagarwal5",
  maxDetailImages: 6
};

const genericKeywordExclusions = new Set([
  "interaction design",
  "interaction design ",
  "product design",
  "product design ",
  "user experience",
  "user interface",
  "ui design",
  "ux design",
  "ui/ux",
  "case study",
  "design student",
  "mobile app design",
  "app redesign"
]);

function readJson(filePath, fallbackValue) {
  if (!fs.existsSync(filePath)) {
    return fallbackValue;
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function decodeHtmlEntities(value = "") {
  return String(value)
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/â€”|â€“/g, "-")
    .replace(/â€œ|â€/g, '"')
    .replace(/â€˜|â€™/g, "'");
}

function cleanText(value = "") {
  return decodeHtmlEntities(String(value)).replace(/\s+/g, " ").trim();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractMetaContent(html, attribute, name) {
  const escapedName = escapeRegex(name);
  const patterns = [
    new RegExp(`<meta[^>]+${attribute}=["']${escapedName}["'][^>]+content=["']([\\s\\S]*?)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([\\s\\S]*?)["'][^>]+${attribute}=["']${escapedName}["'][^>]*>`, "i")
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      return cleanText(match[1]);
    }
  }

  return "";
}

function extractLinkHref(html, relName) {
  const escapedName = escapeRegex(relName);
  const patterns = [
    new RegExp(`<link[^>]+rel=["']${escapedName}["'][^>]+href=["']([\\s\\S]*?)["'][^>]*>`, "i"),
    new RegExp(`<link[^>]+href=["']([\\s\\S]*?)["'][^>]+rel=["']${escapedName}["'][^>]*>`, "i")
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      return cleanText(match[1]);
    }
  }

  return "";
}

function normalizeBehanceImageUrl(url) {
  return String(url || "").replace(
    /(https:\/\/mir-s3-cdn-cf\.behance\.net\/(?:project_modules|projects)\/)[^/]+\//i,
    "$1source/"
  );
}

function unique(array) {
  return [...new Set(array.filter(Boolean))];
}

function slugify(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function extractBehanceId(projectUrl) {
  const match = String(projectUrl).match(/\/gallery\/(\d+)\//i);
  return match?.[1] || "";
}

function extractProjectLinks(profileHtml, profileUrl) {
  const matches = [
    ...profileHtml.matchAll(/href=["'](?:https?:\/\/www\.behance\.net)?(\/gallery\/\d+\/[^"'#?]+)["']/gi)
  ];

  return unique(
    matches.map(match => new URL(match[1], profileUrl).toString())
  );
}

function extractNextProfilePage(profileHtml, currentUrl) {
  const anchorMatches = [
    ...profileHtml.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)
  ];

  for (const [, href, innerHtml] of anchorMatches) {
    const anchorText = cleanText(innerHtml.replace(/<[^>]+>/g, " "));
    if (/^next page$/i.test(anchorText)) {
      return new URL(decodeHtmlEntities(href), currentUrl).toString();
    }
  }

  return "";
}

function extractJsonLdObjects(html) {
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  const objects = [];

  for (const scriptMatch of scripts) {
    const scriptBody = scriptMatch[1]?.trim();
    if (!scriptBody) {
      continue;
    }

    try {
      const parsed = JSON.parse(scriptBody);
      if (Array.isArray(parsed)) {
        objects.push(...parsed);
      } else {
        objects.push(parsed);
      }
    } catch (_error) {
      // Ignore malformed JSON-LD blocks and keep scanning.
    }
  }

  return objects;
}

function extractProjectModuleImages(html, projectUrl) {
  const projectPath = escapeRegex(new URL(projectUrl).pathname);
  const moduleImagePattern = new RegExp(
    `<a[^>]+href=["'][^"']*${projectPath}\\/modules\\/[^"']+["'][^>]*>[\\s\\S]{0,2500}?<img[^>]+src=["'](https:\\/\\/mir-s3-cdn-cf\\.behance\\.net\\/(?:project_modules|projects)\\/[^"'<>\\s]+)["']`,
    "gi"
  );

  return unique(
    [...html.matchAll(moduleImagePattern)].map(match => normalizeBehanceImageUrl(match[1]))
  );
}

function pickArtworkMetadata(html, projectUrl) {
  const jsonLdObjects = extractJsonLdObjects(html);
  const artwork = jsonLdObjects.find(entry => entry && entry["@type"] === "VisualArtwork") || {};
  const title = cleanText(artwork.name || extractMetaContent(html, "property", "og:title").replace(/\s+-\s+Sweety Agarwal$/i, ""));
  const description = cleanText(artwork.description || extractMetaContent(html, "name", "description"));
  const keywords = extractMetaContent(html, "name", "keywords")
    .split(",")
    .map(keyword => cleanText(keyword))
    .filter(Boolean);

  const ogImage = normalizeBehanceImageUrl(extractMetaContent(html, "property", "og:image"));
  const linkImage = normalizeBehanceImageUrl(extractLinkHref(html, "image_src"));
  const moduleImages = extractProjectModuleImages(html, projectUrl);
  const fallbackImages = moduleImages.length
    ? []
    : [...html.matchAll(/https:\/\/mir-s3-cdn-cf\.behance\.net\/(?:project_modules|projects)\/[^"'<>\s)]+/gi)]
      .map(match => normalizeBehanceImageUrl(match[0]));
  const images = unique([linkImage, ogImage, ...moduleImages, ...fallbackImages]);

  return {
    behanceId: cleanText(String(artwork.identifier || extractBehanceId(projectUrl))),
    title,
    description,
    keywords,
    coverImage: ogImage || images[0] || "",
    detailImages: images
  };
}

function getFirstSentence(text) {
  const cleaned = cleanText(text);
  if (!cleaned) {
    return "";
  }

  const sentenceMatch = cleaned.match(/[^.!?]+[.!?]/);
  return sentenceMatch ? sentenceMatch[0].trim() : cleaned;
}

function deriveDesktopLabel(title, metaEntry) {
  if (cleanText(metaEntry.desktopLabel)) {
    return cleanText(metaEntry.desktopLabel);
  }

  const cleanedTitle = cleanText(title);
  const splitLabel = cleanedTitle.split(/\s+[|:]\s+|\s+(?:\u2014|\u2013|-)\s+/)[0];
  return cleanText(splitLabel || cleanedTitle || "Behance Project");
}

function deriveCategory(keywords, title, metaEntry) {
  if (cleanText(metaEntry.category)) {
    return cleanText(metaEntry.category);
  }

  const normalizedKeywords = keywords.map(keyword => keyword.toLowerCase());
  const loweredTitle = cleanText(title).toLowerCase();

  if (normalizedKeywords.some(keyword => keyword.includes("packaging"))) {
    return "Packaging Design";
  }

  if (normalizedKeywords.some(keyword => keyword.includes("editorial")) || loweredTitle.includes("book")) {
    return "Editorial Design";
  }

  if (normalizedKeywords.some(keyword => keyword.includes("environment"))) {
    return "Environment Design";
  }

  if (normalizedKeywords.some(keyword => keyword.includes("illustration")) || loweredTitle.includes("nature")) {
    return "Illustration";
  }

  if (
    normalizedKeywords.some(keyword => keyword.includes("ux"))
    || normalizedKeywords.some(keyword => keyword.includes("ui"))
    || loweredTitle.includes("ux")
  ) {
    return "UX/UI Case Study";
  }

  if (normalizedKeywords.some(keyword => keyword.includes("pictogram")) || loweredTitle.includes("pictogram")) {
    return "Graphic System";
  }

  return "Visual Design";
}

function deriveTools(keywords, metaEntry) {
  if (Array.isArray(metaEntry.tools) && metaEntry.tools.length) {
    return metaEntry.tools.map(tool => cleanText(tool)).filter(Boolean);
  }

  const preferredKeywords = keywords
    .map(keyword => cleanText(keyword))
    .filter(Boolean)
    .filter(keyword => !genericKeywordExclusions.has(keyword.toLowerCase()));

  return unique(preferredKeywords).slice(0, 6);
}

function hasNarrativeDescription(description = "") {
  const cleaned = cleanText(description);
  if (!cleaned) {
    return false;
  }

  const wordCount = cleaned.split(/\s+/).length;
  const commaCount = (cleaned.match(/,/g) || []).length;
  if (!/[.!?]/.test(cleaned) && commaCount >= 2 && wordCount <= 14) {
    return false;
  }

  return wordCount >= 6;
}

function formatList(values = []) {
  const cleanedValues = values.map(value => cleanText(value)).filter(Boolean);
  if (!cleanedValues.length) {
    return "";
  }

  if (cleanedValues.length === 1) {
    return cleanedValues[0];
  }

  if (cleanedValues.length === 2) {
    return `${cleanedValues[0]} and ${cleanedValues[1]}`;
  }

  return `${cleanedValues.slice(0, -1).join(", ")}, and ${cleanedValues.at(-1)}`;
}

function buildTextPreset(context) {
  const haystack = [
    context.desktopLabel,
    context.title,
    context.category,
    context.description,
    ...context.tools,
    ...context.keywords
  ].join(" ").toLowerCase();

  if (/(suzuki|connected car|automotive ux|vehicle status|remote actions)/.test(haystack)) {
    return {
      challenge: "The app had to make vehicle status, remote actions, and service needs feel quick to understand for drivers without overloading the interface.",
      process: "The case study focuses on organizing the companion flow around monitoring, remote controls, and service touchpoints so the experience feels calmer and more dependable.",
      outcome: "The final UX direction turns Suzuki Connect into a clearer mobile companion where key actions feel more visible, more trustworthy, and easier to complete.",
      result: "The project reads as a more confidence-building connected-car experience, with stronger hierarchy around the actions drivers care about most."
    };
  }

  if (/character/.test(haystack)) {
    return {
      overview: "A character study built through hand drawing and sketch-led exploration to shape personality, pose, and visual identity.",
      challenge: "The task was to give the character a readable personality and silhouette while keeping the drawing expressive rather than overly polished.",
      process: "The work develops through sketch iterations, form studies, and line refinement to test expression, costume cues, and body language.",
      outcome: "The final character visuals feel more distinct and believable, with a clearer attitude carried through pose, proportion, and detail.",
      result: "It lands as a more memorable character concept, where expression and form work together instead of competing."
    };
  }

  if (/isometric/.test(haystack)) {
    return {
      overview: "An illustration study centered on isometric construction, using hand drawing to explore depth, structure, and spatial order.",
      challenge: "The main challenge was to create a convincing sense of space and volume while keeping the scene readable through the fixed logic of isometric perspective.",
      process: "The drawings are built through repeated angle control, form construction, and layering so objects sit together in a stable spatial system.",
      outcome: "The final illustrations communicate depth more clearly, turning technical perspective rules into a cleaner and more engaging visual composition.",
      result: "The project feels structured and legible, with space, objects, and hierarchy all working inside the same isometric logic."
    };
  }

  if (/two and three-point|three-point|two-point|perspective drawing/.test(haystack)) {
    return {
      overview: "A perspective-drawing study that compares two-point and three-point construction to understand depth, scale, and viewpoint.",
      challenge: "The work had to make complex spatial construction readable while showing how changing the vanishing-point setup changes the viewer's sense of scale.",
      process: "The drawings move through horizon-line setup, vanishing-point placement, and repeated structural sketching to test multiple viewpoints.",
      outcome: "The final set demonstrates stronger control over depth and distortion, making the perspective choices feel intentional rather than mechanical.",
      result: "It reads as a more confident spatial study, where the viewer can immediately feel the difference between the two systems."
    };
  }

  if (/texture cubes|texture/.test(haystack)) {
    return {
      overview: "A form-and-material exercise that uses simple cubes to study how texture, light, and rendering can change the feel of a surface.",
      challenge: "The brief was to separate different materials clearly even though every study started from the same basic cube form.",
      process: "The renderings rely on tonal variation, mark-making, and shadow control to test how each surface responds to light.",
      outcome: "The final series makes each cube feel materially distinct, showing better control over texture without losing form clarity.",
      result: "The project becomes a sharper material study, where surface treatment adds variety while the underlying structure stays solid."
    };
  }

  if (/nature sketch|treesketch|micron/.test(haystack)) {
    return {
      overview: "A sketchbook-style illustration study observing natural forms through quick hand-drawn marks and close attention to organic structure.",
      challenge: "The challenge was to capture plants and natural textures with enough immediacy to feel alive while still keeping the drawings grounded and readable.",
      process: "The work builds through direct observation, pen-led line studies, and small decisions about rhythm, density, and contour.",
      outcome: "The final sketches feel more attentive and atmospheric, turning observation into drawings that still retain movement and character.",
      result: "It lands as a more sensitive observation study, where looseness and structure stay in balance."
    };
  }

  if (/urban sketch/.test(haystack)) {
    return {
      overview: "An observational drawing series focused on translating streets, buildings, and public spaces into hand-drawn sketches with rhythm and place.",
      challenge: "Urban scenes carry a lot of visual information, so the key challenge was deciding what to simplify while still preserving atmosphere and structure.",
      process: "The sketches develop through on-site observation, quick line decisions, and selective detail to hold onto both architecture and movement.",
      outcome: "The final drawings capture a clearer sense of place, using sketching to balance built form, texture, and lived-in energy.",
      result: "It feels like a more confident city-study series, where immediacy and spatial clarity support each other."
    };
  }

  if (/visual exploration in illustration|stylistic range|digital art/.test(haystack)) {
    return {
      overview: "A digital illustration exploration that tests stylistic range, composition, and art direction across a series of different visual treatments.",
      challenge: "The task was to push beyond one familiar illustration mode and show range without losing authorship or compositional control.",
      process: "The project experiments with digital rendering, shape language, and layout decisions to see how different visual voices can still feel intentional.",
      outcome: "The final body of work shows broader stylistic versatility while keeping the illustrations cohesive and visually directed.",
      result: "The project reads as a stronger range piece, showing flexibility without becoming visually scattered."
    };
  }

  return null;
}

function buildFallbackOverview(context) {
  const { description, desktopLabel, category, tools, keywords } = context;
  const preset = buildTextPreset(context);
  if (preset?.overview) {
    return preset.overview;
  }

  const firstSentence = getFirstSentence(description);
  if (firstSentence) {
    return firstSentence;
  }

  const focusTerms = unique([...tools, ...keywords])
    .map(value => cleanText(value).replace(/^#+/, "").toLowerCase())
    .filter(Boolean)
    .slice(0, 3);

  if (focusTerms.length) {
    return `${desktopLabel} is a ${category.toLowerCase()} study focused on ${formatList(focusTerms)}.`;
  }

  return `${desktopLabel} is a ${category.toLowerCase()} study focused on structure, clarity, and a stronger visual direction.`;
}

function buildFallbackChallenge(context) {
  const { description, desktopLabel, category, tools } = context;
  const preset = buildTextPreset(context);
  if (preset?.challenge) {
    return preset.challenge;
  }

  if (hasNarrativeDescription(description)) {
    return `${desktopLabel} needed to translate its core idea into a clearer ${category.toLowerCase()} direction without losing depth, usability, or character.`;
  }

  const focusTerms = tools
    .map(tool => cleanText(tool).toLowerCase())
    .filter(Boolean)
    .slice(0, 2);
  if (focusTerms.length) {
    return `The challenge was to turn ${formatList(focusTerms)} into a more cohesive ${category.toLowerCase()} piece with stronger readability and intent.`;
  }

  return `The project needed a clearer ${category.toLowerCase()} direction that could make its main idea feel more focused and intentional.`;
}

function buildFallbackProcess(context) {
  const { tools } = context;
  const preset = buildTextPreset(context);
  if (preset?.process) {
    return preset.process;
  }

  const focusTerms = tools
    .map(tool => cleanText(tool).toLowerCase())
    .filter(Boolean)
    .slice(0, 3);
  if (focusTerms.length) {
    return `The direction develops through ${formatList(focusTerms)}, using iteration to refine structure, tone, and overall readability.`;
  }

  return "The process centers on iterative exploration, testing how composition, hierarchy, and form can support the core idea more clearly.";
}

function buildFallbackOutcome(context) {
  const { desktopLabel, category, description } = context;
  const preset = buildTextPreset(context);
  if (preset?.outcome) {
    return preset.outcome;
  }

  if (hasNarrativeDescription(description)) {
    return `${desktopLabel} resolves into a more focused ${category.toLowerCase()} with stronger hierarchy, clearer communication, and a more cohesive visual language.`;
  }

  return `The final direction gives ${desktopLabel} a more resolved ${category.toLowerCase()} presence with stronger structure and a cleaner visual read.`;
}

function buildFallbackResult(context) {
  const { desktopLabel, category, outcome } = context;
  const preset = buildTextPreset(context);
  if (preset?.result) {
    return preset.result;
  }

  if (cleanText(outcome)) {
    return cleanText(outcome);
  }

  return `${desktopLabel} lands as a more intentional ${category.toLowerCase()} piece with stronger hierarchy and a clearer overall experience.`;
}

function buildProjectRecord(projectUrl, projectPageHtml, metaEntry, maxDetailImages) {
  const artwork = pickArtworkMetadata(projectPageHtml, projectUrl);
  const title = artwork.title || cleanText(metaEntry.title) || "Behance Project";
  const desktopLabel = deriveDesktopLabel(title, metaEntry);
  const category = deriveCategory(artwork.keywords, title, metaEntry);
  const tools = deriveTools(artwork.keywords, metaEntry);
  const textContext = {
    desktopLabel,
    title,
    category,
    description: artwork.description,
    keywords: artwork.keywords,
    tools
  };
  const detailImages = unique([
    artwork.coverImage,
    ...artwork.detailImages
  ]).slice(0, Math.max(1, Number(maxDetailImages) || defaultConfig.maxDetailImages));

  const derivedId = cleanText(metaEntry.id) || slugify(desktopLabel || title || extractBehanceId(projectUrl) || "behance-project");
  const overview = cleanText(metaEntry.overview) || buildFallbackOverview(textContext);
  const challenge = cleanText(metaEntry.challenge) || buildFallbackChallenge(textContext);
  const process = cleanText(metaEntry.process) || buildFallbackProcess(textContext);
  const outcome = cleanText(metaEntry.outcome) || buildFallbackOutcome(textContext);
  const result = cleanText(metaEntry.result) || buildFallbackResult({ ...textContext, outcome });

  return {
    id: derivedId,
    desktopLabel,
    title,
    category,
    coverImage: artwork.coverImage || detailImages[0] || "",
    detailImages,
    url: projectUrl,
    overview,
    challenge,
    process,
    outcome,
    result,
    tools
  };
}

function buildGeneratedFile(projects, syncInfo) {
  return [
    "window.behanceProjectSyncInfo = " + JSON.stringify(syncInfo, null, 2) + ";",
    "window.behanceProjectData = " + JSON.stringify(projects, null, 2) + ";",
    ""
  ].join("\n\n");
}

function readExistingGeneratedProjects(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const source = fs.readFileSync(filePath, "utf8");
  const match = source.match(/window\.behanceProjectData = (\[[\s\S]*\]);/);
  if (!match?.[1]) {
    return [];
  }

  return JSON.parse(match[1]);
}

function summarizeDiff(previousProjects, nextProjects) {
  const previousMap = new Map(previousProjects.map(project => [project.id, JSON.stringify(project)]));
  const nextMap = new Map(nextProjects.map(project => [project.id, JSON.stringify(project)]));

  const added = nextProjects
    .filter(project => !previousMap.has(project.id))
    .map(project => project.id);
  const removed = previousProjects
    .filter(project => !nextMap.has(project.id))
    .map(project => project.id);
  const updated = nextProjects
    .filter(project => previousMap.has(project.id) && previousMap.get(project.id) !== nextMap.get(project.id))
    .map(project => project.id);

  return { added, removed, updated };
}

function writeTextFileAtomic(filePath, contents) {
  const tempPath = `${filePath}.tmp`;
  fs.writeFileSync(tempPath, contents, "utf8");
  fs.renameSync(tempPath, filePath);
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${url} with status ${response.status}`);
  }

  return response.text();
}

async function fetchProfileProjectUrls(profileUrl) {
  const visitedPages = new Set();
  const projectUrls = [];
  let nextPageUrl = profileUrl;

  while (nextPageUrl && !visitedPages.has(nextPageUrl)) {
    visitedPages.add(nextPageUrl);
    const profileHtml = await fetchText(nextPageUrl);
    projectUrls.push(...extractProjectLinks(profileHtml, nextPageUrl));
    nextPageUrl = extractNextProfilePage(profileHtml, nextPageUrl);
  }

  return unique(projectUrls);
}

async function main() {
  const config = {
    ...defaultConfig,
    ...readJson(configPath, {})
  };
  const metaByBehanceId = readJson(metaPath, {});
  const previousProjects = readExistingGeneratedProjects(outputPath);
  const projectUrls = await fetchProfileProjectUrls(config.profileUrl);

  if (!projectUrls.length) {
    throw new Error(`No Behance project links were found on ${config.profileUrl}`);
  }

  const nextProjects = [];
  for (const projectUrl of projectUrls) {
    const behanceId = extractBehanceId(projectUrl);
    const metaEntry = metaByBehanceId[behanceId] || {};
    const projectHtml = await fetchText(projectUrl);
    nextProjects.push(
      buildProjectRecord(projectUrl, projectHtml, metaEntry, config.maxDetailImages)
    );
  }

  const syncInfo = {
    syncedAt: new Date().toISOString(),
    profileUrl: config.profileUrl,
    projectCount: nextProjects.length
  };
  const nextFile = buildGeneratedFile(nextProjects, syncInfo);
  writeTextFileAtomic(outputPath, nextFile);

  const diff = summarizeDiff(previousProjects, nextProjects);
  console.log(`Behance sync completed at ${syncInfo.syncedAt}`);
  console.log(`Profile: ${config.profileUrl}`);
  console.log(`Projects: ${nextProjects.length}`);
  console.log(`Added: ${diff.added.join(", ") || "none"}`);
  console.log(`Removed: ${diff.removed.join(", ") || "none"}`);
  console.log(`Updated: ${diff.updated.join(", ") || "none"}`);
}

main().catch(error => {
  console.error(error.stack || error.message || String(error));
  process.exitCode = 1;
});
