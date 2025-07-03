import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
   const [fromCurrency, setFromCurrency] = React.useState('AUD');
   const [toCurrency, setToCurrency] = React.useState('EUR');
   const [fromPrice, setFromPirce] = React.useState(0);
   const [toPrice, setToPirce] = React.useState(1);

   const ratesRef = React.useRef({});

   React.useEffect(() => {
      fetch('https://api.frankfurter.app/latest?base=USD')
         .then((res) => res.json())
         .then((json) => {
            ratesRef.current = json.rates;
            onChangeToPrice(1);
         })
         .catch((err) => {
            console.warn(err);
            alert('Не удалось получить информацию ');
         });
   }, []);

   const onChangeFromPrice = (value) => {
      const price = value / ratesRef.current[fromCurrency];
      const result = price * ratesRef.current[toCurrency];
      setToPirce(result.toFixed(3));
      setFromPirce(value);
   };

   const onChangeToPrice = (value) => {
      const result =
         (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
      setFromPirce(result.toFixed(3));
      setToPirce(value);
   };

   React.useEffect(() => {
      onChangeFromPrice(fromPrice);
   }, [fromCurrency]);

   React.useEffect(() => {
      onChangeToPrice(toPrice);
   }, [toCurrency]);

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
