'use client';

import { usePathname } from 'next/navigation';

export default function AdSenseScript() {
    const pathname = usePathname();

    // 포트폴리오 페이지(/pf/...)에서는 애드센스 광고 차단
    if (pathname?.startsWith('/pf/')) {
        return null;
    }

    return (
        <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6144208174617294"
            crossOrigin="anonymous"
        />
    );
}
