// Load background images on load
function loadBackgroundImage() {
  get("banner").style.backgroundImage = "linear-gradient(45deg, rgba(65, 179, 163,0.6),rgba(8, 93, 203,0.6)), url('images/bannerBackground.jpg')";
  get("info").style.backgroundImage = "linear-gradient(45deg, rgba(226, 125, 96, 0.6),rgba(195, 141, 158, 0.6)), url('images/infoBackground.jpg')";
}

// Automatically asks user to select a dataset to filter on load
function infoInit() {
  get("outputNumber").innerHTML = `
    <div class="flex">
      <p class="cardText">
        Please select a Dataset.
      </p>
    </div>
    `;
}

// Creates cards for the dataset chosen
function filterByDataset() {
  let dataset = get("datasetSelect").value;
  if (dataset == "d1") {
    get("outputNumber").innerHTML = ResultsCount(data1.length);
    cards(data1, "output");
  } else if (dataset == "d2") {
    get("outputNumber").innerHTML = ResultsCount(data2.length);
    cards(data2, "output");
  } else if (dataset == "cd") {
    get("outputNumber").innerHTML = ResultsCount(dataCombine.length);
    cards(dataCombine, "output");
  } else {
    get("outputNumber").innerHTML = `
    <div class="flex">
      <p class="cardText">
        Please select a Dataset.
      </p>
    </div>
    `;
    get("output").innerHTML = "";
  }
}

// Adds keys value for the key chosen
function AddKeyValues() {
  let key = get("keys").value;
  let dataset = get("datasetSelect").value;
  if (dataset == "undefined" && key == "undefined") {
    get("outputNumber").innerHTML = `
      <div class="flex">
        <p class="cardText">
          Please select a Dataset and a Key.
        </p>
      </div>
    `;
    get("output").innerHTML = "";
  } else if (dataset == "undefined") {
    get("outputNumber").innerHTML = `
      <div class="flex">
        <p class="cardText">
          Please select a Dataset.
        </p>
      </div>
    `;
    get("output").innerHTML = "";
  } else if (key == "undefined") {
    get("outputNumber").innerHTML = `
      <div class="flex">
        <p class="cardText">
          Please select a key.
        </p>
      </div>
    `;
    get("output").innerHTML = "";
  } else {
    get("outputNumber").innerHTML = `
      <div class="flex">
        <p class="cardText">
          Added Key Values.
        </p>
      </div>
    `;
    get("keysValue").innerHTML = "<option value='undefined'>Select Key Value</option>";
    if (dataset == "d1") {
      get("keysValue").innerHTML += fillDropDown(key, data1);
    } else if (dataset == "d2") {
      get("keysValue").innerHTML += fillDropDown(key, data2);
    } else if (dataset == "cd") {
      get("keysValue").innerHTML += fillDropDown(key, dataCombine);
    }
  }
}

// Creates cards based on the key value chosen for the dataset
function filterByKeyValues() {
  let keyValue = get("keysValue").value;
  let key = get("keys").value;
  let dataset = get("datasetSelect").value;
  if (dataset == "undefined" && keyValue == "undefined") {
    get("outputNumber").innerHTML = `
      <div class="flex">
        <p class="cardText">
          Please select a Dataset and a Key Value.
        </p>
      </div>
    `;
    get("output").innerHTML = "";
  } else if (dataset == "undefined") {
    get("outputNumber").innerHTML = `
      <div class="flex">
        <p class="cardText">
          Please select a Dataset.
        </p>
      </div>
    `;
    get("output").innerHTML = "";
  } else if (keyValue == "undefined") {
    get("outputNumber").innerHTML = `
      <div class="flex">
        <p class="cardText">
          Please select a Key Value.
        </p>
      </div>
    `;
    get("output").innerHTML = "";
  } else {
    if (dataset == "d1") {
      let filteredDataset = filter(data1, key, keyValue);
      get("outputNumber").innerHTML = ResultsCount(filteredDataset.length);
      cards(filteredDataset, "output");
    } else if (dataset == "d2") {
      let filteredDataset = filter(data2, key, keyValue);
      get("outputNumber").innerHTML = ResultsCount(filteredDataset.length);
      cards(filteredDataset, "output");
    } else if (dataset == "cd") {
      let filteredDataset = filter(dataCombine, key, keyValue);
      get("outputNumber").innerHTML = ResultsCount(filteredDataset.length);
      cards(filteredDataset, "output");
    }
  }
}