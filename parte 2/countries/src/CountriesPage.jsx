import { useEffect, useState } from 'react'
import './App.css'
import service from './service/service'
import CountryDetails from './CountryDetails'

const CountriesPage = () => {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')
  const [renderOption, setRenderOption] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    console.log('effect run, renderOption is now', renderOption)

    // omitir si renderOption no está definido
    if (renderOption) {
      console.log('fetching countries...')
      // getAllCountries returns the axios promise; handle response in the component
      service.getAllCountries()
        .then((response) => {
          setCountries(response.data)
        })
        .catch((err) => {
          // Keep it minimal as per the course: don't introduce advanced error handling
          console.error(err)
        })
    }
  }, [renderOption])

  const filtered = (countries || []).filter( c => {
    const name = c.name?.common || c.name || c.cca2 || ''
    return name.toLowerCase().includes(filter.toLowerCase())
  })

  const handleLoadCountries = () => {
    setRenderOption(true)
  }

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
      {countries === null ? (
        <div className="controls">
          <button onClick={handleLoadCountries}>Cargar países</button>
        </div>
      ) : (
        <>
          <div className="controls">
            <input
              placeholder="Buscar país..."
              value={filter}
              onChange={handleFilterChange}
            />
            <button onClick={handleClearFilter}>Limpiar</button>
          </div>

          {filtered.length > 10 ? <p>Demasiados resultados, especifica otro filtro</p> : null}

          {(filtered.length > 1 && filtered.length <= 10) ? (
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

          {(filtered.length === 1 && !selected) ? (
            <CountryDetails country={filtered[0]} onBack={() => {}} />
          ) : null}
        </>
      )}
    </div>
  )
}

export default CountriesPage
