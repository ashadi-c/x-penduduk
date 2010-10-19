<?php 
	include_once("cores/class.bku.php");
        include_once 'cores/class.trans.php';
        

	$task = $_REQUEST['task']; //parameter yang dikirim oleh js
	$bku = new bku(true);  //model di core

	switch($task) {
            case 'doRead':
                echo $bku->doRead($_REQUEST); //pake $_POST juga sama aja
            break;
            case 'saveEdit':
                echo $bku->saveEdit($_REQUEST); //pake $_POST juga sama aja
            break;
            case 'remove':
                echo $bku->remove($_REQUEST['data']); //pake $_POST juga sama aja
            break;

            case 'getTrans':
                    $trans = new trans(true);
                    $result = $trans->doRead($_REQUEST);
                    echo $result;
            break;

        }


?>
