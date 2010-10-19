/** untuk menandakan bahwa script ini valid dan akan di eksekusi * */
valid_script = true;
ajax_url = 'ajax.handler.php?id=' + page;
/** =============================================================* */

var form_datang = new Ext.form.FormPanel({
			region : 'north',
			height: 320,
			cmargins:'0 0 3 0',
			autoScroll:true,
			id : 'form_datang',
			iconCls : 'form',
			title : 'Keterangan Pendatang',
			bodyStyle : "padding: 10px;",
			frame : true,
			xtype : 'form',
			collapsible:true,
			labelAlign : 'left',
			labelWidth : 150,
			defaults : {
				labelSeparator : ''
			},
			defaultType : 'textfield',
			items : [{
						fieldLabel : 'Tanggal Datang',
						name : 'tgl_datang',
						xtype : 'datefield',
						format : 'd/m/Y',
						maxValue : (new Date()).clearTime(),
						width : 100,
						allowBlank : false
					}, {
						fieldLabel : 'Alamat Asal',
						name : 'alamat',
						allowBlank : false,
						anchor : '95%'
					}, {
						fieldLabel : 'Kelurahan Asal',
						name : 'kelurahan',
						allowBlank : false,
						anchor : '95%'
					}, {
						fieldLabel : 'Kecamatan Asal',
						name : 'kecamatan',
						allowBlank : false,
						anchor : '95%'
					}, {
						fieldLabel : 'Kabupaten/Kota',
						name : 'kabupaten',
						allowBlank : false,
						anchor : '95%'
					}, {
						fieldLabel : 'Propinsi',
						name : 'propinsi',
						allowBlank : false,
						anchor : '95%'
					}, {
						fieldLabel : 'Alasan Datang',
						name : 'alasan_datang',
						allowBlank : true,
						xtype : 'textarea',
						height : 30,
						anchor : '95%'
					}, {
						xtype : 'hidden',
						name : 'id_datang'
					}, {
						xtype : 'hidden',
						name : 'id_penduduk'
					}, {
						xtype : 'hidden',
						name : 'group_datang'
					},{
						xtype:'combo',
						fieldLabel:'Status Kartu Keluarga',
						id:'cstatus',
						width:200,
						mode:'local',
						store: new Ext.data.SimpleStore({
							fields: ['id','status'],
							data:[[1,'Kartu Keluarga Baru'],[2,'Ikut Kepala Keluarga Dari']]
						}),
						displayField:'status',
						valueField:'id',
						triggerAction:'all',
						hiddenName:'sc',
						allowBlank:false,
						listeners: {
							change: function(a,b){
								dsDatang.removeAll(); 
/*								if (b ==1){
									Ext.getCmp('nokk1').enable(); 
									Ext.getCmp('nokk2').disable();
								}else {
									Ext.getCmp('nokk2').enable(); 
									Ext.getCmp('nokk1').disable();									
								}
*/							},
							render: function(){
								this.setValue(1); 
							}
						}
					},{
						xtype:'textfield',
						id:'nokk1',
						fieldLabel:'No KK Baru',
						disabled:false,
						width: 200
					},{
						xtype:'trigger',
						id:'nokk2',
						fieldLabel:'Anggota Dari',
						//disabled:true,
						width:200,
						enableKeyEvents : true,
						listeners: {
							specialkey: function(o, e){
								if (e.getKey() == e.ENTER){
									winGrid.show(this.id);  
								}
									
							}
						},
						onTriggerClick: function(){
							if (!this.disabled)
								winGrid.show(this.id);  
						}
					},{
						xtype:'hidden',
						name:'anggota_dari'
					},{
						xtype:'hidden',
						name:'no_kk'
					}
				]	
		});

