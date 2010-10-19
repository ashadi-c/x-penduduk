<?php

class realiasi extends msDB {
	function __construct($connection) {
		$this->messsage = "initialize class";
		if ($connection ==true) {
			$radiochecked = $this->connect();
		}
	}
	function __destruct() {
		unset($radiochecked);
	}

        function getChart($REQUEST){
            $grid = new grid(true);
            $grid->setTable("pagu");
            $grid->setJoin("INNER JOIN trans ON pagu.id=trans.idpagu");
            $grid->setGroupBy("pagu.thang,pagu.id");

            $grid->addField(Array(
                            "field"=>"pagu.thang",
                            "name"=>"tahun"
            ));
            $grid->addField(Array(
                            "field"=>"pagu.id",
                            "name"=>"kdgiat"
            ));
            $grid->addField(Array(
                            "field"=>"SUM(pagu.jumlah)",
                            "name"=>"jumlah"
            ));
            $grid->addField(Array(
                            "field"=>"SUM(trans.jumlah)",
                            "name"=>"realisasi"
            ));
            $rs = $grid->doSql($REQUEST);
            $data = Array();
            while ($row = $rs->FetchNextObject()){
                $data[] = Array(
                                "tahun"=>$row->KDGIAT ." ({$row->TAHUN})",
                                "jumlah"=> $row->JUMLAH,
                                "realisasi"=>$row->REALISASI
                           ); 
            }
            $result = new stdClass();
            $result->success = true;
            $result->data = $data;
            return json_encode($result);
        }
}
?>
