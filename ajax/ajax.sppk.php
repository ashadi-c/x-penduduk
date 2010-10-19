<?php
	include_once("cores/class.sppk.php");

	$task = $_REQUEST['task']; //parameter yang dikirim oleh js
	$sppk = new sppk(true);  //model di core

	switch($task) {
            case 'doRead':
                echo $sppk->doRead($_REQUEST); //pake $_REQUEST juga sama aja
            break;
            case 'saveEdit':
                echo $sppk->saveEdit($_REQUEST); //pake $_REQUEST juga sama aja
            break;
            case 'remove':
                echo $sppk->remove($_REQUEST['data']); //pake $_REQUEST juga sama aja
            break;

        }


?>
