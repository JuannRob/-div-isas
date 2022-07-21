import React, { useState } from "react";
import icono from "../img/moneda.png";
import "../css/Conversor.css";
import { convertCurrency } from "../services/API.js";

const Conversor = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [monto, setMonto] = useState("");
  const [result, setResult] = useState("");
  const [current, setCurrent] = useState({from: '', to: '', monto: ''})//mantiene los últimos datos que se buscaron

  //llama a la función de conversión de servicios
  const cambiaYA = (e) => {
    e.preventDefault();
    let myPromise = new Promise(function (myResolve, myReject) {
      myResolve(convertCurrency(from, to, monto));
      myReject();
    });
    myPromise.then(
      function (value) {
        setResult(value);
        setCurrent(prevState => {
          return {...prevState, from: from, to: to, monto: monto};
        });
      },
      function (err) {
        console.error(err);
      }
    );
  };

  return (
    <div className="container text-center">
      <img src={icono} className="icono" alt="icono"></img>
      <div className="card text-center bg-light">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a className="nav-link active" aria-current="true" href="#">
                Convertir
              </a>
            </li>
          </ul>
        </div>

        <div className="card-body">
          <form onSubmit={cambiaYA} className="formConvertir">
            <div className="row">
              <div className="col">
                <div className="mb-4">
                  <label htmlFor="monedaDe" className="form-label">
                    De:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="monedaDe"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="ej. USD, PEN, ARG"
                  ></input>
                </div>
              </div>
              <div className="col">
                <div className="mb-4">
                  <label htmlFor="monedaA" className="form-label">
                    A:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="monedaA"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="ej. USD, PEN, ARG"
                  ></input>
                </div>
              </div>
              <div className="col">
                <div className="mb-4">
                  <label htmlFor="importe" className="form-label ">
                    Importe:
                  </label>

                  <div className="row g-2 align-items-center">
                    <div className="col-auto">
                      <input
                        type="number"
                        className="form-control"
                        id="importe"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
                        placeholder="Ingrese importe"
                      ></input>
                    </div>
                    <div className="col-auto">{from}</div>
                  </div>
                </div>
              </div>
            </div>
            <input
              type="submit"
              className="btn btn-primary convertir"
              value="Convertir"
            ></input>
          </form>
          <div className="Resultado">
            {result.result > 0 && (
              <>
                <p>
                  {current.monto} {current.from} = {result.result} {current.to}
                </p>
                <p>
                  1 {current.from} = {result.info.rate} {current.to}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversor;
