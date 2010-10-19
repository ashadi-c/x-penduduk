<?php
	session_start();
	$userid = isset($_SESSION['userid'])?$_SESSION['userid']:0;
	if ($userid){
		include_once("config_sistem.php");
		include_once("class/mssql.inc.php"); 
		include_once("class/class.grid.php");
		include_once("class/class.handler.php"); 

		$handler = new handler(true); 
		$id = isset($_GET['id'])?$_GET['id']:0;
		if ($id){
			$id = explode(".",$id);
			$ajax = $handler->getAjax($id[1]); 
			if ($ajax)
				if (file_exists("ajax/$ajax")){
					include_once("ajax/$ajax"); 
				}
		}
	}
?> 