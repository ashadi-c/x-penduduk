<?php
	session_start(); 
	$userid = isset($_SESSION['userid'])?$_SESSION['userid']:0;
	$username= isset($_SESSION['user_name'])?$_SESSION['user_name']:"";
        include_once 'config_sistem.php';
?>
<html>
<head>
    <title><?php echo SITE_TITLE; ?></title>
	<link rel="icon" href="images/icon/imac_web.ico" type="image/x-icon" />
        <link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all.css">
        <!--<link rel="stylesheet" type="text/css" href="extjs/resources/css/xtheme-gray.css"> --!>
    <!-- custom includes -->
        <link rel="stylesheet" type="text/css" href="css/index.css">
	<link rel="stylesheet" type="text/css" href="add-on/message/examples.css">
        <link rel="stylesheet" type="text/css" href="extjs/ux/gridfilters/css/GridFilters.css">
        <link rel="stylesheet" type="text/css" href="extjs/ux/gridfilters/css/RangeMenu.css">
	<link rel="stylesheet" type="text/css" href="extjs/ux/css/RowEditor.css">
	<link rel="stylesheet" type="text/css" href="extjs/ux/css/chooser.css">
	<link rel="stylesheet" type="text/css" href="extjs/ux/css/fieldUpload.css">
	<link rel="stylesheet" type="text/css" href="extjs/ux/css/statusbar.css" />
	<link rel="stylesheet" type="text/css" href="extjs/ux/css/Portal.css" />
        <link rel="stylesheet" type="text/css" href="extjs/ux/css/combos.css" />
