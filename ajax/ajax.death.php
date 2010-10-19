<?php
	include_once("cores/class.death.php");
	
	$task = $_REQUEST['task'];
	$death = new death(true);
	
	switch($task) {
		case 'getData': 
				$result = $death->getData($_REQUEST);
				echo $result;
		break;
		case 'getDeathAll': 
				$result = $death->getDeathAll($_REQUEST);
				echo $result;
		break;		
		case 'addNew': 
				$result = $death->addNew(
											$_REQUEST['id_penduduk'],
											$_REQUEST['tanggal_kematian'],
											$_REQUEST['jam_kematian'],
											$_REQUEST['tempat_makam'],
											$_REQUEST['keterangan']
										);
				echo $result; 
		break;
		
		case 'restoreDeath': 
				$result = $death->restoreDeath($_REQUEST['dataList']); 
				echo $result; 
		break; 
		
		case 'saveEdit':
				$result= $death->saveEdit(
											$_REQUEST['id_penduduk'],
											$_REQUEST['tanggal_kematian'],
											$_REQUEST['jam_kematian'],
											$_REQUEST['tempat_makam'],
											$_REQUEST['keterangan']
										);
				echo $result; 
		break;
	}

?>