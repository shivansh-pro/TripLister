<?php
session_start();
$ID = $_SESSION['ID'];
//$connection = mysqli_connect("fdb7.biz.nf", "1938598_efti", "Efti_map1", "1938598_efti");
$connection = mysqli_connect("localhost", "root", "", "triplister");
if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  exit;
}

//echo "HI THERE";

if (isset($_POST)) { 

	$responses = $_POST["responses"];
	$timeSpent = $_POST["timeOnQuestions"];
	$sql = "UPDATE data SET responses='$responses' AND time_questions='$timeSpent' WHERE id='$ID'";

	if (!mysqli_query($connection, $sql)) {
	    echo "Error: " . $sql . "<br>" . mysqli_error($connection);
	}

}

mysqli_close($connection);
header("Location: finish.html");
?>