<?php
	require_once ("includes/excel-2.0/Writer.php");
	require_once("includes/xls.php"); 
	$workbook = new xls();
	$workbook->send('data_datang.xls');
	$worksheet =& $workbook->addWorksheet("data_datang");
	
	$format_title =& $workbook->addFormat(array(
			'Align'=>'center',
			'Bold'=> '1',
			'Size'=>'10'
	));
	$format_title_field =& $workbook->addFormat(array(
			'Align'=>'center',
			'Bold'=> '1',
			'Border'=> '0',
			'Size'=>'8'
	)); 
	$format_text =& $workbook->addFormat(array(		
			'Border'=> '0',
			'Size'=>'8'
	));

	$worksheet->setLandscape();
	$worksheet->setPaper(1);
	
	$workbook->writeMerge($worksheet, 1, 0, 14, 1, 'Data Pendatang',$format_title); 
	$col = 0; 
	$row = 2; 
	$cols = Array(
				Array('name' =>'Tanggal Datang','width'=>20), 
				Array('name'=>'Nama','width'=>20),
				Array('name'=>'Jenis Kelamin','width'=>70), 
				Array('name'=>'Tanggal Lahir','width'=>40), 
				Array('name'=>'RT','width'=>20), 
				Array('name'=>'RW','width'=>20), 
				Array('name'=>'Dusun','width'=>10), 
				Array('name'=>'Alasan Datang','width'=>10), 
				Array('name'=>'Alamat','width'=>25), 
				Array('name'=>'Kelurahan','width'=>25),
				Array('name'=>'Kecamatan','width'=>25),
				Array('name'=>'Kabupaten/Kota','width'=>25),
				Array('name'=>'Propinsi','width'=>25)
			); 
	foreach ($cols as $field) {
		$worksheet->writeString($row, $col,$field['name'],$format_title_field);
		//$worksheet->setColumn($row, $col,$field['width']+0);
		//$format_title_field->setTextWrap();
		$col++; 
	}; 
	$row++; 

	$data = Array(); 	
	while ($rowx=$rs->FetchNextObject()) {
		$data[] = Array(
							formatDate($rowx->TGL_DATANG), 
							$rowx->NAMA,
							$rowx->KELAMIN,
							formatDate($rowx->TANGGAL_LAHIR), 
							$rowx->RT, 
							$rowx->RW, 
							$rowx->DUSUN, 
							$rowx->ALASAN_DATANG,
							$rowx->ALAMAT,
							$rowx->KELURAHAN,
							$rowx->KECAMATAN,
							$rowx->KABUPATEN,
							$rowx->PROPINSI
		); 
	}
	
	foreach ($data as $r) {
			$col =0; 
			foreach ($r as $c) {
				$worksheet->writeString($row, $col,$c,$format_text);
				$col++; 
			}
			$row++; 
	}
	
	$workbook->close();

	if (set_magic_quotes_runtime(1)==false)
		die("Set Magic Quote Runtime Failed.");
		
	exit();	
?>