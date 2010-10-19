<?php
	include_once("cores/class.kelahiran.php"); 
	$file = ($_GET['mode']=='pdf')?"report_kelahiran.pdf.php":"report_kelahiran.xls.php"; 
	$kelahiran = new kelahiran(true); 
	$rs = $kelahiran->getData2($_GET,1); 
	include($file); 
?>