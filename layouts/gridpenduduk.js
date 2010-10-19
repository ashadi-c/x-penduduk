/** untuk menandakan bahwa script ini valid dan akan di eksekusi * */
valid_script = true;
ajax_url = 'ajax.handler.php?id=' + page;
/** =============================================================* */
function validateFileExtension(fileName) {
   var exp = /^.*.(csv|CSV|txt|TXT)$/;
   return exp.test(fileName);
}

var proxyEvent = new Ext.data.HttpProxy({
			api : {
				read : ajax_url + '&task=grid&action=doRead',
				create : ajax_url + '&task=grid&action=doCreate',
				update : ajax_url + '&task=grid&action=doUpdate',
				destroy : ajax_url + '&task=grid&action=doDestroy'
			}
});

var readerEvent = new Ext.data.JsonReader({
			totalProperty : 'total',
			successProperty : 'success',
			idProperty : 'id_penduduk',
			root : 'data'
		}, [
					{
						name : 'id_penduduk'
					},{
						name : 'no_kk',
						type : 'string',
						allowBlank: false
					},{
						name : 'hub',
						type : 'string',
						allowBlank : false
					}, {
						name : 'no_ktp',
						type : 'string'
					}, {
						name : 'nama',
						type : 'string',
						allowBlank: false
					}, {
						name : 'kelamin',
						type : 'string',
						allowBlank: false
					}, {
						name : 'tempat_lahir',
						type : 'string'
					}, // automatic date conversions
					{
						name : 'tanggal_lahir',
						type : 'date',
						dateFormat : 'Y-m-d',
						allowBlank:false
					}, {
						name : 'status_kawin',
						type : 'string',
						allowBlank:false
					}, {
						name : 'agama',
						type : 'string',
						allowBlank:false
					}, {
						name : 'pendidikan',
						type : 'string',
						allowBlank:false
					}, {
						name : 'pekerjaan',
						type : 'string'
					}, {
						name : 'rt',
						//type : 'float',
						allowBlank:false
					}, {
						name : 'rw',
						//type : 'float',
						allowBlank:false
					}, {
						name : 'dusun',
						type : 'string',
						allowBlank:false
					}, {
						name : 'baca_tulis',
						type : 'string',
						allowBlank:false
					}		
		]
);

var writerEvent = new Ext.data.JsonWriter({
			encode : true,
			writeAllFields : false
});

var dsEvent = new Ext.data.Store({
			proxy : proxyEvent,
			reader : readerEvent,
			writer : writerEvent,
			autoSave : true,
			sortInfo : {
				field : 'id_penduduk',
				direction : 'ASC'
			},
			remoteSort : false,
			listeners : {
				write : function(store, action, result, res, rs) {
					// App.setAlert(res.success, res.message); // <-- show
					// user-feedback for all write actions
					Ext.example.msg('Save', res.raw.message.note);
				},
				beforewrite : function() {
				},
				exception : function(proxy, type, action, options, res, arg) {
					res = Ext.decode(res.responseText);   
					if (type === 'response') {
						Ext.Msg.show({
									title : 'ERROR EXCEPTION',
									msg : res.message.error[0],
									buttons : Ext.MessageBox.OK,
									icon: Ext.MessageBox.ERROR
								});
					}else 
						Ext.Msg.show({
									title : 'ERROR EXCEPTION',
									msg : 'Duplicate Key of Hubungan Kepala Keluarga',
									buttons : Ext.MessageBox.OK,
									icon: Ext.MessageBox.ERROR
								});
					
					
				}

			}
		});

function formatDate(value) {
	return value ? value.dateFormat('d/m/Y') : '';
};
		
var dsKeluarga1 = new Ext.data.SimpleStore({
	fields:['hubungan'],
	data:[['Kepala Keluarga'],['Orang Tua'],['Anak'],['Menantu'],['Istri'],['Suami'],['Cucu'],['Famili Lain']]
});

var dsBaca = new Ext.data.SimpleStore({
	fields:['baca'],
	data:[['Bisa'],['Tidak Bisa']]
});

