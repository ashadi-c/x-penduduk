<?php
	include_once("cores/class.kelahiran.php");
	
	$task = $_REQUEST['task'];
	$kelahiran = new kelahiran(true);
	
	switch($task) {
		case 'getData': 
				$result = $kelahiran->getData($_REQUEST);
				echo $result;
		break;

		case 'getData2': 
				$result = $kelahiran->getData2($_REQUEST);
				echo $result;
		break;
		
		case 'addNew':
				$result = $kelahiran->addNew(
												$_REQUEST['nama_bayi'],
												$_REQUEST['kelamin_bayi'],
												$_REQUEST['tanggal_lahir_bayi'],
												$_REQUEST['tempat_lahir_bayi'],
												$_REQUEST['berat_badan'], 
												$_REQUEST['keterangan'],
												$_REQUEST['id_penduduk'],
												$_REQUEST['anggota_dari'],
												$_REQUEST['agama'],
												$_REQUEST['rt'],
												$_REQUEST['rw'],
												$_REQUEST['dusun'],
												$_REQUEST['no_kk']
											); 
				echo $result; 
		break; 
		
		case 'removeList': 
				$result = $kelahiran->removeList($_REQUEST['dataList']); 
				echo $result; 
		break;
		
	}
?>