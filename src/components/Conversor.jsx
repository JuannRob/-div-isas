import React, { useState } from 'react';
import { convertCurrency } from '../services/API.js'
import '../css/Conversor.css'

const Conversor = () => {
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const [monto, setMonto] = useState("");
	const [result, setResult] = useState("");

	const cambiaYA = (e) => {
		e.preventDefault();
		let myPromise = new Promise(function(myResolve, myReject) {
			
			myResolve(
				convertCurrency(from, to, monto)
			);
  			myReject();
		});
		myPromise.then(
			function(value) { setResult(value); },
			function(err) { console.error(err); }
		)
	}

	return(
		<div className="Conversor">
			<form onSubmit={cambiaYA} className="formConvertir">
				<input 
					type="text" 
					value={from}
					onChange={(e) => setFrom(e.target.value)}
					placeholder="Ingrese Moneda 1"
					className="inputBlanco"
				></input>		
				<input 
					type="text" 
					value={to}
					onChange={(e) => setTo(e.target.value)}
					placeholder="Ingrese Moneda 2"
					className="inputBlanco"
				></input>
				<input 
					type="number"
					value={monto}
					onChange={(e) => setMonto(e.target.value)}
					placeholder="Ingrese Monto"
				></input>
				<input type="submit" value="CambiaYA"></input>
			</form>
			<div className="Resultado">{result.result}</div>
		</div>
	);
}

export default Conversor;