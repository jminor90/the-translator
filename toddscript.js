const apiKey = `e2d1ab7e58051d42162f50b1`;
const $userAmount = $('#userAmount');
const $exchange1Drop = $('#amountDrop');
const $exchange2Drop = $('#resultDrop');
const $exchangeResult = $('#exchangeResult');
const latestURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const exchangeURL = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${$exchange1Drop}/${$exchange2Drop}`;

const rateEL = $('#exchangeResult');

/*function getAPI() {

  fetch(latestURL)
  .then((response) => response.json())
  .then((data) => responseFunction(data));  
};

function responseFunction(data) {
const conversionRates = data.conversion_rates;
 // console.log(conversionRates)
}
getAPI(); */

function calculate() {
  const exchange_1 = $exchange1Drop.val();
  const exchange_2 = $exchange2Drop.val();
  const user_Amount = $userAmount.val();

  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${exchange_1}`)
  .then((response) => response.json())
  .then((data) => {
    const rate = data.conversion_rates[exchange_2];
    rateEL.text( `${user_Amount} ${exchange_1} = ${rate * user_Amount}  ${exchange_2}`)
    console.log(rateEl.text())
  });
}

exchange_1.on('change', calculate);
exchange_2.on('change', calculate);
user_Amount.on('change', calculate);



calculate();
