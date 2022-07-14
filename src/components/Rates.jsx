import React, { useState } from 'react'
import '../css/Rates.css'

const Rates = ({ ratesData, base, setBase }) => {

  const [baseInput, setBaseInput] = useState(''); //acá se almacen los cambios que se van haciendo en el input
  const [filters, setFilters] = useState(['USD', 'ARS', 'EUR', 'GBP', 'JPY', 'BTC']);
  
  //Cambia la base de baseInput cada vez que se cambia en el input
  const handleChange = (e) => {
    setBaseInput(e.target.value)
  };

  //Cuando se apreta Mostrar cambia la base de la app segun lo que esté asignado en 'baseInput'
  const changeBase = (e) => {
    e.preventDefault();
    setBase(baseInput);
    filterRates()
  }

  //Filtra las conversiones más relevantes
  const filterRates = () => {
    // if (filters.includes(base)){
    //   setFilters('')
    // }
    let filteredRates = {};
    filters.forEach((curr) => {
      filteredRates[curr] = ratesData.rates[curr]
    })
    return filteredRates
  };

  console.log(ratesData.rates);

  // Tiene un formulario para cambiar la divisa base, un párrafo que indica la base actual y una lista con todas sus conversiones.
  return (
    <div className="form">
      <form onSubmit={changeBase}>
        <label>
          <p>
            Moneda:
          </p>
          <input type="text" value={baseInput} onChange={handleChange} placeholder='AUD, CAD, CHF' />
        </label>
        <input type="submit" value="Mostrar" />
      </form>
      <p id='base-p'>Conversiones del <b>{ratesData.base}</b>:</p>
      <ul>
        {ratesData.rates ? (
          Object.entries(filterRates()).map(([key, value], index) => (
            <li key={index}><b>{key}</b>: {value.toString()}</li>
          ))
        ) : (
          <li>Actualizando información...</li>
        )}
      </ul>
    </div>
  )

}

export default Rates