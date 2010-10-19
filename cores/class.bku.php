<?php 
class bku extends msDB {
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
            $tanggal = $REQUEST['tanggal'];
            $tmp = explode("/", $tanggal);
            $tmp = array_reverse($tmp, 1);
            $tanggal = implode("-",$tmp);
			$nobukti = $REQUEST['nobukti']; 
            $uraian = $REQUEST['uraian'];
			$debet = $REQUEST['debet'];
			$debet = explode(".", $debet);
			$debet = implode("",$debet);
			$kredit = $REQUEST['kredit'];
			$kredit = explode(".", $kredit);
			$kredit = implode("",$kredit);
            if ($id ==""){
                $sql = "insert into bku (tanggal,nobukti,uraian,debet,kredit) values(?,?,?,?,?)";
                $args = Array(
                    $tanggal,
                    $nobukti,
                    $uraian,
                    $debet,
					$kredit
                ); 
            }else {
                $sql = "update bku set tanggal=?,nobukti=?,uraian=?,debet=?,kredit=? where id=?";
                $args = Array(
                    $tanggal,
                    $nobukti,
                    $uraian,
                    $debet,
					$kredit,
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
            $sql = "delete from bku where id in ($id)";
            $this->setSQL($sql);
            $this->executeSQL();
            $result = new stdClass();
            $result->success = ($this->db->ErrorMsg()=="")?true:false;
            $result->msg = $this->db->ErrorMsg();
            return json_encode($result);

        }
        function doRead($REQUEST){
            $grid = new grid(true);
            $grid->setTable("bku"); //set tablenya
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
                        "field"=>"tanggal",  //field didalam table
                        "name"=>"tanggal",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"nobukti",  //field didalam table
                        "name"=>"nobukti",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"uraian",  //field didalam table
                        "name"=>"uraian",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"debet",  //field didalam table
                        "name"=>"debet",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"kredit",  //field didalam table
                        "name"=>"kredit",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"(select SUBSTRING(tanggal,1,4))",  //field didalam table
                        "name"=>"tahun",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"(select SUBSTRING(tanggal,6,2))",  //field didalam table
                        "name"=>"bulan",   //mapping nama yang akan digunakan di json storenya
                        )
                    );


            return $grid->doRead($REQUEST);
        }

        function createReport($id){
            $sqlStr = "select * from bku where id =?";
            $args = Array($id);
            $rs = $this->execSQL($sqlStr, $args);
            echo $this->db->ErrorMsg(); 
            return $rs;
        }
}
?>
