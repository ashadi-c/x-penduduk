<?php
	include_once("cores/class.peny.php");
        include_once 'cores/class.sppk.php';
        

	$task = $_REQUEST['task']; //parameter yang dikirim oleh js
	$peny = new peny(true);  //model di core

	switch($task) {
            case 'doRead':
                echo $peny->doRead($_REQUEST); //pake $_REQUEST juga sama aja
            break;
            case 'saveEdit':
                echo $peny->saveEdit($_REQUEST); //pake $_REQUEST juga sama aja
            break;
            case 'remove':
                echo $peny->remove($_REQUEST['data']); //pake $_REQUEST juga sama aja
            break;

            case 'getSppk':
                    $sppk = new sppk(true);
                    $result = $sppk->doRead($_REQUEST);
                    echo $result;
            break;

        }


?>
