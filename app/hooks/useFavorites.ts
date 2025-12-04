/**
 * useFavorites Hook
 * 즐겨찾기 관리 로직
 */

import { useState, useEffect, useRef } from 'react';

interface Favorite {
    name: string;
    world: string;
    level: number;
    job: string;
}

const STORAGE_KEY = 'maple-ai-favorites';

export function useFavorites() {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
    const favoritesRef = useRef<HTMLDivElement>(null);

    // Load favorites from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setFavorites(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load favorites:', e);
            }
        }
    }, []);

    // Save favorites to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    // Close favorites dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (favoritesRef.current && !favoritesRef.current.contains(event.target as Node)) {
                setIsFavoritesOpen(false);
            }
        };

        if (isFavoritesOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFavoritesOpen]);

    // 즐겨찾기 드롭다운 열릴 때 히스토리에 상태 추가, 뒤로가기로 닫기
    useEffect(() => {
        if (isFavoritesOpen) {
            window.history.pushState({ favorites: true }, '');

            const handlePopState = (e: PopStateEvent) => {
                if (isFavoritesOpen) {
                    setIsFavoritesOpen(false);
                }
            };

            window.addEventListener('popstate', handlePopState);

            return () => {
                window.removeEventListener('popstate', handlePopState);
            };
        }
    }, [isFavoritesOpen]);

    const addFavorite = (favorite: Favorite) => {
        setFavorites(prev => {
            // 이미 존재하면 추가하지 않음
            if (prev.some(f => f.name === favorite.name && f.world === favorite.world)) {
                return prev;
            }
            return [...prev, favorite];
        });
    };

    const removeFavorite = (name: string, world: string) => {
        setFavorites(prev => prev.filter(f => !(f.name === name && f.world === world)));
    };

    const isFavorite = (name: string, world: string): boolean => {
        return favorites.some(f => f.name === name && f.world === world);
    };

    const toggleFavorite = (favorite: Favorite) => {
        if (isFavorite(favorite.name, favorite.world)) {
            removeFavorite(favorite.name, favorite.world);
        } else {
            addFavorite(favorite);
        }
    };

    return {
        favorites,
        isFavoritesOpen,
        favoritesRef,
        setIsFavoritesOpen,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
    };
}
