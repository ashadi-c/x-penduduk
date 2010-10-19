<?php
	include_once("cores/class.penduduk.php"); 
	$file = ($_GET['mode']=='pdf')?"report_penduduk.pdf.php":"report_penduduk.xls.php"; 
	$penduduk = new penduduk(true); 
	$rs = $penduduk->getDataAll($_GET,1); 
	include($file); 
?>