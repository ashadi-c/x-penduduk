<?php 
	include_once("cores/class.foto.php");
	
	$task = $_REQUEST['task'];
	$pdk = new penduduk(true);
	
	switch ($task) {
		case "getData":
			$result = $pdk->getData($_REQUEST);
			echo $result;
		break;

                case "upload":
                        $result = $pdk->uploadFoto($_REQUEST['id_penduduk'],$_FILES['fimg']);
                        echo $result;
                break;

                case "removepic":
                    $result = $pdk->removepic($_REQUEST['id_penduduk'], $_REQUEST['pic']);
                    echo $result; 
                break;
	}
	
	
?> 