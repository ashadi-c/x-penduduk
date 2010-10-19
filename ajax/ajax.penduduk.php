<?php 
	include_once("cores/class.penduduk.php");
	
	$task = $_REQUEST['task'];
	$pdk = new penduduk(true);
	
	switch ($task) {
		case "addNew": 
				$result = $pdk->addNew(
										$_REQUEST['emp_name'],
										$_REQUEST['hgender'],
										$_REQUEST['place_of_birth'],
										$_REQUEST['date_of_birth'],
										$_REQUEST['hmarital'],
										$_REQUEST['hregion'],
										$_REQUEST['hPnd'],
										$_REQUEST['pekerjaan'],
										$_REQUEST['hBaca'],
										'Kepala Keluarga',
										$_REQUEST['rt'],
										$_REQUEST['rw'],
										$_REQUEST['hdusun'],
										$_REQUEST['no_ktp'],
										$_REQUEST['no_kk'],
										$_REQUEST['anggota']
									);
				echo $result;
		break;
		
		case "getData":
				$result = $pdk->getData($_REQUEST);
				echo $result;
		break;

		case "getDataAll":
				$result = $pdk->getDataAll($_REQUEST);
				echo $result;
		break;

		case "getDetail":
				$result = $pdk->getDetail($_REQUEST,$_REQUEST['id_penduduk']);
				echo $result;
		break;

		case "editParent": 
				$result = $pdk->editParent($_REQUEST); 
				echo $result; 
		break; 

		case "saveEdit": 
				$result = $pdk->saveEdit($_REQUEST); 
				echo $result; 
		break; 

		case "removeList":
				$result = $pdk->removeList($_REQUEST['dataList']); 
				echo $result; 
		break;

		case "removeList2":
				$result = $pdk->removeList2($_REQUEST['dataList']); 
				echo $result; 
		break;

		case "pisahKK":
				$result = $pdk->pindahKK($_REQUEST['dataList']); 
				echo $result; 
		break; 
		
		case "getFormEdit":
				$result = $pdk->getFormEdit($_REQUEST['id_penduduk']); 
				echo $result; 
		break;

		case "editChild" :
				$result = $pdk->editChild($_REQUEST['dataList'],$_REQUEST['parentId'],$_REQUEST['no_kk'],$_REQUEST['removeList']); 
				echo $result; 
		break;
		
		case 'setKepala':
				$result = $pdk->setKepala($_REQUEST['id_penduduk'],$_REQUEST['anggota_dari']); 
				echo $result; 
		break;

	}
	
	
?> 