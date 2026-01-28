import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/pf/', '/admin/'],
        },
        sitemap: 'https://maple.ai.kr/sitemap.xml',
    };
}
