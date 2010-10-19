<?php

class surat extends msDB {
	function __construct($connection) {
		$this->messsage = "initialize class";
		if ($connection ==true) {
			$radiochecked = $this->connect();
		}
	}

	function __destruct() {
		unset($radiochecked);
	}

        function getSurat($REQUEST,$report=0){
            $grid = new grid(true);
            $grid->setTable("tsurat");
            $grid->setJoin("INNER JOIN tpenduduk ON tsurat.id_penduduk = tpenduduk.id_penduduk");
            if ($report)
                $grid->setManualFilter(" AND tsurat.id_surat ='".$REQUEST['id_surat']."'");
            $grid->addField(
                    Array(
                        "field"=>'tsurat.id_surat',
                        "name"=>'id_surat',
                        "primary"=>true
                    ));
            $grid->addField(
                    Array(
                        "field"=>'tsurat.id_penduduk',
                        "name"=>'id_penduduk',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'tsurat.no_surat',
                        "name"=>'no_surat',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'UPPER(tpenduduk.nama)',
                        "name"=>'nama',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'LOWER(tpenduduk.kelamin)',
                        "name"=>'kelamin',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'tpenduduk.tanggal_lahir',
                        "name"=>'tanggal_lahir',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'tpenduduk.no_ktp',
                        "name"=>'no_ktp',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'tpenduduk.no_kk',
                        "name"=>'no_kk',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'LOWER(tpenduduk.tempat_lahir)',
                        "name"=>'tempat_lahir',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'LOWER(tpenduduk.agama)',
                        "name"=>'agama',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'LOWER(tpenduduk.pekerjaan)',
                        "name"=>'pekerjaan',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'tpenduduk.pendidikan',
                        "name"=>'pendidikan',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'LOWER(tpenduduk.status_kawin)',
                        "name"=>'status_kawin',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'tpenduduk.rt',
                        "name"=>'rt',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'tpenduduk.rw',
                        "name"=>'rw',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'LOWER(tpenduduk.dusun)',
                        "name"=>'dusun',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'tpenduduk.picture',
                        "name"=>'picture',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'tsurat.jenis_surat',
                        "name"=>'jenis_surat',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'tsurat.tgl_buat',
                        "name"=>'tgl_buat',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'tsurat.tgl_ttd',
                        "name"=>'tgl_ttd',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'tsurat.keterangan_1',
                        "name"=>'keterangan_1',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'tsurat.keterangan_2',
                        "name"=>'keterangan_2',
                    ));
            $grid->addField(
                    Array(
                        "field"=>'tsurat.tambahan',
                        "name"=>'tambahan',
                    ));
            $grid->addField(
                    array(
                            "field"=>"(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),tpenduduk.tanggal_lahir)), '%Y')+0)",
                            "name"=>"umur"
                    ));
            if ($report)
                    return $grid->doSql($REQUEST);
            else
                    return $grid->doRead($REQUEST);

        }

        function saveEdit($REQUEST){
            $id_surat = $REQUEST['id_surat'];
            $tgl_ttd = $REQUEST['tgl_ttd'];
            $tgl_tdd = explode('/', $tgl_ttd);
            $tgl_ttd = array_reverse($tgl_tdd,1);
            $tgl_ttd = implode('-', $tgl_ttd);
            $new_data =0;
            if ($id_surat ==""){
                $sql = "insert into tsurat (id_penduduk,jenis_surat,no_surat,tgl_buat,tgl_ttd,keterangan_1,keterangan_2,tambahan)";
                $sql .= " values(?,?,?,NOW(),?,?,?,?)";
                $args= Array(
                   $REQUEST['id_penduduk'],
                   $REQUEST['jenis_surat'],
                   $REQUEST['no_surat'],
                   $tgl_ttd,
                   $REQUEST['keterangan_1'],
                   $REQUEST['keterangan_2'],
                   $REQUEST['tambahan']
                );
                $new_data =1; 
                
            }else{
                $sql = "update tsurat set id_penduduk=?,jenis_surat=?,no_surat=?,tgl_ttd=?,keterangan_1=?,keterangan_2=?,tambahan=?";
                $sql .= " where id_surat=?";
                $args= Array(
                   $REQUEST['id_penduduk'],
                   $REQUEST['jenis_surat'],
                   $REQUEST['no_surat'],
                   $tgl_ttd,
                   $REQUEST['keterangan_1'],
                   $REQUEST['keterangan_2'],
                   $REQUEST['tambahan'],
                   $id_surat
                );
                
            }
            $this->execSQL($sql, $args);
            $result = new stdClass();
            $result->success = ($this->db->ErrorMsg()=="")?true:false;
            $result->msg = $this->db->ErrorMsg();
            if ($new_data){
                $result->lastId = $this->getLastId();
                $result->jenisSurat = $REQUEST['jenis_surat'];
            }
            return json_encode($result);

        }
        function getLastId(){
            $sqlStr = "select id_surat from tsurat order by id_surat desc limit 0,1";
            $this->setSQL($sqlStr);
            $rs = $this->executeSQL();
            return $rs->fields['id_surat'];
        }
        
        function remove($data){
            $id = json_decode(stripslashes($data));
            $id = implode(',', $id);
            $sqlStr = "delete from tsurat where id_surat in(".$id.")";
            $this->setSQL($sqlStr);
            $this->executeSQL();
            $result = new stdClass();
            $result->success = ($this->db->ErrorMsg()=="")?true:false;
            $result->msg = $this->db->ErrorMsg();
            return json_encode($result);            
        }
}
?>
