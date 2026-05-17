import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2).optional(),
});

export const GrammarTopicSchema = z.object({
    titleSkt: z.string().min(1),
    titleEn: z.string().min(1),
    category: z.enum([
        "VARNAMALA",
        "SANDHI",
        "SAMAS",
        "DHATURUPA",
        "SHABDARUPA",
        "PANINI_SUTRA",
    ]),
    content: z.record(z.any()),
    level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).default("BEGINNER"),
    isPublished: z.boolean().default(false),
});

export const DictionaryWordSchema = z.object({
    word: z.string().min(1),
    wordLatin: z.string().optional(),
    meanings: z.array(z.string()).min(1),
    meaningHi: z.string().optional(),
    wordType: z.enum([
        "NOUN",
        "VERB",
        "ADJECTIVE",
        "ADVERB",
        "PARTICLE",
        "PRONOUN",
        "INDECLINABLE",
    ]),
    gender: z.enum(["MASCULINE", "FEMININE", "NEUTER"]).optional(),
    etymology: z.string().optional(),
    usageExample: z.string().optional(),
    relatedWords: z.array(z.string()).optional(),
});

export const SubhashitSchema = z.object({
    shloka: z.string().min(1),
    source: z.string().optional(),
    meaningEn: z.string().min(1),
    meaningHi: z.string().optional(),
    explanation: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    isPublished: z.boolean().default(false),
    isFeatured: z.boolean().default(false),
});

export const ContactFormSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type GrammarTopicInput = z.infer<typeof GrammarTopicSchema>;
export type DictionaryWordInput = z.infer<typeof DictionaryWordSchema>;
export type SubhashitInput = z.infer<typeof SubhashitSchema>;
export type ContactFormInput = z.infer<typeof ContactFormSchema>;
