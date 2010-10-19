<?php
class pagu extends msDB {
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
			$thang = $REQUEST['thang'];
			$kdgiat = $REQUEST['kdgiat'];
			$kdsgiat = $REQUEST['kdsgiat'];
			$kdmak = $REQUEST['kdmak'];
			$noitem = $REQUEST['noitem'];
			$nmitem = $REQUEST['nmitem'];
			$jumlah = $REQUEST['jumlah'];
			$jumlah = explode(".", $jumlah);
			$jumlah = implode("",$jumlah);
            if ($id ==""){
                $sql = "insert into pagu (thang,kdgiat,kdsgiat,kdmak,noitem,nmitem,jumlah) values(?,?,?,?,?,?,?)";
                $args = Array(
                    $thang,
                    $kdgiat,
                    $kdsgiat,
                    $kdmak,
                    $noitem,
					$nmitem,
					$jumlah
                ); 
            }else {
                $sql = "update pagu set thang=?,kdgiat=?,kdsgiat=?,kdmak=?,noitem=?,nmitem=?,jumlah=? where id=?";
                $args = Array(
                    $thang,
                    $kdgiat,
                    $kdsgiat,
                    $kdmak,
                    $noitem,
					$nmitem,
					$jumlah,
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
            $sql = "delete from pagu where id in ($id)";
            $this->setSQL($sql);
            $this->executeSQL();
            $result = new stdClass();
            $result->success = ($this->db->ErrorMsg()=="")?true:false;
            $result->msg = $this->db->ErrorMsg();
            return json_encode($result);

        }
        function doRead($REQUEST){
            $grid = new grid(true);
            $grid->setTable("pagu"); //set tablenya
            //$grid->setJoin("LEFT JOIN trans ON pagu.id = trans.idpagu");
            //$grid->setGroupBy("trans.idpagu");
            $grid->addField(
                    array(
                        "field"=>"pagu.id",  //field didalam table
                        "name"=>"id",   //mapping nama yang akan digunakan di json storenya
                        "primary"=>true //menandakan bahwa ini adalah primary key
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"pagu.thang",  //field didalam table
                        "name"=>"thang",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"pagu.kdgiat",  //field didalam table
                        "name"=>"kdgiat",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"pagu.kdsgiat",  //field didalam table
                        "name"=>"kdsgiat",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"pagu.kdmak",  //field didalam table
                        "name"=>"kdmak",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"pagu.noitem",  //field didalam table
                        "name"=>"noitem",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"pagu.nmitem",  //field didalam table
                        "name"=>"nmitem",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"pagu.jumlah",  //field didalam table
                        "name"=>"jumlah",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
             $grid->addField(
                        array(
                            "field"=>"(select sum(jumlah) as jumlah_trans from trans where trans.idpagu=pagu.id)",
                            "name"=>"jumlah_trans"
                        )
                     );

            return $grid->doRead($REQUEST);
        }
		
	function createReport($params){
            $before_date = $params['before_date'];
            $after_date = $params['after_date'];

            $before_date = explode("/",$before_date);
            $before_date = array_reverse($before_date);
            $before_date = implode("-", $before_date);

            $after_date = explode("/",$after_date);
            $after_date = array_reverse($after_date);
            $after_date = implode("-", $after_date);
            $sqlStr = "select * from trans where tanggal between ? and ?";
            $args = Array($before_date,$after_date);
            $rs = $this->execSQL($sqlStr, $args);
            //echo $this->db->ErrorMsg(); 
            return $rs;
        }
}
?>
