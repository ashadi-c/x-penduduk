<?php
class transbd extends msDB {
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
            $idpagu = $REQUEST['idpagu'];
            $kdpagu = $REQUEST['kdpagu'];
			$kdmak = $REQUEST['kdmak'];
			$tahun = substr($tanggal,0,4);
			$subject = $REQUEST['subject'];
			$ket = $REQUEST['ket'];
			$jml = $REQUEST['jml'];
			$jml = explode(".", $jml);
			$jml = implode("",$jml);
			$npwp = $REQUEST['npwp'];
			$alamat = $REQUEST['alamat'];
			$norek = $REQUEST['norek'];
			$bank = $REQUEST['bank'];
			$nospk = $REQUEST['nospk'];
			$potput = $REQUEST['potput'];
			$retur = $REQUEST['retur'];
			$retur = explode(".", $retur);
			$retur = implode("",$retur);
            if ($id ==""){
                $sql = "insert into trans (nospp,nospm,nokw,tanggal,bulan,idpagu,kdpagu,kdmak,tahun,subject,ket,jml,npwp,alamat,norek,bank,nospk,potput,retur) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
					$jml,
					$npwp,
					$alamat,
					$norek,
					$bank,
					$nospk,
					$potput,
					$retur
                ); 
            }else {
                $sql = "update trans set nospp=?,nospm=?,nokw=?,tanggal=?,bulan=?,idpagu=?,kdpagu=?,kdmak=?,tahun=?,subject=?,ket=?,jml=?,npwp=?,alamat=?,norek=?,bank=?,nospk=?,potput=?,retur=? where id=?";
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
					$jml,
					$npwp,
					$alamat,
					$norek,
					$bank,
					$nospk,
					$potput,
					$retur,
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
            $grid->setManualFilter("AND jml>=0");
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
                        "field"=>"jml",  //field didalam table
                        "name"=>"jml",   //mapping nama yang akan digunakan di json storenya
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
                        "field"=>"alamat",  //field didalam table
                        "name"=>"alamat",   //mapping nama yang akan digunakan di json storenya
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
                        "field"=>"nospk",  //field didalam table
                        "name"=>"nospk",   //mapping nama yang akan digunakan di json storenya
                        )
                    );	
					
			$grid->addField(
                    array(
                        "field"=>"if (nokw !='NULL','LUNAS','PROSES')",  //field didalam table
                        "name"=>"status",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			
			$grid->addField(
                    array(
                        "field"=>"potput",  //field didalam table
                        "name"=>"potput",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
			 
			$grid->addField(
                    array(
                        "field"=>"retur",  //field didalam table
                        "name"=>"retur",   //mapping nama yang akan digunakan di json storenya
                        )
                    );
					
			$grid->addField(
                    array(
                        "field"=>"(select sum(jml-retur) as total from trans where nokw<>'NULL')",  //field didalam table
                        "name"=>"total",   //mapping nama yang akan digunakan di json storenya
                        )
                    );																									

            return $grid->doRead($REQUEST);
        }
		
		function createReport($id){
            $sqlStr = "select * from trans where id =?";
            $args = Array($id);
            $rs = $this->execSQL($sqlStr, $args);
            echo $this->db->ErrorMsg(); 
            return $rs;
        }
}
?>
