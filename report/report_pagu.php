<?php
	include_once("cores/class.pagu.php");
	$file = ($_GET['mode']=='pdf')?"report_pagu.fpdf.php":"report_pagu.word.php";
	$pagu = new pagu(true);
	include($file);
?>