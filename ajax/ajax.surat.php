<?php
	include_once("cores/class.surat.php");
        include_once("cores/class.death.php");

	$task = $_REQUEST['task'];
	$surat = new surat(true);
	switch($task) {
            case 'getSurat':
                $result = $surat->getSurat($_REQUEST);
                echo $result; 
            break;
            case 'getData':
                $death = new death(true);
                $result = $death->getData($_REQUEST);
                echo $result;
            break;
            case 'saveEdit':
                echo $surat->saveEdit($_REQUEST);
            break;
            case 'remove':
                echo $surat->remove($_REQUEST['data']);
            break; 
        }


?>
