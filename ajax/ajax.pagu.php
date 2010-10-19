<?php
include_once('cores/class.pagu.php');
$task = $_REQUEST['task']; //parameter yang dikirim oleh js
$pagu = new pagu(true);

switch($task) {
    case 'doRead':
        echo $pagu->doRead($_REQUEST); //pake $_REQUEST juga sama aja
    break;
    case 'saveEdit':
        echo $pagu->saveEdit($_REQUEST); //pake $_REQUEST juga sama aja
    break;
    case 'remove':
        echo $pagu->remove($_REQUEST['data']); //pake $_REQUEST juga sama aja
    break;

}

?>
