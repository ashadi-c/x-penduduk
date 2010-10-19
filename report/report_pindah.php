<?php
	include_once("cores/class.pindah.php"); 
	$file = ($_GET['mode']=='pdf')?"report_pindah.pdf.php":"report_pindah.xls.php";
        $file = ($_GET['mode']=='spt')?"report_pindah_group.php": $file; 
	$pindah = new pindah(true);
        if ($file !='report_pindah_group.php')
            $rs = $pindah->getDataPindah($_GET,1);
	include($file); 
?>