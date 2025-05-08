// Global variables
let data1, data2, dataCombine;

// Function to get the element by Id
function get(id) {
  return document.getElementById(id);
}

// Function for each page when it loads to use jquery to load in the dataset
function init() {
  $.ajaxSetup({async: false});
  let link1 = "https://data.cityofnewyork.us/resource/833y-fsy8.json";
  data1 = $.getJSON(link1).responseJSON;
  let link2 = "https://data.cityofnewyork.us/resource/5ucz-vwe8.json";
  data2 = $.getJSON(link2).responseJSON;
  dataCombine = data1.concat(data2);
}

// Function to create the front of the card for cardflip
function cardFront(data) {
  let occur = data.occur_date;
  let date = occur.substring(0,10);
  return `
  <p class="cardText">
    Incident Key : 
  </p>
    <h4 id="cardTitle" class="cardText">${data.incident_key}</h1>
    <p class="cardText">
      Borough : ${data.boro}
      <br>
      Date : ${date}
      <br>
      Time : ${data.occur_time}
    </p>
    <input type="button" class="button" value="More Information" onclick="redirect('${data.incident_key}')">
  `;
}

// Function to create the back of the card for cardflip
function cardBack(data) {
  return `
  <br><br>
    <h1 id="cardTitle" class="cardText">Victim Information : </h1>
    <br>
    <p class="cardText">
      Victim Age Group : ${data.vic_age_group}
      <br>
      Victim Gender : ${data.vic_sex}
      <br>
      Victim Race : ${data.vic_race}
    </p>
    <br>
    <input type="button" class="button" value="More Information" onclick="redirect(${data.incident_key})">
  `;
}

// Redirects the page to moreInfo.html
function redirect(incidentKey) {

  // https://www.w3schools.com/jsref/prop_win_localstorage.asp
  localStorage.setItem("incidentKeyRedirect", incidentKey);

  window.location.href = "moreInfo.html";
}

// Function to create results for info page
function ResultsCount(num) {
  return `
  <div class="results flex">
    <p class="cardText">
      ${num} results found.
    </p>
  </div>
  `;
}

// Create flipcards
function cards(dataSet, output) {
  let build = "";
  get(output).innerHTML = "";
  for (let incident of dataSet) {
    let front = cardFront(incident);
    let back = cardBack(incident);
    let flipcard = new FlipCard(front, back);
    flipcard.render(output)
  }
}

// Filter a dataset by the value in each key
function filter(data, key, value) {
  let filtered = [];
  for (let incident of data) {
    if (incident[key] == value) {
      filtered.push(incident);
    }
  }
  return filtered;
}
let map = undefined;

function showMap(lat, lon){
  let map = L.map("backMap").setView([lat, lon], 14);
  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
  }).addTo(map);

  let marker = L.marker(location).addTo(map);

  
  map = L.map("frontMap").setView([lat, lon], 14);
  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
  }).addTo(map);

  marker = L.marker(location).addTo(map);
} 


// Create chart function using c3.js
function displayChart( data, chart_id, chart_type ){
  let chart = c3.generate({
    bindto: `#${chart_id}`,
    data: {
      columns: data,
      type: chart_type
    }
  });
}

// Returns the build for creating a fillDropDown
function fillDropDown(key, dataset) {
  let list = [];
  let build = "";
  for (let incident of dataset) {
    if (!list.includes(incident[key])) {
      list.push(incident[key]);
    }
  }
  list.sort();
  for (let field of list) {
    build += `<option>${field}</option>`;
  }
  return build;
}

