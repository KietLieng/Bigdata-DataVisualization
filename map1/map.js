var country_name_map = {
  'Brunei Darussalam': 'Brunei',
  'Congo': 'Republic of the Congo',
  'Congo, The Democratic Republic of the': 'Democratic Republic of the Congo',
  "Cote D'Ivoire": 'Ivory Coast',
  'Falkland Islands (Malvinas)': 'Falkland Islands',
  'French Southern Territories': 'French Southern and Antarctic Lands',
  'Guinea-Bissa': 'Guinea Bissau',
  'Iran, Islamic Republic of': 'Iran',
  "Korea, Democratic People's Republic of": 'North Korea',
  'Korea, Republic of': 'South Korea',
  "Lao People's Democratic Republic": 'Laos',
  'Moldova, Republic of': 'Moldova',
  'Palestinian Territory': 'West Bank',
  'Russian Federation': 'Russia',
  'Serbia': 'Republic of Serbia',
  'Syrian Arab Republic': 'Syria',
  'Tanzania, United Republic of': 'United Republic of Tanzania',
  'Timor-Leste': 'East Timor',
  'United States': 'United States of America'
};

var total_edits = 0;
var edit_times = [];
var edit_intervals = [];
var wiki_map;
var open_con = []
var set
var fill_key = 'add';
var dataPoints = [];
var dataIndex =0;

var highlight_country = function(country_name) {
  return d3.select('path[data-country-name="' + country_name + '"]')
    .style('fill', '#eddc4e')
    .transition()
    .duration(5000)
    .style('fill', '#ccc');
};

function fillMap () {
  req_url = 'generateIP.php';
  locName = "";
  var data;
  if (dataIndex >= dataPoints.length) {
    loadDataPoints();
  }
  else {
    data = dataPoints[dataIndex];
    dataIndex++;
    $('#loading').remove();
    if (data.region_name) {
      locName = data.region_name + ", ";
    }
    if (data.city) {
      locName = data.city + ", ";
    }
    bubblesArray.push({
      name: locName + data.country_name,
      radius: 7,
      fillKey: "bubbleFill",
      latitude: data.latitude,
      longitude: data.longitude});
    if (bubblesArray.length > 5) {
      bubblesArray.shift();
    }
    wiki_map.bubbles(bubblesArray);

    country_hl = highlight_country(data.country_name);
    if (!country_hl[0][0]) {
      country_hl = highlight_country(country_name_map[data.country_name]);
      if (!country_hl[0][0] && window.console) {
        console.log('Could not highlight country: ' + data.country_name);
      }
    }
  }
};

function loadDataPoints() {
  dataIndex = 0;
  $.getJSON( "findLocation.php", function(data) {
    dataPoints = JSON.parse(data);
    //    console.log(dataPoints);
  });
}
