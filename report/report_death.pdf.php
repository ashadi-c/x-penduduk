<?php
	include_once("includes/php-pdf/class.ezpdf.php"); 
	$cols = Array(
				'tgl'=>'Tanggal Kematian', 	
				'jam'=>'Jam Kematian', 		
				'makam'=>'Dimakamkan', 
				'nama'=>'Nama', 				
				'kelamin'=>'Jenis Kelamin', 
				'tanggal_lahir'=>'Tanggal Lahir', 
				'rt'=>'RT', 
				'rw'=>'RW', 
				'dusun'=>'Dusun',
				'alasan'=>'Keterangan'
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
						'tgl'=>formatDate($row->TANGGAL_KEMATIAN), 
						'jam'=>$row->JAM_KEMATIAN,
						'makam'=>$row->TEMPAT_MAKAM,
						'nama'=>$row->NAMA,
						'kelamin'=>$row->KELAMIN,
						'tanggal_lahir'=>formatDate($row->TANGGAL_LAHIR),
						'rt'=>$row->RT,
						'rw'=>$row->RW,
						'dusun'=>$row->DUSUN,
						'alasan'=>$row->KETERANGAN
					); 
	}
	
	$pdf = new Cezpdf('a4','landscape');
	$pdf->selectFont('includes/php-pdf/fonts/Helvetica.afm');
	$pdf->ezText('<b>Data Orang Meninggal</b>',14,Array('justification'=>'center')); 
	$pdf->ezSetDy(-20); 
	$pdf->ezTable($data,$cols,'',$options); 
	$pdf->ezStream();
?>