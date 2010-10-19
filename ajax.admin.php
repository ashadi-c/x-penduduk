<?php
	session_start();
	$userid = isset($_SESSION['userid'])?$_SESSION['userid']:0;
	include_once("config_sistem.php");
	include_once("class/mssql.inc.php"); 
	include_once("class/class.grid.php");
	$id = isset($_REQUEST['id'])?$_REQUEST['id']:0;
	if ($userid){
		if ($id){			
			$ajax =""; 
			switch ($id) {
				case 'menu-manager': 
						$ajax ='ajax.menu.php'; 
				break;
				case 'user-manager': 
						$ajax ='ajax.user.php'; 
				break; 		
				case 'logout': 
						$ajax = 'ajax.login.php'; 
				break; 		
				case 'user-profile': 
						$ajax = 'ajax.login.php'; 
				break; 		
				
			}
			if ($ajax)
				if (file_exists("ajax-admin/$ajax")){
					include_once("ajax-admin/$ajax");
				}
		}
	}else {
		if ($id =='login'){
			$ajax ='ajax.login.php'; 
			if ($ajax)
				if (file_exists("ajax-admin/$ajax"))
					include_once("ajax-admin/$ajax");
		}
	}
	
?> 