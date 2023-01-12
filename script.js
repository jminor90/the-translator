


































































































//const translateAPIkey = 'AIzaSyBD1YPYxIGxb0Fs4qjXKgba41XhADpNF-8'


userSearch = 'Italy'

function getTranslateAPI() {

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

  //VARIABLES 
  const dataCurrencies = data[0].currencies
  const dataLanguage = data[0].languages
  const dataFlag = data[0].flags.png
  
  //console.log(dataCurrencies)
  //console.log(dataLanguage)
  //console.log(dataFlag)

  const $container = $('.container')
  const $pCurrency = $('<p>')
  const $pLanguage = $('<p>')
  const $imgFlag = $('<img>')

  //ATTRIBUTES CLASSES TEXT CONTENT
  $pCurrency.text(`Currency: `+dataCurrencies)
  $pLanguage.text(`Language: `+dataLanguage)
  $imgFlag.attr('src', +$imgFlag)

  //APPENDING!
  $container.append($pCurrency)
  $container.append($pLanguage)
  $container.append($imgFlag)
}

/*
function renderCountryData (data) {
  

}
*/

getTranslateAPI();




