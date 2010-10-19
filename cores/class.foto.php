<?php
require_once 'class/class.upload.php';

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
	
	function getData($REQUEST,$report=0) {
		$grid = new grid(true); 
		$grid->setTable("tpenduduk"); 
		//$grid->setJoin("LEFT JOIN m_department d ON e.dept_id = d.dept_id");
                $query = $REQUEST['query'];
                $col = $REQUEST['col'];
                $src ="";
                if (($query !="") && ($col))
                    $src = " AND ". $col . " LIKE '".$query."%'";
		$grid->setManualFilter(" AND status =1".$src);
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

        function uploadFoto($id_penduduk,$pic){
            $result = new stdClass();
            $result->success = true; 
            if ($pic){
                 $handle = new upload($pic);
                 $handle->allowed = array("image/gif","image/jpeg","image/pjpeg","image/png");
                 $img = "no_image.gif"; 
                 if ($handle->uploaded) {
                    $handle->image_resize         = true;
                    $handle->image_x              = 94;
                    $handle->image_y              = 124;
                    $handle->Process("upload_foto/");
                   if ($handle->processed) {
                        $img  = $handle->file_dst_name;
                        $handle->clean();
                   }
                 }
                 $sqlStr = "update tpenduduk set picture=? where id_penduduk =?";
                 $args = Array($img,$id_penduduk);
                 $this->execSQL($sqlStr, $args);
                 $result->img = $img; 
                 if ($this->db->ErrorMsg() !=""){
                         $result->success =false;
                         $result->msg = $this->db->ErrorMsg();
                 }

            }
            return json_encode($result);
        }

        function removepic($id_penduduk,$pic){
            $result = new stdClass();
            $result->success = false;
            $proses =1;
            if ($pic != "no_image.gif")
                $proses = unlink("upload_foto/".$pic);
            if ($proses){
                $result->success= true;
                $sqlstr = "update tpenduduk set picture=? where id_penduduk=?";
                $args = Array("no_image.gif",$id_penduduk);
                $this->execSQL($sqlstr, $args);
            }

            return json_encode($result);
        }
}
?>