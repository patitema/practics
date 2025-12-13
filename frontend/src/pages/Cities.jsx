import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFavorites from '../hooks/Cities/Favorites.js'
import useCityImages from '../hooks/Cities/CityImages.js'
import { CITIES } from '../data/cities.js'
import '../assets/styles/Cities.css'

const KEY = "8Lw6Tu5pGaW16DwZHXd88kJwu7KyZW8zS8ymo2hIkQI" 

const Cities = () => {
    const navigate = useNavigate()
    const { favorites, toggle, has } = useFavorites()
    const { images: cityImages, loading, error } = useCityImages({
        cities: CITIES,
        apiKey: KEY,
        perPage: 1,
    })
    const [view, setView] = useState('all')

    const displayedCities =
        view === 'favorites'
            ? CITIES.filter((city) => favorites.has(city.name))
            : CITIES
    
    console.log('KEY:', import.meta.env.VITE_UNSPLASH_KEY)
    console.log('CityImages в Cities:', cityImages)
    console.log('Loading в Cities:', loading)
    console.log('Error в Cities:', error)
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li onClick={() => setView('all')}>
                            <p>Главная</p>
                        </li>
                        <li onClick={() => setView('favorites')}>
                            <p>Избранное</p>
                        </li>
                    </ul>
                </nav>
            </header>

            <main>
                <div className="main-container">
                    {displayedCities.length === 0 && view === 'favorites' ? (
                        <p
                            style={{
                                color: '#FFF',
                                textAlign: 'center',
                                width: '50%',
                            }}
                        >
                            Нет избранных городов
                        </p>
                    ) : (
                        <ul className="catalog-list">
                            {displayedCities.map((city) => (
                                <li
                                    key={city.searchName}
                                    className="city-card"
                                    onClick={() =>
                                        navigate(`/city/${city.name}`)
                                    }
                                >
                                    <button
                                        className={`favorite-btn ${has(city.name) ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            toggle(city.name)
                                        }}
                                        aria-pressed={has(city.name)}
                                        title={
                                            has(city.name)
                                                ? 'Убрать из избранного'
                                                : 'Добавить в избранное'
                                        }
                                    >
                                        ♥
                                    </button>

                                    {cityImages[city.searchName] ? (
                                        <img
                                            className="photo-city"
                                            src={cityImages[city.searchName]}
                                            alt={city.searchName}
                                            onLoad={() => console.log(`Изображение загружено для ${city.searchName}`)}
                                            onError={(e) => console.error(`Ошибка загрузки изображения для ${city.searchName}:`, e)}
                                        />
                                    ) : (
                                        <div className="photo-city placeholder">
                                            Загрузка...
                                        </div>
                                    )}

                                    <h3 className="name-city">{city.name}</h3>
                                    <p className="discription-city">
                                        {city.description}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Cities