var filtersx = new Ext.ux.grid.GridFilters({
			filters : [{
						type : 'string',
						dataIndex : 'no_ktp'
					}, {
						type : 'string',
						dataIndex : 'no_kk'
					}, {
						type : 'string',
						dataIndex : 'nama'
					}, {
						type : 'list',
						dataIndex : 'kelamin',
						options : filtergender,
						phpMode : true
					}, {
						type : 'string',
						dataIndex : 'tempat_lahir'
					}, {
						type : 'date',
						dataIndex : 'tanggal_lahir'
					}, {
						type : 'list',
						dataIndex : 'status_kawin',
						options : filterMarital,
						phpMode : true
					}, {
						type : 'list',
						dataIndex : 'agama',
						options : filterAgama,
						phpMode : true
					}, {
						type : 'list',
						dataIndex : 'pendidikan',
						options : filterPendidikan,
						phpMode : true
					}, {
						type : 'string',
						dataIndex : 'pekerjaan'
					}, {
						type : 'list',
						dataIndex : 'baca_tulis',
						options : filterBaca,
						phpMode : true
					}, {
						type : 'numeric',
						dataIndex : 'rt'
					}, {
						type : 'numeric',
						dataIndex : 'rw'
					}, {
						type : 'list',
						dataIndex : 'dusun',
						options : filterDusun,
						phpMode : true
					}
			// {type: 'boolean', dataIndex: 'status'}
			]
		});
var cmx = new Ext.grid.ColumnModel({
	defaults : {
		sortable : true
	},
	columns : [{
		width : 25,
		hideable : false,
		menuDisabled : true,
		fixed : true,
		css : 'background-image:url(extjs/resources/images/default/grid/grid3-special-col-bg.gif);',
		renderer : function(val, cell, rec, row, col, st) {
			// console.log(st.lastOptions); menampilkan di console js
			the_start = st.lastOptions.params.start;
			the_number = row + 1 + the_start;
			// cell.attr = 'style= background:#eee url(images/cmp-bg.gif)
			// repeat-x;'
			return the_number;
		},
		align : 'center'
	}, {
		dataIndex : 'id_penduduk',
		hidden : true,
		hideable : false,
		menuDisabled : true
	}, {
		dataIndex : 'no_kk',
		header : 'No KK',
		width : 100
	}, {
		dataIndex : 'no_ktp',
		header : 'No KTP',
		width : 100
	}, {
		dataIndex : 'nama',
		header : 'Nama',
		id : 'nama',
		width : 150
	}, {
		dataIndex : 'kelamin',
		header : 'Gender',
		width : 70
	}, {
		dataIndex : 'rt',
		header : 'RT',
		width : 40
	}, {
		dataIndex : 'rw',
		header : 'RW',
		width : 40
	}, {
		dataIndex : 'dusun',
		header : 'Dusun',
		width : 70
	}, {
		dataIndex : 'tempat_lahir',
		header : 'Tempat Lahir',
		width : 100
	}, {
		dataIndex : 'tanggal_lahir',
		header : 'Tanggal Lahir',
		renderer : Ext.util.Format.dateRenderer('d/m/Y'),
		width : 75
	}, {
		dataIndex : 'status_kawin',
		header : 'Status Kawin',
		width : 90
	}, {
		dataIndex : 'agama',
		header : 'Agama',
		width : 70
	}, {
		dataIndex : 'pendidikan',
		header : 'Pendidikan',
		width : 70
	}, {
		dataIndex : 'pekerjaan',
		header : 'Pekerjaan',
		width : 100
	}, {
		dataIndex : 'baca_tulis',
		header : 'Baca Tulis',
		width : 70
	}]
});
var dsWindows = new Ext.data.JsonStore({
			url : ajax_url,
			id : 'id',
			totalProperty : 'total',
			baseParams : {
				task : 'getData'
			},
			root : 'data',
			fields : [{
						name : 'id_penduduk'
					}, {
						name : 'no_ktp'
					}, {
						name : 'no_kk'
					}, {
						name : 'nama'
					}, {
						name : 'kelamin'
					}, {
						name : 'tempat_lahir'
					}, {
						name : 'tanggal_lahir',
						type : 'date',
						dateFormat : 'Y-m-d'
					}, {
						name : 'status_kawin'
					}, {
						name : 'agama'
					}, {
						name : 'pendidikan'
					}, {
						name : 'pekerjaan'
					}, {
						name : 'baca_tulis'
					}, {
						name : 'rt'
					}, {
						name : 'rw'
					}, {
						name : 'dusun'
					}

			],
			sortInfo : {
				field : 'nama',
				direction : 'ASC'
			},
			remoteSort : true
		});
