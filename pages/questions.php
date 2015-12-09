<?php
session_start();
$ID = $_SESSION['ID'];
//$connection = mysqli_connect("fdb7.biz.nf", "1938598_efti", "Efti_map1", "1938598_efti");
$connection = mysqli_connect("localhost", "root", "", "triplister");
if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  exit;
}
$results=mysqli_query($connection,"SELECT * FROM data WHERE id='$ID'") or die(mysql_error($connection));
$data=array();
while($row=mysqli_fetch_assoc($results))
{
    $temp = $row['places'];
    //echo $temp;
    //echo "<br/>";
    $data = mysqli_real_escape_string($connection, $temp);
    //echo $data;
}

?>
<!DOCTYPE html>
<html>
<head>
<title>EFTI Survey Questions</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">

    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <script src="../js/jquery-1.9.1.min.js"></script>
    <script src="../js/questions.js"></script>
    <script type="text/javascript">
    	var origins = '<?php echo $data;?>';
    </script>
    <script src="../js/ifvisible.js"></script>
    <script src="../js/timeme.js"></script>
    <script type="text/javascript">
        TimeMe.setIdleDurationInSeconds(30);
        TimeMe.setCurrentPageName("my-home-page1");
        TimeMe.initialize();        
    </script>
</head>

<body onload="init();">
	<div id="container">
		<div id="header"></div>

		<div id="qbody">
			<div id="qday" style="text-align:center; margin-top: 3px;"></div>
			<div style="margin-top: 8px; margin-left: 5%;width: 90%;">
				<p>For each place on your Trip List, please indicate if the visit was (A) pre-planned before leaving home.  Also, let us know (B) how satisfied you were with each place. </p>
			</div>
			<br>
			<table id="myTable" style="width:90%;margin-left:5%;">
				<tr>
				<th bgcolor="#FFBF00">Place</th>
				<th bgcolor="#FFBF00">A. Pre-Planned?</th>
				<th bgcolor="#FFBF00">B. Satisfaction</th>
				</tr>
			</table>
			<br>
			<div align="center">
		        <button id="btn1" type="button" class="styled-button-1" disabled="true" onclick="nextday();"> <span title="Please fill all to continue">Next</span></button> 
		    </div>
		</div>

		<div id="footer">
		    <h2>
		      <img id="footer_logo" src="../css/img/footer_logo.png" height="47" width="47">
		    </h2>
		    <div style="text-align:center">
		      <p> &copy; <a href="http://www.ufl.edu">University of Florida</a> - Gainesville, FL 32611</p>
		    </div>
	    	<img id="footer_logo2" src="../css/img/footer_logo2.png">
	     </div>
	      <!-- End of footer -->
    </div>
    <!-- End of container -->

</body>
</html>