Ext.onReady(function(){	
	Ext.QuickTips.init();	
	var reloadIcon = false; 
	 var iconStore = new Ext.data.JsonStore({
		url:'icon.php',
		id: 'id',
		totalProperty: 'total',
		baseParams: {
			task: 'getIcon'
		},
		root: 'data',
		fields: [
		  {name:'id'}, 
		  {name:'title'},
		  {name:'clsname'}, 
		  {name:'icon'}
		],
		  sortInfo: {field: 'clsname', direction: 'ASC'},
		  remoteSort: true, 
		  listeners: {
				load : function(thisIcon) {
					iconcss =""; 
					thisIcon.each(function(r,i){
							row = r.data; 
							iconcss +=" "; 
							iconcss += String.format('.{0} { background-image: url(images/icon/{1}) !important; }',row.clsname,row.icon); 
							
						}
					);
					if (reloadIcon)
						Ext.util.CSS.removeStyleSheet('iconcss'); 	
					Ext.util.CSS.createStyleSheet(iconcss, 'iconcss'); 
					reloadIcon = false; 
				}
		  }
	});
	iconStore.load({params:{start: 0, limit:500}});

	var detailEl;
	
	//just for loading.. 
	var loadingDiv;
	loadingDiv = Ext.getDom('loading');
	loadingDiv.style.display = 'none';

	var start_div = Ext.getDom('start-div').innerHTML; 
	var start = {
		id: 'start-panel',
		title: 'Halaman Depan',
		iconCls:'base',
		layout: 'fit',
                autoScroll:true,
		bodyStyle: 'padding:10px',
		//contentEl: 'start-div'  // pull existing content from the page
		html:start_div
	};
	
	// This is the main content center region that will contain each example layout panel.
	// It will be implemented as a CardLayout since it will contain multiple panels with
	// only one being visible at any given time.
	var contentPanel = {
		id: 'content-panel',
		region: 'center', // this is what makes this panel into a region within the containing layout
		layout: 'card',
		margins: '2 5 5 0',
		activeItem: 0,
		border: false,
		items: [
			start
		]
	};
	
/**script tambahan untuk meload data combo box yang secara langsung digunakan oleh setiap modul **/
var angkaTest = /^[0-9]+$/;
Ext.apply(Ext.form.VTypes, {
    //  vtype validation function
    angka: function(val, field) {
        return angkaTest.test(val);
    },
    // vtype Text property: The error text to display when the validation function returns false
    angkaText: 'Not valid number format".',
    // vtype Mask property: The keystroke filter mask
    angkaMask: /[0-9_]/i
});


dsactive = new Ext.data.SimpleStore({
	fields : ['ACTIVESTATUS','ACTIVESTATUS_VAL'],
	data : [['Hidup',1],['Mati',0]]
});

dsgender = new Ext.data.SimpleStore({
	fields : ['EMP_GENDER','GENDER_VALUE'],
	data : 	 [["Laki-Laki","Laki-Laki"],["Perempuan","Perempuan"]]
});
var filtergender = [];
dsgender.each(function(r,i){
	filtergender.push(r.data.GENDER_VALUE);
});

dsregion = new Ext.data.SimpleStore({
	fields : ['REGION_1','REGION_2'],
	data : 	[['-','-'],
		['Islam','Islam'],
		['Kristen','Kristen'],
		['Katholik','Katholik'],
		['Hindu','Hindu'],
		['Budha','Budha']]
});

var filterAgama = [];
dsregion.each(function(r,i){
	filterAgama.push(r.data.REGION_1);
});

dsmarital = new Ext.data.SimpleStore({
	fields : ['MARITAL_STATUS'],
	data : 	 [["Belum Kawin"],["Kawin"],["Cerai Mati"],["Cerai Hidup"]]
});
var filterMarital = [];
dsmarital.each(function(r,i){
	filterMarital.push(r.data.MARITAL_STATUS);
});

var dsPendidikan = new Ext.data.SimpleStore({
	fields:['PENDIDIKAN'],
	data:[['-'],['SD'],['SLTP'],['SLTA'],['D3'],['S1'],['S2']]
});

var filterPendidikan = [];
dsPendidikan.each(function(r,i){
	filterPendidikan.push(r.data.PENDIDIKAN);
});

dsBaca = new Ext.data.SimpleStore({
	fields : ['ACTIVESTATUS','ACTIVESTATUS_VAL'],
	data : [['Bisa',1],['Tidak Bisa',0]]
});

var filterBaca = [];
dsBaca.each(function(r,i){
	filterBaca.push(r.data.ACTIVESTATUS);
});

var dsDusun = new Ext.data.SimpleStore({
	fields:['dusun'],
		data:[['Bakalan 01'],['Bakalan 02'],['Banjarsari 01'],['Banjarsari 02'],['Jamuran'],['Kebonjati']]

});


var filterDusun = []; 
dsDusun.each(function(r,i){
	filterDusun.push(r.data.dusun); 
}); 

var dsKeluarga = new Ext.data.SimpleStore({
	fields:['hubungan'],
	data:[['Orang Tua'],['Anak'],['Menantu'],['Istri'],['Suami'],['Cucu'],['Famili Lain']]
});

var filterKeluarga = [];
dsKeluarga.each(function(r,i){
	filterKeluarga.push(r.data.hubungan);
});

function checkRole(role){
        res = true;
	if (!role)
            res =false;
        /**Ext.MessageBox.show({
           title: 'Alert',
           msg: 'Sorry, You not allowed to access this Menu',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.ERROR
	});**/

	return res;
}	

/**==========================================================================================**/
	
	var my; //definisi masking
	var ROLE; 
   
	// Go ahead and create the TreePanel now so that we can use it below
    var treePanel = new Ext.tree.TreePanel({
    	id: 'tree-panel',
    	title: 'Menu',
        region:'center',
	//bodyStyle:'padding:3px 0',
	iconCls:'mymenu',
	border:false,
        autoScroll: true,
        // tree-specific configs:
        rootVisible: false,
        lines: true,
	useArrows:false,
        singleExpand: false,
        loader: new Ext.tree.TreeLoader({
            dataUrl:'tree-data.json.php',
			listeners: {
				load: function(){treePanel.body.unmask(); treePanel.root.expand(true);},
				beforeload: function(){treePanel.body.mask('Loading Menu','x-mask-loading');}
			}
        }),  
        root: new Ext.tree.AsyncTreeNode(),
		tools: [
				{
					id:'plus',
					qtip:'Expand Menu All',
					handler: function() {
						treePanel.root.expand(true);
					}
				},{
					id:'minus',
					qtip:'Collapse Menu All',
					handler: function() {
						treePanel.root.collapse(true);
					}
				
				},{
					id:'refresh',
					qtip:'Refresh Menu',
					handler: function() {
						treePanel.getRootNode().reload();
					}
				}
		]
    });

    //treePanel.getRootNode().expand();
	// Assign the changeLayout function to be called on tree node click.
    treePanel.on('click', function(n){
    	if (!userid)
    		return false; 
    	var sn = this.selModel.selNode || {}; // selNode is null on initial selection
		if (n.getDepth() == 1) {
			if (Ext.getCmp('content-panel').layout.activeItem.id!='start-panel'){
					Ext.getCmp('content-panel').remove(Ext.getCmp('content-panel').layout.activeItem);
				    Ext.getCmp('content-panel').add(start); 
       				Ext.getCmp('content-panel').layout.setActiveItem('start-panel'); 
			}
		}
    	if(n.leaf && n.id != sn.id){  // ignore clicks on folders and currently selected node 
		id_panel = n.id +'-panel'; 
		if (id_panel != Ext.getCmp('content-panel').layout.activeItem.id) {	
		    x = Ext.get('loading').dom;
		    x.style.top ="";
		    x.style.left ="";
		    xy = Ext.getCmp('content-panel').layout.activeItem.id;
		    Ext.get('loading').alignTo(Ext.get(xy), 'c',[-15,-15]);
			//Ext.getCmp('content-panel').layout.activeItem.purgeListeners();  **gak usah purgeListeners kalo pake remove 
			Ext.getCmp('content-panel').remove(Ext.getCmp('content-panel').layout.activeItem);
			//}
			loadingDiv.style.display = '';
			Ext.Ajax.request({
				url :'handler-layout.php',
				params: {
					page : n.id
				},
				success : function(response){
					valid_script =false;
					page = n.id;
					data = response.responseText;
					eval(data); 
					if (valid_script){
						run = "Ext.getCmp('content-panel').add(" + n.id + ")";  
						Ext.getCmp('content-panel').add(main_content); 
						loadingDiv.style.display = 'none';
						Ext.getCmp('content-panel').layout.setActiveItem('main_content');
						Ext.example.msg('Main Menu', n.text);
					} else {
						loadingDiv.style.display = 'none';
						Ext.MessageBox.show({
				        title: 'Alert',
				           msg: 'Sorry, No Content Avaible for '+ n.text +' menu',
				           buttons: Ext.MessageBox.OK,
				           animEl: this.id,
				           icon: Ext.MessageBox.ERROR
       					});
       					Ext.getCmp('content-panel').add(start); 
       					Ext.getCmp('content-panel').layout.setActiveItem('start-panel'); 
					}
					
				}
			
			}); 
		}

		}
		
    });
 
	var pageAdmin =""; 
	function menuAdmin(mypage){
			if (pageAdmin != mypage) {
			pageAdmin = mypage; 
			Ext.getCmp('content-panel').remove(Ext.getCmp('content-panel').layout.activeItem);
			loadingDiv.style.display = '';
			Ext.Ajax.request({
				url :'handler-admin.php',
				params: {
					page : mypage
				},
				success : function(response){
					valid_script =false;
					data = response.responseText;
					eval(data); 
					if (valid_script){
						Ext.getCmp('content-panel').add(main_content); 
						loadingDiv.style.display = 'none';
						Ext.getCmp('content-panel').layout.setActiveItem('main_content');
						Ext.example.msg('Admin Menu', mypage);
					} else {
						loadingDiv.style.display = 'none';
						Ext.MessageBox.show({
				        title: 'Alert',
				           msg: 'Sorry, You Not Allowed for Access This Menu',
				           buttons: Ext.MessageBox.OK,
				           animEl: mypage,
				           icon: Ext.MessageBox.WARNING
       					});
       					Ext.getCmp('content-panel').add(start); 
       					Ext.getCmp('content-panel').layout.setActiveItem('start-panel'); 
					}
					
				}
			
			}); 
			}
	
	}
	var actions = {
    	'logout' : function(){
    					pageAdmin ="";
    					if (userid){
						Ext.getCmp('stat-bar').setStatus({
                            text: 'Logout',
                            iconCls: 'x-status-busy'
                        });					
  						Ext.Ajax.request({
							url:'ajax.admin.php',
							waitMsg:'Logout',
							params:{
								id:'logout',
								task: "logout"
							},
							success: function(response) {
								res = Ext.decode(response.responseText);
								if(res.success){
									userid =0; 
									treePanel.getRootNode().reload();
									Ext.getCmp('content-panel').add(cLogin); 
									Ext.getCmp('content-panel').layout.setActiveItem('cLogin');
									Ext.fly(statUser.getEl()).update('No User Online');
									Ext.getCmp('stat-bar').setStatus({
			                            text: 'Offline',
			                            iconCls: 'x-status-error'
			                        });
									
								} else {
									Ext.MessageBox.show({
										title: 'Invalid',
										msg: 'An Error to Logout User',
										buttons: Ext.MessageBox.OK,
										icon: Ext.MessageBox.WARNING
									});										
								
								}
								
							}
						}); 
    					}
    	},
		'user-profile': function() {
		},
		'user-manager': function() {
			if (userid){
				menuAdmin('user-manager');
			}

		},
		'menu-manager': function(){
			if (userid){  
				menuAdmin('menu-manager');
			}
		},
		'user-profile': function(){
			if (userid)
				menuAdmin('user-profile'); 
		}
	};
	
    function doAction(e, t){
    	e.stopEvent();
    	actions[t.id]();
    }	

	var statUser = new Ext.Toolbar.TextItem((username=='')?'No User Login':username);
	var detailsPanel = {
		id: 'action-panel',
		title: 'Setting',
		region: 'south',
		split:false,
		height:150,
		cmargins:'2 2 2 2',
		iconCls:'setting',
		frame: false,
		plain:true,
		contentEl:'control-view',
		border:false,
		collapsible:true,
		bodyStyle: 'padding: 10 0 0 10; background: url('+ Ext.BLANK_IMAGE_URL +');',
		autoScroll: true,
		listeners: {
			render: function() {
			    var ab = Ext.getCmp('action-panel').body;
				ab.on('mousedown', doAction, null, {delegate:'a'});
				ab.on('click', Ext.emptyFn, null, {delegate:'a', preventDefault:true});	// This is the Details panel that contains the description for each example layout.

			}
		},
		bbar:new Ext.ux.StatusBar({
            text: (userid)?'Online':'Offline',
            id: 'stat-bar',
            iconCls:(userid)?'x-status-valid':'x-status-error',
            statusAlign: 'left', // the magic config
            items: [statUser]
        })
		
    };

	
	
    var viewPort = new Ext.Viewport({
		layout: 'border',
		title: 'Ext Layout Browser',
		items: [{
			xtype: 'box',
			region: 'north',
			applyTo: 'header',
			height: 30
		},{
		layout: 'border',
		//layout:'accordion',
		//layoutConfig:{
		//	animate:true
		//},
	    	id: 'layout-browser',
			title:'Navigation Panel',
			//iconCls:'navigator',
	        region:'west',
	        border: true,
	        split: true,
	        collapsible: true,
		//collapseMode: 'mini',
	        floatable: false,
	        useSplitTips: true,
	        cmargins: '2 2 5 2',
			margins: '2 0 5 5',
	        width: 230,
	        minSize: 100,
	        maxSize: 250,
			items: [treePanel, detailsPanel]
		},
			contentPanel
		],
        renderTo: Ext.getBody()
    });
	
	function winReport(config) {
		
		iconCls = (config.type =='PDF')?'report-pdf':'report-xls'; 
		unsupportedText ='<div style="padding:10px;"><img class="x-panel-inline-icon " src="images/icon/error.png" style="float:left;"/><h1>{1} Pluggin tidak ditemukan</h1> <p><a href="{0}">Silahkan Download Report Disini</a></p></div>';
		unsupportedText = String.format(unsupportedText,config.url,config.type); 
		/**
		medpanel = new Ext.ux.MediaPanel({
			mediaCfg:{
				mediaType:config.type,
				url:config.url,
				unsupportedText:unsupportedText
			}
		}); **/
                myitems= [
                     { xtype:'tabpanel',
                       activeTab : 0,
                       items:[
                          {
                              id         : 'pdf-auto',
                              title      : config.title,
                              xtype      : 'iframepanel',
                              defaultSrc : null,
                              frameCfg   : {id : 'pdfAuto'},
                              loadMask   : {hideOnReady: false, msg: 'Loading Document...'},
                              iconCls    : iconCls,
                              autoLoad:{
                                url      : config.url,
                                method   : 'POST',
                                params   : {method:'3'},
                                submitAsTarget : true
                              }

                          }]
                        }
                ]; 
		var winRe = new Ext.Window({
			layout:'fit',
			width:800,
			height:600,
			closeAction:'hide',
			closable:true,
			iconCls:'report-mode',
			title:'Preview Report',
			modal:true, 
			maximizable:true, 
			//maximized:true, 
			border:false,
			items:myitems,
			listeners:{
				hide: function() {
					this.destroy(); 
				}
			}
		}); 		
		winRe.show(config.id);
	}
	var winLogin = {
			layout:'border',
			id:'winLogin',
			width:400,
			height:210,
			border:true,
			iconCls:'lock',
			title:'Please Login',
			//plain:true,
			frame:true,
			items:[picLogin,loginForm],
			buttons: [
					{
						text:'Submit',
						iconCls:'login',
						id:'btn-login',
						scale:'medium',
						handler:function() {
							if (Ext.getCmp('frmLogin').getForm().isValid()) {
								Ext.getCmp('content-panel').body.mask('Validating User','x-mask-loading'); 
								dataLogin = Ext.getCmp('frmLogin').getForm().getValues();
								Ext.Ajax.request({
									url:'ajax.admin.php',
									params:{
											id:'login',
											task: "login",
											username : dataLogin.username, 
											pwd : dataLogin.pwd
									},
									success: function(response) {
										res = Ext.decode(response.responseText);
										if(res.success){
											Ext.getCmp('content-panel').body.unmask();
											Ext.getCmp('frmLogin').getForm().setValues({pwd:''});
											Ext.getCmp('tree-panel').getRootNode().reload();
											Ext.getCmp('content-panel').remove(Ext.getCmp('content-panel').layout.activeItem);
											Ext.getCmp('content-panel').add(start); 
											Ext.getCmp('content-panel').layout.setActiveItem('start-panel');
											userid =res.userid; 
											Ext.fly(statUser.getEl()).update(res.username);
											Ext.getCmp('stat-bar').setStatus({
					                            text: 'Online',
					                            iconCls: 'x-status-valid'
					                        });
										} else {
											userid=0; 
											Ext.getCmp('content-panel').body.unmask();
											Ext.MessageBox.show({
												title: 'Invalid',
												msg: 'Sorry, Invalid Username or Password, Please try Again',
												buttons: Ext.MessageBox.OK,
												icon: Ext.MessageBox.WARNING
											});										
										
										}
										
									}
								}); 
							}
							
						}
					},{
						text:'Reset',
						scale:'medium',
						iconCls:'drop',
						handler:function() {
								Ext.getCmp('frmLogin').getForm().reset();
						}					
					}
			]
	}; 
	
	var cLogin = {
		id:'cLogin',
		layout:'hbox',
		title:'Login First',
	    layoutConfig: {
	    	padding:'5',
	    	pack:'center',
	    	align:'middle'
		},
		items:[winLogin]
	};
	
	if (!userid){
		Ext.getCmp('content-panel').add(cLogin); 
		Ext.getCmp('content-panel').layout.setActiveItem('cLogin');
	}	
});
