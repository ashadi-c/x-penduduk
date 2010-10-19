<?php
	include_once("cores/class.realiasi.php");

	$task = $_REQUEST['task'];
	$chart = new realiasi(true);

	switch($task) {
		case 'getChart':
			$result = $chart->getChart($_REQUEST);
			echo $result;
		break;

	}


?>