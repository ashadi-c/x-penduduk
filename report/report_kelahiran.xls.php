<?php
	require_once ("includes/excel-2.0/Writer.php");
	require_once("includes/xls.php"); 
	$workbook = new xls();
	$workbook->send('data_kelahiran.xls');
	$worksheet =& $workbook->addWorksheet("data_kelahiran");
	
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
	
	$workbook->writeMerge($worksheet, 1, 0, 14, 1, 'Data Kelahiran',$format_title); 
	$col = 0; 
	$row = 2; 
	$cols = Array(
				Array('name' =>'Tanggal Lahir','width'=>20), 
				Array('name'=>'Nama Bayi','width'=>20),
				Array('name'=>'Jenis Kelamin','width'=>70), 
				Array('name'=>'Berat Badan','width'=>40), 
				Array('name'=>'Tempat Lahir','width'=>20), 
				Array('name'=>'Keterangan','width'=>25),
				Array('name'=>'Ibu Bayi','width'=>10), 
				Array('name'=>'RT','width'=>10), 
				Array('name'=>'RW','width'=>10), 
				Array('name'=>'Dusun','width'=>25)
				
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
							formatDate($rowx->TANGGAL_LAHIR_BAYI), 
							$rowx->NAMA_BAYI,
							$rowx->KELAMIN_BAYI,
							$rowx->BERAT_BADAN, 
							$rowx->TEMPAT_LAHIR_BAYI,
							$rowx->KETERANGAN,
							$rowx->IBU_BAYI,
							$rowx->RT, 
							$rowx->RW, 
							$rowx->DUSUN
							
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