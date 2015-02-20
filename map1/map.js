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

/*
var addBubbles = function(bubbles) {
    var self = this;
        bubbles = [];

    var projection = this.map.get('projection');
    var options = this.options.bubble_config;

    var bubbleContainer = this.svg.append('g').attr('class', 'bubbles');
    bubbleContainer
        .selectAll('circle.bubble')
        .data(bubbles)
        .enter()
        .append('svg:circle')
        .on('mouseover', function(datum) {
            var hoverover = self.$el.find('.hoverover');
            var eventData = {
                data: datum
            };

            hoverover.css({position:'absolute'})
            .html(options.popupTemplate( eventData )).show();

            hoverover.data('width', self.$el.find('.hoverover').width());

            if (options.highlightOnHover) {
                d3.select(this)
                .style('fill', options.highlightFillColor)
                .style('stroke', options.highlightBorderColor)
                .style('stroke-width', options.highlightBorderWidth)
                .style('fill-opacity', options.highlightFillOpacity);
            }
            self.$el.trigger($.Event("bubble-mouseover"), eventData);
        })
        .on('mousemove', function() {
            self.updateHoverOverPosition(this);
        })
        .on('mouseout', function(datum) {
            self.$el.find('.hoverover').hide();
            var eventData = {
                data: datum
            };

            self.$el.trigger($.Event("bubble-mouseout"), eventData);

            if (options.highlightOnHover) {
              var el = d3.select(this);
                el.style('fill', el.attr('data-fill'))
                  .style('stroke', options.borderColor)
                  .style('stroke-width', options.borderWidth)
                  .style('fill-opacity', options.fillOpacity);
            }
        })
        .on('touchstart', function(datum) {
            self.$el.trigger($.Event("bubble-touchstart"), {data: datum});
        })
        .on('click', function(datum) {
            self.$el.trigger($.Event("bubble-click"), {data: datum});
        })
        .attr('cx', function(datum) {
            return projection([datum.longitude, datum.latitude])[0];
        })
        .attr('cy', function(datum, index) {
            return projection([datum.longitude, datum.latitude])[1];
        })
        .style('fill', function(datum) {
            var fillColor = self.getFillColor(datum);
            d3.select(this).attr('data-fill', fillColor);
            return fillColor;
        })
        .style('stroke', function(datum) {
            return options.borderColor;
        })
        .attr('class', 'bubble')
        .style('stroke-width', options.borderWidth)
        .attr('fill-opacity', options.fillOpacity)
        .attr('r', 0)
        .transition()
        .duration(400)
        .attr('r', function(datum) {
            return datum.radius;
        })
        .each(function(d){
            total_edits += 1;
            edit_times.push(new Date().getTime());
            if (total_edits > 2) {
                var cur = edit_times[edit_times.length - 1];
                var prev = edit_times[edit_times.length - 2];
                edit_intervals.push(cur - prev);
            }
            var s = 0;
            for (var i = 0; i < edit_intervals.length; i ++) {
                s += edit_intervals[i];
            }
            var rate_avg = Math.ceil(((s / edit_intervals.length) / 1000) * 10);
            edit_times = edit_times.slice(0, 500);
            edit_intervals = edit_intervals.slice(0, 500);
            var x = projection([d.longitude, d.latitude])[0];
            var y = projection([d.longitude, d.latitude])[1];
            var div = $('<div />').css({
                                        position:'absolute',
                                        'top': y + 10,
                                        'left': x + 10
                                        })
                                .addClass('locationTag')
                                .animate({opacity: 0}, 4000, null, function() {
                                    this.remove();
                                });

            div.html(d.page_title + ' <span class="lang">(' + d.lid + ')</span>');
            $('#map').append(div);
        });
};
*/



function fillMap () {
  req_url = 'generateIP.php';
  locName = "";
  var data;
  if (dataIndex >= dataPoints.length) {
//    alert("loading data");
    loadDataPoints();
  }
  else {
//    alert("getting data");
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
/*
    if (locName) {
    $('.bubbles')
      .animate({opacity: 0,
        radius: 10},
       40000,
       null,
       function(){
         this.remove();
       });
      wiki_map
     .addBubbles([{radius: 4,
       latitude: data.latitude,
       longitude: data.longitude,
       page_title: "Wiki edits",
       fillKey: fill_key,
       lid: locName + data.country_name
     }]);
    }
    */
  }
};

function loadDataPoints() {
  dataIndex = 0;
  $.getJSON( "findLocation.php", function(data) {
    dataPoints = JSON.parse(data);
//    console.log(dataPoints);
  });
}
