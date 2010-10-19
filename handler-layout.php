<?php
	session_start();
	$userid = isset($_SESSION['userid'])?$_SESSION['userid']:0;
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . 'GMT');
	header('Cache-Control: no-cache, must-revalidate');
	header('Pragma: no-cache');
	header('Content-Type: text/javascript');
	if ($userid){
		include_once("config_sistem.php");
		include_once("class/mssql.inc.php"); 
		include_once("class/class.handler.php"); 
		$handler = new handler(true); 
		$page = isset($_POST['page'])?$_POST['page']:0; 	
		if ($page){
			
			$id = explode(".",$page); 
			$js = $handler->gethandler($id[1]); 
			if ($js)
				if (file_exists("layouts/$js")){
					$role = $handler->getEvent($id[1]); 
					if ($role)
						echo "ROLE = Ext.decode('".$role."');\n"; 
					$result = file_get_contents("layouts/$js"); 
					echo stripslashes(trim($result)); 
				}
		}
	}
 ?>