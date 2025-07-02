import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
   const [rates, setRates] = React.useState({});

   React.useEffect(() => {
      fetch('https://api.frankfurter.dev/v1/latest?base=USD')
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
            currency="RUB"
            onChangeCurrency={(cur) => console.log(cur)}
         />
         <Block value={0} currency="USD" />
      </div>
   );
}

export default App;
