'use client';

import { useEffect } from 'react';

interface AdBannerProps {
    dataAdSlot: string;
    dataAdFormat?: string;
    dataFullWidthResponsive?: boolean;
    className?: string;
}

/**
 * Google AdSense 광고 배너 컴포넌트
 * 
 * @param dataAdSlot - Google AdSense에서 발급받은 광고 슬롯 ID
 * @param dataAdFormat - 광고 포맷 (auto, fluid, rectangle 등)
 * @param dataFullWidthResponsive - 전체 너비 반응형 광고 여부
 * @param className - 추가 CSS 클래스
 */
export default function AdBanner({
    dataAdSlot,
    dataAdFormat = 'auto',
    dataFullWidthResponsive = true,
    className = '',
}: AdBannerProps) {
    useEffect(() => {
        try {
            // AdSense 광고 로드
            if (typeof window !== 'undefined') {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className={`adsense-container ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-6144208174617294"
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive={dataFullWidthResponsive.toString()}
            />
        </div>
    );
}

// TypeScript 타입 확장 (window.adsbygoogle)
declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}