var hapusFilter = true;		
var gridWindows = new Ext.grid.GridPanel({
	// layout:'fit',
	ds : dsWindows,
	cm : cmx,
	sm : new Ext.grid.RowSelectionModel({
				singleSelect : true
			}),
	stripeRows : true,
	enableColLock : false,
	loadMask : true,
	plugins : filtersx,
	listeners : {
		render : function() {

		}
	},
	bbar : new Ext.PagingToolbar({
		store : dsWindows,
		pageSize : 30,
		plugins : filtersx,
		displayInfo : true,
		displayMsg : 'Displaying Data {0} - {1} of {2}',
		emptyMsg : "No Data to display",
		items : ['-', {
			// text:'Clear Filter',
			tooltip : {
				title : 'Clear Filter',
				text : 'Clear Searching Filter'
			},
			iconCls : 'drop',
			handler : function() {
				filtersx.clearFilters();
				for (i = 0; i < gridWindows.getColumnModel().getColumnCount(); i++)
					if (gridWindows.getColumnModel().isMenuDisabled(i) == false)
						gridWindows.getColumnModel().setHidden(i, false);
				// dsWindows.load({params:{start: 0, limit: 30}});
			}
		}]
	})
});

var winGrid = new Ext.Window({
	layout : 'fit',
	id : 'winGrid',
	width : 720,
	height : 400,
	closeAction : 'hide',
	iconCls : 'app-grid',
	title : 'Lihat Data Penduduk',
	modal : true,
	plain : true,
	border : false,
	items : [gridWindows

	],
	buttons : [{
		text : 'Select Data',
		handler : function() {
			if (gridWindows.getSelectionModel().hasSelection()) {
				data = gridWindows.getSelectionModel().getSelected().data; 
				form_datang.getForm().setValues({
										no_kk : data.no_kk,
										anggota_dari: data.id_penduduk,
										nokk2: data.nama
									})
				winGrid.hide();
				form_datang.body.highlight('#c3daf9', {
							block : true
						});
			}
		}
	}, {
		text : 'Close',
		handler : function() {
			winGrid.hide();
		}
	}],
	listeners : {
		show : function() {
			if (hapusFilter) {
				filtersx.clearFilters();
				for (i = 0; i < gridWindows.getColumnModel().getColumnCount(); i++)
					if (gridWindows.getColumnModel().isMenuDisabled(i) == false)
						gridWindows.getColumnModel().setHidden(i, false);
			}
			hapusFilter = false;
			dsWindows.load({
						params : {
							start : 0,
							limit : 30
						}
					});
		}
	}

});
		
var dsDatang = new Ext.data.SimpleStore({
			fields : [{
						name : 'id_penduduk'
					}, {
						name:'anggota_dari'
					},{
						name:'no_kk'
					},{
						name : 'h_keluarga',
						type : 'string'
					}, {
						name : 'no_ktp',
						type : 'string'
					}, {
						name : 'nama',
						type : 'string'
					}, {
						name : 'kelamin',
						type : 'string'
					}, {
						name : 'tempat_lahir',
						type : 'string'
					}, // automatic date conversions
					{
						name : 'tanggal_lahir',
						type : 'date',
						dateFormat : 'Y-m-d'
					}, {
						name : 'status_kawin',
						type : 'string'
					}, {
						name : 'agama',
						type : 'string'
					}, {
						name : 'pendidikan',
						type : 'string'
					}, {
						name : 'pekerjaan',
						type : 'string'
					}, {
						name : 'rt'//,type : 'float'
					}, {
						name : 'rw'//,type : 'float'
					}, {
						name : 'dusun',
						type : 'string'
					}, {
						name : 'baca_tulis',
						type : 'bool'
					}, {
						name : 'anggota_dari',
						type : 'string'
					}]
		});

function formatDate(value) {
	return value ? value.dateFormat('d/m/Y') : '';
};

var checkColumn = new Ext.grid.CheckColumn({
			header : "Bisa Baca Tulis",
			dataIndex : 'baca_tulis',
			width : 80
		});

