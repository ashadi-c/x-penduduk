<?php
	include_once("cores/class.spanpbj.php");
        include_once 'cores/class.sppk.php';
        

	$task = $_REQUEST['task']; //parameter yang dikirim oleh js
	$spanpbj = new spanpbj(true);  //model di core

	switch($task) {
            case 'doRead':
                echo $spanpbj->doRead($_REQUEST); //pake $_REQUEST juga sama aja
            break;
            case 'saveEdit':
                echo $spanpbj->saveEdit($_REQUEST); //pake $_REQUEST juga sama aja
            break;
            case 'remove':
                echo $spanpbj->remove($_REQUEST['data']); //pake $_REQUEST juga sama aja
            break;

            case 'getSppk':
                    $sppk = new sppk(true);
                    $result = $sppk->doRead($_REQUEST);
                    echo $result;
            break;

        }


?>
