<?php
class penduduk extends msDB {

	function __construct($connection) {
		$this->messsage = "initialize class";
		if ($connection ==true) {
			$radiochecked = $this->connect();
		}
	}
	
	function __destruct() {
		unset($radiochecked);
	}
	
	function addNew(
					$nama,
					$kelamin,
					$tempat_lahir,
					$tgl_lahir,
					$status_kawin,
					$agama,
					$pendidikan,
					$pekerjaan,
					$baca_tulis,
					$hub_keluarga,
					$rt,
					$rw,
					$dusun,
					$no_ktp,
					$no_kk,
					$detail
					) {
					
					$isok = true;
					$msg = "";
					$strSql ="
								INSERT INTO tpenduduk (NAMA,KELAMIN,TEMPAT_LAHIR,TANGGAL_LAHIR,STATUS_KAWIN,AGAMA,PENDIDIKAN,PEKERJAAN,
								BACA_TULIS,H_KELUARGA,RT,RW,DUSUN,NO_KTP,NO_KK) VALUES(?,?,?,STR_TO_DATE(?,'%d/%m/%Y'),?,?,?,?,?,?,?,?,?,?,?);
							";
					$args = Array(
									$nama,
									$kelamin,
									$tempat_lahir,
									$tgl_lahir,
									$status_kawin,
									$agama,
									$pendidikan,
									$pekerjaan,
									$baca_tulis,
									$hub_keluarga,
									$rt,
									$rw,
									$dusun,
									$no_ktp,
									$no_kk
							);
					
					$this->execSQL($strSql, $args);
					
					if ($this->db->ErrorMsg() !=""){
						$msg = $this->db->ErrorMsg();
						$isok =false;
					}
					if($isok) 
						if ($detail !='[]'){
							$query = "SELECT ID_PENDUDUK as id_penduduk FROM tpenduduk ORDER BY ID_PENDUDUK DESC LIMIT 0,1";
							$this->setSQL($query); 
							$rs = $this->executeSQL(); 
							$idp =  $rs->fields['id_penduduk']; 
							if ($idp) {
								$data = json_decode(stripslashes($detail)); 
								$countInsert =0;
								$countError =0;
								$ErrDetail = Array();
								foreach ($data as $row) {
									$fail =0;
									if (trim($row->nama) =="")
										$fail++;
									if (trim($row->jkel) =="")
										$fail++;
									if (trim($row->st_kawin) =="")
										$fail++;
									if (trim($row->tgl_lahir) =="")
										$fail++;
									if (trim($row->agama) =="")
										$fail++;
									if (trim($row->rt) =="")
										$fail++;
									 if (trim($row->rw) =="")
										 $fail++;
									 if (trim($row->dusun) =="")
										 $fail++;
									$strSql ="
									INSERT INTO tpenduduk (NAMA,KELAMIN,TEMPAT_LAHIR,TANGGAL_LAHIR,STATUS_KAWIN,AGAMA,PENDIDIKAN,PEKERJAAN,
									BACA_TULIS,H_KELUARGA,RT,RW,DUSUN,NO_KTP,NO_KK,ANGGOTA_DARI) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
									";
									$args = Array(
													$row->nama,
													$row->jkel,
													$row->tmp_lahir,
													$row->tgl_lahir,
													$row->st_kawin,
													$row->agama,
													$row->pendidikan,
													$row->pekerjaan,
													($row->baca_tulis)?"Bisa":"Tidak Bisa",
													$row->hub,
													$row->rt,
													$row->rw,
													$row->dusun,
													$row->no_ktp,
													$no_kk,
													$idp
													);
									if (!$fail)									
										$this->execSQL($strSql, $args);
									else {
										$countError++;
										$ErrDetail[] = 'Data Inputan Anggota tidak lengkap';										
									}
									if (!$fail)
										if ($this->db->ErrorMsg()=="") {
											$countInsert++;
										} else {
											$countError++;
											$ErrDetail[] = $this->db->ErrorMsg();
										}
								}
							}
							
						}
					
					if ($isok) {
						$result['success'] = true;
						$result['insert'] = $countInsert;
						$result['error']['count'] = $countError;
						$result['error']['msg'] = $ErrDetail;
					} else {
						$result['success'] = false;
						$result['msg'] = $msg;
					}
					
					return json_encode($result);
	}
	function getData($REQUEST,$report=0) {
		$grid = new grid(true); 
		$grid->setTable("tpenduduk"); 
		//$grid->setJoin("LEFT JOIN m_department d ON e.dept_id = d.dept_id"); 
		$grid->setManualFilter(" AND h_keluarga ='Kepala Keluarga' AND status =1");
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

		if ($report) 
			return $grid->doSql($REQUEST); 
		else 
			return $grid->doRead($REQUEST); 	

	}

