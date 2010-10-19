<?php
class spanpbj extends msDB {
	function __construct($connection) {
		$this->messsage = "initialize class";
		if ($connection ==true) {
			$radiochecked = $this->connect();
		}
	}
	function __destruct() {
		unset($radiochecked);
	}

        function saveEdit($REQUEST){
            $id = $REQUEST['id'];
            $jenis = $REQUEST['jenis'];
            $tanggal = $REQUEST['tanggal'];
            $tmp = explode("/", $tanggal);
            $tmp = array_reverse($tmp, 1);
            $tanggal = implode("-",$tmp); 
            $perihal = $REQUEST['perihal'];
            $kode = $REQUEST['kode'];
            $tahun = substr($tanggal,0,4);
            if ($id ==""){
                $sql = "insert into spanpbj (jenis,tanggal,perihal,kode,tahun) values(?,?,?,?,?)";
                $args = Array(
                    $jenis,
                    $tanggal,
                    $perihal,
                    $kode,
                    $tahun
                ); 
            }else {
                $sql = "update spanpbj set jenis=?,tanggal=?,perihal=?,kode=?,tahun=? where id=?";
                $args = Array(
                    $jenis,
                    $tanggal,
                    $perihal,
                    $kode,
                    $tahun,
                    $id
                );

            }
            $this->execSQL($sql, $args);
            $result = new stdClass();
            $result->success = ($this->db->ErrorMsg()=="")?true:false;
            $result->msg = $this->db->ErrorMsg();
            return json_encode($result);
        }

        function remove($data){
            $data = json_decode(stripslashes($data));
            $id = array();
            foreach($data as $row)
                $id[]= $row->id; //looping jadi array
            $id = implode(",",$id);
            $sql = "delete from spanpbj where id in ($id)";
            $this->setSQL($sql);
            $this->executeSQL();
            $result = new stdClass();
            $result->success = ($this->db->ErrorMsg()=="")?true:false;
            $result->msg = $this->db->ErrorMsg();
            return json_encode($result);

        }
        function doRead($REQUEST){
            $grid = new grid(true);
            $grid->setTable("spanpbj"); //set tablenya
            //$grid->setGroupBy($REQUEST['groupBy']);
            $grid->addField(
                    array(
                        "field"=>"id",  //field didalam table
                        "name"=>"id",   //mapping nama yang akan digunakan di json storenya
                        "primary"=>true //menandakan bahwa ini adalah primary key
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"jenis",  //field didalam table
                        "name"=>"jenis",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"tanggal",  //field didalam table
                        "name"=>"tanggal",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"perihal",  //field didalam table
                        "name"=>"perihal",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"kode",  //field didalam table
                        "name"=>"kode",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"tahun",  //field didalam table
                        "name"=>"tahun",   //mapping nama yang akan digunakan di json storenya
                        )
                    );

            return $grid->doRead($REQUEST);
        }

        function createReport($id){
            $sqlStr = "select * from spanpbj where id =?";
            $args = Array($id);
            $rs = $this->execSQL($sqlStr, $args);
            echo $this->db->ErrorMsg(); 
            return $rs;
        }
}
?>
