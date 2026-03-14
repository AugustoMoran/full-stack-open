import { useEffect, useState } from 'react'
import './App.css'
import service from './service/service'
import CountryDetails from './CountryDetails'

const CountriesPage = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('fetching countries...')
    service.getAllCountries()
      .then((response) => {
        setCountries(response.data)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const filtered = (countries || []).filter( c => {
    const name = c.name?.common || c.name || c.cca2 || ''
    return name.toLowerCase().includes(filter.toLowerCase())
  })

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleClearFilter = () => {
    setFilter('')
  }

  const handleShowCountry = (country) => {
    setSelected(country)
  }

  const handleBack = () => {
    setSelected(null)
  }

  return (
    <div className="countries-page">
      <div className="controls">
        <input
          placeholder="Buscar país..."
          value={filter}
          onChange={handleFilterChange}
        />
        <button onClick={handleClearFilter}>Limpiar</button>
      </div>

      {isLoading ? <p>Cargando países...</p> : null}

      {!isLoading && filtered.length > 10 ? (
        <p>Demasiados resultados, especifica otro filtro</p>
      ) : null}

      {!isLoading && (filtered.length > 1 && filtered.length <= 10) ? (
        <ul>
          {filtered.map((c) => (
            <li key={c.cca3 || c.name?.common || JSON.stringify(c)}>
              {c.name?.common || c.name}{' '}
              <button onClick={() => handleShowCountry(c)}>mostrar</button>
            </li>
          ))}
        </ul>
      ) : null}

      {selected ? <CountryDetails country={selected} onBack={handleBack} /> : null}

      {!selected && !isLoading && filtered.length === 1 ? (
        <CountryDetails country={filtered[0]} onBack={() => {}} />
      ) : null}
    </div>
  )
}

export default CountriesPage
