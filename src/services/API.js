const URL_BASE = 'https://api.exchangerate.host'

//Acá están todas las conexiones con la API

//Trae las últimas conversiónes de la divisa elegida en 'base'
export async function latestRates(base) {
  try {
    const res = await fetch(`${URL_BASE}/latest?base=${base}`)
    const data = await res.json();
    return data;
  } catch (err) {
    return console.log('error:', err);
  }
}

//Función para implementar el conversor. Recibe las dos divisas y la cantidad
export async function convertCurrency(from, to, amount) {
  try {
    const res = await fetch(`${URL_BASE}/convert?from=${from}&to=${to}&amount=${amount}`)
    const data = await res.json();
    return data;
  } catch (err) {
    return console.log('error:', err);
  }

}