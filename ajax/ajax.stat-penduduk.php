<?php
	include_once("cores/class.stat.penduduk.php");
	
	$task = $_REQUEST['task'];
	$chart = new statPenduduk(true);
	
	switch($task) {
		case 'getChartGender':
			$result = $chart->getChartGender($_REQUEST); 
			echo $result; 
		break; 
		case 'getChartAge':
			$result = $chart->getChartAge($_REQUEST); 
			echo $result; 
		break; 
		case 'getChartEducation':
			$result = $chart->getChartEducation($_REQUEST); 
			echo $result; 
		break; 
		case 'getChartReligion':
			$result = $chart->getChartReligion($_REQUEST); 
			echo $result; 
		break; 
		
	}
?>