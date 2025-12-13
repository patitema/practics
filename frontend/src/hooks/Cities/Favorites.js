import { useEffect, useState, useCallback } from 'react'

const STORAGE_KEY = 'favoriteCities'

export default function useFavorites(initial = []) {
    const [favorites, setFavorites] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            if (!raw) return new Set(initial)
            const parsed = JSON.parse(raw)
            return new Set(Array.isArray(parsed) ? parsed : initial)
        } catch (e) {
            console.error('Ошибка чтения favoriteCities из localStorage', e)
            return new Set(initial)
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(Array.from(favorites))
            )
        } catch (e) {
            console.error('Ошибка записи favoriteCities в localStorage', e)
        }
    }, [favorites])

    const toggle = useCallback((cityName) => {
        setFavorites((prev) => {
            const next = new Set(prev)
            if (next.has(cityName)) next.delete(cityName)
            else next.add(cityName)
            return next
        })
    }, [])

    const has = useCallback((cityName) => favorites.has(cityName), [favorites])

    return { favorites, toggle, has, setFavorites }
}
