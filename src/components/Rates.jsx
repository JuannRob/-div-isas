import React, { useState } from "react";
import "../css/Rates.css";

const Rates = ({ ratesData, base, setBase }) => {
  const [baseInput, setBaseInput] = useState(""); //acá se almacen los cambios que se van haciendo en el input
  const [filters, setFilters] = useState([
    "USD",
    "ARS",
    "EUR",
    "GBP",
    "JPY",
    "BTC",
  ]);

  //Cambia la base de baseInput cada vez que se cambia en el input
  const handleChange = (e) => {
    setBaseInput(e.target.value);
  };

  //Cuando se apreta Mostrar cambia la base de la app segun lo que esté asignado en 'baseInput'
  const changeBase = (e) => {
    e.preventDefault();
    setBase(baseInput);
    filterRates();
  };

  //Filtra las conversiones más relevantes
  const filterRates = () => {
    // if (filters.includes(base)){
    //   setFilters('')
    // }
    let filteredRates = {};
    filters.forEach((curr) => {
      filteredRates[curr] = ratesData.rates[curr];
    });
    return filteredRates;
  };

  console.log(ratesData.rates);

  // Tiene un formulario para cambiar la divisa base, un párrafo que indica la base actual y una lista con todas sus conversiones.
  return (
    <div className="form">
      <div className="table-conversion">
        <form onSubmit={changeBase} className="row g-3">
          <h4>Buscar conversiones de tu moneda</h4>
          <div className="col">
            <div className="row">
              <label htmlFor="moneda" className="col col-form-label">
                Moneda:
              </label>
              <div className="col">
                <input
                  type="text"
                  id="moneda"
                  className="form-control"
                  value={baseInput}
                  onChange={handleChange}
                  placeholder="AUD, CAD, CHF"
                />
              </div>
            </div>
          </div>
          <div className="col">
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
                      {baseInput} -><b>{key}</b>
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
