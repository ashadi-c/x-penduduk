<?php

include_once("includes/php-pdf/class.ezpdf.php");
$pdf = new Cezpdf('legal');
$pdf->ezSetCmMargins(2,2,2,2);
$pdf->selectFont('includes/php-pdf/fonts/Times-Roman.afm');
$pdf->setLineStyle(2);
function setHeading($pdf){
    $pdf->ezText('<b>PEMERINTAH KABUPATEN MALANG</b>',20,Array('justification'=>'center'));
    $pdf->ezText('<b>KECAMATAN BULULAWANG</b>',20,Array('justification'=>'center'));
    $pdf->ezText('<b>DESA BAKALAN</b>',20,Array('justification'=>'center'));
    $pdf->ezText('<i>Jl. Raya Desa Bakalan Kecamatan Bululawang Kabupaten Malang. Telp (0341) 823063</i>',12,Array('justification'=>'center'));
    $pdf->line(20, 865, 570, 865);
    $pdf->line(20, 862, 570, 862);
    $pdf->addJpegFromFile('images/logo.jpg',18,871,60,72);
}
setHeading($pdf);
$pdf->addText(400, 848, 12, 'Bakalan, '.formatDate2($rs->fields['tgl_ttd']));
$pdf->addText(400, 834, 12, 'Kepada');
$pdf->addText(400, 820, 12, '<b>Bapak Kepala Kepolisian</b>');
$pdf->addText(360, 820, 12, 'Yth.');
$pdf->addText(400, 806, 12, '<b>Sektor Bululawang</b>');
$pdf->addText(400, 792, 12, 'di Bululawang');
$pdf->addText(20, 834, 12, '<b>Perihal : Permohonan Untuk</b>');
$pdf->addText(68, 820, 12, '<b>Mendapatkan SKCK</b>');
$pdf->ezSetDy(-130);
$option_left = Array('justification'=>'left','spacing'=>1.5);
$option_full = Array('justification'=>'full','spacing'=>1.5);
$pdf->ezText('              Dengan Hormat',12,$option_left);
$pdf->ezText('              Yang Bertanda Tangan dibawah ini saya:',12,$option_left);
$pdf->ezSetDy(-12); 
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
                                        'name'=>Array('width'=>150),
                                        'sep'=>Array('width'=>13),
                                        'value'=>Array('width'=>350)
                        )

                );
$data = Array(
                Array('name'=>'Nama Lengkap','sep'=>':','value'=>'<b>'.$rs->fields['nama'].'</b>'),
                Array('name'=>'Jenis Kelamin','sep'=>':','value'=>ucwords($rs->fields['kelamin'])),
                Array('name'=>'Tempat/Tgl Lahir','sep'=>':','value'=>ucwords($rs->fields['tempat_lahir']). ', '. formatDate2($rs->fields['tanggal_lahir'])),
                Array('name'=>'Kewarganegaraan','sep'=>':','value'=>'Indonesia'),
                Array('name'=>'Status Perkawinan','sep'=>':','value'=>ucwords($rs->fields['status_kawin'])),
                Array('name'=>'Agama','sep'=>':','value'=>ucwords($rs->fields['agama'])),
                Array('name'=>'Pekerjaan','sep'=>':','value'=>ucwords($rs->fields['pekerjaan'])),
                Array('name'=>'Alamat Lengkap','sep'=>':','value'=>'Dusun '.ucwords($rs->fields['dusun']).' RT. '.addNull($rs->fields['rt']).' RW. '.addNull($rs->fields['rw']).' Desa Bakalan'),
                Array('name'=>'','sep'=>'','value'=>'Kecamatan Bululawang Kabupaten Malang'),
        );
$pdf->ezTable($data,$cols,'',$options);
$pdf->ezSetDy(-12);
$text_1 = '            Bersama ini mohon dengan hormat agar saya mendapat Surat keterangan Catatan Kepolisian (SKCK) untuk keperluan kelengkapan saya, guna persyaratan :';
$text_2 = '              Demikian untuk menjadikan periksa serta atas terkabulnya permohonan saya, disampaikan terima kasih.';
$text_keterangan = '<b>'.$rs->fields['keterangan_1'].'</b>';
$pdf->ezText($text_1,12,$option_full);
$pdf->ezText($text_keterangan,12,$option_full);
$pdf->ezText($text_2,12,$option_full);

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
                                    'nama'=>Array('width'=>140,'justification'=>'center'),
                                    'kelamin'=>Array('width'=>5,'justification'=>'center'),
                                    'tanggal_lahir'=>Array('width'=>70,'justification'=>'center'),
                                    'status'=>Array('width'=>80,'justification'=>'center'),
                                    'pendidikan'=>Array('width'=>80,'justification'=>'center'),
                                    'no_ktp'=>Array('width'=>100,'justification'=>'center')
                                )
                );

   $options['showLines'] =0;
   $options['showHeadings'] =0;
   $data1 = Array();
   $data1[] = Array(
      "nama"=>"" ,
       "no_ktp"=>"Hormat Kami Pemohon"
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
       "no_ktp"=>"<b><u>".$rs->fields['nama']."</u></b>"
   );

   $pdf->ezSetDy(-20);
   $pdf->ezTable($data1,$cols,'',$options);
$pdf->ezSetDy(-12);
$pdf->ezText('Mengetahui,',12,Array('justification'=>'center'));
$pdf->ezSetDy(-12);
   $data1 = Array();
   $data1[] = Array(
      "nama"=>"Reg.Nomor: 330/".$rs->fields['no_surat'].'/421.621.010/'.getYear($rs->fields['tgl_ttd']) ,
       "no_ktp"=>"Reg.Nomor : ".$rs->fields['rw']."/RT/".$rs->fields['rt']."/".getYear($rs->fields['tgl_ttd'])
   );
   $data1[] = Array(
      "nama"=>"a/n.  Kepala Desa Bakalan" ,
       "no_ktp"=>"Ketua RT. ".addNull($rs->fields['rt'])." RW. ".addNull($rs->fields['rw'])
   );
   $data1[] = Array(
      "nama"=>"Sekretaris Desa" ,
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
      "nama"=>"<b><u>SUPRAPTO,B.Sc.</u></b>" ,
       "no_ktp"=>"<b><u>".$_GET['rw']."</u></b>"
   );
   $data1[] = Array(
      "nama"=>"Pengatur Muda" ,
       "no_ktp"=>""
   );
   $data1[] = Array(
      "nama"=>"NIP. 196107072007011011" ,
       "no_ktp"=>""
   );

$pdf->ezTable($data1,$cols,'',$options);
$pdf->ezNewPage();
setHeading($pdf);
$pdf->ezNewPage();
setHeading($pdf);
$pdf->ezNewPage();
setHeading($pdf);
$pdf->ezStream();
?>
