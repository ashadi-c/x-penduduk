<?php
	include_once("cores/class.pindah.php"); 
	include_once("includes/php-pdf/class.ezpdf.php");
        if (!$pindah)
            $pindah = new pindah(true);
	$rs = $pindah->buatSuratPindah($_GET['group_pindah']);
        $nomor_pindah = $_GET['nomor_pindah'];
	$pdf = new Cezpdf('legal');
	$pdf->ezSetCmMargins(2,2,2,2); 
	$pdf->selectFont('includes/php-pdf/fonts/Times-Roman.afm');
        $pdf->ezText('<b>PEMERINTAH KABUPATEN MALANG</b>',20,Array('justification'=>'center'));
        $pdf->ezText('<b>KECAMATAN BULULAWANG</b>',20,Array('justification'=>'center'));
        $pdf->ezText('<b>DESA BAKALAN</b>',20,Array('justification'=>'center'));
        $pdf->ezText('<i>Jl. Raya Desa Bakalan Kecamatan Bululawang Kabupaten Malang. Telp (0341) 823063</i>',12,Array('justification'=>'center'));
        $pdf->setLineStyle(2);
        $pdf->line(20, 865, 570, 865);
        $pdf->line(20, 862, 570, 862);
        $pdf->addJpegFromFile('images/logo.jpg',18,871,60,72);
	
	/**buat Colom Array **/ 
	$cols = Array(
				'name'=>'', 
				'sep'=>'',
				'value'=>''
			); 
	$options = Array(
				'shaded'=>0,
				'fontSize'=>10,
				'showHeadings'=>0, 
				'showLines'=>0, 
				//'xPos'=>'left',
				'cols'=>Array(
						'name'=>Array('width'=>200), 
						'sep'=>Array('width'=>13),
						'value'=>Array('width'=>270)
				)
				
			);
        $index=0;
        $data1 = Array();
        while ($row=$rs->FetchNextObject()){
            if (!$index){
                $data = Array(
                                Array('name'=>'Nama','sep'=>':','value'=>$row->NAMA),
                                Array('name'=>'Jenis Kelamin','sep'=>':','value'=>$row->KELAMIN),
                                Array('name'=>'Tempat Tanggal Lahir','sep'=>':','value'=>$row->TEMPAT_LAHIR." ". formatDate2($row->TANGGAL_LAHIR)),
                                Array('name'=>'Status','sep'=>':','value'=>$row->STATUS_KAWIN),
                                //Array('name'=>'Kebangsaan','sep'=>':','value'=>'Devi'),
                                Array('name'=>'Agama','sep'=>':','value'=>$row->AGAMA),
                                Array('name'=>'Pekerjaan','sep'=>':','value'=>$row->PEKERJAAN),
                                Array('name'=>'Pendidikan','sep'=>':','value'=>$row->PENDIDIKAN),
                                Array('name'=>'Alamat Asal','sep'=>':','value'=>$row->DUSUN ." RT/RW:". addNull($row->RT)."/".addNull($row->RW). " MALANG"),
                                Array('name'=>'Nomer KTP/KK','sep'=>':','value'=>$row->NO_KTP."/".$row->NO_KK),
                                Array('name'=>'Pindah Ke','sep'=>'','value'=>''),
                                Array('name'=>'    Alamat','sep'=>':','value'=>$row->ALAMAT),
                                Array('name'=>'    Kelurahan','sep'=>':','value'=>$row->KELURAHAN),
                                Array('name'=>'    Kecamatan','sep'=>':','value'=>$row->KECAMATAN),
                                Array('name'=>'    Kabupaten/Kota','sep'=>':','value'=>$row->KABUPATEN ." ".$row->PROPINSI),
                                Array('name'=>'    Pada Tanggal','sep'=>':','value'=>formatDate2($row->TGL_PINDAH)),
                                Array('name'=>'Alasan Pindah','sep'=>':','value'=>$row->ALASAN_PINDAH),
                                Array('name'=>'Pengikut','sep'=>'','value'=>'')

                        );
                $pdf->ezSetDy(-30);
                $pdf->ezText('<u><b>SURAT KETERANGAN PINDAH</b></u>',16,Array('justification'=>'center'));
                $pdf->ezSetDy(-8);
                $pdf->ezText('Nomor: 474/'.$nomor_pindah.'/421.621.010/'.getYear($row->TGL_PINDAH),12,Array('justification'=>'center'));
                $pdf->ezSetDy(-40);

            }
            if ($index)
                    $data1[] = Array(
                                    'numb'=>$index,
                                    'nama'=>$row->NAMA,
                                    'kelamin'=>($row->KELAMIN='LAKI-LAKI')?'L':'P',
                                    'tanggal_lahir'=> formatDate($row->TANGGAL_LAHIR),
                                    'status'=>$row->STATUS_KAWIN,
                                    'pendidikan'=>$row->PENDIDIKAN,
                                    'no_ktp'=>$row->NO_KTP
                                );
            $index++; 
        }
	$pdf->ezTable($data,$cols,'',$options); 	

	$cols = Array(
				'numb'=>'No',
				'nama'=>'Nama',
				'kelamin'=>'L/P',
				'tanggal_lahir'=>'Tanggal Lahir',
				'status'=>'Status Perkawinan',
				'pendidikan'=>'Pendidikan',
				'no_ktp'=>'No KTP'
				//'keterangan'=>'Keterangan'
			);
	$options = Array(
				'shaded'=>0,
				'fontSize'=>8,
				'titleFontSize'=>10,
                                'showLines'=>1,
                                'showHeadings'=>1,
                                'cols' =>
                                        Array(
                                            'numb'=>Array('width'=>20,'justification'=>'center'),
                                            'nama'=>Array('width'=>120,'justification'=>'center'),
                                            'kelamin'=>Array('width'=>25,'justification'=>'center'),
                                            'tanggal_lahir'=>Array('width'=>70,'justification'=>'center'),
                                            'status'=>Array('width'=>80,'justification'=>'center'),
                                            'pendidikan'=>Array('width'=>80,'justification'=>'center'),
                                            'no_ktp'=>Array('width'=>100,'justification'=>'center')
                                            //'keterangan'=>Array('width'=>80,'justification'=>'center')
                                        )
			);
       
       $pdf->ezSetDy(-10);
       if ($data1)
            $pdf->ezTable($data1,$cols,'',$options);

       $options['showLines'] =0;
       $options['showHeadings'] =0;
       $data1 = Array();
       $data1[] = Array(
          "nama"=>"Mengetahui" ,
           "no_ktp"=>"Bakalan, ". formatDate2(date('Y-m-d'))
       );
       $data1[] = Array(
          "nama"=>"Camat Bululawang" ,
           "no_ktp"=>"Kepala Desa Bakalan"
       );
       $data1[] = Array(
          "nama"=>"" ,
           "no_ktp"=>""
       );
       $data1[] = Array(
          "nama"=>"" ,
           "no_ktp"=>""
       );
       $data1[] = Array(
          "nama"=>"" ,
           "no_ktp"=>""
       );
       $data1[] = Array(
          "nama"=>"" ,
           "no_ktp"=>""
       );
       $data1[] = Array(
          "nama"=>"____________________" ,
           "no_ktp"=>"____________________"
       );

       $pdf->ezSetDy(-20);
       $pdf->ezTable($data1,$cols,'',$options);
       $option_left = Array('justification'=>'left','spacing'=>1.5);
       $pdf->ezSetDy(-12);
       $pdf->ezText("<u><b>CATATAN</b></u>",12,$option_left);
       $pdf->ezText("Pada waktu Surat Keterangan ini diberikan, Nama Ybs, pada KK dicoret dan KTP dicabut",12,$option_left);
        $pdf->ezStream();
?>