var fm = Ext.form;
var cmDatang = new Ext.grid.ColumnModel({
	defaults : {
		sortable : false
	},
	columns : [{
				dataIndex : 'id_penduduk',
				hidden : true,
				hideable : false,
				menuDisabled : true
			},{
				dataIndex : 'no_kk',
				hidden : true,
				hideable : false,
				menuDisabled : true				
			},{
				dataIndex : 'anggota_dari',
				hidden : true,
				hideable : false,
				menuDisabled : true								
			},{
				header : "Hubungan",
				dataIndex : 'h_keluarga',
				width : 80,
				align : 'left',
				editor : {
					xtype : 'combo',
					typeAhead : true,
					triggerAction : 'all',
					store : dsKeluarga,
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
					xtype : 'textfield',
					allowBlank : true
				}
			}, {
				id : 'nama',
				header : "Nama",
				dataIndex : 'nama',
				width : 150,
				editor : new fm.TextField({
							allowBlank : false
						})
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
					xtype : 'textfield',
					allowBlank : true
				}
			}, {
				header : "Tanggal Lahir",
				dataIndex : 'tanggal_lahir',
				width : 100,
				renderer : formatDate,
				editor : {
					xtype : 'datefield',
					format : 'd/m/Y',
					allowBlank : false,
					maxValue : (new Date()).clearTime(),
					// minValue: '01/01/06',
					// disabledDays: [0, 6],
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
					xtype : 'textfield',
					allowBlank : true
				}
			}, {
				header : "RT",
				dataIndex : 'rt',
				align : 'right',
				width : 40,
				editor : {
					xtype : 'textfield',
					allowBlank : false,
                                        vtype:'angka'
				}
			}, {
				header : "RW",
				dataIndex : 'rw',
				align : 'right',
				width : 40,
				editor : {
					xtype : 'textfield',
					allowBlank : false,
                                        vtype:'angka'
				}
			}, {
				header : "Dusun",
				dataIndex : 'dusun',
				width : 100,
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
			}, checkColumn, {
				dataIndex : 'anggota_dari',
				hidden : true,
				hideable : false,
				menuDisabled : true
			}

	]
});
var gridDetail = new Ext.grid.EditorGridPanel({
	region : 'center',
	//height : 230,
	margins : '2 0 0 0',
	cmargins : '2 0 0 0',
	store : dsDatang,
	title:'Detail Pendatang',
	//collapsible : true,
	cm : cmDatang,
	frame : false,
	plugins : checkColumn,
	clicksToEdit : 1,
	tbar : [{
		text : 'Tambah Data',
		iconCls : 'table-add',
		tooltip : {
			title : 'Tambah Data',
			text : 'Add new Row on Grid'
		},
		handler : function() {
			hubungan = (dsDatang.getCount()) ? 'Anak' : 'Kepala Keluarga';
			x = Ext.getCmp('cstatus').getValue();
			hubungan = (x==1)?hubungan:'Anak'; 
			var u = new dsDatang.recordType({
						baca_tulis : true,
						h_keluarga : hubungan,
						no_ktp : '',
						anggota_dari : '0'
					});
			gridDetail.stopEditing();
			dsDatang.add(u);
			gridDetail.startEditing(dsDatang.getCount() - 1, 3);
			Ext.example.msg('Tambah Anggota',
					'Silahkan isi data Anggota Keluarga dengan lengkap!');
		}
	}, '-', {
		text : 'Duplicate',
		iconCls : 'duplicate',
		tooltip : {
			title : 'Duplicate',
			text : 'Duplicate Selected Row'
		},
		handler : function() {
			a = gridDetail.getSelectionModel().getSelectedCell();
			if (a != null) {
				rs = dsDatang.getAt(a[0]).copy();
				if (a[0] == 0)
					rs.data.h_keluarga = 'Anak';
				rs = rs.data;
				data = new dsDatang.recordType(rs);
				dsDatang.insert(a[0] + 1, data);
				gridDetail.getSelectionModel().select(a[0] + 1, a[1]);
				Ext.example.msg('Duplicate', 'Duplikasi data');
			}
		}
	}, '-', {
		text : 'Remove Selected Row',
		iconCls : 'row-delete',
		tooltip : {
			title : 'Remove Selected Row',
			text : 'Remove Selected row on grid'
		},
		handler : function() {
			a = gridDetail.getSelectionModel().getSelectedCell();
			if (a != null) {
				dsDatang.remove(dsDatang.getAt(a[0]));
				if (dsDatang.getCount() > 0) {
					if (a[0] > 0)
						gridDetail.getSelectionModel().select(a[0] - 1, a[1]);
					else
						gridDetail.getSelectionModel().select(a[0], a[1]);
				}
				Ext.example.msg('Hapus Detail', 'Baris {0} telah dihapus', a[0]
								+ 1);
			}
		}
	}, '-', {
		text : 'Clear Table',
		iconCls : 'table-delete',
		tooltip : {
			title : 'Clear Table',
			text : 'Clear All Row on Grid'
		},
		handler : function() {
			// gridDetail.getStore().rejectChanges();
			dsDatang.removeAll();
			Ext.example.msg('Clear Table', 'Semua data anggota telah dihapus!');
		}
	}, '->'
//	, {
//		text : 'Collapse',
//		iconCls : 'arrow-down',
//		handler : function() {
//			gridDetail.collapse();
//		}
//	}
	],
	listeners : {
		beforeedit : function(e) {
			x = Ext.getCmp('cstatus').getValue();
			if (x==1)
			if (e.row == 0 && e.column == 3) {
				e.cancel = true;
				this.startEditing(e.row, e.column + 1);
				 
			}
			//if (x==2)
				//this.startEditing(e.row, 3); 
		}
	}
});

