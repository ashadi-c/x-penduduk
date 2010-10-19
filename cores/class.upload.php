<?php
class uploadcsv extends msDB {
	private $cols = Array(); 
	function __construct($connection) {
		$this->messsage = "initialize class";
		if ($connection ==true) {
			$radiochecked = $this->connect();
		}
	}
	function __destruct() {
		unset($radiochecked);
	}
	function uploadData($fileName){
		$handle = fopen("$fileName","r");
		$header =1;
		$cols ="";
		$error = Array();
		$index_kk =0;    
		$index_tgl =0; 
		while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
			if ($header){
				$cols = implode(",",$data);
				$this->cols = $data;
				$index_kk = $this->getNokk();
				$index_tgl = $this->getTanggalLahir();   
			}
			else {
				$tag = $this->getAskTag(count($data));
				$data[$index_tgl] = $this->formatTanggal($data[$index_tgl]);  
				$sqlStr = "insert into tpenduduk (". $cols . ")"; 
				$sqlStr .= " values (". $tag .")"; 
				$this->execSQL($sqlStr,$data);
				if ($this->db->ErrorMsg() !="")
					$error[]= $this->db->ErrorMsg(); 
				else 
					$this->updateAnggota($data[$index_kk]);
				  	 
			}
			$header = 0; 
			 
		}
		
		$result = new stdClass(); 
		$result->success = ($error)?false:true;
		if ($error)
			$result->err = $error;  
		return json_encode($result); 
	}

	function getNokk(){
		$index =0; 
		foreach ($this->cols as $col){
			if ($col =='no_kk')
				$result = $index; 
			$index++; 
		}
		return $result; 
	}

	function getTanggalLahir(){
		$index =0; 
		foreach ($this->cols as $col){
			if ($col =='tanggal_lahir')
				$result = $index; 
			$index++; 
		}
		return $result; 
	}
	
	function formatTanggal($tgl){
		$temp = explode("/",$tgl); 
		$temp1 = array_reverse($temp,1);
		return implode("-",$temp1); 
	}
	
	function updateAnggota($no_kk){
		$sqlStr = "select id_penduduk from tpenduduk where h_keluarga =? and no_kk =?"; 
		$args = Array('Kepala Keluarga', $no_kk); 
		$rs = $this->execSQL($sqlStr,$args);
		if ($rs){ 
			$sqlStr = "update tpenduduk set anggota_dari =? where no_kk =? and id_penduduk <> ? "; 
			$args = Array($rs->fields['id_penduduk'],$no_kk, $rs->fields['id_penduduk']); 
			$this->execSQL($sqlStr,$args);
		} 
				
	}
	
	function checkNoKK($data){
		$callback =""; 
		$data = json_decode(stripslashes($data));
		if ($data->hub =="Kepala Keluarga"){
			$option = ($data->id_penduduk)?" and id_penduduk <> '".$data->id_penduduk."'":""; 
			if ($option !="")
				$data->no_kk = $this->getNOK($option); 
			$sqlStr = "select id_penduduk from tpenduduk where h_keluarga =? and no_kk =?" . $option; 
			$Args = Array($data->hub,$data->no_kk); 
			$rs = $this->execSQL($sqlStr,$Args); 
			if ($rs->RecordCount()){
				$result = new stdClass(); 
				$result->success = false; 
				$result->message = new stdClass(); 
				$result->message->error = Array("No KK ini sudah mempunyai Kepala Keluarga"); 
				$callback = json_encode($result); 
			}
		}
		return $callback; 
	}
	
	function getNOK($where){
		$sql = "select no_kk from tpenduduk where 1=1".$where; 
		$this->setSQL($sql);
		$rs = $this->executeSQL();
		if ($rs->RecordCount())
			return $rs->fields['no_kk'];
	}
	
	function getDataAll($action,$REQUEST) {
		$grid = new grid(true); 
		$grid->setTable("tpenduduk"); 
		$grid->setManualFilter(" AND status =1");
		$grid->addField(
				array(
					"field"=>"id_penduduk",
					"name"=>"id_penduduk",
					"primary"=>true
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
					"field"=>"baca_tulis",
					"name"=>"baca_tulis"
				));		
				
		switch ($action){
			case 'doRead': 
				return $grid->doRead($REQUEST); 	
			break; 
			case 'doCreate': 
				$result = $this->checkNoKK($REQUEST['data']); 
				if ($result ==""){
					$result =  $grid->doCreate($REQUEST['data']);
					$temp = json_decode($result);
					$this->updateAnggota($temp->data->no_kk);
				}   
				return $result;  	
			break; 	
			case 'doUpdate': 
				$result = $this->checkNoKK($REQUEST['data']); 
				if ($result ==""){
					$result = $grid->doUpdate($REQUEST['data']);
					$temp = json_decode($result);
					$this->updateAnggota($temp->data->no_kk);
				}   
				return $result;
			break; 		
			case 'doDestroy': 
				return $grid->doDestroy($REQUEST['data']); 	
			break; 				
		}
	}
	
}
?>