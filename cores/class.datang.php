<?php

class datang extends msDB {
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
		$grid->setManualFilter("AND status =1 and h_keluarga ='Kepala Keluarga'");
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
		
		if (!$REQUEST['sort'])
			$REQUEST['sort'] ='nama';
		return $grid->doRead($REQUEST); 	
	}
	
	function addNew($dataGrid,$dataForm,$sc="1") {
		$grid = new grid(true); 
		$grid->setTable("tpenduduk"); 

		$grid->addField(
				array(
					"field"=>"id_penduduk",
					"name"=>"id_penduduk",
					"primary"=>true
				));		
		$grid->addField(
				array(
					"field"=>"nama", 
					"name"=>"nama"
				)
		); 
		$grid->addField(
				array(
					"field"=>"kelamin", 
					"name"=>"kelamin"
				)
		); 		
		$grid->addField(
				array(
					"field"=>"tempat_lahir", 
					"name"=>"tempat_lahir"
				)
		); 		
		$grid->addField(
				array(
					"field"=>"tanggal_lahir", 
					"name"=>"tanggal_lahir"
				)
		); 		
		$grid->addField(
				array(
					"field"=>"status_kawin", 
					"name"=>"status_kawin"
				)
		); 		
		$grid->addField(
				array(
					"field"=>"agama", 
					"name"=>"agama"
				)
		); 		
		$grid->addField(
				array(
					"field"=>"pendidikan", 
					"name"=>"pendidikan"
				)
		); 		
		$grid->addField(
				array(
					"field"=>"pekerjaan", 
					"name"=>"pekerjaan"
				)
		); 		
		$grid->addField(
				array(
					"field"=>"baca_tulis", 
					"name"=>"baca_tulis"
				)
		); 		
		$grid->addField(
				array(
					"field"=>"h_keluarga", 
					"name"=>"h_keluarga"
				)
		); 		
		$grid->addField(
				array(
					"field"=>"anggota_dari", 
					"name"=>"anggota_dari"
				)
		); 	
		$grid->addField(
				array(
					"field"=>"rt", 
					"name"=>"rt"
				)
		); 	
		$grid->addField(
				array(
					"field"=>"rw", 
					"name"=>"rw"
				)
		); 	
		$grid->addField(
				array(
					"field"=>"dusun", 
					"name"=>"dusun"
				)
		); 		
		$grid->addField(
				array(
					"field"=>"no_ktp", 
					"name"=>"no_ktp"
				)
		); 		
		$grid->addField(
				array(
					"field"=>"no_kk", 
					"name"=>"no_kk"
				)
		);

		$jsonGrid = json_decode(stripslashes($dataGrid)); 
		$hubungan = ""; 
		$isNol =($sc=='1')?1:0; 
		$id_penduduk = Array();  
		foreach ($jsonGrid as $row) {
			$row->baca_tulis = ($row->baca_tulis)?"Bisa":"Tidak Bisa"; 
			if ($isNol) {
				$result = $grid->doCreate(json_encode($row));
				$new_result = json_decode($result); 
				$hubungan = $new_result->data->id_penduduk; 
				$isNol = 0; 				
			} else {
				if ($sc=='1')
					$row->anggota_dari = $hubungan; 
				$result = $grid->doCreate(json_encode($row));
				$new_result = json_decode($result); 
			}
				$id_penduduk[] = $new_result->data->id_penduduk; 			
		}
		
		if ($id_penduduk) 
			$result = $this->saveForm($id_penduduk,$dataForm); 
			
		return $result; 

	}
	
	function saveForm($id_penduduk,$dataForm) {
		$group_datang = date("YmdHis"); 
		$grid = new grid(true); 
		$grid->setTable("tdatang"); 
		$grid->addField(
				array(
					"field"=>"id_datang",
					"name"=>"id_datang",
					"primary"=>true
				));				
		$grid->addField(
				array(
					"field"=>"id_penduduk",
					"name"=>"id_penduduk"
				));				
		$grid->addField(
				array(
					"field"=>"tgl_datang",
					"name"=>"tgl_datang"
				));				
		$grid->addField(
				array(
					"field"=>"alamat",
					"name"=>"alamat"
				));			
		$grid->addField(
				array(
					"field"=>"kelurahan",
					"name"=>"kelurahan"
				));			
		$grid->addField(
				array(
					"field"=>"kecamatan",
					"name"=>"kecamatan"
				));		
		$grid->addField(
				array(
					"field"=>"kabupaten",
					"name"=>"kabupaten"
				));		
		$grid->addField(
				array(
					"field"=>"propinsi",
					"name"=>"propinsi"
				));	
		$grid->addField(
				array(
					"field"=>"alasan_datang",
					"name"=>"alasan_datang"
				));	
		$grid->addField(
				array(
					"field"=>"group_datang",
					"name"=>"group_datang"
				));						
		$jsonForm = json_decode(stripslashes($dataForm)); 
		foreach ($id_penduduk as $id) {
				$jsonForm->id_penduduk = $id; 
				$jsonForm->group_datang= $group_datang; 
				$y =$grid->doCreate(json_encode($jsonForm)); 
		}
		$result['success'] = true; 
		return json_encode($result); 
		
	}

	function getDatadatang($REQUEST,$report=0) {
		$grid = new grid(true); 
		$grid->setTable("tpenduduk a"); 
		$grid->setJoin("inner join tdatang b ON a.id_penduduk = b.id_penduduk"); 
		$grid->setGroupBy("b.group_datang,b.id_datang");
		//$grid->setManualFilter(" AND a.status =1");
		$grid->addField(
				array(
					"field"=>"b.id_datang",
					"name"=>"id_datang"
				));
		$grid->addField(
				array(
					"field"=>"b.id_penduduk",
					"name"=>"id_penduduk"
				));
		$grid->addField(
				array(
					"field"=>"b.group_datang",
					"name"=>"group_datang"
				));
		$grid->addField(
				array(
					"field"=>"b.tgl_datang",
					"name"=>"tgl_datang"
				));
		$grid->addField(
				array(
					"field"=>"b.alasan_datang",
					"name"=>"alasan_datang"
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
                                        "name"=> "picture"
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
	
	function getAlasan($group_datang) {
		$strSql = "select * from tdatang where group_datang=?"; 
		$args = Array($group_datang); 
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
								"name"=>"Alasan datang",
								"field"=>"alasan_datang",
								"value"=>$rs->fields[8]
							)			
						); 
			$result['data'] = $dt; 
			return json_encode($result); 
		}
	}

	function editData($dataList,$group_datang) {
		$msg =""; 
		$data = json_decode(stripslashes($dataList)); 
		$keyValue = Array(); 
		foreach($data as $row) {
			$keyValue[] = $row->field . "='" . $row->value ."'"; 
		} 
		$strSql = "update tdatang set ". implode($keyValue,",") . " where group_datang ='". $group_datang ."'"; 
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

	function removeList($dataList) {
		$msg =""; 
		$row = json_decode(stripslashes($dataList)); 
		foreach ($row as $field){
			$strSql="delete from tdatang where id_datang='$field->id_datang';"; 
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
	
}
?>