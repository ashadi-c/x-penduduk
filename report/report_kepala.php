<?php
	include_once("cores/class.penduduk.php"); 
	$file = ($_GET['mode']=='pdf')?"report_kepala.pdf.php":"report_kepala.xls.php"; 
	$penduduk = new penduduk(true); 
	$rs = $penduduk->getData($_GET,1); 
	include($file); 
?>