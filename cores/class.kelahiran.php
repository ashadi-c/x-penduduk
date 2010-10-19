<?php
class kelahiran extends msDB {
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
		$grid->setManualFilter("AND status =1 AND kelamin='PEREMPUAN'");
		$grid->addField(
				array(
					"field"=>"id_penduduk",
					"name"=>"id_penduduk"
				));
		$grid->addField(
				array(
					"field"=>"anggota_dari",
					"name"=>"anggota_dari"
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
	
	function getData2($REQUEST,$report=0) {
		$grid = new grid(true); 
		$grid->setTable("tkelahiran"); 
		$grid->setJoin("INNER JOIN tpenduduk  ON tkelahiran.id_penduduk = tpenduduk.id_penduduk");  
		//$grid->setManualFilter("AND status =1");
		$grid->addField(
				array(
					"field"=>"tkelahiran.id",
					"name"=>"id_kelahiran"
				));
		$grid->addField(
				array(
					"field"=>"tkelahiran.id_penduduk",
					"name"=>"id_penduduk"
				));

		$grid->addField(
				array(
					"field"=>"tpenduduk.nama",
					"name"=>"nama_bayi"
				));
		$grid->addField(
				array(
					"field"=>"tpenduduk.kelamin",
					"name"=>"kelamin_bayi"
				));		
		$grid->addField(
				array(
					"field"=>"tkelahiran.tanggal_lahir",
					"name"=>"tanggal_lahir_bayi"
				));				
		$grid->addField(
				array(
					"field"=>"tkelahiran.tempat_lahir",
					"name"=>"tempat_lahir_bayi"
				));
		$grid->addField(
				array(
					"field"=>"tkelahiran.berat_badan",
					"name"=>"berat_badan"
				));
		$grid->addField(
				array(
					"field"=>"tkelahiran.keterangan",
					"name"=>"keterangan"
				));
		$grid->addField(
				array(
					"field"=>"(select nama from tpenduduk where tpenduduk.id_penduduk = tkelahiran.id_ibu)",
					"name"=>"ibu_bayi"
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
			$REQUEST['sort'] ='nama_bayi';
		
		if ($report) 
			return $grid->doSql($REQUEST); 	
		else 
			return $grid->doRead($REQUEST); 	
	}

	function addNew(
					$nama_bayi,
					$kelamin_bayi,
					$tanggal_lahir_bayi,
					$tempat_lahir_bayi,
					$berat_badan, 
					$keterangan,
					$id_penduduk,
					$anggota_dari,
					$agama,
					$rt,
					$rw,
					$dusun,
					$no_kk
				) {

					$isok = true;
					$msg = "";
					$tmp_anggota = ($anggota_dari)?$anggota_dari:$id_penduduk; 
					$strSql ="
								INSERT INTO tpenduduk (NAMA,KELAMIN,TEMPAT_LAHIR,TANGGAL_LAHIR,STATUS_KAWIN,AGAMA,PENDIDIKAN,PEKERJAAN,
								BACA_TULIS,H_KELUARGA,RT,RW,DUSUN,NO_KTP,NO_KK,ANGGOTA_DARI) VALUES(?,?,?,STR_TO_DATE(?,'%d/%m/%Y'),?,?,?,?,?,?,?,?,?,?,?,?);
							";
					$args = Array(
									$nama_bayi,
									$kelamin_bayi,
									'Malang',
									$tanggal_lahir_bayi,
									'BELUM KAWIN',
									$agama,
									'-',
									'-',
									'Tidak Bisa',
									'Anak',
									$rt,
									$rw,
									$dusun,
									'-',
									$no_kk,
									$tmp_anggota
							);
					
					$this->execSQL($strSql, $args);
					if ($this->db->ErrorMsg() !=""){
						$msg = $this->db->ErrorMsg();
						$isok =false;
					}
					if ($isok) {
							$query = "SELECT ID_PENDUDUK as id_penduduk FROM tpenduduk ORDER BY ID_PENDUDUK DESC LIMIT 0,1";
							$this->setSQL($query); 
							$rs = $this->executeSQL(); 
							$idp =  $rs->fields['id_penduduk']; 
							if ($idp) {
								$strSql ="insert into tkelahiran(id_penduduk,tanggal_lahir,tempat_lahir,berat_badan,keterangan,id_ibu)
											values(?,STR_TO_DATE(?,'%d/%m/%Y'),?,?,?,?)"; 
								$args = Array(
												$idp,
												$tanggal_lahir_bayi,
												$tempat_lahir_bayi,
												$berat_badan,
												$keterangan,
												$id_penduduk
										);
								$this->execSQL($strSql, $args);
								if ($this->db->ErrorMsg() !=""){
									$msg .=" ". $this->db->ErrorMsg();
									$isok =false;
								}
								
							}
					}
					if ($isok) {
						$result['success'] = true;
					} else {
						$result['success'] = false;
						$result['msg'] = $msg;
					}
					
					return json_encode($result);
	}

	function removeList($dataList) {
		$count = 0; 
		$json_delete = json_decode(stripslashes($dataList)); 
		foreach ($json_delete as $row) {
			$query = "delete from tpenduduk where id_penduduk = '$row->id_penduduk';";
			$this->setSQL($query);
			$this->executeSQL();
			if ($this->db->ErrorMsg() !=""){
				$count++; 
				$result['msg'] = $this->db->ErrorMsg();
			}
			$query =  "delete from tkelahiran where id = '$row->id_kelahiran';";
			$this->setSQL($query);
			$this->executeSQL();
			if ($this->db->ErrorMsg() !=""){
				$count++; 
				$result['msg'] = $this->db->ErrorMsg();
			}
		}
		
		if (!$count) 
			$result['success'] = true; 
		else 
			$result['success'] = false; 
	
		return json_encode($result);
		
	}
	
		
}