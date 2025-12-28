'use client';

import { useEffect } from 'react';

interface InArticleAdProps {
    dataAdSlot: string;
    className?: string;
}

/**
 * Google AdSense In-article 광고 컴포넌트
 * 블로그 포스트 본문 중간에 자연스럽게 삽입되는 광고
 * 
 * @param dataAdSlot - Google AdSense에서 발급받은 인아티클 광고 슬롯 ID
 * @param className - 추가 CSS 클래스
 */
export default function InArticleAd({
    dataAdSlot,
    className = '',
}: InArticleAdProps) {
    useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.error('AdSense in-article error:', err);
        }
    }, []);

    return (
        <div className={`adsense-inarticle-container my-8 ${className}`}>
            <div className="text-xs text-gray-500 mb-2 text-center">광고</div>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', textAlign: 'center' }}
                data-ad-layout="in-article"
                data-ad-format="fluid"
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
