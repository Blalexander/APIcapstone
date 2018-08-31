let stateDropContainer = $('.state');
let stateIdNum = stateDropContainer.val();
let paramDropContainer = $('.param');
let searchParam = paramDropContainer.val();
var stateKeys = document.getElementById("stateDropId");
var informationKeys = document.getElementById("infoDropId");

//populates the state dropdown list with keys from stateDropdownValues object
for(index in stateDropdownValues) {
  stateKeys.options[stateKeys.options.length] = new Option(stateDropdownValues[index], index);
}

//populates the information dropdown list with the keys of infoDropdownValues object
for(index in infoDropdownValues) {
  informationKeys.options[informationKeys.options.length] = new Option(infoDropdownValues[index], index);
}

//when either dropdown list changes, this makes a new call
function stateDropDown () {
  $('.dropDown').on('change',function (event) {
    event.preventDefault(); 
    stateDropContainer = $('.state');
    stateIdNum = stateDropContainer.val();
    searchParam = paramDropContainer.val();
    let stateinfoUrl = `https://api.datausa.io/api/?show=geo&geo=${stateIdNum}&year=latest&required=${searchParam}`;
    getDataFromAPI(stateinfoUrl, displayStateInfo);
  });
}

function getDataFromAPI(searchTerm, callback) {
  const apiData = {
    url: searchTerm,
    dataType: 'json',
    type: 'GET',
    success: callback, 
    // error: handleError
  };
  $.ajax(apiData);
  let newInfo = $.ajax(apiData);
}

//gathers information from stateinfoUrl call and adds it to HTML
function displayStateInfo (data) {
  $('.data-container').html(""); //clears previous results before appending new ones
  let results = data.data[0];
  let headers = data.headers;
  for (var i=2; i < data.headers.length; i++) {
    //example of how i would format the headers to be more readable, such as turning 'pop_rank' into 'Population rank'
    var revision1 = headers[i].replace(/_/g, " ");
    var revision2 = revision1.replace("to", " to ");
    var revision3 = revision2.replace("avg", "average");
    var revision4 = revision3.replace("num", "number");
    var revision5 = revision4.replace("ppl", "of people");
    var revision6 = revision5.replace("pop", "population");
    var revision7 = revision6.replace("ft", "full time");
    var revision8 = revision7.replace("pt", "part time");
    $('.data-container').append(`<p>${revision8} : ${results[i]}</p>`)
  }
}

stateDropDown();