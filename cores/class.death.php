<?php
class death extends msDB {
	function __construct($connection) {
		$this->messsage = "initialize class";
		if ($connection ==true) {
			$radiochecked = $this->connect();
		}
	}
	
	function __destruct() {
		unset($radiochecked);
	}
	function getData($REQUEST) {
		$grid = new grid(true); 
		$grid->setTable("tpenduduk"); 
		//$grid->setJoin("LEFT JOIN m_department d ON e.dept_id = d.dept_id"); 
		$grid->setManualFilter("AND status =1");
		$grid->addField(
				array(
					"field"=>"id_penduduk",
					"name"=>"id_penduduk"
				));
		$grid->addField(
				array(
					"field"=>"no_ktp",
					"name"=>"no_ktp"
				));		
		$grid->addField(
				array(
					"field"=>"no_kk",
					"name"=>"no_kk"
				));				
		$grid->addField(
				array(
					"field"=>"nama",
					"name"=>"nama"
				));
		$grid->addField(
				array(
					"field"=>"kelamin",
					"name"=>"kelamin"
				));
		$grid->addField(
				array(
					"field"=>"tempat_lahir",
					"name"=>"tempat_lahir"
				));
		$grid->addField(
				array(
					"field"=>"tanggal_lahir",
					"name"=>"tanggal_lahir"
				));
		$grid->addField(
				array(
					"field"=>"status_kawin",
					"name"=>"status_kawin"
				));
		$grid->addField(
				array(
					"field"=>"agama",
					"name"=>"agama"
				));
		$grid->addField(
				array(
					"field"=>"pendidikan",
					"name"=>"pendidikan"
				));
		$grid->addField(
				array(
					"field"=>"pekerjaan",
					"name"=>"pekerjaan"
				));				
		$grid->addField(
				array(
					"field"=>"baca_tulis",
					"name"=>"baca_tulis"
				));		
		$grid->addField(
				array(
					"field"=>"rt",
					"name"=>"rt"
				));	
		$grid->addField(
				array(
					"field"=>"rw",
					"name"=>"rw"
				));					
		$grid->addField(
				array(
					"field"=>"dusun",
					"name"=>"dusun"
				));	
		$grid->addField(
				array(
					"field"=>"picture",
					"name"=>"picture"
				));
		
		if (!$REQUEST['sort'])
			$REQUEST['sort'] ='nama';
		return $grid->doRead($REQUEST); 	
	}
	
	function getDeathAll($REQUEST,$report=0) {
		$grid = new grid(true); 
		$grid->setTable("tkematian a"); 
		$grid->setJoin("INNER JOIN tpenduduk b ON a.id_penduduk = b.id_penduduk"); 
		//$grid->setManualFilter("AND status =1");
		$grid->addField(
				array(
					"field"=>"b.id_penduduk",
					"name"=>"id_penduduk"
				));			
		$grid->addField(
				array(
					"field"=>"b.nama",
					"name"=>"nama"
				));
		$grid->addField(
				array(
					"field"=>"a.tanggal_kematian",
					"name"=>"tanggal_kematian"
				));		
		$grid->addField(
				array(
					"field"=>"DATE_FORMAT(a.jam_kematian,'%H:%i')",
					"name"=>"jam_kematian"
				));		
		$grid->addField(
				array(
					"field"=>"a.tempat_makam",
					"name"=>"tempat_makam"
				));		
		$grid->addField(
				array(
					"field"=>"a.keterangan",
					"name"=>"keterangan"
				));		
		$grid->addField(
				array(
					"field"=>"b.no_ktp",
					"name"=>"no_ktp"
				));					
		$grid->addField(
				array(
					"field"=>"b.kelamin",
					"name"=>"kelamin"
				));
		$grid->addField(
				array(
					"field"=>"b.tempat_lahir",
					"name"=>"tempat_lahir"
				));
		$grid->addField(
				array(
					"field"=>"b.tanggal_lahir",
					"name"=>"tanggal_lahir"
				));
		$grid->addField(
				array(
					"field"=>"b.status_kawin",
					"name"=>"status_kawin"
				));
		$grid->addField(
				array(
					"field"=>"b.agama",
					"name"=>"agama"
				));
		$grid->addField(
				array(
					"field"=>"b.pendidikan",
					"name"=>"pendidikan"
				));
		$grid->addField(
				array(
					"field"=>"b.pekerjaan",
					"name"=>"pekerjaan"
				));				
		$grid->addField(
				array(
					"field"=>"b.baca_tulis",
					"name"=>"baca_tulis"
				));		
		$grid->addField(
				array(
					"field"=>"b.rt",
					"name"=>"rt"
				));	
		$grid->addField(
				array(
					"field"=>"b.rw",
					"name"=>"rw"
				));					
		$grid->addField(
				array(
					"field"=>"b.dusun",
					"name"=>"dusun"
				));	
		$grid->addField(
				array(
					"field"=>"b.picture",
					"name"=>"picture"
				));
		
		if (!$REQUEST['sort'])
			$REQUEST['sort'] ='nama';
			
		if ($report)
			return $grid->doSql($REQUEST); 	
		else 
			return $grid->doRead($REQUEST); 	
	}

