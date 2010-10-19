<?php
class peny extends msDB {
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
            $nama = $REQUEST['nama'];
            $alamat = $REQUEST['alamat'];
            $kota = $REQUEST['kota'];
            $namattd = $REQUEST['namattd'];
            $jabttd = $REQUEST['jabttd']; 
            $tlp = $REQUEST['tlp'];
            $fax = $REQUEST['fax'];
            $email = $REQUEST['email'];
			$npwp = $REQUEST['npwp'];
			$tglpkp = $REQUEST['tglpkp'];///////////////////////////////////////////
            $tmp = explode("/", $tglpkp);
            $tmp = array_reverse($tmp, 1);
            $tglpkp = implode("-",$tmp);///////////////////////////////////////////
			$hotel = $REQUEST['hotel'];
			$ijin = $REQUEST['ijin'];
			$noijin = $REQUEST['noijin'];
			$pengijin = $REQUEST['pengijin'];
			$noakta = $REQUEST['noakta'];
			$tglakta = $REQUEST['tglakta'];///////////////////////////////////////////
            $tmp = explode("/", $tglakta);
            $tmp = array_reverse($tmp, 1);
            $tglakta = implode("-",$tmp);///////////////////////////////////////////
			$notakta = $REQUEST['notakta'];
			$noaktap = $REQUEST['noaktap'];
			$tglaktap = $REQUEST['tglaktap'];///////////////////////////////////////////
            $tmp = explode("/", $tglaktap);
            $tmp = array_reverse($tmp, 1);
            $tglaktap = implode("-",$tmp);///////////////////////////////////////////
			$notaktap = $REQUEST['notaktap'];
			$nmttd1 = $REQUEST['nmttd1'];
			$jabttd1 = $REQUEST['jabttd1'];
			$nmttd2 = $REQUEST['nmttd2'];
			$jabttd2 = $REQUEST['jabttd2'];
			$nmttd3 = $REQUEST['nmttd3'];
			$jabttd3 = $REQUEST['jabttd3'];
			$nmttd4 = $REQUEST['nmttd4'];
			$jabttd4 = $REQUEST['jabttd4'];
			$norek = $REQUEST['norek'];
			$bank = $REQUEST['bank'];
			$anrek = $REQUEST['anrek'];
            if ($id ==""){
                $sql = "insert into peny (nama,alamat,kota,namattd,jabttd,tlp,fax,email,npwp,tglpkp,hotel,ijin,noijin,pengijin,noakta,tglakta,notakta,noaktap,tglaktap,notaktap,nmttd1,jabttd1,nmttd2,jabttd2,nmttd3,jabttd3,nmttd4,jabttd4,norek,bank,anrek) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                $args = Array(
                    $nama,
            		$alamat,
            		$kota,
            		$namattd,
            		$jabttd, 
            		$tlp,
            		$fax,
            		$email,
					$npwp,
					$tglpkp,
					$hotel,
					$ijin,
					$noijin,
					$pengijin,
					$noakta,
					$tglakta,
					$notakta,
					$noaktap,
					$tglaktap,
					$notaktap,
					$nmttd1,
					$jabttd1,
					$nmttd2,
					$jabttd2,
					$nmttd3,
					$jabttd3,
					$nmttd4,
					$jabttd4,
					$norek,
					$bank,
					$anrek
                ); 
            }else {
                $sql = "update peny set nama=?,alamat=?,kota=?,namattd=?,jabttd=?,tlp=?,fax=?,email=?,npwp=?,tglpkp=?,hotel=?,ijin=?,noijin=?,pengijin=?,noakta=?,tglakta=?,notakta=?,noaktap=?,tglaktap=?,notaktap=?,nmttd1=?,jabttd1=?,nmttd2=?,jabttd2=?,nmttd3=?,jabttd3=?,nmttd4=?,jabttd4=?,norek=?,bank=?,anrek=? where id=?";
                $args = Array(
                    $nama,
            		$alamat,
            		$kota,
            		$namattd,
            		$jabttd, 
            		$tlp,
            		$fax,
            		$email,
					$npwp,
					$tglpkp,
					$hotel,
					$ijin,
					$noijin,
					$pengijin,
					$noakta,
					$tglakta,
					$notakta,
					$noaktap,
					$tglaktap,
					$notaktap,
					$nmttd1,
					$jabttd1,
					$nmttd2,
					$jabttd2,
					$nmttd3,
					$jabttd3,
					$nmttd4,
					$jabttd4,
					$norek,
					$bank,
					$anrek,
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
            $sql = "delete from peny where id in ($id)";
            $this->setSQL($sql);
            $this->executeSQL();
            $result = new stdClass();
            $result->success = ($this->db->ErrorMsg()=="")?true:false;
            $result->msg = $this->db->ErrorMsg();
            return json_encode($result);

        }
        function doRead($REQUEST){
            $grid = new grid(true);
            $grid->setTable("peny"); //set tablenya
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
                        "field"=>"nama",  //field didalam table
                        "name"=>"nama",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"alamat",  //field didalam table
                        "name"=>"alamat",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"kota",  //field didalam table
                        "name"=>"kota",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"namattd",  //field didalam table
                        "name"=>"namattd",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"jabttd",  //field didalam table
                        "name"=>"jabttd",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"tlp",  //field didalam table
                        "name"=>"tlp",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"fax",  //field didalam table
                        "name"=>"fax",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"email",  //field didalam table
                        "name"=>"email",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"npwp",  //field didalam table
                        "name"=>"npwp",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"tglpkp",  //field didalam table
                        "name"=>"tglpkp",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"hotel",  //field didalam table
                        "name"=>"hotel",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"ijin",  //field didalam table
                        "name"=>"ijin",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"noijin",  //field didalam table
                        "name"=>"noijin",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"pengijin",  //field didalam table
                        "name"=>"pengijin",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"noakta",  //field didalam table
                        "name"=>"noakta",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"tglakta",  //field didalam table
                        "name"=>"tglakta",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"notakta",  //field didalam table
                        "name"=>"notakta",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"noaktap",  //field didalam table
                        "name"=>"noaktap",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"tglaktap",  //field didalam table
                        "name"=>"tglaktap",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"notaktap",  //field didalam table
                        "name"=>"notaktap",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"nmttd1",  //field didalam table
                        "name"=>"nmttd1",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"jabttd1",  //field didalam table
                        "name"=>"jabttd1",   //mapping nama yang akan digunakan di json storenya
                        )
                    );		
			$grid->addField(
                    array(
                        "field"=>"nmttd2",  //field didalam table
                        "name"=>"nmttd2",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"jabttd2",  //field didalam table
                        "name"=>"jabttd2",   //mapping nama yang akan digunakan di json storenya
                        )
                    );		
			$grid->addField(
                    array(
                        "field"=>"nmttd3",  //field didalam table
                        "name"=>"nmttd3",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"jabttd3",  //field didalam table
                        "name"=>"jabttd3",   //mapping nama yang akan digunakan di json storenya
                        )
                    );		
			$grid->addField(
                    array(
                        "field"=>"nmttd4",  //field didalam table
                        "name"=>"nmttd4",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"jabttd4",  //field didalam table
                        "name"=>"jabttd4",   //mapping nama yang akan digunakan di json storenya
                        )
                    );		
			$grid->addField(
                    array(
                        "field"=>"norek",  //field didalam table
                        "name"=>"norek",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"bank",  //field didalam table
                        "name"=>"bank",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"anrek",  //field didalam table
                        "name"=>"anrek",   //mapping nama yang akan digunakan di json storenya
                        )
                    );																																								

            return $grid->doRead($REQUEST);
        }

        function createReport($id){
            $sqlStr = "select * from peny where id =?";
            $args = Array($id);
            $rs = $this->execSQL($sqlStr, $args);
            echo $this->db->ErrorMsg(); 
            return $rs;
        }
}
?>
