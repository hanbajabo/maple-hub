'use client';

import { useEffect } from 'react';

interface InFeedAdProps {
    dataAdSlot: string;
    className?: string;
}

/**
 * Google AdSense In-feed 광고 컴포넌트
 * 블로그 목록, 콘텐츠 피드 사이에 자연스럽게 배치되는 광고
 * 
 * @param dataAdSlot - Google AdSense에서 발급받은 인피드 광고 슬롯 ID
 * @param className - 추가 CSS 클래스
 */
export default function InFeedAd({
    dataAdSlot,
    className = '',
}: InFeedAdProps) {
    useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.error('AdSense in-feed error:', err);
        }
    }, []);

    return (
        <div className={`adsense-infeed-container my-8 ${className}`}>
            <div className="text-xs text-gray-500 mb-2 text-center">광고</div>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-format="fluid"
                data-ad-layout-key="-fb+5w+4e-db+86"
                data-ad-client="ca-pub-6144208174617294"
                data-ad-slot={dataAdSlot}
            />
        </div>
    );
}

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}