	function addNew(
					$id_penduduk,
					$tanggal_kematian,
					$jam_kematian,
					$tempat_makam,
					$keterangan
					){
					
					$isOk = false; 
					$strSql = "UPDATE TPENDUDUK SET STATUS =2 WHERE ID_PENDUDUK =?;"; 
					$args = Array($id_penduduk); 
					$this->execSQL($strSql, $args);
					if ($this->db->ErrorMsg()=="") {
						$isOk = true; 
						$strSql = "
									INSERT INTO TKEMATIAN (ID_PENDUDUK,TANGGAL_KEMATIAN,JAM_KEMATIAN,TEMPAT_MAKAM,KETERANGAN)
									VALUES (?,STR_TO_DATE(?,'%d/%m/%Y'),?,?,?);
									"; 
						$args = Array(
										$id_penduduk,
										$tanggal_kematian,
										$jam_kematian,
										$tempat_makam,
										$keterangan
									);
						$this->execSQL($strSql,$args); 
					} else
						$msg = $this->db->ErrorMsg(); 
					
					if ($isOk) {
						$result['success'] = true; 
					}else {
						$result['success'] = false;
						$result['msg'] = $msg; 
					}
					return json_encode($result);
	}
	
	function restoreDeath($dataList) {
		$json_delete = json_decode(stripslashes($dataList)); 
		foreach ($json_delete as $row) {
			$strSql = "delete from tkematian where id_penduduk =?;"; 
			$args = Array($row->id_penduduk); 
			$this->execSQL($strSql,$args); 
			$strSql = "update tpenduduk set status = 1 where id_penduduk=?;"; 
			$this->execSQL($strSql,$args); 
		}
		$result['success'] = true; 
		return json_encode($result);
	}
	
	function saveEdit(
						$id_penduduk,
						$tanggal_kematian,
						$jam_kematian,
						$tempat_makam,
						$keterangan
						){
		$strSql = "update tkematian set 
							tanggal_kematian = STR_TO_DATE(?,'%d/%m/%Y'),
							jam_kematian=?,
							tempat_makam=?,
							keterangan=?
							where id_penduduk=?;
					";
		$args = Array(
					$tanggal_kematian,
					$jam_kematian,
					$tempat_makam,
					$keterangan,
					$id_penduduk
				);
		$this->execSQL($strSql,$args); 
		if ($this->db->ErrorMsg()==""){
			$result['success'] = true; 
		}else{
			$result['success']=false; 
			$result['msg'] = $this->db->ErrorMsg(); 
		}
		return json_encode($result); 
	}
	
}
?>