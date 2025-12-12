import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://maple.ai.kr',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        // Guide Pages
        {
            url: 'https://maple.ai.kr/guide',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: 'https://maple.ai.kr/guide/ability-guide',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://maple.ai.kr/guide/about-danpung-i',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://maple.ai.kr/guide/bonus-stat-guide',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://maple.ai.kr/guide/boss-equipment-progression',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://maple.ai.kr/guide/boss-rewards',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://maple.ai.kr/guide/boss-tier-guide',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://maple.ai.kr/guide/combat-power-tier-system',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://maple.ai.kr/guide/cooltime-hat-guide',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://maple.ai.kr/guide/hexa-skill-priority',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://maple.ai.kr/guide/hexa-skills',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://maple.ai.kr/guide/hexa-stats-optimization',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://maple.ai.kr/guide/seed-ring-guide',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://maple.ai.kr/guide/starforce-efficiency-guide',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        // News & Updates
        {
            url: 'https://maple.ai.kr/news',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://maple.ai.kr/patch-notes',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        // Blog
        {
            url: 'https://maple.ai.kr/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: 'https://maple.ai.kr/blog/beginner-guide-2025',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://maple.ai.kr/blog/free-to-play-guide',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://maple.ai.kr/blog/hyperburning-jobs-2025',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://maple.ai.kr/blog/hyperburning-jobs-2025-v2',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: 'https://maple.ai.kr/blog/crown-winter-showcase-2025',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        // Legal & Info Pages
        {
            url: 'https://maple.ai.kr/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://maple.ai.kr/terms',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://maple.ai.kr/privacy',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://maple.ai.kr/contact',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];
}
