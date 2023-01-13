const apiKey = `e2d1ab7e58051d42162f50b1`;
const $userAmount = $('#userAmount');
const $exchange1Drop = $('#amountDrop');
const $exchange2Drop = $('#resultDrop');
const $exchangeResult = $('#exchangeResult');
const latestURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const exchangeURL = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${$exchange1Drop}/${$exchange2Drop}`;
const searchBtn = $('#searchBtn');

const rateEL = $('#exchangeResult');

function calculate() {
  const exchange_1 = $exchange1Drop.val();
  const exchange_2 = $exchange2Drop.val();
  const user_Amount = $userAmount.val();
 

  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${exchange_1}`)
  .then((response) => response.json())
  .then((data) => {
    const rate = data.conversion_rates[exchange_2];
    rateEL.text( `${user_Amount} ${exchange_1} = ${rate * user_Amount}  ${exchange_2}`)
  });
}


function BtnFunction() {
  calculate()
  console.log("this button has been clicked.")
}

/*this will change to exBtn*/
searchBtn.on('click', BtnFunction);




