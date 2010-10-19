<?php
include_once('cores/class.trans.php');
$task = $_REQUEST['task']; //parameter yang dikirim oleh js
$trans = new trans(true);

switch($task) {
    case 'doRead':
        echo $trans->doRead($_REQUEST); //pake $_REQUEST juga sama aja
    break;
    case 'saveEdit':
        echo $trans->saveEdit($_REQUEST); //pake $_REQUEST juga sama aja
    break;
    case 'remove':
        echo $trans->remove($_REQUEST['data']); //pake $_REQUEST juga sama aja
    break;

}
?>
