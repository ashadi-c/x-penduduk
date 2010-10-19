<?php
	include_once("cores/class.pindah.php");
	
	$task = $_REQUEST['task'];
	$pindah = new pindah(true);

	switch($task) {
		case 'getPenduduk': 
				$result = $pindah->getPenduduk($_REQUEST);
				echo $result;
		break;	
		
		case 'addNew':
				$result = $pindah->addNew(
											$_REQUEST['tanggal_pindah'],
											$_REQUEST['alamat'],
											$_REQUEST['kelurahan'],
											$_REQUEST['kecamatan'],
											$_REQUEST['kota'],
											$_REQUEST['propinsi'],
											$_REQUEST['alasan'],
											$_REQUEST['dataList']
										); 
				echo $result;
		break;

		case 'getDataPindah': 
				$result = $pindah->getDataPindah($_REQUEST);
				echo $result;
		break;

		case 'getAlasan': 
				$result = $pindah->getAlasan($_REQUEST['group_pindah']); 
				echo $result; 
		break; 
		
		case 'removeList': 
				$result = $pindah->removeList($_REQUEST['dataList']); 
				echo $result; 
		break; 
		
		case 'editData': 
				$result = $pindah->editData($_REQUEST['dataList'],$_REQUEST['group_pindah']); 
				echo $result; 
		break; 

	}
?>