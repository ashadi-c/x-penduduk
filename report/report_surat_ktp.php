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

?>
