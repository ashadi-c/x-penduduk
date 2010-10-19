<?php
class handler extends msDB {
	private $text = "";
	
	function __construct($connection) {
		$this->messsage = "initialize class";
		if ($connection ==true) {
			$radiochecked = $this->connect();
		}
	}
	
	function __destruct() {
		unset($radiochecked);
	}
	
	function getHandler($id){
		$tmp =""; 
		$sql = "select handler from menu where id =?"; 
		$args = array($id); 
		$rs = $this->execSQL($sql, $args);
		if ($rs)
			$tmp = $rs->fields['handler']; 
		return $tmp;
	}
	
	function getEvent($menu_id){
		$sql = "select a.event_name AS event_name, b.is_active AS is_active
						FROM menu_event a, role_menu_event_group b
						where a.id = b.role_id and b.group_id =? 
						and a.menu_id =?
				"; 
		$args = Array($_SESSION['group_id'],$menu_id); 
		$rs = $this->execSQL($sql,$args);
		$result = Array(); 
		if ($rs) 
			while($row = $rs->FetchNextObject()){
				$result[$row->EVENT_NAME] = ($row->IS_ACTIVE)?true:false; 				
			}
		return json_encode($result); 	
	}
	
	function getAjax($id){
		$tmp =""; 
		$sql = "select ajax from menu where id =?"; 
		$args = array($id); 
		$rs = $this->execSQL($sql, $args);
		if ($rs)
			$tmp = $rs->fields['ajax']; 
		return $tmp;
	}
	function getReport($id){
		$tmp =""; 
		$sql = "select report from menu where id =?"; 
		$args = array($id); 
		$rs = $this->execSQL($sql, $args);
		if ($rs)
			$tmp = $rs->fields['report']; 
		return $tmp;
	}	
}
?>