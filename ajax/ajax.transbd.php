<?php 
	include_once("cores/class.transbd.php");
		include_once 'cores/class.pagu.php';
			include_once 'cores/class.peny.php';

	$task = $_REQUEST['task']; //parameter yang dikirim oleh js
	$transbd = new transbd(true);  //model di core

	switch($task) {
            case 'doRead':
                echo $transbd->doRead($_REQUEST); //pake $_POST juga sama aja
            break;
            case 'saveEdit':
                echo $transbd->saveEdit($_REQUEST); //pake $_POST juga sama aja
            break;
            case 'remove':
                echo $transbd->remove($_REQUEST['data']); //pake $_POST juga sama aja
            break;
			case 'getPagu':
                    $pagu = new pagu(true);
                    $result = $pagu->doRead($_REQUEST);
                    echo $result;
            break;
			case 'getPeny':
                    $peny = new peny(true);
                    $result = $peny->doRead($_REQUEST);
                    echo $result;
            break;

        }


?>
