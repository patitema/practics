import { useState, useEffect } from 'react'

const fetchCityDescription = async (cityName) => {
    const url = `https://ru.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
        cityName
    )}&prop=extracts&exintro=true&explaintext=true&format=json&origin=*`
    try {
        const res = await fetch(url)
        const data = await res.json()
        const page = Object.values(data.query.pages)[0]
        return page.extract || 'Описание не найдено'
    } catch (err) {
        console.error('Ошибка Wikipedia API', err)
        return 'Не удалось загрузить описание'
    }
}

export const useCityDescription = (cityName) => {
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!cityName) return

        setLoading(true)
        fetchCityDescription(cityName)
            .then((text) => setDescription(text))
            .catch((err) => setError(err))
            .finally(() => setLoading(false))
    }, [cityName])

    return { description, loading, error }
}
