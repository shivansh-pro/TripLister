<?php
session_start();
$ID = $_SESSION['ID'];
//$connection = mysqli_connect("fdb7.biz.nf", "1938598_efti", "Efti_map1", "1938598_efti");
$connection = mysqli_connect("localhost", "root", "", "efti");
if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  exit;
}
  

if (isset($_POST)) { 
	//$id = $_POST["id"];
	$current_day = $_POST["current_day"];
	$tot_days = $_POST["total_days"];
	$start_place = $_POST["start_location"];
	$days_places = $_POST["placesVisited"];
	$coordinates = $_POST["placesLocation"];
	$place_types = $_POST["place_types"];
	$sql = "INSERT INTO data (id, curr_day, tot_days, start_place, days_places, coordinates, place_types)
	VALUES ('$ID', $current_day, $tot_days, '$start_place', '$days_places', '$coordinates', '$place_types')";

	if (!mysqli_query($connection, $sql)) {
	    echo "Error: " . $sql . "<br>" . mysqli_error($connection);
	}
	else {
		echo "Done";
	}
}

mysqli_close($connection);
?>