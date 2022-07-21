import React, { useState } from "react";
import "../css/Rates.css";

const Rates = ({ ratesData, setBase }) => {
  const [baseInput, setBaseInput] = useState(""); //Almacena los cambios que se van haciendo en el input

  //Actualiza el state 'baseInput'
  const handleChange = (e) => {
    setBaseInput(e.target.value);
  };

  //Al presionar 'Mostrar' cambia la base de la app según la asignada en 'baseInput'
  const changeBase = (e) => {
    e.preventDefault();
    setBase(baseInput);
  };

  //Filtra solo las conversiones más relevantes
  const filterRates = () => {
    const filters = ["USD", "ARS", "EUR", "GBP", "JPY", "BTC"]
    let filteredRates = {};
    filters.forEach((curr) => {
      filteredRates[curr] = ratesData.rates[curr];
    });

    //si la moneda base es una de las conversiones a mostrar la quita de la lista
    if (filteredRates.hasOwnProperty(ratesData.base)) {
      delete filteredRates[ratesData.base];
    }
    return filteredRates;
  };

  return (
    <div className="form">
      <div className="table-conversion">
        <form onSubmit={changeBase} className="row g-3">
          <h4>Buscar conversiones de tu moneda</h4>
          <div className="col">
            <div className="row">
              <label htmlFor="moneda" className="col-4 col-form-label">
                Moneda:
              </label>
              <div className="col-8">
                <input
                  type="text"
                  id="moneda"
                  className="form-control"
                  value={baseInput}
                  onChange={handleChange}
                  placeholder="ej. AUD, MXN"
                />
              </div>
            </div>
          </div>
          <div className="col-4">
            <input type="submit" className="btn btn-primary" value="Mostrar" />
          </div>
        </form>
        <br></br>
        <p id="base-p">
          Convertir 1 <b>{ratesData.base}</b> a:
        </p>
        {ratesData.rates ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Moneda</th>
                <th scope="col">Valor</th>
              </tr>
            </thead>
            <tbody>
              {ratesData.rates &&
                Object.entries(filterRates()).map(([key, value], index) => (
                  <tr key={index}>
                    <td>
                      <b>{key}</b>
                    </td>
                    <td>
                      {value.toString()} {key}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>Actualizando información...</p>
        )}
      </div>
    </div>
  );
};

export default Rates;
