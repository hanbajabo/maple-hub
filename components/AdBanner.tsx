'use client';

import { useEffect } from 'react';

interface AdBannerProps {
    adSlot: string;
    adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
    fullWidthResponsive?: boolean;
    className?: string;
}

export default function AdBanner({
    adSlot,
    adFormat = 'auto',
    fullWidthResponsive = true,
    className = ''
}: AdBannerProps) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className={`ad-container ${className}`}>
            <div className="text-[10px] text-slate-500 text-center mb-1">Advertisement</div>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // 실제 애드센스 승인 후 교체
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive={fullWidthResponsive.toString()}
            />
        </div>
    );
}

// 미리 정의된 광고 슬롯들
export const AdSlots = {
    NEWS_BOTTOM: '1234567890', // 뉴스 하단 (728x90 or responsive)
    SIDEBAR_HEXA: '1234567891', // 헥사 하단 (300x250)
    PAGE_FOOTER: '1234567892', // 페이지 하단 (728x90 or responsive)
};
