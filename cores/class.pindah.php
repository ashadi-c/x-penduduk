<?php

class pindah extends msDB {

	function __construct($connection) {
		$this->messsage = "initialize class";
		if ($connection ==true) {
			$radiochecked = $this->connect();
		}
	}
	
	function __destruct() {
		unset($radiochecked);
	}
	
	function getPenduduk($REQUEST) {
		$grid = new grid(true); 
		$grid->setTable("tpenduduk"); 
		//$grid->setJoin("LEFT JOIN m_department d ON e.dept_id = d.dept_id"); 
		$grid->setManualFilter(" AND status =1");
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
					"field"=>"(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),tanggal_lahir)), '%Y')+0)",
					"name"=>"umur"
				));
		$grid->addField(
				array(
					"field"=>"(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),tanggal_lahir)), '%m')+0)",
					"name"=>"umur_bln"
				));	
		$grid->addField(
				array(
					"field"=>"(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),tanggal_lahir)), '%d')+0)",
					"name"=>"umur_hari"
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

	function addNew(
					$tgl_pindah,
					$alamat,
					$kelurahan,
					$kecamatan,
					$kabupaten,
					$propinsi, 
					$alasan_pindah,
					$dataList
					) {
		$isok = false; 
		$msg =""; 
		$group_pindah = date("YmdHis"); 
		$data = json_decode(stripslashes($dataList)); 
		foreach ($data as $row) {
				$strSql = "INSERT INTO TPINDAH (ID_PENDUDUK,TGL_PINDAH,ALAMAT,KELURAHAN,KECAMATAN,KABUPATEN,PROPINSI,ALASAN_PINDAH,GROUP_PINDAH)";
				$strSql .=" VALUES(?,str_to_date(?,'%d/%m/%Y'),?,?,?,?,?,?,?);"; 
				$args = Array(
								$row->id_penduduk,
								$tgl_pindah,
								$alamat,
								$kelurahan,
								$kecamatan,
								$kabupaten,
								$propinsi,
								$alasan_pindah,
								$group_pindah
							); 
				$this->execSQL($strSql, $args);
				if ($this->db->ErrorMsg()=="") {
					$isok = true; 
					$strSql = "
								UPDATE TPENDUDUK SET STATUS = 3 WHERE ID_PENDUDUK=?;
								"; 
					$args = Array($row->id_penduduk);
					$this->execSQL($strSql,$args); 
				} else{
					$msg .= $this->db->ErrorMsg(); 
					$isok = false;
				}
		}
		if ($isok) {
			$result['success'] = true; 
			$result['id_group'] = $group_pindah;
		}else {
			$result['success'] = false;
			$result['msg'] = $msg; 
		}
		return json_encode($result);
	}
	function getDataPindah($REQUEST,$report=0) {
		$grid = new grid(true); 
		$grid->setTable("tpenduduk a"); 
		$grid->setJoin("inner join tpindah b ON a.id_penduduk = b.id_penduduk"); 
		$grid->setGroupBy("b.group_pindah,b.id_pindah");
		//$grid->setManualFilter(" AND a.status =1");
		$grid->addField(
				array(
					"field"=>"b.id_pindah",
					"name"=>"id_pindah"
				));
		$grid->addField(
				array(
					"field"=>"b.id_penduduk",
					"name"=>"id_penduduk"
				));
		$grid->addField(
				array(
					"field"=>"b.group_pindah",
					"name"=>"group_pindah"
				));
		$grid->addField(
				array(
					"field"=>"b.tgl_pindah",
					"name"=>"tgl_pindah"
				));
		$grid->addField(
				array(
					"field"=>"b.alasan_pindah",
					"name"=>"alasan_pindah"
				));

		$grid->addField(
				array(
					"field"=>"a.no_ktp",
					"name"=>"no_ktp"
				));		
		$grid->addField(
				array(
					"field"=>"a.no_kk",
					"name"=>"no_kk"
				));				
		$grid->addField(
				array(
					"field"=>"a.nama",
					"name"=>"nama"
				));
		$grid->addField(
				array(
					"field"=>"a.kelamin",
					"name"=>"kelamin"
				));
		$grid->addField(
				array(
					"field"=>"a.tempat_lahir",
					"name"=>"tempat_lahir"
				));
		$grid->addField(
				array(
					"field"=>"a.tanggal_lahir",
					"name"=>"tanggal_lahir"
				));
		$grid->addField(
				array(
					"field"=>"(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),a.tanggal_lahir)), '%Y')+0)",
					"name"=>"umur"
				));
		$grid->addField(
				array(
					"field"=>"(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),a.tanggal_lahir)), '%m')+0)",
					"name"=>"umur_bln"
				));	
		$grid->addField(
				array(
					"field"=>"(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),a.tanggal_lahir)), '%d')+0)",
					"name"=>"umur_hari"
				));				
		$grid->addField(
				array(
					"field"=>"a.status_kawin",
					"name"=>"status_kawin"
				));
		$grid->addField(
				array(
					"field"=>"a.agama",
					"name"=>"agama"
				));
		$grid->addField(
				array(
					"field"=>"a.pendidikan",
					"name"=>"pendidikan"
				));
		$grid->addField(
				array(
					"field"=>"a.pekerjaan",
					"name"=>"pekerjaan"
				));				
		$grid->addField(
				array(
					"field"=>"a.baca_tulis",
					"name"=>"baca_tulis"
				));		
		$grid->addField(
				array(
					"field"=>"a.rt",
					"name"=>"rt"
				));	
		$grid->addField(
				array(
					"field"=>"a.rw",
					"name"=>"rw"
				));					
		$grid->addField(
				array(
					"field"=>"a.dusun",
					"name"=>"dusun"
				));		
		$grid->addField(
				array(
					"field"=>"a.picture",
					"name"=>"picture"
				));
				
		$grid->addField(
				array(
					"field"=>"b.alamat",
					"name"=>"alamat"
				));	
		$grid->addField(
				array(
					"field"=>"b.kelurahan",
					"name"=>"kelurahan"
				));						
		$grid->addField(
				array(
					"field"=>"b.kecamatan",
					"name"=>"kecamatan"
				));		
		$grid->addField(
				array(
					"field"=>"b.kabupaten",
					"name"=>"kabupaten"
				));		
		$grid->addField(
				array(
					"field"=>"b.propinsi",
					"name"=>"propinsi"
				));		
																
		if ($report)
			return $grid->doSql($REQUEST); 
		else 
			return $grid->doRead($REQUEST); 	
	}
	function buatSuratPindah($id_group){
            $sqlStr = "select * from tpenduduk,tpindah where tpenduduk.id_penduduk=tpindah.id_penduduk";
            $sqlStr .= " and tpindah.group_pindah=? order by tpindah.id_pindah";
            return $this->execSQL($sqlStr, Array($id_group));
        }
	function removeList($dataList) {
		$msg =""; 
		$row = json_decode(stripslashes($dataList)); 
		foreach ($row as $field){
			$strSql="delete from tpindah where id_pindah='$field->id_pindah';"; 
			$this->setSql($strSql); 
			$this->executeSQL(); 
			$strSql="delete from tpenduduk where id_penduduk='$field->id_penduduk';"; 
			$this->setSql($strSql); 
			$this->executeSQL(); 
			if ($this->db->ErrorMsg() !="")
				$msg .= $this->db->ErrorMsg(); 
		}
		
		if ($msg !="") {
			$result['success'] = false; 
			$result['msg'] = $msg; 
		}else 
			$result['success'] = true;
				
		return json_encode($result); 
		
	}
	
	function editData($dataList,$group_pindah) {
		$msg =""; 
		$data = json_decode(stripslashes($dataList)); 
		$keyValue = Array(); 
		foreach($data as $row) {
			$keyValue[] = $row->field . "='" . $row->value ."'"; 
		} 
		$strSql = "update tpindah set ". implode($keyValue,",") . " where group_pindah ='". $group_pindah ."'"; 
		$this->setSql($strSql); 
		$this->executeSQL(); 
		if ($this->db->ErrorMsg() !="") 
			$msg .= $this->db->ErrorMsg(); 
			
		if ($msg !="") {
			$result['success'] = false; 
			$result['msg'] = $msg; 
		}else 
			$result['success'] = true;
				
		return json_encode($result); 		
	}
	
	function getAlasan($group_pindah) {
		$strSql = "select * from tpindah where group_pindah=?"; 
		$args = Array($group_pindah); 
		$rs = $this->execSQL($strSql,$args); 
		if ($rs) {
			$result['total']=1; 
			$dt  = Array(
							Array(
								"name"=>"Alamat",
								"field"=>"alamat",
								"value"=>$rs->fields[3]
							),
							Array(
								"name"=>"Kelurahan",
								"field"=>"kelurahan",
								"value"=>$rs->fields[4]
							),
							Array(
								"name"=>"Kecamatan",
								"field"=>"kecamatan",
								"value"=>$rs->fields[5]
							),
							Array(
								"name"=>"Kabupaten/Kota",
								"field"=>"kabupaten",
								"value"=>$rs->fields[6]
							),
							Array(
								"name"=>"Propinsi",
								"field"=>"propinsi",
								"value"=>$rs->fields[7]
							),
							Array(
								"name"=>"Alasan Pindah",
								"field"=>"alasan_pindah",
								"value"=>$rs->fields[8]
							)			
						); 
			$result['data'] = $dt; 
			return json_encode($result); 
		}
	}

}
?>