<?php
	include_once("cores/class.stat-mati.php");
	
	$task = $_REQUEST['task'];
	$chart = new statMati(true);
	
	switch($task) {
		case 'getChartDate':
			$result = $chart->getChartDate($_REQUEST); 
			echo $result; 
		break; 
		case 'getChartYear':
			$result = $chart->getChartYear($_REQUEST); 
			echo $result; 
		break; 
		
	}


?>