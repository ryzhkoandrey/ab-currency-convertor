import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
   const [fromCurrency, setFromCurrency] = React.useState('USD');
   const [toCurrency, setToCurrency] = React.useState('EUR');
   const [rates, setRates] = React.useState({});
   const [fromPrice, setFromPirce] = React.useState(0);
   const [toPrice, setToPirce] = React.useState(0);

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

   const onChangeFromPrice = (value) => {
      setFromPirce(value);
   };

   const onChangeToPrice = (value) => {
      setToPirce(value);
   };

   // console.log(rates);

   return (
      <div className="App">
         <Block
            value={fromPrice}
            currency={fromCurrency}
            onChangeCurrency={setFromCurrency}
            onChangeValue={onChangeFromPrice}
         />

         <Block
            value={toPrice}
            currency={toCurrency}
            onChangeCurrency={setToCurrency}
            onChangeValue={onChangeToPrice}
         />
      </div>
   );
}

export default App;
