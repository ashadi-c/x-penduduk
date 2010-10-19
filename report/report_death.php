<?php
	include_once("cores/class.death.php"); 
	$file = ($_GET['mode']=='pdf')?"report_death.pdf.php":"report_death.xls.php"; 
	$penduduk = new death(true); 
	$rs = $penduduk->getDeathAll($_GET,1); 
	include($file); 
?>