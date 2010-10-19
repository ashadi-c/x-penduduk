<?php
	include_once("cores/class.spanpbj.php");
	$file = ($_GET['mode']=='pdf')?"report_spanpbj.pdf.php":"report_spanpbj.word.php";
	$spanpbj = new spanpbj(true);
	$rs = $spanpbj->createReport($_GET['id_data']);
	include($file);
?>