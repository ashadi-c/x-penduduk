<?php 
	include_once("cores/class.datang.php");
	
	$task = $_REQUEST['task'];
	$datang = new datang(true);
	
	switch($task) {
			case 'addNew':
				$result = $datang->addNew($_REQUEST['dataGrid'],$_REQUEST['dataForm'],$_REQUEST['sc']); 
				echo $result; 
			
			break; 

		case 'getDatadatang': 
				$result = $datang->getDatadatang($_REQUEST);
				echo $result;
		break;
		
		case 'getAlasan': 
				$result = $datang->getAlasan($_REQUEST['group_datang']); 
				echo $result; 
		break; 

		case 'editData': 
				$result = $datang->editData($_REQUEST['dataList'],$_REQUEST['group_datang']); 
				echo $result; 
		break; 	

		case 'removeList': 
				$result = $datang->removeList($_REQUEST['dataList']); 
				echo $result; 
		break; 
		
		case 'getData': 
				$result = $datang->getData($_REQUEST); 
				echo $result; 
		break; 
		
	}
?> 