var cmDetail = new Ext.grid.ColumnModel({
	defaults : {
		sortable : true
	},
	columns : [
			new Ext.grid.RowNumberer(),
			{
				dataIndex : 'id_penduduk',
				hidden : true,
				hideable : false,
				menuDisabled : true
			}, {
				header: 'No KK',
				dataIndex: 'no_kk',
				width: 120,
				editor: {
					xtype: 'textfield'
				}
			},{
				header : "Hubungan",
				dataIndex : 'hub',
				width : 80,
				align : 'left',
				editor : {
					xtype : 'combo',
					typeAhead : true,
					triggerAction : 'all',
					store : dsKeluarga1,
					mode : 'local',
					displayField : 'hubungan',
					valueField : 'hubungan',
					lazyRender : true,
					listClass : 'x-combo-list-small'
				}
			}, {
				header : "No KTP",
				dataIndex : 'no_ktp',
				width : 120,
				editor : {
					xtype : 'textfield'
				}
			}, {
				id : 'nama',
				header : "Nama",
				dataIndex : 'nama',
				width : 150,
				editor : {
							xtype: 'textfield'
						}
			}, {
				header : "Jenis Kelamin",
				dataIndex : 'kelamin',
				width : 100,
				align : 'left',
				editor : {
					xtype : 'combo',
					typeAhead : true,
					triggerAction : 'all',
					store : dsgender,
					mode : 'local',
					displayField : 'EMP_GENDER',
					valueField : 'GENDER_VALUE',
					lazyRender : true,
					listClass : 'x-combo-list-small'
				}
			}, {
				header : "Tempat Lahir",
				dataIndex : 'tempat_lahir',
				width : 100,
				editor : {
					xtype : 'textfield'
				}
			}, {
				header : "Tanggal Lahir",
				dataIndex : 'tanggal_lahir',
				width : 100,
				renderer : formatDate,
				editor : {
					xtype : 'datefield',
					format : 'd/m/Y',
					maxValue : (new Date()).clearTime(),
					disabledDaysText : 'Tanggal lahir harus lebih kecil dari besok'
				}
			}, {
				header : "Status Kawin",
				dataIndex : 'status_kawin',
				width : 100,
				align : 'left',
				editor : {
					xtype : 'combo',
					typeAhead : true,
					triggerAction : 'all',
					store : dsmarital,
					mode : 'local',
					displayField : 'MARITAL_STATUS',
					valueField : 'MARITAL_STATUS',
					lazyRender : true,
					listClass : 'x-combo-list-small'
				}
			}, {
				header : "Agama",
				dataIndex : 'agama',
				width : 100,
				align : 'left',
				editor : {
					xtype : 'combo',
					typeAhead : true,
					triggerAction : 'all',
					store : dsregion,
					mode : 'local',
					displayField : 'REGION_1',
					valueField : 'REGION_2',
					lazyRender : true,
					listClass : 'x-combo-list-small'
				}
			}, {
				header : "Pendidikan",
				dataIndex : 'pendidikan',
				width : 100,
				align : 'left',
				editor : {
					xtype : 'combo',
					typeAhead : true,
					triggerAction : 'all',
					store : dsPendidikan,
					mode : 'local',
					displayField : 'PENDIDIKAN',
					valueField : 'PENDIDIKAN',
					lazyRender : true,
					listClass : 'x-combo-list-small'
				}
			}, {
				header : "Pekerjaan",
				dataIndex : 'pekerjaan',
				width : 100,
				editor : {
					xtype : 'textfield'
				}
			}, {
				header : "RT",
				dataIndex : 'rt',
				align : 'right',
				width : 40,
				editor : {
					xtype : 'textfield',
                                        vtype:'angka'
				}
			}, {
				header : "RW",
				dataIndex : 'rw',
				align : 'right',
				width : 40,
				editor : {
					xtype : 'textfield',
                                        vtype : 'angka'
				}
			}, {
				header : "Dusun",
				dataIndex : 'dusun',
				width : 80,
				align : 'left',
				editor : {
					xtype : 'combo',
					typeAhead : true,
					triggerAction : 'all',
					store : dsDusun,
					mode : 'local',
					displayField : 'dusun',
					valueField : 'dusun',
					lazyRender : true,
					listClass : 'x-combo-list-small'
				}
			}, {
				header : "Baca Tulis",
				dataIndex : 'baca_tulis',
				width : 60,
				align : 'left',
				editor : {
					xtype : 'combo',
					typeAhead : true,
					triggerAction : 'all',
					store : dsBaca,
					mode : 'local',
					displayField : 'baca',
					valueField : 'baca',
					lazyRender : true,
					listClass : 'x-combo-list-small'
				}
			}	
	]
});

