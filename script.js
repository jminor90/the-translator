const $searchBar = $('#searchBar')
const $submitBtn = $('#submitButton')
const $containerDiv = $('.containerDiv')

const $translateResult = $('#translateResult')

const $userTranslateInput = $('#userTranslateInput')
const $LanguageSubmit = $('#LanguageSubmit')

let userSearch = $searchBar.val()

const $language1Input = $('#language1Input')
let language1Input = $language1Input.val()

const $language2Input = $('#language2Input')
let language2Input = $language2Input.val()

const $resultDrop = $('#resultDrop')
const $resultFlag = $('#resultFlag')
const $resultSymbol = $('#resultSymbol')

const translateAPIkey = `AIzaSyBD1YPYxIGxb0Fs4qjXKgba41XhADpNF-8`;

const cloudURL = `https://translation.googleapis.com/language/translate/v2/languages?key=${translateAPIkey}&target=en`

//Alert Modal
const $alertModal = $('#alertModal')
const $closeSpan = $('#closeSpan')
const $alertText = $('#alertText')


//REST COUNTRY API
function getRestCountryAPI(seachBarVal) {

  userSearch = seachBarVal

  const countriesURL = `https://restcountries.com/v3.1/name/${userSearch}`;

  fetch (countriesURL)
  .then(function(serverResponse) {
    if (serverResponse.status !== 200 ) {
      
      //Alert Modal Appears 
      $alertModal.css('display', 'block')
      $alertText.text("Did you enter a valid country? Server Response: "+serverResponse.status)

      /*
      alert("UH OH"+serverResponse.status)  
      
      */
      console.log("uh oh: "+serverResponse.status)
    } else {
      return serverResponse.json();
    }
  })

  .then (function(data) {

    //console.log(data)

    dataFunction(data)

  })
}

//DATA FUNCTION -> PRINT TO SCREEN
function dataFunction(data) {

  $resultFlag.html('');
  $resultSymbol.html('');
  $containerDiv.html('');

  //VARIABLES 
  const dataCurrencies = JSON.stringify( data[0].currencies).split("\"")[1]
  const dataLanguage = JSON.stringify(data[0].languages).split("\"")[3]
  const dataLanguage2 = JSON.stringify(data[0].languages).split("\"")[7]
  const dataFlag = data[0].flags.png

  const dataSymbolCurrency = JSON.stringify( data[0].currencies).split("\"")[9]
  
  /*
  console.log(dataSymbolCurrency) 
  console.log(dataCurrencies)
  console.log('Language 1 '+dataLanguage)
  console.log('Language 2 '+dataLanguage2)
  console.log(dataFlag)
  */

  $language1Input.val(dataLanguage)
  
  const $pCurrencySymbol = $('<p>')
  const $pLanguage2 = $('<p>')
  const $imgFlag = $('<img>')
  const $divData = $('<div>')

  //ATTRIBUTES CLASSES TEXT CONTENT
  
  $pCurrencySymbol.text(`Currency Symbol: `+dataSymbolCurrency)

  if (!dataLanguage2) {
    $pLanguage2.text(``);
  } else { 
  $pLanguage2.text(`Secondary Language: `+dataLanguage2)
}

  $imgFlag.attr("src", dataFlag)

  //APPENDING!
  $containerDiv.append($divData)
  $divData.append($pLanguage2)
  $resultFlag.append($imgFlag)
  $resultSymbol.append($pCurrencySymbol)

  //Changes one of the Dropdown menus in the currency exchange and runs calculate from toddscript.js
  $resultDrop.val(dataCurrencies)

  calculate();

}

//DESTINATION BUTTON FUNCTION -> REST COUNTRY API
function destinationButton(event) {
  event.preventDefault();
  const seachBarVal = $searchBar.val()
  /*
  console.log("Button Clicked")
  console.log(seachBarVal)
  */
  getRestCountryAPI(seachBarVal)

  
}

function languageFunction(event) {
  event.preventDefault()

  const seachBarVal = $language1Input.val()
  //console.log("Button Clicked")
  
  if (seachBarVal === undefined) {

    $alertModal.css('display', 'block')
    $alertText.text("You entered nothing.")
    return;
  } else {

    nametoCodeAPI(seachBarVal)
  }

  //console.log('The user entered: '+seachBarVal)

}

function nametoCodeAPI(seachBarVal) {
  fetch (cloudURL)
  .then(function(serverResponse) {
    if (serverResponse.status !== 200 ) {

      $alertModal.css('display', 'block')
      $alertText.text("UH-OH: "+serverResponse.status)
      /*
      alert("UH OH"+serverResponse.status)
      */
      console.log("uh oh"+serverResponse.status)
    } else {
      return serverResponse.json();
      
    }
  })
  .then(function(data) {
    nameToCode(data, seachBarVal)
  })

}

function nameToCode(data, SteveSearchBar) {
  const found = data.data.languages.find(ElementBob => SteveSearchBar == ElementBob.name)
  
  // if Found Language is not a real language will catch
  if (!found) {
    $alertModal.css('display', 'block')
    $alertText.text("Alert: Is that a valid language?")
  } else {

    const foundLang = found.language

    translateAPI(foundLang)
  }
  

  /*
  console.log(data)
  console.log(SteveSearchBar)
  console.log(foundLang)
  */
}

function translateAPI(foundLang) {
  let userTranslateInput = $userTranslateInput.val().trim()
  //console.log(userTranslateInput)

  const translateURL = `https://translation.googleapis.com/language/translate/v2?key=${translateAPIkey}`

  fetch (translateURL, {
    method: "POST",
    body: JSON.stringify({
      q: userTranslateInput,
      source: "en",
      target: foundLang,
      format: "text"
    })
  })
  .then (function (serverResponse) {
    if (serverResponse.status !== 200) {

      $alertModal.css('display', 'block')
      $alertText.text("UH-OH: "+serverResponse.status+" | Also cannot translate English to English.")

      console.log("Oh No! Error: "+serverResponse.status)
    } else {
      return serverResponse.json()
    }
  })
  .then (function(translateData) {
    //console.log(translateData)
    renderResult(translateData)
  })
}

function renderResult (translateData){

  let translateResult = translateData.data.translations[0].translatedText

  $translateResult.text(translateResult)
  //console.log(translateResult)
  //console.log(translateResult.data.translations[0].translatedText)
  //console.log("RenderResult happening here")
}

function destinationFunction(event) {
  event.preventDefault()
  let countryInput = $countryInput.val().trim()

  console.log(countryInput)
  getRestCountryAPI(countryInput)
  //console.log("destinationFunction clicked")
}


$LanguageSubmit.on("click", languageFunction)

$submitBtn.on("click", destinationButton)


//Modal Button Functionality
$closeSpan.click("click", function() {
  $alertModal.css('display', 'none')
})