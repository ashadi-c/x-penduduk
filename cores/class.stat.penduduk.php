<?php
class statPenduduk extends msDB {
	function __construct($connection) {
		$this->messsage = "initialize class";
		if ($connection ==true) {
			$radiochecked = $this->connect();
		}
	}
	function __destruct() {
		unset($radiochecked);
	}
	
	function getChartGender($REQUEST) {
		$grid = new grid(true); 
		$grid->setTable('tpenduduk');
		$grid->setManualFilter(" and status=1");
		$grid->setGroupBy("kelamin");
		$grid->addField(
			Array(
					"field" => 'kelamin',
					"name" => 'gender'
			)
		);
		$grid->addField(
			Array(
					"field" => 'COUNT(kelamin)',
					"name" => 'total'
			)
		);
		return $grid->doRead($REQUEST); 
		 		
	}
	function getChartReligion($REQUEST) {
		$grid = new grid(true); 
		$grid->setTable('tpenduduk');
		$grid->setManualFilter(" and status=1");
		$grid->setGroupBy("agama");
		$grid->addField(
			Array(
					"field" => 'agama',
					"name" => 'agama'
			)
		);
		$grid->addField(
			Array(
					"field" => 'COUNT(agama)',
					"name" => 'total'
			)
		);
		return $grid->doRead($REQUEST); 
		 		
	}
	
	function getChartEducation($REQUEST) {
		$grid = new grid(true); 
		$grid->setTable('tpenduduk');
		$grid->setManualFilter(" and status=1");
		$grid->setGroupBy("pendidikan");
		$grid->addField(
			Array(
					"field" => 'pendidikan',
					"name" => 'pendidikan'
			)
		);
		$grid->addField(
			Array(
					"field" => 'COUNT(pendidikan)',
					"name" => 'total'
			)
		);
		return $grid->doRead($REQUEST); 
		 		
	}
	
	function getChartAge($REQUEST) {
		$grid = new grid(true); 
		$grid->setTable('tpenduduk');
		$grid->setManualFilter(" and status=1");
		$grid->setGroupBy("(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),tanggal_lahir)), '%Y')+0)");
		$grid->addField(
			Array(
					"field" => "(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),tanggal_lahir)), '%Y')+0)",
					"name" => 'age'
			)
		);
		$grid->addField(
			Array(
					"field" => "COUNT((DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),tanggal_lahir)), '%Y')+0))",
					"name" => 'total'
			)
		);
		$result =  $grid->doRead($REQUEST);
		$data = json_decode($result); 
		if ($data->success){
			$tmp = Array();
			foreach($data->data as $col){
				 $col->age = $col->age . ' Tahun'; 
				 $tmp[] = $col; 
			}
			$data->data = $tmp; 
			$result = json_encode($data);
		}
		return $result; 	
	}
	
}
?>