var grid = new Ext.grid.EditorGridPanel({
	title : 'Tambah Data Penduduk',
	ds : dsEvent,
	cm : cmDetail,
	clicksToEdit : 1,
	stripeRows : true,
	tbar: [
	{
		text : 'Tambah Data',
		iconCls : 'table-add',
                disabled: checkRole(!ROLE.ADD_DATA),
		id:'add-row',
		tooltip : {
			title : 'Tambah Data',
			text : 'Add new Row on Grid (shift + a)'
		},
		handler: function(){
		if (!checkRole(ROLE.ADD_DATA)){
			this.disable(); 
			return false; 
		}	
			var u = new dsEvent.recordType({
						id_penduduk : '',
						no_kk :'',
						hub:'',
						no_ktp:'',
						nama:'',
						kelamin:'',
						tempat_lahir:'',
						tanggal_lahir:'',
						status_kawin:'',
						agama:'',
						pendidikan:'',
						pekerjaan:'',
						rt:'',
						rw:'',
						dusun:'',
						baca_tulis:''
			});
			grid.stopEditing(); 
			dsEvent.add(u); 
			grid.getSelectionModel().select(dsEvent.getCount() - 1,1);
			grid.startEditing(dsEvent.getCount() - 1, 2);
		}
		
	},'-',
	{
		text : 'Duplicate',
		iconCls : 'duplicate',
                disabled: checkRole(!ROLE.DUPLICATE_DATA),
		id:'dd-row',
		tooltip : {
			title : 'Duplicate',
			text : 'Duplicate Selected Row (shift + d)'
		},
		handler:function(){
			if (!checkRole(ROLE.DUPLICATE_DATA)){
				this.disable();
				return false; 			
			}
			a = grid.getSelectionModel().getSelectedCell();
			if (a != null) {
				rs = dsEvent.getAt(a[0]).copy();
				rs.data.id_penduduk ='';
				rs.data.nama ='';
				rs.data.hub =(rs.data.hub=='Kepala Keluarga')?'':rs.data.hub;
				rs.data.no_ktp=''; 
				rs.data.tanggal_lahir ='';
				rs = rs.data;
				data = new dsEvent.recordType(rs);
				dsEvent.insert(a[0] + 1, data);
				grid.getSelectionModel().select(a[0] + 1, a[1]);
			}
			
		}
	},'-',
	{
		text : 'Remove Selected Row',
		iconCls : 'row-delete',
                disabled: checkRole(!ROLE.DELETE_DATA),
		id:'rm-row',
		tooltip : {
			title : 'Remove Selected Row',
			text : 'Remove Selected row on grid (shift + r)'
		},
		handler: function(){
			if (!checkRole(ROLE.DELETE_DATA)){
				this.disable();
				return false; 		
			}
			a = grid.getSelectionModel().getSelectedCell();
			if (a != null) {
				dsEvent.remove(dsEvent.getAt(a[0]));
				if (dsEvent.getCount() > 0) {
					if (a[0] > 0)
						grid.getSelectionModel().select(a[0] - 1, a[1]);
					else
						grid.getSelectionModel().select(a[0], a[1]);
				}
			}
			
		}
	},'->',{
            text: 'Download Template Excel',
            iconCls:'report-xls',
            disabled: checkRole(!ROLE.DOWNLOAD_XLS),
            tooltip: {
                title:'Download Template Excel',
                text:'This Template use to create csv file'
            },
            handler : function(){
                if (!checkRole(ROLE.DOWNLOAD_XLS)){
                        this.disable();
                        return false;
                }
                document.location.href = 'excel/template_excel.xls';
            }
        },'-',
	{
		text:'Upload Csv File',
		iconCls:'upload',
                disabled: checkRole(!ROLE.UPLOAD_CSV),
		tooltip : {
			title:'Upload Csv File',
			text:'Quick Insert with Csv File'
		},
		handler:function(){
			if (!checkRole(ROLE.UPLOAD_CSV)){
				this.disable();
				return false; 				
			}
			win_upload.show(this.id); 
		}
	}
	],
	keys:[
	{
		key:'a',
		shift:true,
		handler: function(){
				btn = Ext.getCmp('add-row'); 
				btn.handler.call(btn.scope); 
		}
	},{
		key:'d',
		shift:true,
		handler: function(){
				btn = Ext.getCmp('dd-row'); 
				btn.handler.call(btn.scope); 
		}
		
	},{
		key:'r',
		shift:true,
		handler: function(){
				btn = Ext.getCmp('rm-row'); 
				btn.handler.call(btn.scope); 
		}
		
	}
	],
	listeners: {
		afteredit: function(o){
			if (o.column < grid.getColumnModel().getColumnCount()-1) {
				grid.getSelectionModel().select(o.row,o.column+1);
				grid.startEditing(o.row,o.column+1); 
			} else {
				btn = Ext.getCmp('add-row'); 
				//btn.handler.call(btn.scope); 
				
			}
		}
	}
}); 

