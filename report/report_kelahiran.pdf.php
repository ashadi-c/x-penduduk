<?php
	include_once("includes/php-pdf/class.ezpdf.php"); 
	$cols = Array(
				'tgl_lahir_bayi'=>'Tanggal Lahir', 	
				'nama_bayi'=>'Nama Bayi', 				
				'kelamin_bayi'=>'Jenis Kelamin', 
				'berat_badan'=>'Berat Badan',
				'tempat_lahir_bayi'=>'Tempat Lahir',
				'keterangan'=>'Keterangan',
				'ibu_bayi'=>'Ibu Bayi',
				'rt'=>'RT', 
				'rw'=>'RW', 
				'dusun'=>'Dusun'
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
						'tgl_lahir_bayi'=>formatDate($row->TANGGAL_LAHIR_BAYI), 
						'nama_bayi'=>$row->NAMA_BAYI,
						'kelamin_bayi'=>$row->KELAMIN_BAYI,
						'berat_badan'=>$row->BERAT_BADAN,
						'tempat_lahir_bayi'=>$row->TEMPAT_LAHIR_BAYI,
						'keterangan'=>$row->KETERANGAN,
						'ibu_bayi'=>$row->IBU_BAYI,
						'rt'=>$row->RT,
						'rw'=>$row->RW,
						'dusun'=>$row->DUSUN
					); 
	}
	
	$pdf = new Cezpdf('a4','landscape');
	$pdf->selectFont('includes/php-pdf/fonts/Helvetica.afm');
	$pdf->ezText('<b>Data Kelahiran</b>',14,Array('justification'=>'center')); 
	$pdf->ezSetDy(-20); 
	$pdf->ezTable($data,$cols,'',$options); 
	$pdf->ezStream();
?>