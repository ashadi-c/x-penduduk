<?php
	require_once ("includes/excel-2.0/Writer.php");
	require_once("includes/xls.php"); 
	$workbook = new xls();
	$workbook->send('data_penduduk.xls');
	$worksheet =& $workbook->addWorksheet("data_penduduk");
	
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
	
	$workbook->writeMerge($worksheet, 1, 0, 15, 1, 'Data Penduduk',$format_title);
	$col = 0; 
	$row = 2; 
	$cols = Array(
				Array('name' =>'No KK','width'=>20), 
				Array('name'=>'No KTP','width'=>20),
				Array('name'=>'Nama','width'=>70), 
				Array('name'=>'Jenis Kelamin','width'=>40), 
				Array('name'=>'Tempat Lahir','width'=>20), 
				Array('name'=>'Tanggal Lahir','width'=>20), 
				Array('name'=>'Umur','width'=>20), 
				Array('name'=>'Status','width'=>25), 
				Array('name'=>'Agama','width'=>25), 
				Array('name'=>'Pendidikan','width'=>20), 
				Array('name'=>'RT','width'=>10), 
				Array('name'=>'RW','width'=>10), 
				Array('name'=>'Dusun','width'=>25),
                                Array('name'=>'Pekerjaan','width'=>25),
				Array('name'=>'Baca Tulis','width'=>25)
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
						'no_kk'=>$rowx->NO_KK,
						'no_ktp'=>$rowx->NO_KTP, 
						'nama'=>$rowx->NAMA,
						'kelamin'=>$rowx->KELAMIN,
						'tempat_lahir'=>$rowx->TEMPAT_LAHIR,
						'tanggal_lahir'=>formatDate($rowx->TANGGAL_LAHIR),
						'umur'=>$rowx->UMUR, 
						'status_kawin'=>$rowx->STATUS_KAWIN,
						'agama'=>$rowx->AGAMA, 
						'pendidikan'=>$rowx->PENDIDIKAN,
						'rt'=>$rowx->RT,
						'rw'=>$rowx->RW,
						'dusun'=>$rowx->DUSUN,
                                                'pekerjaan'=>$rowx->PEKERJAAN,
						'baca_tulis'=>$rowx->BACA_TULIS
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