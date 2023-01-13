//remember to uncomment Todd's code before comitting :D

const $searchBar = $('#searchBar')
const $submitBtn = $('#submitButton')
const $container = $('.container')


let userSearch = $searchBar.val()



function getTranslateAPI(seachBarVal) {

  userSearch = seachBarVal

  //const cloudURL = `https://translation.googleapis.com/language/translate/v2/languages?key=${translateAPIkey}`

  const countriesURL = `https://restcountries.com/v3.1/name/${userSearch}`;

  fetch (countriesURL)
  .then(function(serverResponse) {
    if (serverResponse.status !== 200 ) {
      alert("UH OH"+serverResponse.status)
      console.log("uh oh"+serverResponse.status)
    } else {
      return serverResponse.json();
    }
  })

  .then (function(data) {

    console.log(data)

    responseFunction(data)

  })
}


function responseFunction(data) {

  //console.log(data[0].languages)

  $container.html('')

  //VARIABLES 
  const dataCurrencies = JSON.stringify( data[0].currencies).split("\"")[1]//JSON.stringify()  .split("\"")[1]
  const dataLanguage = JSON.stringify(data[0].languages).split("\"")[3]//JSON.stringify() .split("\"")[3]
  const dataLanguage2 = JSON.stringify(data[0].languages).split("\"")[7]
  const dataFlag = data[0].flags.png

  // const dataCurrenciesStr = JSON.stringify (Object.getOwnPropertyNames(dataCurrencies)[0]).slice(1,4)
  
  
  console.log(dataCurrencies)
  console.log('Language 1 '+dataLanguage)
  console.log('Language 2 '+dataLanguage2)
  console.log(dataFlag)

  
  
  const $pCurrency = $('<p>')
  const $pLanguage1 = $('<p>')
  const $pLanguage2 = $('<p>')
  const $imgFlag = $('<img>')
  const $divData = $('<div>')

  //ATTRIBUTES CLASSES TEXT CONTENT
  $pCurrency.text(`Currency: `+dataCurrencies)
  $pLanguage1.text(`Language 1: `+dataLanguage)

  if (!dataLanguage2) {
    $pLanguage2.text(``);
  } else { 
  $pLanguage2.text(`Language 2: `+dataLanguage2)
  
}
  $imgFlag.attr("src", dataFlag)

  //APPENDING!
  $container.append($divData)
  $divData.append($pCurrency)
  $divData.append($pLanguage1)
  $divData.append($pLanguage2)
  $divData.append($imgFlag)

  document.getElementById('resultDrop').value = dataCurrencies
  calculate();
}

function buttonFunction(event) {
  event.preventDefault();
  const seachBarVal = $searchBar.val()
  console.log("Button Clicked")

  console.log(seachBarVal)
  getTranslateAPI(seachBarVal)

  
}

$submitBtn.on("click", buttonFunction)

/*
function submitTestFunction (event) {
  event.preventDefault();
  console.log("form submit")
}

$('#searchBar').submit("submit", submitTestFunction)


*/

/*
function renderCountryData (data) {
  

}
*/

//getTranslateAPI();