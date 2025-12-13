import { useParams } from 'react-router-dom'
import { CITIES } from '../data/cities.js'
import useCityImages from '../hooks/Cities/CityImages.js'
import { useCityDescription } from '../hooks/Cities/CityDescription.js'
import { useNavigate } from 'react-router-dom'
import '../assets/styles/CityPage.css'


// import.meta.env.VITE_UNSPLASH_KEY
const KEY = "8Lw6Tu5pGaW16DwZHXd88kJwu7KyZW8zS8ymo2hIkQI" 

const CityPage = () => {
    const navigate = useNavigate()
    const { cityName } = useParams()
    const city = CITIES.find((c) => c.name === cityName)
    if (!city) return <p className="city-page__notfound">Город не найден</p>

    const { images: cityImages, loading: imageLoading, error: imageError } = useCityImages({
        cities: [city],
        apiKey: KEY,
        perPage: 1,
    })
    const { description, loading: descLoading } = useCityDescription(city.name)
    
    console.log('CityImages в CityPage:', cityImages)
    console.log('Image loading в CityPage:', imageLoading)
    console.log('Image error в CityPage:', imageError)
    console.log('Description loading в CityPage:', descLoading)

    return (
        <main>
            <div className="city-page">
                <button className="back-btn" onClick={() => navigate(`/`)}>
                    Назад
                </button>
                <h1 className="city-page__title">{city.name}</h1>
                <div className="info">
                    {cityImages[city.searchName] ? (
                        <img
                            className="city-page__image"
                            src={cityImages[city.searchName]}
                            alt={city.searchName}
                            onLoad={() => console.log(`Изображение загружено для ${city.searchName} в CityPage`)}
                            onError={(e) => console.error(`Ошибка загрузки изображения для ${city.searchName} в CityPage:`, e)}
                        />
                    ) : (
                        <div className="city-page__placeholder">
                            Загрузка фото...
                        </div>
                    )}

                    {descLoading ? (
                        <p className="city-page__description">
                            Загрузка описания...
                        </p>
                    ) : (
                        <p className="city-page__description">{description}</p>
                    )}
                </div>
            </div>
        </main>
        
    )
}

export default CityPage
