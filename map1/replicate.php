<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
  <link href='bootstrap.min.css' rel='stylesheet' type='text/css'>
  <style type="text/css">
    .locationTag {
      padding: 4px;
      border-radius: 1px;
      background-color: #FFF;
      box-shadow: 1px 1px 5px #CCC;
      font-size: .7em;
      border: 1px solid #CCC;
    }

    #map {
      height: 450px;
      width: 900;
      padding: .5em;
    }

    .lang {
      color: #bdc3c7;
      padding: auto .5em;
    }
  </style>
  <script src='jquery-1.9.1.min.js' type="text/javascript"></script>
  <script src='datamaps-world.js' type="text/javascript"></script>
  <script src="map.js" type="text/javascript" type="text/javascript"></script>
  <script>
        var RC_LOG_SIZE = 20;
        var DEFAULT_LANG = 'en'
          $(document).ready(function() {
            world_map = $("#map").datamap({
              element: document.getElementById("bubbles"),
              bubbles:[],
              bubble_config: {
                popupOnHover: false,
                highlightOnHover: true,
                borderWidth: 1,
                borderColor: '#555555',
                popupTemplate: _.template('<div class="hoverinfo"><%= data.page_title %> <span class="lang">(<%= data.lid %>)</span></div>'),
                highlightBorderColor: '#555555',
                highlightFillColor: '#555555',
                highlightBorderWidth: 1,
                highlightFillOpacity: 0.85
              },
              fills: {
                defaultFill: '#fff',
                'add': '#555555'
              }
            });
            world_map.addBubbles = addBubbles;
            return;
        });
        setInterval(fillMap, 3000);
  </script>
</head>
 <body>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="http://jetfighterawesome.com/">Anon and Wiki</a>
        </div>
      </div>
    </nav>

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
      <div class="container">

        <hr>
        <div id="map"></div>
      </div>
    </div>

    <div class="container">
      <!-- Example row of columns -->
      <hr>
      <footer>
      <p>&copy; Company 2015</p>
      </footer>
    </div> <!-- /container -->
  </body>
</html>
