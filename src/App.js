import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
   const [fromCurrency, setFromCurrency] = React.useState('RUB');
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

   console.log(rates);

   return (
      <div className="App">
         <Block
            value={0}
            currency="USD"
            onChangeCurrency={(cur) => console.log(cur)}
         />
         <Block value={0} currency="EUR" />
      </div>
   );
}

export default App;
