<?php

include_once("includes/phpword/PHPWord.php");
$template_file = "template_word/s_ktp.doc";
$download_file ="download_word/surat_ktp.doc";


$masa_berlaku = explode('/', $rs->fields['tambahan']);
$masa_berlaku = array_reverse($masa_berlaku);
$masa_berlaku = implode('-',$masa_berlaku);


$PHPWord = new PHPWord();
$document = $PHPWord->loadTemplate($template_file);
$document->setValue('nomor','470/'.$rs->fields['no_surat'].'/421.621.010/'.getYear($rs->fields['tgl_ttd']));
$document->setValue('nama', $rs->fields['nama']);
$document->setValue('nama1', $rs->fields['nama']);
$document->setValue('jk', ucwords($rs->fields['kelamin']));
$document->setValue('tgl_lahir', ucwords($rs->fields['tempat_lahir']). ', '. formatDate2($rs->fields['tanggal_lahir']));
$document->setValue('status', ucwords($rs->fields['status_kawin']));
$document->setValue('agama', ucwords($rs->fields['agama']));
$document->setValue('pekerjaan', ucwords($rs->fields['pekerjaan']));
$document->setValue('keterangan', ucwords($rs->fields['keterangan_1']));
$document->setValue('tanggal', formatDate2($rs->fields['tgl_ttd']));
$document->setValue('dusun', ucwords($rs->fields['dusun']));
$document->setValue('rt', addNull($rs->fields['rt']).'/'.addNull($rs->fields['rw']));
$document->setValue('desa', 'Bakalan');
$document->setValue('berlaku', formatDate2($masa_berlaku));

$document->save($download_file);
echo "<h1>Surat Berhasil di buat</h1>";
echo "<h3><a href='$download_file'>Silahkan download disini</a></h3>"

/**
include_once("includes/php-pdf/class.ezpdf.php");
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
$pdf->ezSetDy(-20);
$pdf->ezText('<u><b>SURAT KETERANGAN PENDUDUK SEMENTARA</b></u>',16,Array('justification'=>'center'));
$pdf->ezSetDy(-8);
$pdf->ezText('Nomor: 470/'.$rs->fields['no_surat'].'/421.621.010/'.getYear($rs->fields['tgl_ttd']),12,Array('justification'=>'center'));
$pdf->ezSetDy(-50);
$option_left = Array('justification'=>'left','spacing'=>1.5);
$option_full = Array('justification'=>'full','spacing'=>1.5);
$pdf->ezText('Keterangan Penduduk Sementara ini diberikan kepada :',12,$option_left);
$pdf->ezSetDy(-12);
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
                                        'value'=>Array('width'=>300)
                        )

                );
$masa_berlaku = explode('/', $rs->fields['tambahan']);
$masa_berlaku = array_reverse($masa_berlaku);
$masa_berlaku = implode('-',$masa_berlaku); 
$data = Array(
                Array('name'=>'Nama','sep'=>':','value'=>'<b>'.$rs->fields['nama'].'</b>'),
                Array('name'=>'Jenis Kelamin','sep'=>':','value'=>ucwords($rs->fields['kelamin'])),
                Array('name'=>'Tempat/Tgl Lahir','sep'=>':','value'=>ucwords($rs->fields['tempat_lahir']). ', '. formatDate2($rs->fields['tanggal_lahir'])),
                Array('name'=>'Kewarganegaraan','sep'=>':','value'=>'Indonesia'),
                Array('name'=>'Status Perkawinan','sep'=>':','value'=>ucwords($rs->fields['status_kawin'])),
                Array('name'=>'Agama','sep'=>':','value'=>ucwords($rs->fields['agama'])),
                Array('name'=>'Pekerjaan','sep'=>':','value'=>ucwords($rs->fields['pekerjaan'])),
                Array('name'=>'Alamat','sep'=>':','value'=>'Dusun '. ucwords($rs->fields['dusun'])),
                Array('name'=>'RT/RW','sep'=>':','value'=>addNull($rs->fields['rt']).'/'.addNull($rs->fields['rw'])),
                Array('name'=>'Desa /Kelurahan','sep'=>':','value'=>'Bakalan'),
                Array('name'=>'Kecamatan','sep'=>':','value'=>'Bululawang'),
                Array('name'=>'Kabupaten','sep'=>':','value'=>'Malang'),
                Array('name'=>'Berlaku Hingga','sep'=>':','value'=>formatDate2($masa_berlaku))
        );
$pdf->ezTable($data,$cols,'',$options);
$pdf->ezSetDy(-10);
$pdf->ezText('          Demikian Surat Keterangan Penduduk Sementara ini diberikan untuk dapat dipergunakan '.$rs->fields['keterangan_1'],12,
$option_full);
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
                        'fontSize'=>10,
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
                                    'no_ktp'=>Array('width'=>110,'justification'=>'center')
                                )
                );

   $options['showLines'] =0;
   $options['showHeadings'] =0;
   $data1 = Array();
       $data1[] = Array(
          "nama"=>"" ,
           "no_ktp"=>"Bakalan, ". formatDate2($rs->fields['tgl_ttd'])
       );
       $data1[] = Array(
          "nama"=>"Tanda tangan ybs." ,
           "no_ktp"=>"PJ. Kepala Desa Bakalan"
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
          "nama"=>"<u><b>".$rs->fields['nama']."</b></u>" ,
           "no_ktp"=>"<u><b>SUPRAPTO,B.Sc.</b></u>"
       );
       $data1[] = Array(
          "nama"=>"" ,
           "no_ktp"=>"Pengatur Muda"
       );
       $data1[] = Array(
          "nama"=>"" ,
           "no_ktp"=>"NIP. 196107072007011011"
       );

       $pdf->ezSetDy(-30);
       $pdf->ezTable($data1,$cols,'',$options);
       $pdf->addJpegFromFile('upload_foto/'.$rs->fields['picture'],325,305,94,124);
$pdf->ezStream();
**/
?>
