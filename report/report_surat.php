<?php
include_once("cores/class.surat.php");

$surat = new surat(true);
$rs = $surat->getSurat($_GET,1);
if ($rs){
    $report_mode ="";
    switch ($rs->fields['jenis_surat']){
        case 'GAKIN':
            $report_mode = "report_surat_gakin.php"; 
        break;
        case 'KTP':
            $report_mode = "report_surat_ktp.php";
        break;
        case 'SKCK':
            $report_mode = "report_surat_skck.php";
        break;
        case 'BEASISWA':
            $report_mode = "report_surat_beasiswa.php";
        break;
        case 'SK':
            $report_mode = "report_surat_keterangan.php";
        break;
    }
    $report_mode = 'report/'.$report_mode;
    if (file_exists($report_mode))
        include_once($report_mode);
}

?>
