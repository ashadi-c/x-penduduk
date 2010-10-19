<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$rs = $pagu->createReport($_GET);
while ($row=$rs->FetchNextObject()) {
    //lakulan loopong data disini $row->TANGGAL 
}
?>