	function getDataAll($REQUEST,$report =0) {
		$grid = new grid(true); 
		$grid->setTable("tpenduduk a"); 
		$grid->setJoin("left join tpenduduk b ON a.anggota_dari = b.id_penduduk"); 
		//$grid->setGroupBy("a.id_penduduk,a.anggota_dari");
                $REQUEST['sort']= 'anggota_dari';
		$grid->setManualFilter(" AND a.status =1");
		$grid->addField(
				array(
					"field"=>"a.id_penduduk",
					"name"=>"id_penduduk"
				));
		$grid->addField(
				array(
					"field"=>"IF (a.anggota_dari = 0,a.id_penduduk,a.anggota_dari)",
					"name"=>"anggota_dari"
				));
		$grid->addField(
				array(
					"field"=>"a.h_keluarga",
					"name"=>"hub"
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

                if ($report)
			return $grid->doSql($REQUEST); 
		else 
			return $grid->doRead($REQUEST); 	
	}

	function getDetail($REQUEST,$id_penduduk) {
		$grid = new grid(true); 
		$grid->setTable("tpenduduk"); 
		//$grid->setJoin("LEFT JOIN m_department d ON e.dept_id = d.dept_id"); 
		$grid->setManualFilter(" AND status =1 AND anggota_dari ='$id_penduduk'");
		$grid->addField(
				array(
					"field"=>"id_penduduk",
					"name"=>"id_penduduk"
				));
		$grid->addField(
				array(
					"field"=>"h_keluarga",
					"name"=>"hub"
				));
		$grid->addField(
				array(
					"field"=>"no_ktp",
					"name"=>"no_ktp"
				));						
		$grid->addField(
				array(
					"field"=>"nama",
					"name"=>"nama"
				));
		$grid->addField(
				array(
					"field"=>"kelamin",
					"name"=>"jkel"
				));
		$grid->addField(
				array(
					"field"=>"tempat_lahir",
					"name"=>"tmp_lahir"
				));
		$grid->addField(
				array(
					"field"=>"tanggal_lahir",
					"name"=>"tgl_lahir"
				));				
		$grid->addField(
				array(
					"field"=>"status_kawin",
					"name"=>"st_kawin"
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
					"field"=>"IF (baca_tulis = 'Bisa','true','false')",
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
		return $grid->doRead($_REQUEST); 	
	}

	function editParent($REQUEST) {
		$isok = true; 
		$query = "
				UPDATE tpenduduk
				SET NAMA =?,
				KELAMIN =?,
				TEMPAT_LAHIR =?,
				TANGGAL_LAHIR = str_to_date(?,'%d/%m/%Y'),
				STATUS_KAWIN =?,
				AGAMA =?,
				PENDIDIKAN =?,
				PEKERJAAN =?,
				BACA_TULIS =?,
				RT =?,
				RW =?,
				DUSUN =?,
				NO_KTP =?,
				NO_KK =? 
				WHERE ID_PENDUDUK =? ; 
			"; 
		$args = Array(
				$REQUEST['nama'], 
				$REQUEST['kelamin'],
				$REQUEST['tempat_lahir'], 
				$REQUEST['tanggal_lahir'],
				$REQUEST['status_kawin'],  
				$REQUEST['agama'],
				$REQUEST['pendidikan'], 
				$REQUEST['pekerjaan'], 
				$REQUEST['baca_tulis'],
				$REQUEST['rt'],  
				$REQUEST['rw'], 
				$REQUEST['dusun'], 
				$REQUEST['no_ktp'], 
				$REQUEST['no_kk'], 
				$REQUEST['id_penduduk']
			);

		$this->execSQL($query, $args);
		
		if ($this->db->ErrorMsg() !=""){
			$msg = $this->db->ErrorMsg();
			$isok =false;
		}

		$query = "UPDATE tpenduduk set no_kk =? where anggota_dari =?"; 
		$args = Array($REQUEST['no_kk'],$REQUEST['id_penduduk']); 

		$this->execSQL($query, $args);
		if ($this->db->ErrorMsg() !=""){
			$msg = $this->db->ErrorMsg();
		}

		if ($isok) {
			$result['success'] = true; 
		} else {
			$result['success'] = false; 
			$result['msg'] = $msg; 
		}
		
		return json_encode($result); 
		
	}

	function editChild($dataList,$parentId,$no_kk,$removeList) {
		$isok =true;
		$jsonList = json_decode(stripslashes($dataList)); 
		$countInsert =0;
		$countError =0;
		$ErrDetail = Array();
		foreach ($jsonList as $row) {
			$fail =0;
			if (trim($row->nama) =="")
				$fail++;
			if (trim($row->jkel) =="")
				$fail++;
			if (trim($row->st_kawin) =="")
				$fail++;
			if (trim($row->tgl_lahir) =="")
				$fail++;
			if (trim($row->agama) =="")
				$fail++;
			if (trim($row->rt) =="")
				$fail++;
			if (trim($row->rw) =="")
				$fail++;
			if (trim($row->dusun) =="")
				$fail++;
			if ($row->id_penduduk) {
				$strSql ="
					UPDATE tpenduduk
					SET NAMA =?,
					KELAMIN =?,
					TEMPAT_LAHIR =?,
					TANGGAL_LAHIR = ?,
					STATUS_KAWIN =?,
					AGAMA =?,
					PENDIDIKAN =?,
					PEKERJAAN =?,
					BACA_TULIS =?,
					H_KELUARGA=?,
					RT =?,
					RW =?,
					DUSUN =?,
					NO_KTP =?
					WHERE ID_PENDUDUK =? ; 
				"; 
				$args = Array(
					$row->nama,
					$row->jkel,
					$row->tmp_lahir,
					$row->tgl_lahir,
					$row->st_kawin,
					$row->agama,
					$row->pendidikan,
					$row->pekerjaan,
					($row->baca_tulis)?"Bisa":"Tidak Bisa",
					$row->hub,
					$row->rt,
					$row->rw,
					$row->dusun,
					$row->no_ktp,
					$row->id_penduduk
				);

			} else {
				$strSql ="
				INSERT INTO tpenduduk (NAMA,KELAMIN,TEMPAT_LAHIR,TANGGAL_LAHIR,STATUS_KAWIN,AGAMA,PENDIDIKAN,PEKERJAAN,
				BACA_TULIS,H_KELUARGA,RT,RW,DUSUN,NO_KTP,NO_KK,ANGGOTA_DARI) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
				";
				$args = Array(
					$row->nama,
					$row->jkel,
					$row->tmp_lahir,
					$row->tgl_lahir,
					$row->st_kawin,
					$row->agama,
					$row->pendidikan,
					$row->pekerjaan,
					($row->baca_tulis)?"Bisa":"Tidak Bisa",
					$row->hub,
					$row->rt,
					$row->rw,
					$row->dusun,
					$row->no_ktp,
					$no_kk,
					$parentId
				);
			}
			if (!$fail)									
				$this->execSQL($strSql, $args);
			else {
				$countError++;
				$ErrDetail[] = 'Data Inputan Anggota tidak lengkap';										
			}
			if (!$fail)
				if ($this->db->ErrorMsg()=="") {
					$countInsert++;
				} else {
					$countError++;
					$ErrDetail[] = $this->db->ErrorMsg();
				}
		}

		$json_remove = json_decode(stripslashes($removeList)); 
		foreach ($json_remove as $row) {
			$strSql = "delete from tpenduduk where id_penduduk=? ;"; 
			$args = Array($row->id_penduduk); 
			$this->execSQL($strSql, $args);
		}

		if ($isok) {
			$result['success'] = true;
			$result['insert'] = $countInsert;
			$result['error']['count'] = $countError;
			$result['error']['msg'] = $ErrDetail;
		} else {
			$result['success'] = false;
			$result['error']['msg'] = $ErrDetail;
		}
		return json_encode($result);

	}

	function saveEdit($REQUEST) {
		$isok = true; 
		$hub ="";
		if ($REQUEST['hHub'])
			$hub = ",H_KELUARGA =? ";
		$query = "
				UPDATE tpenduduk
				SET NAMA =?,
				KELAMIN =?,
				TEMPAT_LAHIR =?,
				TANGGAL_LAHIR = str_to_date(?,'%d/%m/%Y'),
				STATUS_KAWIN =?,
				AGAMA =?,
				PENDIDIKAN =?,
				PEKERJAAN =?,
				BACA_TULIS =?,
				RT =?,
				RW =?,
				DUSUN =?,
				NO_KTP =?
				$hub
				WHERE ID_PENDUDUK =? ; 
			"; 
		$args = Array(
				$REQUEST['nama'], 
				$REQUEST['hgender'],
				$REQUEST['place_of_birth'], 
				$REQUEST['date_of_birth'],
				$REQUEST['hmarital'],  
				$REQUEST['hregion'],
				$REQUEST['hPnd'], 
				$REQUEST['pekerjaan'], 
				$REQUEST['hBaca'],
				$REQUEST['rt'],  
				$REQUEST['rw'], 
				$REQUEST['hdusun'], 
				$REQUEST['no_ktp']
			);

		if ($REQUEST['hHub'])
			array_push($args,$REQUEST['hHub']); 

		array_push($args,$REQUEST['id_penduduk']); 

		$this->execSQL($query, $args);
		
		if ($this->db->ErrorMsg() !=""){
			$msg = $this->db->ErrorMsg();
			$isok =false;
		}

		$query = "UPDATE tpenduduk set no_kk =? where anggota_dari =?"; 
		$args = Array($REQUEST['no_kk'],$REQUEST['id_penduduk']); 

		$this->execSQL($query, $args);
		if ($this->db->ErrorMsg() !=""){
			$msg = $this->db->ErrorMsg();
		}

		if ($isok) {
			$result['success'] = true; 
		} else {
			$result['success'] = false; 
			$result['msg'] = $msg; 
		}
		
		return json_encode($result); 
		
	}

	function setKepala($id_penduduk,$anggota_dari) {
		$isok = true; 
		$msg =""; 
		$strSql = "update tpenduduk set h_keluarga ='Kepala Keluarga', anggota_dari=0 where id_penduduk=?"; 
		$args = Array($id_penduduk); 
		$this->execSQL($strSql, $args);
		if ($this->db->ErrorMsg() !=""){
			$msg = $this->db->ErrorMsg();
			$isok =false;
		}
		if ($isok) {
			if ($anggota_dari) {
				$strSql = "update tpenduduk set h_keluarga='',anggota_dari=? where id_penduduk=? and h_keluarga ='Kepala Keluarga'"; 
				$args = Array($id_penduduk,$anggota_dari); 
				$this->execSQL($strSql, $args);
				
				$strSql = "update tpenduduk set anggota_dari=? where anggota_dari=?";
				$args = Array($id_penduduk,$anggota_dari); 
				$this->execSQL($strSql, $args);
				if ($this->db->ErrorMsg() !=""){
					$msg = $this->db->ErrorMsg();
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
			$query =  "delete from tpenduduk where anggota_dari = '$row->id_penduduk';";
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

	function pindahKK($dataList){
		$count = 0; 
		$json_delete = json_decode(stripslashes($dataList)); 
		foreach ($json_delete as $row) {
			$sqlStr ="update tpenduduk set h_keluarga=?,no_kk=?,anggota_dari=? where id_penduduk =?"; 
			$args = Array(
						$row->hub,
						$row->no_kk,
						$row->anggota_dari,
						$row->id_penduduk
					);
			$this->execSQL($sqlStr,$args); 
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

	function removeList2($dataList) {
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
		}
		
		if (!$count) 
			$result['success'] = true; 
		else 
			$result['success'] = false; 
	
		return json_encode($result);
		
	}

	function getFormEdit($id_penduduk) {
		$msg['success'] = false;
		$query="
			SELECT * from tpenduduk where id_penduduk ='$id_penduduk';
			";
					
		$this->setSQL($query);
		$rs=$this->executeSQL();
		
		if ($rs) {
			while ($row = $rs->FetchNextObject()) {
				$tgl_lahir = explode("-",$row->TANGGAL_LAHIR);
				$msg['success'] = true;
				$msg['data'] = Array(
					"id_penduduk"=>$row->ID_PENDUDUK,
					"no_kk"=>$row->NO_KK,
					"no_ktp"=>$row->NO_KTP,
					"nama"=>$row->NAMA,
					"hgender"=>$row->KELAMIN,
					"place_of_birth"=>$row->TEMPAT_LAHIR,
					"date_of_birth"=>$tgl_lahir[2]."/".$tgl_lahir[1]."/".$tgl_lahir[0],
					"hmarital"=>$row->STATUS_KAWIN,
					"hregion"=>$row->AGAMA,
					"hPnd"=>$row->PENDIDIKAN,
					"pekerjaan"=>$row->PEKERJAAN,
					"hBaca"=>$row->BACA_TULIS,
					"rt"=>$row->RT,
					"rw"=>$row->RW,
					"hdusun"=>$row->DUSUN,
					"hHub"=>$row->H_KELUARGA
				);		
			}
		}
		
		return json_encode($msg);
	}
        
}
?>