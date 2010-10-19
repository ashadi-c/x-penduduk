<?php
	include_once("cores/class.foto.php");
        include_once("includes/php-pdf/class.ezpdf.php"); 
	$penduduk = new penduduk(true); 
	$rs = $penduduk->getData($_GET,1);
        $data = Array();
        while ($row=$rs->FetchNextObject()) {
            $data[] = Array(
                "picture" => str_replace(".gif", ".jpg", $row->PICTURE),
                "nama"=>$row->NAMA,
                "no_ktp"=>$row->NO_KTP,
                "kelamin"=>$row->KELAMIN,
                "tempat_lahir"=>$row->TEMPAT_LAHIR,
                "tanggal_lahir"=>formatDate($row->TANGGAL_LAHIR),
                "agama"=>$row->AGAMA,
                "rt"=>$row->RT,
                "rw"=>$row->RW,
                "dusun"=>$row->DUSUN
            );
        }
	$pdf = new Cezpdf('a4','potrait');
        $x=795;
        $y =1;
        foreach($data as $row){
            $y++;
            $pdf->ezImage('upload_foto/'.$row['picture'],5,94,'none','left');
            $pdf->addText(145, $x, 10, "Nama : ". $row['nama']);
            $pdf->addText(145, $x-12, 10, "Jenis Kelamin : ". $row['kelamin']);
            $pdf->addText(145, $x-24, 10, "Tempat, Tgl Lahir : ". $row['tempat_lahir']." ,".$row['tanggal_lahir']);
            $pdf->addText(145, $x-36, 10, "Agama : ". $row['agama']);
            $pdf->addText(145, $x-48, 10, "RT/RW : ". $row['rt']."/".$row['rw']);
            $pdf->addText(145, $x-60, 10, "Dusun : ". $row['dusun']);
            $x = $x -130;
            if ($y >6){
                $y =1;
                $x = 795;
            }
        }
	$pdf->ezStream();

?>