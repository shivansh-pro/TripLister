<?php
session_start();
$ID = $_SESSION['ID'];
//$connection = mysqli_connect("fdb7.biz.nf", "1938598_efti", "Efti_map1", "1938598_efti");
$connection = mysqli_connect("localhost", "root", "", "triplister");
if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  exit;
}
  

if (isset($_POST)) { 

	//$id = $_POST["id"];
	$start_place = $_POST["start_location"];
	$places = $_POST["placesVisited"];
	$places = mysqli_real_escape_string($connection, $places);
	$coordinates = $_POST["placesLocation"];
	$place_types = $_POST["place_types"];
	$date = $_POST["date"];
	$timeSpent = $_POST["timeOnMap"];
    
	$sql = "INSERT INTO data (id, start_place, places, coordinates, place_types, timestamp, time_map)
	VALUES ('$ID', '$start_place', '$places', '$coordinates', '$place_types', '$date', '$timeSpent')";
	if (!mysqli_query($connection, $sql)) {
	    echo "Error: " . $sql . "<br>" . mysqli_error($connection);
	}

}

mysqli_close($connection);
header("Location: questions.php");
?>