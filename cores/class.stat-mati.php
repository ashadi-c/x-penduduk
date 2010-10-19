<?php
class statMati extends msDB {
	function __construct($connection) {
		$this->messsage = "initialize class";
		if ($connection ==true) {
			$radiochecked = $this->connect();
		}
	}
	function __destruct() {
		unset($radiochecked);
	}
	
	function getChartYear($REQUEST){
		$grid = new grid(true); 
		$grid->setTable('tkematian');
		//$grid->setManualFilter(" and tpenduduk.status=1");
		$grid->setJoin("INNER JOIN tpenduduk ON tpenduduk.id_penduduk = tkematian.id_penduduk");
		$grid->setGroupBy("DATE_FORMAT(tkematian.tanggal_kematian,'%Y')");
		$grid->addField(
			Array(
					"field" => "DATE_FORMAT(tkematian.tanggal_kematian,'%Y')",
					"name" => 'tanggal_kematian'
			)
		);
		$grid->addField(
			Array(
					"field" => "COUNT(DATE_FORMAT(tkematian.tanggal_kematian,'%Y'))",
					"name" => 'total'
			)
		);
		return $grid->doRead($REQUEST); 		
	}
	
	function getChartDate($REQUEST) {
		$grid = new grid(true); 
		$grid->setTable('tkematian');
		//$grid->setManualFilter(" and tpenduduk.status=1");
		$grid->setJoin("INNER JOIN tpenduduk ON tpenduduk.id_penduduk = tkematian.id_penduduk");
		$grid->setGroupBy("DATE_FORMAT(tkematian.tanggal_kematian,'%Y-%m')");
		$grid->addField(
			Array(
					"field" => "DATE_FORMAT(tkematian.tanggal_kematian,'%Y-%m')",
					"name" => 'tanggal_kematian'
			)
		);
		$grid->addField(
			Array(
					"field" => "COUNT(DATE_FORMAT(tkematian.tanggal_kematian,'%Y-%m'))",
					"name" => 'total'
			)
		);
		$rs = $grid->doSql($REQUEST);
		$data =Array();  
		if ($rs)
			while ($row = $rs->FetchNextObject()){
				$tmp = explode("-",$row->TANGGAL_KEMATIAN); 
				$year_curr = $tmp[0];
				$month_curr = $tmp[1]; 
				 $tmp_arr = Array(
	 							"month" =>$month_curr,
	 							"total" =>$row->TOTAL
	 						);
				$data[$year_curr][]=$tmp_arr;  						 		
			}		 		
		$new_data = $this->formatChartYear($data); 
		$result = new stdClass();
		$result->success = true; 
		$result->data = $new_data; 
		return json_encode($result);
	}
	
	function getRow($key,$arr){
		$result = Array();
		foreach($arr as $row){
			if ($row['month']== $key)
				$result = $row; 	
		}
		return $result; 
	}
	
	function formatChartYear($data){
		$year_now = date("Y");
		$month_now = date("m");  
		$month_now = $month_now + 0; 
		$year_now =$year_now + 0;
		$new_data = Array();  
		foreach($data as $key_year=>$row){ 
			$limit_month = ($key_year < $year_now)?12:$month_now;
			$tmp_month = Array();
			for($i=1;$i<=$limit_month;$i++){
				$key_month = "".$i.""; 
				if ($i <10)
					$key_month = "0".$i;
				$in_data = $this->getRow($key_month,$row);     
				if ($in_data){
					$new_data[] = Array(
						"tanggal_kematian" => $in_data['month']."-".$key_year,
						"total"		=> $in_data['total']
					);					
				}else 
					$new_data[] = Array(
						"tanggal_kematian" => $key_month."-".$key_year,
						"total"		=> 0
					); 
				
			}
		}
		
		return $new_data; 
	}
	
}
?>