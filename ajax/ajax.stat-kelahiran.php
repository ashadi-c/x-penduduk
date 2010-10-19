<?php
	include_once("cores/class.stat-kelahiran.php");
	
	$task = $_REQUEST['task'];
	$chart = new statKelahiran(true);
	
	switch($task) {
		case 'getChartGender':
			$result = $chart->getChartGender($_REQUEST); 
			echo $result; 
		break; 
		case 'getChartWeight':
			$result = $chart->getChartWeight($_REQUEST); 
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
		case 'getChartDate':
			$result = $chart->getChartDate($_REQUEST); 
			echo $result; 
		break; 
		
	}

?>