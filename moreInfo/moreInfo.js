// Gets the json of the incident key, if its not found return null
function getIncident(incidentKey) {
  for (let i of dataCombine) {
    if (i.incident_key == incidentKey) {
      return i;
    }
  }
  return null;
}

// Adds the fillDropDown onload
function addSelect() {
  get("key").innerHTML = "<option value='undefined'>Select Key Value</option>";
  get("key").innerHTML += fillDropDown("incident_key", dataCombine);
}

// If no incident key is provided
function noIncidentKey() {
  get("outputTitle").innerHTML = `
      <div class="flex">
        <p class="cardText">
          Please enter an Incident Key or Incident Key not found.
        </p>
      </div>
      `;
  get("outputDesc").innerHTML = "";
  get("outputMap").innerHTML = "";
}

// Once the page loads, if it was redirected by another card, it'll recieve the incident key and search for it
function loadRedirect() {

  // https://www.w3schools.com/jsref/prop_win_localstorage.asp
  // Receives the value in the item
  let i = getIncident(localStorage.getItem("incidentKeyRedirect"));
  localStorage.removeItem("incidentKeyRedirect");
  if (i == null) {
    noIncidentKey();
  } else {
    createFullCard(i);
  }
}

// Creates full card with all information
function createFullCard(incident) {
  // Adds title inside outputTitle
  get("outputTitle").innerHTML = `
      <p id="outputTitleText">Incident Key</p>
      <h2 id="outputTitleText">${incident.incident_key} <br> 
      ⸺⸺⸺⸺⸺⸺
      </h2>
  `;

  // Creates span in outputDesc
  get("outputDesc").innerHTML = `
    <span id="infoDesc"></span>
    <br>
    <span id="vicDesc"></span>
    <br>
    <span id="perpDesc"></span>
  `;

  // Removes any information in outputMap
  get("outputMap").innerHTML = ``;

  // Information Collapsible
  let infoDesc = new Collapsible(`
  <p id="outputText">
    Incident Information
  </p>
  `, `
  <p id="outputText">
    Date : ${(incident.occur_date).substring(0, 10)}
    <br>
    Time : ${incident.occur_time}
    <br>
    Borough : ${incident.boro}
    <br>
    Precinct : ${incident.precinct}
  </p>
  `);
  infoDesc.render("infoDesc");

  // Victim Collapsible
  let vicDesc = new Collapsible(`
  <p id="outputText">
    Victim Information
  </p>
  `,`
  <p id="outputText">
    Victim Age Group : ${incident.vic_age_group}
    <br>
    Victim Gender : ${incident.vic_sex}
    <br>
    Victim Race : ${incident.vic_race}
  </p>
  `)
  vicDesc.render("vicDesc");

  // Perpetrator Collapsible
  let perpDesc = new Collapsible(`
  <p id="outputText">
    Perpetrator Information
  </p>
  `,`
  <p id="outputText">
    Perpetrator Age Group : ${incident.perp_age_group}
    <br>
    Perpetrator Gender : ${incident.perp_sex}
    <br>
    Perpetrator Race : ${incident.perp_race}
  </p>
  `)
  perpDesc.render("perpDesc");

  // Map Modal
  let modal = new Modal(showLocation(incident.latitude, incident.longitude), showLocation(incident.latitude, incident.longitude));
  modal.render("outputMap");
}

// Button for searching incident, if not found call to noIncidentKey(), if found create full card
function searchIncident(id) {
  let key = get(id).value;
  let i = getIncident(key);
  if (i == null) {
    noIncidentKey();
  } else {
    createFullCard(i);
  }
}

// Load Background Images on load
function loadBackgroundImage() {
  get("banner").style.backgroundImage = "linear-gradient(45deg, rgba(65, 179, 163,0.6),rgba(8, 93, 203,0.6)), url('images/moreInfoBackground.png')";
  get("moreInfo").style.backgroundImage = "linear-gradient(45deg, rgba(226, 125, 96, 0.6),rgba(195, 141, 158, 0.6)), url('images/moreInfoOutput.png')";
}