var main_content = {
	xtype : 'tabpanel',
	id : 'main_content',
	plain : true, // remove the header border
	activeItem : 0,
	items : [{
		layout : 'fit',
		bodyStyle : 'padding:7px;',
		title : 'Form Pendatang',
		items : [{
					layout : 'border',
					region : 'center',
					// margins: '5 5 5 0',
					border : false,
					// bodyStyle: 'padding:15px;',
					// viewConfig:{forceFit:true},
					items : [form_datang, gridDetail]
				}],
		tbar : [{
			text : 'Save',
			iconCls : 'icon-save',
                        disabled: checkRole(!ROLE.SAVE_DATA),
			tooltip : {
				title : 'Save',
				text : 'Save Form and Grid'
			},
			handler : function() {
				if (!checkRole(ROLE.SAVE_DATA)){
					this.disable();
					return false; 		
				}
				var records = dsDatang.getModifiedRecords();
				var data = [];
				x = Ext.getCmp('cstatus').getValue(); 
				dsDatang.each(function(r, i) {
							var o = r.copy(); // mengcopy record agar aslinya
												// tidak dirubah...
							o = o.data;
							if (x ==2){
								o.anggota_dari = form_datang.getForm().getValues().anggota_dari;
								o.no_kk = form_datang.getForm().getValues().no_kk;
							} else {
								o.no_kk = form_datang.getForm().getValues().nokk1; 
								o.anggota_dari =0; 
							}
							data.push(o);
						});
                                if (!form_datang.getForm().isValid())
                                    return false;
				dataForm = form_datang.getForm().getValues();
                                xDate = new Date(); 
                                xDate = Date.parseDate(dataForm.tgl_datang,'d/m/Y');
				dataForm.tgl_datang = xDate.format('Y-m-d');
				from_anggota = true; 
				if (x==2)
					from_anggota = (form_datang.getForm().getValues().anggota_dari=="")?false:true; 
				if (from_anggota)
				if (data.length)
					if (form_datang.getForm().isValid())
						form_datang.getForm().submit({
							url : ajax_url,
							waitMsg : 'Saving Data',
							params : {
								task : 'addNew',
								dataGrid : Ext.encode(data),
								dataForm : Ext.encode(dataForm)
							},
							success : function(a, b) {
								form_datang.getForm().reset();
								gridDetail.store.removeAll();
								Ext.example.msg('Save Data',
										'Data has been successfully saved');
							},
							failure : function(a, b) {
								Ext.MessageBox.show({
											title : 'Error On Saving Data',
											msg : b.result.message.note,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
							}
						});
			}
		}, '-', {
			text : 'Reset Form',
			iconCls : 'drop',
			tooltip : {
				title : 'Reset Form',
				text : 'Clear Form and Grid'
			},
			handler : function() {
				form_datang.getForm().reset();
				gridDetail.store.removeAll();
				Ext.example.msg('Reset Form', 'Isian Form telah dibersihkan');
			}
		}]
	}],
	listeners : {
		destroy : function() {
			myWin = Ext.getCmp('winGrid');
			if (myWin)
				myWin.destroy();
		}
	}
};
