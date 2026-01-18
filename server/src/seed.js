import { Problem } from './models/index.js';
import connectDB from './config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const companies = [
    {
        name: 'Google',
        logo: 'https://logo.clearbit.com/google.com',
        problemCount: 450,
        color: '#4285F4'
    },
    {
        name: 'Meta',
        logo: 'https://logo.clearbit.com/meta.com',
        problemCount: 380,
        color: '#0668E1'
    },
    {
        name: 'Amazon',
        logo: 'https://logo.clearbit.com/amazon.com',
        problemCount: 520,
        color: '#FF9900'
    },
    {
        name: 'Microsoft',
        logo: 'https://logo.clearbit.com/microsoft.com',
        problemCount: 410,
        color: '#00A4EF'
    },
    {
        name: 'Apple',
        logo: 'https://logo.clearbit.com/apple.com',
        problemCount: 290,
        color: '#000000'
    },
    {
        name: 'Netflix',
        logo: 'https://logo.clearbit.com/netflix.com',
        problemCount: 180,
        color: '#E50914'
    },
    {
        name: 'Tesla',
        logo: 'https://logo.clearbit.com/tesla.com',
        problemCount: 120,
        color: '#E82127'
    },
    {
        name: 'Uber',
        logo: 'https://logo.clearbit.com/uber.com',
        problemCount: 200,
        color: '#000000'
    },
    {
        name: 'LinkedIn',
        logo: 'https://logo.clearbit.com/linkedin.com',
        problemCount: 165,
        color: '#0A66C2'
    },
    {
        name: 'Adobe',
        logo: 'https://logo.clearbit.com/adobe.com',
        problemCount: 145,
        color: '#FF0000'
    }
];

// Sample problems
const sampleProblems = [
    {
        title: 'Two Sum',
        difficulty: 'Easy',
        topic: 'Array',
        pattern: 'Hash Table',
        companies: ['Google', 'Amazon', 'Microsoft'],
        url: 'https://leetcode.com/problems/two-sum/',
        notes: 'Use hash map for O(n) solution'
    },
    {
        title: 'Reverse Linked List',
        difficulty: 'Easy',
        topic: 'Linked List',
        pattern: 'In-place Reversal',
        companies: ['Meta', 'Amazon', 'Apple'],
        url: 'https://leetcode.com/problems/reverse-linked-list/',
        notes: 'Iterative or recursive approach'
    },
    {
        title: 'Valid Parentheses',
        difficulty: 'Easy',
        topic: 'Stack',
        pattern: 'Stack',
        companies: ['Google', 'Meta', 'Amazon'],
        url: 'https://leetcode.com/problems/valid-parentheses/',
        notes: 'Stack-based bracket matching'
    },
    {
        title: 'Merge Two Sorted Lists',
        difficulty: 'Easy',
        topic: 'Linked List',
        pattern: 'Merge Intervals',
        companies: ['Amazon', 'Microsoft', 'Apple'],
        url: 'https://leetcode.com/problems/merge-two-sorted-lists/',
        notes: 'Two pointer technique'
    },
    {
        title: 'Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        topic: 'Array',
        pattern: 'Sliding Window',
        companies: ['Google', 'Amazon', 'Meta'],
        url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
        notes: 'Track minimum price and maximum profit'
    }
];

async function seedDatabase() {
    try {
        await connectDB();

        console.log('🌱 Starting database seeding...');

        // Note: Companies are dynamically generated from problems
        // So we just need to seed problems with company tags
        console.log('✅ Companies will be auto-generated from problem tags');

        console.log(`📝 Sample problems ready to be added by users`);
        console.log(`Total companies: ${companies.length}`);
        console.log(`Sample problems: ${sampleProblems.length}`);

        console.log('\n📋 Company List:');
        companies.forEach(company => {
            console.log(`  - ${company.name} (${company.problemCount} problems)`);
        });

        console.log('\n✅ Database seed information ready!');
        console.log('💡 Users will add problems through the UI');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

seedDatabase();
