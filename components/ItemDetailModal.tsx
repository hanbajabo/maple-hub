import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ItemCard from './ItemCard';

import type { AppraisalResult } from '../lib/item-appraisal';

interface ItemDetailModalProps {
    item: any;
    appraisalResult?: AppraisalResult | null;
    onClose: () => void;
}

export default function ItemDetailModal({ item, appraisalResult, onClose }: ItemDetailModalProps) {
    useEffect(() => {
        if (item) {
            document.body.style.overflow = 'hidden';
            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', handleEsc);
            return () => {
                document.body.style.overflow = 'unset';
                window.removeEventListener('keydown', handleEsc);
            };
        }
    }, [item, onClose]);

    if (!item) return null;

    return createPortal(
        <div className="fixed inset-0 z-[110000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
            <div className={`relative w-full ${appraisalResult ? 'max-w-2xl' : 'max-w-sm'} animate-in zoom-in-95 duration-200`} onClick={e => e.stopPropagation()}>
                <button 
                    onClick={onClose}
                    className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-slate-800 border border-slate-600 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-[110001] shadow-xl"
                    aria-label="닫기"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div className="max-h-[85vh] overflow-y-auto custom-scrollbar rounded-md">
                    <ItemCard item={item} appraisalResult={appraisalResult} />
                </div>
            </div>
        </div>,
        document.body
    );
}
