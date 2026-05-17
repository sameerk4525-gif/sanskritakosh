import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "changeme123";
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            firstName: "Admin",
            lastName: "User",
            passwordHash: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("✓ Admin user created:", admin.email);

    // Create sample grammar topics
    const grammarTopics = [
        {
            slug: "varnamala",
            title: "Alphabet",
            titleSanskriti: "वर्णमाला",
            description: "Learn the Sanskrit alphabet (Devanagari script)",
            category: "PHONETICS",
            level: "BEGINNER",
            content: JSON.stringify(["अ", "आ", "इ", "ई", "उ", "ऊ"]),
            estimatedTime: 15,
        },
        {
            slug: "nouns",
            title: "Nouns",
            titleSanskriti: "नाम",
            description: "Learn about Sanskrit nouns and their declensions",
            category: "NOUNS",
            level: "BEGINNER",
            content: JSON.stringify(["राम:", "देव:", "नर:"]),
            estimatedTime: 20,
        },
    ];

    for (const topic of grammarTopics) {
        await prisma.grammarTopic.upsert({
            where: { slug: topic.slug },
            update: {},
            create: topic,
        });
    }
    console.log("✓ Grammar topics created");

    // Create sample dictionary words
    const dictionaryWords = [
        {
            word: "namaste",
            devanagariWord: "नमस्ते",
            transliteration: "namaste",
            pronunciation: "nuh-MAH-stey",
            englishMeaning: "A respectful greeting meaning 'I bow to you'",
            partOfSpeech: "INTERJECTION",
        },
        {
            word: "shanti",
            devanagariWord: "शान्ति",
            transliteration: "shanti",
            pronunciation: "SHAHN-tee",
            englishMeaning: "Peace",
            partOfSpeech: "NOUN",
        },
    ];

    for (const word of dictionaryWords) {
        await prisma.dictionaryWord.upsert({
            where: { word: word.word },
            update: {},
            create: word,
        });
    }
    console.log("✓ Dictionary words created");

    // Create sample subhashits
    const subhashits = [
        {
            slug: "yogah-karmasu-kaushalam",
            devanagariText: "योगः कर्मसु कौशलम्",
            englishTranslation: "Yoga is skill in the performance of actions",
            meaning: "Excellence in one's work is the true yoga or union with the divine",
            category: "WISDOM",
            tags: JSON.stringify(["action", "excellence", "bhagavad-gita"]),
        },
        {
            slug: "tat-tvam-asi",
            devanagariText: "तत्त्वमसि",
            englishTranslation: "Thou art that",
            meaning: "A fundamental teaching that the individual soul is one with the universal soul",
            category: "SPIRITUAL",
            tags: JSON.stringify(["vedanta", "upanishad", "soul"]),
        },
    ];

    for (const subhashit of subhashits) {
        await prisma.subhashit.upsert({
            where: { slug: subhashit.slug },
            update: {},
            create: subhashit as any,
        });
    }
    console.log("✓ Subhashits created");

    console.log("✅ Seeding completed successfully!");
}

main()
    .catch((error) => {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
