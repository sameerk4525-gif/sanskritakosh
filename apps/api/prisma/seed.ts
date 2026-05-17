import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    try {
        // Create Admin User
        const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
        const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "changeme123";

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        const admin = await prisma.user.upsert({
            where: { email: adminEmail },
            update: {},
            create: {
                email: adminEmail,
                passwordHash: hashedPassword,
                firstName: "Admin",
                lastName: "User",
                role: "ADMIN",
                level: "ADVANCED",
                isActive: true,
            },
        });

        console.log("✓ Admin user created:", admin.email);

        // Create Grammar Topics
        const grammarTopics = await prisma.grammarTopic.createMany({
            data: [
                {
                    slug: "sanskrit-introduction",
                    title: "Introduction to Sanskrit",
                    titleSanskriti: "संस्कृत परिचय",
                    description: "Learn the basics of Sanskrit language",
                    category: "INTRODUCTION",
                    level: "BEGINNER",
                    isFeatured: true,
                    isPublished: true,
                    content: "Sanskrit is an ancient Indo-European language. It is one of the oldest languages in the world and is still used in religious and academic contexts.",
                    estimatedTime: 15,
                },
                {
                    slug: "devanagari-script",
                    title: "Devanagari Script",
                    titleSanskriti: "देवनागरी लिपि",
                    description: "Master the Devanagari writing system",
                    category: "PHONETICS",
                    level: "BEGINNER",
                    isFeatured: true,
                    isPublished: true,
                    content: "Devanagari is the writing system used for Sanskrit and many other Indian languages. It consists of vowels (swara) and consonants (vyanjana).",
                    estimatedTime: 20,
                },
            ],
        });

        console.log("✓ Grammar topics created:", grammarTopics.count);

        // Create Subhashits
        const subhashits = await prisma.subhashit.createMany({
            data: [
                {
                    slug: "vidya-dana",
                    devanagariText: "विद्या दानं सर्वदानं श्रेष्ठं",
                    englishTranslation: "The gift of knowledge is the greatest of all gifts",
                    meaning:
                        "This subhashit teaches that sharing knowledge is more valuable than any material gift",
                    category: "WISDOM",
                    author: "Sanskrit Literature",
                    isFeatured: true,
                    isPublished: true,
                },
                {
                    slug: "aarogyam-paramam-sukham",
                    devanagariText: "आरोग्यं परमं सुखम्",
                    englishTranslation: "Health is the greatest wealth",
                    meaning: "Good health is more valuable than any material possession",
                    category: "WISDOM",
                    author: "Sanskrit maxim",
                    isFeatured: true,
                    isPublished: true,
                },
            ],
        });

        console.log("✓ Subhashits created:", subhashits.count);

        // Create Dictionary Words
        const words = await prisma.dictionaryWord.createMany({
            data: [
                {
                    word: "namaste",
                    devanagariWord: "नमस्ते",
                    transliteration: "namaste",
                    pronunciation: "nuh-mass-hey",
                    englishMeaning: "Greeting - a respectful salutation",
                    partOfSpeech: "NOUN",
                    examples: JSON.stringify([
                        {
                            example: "नमस्ते, मित्र।",
                            meaning: "Greetings, friend.",
                        },
                    ]),
                    isFeatured: true,
                    isPublished: true,
                },
                {
                    word: "dharma",
                    devanagariWord: "धर्म",
                    transliteration: "dharma",
                    pronunciation: "dar-muh",
                    englishMeaning: "Duty, righteousness, cosmic law",
                    partOfSpeech: "NOUN",
                    gender: "MASCULINE",
                    examples: JSON.stringify([
                        {
                            example: "धर्मं पालय।",
                            meaning: "Protect righteousness.",
                        },
                    ]),
                    isFeatured: true,
                    isPublished: true,
                },
                {
                    word: "shanti",
                    devanagariWord: "शान्ति",
                    transliteration: "shanti",
                    pronunciation: "shahn-tee",
                    englishMeaning: "Peace",
                    partOfSpeech: "NOUN",
                    gender: "FEMININE",
                    examples: JSON.stringify([
                        {
                            example: "शान्तिः शान्तिः शान्तिः।",
                            meaning: "Peace, peace, peace.",
                        },
                    ]),
                    isPublished: true,
                },
            ],
        });

        console.log("✓ Dictionary words created:", words.count);

        // Create Sanskrit Numbers
        const numbers = await prisma.sanskritNumber.createMany({
            data: Array.from({ length: 20 }, (_, i) => ({
                number: i + 1,
                devanagariNumeral: (i + 1).toString(),
                sanskritName: [
                    "एक",
                    "द्वि",
                    "त्रि",
                    "चतुर्",
                    "पञ्च",
                    "षष्",
                    "सप्त",
                    "अष्ट",
                    "नव",
                    "दश",
                    "एकादश",
                    "द्वादश",
                    "त्रयोदश",
                    "चतुर्दश",
                    "पञ्चदश",
                    "षोडश",
                    "सप्तदश",
                    "अष्टादश",
                    "नवदश",
                    "विंशति",
                ][i],
                transliteration: [
                    "eka",
                    "dwi",
                    "tri",
                    "chatur",
                    "panch",
                    "shash",
                    "sapt",
                    "ashtau",
                    "nava",
                    "dasha",
                    "ekadasha",
                    "dwadasha",
                    "trayodasha",
                    "chaturdasha",
                    "panchadasha",
                    "shodasha",
                    "saptadasha",
                    "ashtadasha",
                    "navadasha",
                    "vimsati",
                ][i],
                englishName: [
                    "One",
                    "Two",
                    "Three",
                    "Four",
                    "Five",
                    "Six",
                    "Seven",
                    "Eight",
                    "Nine",
                    "Ten",
                    "Eleven",
                    "Twelve",
                    "Thirteen",
                    "Fourteen",
                    "Fifteen",
                    "Sixteen",
                    "Seventeen",
                    "Eighteen",
                    "Nineteen",
                    "Twenty",
                ][i],
                explanation: `Number ${i + 1} in Sanskrit`,
            })),
        });

        console.log("✓ Sanskrit numbers created:", numbers.count);

        // Create Songs
        const songs = await prisma.song.createMany({
            data: [
                {
                    slug: "gayatri-mantra",
                    title: "Gayatri Mantra",
                    artist: "Traditional",
                    lyrics: JSON.stringify({
                        verse: "ॐ भूर्भुवः स्वः",
                        translation: "Om, Earth, Atmosphere, Sky"
                    }),
                    description: "Ancient Vedic mantra for spiritual awakening",
                    category: "DEVOTIONAL",
                    difficulty: "BEGINNER",
                    isPublished: true,
                },
                {
                    slug: "mahamrityunjaya-mantra",
                    title: "Mahamrityunjaya Mantra",
                    artist: "Vedic",
                    lyrics: JSON.stringify({
                        verse: "ॐ त्र्यम्बकं यजामहे",
                        translation: "Om, we worship the three-eyed Lord"
                    }),
                    description: "Mantra for healing and longevity",
                    category: "DEVOTIONAL",
                    difficulty: "INTERMEDIATE",
                    isPublished: true,
                },
            ],
        });

        console.log("✓ Songs created:", songs.count);

        // Create Stories
        const stories = await prisma.story.createMany({
            data: [
                {
                    slug: "bhagavad-gita-chapter-1",
                    title: "Bhagavad Gita - Chapter 1",
                    devanagariTitle: "भगवद् गीता",
                    content: JSON.stringify({
                        paragraphs: [
                            "The Bhagavad Gita is a Hindu philosophical and devotional text that is part of the epic Mahabharata."
                        ]
                    }),
                    englishTranslation: JSON.stringify({
                        paragraphs: [
                            "The Bhagavad Gita is a Hindu philosophical and devotional text that is part of the epic Mahabharata."
                        ]
                    }),
                    category: "MYTHOLOGY",
                    difficulty: "INTERMEDIATE",
                    estimatedTime: 30,
                    isPublished: true,
                },
                {
                    slug: "ramayana-story",
                    title: "The Ramayana",
                    devanagariTitle: "रामायण",
                    content: JSON.stringify({
                        paragraphs: [
                            "The Ramayana is an ancient Sanskrit epic poem that narrates the life of Prince Rama."
                        ]
                    }),
                    englishTranslation: JSON.stringify({
                        paragraphs: [
                            "The Ramayana is an ancient Sanskrit epic poem that narrates the life of Prince Rama."
                        ]
                    }),
                    category: "MYTHOLOGY",
                    difficulty: "ADVANCED",
                    estimatedTime: 60,
                    isPublished: true,
                },
            ],
        });

        console.log("✓ Stories created:", stories.count);

        // Create Daily Sanskrit Content
        const today = new Date();
        const dailyContents = await prisma.dailyContent.createMany({
            data: [
                {
                    contentType: "WORD",
                    contentId: "word-1",
                    contentTitle: "Word of the Day: Namaste",
                    contentText: "नमस्ते - A respectful greeting meaning 'I bow to you'",
                    isActive: true,
                    scheduledDate: today,
                    viewCount: 0,
                },
                {
                    contentType: "SUBHASHIT",
                    contentId: "subhashit-1",
                    contentTitle: "Verse of the Day",
                    contentText: "विद्या दानं सर्वदानं श्रेष्ठं - Knowledge is the greatest gift",
                    isActive: true,
                    scheduledDate: new Date(today.getTime() + 86400000), // Tomorrow
                    viewCount: 0,
                },
                {
                    contentType: "GRAMMAR",
                    contentId: "grammar-1",
                    contentTitle: "Grammar Lesson: Vowels",
                    contentText: "Learn the 12 vowels (स्वर) of Sanskrit: अ आ इ ई उ ऊ ऋ ए ऐ ओ औ",
                    isActive: true,
                    scheduledDate: new Date(today.getTime() + 172800000), // Day after tomorrow
                    viewCount: 0,
                },
            ],
        });

        console.log("✓ Daily Sanskrit content created:", dailyContents.count);

        console.log("✅ Database seeded successfully!");
    } catch (e) {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
