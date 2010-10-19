<?php
	include_once("cores/class.upload.php");
	
	$task = $_REQUEST['task'];
	$uploader = new uploadcsv(true);
	
	switch($task){
		case 'upload': 
			$result = $uploader->uploadData($_FILES['fcsv']['tmp_name']); 
			echo $result; 
		break; 
		case 'grid':
			$result = $uploader->getDataAll($_REQUEST['action'],$_REQUEST);
			echo $result;
		break; 
		
	}
?>