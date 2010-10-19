<?php
	include_once("includes/php-pdf/class.ezpdf.php");
	$cols = Array(
				'jenis'=>'Jenis',
				'tanggal'=>'Tanggal',
				'perihal'=>'Perihal',
				'kode'=>'Kode',
				'tahun'=>'Tahun'
			);
	$options = Array(
				'shaded'=>1,
				'width'=>800,
				'fontSize'=>8,
				'titleFontSize'=>10
			);

	$data = Array();
	
		$data[] = Array(
                                'jenis'=>$rs->fields['jenis'],
                                'tanggal'=>formatDate($rs->fields['tanggal']),
                                'perihal'=>$rs->fields['perihal'],
                                'kode'=>$rs->fields['kode'],
                                'tahun'=>$rs->fields['tahun']
                        );


	$pdf = new Cezpdf('a4','landscape');
	$pdf->selectFont('includes/php-pdf/fonts/Helvetica.afm');
	$pdf->ezText('<b>Data SpanJb</b>',14,Array('justification'=>'center'));
	$pdf->ezSetDy(-20);
	$pdf->ezTable($data,$cols,'',$options);
	$pdf->ezStream();
?>