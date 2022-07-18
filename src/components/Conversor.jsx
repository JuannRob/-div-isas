import React, { useState } from "react";
import icono from "../img/moneda.png";
import "../css/Conversor.css";
import { convertCurrency } from "../services/API.js";

const Conversor = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [monto, setMonto] = useState("");
  const [result, setResult] = useState("");

  const cambiaYA = (e) => {
    e.preventDefault();
    let myPromise = new Promise(function (myResolve, myReject) {
      myResolve(convertCurrency(from, to, monto));
      myReject();
    });
    myPromise.then(
      function (value) {
        setResult(value);
      },
      function (err) {
        console.error(err);
      }
    );
  };

  return (
    <div className="container text-center">
      <img src={icono} className="icono"></img>
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
                <div className="mb-3">
                  <label htmlFor="monedaDe" className="form-label">
                    De:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="monedaDe"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Ingrese Moneda 1"
                  ></input>
                  <div id="monedaDe" className="form-text">
                    Moneda de origen ejemplo USD,PEN ARG
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="monedaA" className="form-label">
                    A:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="monedaA"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Ingrese Moneda 2"
                  ></input>
                  <div id="monedaA" className="form-text">
                    Moneda de destino ejemplo USD,PEN ARG
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
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

                  <div id="importe" className="form-text">
                    Monto a convertir por ejemplo 100,500, 1000
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
                  {monto} {from} = {result.result} {to}
                </p>
                <p>
                  1 {from} = {result.info.rate} {to}
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
