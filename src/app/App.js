
import React, { useEffect, useState } from 'react'
import { latestRates } from '../services/API';
import Title from '../components/Title';
import './App.css';
import Rates from '../components/Rates';
import AppName from '../components/AppName';
import Footer from '../components/Footer';
import Conversor from '../components/Conversor';

//Acá están aplicados los componentes principales y los estados para pasarles

const App = () => {

  const [base, setBase] = useState('USD'); //define la base para mostrar sus conversiones
  const [ratesData, setRatesData] = useState([]); //almacena los datos de la base

  //Trae la data de la API al renderizar la página y los aloja en 'ratesData'
  useEffect(() => {
    latestRates(base).then(data => setRatesData(data))
  }, [base]);

  //Al componente Rates se le pasa la data para mostrar y 'setBase' para definir la base
  //en un input
  return (
    <>
      <Title />
      <AppName /> 
      <Rates ratesData={ratesData} setBase={setBase}/>
      <Conversor />
      <Footer />
    </>
  );
}

export default App;
