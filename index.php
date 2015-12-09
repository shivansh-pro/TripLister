<?php
session_start();
if (isset( $_GET['ID']) && !empty($_GET['ID']))
	$_SESSION['ID'] = $_GET["ID"];
else
	$_SESSION['ID'] = generateRandomString();

if (isset( $_GET['location']) && !empty($_GET['location']))
	$loc = $_GET["location"];
else
	$loc = "NULL";

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    $id = "Random_".$randomString;
    return $id;
}

?>
<!DOCTYPE html>

<html>
  <head>
    <title>EFTI Survey Map</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">

    <link rel="stylesheet" type="text/css" href="css/style.css">
    <!--<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">-->
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places"></script>
    <script src="js/tester.js"></script>
    <script src="js/ifvisible.js"></script>
    <script src="js/timeme.js"></script>
    <script type="text/javascript">
        TimeMe.setIdleDurationInSeconds(30);
        TimeMe.setCurrentPageName("my-home-page");
        TimeMe.initialize();        
    </script>
    <script>
        $(document).ready(function(){
            $('[data-toggle="popover"]').popover(); 
        });
	</script>
  </head>
  <body>

    <div id="container">
      <div id="header"></div>
      <div id="main">
        <div id="left_map">
          <input id="pac-input" class="controls" type="text" placeholder="Enter a city">
          <div id="type-selector" class="controls" style="display: none;">
            <input type="radio" name="type" id="changetype-geocode" checked="checked">
            <label for="changetype-geocode">Geocodes</label>
          </div>
          <div id="map-canvas"> </div>
        </div>
        <!-- End of left_map -->

        <div id="right_places">
          <div id="top">
            <div id="top_day" style="text-align:center;"></div> 
            <div id="text1"></div>
            <div id="center_it" style="margin-top: 8px;">
              <span style='color:#0033CC'>Dropdown List</span>
              <select id="dropdown" onchange="search(this.value)">
                <option value="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;---Select---</option>
                <option value="airport">Airport</option>
                <option value="amusement_park">Amusement Park</option>
                <option value="aquarium">Aquarium</option>
                <option value="art_gallery">Art Gallery</option>
                <option value="establishment">Attraction</option>
                <option value="bar">Bar</option>
                <option value="bus_station">Bus Station</option>
                <option value="cafe">Cafe</option>
                <option value="campground">Campground</option>
                <option value="casino">Casino</option>
                <option value="food">Food</option>
                <option value="lodging">Lodging</option>
                <option value="museum">Museum</option>
                <option value="night_club">Night Club</option>
                <option value="restaurant">Restaurant</option>
                <option value="shopping_mall">Shopping Mall</option>
                <option value="spa">Spa</option>
                <option value="train_station">Train Station</option>
                <option value="zoo">Zoo</option>
              </select>
            </div>
            <div id="listing">
                <ol id="results" type="A"></ol>
            </div>
            <div id="center_it" style="margin-top: 8px;">
              <input id="pac-input1" class="controls" type="text" placeholder="Type in search box">
            </div>
          </div>
          <div id="bottom">
            <div id="text2"></div>
            <br>
            <div id="center_it">
              <div id="triplister_logo2">
                <img src="css/img/t_logo2.png" height="20%" width="40%">
              </div>
            </div>
            <div id="listing_selected">
              <ol id="selected-results"></ol>
            </div>
            <br>
            <div align="center">
              <button type="button" class="styled-button-1" onclick="nextday();"> Next</button> 
            </div>
          </div>
        </div>
        <!-- End of right_places -->
      </div>
      <!-- End of main -->
      <div id="footer">
        <h2>
          <img id="footer_logo" src="css/img/footer_logo.png" height="47" width="47">
        </h2>
        <div style="text-align:center" style="margin:2px;">
          <p> &copy; <a href="http://www.ufl.edu">University of Florida</a> - Gainesville, FL 32611</p>
        </div>
        <img id="footer_logo2" src="css/img/footer_logo2.png">
      </div>
      <!-- End of footer -->
    </div>
    <!-- End of container -->
  </body>
</html>

		

