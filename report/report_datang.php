<?php
	include_once("cores/class.datang.php"); 
	$file = ($_GET['mode']=='pdf')?"report_datang.pdf.php":"report_datang.xls.php"; 
	$datang = new datang(true); 
	$rs = $datang->getDataDatang($_GET,1); 
	include($file); 
?>