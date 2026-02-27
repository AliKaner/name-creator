import { LanguageProfile, OverrideProfile, GeneratedName } from "./types";
import { PRESETS } from "./presets";

export function deepMerge<T extends Record<string, any>>(target: T, source?: Record<string, any>): T {
  if (!source) return target;
  
  const output = { ...target };
  
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (
        source[key] instanceof Object && 
        key in target && 
        !Array.isArray(source[key]) && 
        source[key] !== null
      ) {
        output[key as keyof T] = deepMerge(target[key] as Record<string, any>, source[key]) as any;
      } else {
        output[key as keyof T] = source[key] as any;
      }
    }
  }
  return output;
}

export function buildProfile(presetId: string, override?: OverrideProfile): LanguageProfile {
  const preset = PRESETS[presetId];
  if (!preset) {
    throw new Error(`Preset not found: ${presetId}`);
  }
  return deepMerge(preset, override as Record<string, any>);
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function chance(probability: number): boolean {
  return Math.random() < probability;
}

function buildFromPattern(pattern: string, profile: LanguageProfile): string {
  let result = "";
  for (const char of pattern) {
    if (char === "C") {
      result += pick(profile.phonemes.consonants);
    } else if (char === "V") {
      result += pick(profile.phonemes.vowels);
    } else {
      result += char;
    }
  }
  return result;
}

function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function customPlural(name: string): string {
  // Simple heuristic for custom plural fallback
  const lastChar = name.slice(-1).toLowerCase();
  if (['s', 'x', 'z'].includes(lastChar) || name.endsWith('ch') || name.endsWith('sh') || name.endsWith('th')) {
     return name + "es";
  }
  if (['a', 'e', 'i', 'o', 'u'].includes(lastChar)) {
    return name + "th"; // some alien sounding plural
  }
  return name + "i";
}

export function pluralize(name: string, rule: LanguageProfile['pluralRule']): string {
  switch (rule) {
    case "s": return name + "s";
    case "ae": return name + (name.endsWith('a') ? 'e' : 'ae');
    case "uk": return name + "uk";
    case "es": return name + (name.endsWith('e') ? 's' : 'es');
    case "custom": return customPlural(name);
    default: return name + "s";
  }
}

export function generateName(profile: LanguageProfile, withMeaning: boolean = false): GeneratedName {
  const pattern = pick(profile.patterns);
  const core = buildFromPattern(pattern, profile);
  const ending = pick(profile.endings);
  
  const hasPrefix = chance(0.3);
  const prefix = hasPrefix && profile.prefixes.length > 0 ? pick(profile.prefixes) : "";

  const singularRaw = prefix + core + ending;
  const singular = capitalize(singularRaw);
  const plural = capitalize(pluralize(singularRaw, profile.pluralRule));

  let meaning = undefined;
  if (withMeaning) {
    const meaningParts = [];
    if (prefix && profile.meanings[prefix]) {
      meaningParts.push(profile.meanings[prefix]);
    }
    
    // Core meaning isn't strictly defined in the spec, but we can assign a random filler or just the prefix meaning
    if (meaningParts.length > 0) {
      meaning = meaningParts.join("-");
    } else {
      meaning = "unknown";
    }
  }

  return { singular, plural, meaning };
}

export function generateNames(presetId: string, count: number, override?: OverrideProfile, withMeaning: boolean = false): GeneratedName[] {
  const profile = buildProfile(presetId, override);
  const results: GeneratedName[] = [];
  for (let i = 0; i < count; i++) {
    results.push(generateName(profile, withMeaning));
  }
  return results;
}
