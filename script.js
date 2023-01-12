const apiKey = `e2d1ab7e58051d42162f50b1`;
const $userAmount = document.querySelector('#userAmount');
const $exchange1Drop = document.querySelector('#amountDrop');
const $exchange2Drop = document.querySelector('#resultDrop');
const $exchangeResult = document.querySelector('#exchangeResult');
const latestURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const exchange1 = 'USD'
const exchange2= 'GBP'
const exchangeURL = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${exchange1}/${exchange2}`;

  fetch(exchangeURL)
  .then((response) => response.json())
  .then((data) => console.log(data));

  let amountInput = $userAmount.value; 