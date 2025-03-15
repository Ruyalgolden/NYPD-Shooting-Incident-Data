// Load Background Images
function loadBackgroundImage() {
  get("banner").style.backgroundImage = "linear-gradient(45deg, rgba(65, 179, 163,0.6),rgba(8, 93, 203,0.6)), url('images/analysisBackground.png')";
  get("analysisPart").style.backgroundImage = "linear-gradient(45deg, rgba(226, 125, 96, 0.6),rgba(195, 141, 158, 0.6)), url('images/analysisPartBackground.png')";
}

// Types in description when the page loads
var i = 0;
var txtanalysis = 'This purpose of this page is the analyzation of this chart. The page allows the user to pick which dataset to display as a graph and filter the data by a specific value The graph on the left uses both datasets and filters the dataset by borough. The graph shows the number of shootings in each borough between 2006 to this current year.';
var speed = 20;
function typeWriter2() {
  if (i < txtanalysis.length) {
    get("titleDescAnalysis").innerHTML += txtanalysis.charAt(i);
    i++;
    setTimeout(typeWriter2, speed);
  }
}

// Function to create the chart after the user clicks the button to create chart by dataset, chart type, and key
function CreateChartKey() {
  let dataset = get("datasetSelect").value;
  let chart = get("chart").value;
  let key = get("keys").value;
  if (dataset == "undefined") {
    get("infoChart").innerHTML = `
      <h5 id="filterTitle">Please select a Dataset.</h5>
    `;
  } else if (chart == "undefined") {
    get("infoChart").innerHTML = `
      <h5 id="filterTitle">Please select a Chart Type.</h5>
    `;
  } else if (key == "undefined") {
    get("infoChart").innerHTML = `
      <h5 id="filterTitle">Please select a Key.</h5>
    `;
  } else {
    if (dataset == "d1") {
      if (key == "occur_date") {
        if (chart == "donut") {
          let data = getDateArr(data1);
          createDonut(data, "chartDisplay", chart);
        } else {
          let data = [getDateArrOther(data1, "Dataset 1")];
          createOther(data, "chartDisplay", chart);
        }
      } else {
        if (chart == "donut") {
          let data = getArr(data1, key);
          createDonut(data, "chartDisplay", chart);
        } else {
          let data = [getArrOther(data1, "Dataset 1", key)];
          createOther(data, "chartDisplay", chart);
        }
      }
    } else if (dataset == "d2") {
      if (key == "occur_date") {
        if (chart == "donut") {
          let data = getDateArr(data2);
          createDonut(data, "chartDisplay", chart);
        } else {
          let data = [getDateArrOther(data2, "Dataset 2")];
          createOther(data, "chartDisplay", chart);
        }
      } else {
        if (chart == "donut") {
          let data = getArr(data2, key);
          createDonut(data, "chartDisplay", chart);
        } else {
          let data = [getArrOther(data2, "Dataset 2", key)];
          createOther(data, "chartDisplay", chart);
        }
      }
    } else if (dataset == "cd") {
      if (key == "occur_date") {
        if (chart == "donut") {
          let data = getDateArr(dataCombine);
          createDonut(data, "chartDisplay", chart);
        } else {
          let data = [getDateArrOther(dataCombine, "Dataset Combine")];
          createOther(data, "chartDisplay", chart);
        }
      } else {
        if (chart == "donut") {
          let data = getArr(dataCombine, key);
          createDonut(data, "chartDisplay", chart);
        } else {
          let data = [getArrOther(dataCombine, "Dataset Combine", key)];
          createOther(data, "chartDisplay", chart);
        }
      }
    }
  }
}

// Function to get the keys for chose keyName and creating an array for c3.js for a donut chart
function getArr(dataset, keyName) {
  let keys = [];
  for (let i of dataset) {
    if (!keys.includes(i[keyName])) {
      keys.push(i[keyName]);
    }
  }
  let data = [];
  for (let key of keys) {
    let filterdata = filter(dataset, keyName, key);
    data.push([key, filterdata.length]);
  }
  return data;
}

// Function to get the keys for chose keyName and creating an array for c3.js for a donut chart
function getArrOther(dataset, name, keyName) {
  let keys = [];
  for (let i of dataset) {
    if (!keys.includes(i[keyName])) {
      keys.push(i[keyName]);
    }
  }
  let data = [name];
  for (let key of keys) {
    let filterdata = filter(dataset, keyName, key);
    data.push(filterdata.length);
  }
  return data;
}

// Function to create Donut chart
function createDonut(data, id, chart) {
  get("infoChart").innerHTML = `
      <h5 id="filterTitle">The donut chart displays the different and many shooting incidents from 2006 all the way to the present day in proportions each with a different size. 
</h5>
    `;
  displayChart(data, id, chart);
}

// Function to create spline or line chart
function createOther(data, id, chart) {
  get("infoChart").innerHTML = `
      <h5 id="filterTitle">The spline/line graph displays the different and many shooting incidents from 2006 all the way to the present day in curved/straight lines emphasizing it in a more smooth and gradual way. 
</h5>
    `;
  displayChart(data, id, chart);
}

// Function for year key value donut chart to get array
function getDateArr(dataset) {
  let keys = [];
  for (let i of dataset) {
    if (!keys.includes(i.occur_date.substring(0, 4))) {
      keys.push(i.occur_date.substring(0, 4));
    }
  }
  let data = [];
  for (let key of keys) {
    let filterdata = filterYear(dataset, "occur_date", key);
    data.push([key, filterdata.length]);
  }
  return data;
}


// Get jsons in dataset with same value in key
function filterYear(data, key, value) {
  let filtered = [];
  for (let incident of data) {
    let year = incident[key].substring(0, 4);
    if (year == value) {
      filtered.push(incident);
    }
  }
  return filtered;
}

// Function for year key value spline/line chart to get array
function getDateArrOther(dataset, name) {
  let keys = [];
  for (let i of dataset) {
    if (!keys.includes(i.occur_date.substring(0, 4))) {
      keys.push(i.occur_date.substring(0, 4));
    }
  }
  let data = [name];
  for (let key of keys) {
    let filterdata = filterYear(dataset, "occur_date", key);
    data.push(filterdata.length);
  }
  return data;
}