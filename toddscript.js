const apiKey = `e2d1ab7e58051d42162f50b1`;
const $userAmount = $('#userAmount');
const $exchange1Drop = $('#amountDrop');
const $exchange2Drop = $('#resultDrop');
const $exchangeResult = $('#exchangeResult');
const latestURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const exchangeURL = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${$exchange1Drop}/${$exchange2Drop}`;
const searchBtn = $('#searchBtn');
const currentDate = dayjs().format('MMMM DD, YYYY');
const $currentDate = $('#currentDate');

const rateEL = $('#exchangeResult');

$currentDate.text('Today is '+currentDate)

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


var modal = document.getElementById("ultModal");

// Get the button that opens the modal
var btn3 = document.getElementById("ultBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn3.onclick = function() {
  modal.style.display = "block";
  
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


