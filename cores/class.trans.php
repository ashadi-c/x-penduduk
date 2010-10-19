<?php
class trans extends msDB {
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
			$nospp = $REQUEST['nospp'];
			$nospm = $REQUEST['nospm'];
            $nokw = $REQUEST['nokw'];
            $tanggal = $REQUEST['tanggal'];
            $tmp = explode("/", $tanggal);
            $tmp = array_reverse($tmp, 1);
            $tanggal = implode("-",$tmp); 
            $bulan = $REQUEST['bulan'];
			$bulan = substr($tanggal,5,2);
/*			switch($bulan) {
            case "01":
                $bulan = "Januari"; //pake $_POST juga sama aja
            break;
            case "02":
                $bulan = "Februari"; //pake $_POST juga sama aja
            break;
            case "03":
                $bulan = "Maret"; //pake $_POST juga sama aja
            break;
			case "04":
                $bulan = "April"; //pake $_POST juga sama aja
            break;
			case "05":
                $bulan = "Mei"; //pake $_POST juga sama aja
            break;
			case "06":
                $bulan = "Juni"; //pake $_POST juga sama aja
            break;
			case "07":
                $bulan = "Juli"; //pake $_POST juga sama aja
            break;
			case "08":
                $bulan = "Agustus"; //pake $_POST juga sama aja
            break;
			case "09":
                $bulan = "September"; //pake $_POST juga sama aja
            break;
			case "10":
                $bulan = "Oktober"; //pake $_POST juga sama aja
            break;
			case "11":
                $bulan = "November"; //pake $_POST juga sama aja
            break;
			case "12":
                $bulan = "Desember"; //pake $_POST juga sama aja
            break;

        }*/
            $idpagu = $REQUEST['idpagu'];
            $kdpagu = $REQUEST['kdpagu'];
			$kdmak = $REQUEST['kdmak'];
			$tahun = substr($tanggal,0,4);
			$subject = $REQUEST['subject'];
			$ket = $REQUEST['ket'];
			$jumlah = $REQUEST['jumlah'];
			$jumlah = explode(".", $jumlah);
			$jumlah = implode("",$jumlah);
            if ($id ==""){
                $sql = "insert into trans (nospp,nospm,nokw,tanggal,bulan,idpagu,kdpagu,kdmak,tahun,subject,ket,jumlah) values(?,?,?,?,?,?,?,?,?,?,?,?)";
                $args = Array(
                    $nospp,
					$nospm,
					$nokw,
                    $tanggal,
                    $bulan,
                    $idpagu,
                    $kdpagu,
					$kdmak,
					$tahun,
					$subject,
					$ket,
					$jumlah
                ); 
            }else {
                $sql = "update trans set nospp=?,nospm=?,nokw=?,tanggal=?,bulan=?,idpagu=?,kdpagu=?,kdmak=?,tahun=?,subject=?,ket=?,jumlah=? where id=?";
                $args = Array(
                    $nospp,
					$nospm,
					$nokw,
                    $tanggal,
                    $bulan,
                    $idpagu,
                    $kdpagu,
					$kdmak,
					$tahun,
					$subject,
					$ket,
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
            $sql = "delete from trans where id in ($id)";
            $this->setSQL($sql);
            $this->executeSQL();
            $result = new stdClass();
            $result->success = ($this->db->ErrorMsg()=="")?true:false;
            $result->msg = $this->db->ErrorMsg();
            return json_encode($result);

        }
        function doRead($REQUEST){
            $grid = new grid(true);
            $grid->setTable("trans"); //set tablenya
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
                        "field"=>"nospp",  //field didalam table
                        "name"=>"nospp"                        
						)
                    );
			$grid->addField(
                    array(
                        "field"=>"nospm",  //field didalam table
                        "name"=>"nospm"
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"nokw",  //field didalam table
                        "name"=>"nokw",   //mapping nama yang akan digunakan di json storenya
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
                        "field"=>"bulan",  //field didalam table
                        "name"=>"bulan",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"idpagu",  //field didalam table
                        "name"=>"idpagu",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
            $grid->addField(
                    array(
                        "field"=>"kdpagu",  //field didalam table
                        "name"=>"kdpagu",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"kdmak",  //field didalam table
                        "name"=>"kdmak",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"tahun",  //field didalam table
                        "name"=>"tahun",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"subject",  //field didalam table
                        "name"=>"subject",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"ket",  //field didalam table
                        "name"=>"ket",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			$grid->addField(
                    array(
                        "field"=>"jumlah",  //field didalam table
                        "name"=>"jumlah",   //mapping nama yang akan digunakan di json storenya
                        )
                    );										

            return $grid->doRead($REQUEST);
        }
}
?>