var form_upload = new Ext.FormPanel({
	bodyStyle:'padding: 5 5 0 5',
	frame:true,
	labelWidth: 100, 
	fileUpload:true,
	defaults: {
		anchor:'95%',
		allowBlank:false,
		msgTarget:'side',
		labelSeparator:''
	},
	items: [
	{
		xtype:'fileuploadfield',
		id:'f-csv',
		fieldLabel:'File Name',
		emptyText:'Select Csv File Format',
		name:'fcsv',
		buttonText:'',
		buttonCfg: {
			iconCls:'upload'
		}
	}
	]
}); 

var win_upload = new Ext.Window({
	layout : 'fit',
	id : 'win_upload',
	width : 400,
	height : 120,
	closeAction : 'hide',
	iconCls : 'upload',
	title : 'Upload Csv File',
	modal : true,
	plain : false,
	border : false,
	items: form_upload,
	buttons: [
	{
		text:'Upload',
		handler: function() {
			if (form_upload.getForm().isValid()){
				if (!validateFileExtension(Ext.getDom('f-csv').value)){
					Ext.MessageBox.show({
						title : 'Warning',
						msg : 'Incorrect File Type',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING
					});
					
				} else 
					form_upload.getForm().submit({
						waitMsg :'Uploading File',
						url:ajax_url,
						params : {
							task:'upload'
						},
						success: function(a,b){
							Ext.MessageBox.show({
								title : 'Success',
								msg : 'Data has been Upload',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
							form_upload.getForm().reset(); 
							win_upload.hide(); 
						},
						failure: function(a,b){
							textError =''; 
							Ext.each(b.result.err,function(r,i){
								textError += r + " <br />"; 
							}
							); 
							Ext.MessageBox.show({
								title : 'Failed Insert Query',
								msg : textError,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.WARNING
							});
							
						}
					})
			}
			
		}
	},{
		text:'Close',
		handler: function() {
			win_upload.hide(); 
		}
	}
	]
}); 

var main_content ={
	xtype : 'tabpanel',
	id : 'main_content',
	plain : true, // remove the header border
	activeItem : 0,
	items: grid,
	listeners: {
		destroy: function(){
			mywin = Ext.getCmp('win_upload'); 
			if (mywin)
				mywin.destroy(); 
		}
	}
}