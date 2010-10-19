<?php
	include_once("includes/php-pdf/class.ezpdf.php"); 
	$cols = Array(
				'no_kk' =>'<b>No KK</b>', 
				'no_ktp'=>'No KTP',
				'nama'=>'Nama', 
				'kelamin'=>'Jenis Kelamin', 
				'tempat_lahir'=>'Tempat Lahir', 
				'tanggal_lahir'=>'Tanggal Lahir', 
				'umur'=>'Umur', 
				'status_kawin'=>'Status', 
				'agama'=>'Agama', 
				'pendidikan'=>'Pendidikan', 
				'rt'=>'RT', 
				'rw'=>'RW', 
				'dusun'=>'Dusun', 
				'baca_tulis'=>'Baca Tulis'
			); 
	$options = Array(
				'shaded'=>1,
				'width'=>800,
				'fontSize'=>8,
				'titleFontSize'=>10
			); 

	$data = Array(); 	
	while ($row=$rs->FetchNextObject()) {
		$data[] = Array(
						'no_kk'=>$row->NO_KK,
						'no_ktp'=>$row->NO_KTP, 
						'nama'=>$row->NAMA,
						'kelamin'=>$row->KELAMIN,
						'tempat_lahir'=>$row->TEMPAT_LAHIR,
						'tanggal_lahir'=>formatDate($row->TANGGAL_LAHIR),
						'umur'=>$row->UMUR, 
						'status_kawin'=>$row->STATUS_KAWIN,
						'agama'=>$row->AGAMA, 
						'pendidikan'=>$row->PENDIDIKAN,
						'rt'=>$row->RT,
						'rw'=>$row->RW,
						'dusun'=>$row->DUSUN,
						'baca_tulis'=>$row->BACA_TULIS
					); 
	}
	
	$pdf = new Cezpdf('a4','landscape');
	$pdf->selectFont('includes/php-pdf/fonts/Helvetica.afm');
	$pdf->ezText('<b>Data Kepala Keluarga</b>',14,Array('justification'=>'center')); 
	$pdf->ezSetDy(-20); 
	$pdf->ezTable($data,$cols,'',$options); 
	$pdf->ezStream();
?>