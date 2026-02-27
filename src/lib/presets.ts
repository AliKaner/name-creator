import { LanguageProfile } from "./types";

export const nobleNation: LanguageProfile = {
  id: "noble",
  name: "Honored Kingdom",
  phonemes: {
    consonants: ["l","r","n","v","th","s","m"],
    vowels: ["a","e","ia","ae","o"]
  },
  patterns: ["CVCV","CVVC","CVCVC"],
  endings: ["ion","ar","eth","or"],
  prefixes: ["val","el","aer","gal"],
  meanings: {
    val: "honor",
    gal: "power",
    aer: "light"
  },
  pluralRule: "s",
  tone: {
    harshness: 0.2,
    darkness: 0.1,
    elegance: 0.9
  }
};

export const cthulhu: LanguageProfile = {
  id: "cthulhu",
  name: "Elder Void",
  phonemes: {
    consonants: ["x","z","q","gh","th","kr","rr"],
    vowels: ["u","oo","aa","ia"]
  },
  patterns: ["CVCVC","CVCCVC","VCVC"],
  endings: ["oth","ul","rax","naar"],
  prefixes: ["cth","xul","qor","zha"],
  meanings: {
    cth: "ancient",
    qor: "void",
    zha: "madness"
  },
  pluralRule: "custom",
  tone: {
    harshness: 0.8,
    darkness: 1,
    elegance: 0.1
  }
};

export const shadow: LanguageProfile = {
  id: "shadow",
  name: "Shadow Dominion",
  phonemes: {
    consonants: ["s","z","k","r","th","sh","x"],
    vowels: ["i","e","o","u"]
  },
  patterns: ["CVC","CVCC","CVCVC"],
  endings: ["is","ith","ex","or"],
  prefixes: ["sil","zar","nek"],
  meanings: {
    sil: "silence",
    zar: "poison",
    nek: "shadow"
  },
  pluralRule: "es",
  tone: {
    harshness: 0.7,
    darkness: 0.9,
    elegance: 0.3
  }
};

export const barbar: LanguageProfile = {
  id: "barbar",
  name: "War Clans",
  phonemes: {
    consonants: ["g","k","r","b","d","m","th"],
    vowels: ["a","o","u"]
  },
  patterns: ["CVC","CVCC","CVCVC"],
  endings: ["gar","mok","ruk","tar"],
  prefixes: ["gor","kar","bruk"],
  meanings: {
    gor: "war",
    kar: "blood",
    bruk: "clan"
  },
  pluralRule: "uk",
  tone: {
    harshness: 1,
    darkness: 0.5,
    elegance: 0
  }
};

export const mystic: LanguageProfile = {
  id: "mystic",
  name: "Hidden Order",
  phonemes: {
    consonants: ["l","s","n","v","h","m","r"],
    vowels: ["a","e","i","ia","ou"]
  },
  patterns: ["CVVC","CVCV","VCVC"],
  endings: ["iel","ion","ara","en"],
  prefixes: ["vae","sil","el"],
  meanings: {
    vae: "mind",
    sil: "secret",
    el: "self"
  },
  pluralRule: "ae",
  tone: {
    harshness: 0.3,
    darkness: 0.4,
    elegance: 0.8
  }
};

export const PRESETS: Record<string, LanguageProfile> = {
  noble: nobleNation,
  cthulhu,
  shadow,
  barbar,
  mystic,
};
