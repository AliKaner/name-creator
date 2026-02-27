export interface LanguageProfile {
  id: string;
  name: string;
  phonemes: {
    consonants: string[];
    vowels: string[];
    clusters?: string[];
  };
  patterns: string[];
  endings: string[];
  prefixes: string[];
  meanings: Record<string, string>;
  pluralRule: "s" | "ae" | "uk" | "es" | "custom";
  tone: {
    harshness: number; // 0-1
    darkness: number;  // 0-1
    elegance: number;  // 0-1
  };
}

export interface OverrideProfile {
  phonemes?: {
    consonants?: string[];
    vowels?: string[];
    clusters?: string[];
  };
  patterns?: string[];
  endings?: string[];
  prefixes?: string[];
  meanings?: Record<string, string>;
  pluralRule?: "s" | "ae" | "uk" | "es" | "custom";
  tone?: {
    harshness?: number;
    darkness?: number;
    elegance?: number;
  };
}

export interface GenerateRequest {
  preset: string;
  count?: number;
  withMeaning?: boolean;
  override?: OverrideProfile;
}

export interface GeneratedName {
  singular: string;
  plural: string;
  meaning?: string;
}

export interface GenerateResponse {
  results: GeneratedName[];
}
