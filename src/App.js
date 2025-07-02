import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
   const [fromCurrency, setFromCurrency] = React.useState('USD');
   const [toCurrency, setToCurrency] = React.useState('EUR');
   const [rates, setRates] = React.useState({});

   React.useEffect(() => {
      fetch('https://api.frankfurter.app/latest?base=USD')
         .then((res) => res.json())
         .then((json) => {
            setRates(json.rates);
         })
         .catch((err) => {
            console.warn(err);
            alert('Не удалось получить информацию ');
         });
   }, []);

   // console.log(rates);

   return (
      <div className="App">
         <Block
            value={0}
            currency={fromCurrency}
            onChangeCurrency={setFromCurrency}
         />

         <Block value={0} currency={toCurrency} onChangeCurrency={setToCurrency} />
      </div>
   );
}

export default App;
