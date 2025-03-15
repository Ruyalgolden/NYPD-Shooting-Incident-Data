// Load background images on load
function loadBackgroundImage() {
  get("dataSetBanner").style.backgroundImage = "linear-gradient(45deg, rgba(226, 125, 96, 0.6),rgba(195, 141, 158, 0.6)), url('images/dataSetBanner.png')";
  get("banner").style.backgroundImage = "linear-gradient(45deg, rgba(65, 179, 163,0.6),rgba(8, 93, 203,0.6)), url('images/bannerBackground.jpg')";
  get("dataSet1img").style.backgroundImage = "linear-gradient(45deg, rgba(226, 125, 96, 0.2),rgba(232, 168, 124, 0.2)), url('images/dataset1img.png')";
  get("dataSet2img").style.backgroundImage = "linear-gradient(45deg, rgba(226, 125, 96, 0.2),rgba(232, 168, 124, 0.2)), url('images/dataset2img.png')";
  get("information").style.backgroundImage = "linear-gradient(45deg, rgba(65, 179, 163,0.6),rgba(8, 93, 203,0.6)), url('images/bannerBackground.jpg')";
}

// Create a sample flipcards on homepage
function exampleSet(id) {
  let nums = [];
  while (nums.length != 12) {
    let newNum = Math.floor((Math.random() * dataCombine.length + 1) + 1);
    if (!nums.includes(newNum)) {
      nums.push(newNum);
    }
  }
  let numsData = [];
  for (let num of nums) {
    numsData.push(dataCombine[num]);
  }
  cards(numsData, id)
}

// Create a sample graph on homepage
function exampleGraph(id) {
  let dataGraph = [
    ["Queens", filter(dataCombine, "boro", "QUEENS").length],
    ["Brooklyn", filter(dataCombine, "boro", "BROOKLYN").length],
    ["Bronx", filter(dataCombine, "boro", "BRONX").length],
    ["Manhattan", filter(dataCombine, "boro", "MANHATTAN").length],
    ["Staten Island", filter(dataCombine, "boro", "STATEN ISLAND").length],
  ];
  let chart = c3.generate({
    bindto: `#${id}`,
    data: {
      columns: dataGraph,
      type: "bar"
    },
    size: {
      width: 640
    }
  });
}

// Types out description for banner slowly
var i = 0;
var txt = 'NYPD Shooting Incident Data uses datasets provided by Police Department (NYPD) to filter information on Shooting Incidents';
var speed = 40;
function typeWriter() {
  if (i < txt.length) {
    get("titleDesc").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}