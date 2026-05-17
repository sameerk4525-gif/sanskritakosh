export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN",
}

export enum Level {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED",
}

export enum GrammarCategory {
    VARNAMALA = "VARNAMALA",
    SANDHI = "SANDHI",
    SAMAS = "SAMAS",
    DHATURUPA = "DHATURUPA",
    SHABDARUPA = "SHABDARUPA",
    PANINI_SUTRA = "PANINI_SUTRA",
}

export enum ContentType {
    SUBHASHIT = "SUBHASHIT",
    SONG = "SONG",
    STORY = "STORY",
    GRAMMAR = "GRAMMAR",
}

export enum WordType {
    NOUN = "NOUN",
    VERB = "VERB",
    ADJECTIVE = "ADJECTIVE",
    ADVERB = "ADVERB",
    PARTICLE = "PARTICLE",
    PRONOUN = "PRONOUN",
    INDECLINABLE = "INDECLINABLE",
}

export enum Gender {
    MASCULINE = "MASCULINE",
    FEMININE = "FEMININE",
    NEUTER = "NEUTER",
}

export interface User {
    id: string;
    email: string;
    name?: string;
    role: Role;
    avatarUrl?: string;
    streak: number;
    createdAt: Date;
}

export interface GrammarTopic {
    id: string;
    slug: string;
    titleSkt: string;
    titleEn: string;
    category: GrammarCategory;
    content: Record<string, any>;
    level: Level;
    isPublished: boolean;
    createdAt: Date;
}

export interface DictionaryWord {
    id: string;
    word: string;
    wordLatin?: string;
    meanings: string[];
    meaningHi?: string;
    wordType: WordType;
    gender?: Gender;
    audioUrl?: string;
    createdAt: Date;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
    };
    meta?: {
        page?: number;
        total?: number;
        limit?: number;
    };
}
