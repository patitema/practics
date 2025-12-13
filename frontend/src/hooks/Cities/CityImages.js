import { useEffect, useState } from 'react'

export default function useCityImages({ cities, apiKey, perPage = 1 }) {
    const [images, setImages] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!Array.isArray(cities) || cities.length === 0) {
            setImages({})
            setLoading(false)
            return
        }

        let cancelled = false
        const controller = new AbortController()

        const fetchImages = async () => {
            setLoading(true)
            setError(null)
            const result = {}
            console.log('Начинаем загрузку изображений для городов:', cities.map(c => c.searchName))
            console.log('API Key:', apiKey ? 'Предоставлен' : 'Не предоставлен')
            
            for (const city of cities) {
                try {
                    const q = encodeURIComponent(city.searchName)
                    // Используем прокси-сервер вместо прямого запроса к Unsplash
                    const url = `http://localhost:3000/api/unsplash/search?query=${q}&per_page=${perPage}`
                    console.log(`Запрашиваем изображение для ${city.searchName}:`, url)
                    
                    const resp = await fetch(url, { signal: controller.signal })
                    console.log(`Ответ для ${city.searchName}:`, resp.status, resp.ok)
                    
                    if (!resp.ok) {
                        console.warn(`Proxy returned ${resp.status} for ${city.searchName}`)
                        continue
                    }
                    
                    const data = await resp.json()
                    console.log(`Данные для ${city.searchName}:`, data)
                    
                    const photo = data.results && data.results[0]
                    if (photo && photo.urls && photo.urls.regular) {
                        result[city.searchName] = photo.urls.regular
                        console.log(`Изображение для ${city.searchName}:`, photo.urls.regular)
                    } else {
                        console.log(`Нет изображения для ${city.searchName}`)
                    }
                } catch (err) {
                    if (err.name === 'AbortError') break
                    console.error(`Error loading image for ${city.searchName}:`, err)
                    console.error(`Stack trace for ${city.searchName}:`, err.stack)
                }
                if (cancelled) break
            }
            
            console.log('Результат загрузки:', result)
            if (!cancelled) {
                setImages(result)
                setLoading(false)
            }
        }

        fetchImages().catch((err) => {
            if (!cancelled) {
                setError(err)
                setLoading(false)
            }
        })

        return () => {
            cancelled = true
            controller.abort()
        }
    }, [cities, apiKey, perPage])

    return { images, loading, error }
}
