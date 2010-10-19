<?php
	include_once("includes/php-pdf/class.ezpdf.php"); 
	$cols = Array(
				'tgl_datang'=>'Tanggal Datang', 	
				'nama'=>'Nama', 				
				'kelamin'=>'Kelamin', 
				'tanggal_lahir'=>'Tanggal Lahir',
				'rt'=>'RT', 
				'rw'=>'RW', 
				'dusun'=>'Dusun',
				'alasan_datang'=>'Alasan Datang',
				'alamat'=>'Alamat', 
				'kelurahan'=>'Kelurahan',
				'kecamatan'=>'Kecamatan',
				'kabupaten'=>'Kabupaten/Kota',
				'propinsi'=>'Propinsi'
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
						'tgl_datang'=>formatDate($row->TGL_DATANG), 
						'nama'=>$row->NAMA,
						'kelamin'=>$row->KELAMIN,
						'tanggal_lahir'=>formatDate($row->TANGGAL_LAHIR),
						'rt'=>$row->RT,
						'rw'=>$row->RW,
						'dusun'=>$row->DUSUN,
						'alasan_datang'=>$row->ALASAN_DATANG,
						'alamat'=>$row->ALAMAT,
						'kelurahan'=>$row->KELURAHAN,
						'kecamatan'=>$row->KECAMATAN,
						'kabupaten'=>$row->KABUPATEN,
						'propinsi'=>$row->PROPINSI
					); 
	}
	
	$pdf = new Cezpdf('a4','landscape');
	$pdf->selectFont('includes/php-pdf/fonts/Helvetica.afm');
	$pdf->ezText('<b>Data Pendatang</b>',14,Array('justification'=>'center')); 
	$pdf->ezSetDy(-20); 
	$pdf->ezTable($data,$cols,'',$options); 
	$pdf->ezStream();
?>