</head>
<body scroll="no">
	<div id="loading">
	<img src="images/indicator.gif" width="32" height="32">	</div>
    <script type="text/javascript" src="extjs/adapter/ext/ext-base.js"></script>
    <script type="text/javascript">Ext.BLANK_IMAGE_URL = "extjs/resources/images/default/s.gif"</script>
    <script type="text/javascript" src="extjs/ext-all.js"></script>
    <script type="text/javascript" src="extjs/ux/miframe.js"></script>
    <script type="text/javascript" src="extjs/ux/gridfilters/menu/RangeMenu.js"></script>
    <script type="text/javascript" src="extjs/ux/gridfilters/menu/ListMenu.js"></script>
    <script type="text/javascript" src="extjs/ux/gridfilters/GridFilters.js"></script>
    <script type="text/javascript" src="extjs/ux/gridfilters/filter/Filter.js"></script>
    <script type="text/javascript" src="extjs/ux/gridfilters/filter/StringFilter.js"></script>
    <script type="text/javascript" src="extjs/ux/gridfilters/filter/DateFilter.js"></script>
    <script type="text/javascript" src="extjs/ux/gridfilters/filter/ListFilter.js"></script>
    <script type="text/javascript" src="extjs/ux/gridfilters/filter/NumericFilter.js"></script>
    <script type="text/javascript" src="extjs/ux/gridfilters/filter/BooleanFilter.js"></script>
    <script type="text/javascript" src="extjs/ux/RowEditor.js"></script>
    <script type="text/javascript" src="extjs/ux/StatusBar.js"> </script>
    <script type="text/javascript" src="extjs/ux/CheckColumn.js"></script>
    <script type="text/javascript" src="extjs/ux/IconCombo.js"></script>
    <script type="text/javascript" src="extjs/ux/chooser.js"></script>
    <script type="text/javascript" src="extjs/ux/FileUploadField.js"></script>
    <script type="text/javascript" src="extjs/ux/Portal.js"></script>
    <script type="text/javascript" src="extjs/ux/PortalColumn.js"></script>
    <script type="text/javascript" src="extjs/ux/Portlet.js"></script>
    <script type="text/javascript" src="extjs/ux/SearchField.js"></script>
    <script type="text/javascript" src="extjs/ux/RowExpander.js"></script>
    <script type="text/javascript" src="extjs/ux/customRendererField.js"></script>
    <script type="text/javascript" src="extjs/ux/GroupSummary.js"></script>
    <!--<script type="text/javascript" src="extjs/ux/InputTextMask.js"></script>
    <script type="text/javascript" src="extjs/ux/cherryonext.js"></script> -->
    <script type="text/javascript">
    var userid = <?php echo $userid; ?>;
    var username = '<?php echo ucfirst($username); ?>';
    </script>

    <script type="text/javascript" src="js/formLogin.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="add-on/message/examples.js"></script>
    	  
    <div id="header"><h1><?php echo SITE_TITLE; ?></h1></div>
    <div style="display:none;">
    
        <!-- Start page content -->
        <div id="start-div">
            <div style="float:left;" ><img src="images/gnome-fs-client.png" /></div>
            <div style="margin-left:100px;">
                <h2 style="display: block; border-bottom: 1px solid teal;padding-bottom: 4px;">Sistem Pendataan Penduduk V.01</h2> 
                <p>Created and Development By http://www.xcoder.comoj.com</p>
            </div>
            <div style="clear: both; height: 10px;"> </div>
            <div style="width:550; float: left;">
                <img src="images/filter_grid.jpg" style="float: left; margin-right: 10px; border: 1px solid silver;"/>
                <h2>Pencarian Canggih </h2>
                <p>Anda dapat melakukan pencarian dengan kriteria lebih dari satu kolom dengan meng click header
                    kolom di grid! <br/>
                    Jadi memudahkan anda untuk mencari data dengan acuan kriteria yang bermacam-macam. misal umur,
                    tahun, nama, jenis kelamin dan lain-lain. semuanya dapat dikombinasikan jadi satu. 
                </p>
            </div>
            <div style="width:550; margin-top: 10px; float: right;">
                <img src="images/multi_select.jpg" style="float: right; margin-right: 10px; border: 1px solid silver;"/>
                <h2>Gunakan CTRL! </h2>
                <p>Anda dapat menghapus setiap item data lebih dari satu dengan sekali klik!<br/>
                   Caranya adalah gunakan tombol CTRL dan tekan tekan terus sambil seleksi data yang akan dihapus
                </p>
            </div>
            <div style="clear: both; height: 20px;"> </div>
            <div style="width:550; float: left;">
                <img src="images/show_picture.jpg" style="float: left; margin-right: 10px; border: 1px solid silver;"/>
                <h2>Tampilkan Fotonya!</h2>
                <p>Setiap data yang anda lihat mempunyai foto yang secara default tersembunyi untuk menyederhanakan tampilan<br/>
                    Klik tanda + dipojok kiri setiap data untuk melihat detail fotonya
                </p>
            </div>
            <div style="width:550; margin-top: 10px; float: right;">
                <img src="images/auto_save.jpg" style="float: right; margin-right: 10px; border: 1px solid silver;"/>
                <h2>Simpan Secara Otomatis</h2>
                <p>Anda tidak menemukan tombol simpan/save dalam sebuah menu? <br/>
                    Jangan kuatir data anda akan disimpan secara otomatis jika anda sudah selesai mengisi dengan lengkap data tersebut.
                    cepat dan mudah!. tentu saja akan ada sebuah pesan jika data anda telah tersimpan. 
                </p>
            </div>

        </div>
        
        <!-- Menu Master Details -->

	<ul id="control-view" class="x-hidden">
		<li>
			<img src="images/s.gif" class="chk-pwd"/>
			<a id="user-profile" href="#">User Profil</a>
		</li>  
		<li>
			<img src="images/s.gif" class="user-comment"/>
			<a id="user-manager" href="#">User Manager</a>
		</li>
		<li>
			<img src="images/s.gif" class="app"/>
			<a id="menu-manager" href="#">Menu Event Manager</a>
		</li>
		<!--  
		<li>
			<img src="images/s.gif" class="db-refresh"/>
			<a id="db-backup" href="#">Database Manager</a>
		</li>
		-->		
		<li>
			<img src="images/s.gif" class="logout"/>
			<a id="logout" href="#">Logout</a>
		</li>
	</ul>
    </div>
</body>
</html>
