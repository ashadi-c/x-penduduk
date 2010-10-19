/** untuk menandakan bahwa script ini valid dan akan di eksekusi * */
valid_script = true;
ajax_url = 'ajax.handler.php?id=' + page;
/** =============================================================* */

/** -------------->Tab 1 Browse Data <-------------------------* */

var ds = new Ext.data.JsonStore({
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
						name : 'umur'
					}, {
						name : 'umur_bln'
					}, {
						name : 'umur_hari'
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
					}, {
                                                name : 'picture'
                                        }

			],
			sortInfo : {
				field : 'nama',
				direction : 'ASC'
			},
			remoteSort : true
		});

/**
 * contoh jangan dihapus coi //ambil sorting dari array var opt = new Array();
 * opt[0] ='small'; opt[1] ='medium'; opt[2] ='large'; opt[3] = 'extra large';
 * 
 * var filters = new Ext.ux.grid.GridFilters({ filters:[ // {type: 'numeric',
 * dataIndex: 'id'}, {type: 'string', dataIndex: 'company'}, {type: 'numeric',
 * dataIndex: 'price'}, { type: 'list', dataIndex: 'size', //options: ['small',
 * 'medium', 'large', 'extra large'], options:opt, phpMode: true }, {type:
 * 'date', dataIndex: 'date'}, {type: 'boolean', dataIndex: 'visible'} ]});
 */

var filters = new Ext.ux.grid.GridFilters({
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
						type : 'numeric',
						dataIndex : 'umur'
					}, {
						type : 'numeric',
						dataIndex : 'umur_bln'
					}, {
						type : 'numeric',
						dataIndex : 'umur_hari'
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
var expander = new Ext.ux.grid.RowExpander({
    tpl : new Ext.XTemplate(
        "<div><img class='foto' src='upload_foto/{picture}' /></div>",
         "<div><span class='nama'>{nama} [{no_ktp}]</span>",
         "<br /><span>Jenis Kelamin : {kelamin} </span><br />",
         "<span>Tempat/Tgl Lahir : {tempat_lahir}, {[values.tanggal_lahir.format('d/m/Y')]} </span><br />",
         "<span>Agama : {agama} </span><br />",
         "<span>Agama : {agama} </span><br />",
         "<span>RT/RW : {rt}/{rw} </span><br />",
         "</div>"
    )
});

var cm = new Ext.grid.ColumnModel({
	defaults : {
		sortable : true
	},
	columns : [//{
//		width : 25,
//		hideable : false,
//		menuDisabled : true,
//		fixed : true,
//		css : 'background-image:url(extjs/resources/images/default/grid/grid3-special-col-bg.gif);',
//		renderer : function(val, cell, rec, row, col, st) {
//			// console.log(st.lastOptions); menampilkan di console js
//			the_start = st.lastOptions.params.start;
//			the_number = row + 1 + the_start;
//			// cell.attr = 'style= background:#eee url(images/cmp-bg.gif)
//			// repeat-x;border-top:1px solid #ddd;border-bottom:1px solid
//			// #ccc;';
//			return the_number;
//		},
//		align : 'center'
//	},
            expander,
	 {
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
		dataIndex : 'tempat_lahir',
		header : 'Tempat Lahir',
		width : 100
	}, {
		dataIndex : 'tanggal_lahir',
		header : 'Tanggal Lahir',
		renderer : Ext.util.Format.dateRenderer('d/m/Y'),
		width : 75
	}, {
		dataIndex : 'umur',
		header : 'Umur (Thn)',
		width : 65,
		align : 'center'
	}, {
		dataIndex : 'umur_bln',
		header : 'Bulan',
		width : 50,
		align : 'center'
	}, {
		dataIndex : 'umur_hari',
		header : 'Hari',
		width : 50,
		align : 'center'
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
	}
	// {dataIndex:'id_penduduk',header:'Delete',width:50,hideable:false,menuDisabled:true,sortable:false,
	// renderer: function() {
	// return "<center><img style='cursor: pointer;padding:0 0 0 0;margin:0 0 0
	// 0;' src='images/panel-close.gif'></img></center>";
	// }
	// }
	]
});
// cm.defaultSortable = true;

// menambah combo box
var limit_store = new Ext.data.SimpleStore({
	fields : ['limit'],
	data : [[30], [50], [100]]
		// from states.js
	});

var limit_combo = new Ext.form.ComboBox({
			store : limit_store,
			displayField : 'limit',
			valueField : 'limit',
			typeAhead : true,
			mode : 'local',
			triggerAction : 'all',
			//readOnly : true,
			selectOnFocus : true,
			width : 45
		});
limit_combo.setValue(30);

limit_combo.on("select", function() {
			Ext.getCmp('pagingBar').pageSize = parseInt(limit_combo.getValue());
			ds.load({
						params : {
							start : 0,
							limit : parseInt(limit_combo.getValue())
						}
					});
		});

var grid = new Ext.grid.GridPanel({
	title : 'Data Kepala Keluarga',
	region : 'center',
	iconCls : 'parent-form',
	// viewConfig:{forceFit:true}, //agar colom2 mengecil sendiri waktu diresize
	// windows
	layout : 'fit',
        showPreview:false,
	ds : ds,
	cm : cm,
	stripeRows : true,
	enableColLock : false,
	loadMask : true,
	plugins : [filters,expander],
	// autoExpandColumn: 'nama',
	tbar : [{
				text : 'Clear Selected',
				iconCls : 'drop',
				tooltip : {
					title : 'Clear Selected Item',
					text : 'Clear Selected row in grid'
				},
				handler : function() {
					grid.getSelectionModel().clearSelections();
					Ext.getCmp('form-edit').getForm().reset();
					store_detail.removeAll();
					Ext.getCmp('form-edit').collapse();
					Ext.getCmp('detail-grid').collapse();
					Ext.example.msg('Clear Grid',
							'Grid has been unselect (all)');
				}
			}, '-', {
				text : 'Remove Selected',
				id : 'remove-s',
                                disabled: checkRole(!ROLE.REMOVE_DATA),
				iconCls : 'table-delete',
				tooltip : {
					title : 'Remove Selected Item',
					text : 'Remove Selected row in grid'
				},
				handler : function() {
					if (!checkRole(ROLE.REMOVE_DATA)){
						this.disable();
						return false; 		
					}
					
					a = grid.getSelectionModel().getSelections();
					var data = [];
					Ext.each(a, function(r, i) {
								var o = r.copy(); // mengcopy record agar
													// aslinya tidak dirubah...
								o = o.data;
								for (cnt in o)
									if (Ext.isDate(o[cnt]))
										o[cnt] = Ext.util.Format.date(o[cnt],
												'd/m/Y');
								data.push({
											id_penduduk : o.id_penduduk
										});
							});
					if (data.length) {
						Ext.MessageBox.show({
							title : 'Delete?',
							msg : "Are You Sure to delete Selected(s) Data? <br />Detail Data (anggota keluarga) also will be deleted",
							buttons : Ext.MessageBox.YESNO,
							fn : function(a) {
								if (a == "yes") {
									Ext.getCmp('content-panel').body.mask(
											'Removing Data', 'x-mask-loading');
									Ext.Ajax.request({
										url : ajax_url,
										params : {
											task : "removeList",
											dataList : Ext.encode(data)
										},
										success : function(response) {
											Ext.getCmp('content-panel').body
													.unmask();
											var res = Ext
													.decode(response.responseText);
											if (res.success) {
												Ext.getCmp('form-edit')
														.getForm().reset();
												ds.reload();
												store_detail.removeAll();
												Ext.example
														.msg(
																'Remove Selected Item',
																'Data has been deleted from Database');

											} else {
												Ext.MessageBox.show({
													title : 'Alert',
													msg : 'Failed to Delete Data: Error Message : '
															+ res.msg,
													buttons : Ext.MessageBox.OK,
													animEl : 'remove-s',
													icon : Ext.MessageBox.ERROR
												});
											}
										}
									});
								}
							},
							animEl : 'remove-s',
							icon : Ext.MessageBox.WARNING
						});

					}
				}
			}, '-', {
				text : 'Detail',
				id : 'btn-detail',
				iconCls : 'setting',
				enableToggle : true,
				pressed : false,
				tooltip : {
					title : 'Detail Anggota',
					text : 'View Detail Anggota'
				},
				toggleHandler : function(btn, pressed) {
					if (pressed)
						Ext.getCmp('detail-grid').expand();
					else
						Ext.getCmp('detail-grid').collapse();
				}

			}, '-', {
				text : 'Edit Data',
				id : 'btn-edit',
				iconCls : 'form-edit',
				enableToggle : true,
				pressed : false,
				tooltip : {
					title : 'Edit Data',
					text : 'View Form Edit Data'
				},
				toggleHandler : function(btn, pressed) {
					if (pressed)
						Ext.getCmp('form-edit').expand();
					else
						Ext.getCmp('form-edit').collapse();
				}
			}, '-', {
				text : 'Print Mode',
				iconCls : 'report-mode',
				tooltip : {
					title : 'Report Mode',
					text : 'Choose report mode on PDF and Excel file format'
				},
				menu : new Ext.menu.Menu({
							items : [{
								text : 'PDF Format',
								checked : true,
								group : 'print',
								checkHandler : function() {
									Ext.getCmp('print').setText('Print (PDF)');
									Ext.getCmp('print')
											.setIconClass('report-pdf');
								}
							}, {
								text : 'Excel Format',
								checked : false,
								group : 'print',
								checkHandler : function() {
									Ext.getCmp('print').setText('Print (XLS)');
									Ext.getCmp('print')
											.setIconClass('report-xls');
								}
							}]
						})

			}, {
				text : 'Print (PDF)',
				id : 'print',
				iconCls : 'report-pdf',
                                disabled: checkRole(!ROLE.PRINT_DATA),
				tooltip : {
					title : 'Print',
					text : 'Save File to Disk'
				},
				handler : function() {
					if (!checkRole(ROLE.PRINT_DATA)){
						this.disable();
						return false; 		
					}
					option = grid.store.lastOptions.params;
					options = Ext.urlEncode(option);
					a = this.text;
					pdf = a.search(/PDF/);
					mode_report = (pdf > 0) ? "&mode=pdf" : "&mode=xls";
					report_link = 'report.php?id=' + page + mode_report + "&"
							+ options;
					rType = (pdf > 0) ? 'PDF' : 'XLS';
					winReport({
								id : this.id,
								title : 'Laporan Data Kepala Keluarga',
								url : report_link,
								type : rType
							});

				}
			}],
	bbar : new Ext.PagingToolbar({
				id : 'pagingBar',
				store : ds,
				pageSize : parseInt(limit_combo.getValue()),
				plugins : filters,
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
								filters.clearFilters();
							}
						}, '-', 'Display Per Page ', limit_combo,
                                                '-',{
                                                    text:'Show Picture',
                                                    enableToggle:true,
                                                    pressed:false,
                                                    iconCls:'image',
                                                    tooltip: {
                                                      title:'Show Picture',
                                                      text: 'Show Detail Data with Picture'
                                                    },
                                                    toggleHandler: function(btn, pressed){
                                                        grid.showPreview = pressed;
                                                        grid.getView().refresh();
                                                    }
                                                }

                                            ]
			})
});

// membuang filter jika pertama kali dibuka
filters.clearFilters();
for (i = 0; i < grid.getColumnModel().getColumnCount(); i++)
	if (grid.getColumnModel().isMenuDisabled(i) == false)
		grid.getColumnModel().setHidden(i, false);

// action grid
grid.getView().on("refresh",function(){
    ds.each(function(r,i){
        if (grid.showPreview)
            expander.expandRow(i);
        else
            expander.collapseRow(i);
    });
});

grid.on("celldblclick", function(a, b, c, d) {
	if (grid.getColumnModel().getColumnHeader(c) == "Delete")
		Ext.MessageBox.show({
			title : 'Delete?',
			msg : "Are You Sure to delete this? <br />Data Can't be Roolback after delete",
			buttons : Ext.MessageBox.YESNO,
			fn : function(a) {
				alert(a);
			},
			// animEl: 'mb4',
			icon : Ext.MessageBox.WARNING
		});
});

grid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
			Ext.getCmp('form-edit').getForm().setValues(r.data);
			store_detail.load({
						params : {
							start : 0,
							limit : 1000,
							id_penduduk : r.data.id_penduduk
						}
					});
		});

// meload data dari database
ds.load({
			params : {
				start : 0,
				limit : parseInt(limit_combo.getValue())
			}
		});

// untuk menambahkan filter secara dinamis
// buang dulu ya di inisialisasi yang atas
// filters.addFilter(
// {
// type: 'list',
// dataIndex: 'size',
// //options: ['small', 'medium', 'large', 'extra large'],
// options:opt,
// phpMode: true
// }
// );

/** -------------->End Of Tab1<-------------------------* */

var dsRemove = new Ext.data.SimpleStore({
			fields : [{
						name : 'id_penduduk',
						type : 'float'
					}]
		});

var recRemove = Ext.data.Record.create([{
			name : 'id_penduduk',
			type : 'float'
		}]);

/** grid detail * */
function formatDate(value) {
	return value ? value.dateFormat('d/m/Y') : '';
};
// shorthand alias
var fm = Ext.form;

var checkColumn = new Ext.grid.CheckColumn({
			header : "Bisa Baca Tulis",
			dataIndex : 'baca_tulis',
			width : 80
		});

var cmDetail = new Ext.grid.ColumnModel({
	defaults : {
		sortable : true
	},
	columns : [{
				dataIndex : 'id_penduduk',
				hidden : true,
				hideable : false,
				menuDisabled : true
			}, {
				header : "Hubungan",
				dataIndex : 'hub',
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
				dataIndex : 'jkel',
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
				dataIndex : 'tmp_lahir',
				width : 100,
				editor : {
					xtype : 'textfield',
					allowBlank : true
				}
			}, {
				header : "Tanggal Lahir",
				dataIndex : 'tgl_lahir',
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
				dataIndex : 'st_kawin',
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
			}, checkColumn

	]
});

// cmDetail.defaultSortable = true;

var Plant = Ext.data.Record.create([
// the "name" below matches the tag name to read, except "tgl_lahir"
		// which is mapped to the tag "availability"
		{
	name : 'id_penduduk',
	type : 'float'
}, {
	name : 'hub',
	type : 'string'
}, {
	name : 'no_ktp',
	type : 'string'
}, {
	name : 'nama',
	type : 'string'
}, {
	name : 'jkel',
	type : 'string'
}, {
	name : 'tmp_lahir',
	type : 'string'
}, // automatic date conversions
		{
			name : 'tgl_lahir',
			type : 'date',
			dateFormat : 'Y-m-d'
		}, {
			name : 'st_kawin',
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
			name : 'rt'//,
			//type : 'float'
		}, {
			name : 'rw'//,
			//type : 'float'
		}, {
			name : 'dusun',
			type : 'string'
		}, {
			name : 'baca_tulis',
			type : 'bool'
		}]);

// create the Data Store
var store_detail = new Ext.data.JsonStore({
			url : ajax_url,
			id : 'idx',
			totalProperty : 'total',
			baseParams : {
				task : 'getDetail'
			},
			root : 'data',
			fields : [{
						name : 'id_penduduk',
						type : 'float'
					}, {
						name : 'hub',
						type : 'string'
					}, {
						name : 'no_ktp',
						type : 'string'
					}, {
						name : 'nama',
						type : 'string'
					}, {
						name : 'jkel',
						type : 'string'
					}, {
						name : 'tmp_lahir',
						type : 'string'
					}, // automatic date conversions
					{
						name : 'tgl_lahir',
						type : 'date',
						dateFormat : 'Y-m-d'
					}, {
						name : 'st_kawin',
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
					}],
			sortInfo : {
				field : 'nama',
				direction : 'ASC'
			},
			remoteSort : false
		});

store_detail.on("load", function() {
	dsRemove.removeAll();
		// console.log('test');
	})
// create the editor grid
var gridDetail = new Ext.grid.EditorGridPanel({
	id : 'detail-grid',
	region : 'south',
	split : true,
	title : 'Detail Anggota',
	collapsible : true,
	collapsed : true,
	loadMask : true,
	enableColLock : false,
	margins : '0',
	height : 270,
	iconCls : 'browse',
	cmargins : '3 0 0 0',
	listeners : {
		collapse : function() {
			Ext.getCmp('btn-detail').toggle(false);
		},
		expand : function() {
			Ext.getCmp('btn-detail').toggle(true);
		}
	},
	store : store_detail,
	// viewConfig:{forceFit:true},
	cm : cmDetail,
	// frame:true,
	plugins : checkColumn,
	clicksToEdit : 1,
	tbar : [{
		text : 'Tambah Anggota Keluarga',
		iconCls : 'table-add',
                disabled: checkRole(!ROLE.ADD_CHILD),
		tooltip : {
			title : 'Tambah Anggota Keluarga',
			text : 'Add new Row on Grid'
		},
		handler : function() {
				if (!checkRole(ROLE.ADD_CHILD)){
					this.disable();
					return false; 		
				}
			
			if (grid.getSelectionModel().hasSelection()) {
				var p = new Plant({
							id_penduduk : 0,
							hub : 'Anak',
							no_ktp : '',
							nama : '',
							jkel : '',
							tmp_lahir : '',
							tgl_lahir : ''/** (new Date()).clearTime()* */
							,
							st_kawin : '',
							agama : '',
							pendidikan : '',
							pekerjaan : '',
							dusun : grid.getSelectionModel().getSelected().data.dusun,
							rt : grid.getSelectionModel().getSelected().data.rt,
							rw : grid.getSelectionModel().getSelected().data.rw,
							baca_tulis : true
						});
				gridDetail.stopEditing();
				store_detail.add(p);
				gridDetail.startEditing(store_detail.getCount() - 1, 1);
				Ext.example.msg('Tambah Anggota',
						'Silahkan isi data Anggota Keluarga dengan lengkap!');
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
				p_remove = new recRemove({
							id_penduduk : store_detail.getAt(a[0]).data.id_penduduk
						});
				if (store_detail.getAt(a[0]).data.id_penduduk)
					dsRemove.add(p_remove);
				store_detail.remove(store_detail.getAt(a[0]));
				if (store_detail.getCount() > 0) {
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
		text : 'Save',
		iconCls : 'icon-save',
                disabled: checkRole(!ROLE.SAVE_CHILD),
		id : 'save-d',
		tooltip : {
			title : 'Save',
			text : 'Save Modified Data on Grid'
		},
		handler : function() {
			if (!checkRole(ROLE.SAVE_CHILD)){
				this.disable();
				return false; 		
			}
			
			if (!grid.getSelectionModel().hasSelection())
				return;
			var data = [];
			store_detail.each(function(r, i) {
						var o = r.copy(); // mengcopy record agar aslinya
											// tidak dirubah...
						o = o.data;
						for (cnt in o)
							if (Ext.isDate(o[cnt]))
								o[cnt] = Ext.util.Format.date(o[cnt], 'Y-m-d');
						data.push(o);
					}, this);
			dataList = Ext.encode(data);

			var data = [];
			dsRemove.each(function(r, i) {
						var o = r.copy(); // mengcopy record agar aslinya
											// tidak dirubah...
						o = o.data;
						for (cnt in o)
							if (Ext.isDate(o[cnt]))
								o[cnt] = Ext.util.Format.date(o[cnt], 'Y-m-d');
						data.push(o);
					}, this);
			removeList = Ext.encode(data);

			Ext.MessageBox.show({
						msg : 'Saving data, please wait...',
						progressText : 'Saving...',
						wait : true,
						icon : 'ext-mb-download', // custom class in
													// msg-box.html
						animEl : 'save-d'
					});

			Ext.Ajax.request({
				url : ajax_url,
				params : {
					task : "editChild",
					dataList : dataList,
					removeList : removeList,
					parentId : grid.getSelectionModel().getSelected().data.id_penduduk,
					no_kk : grid.getSelectionModel().getSelected().data.no_kk
				},
				success : function(response) {
					setTimeout(function() {
						Ext.MessageBox.hide();
						var res = Ext.decode(response.responseText);
						if (res.success) {
							store_detail.reload();
							b = res;
							if (b.error.count > 0) {
								msg = "Data Saved but any error to save "
										+ b.error.count + " data detail <br>";
								msg += "Total successfully detail inserted : "
										+ b.insert + "<br>";
								Ext.each(b.error.msg, function(r, i) {
											msg += i + 1 + ". " + r + "<br>";
										}, this);
								Ext.MessageBox.show({
											title : 'Save Data',
											msg : msg,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.WARNING
										});

							} else
								Ext.example.msg('Save Data',
										'Data has been successfully saved');

						} else {
							msg = "";
							Ext.each(res.msg, function(r, i) {
										msg += i + 1 + ". " + r + "<br>";
									}, this);
							Ext.MessageBox.show({
								title : 'Alert',
								msg : 'Failed to Delete Data: Error Message : <br>'
										+ msg,
								buttons : Ext.MessageBox.OK,
								// animEl: n.id,
								icon : Ext.MessageBox.ERROR
							});
						}
					}, 2000);
				}
			});
		}
	}, '-', {
		text : 'Reload Grid',
		iconCls : 'drop',
		tooltip : {
			title : 'Reload Grid',
			text : 'Reload Grid From Database'
		},
		handler : function() {
			if (grid.getSelectionModel().hasSelection()) {
				store_detail.reload();
				Ext.example.msg('Reload Grid', 'Grid Detail has Been Reloaded');
			}
		}
	}]
});
// trigger the data store load

/** -----------------* */
var item1 = {
	layout : 'border',
	region : 'center',
	border : false,
	margins : '0 0 0 0',
	items : [grid, gridDetail]
};
var item2 = {
	region : 'east',
	id : 'form-edit',
	// split:true,
	iconCls : 'form',
	title : 'Edit Data',
	collapsible : true,
	collapsed : true,
	margins : '0 0 0 4',
	cmargins : '0 0 0 3',
	width : 200,
	bodyStyle : "padding: 4px;",
	xtype : 'form',
	labelAlign : 'top',
	labelWidth : 70,
	defaults : {
		anchor : '90%',
		labelSeparator : ''
	},
	defaultType : 'textfield',
	autoScroll : true,
	items : [{
				fieldLabel : 'Id Penduduk',
				name : 'id_penduduk',
				xtype : 'hidden',
				allowBlank : false
			}, {
				fieldLabel : 'No. Kartu Keluarga',
				name : 'no_kk',
				allowBlank : true
			}, {
				fieldLabel : 'No. KTP',
				name : 'no_ktp',
				allowBlank : true
			}, {
				fieldLabel : 'Nama',
				name : 'nama',
				allowBlank : false
			}, {
				fieldLabel : 'Jenis Kelamin',
				name : 'hkelamin',
				allowBlank : false,
				xtype : 'combo',
				store : dsgender,
				displayField : 'EMP_GENDER',
				valueField : 'GENDER_VALUE',
				triggerAction : 'all',
				mode : 'local',
				hiddenName : 'kelamin'
			}, {
				fieldLabel : 'Tempat Lahir',
				name : 'tempat_lahir',
				allowBlank : false
			}, {
				fieldLabel : 'Tanggal Lahir',
				name : 'tanggal_lahir',
				xtype : 'datefield',
				format : 'd/m/Y',
				maxValue : (new Date()).clearTime(),
				allowBlank : false
			}, {
				fieldLabel : 'Status Kawin',
				name : 'hstatus_kawin',
				allowBlank : false,
				xtype : 'combo',
				store : dsmarital,
				displayField : 'MARITAL_STATUS',
				valueField : 'MARITAL_STATUS',
				triggerAction : 'all',
				mode : 'local',
				hiddenName : 'status_kawin'

			}, {
				fieldLabel : 'Agama',
				name : 'hagama',
				allowBlank : false,
				xtype : 'combo',
				store : dsregion,
				displayField : 'REGION_1',
				valueField : 'REGION_2',
				triggerAction : 'all',
				mode : 'local',
				hiddenName : 'agama'

			}, {
				fieldLabel : 'Pendidikan',
				name : 'hpendidikan',
				allowBlank : false,
				xtype : 'combo',
				store : dsPendidikan,
				displayField : 'PENDIDIKAN',
				valueField : 'PENDIDIKAN',
				triggerAction : 'all',
				mode : 'local',
				hiddenName : 'pendidikan'
			}, {
				fieldLabel : 'Pekerjaan',
				name : 'pekerjaan',
				allowBlank : true
			}, {
				fieldLabel : 'Bisa Baca Tulis',
				name : 'hbaca_tulis',
				allowBlank : false,
				xtype : 'combo',
				store : dsBaca,
				displayField : 'ACTIVESTATUS',
				valueField : 'ACTIVESTATUS',
				triggerAction : 'all',
				mode : 'local',
				hiddenName : 'baca_tulis'
			}, {
				fieldLabel : 'RT',
				xtype : 'textfield',
				name : 'rt',
                                vtype:'angka',
				allowBlank : false
			}, {
				fieldLabel : 'RW',
				xtype : 'textfield',
                                vtype:'angka',
				name : 'rw',
				allowBlank : false
			}, {
				fieldLabel : 'Dusun',
				name : 'hdusun',
				allowBlank : false,
				xtype : 'combo',
				store : dsDusun,
				displayField : 'dusun',
				valueField : 'dusun',
				triggerAction : 'all',
				mode : 'local',
				hiddenName : 'dusun'
			}],
	listeners : {
		collapse : function() {
			Ext.getCmp('btn-edit').toggle(false);
		},
		expand : function() {
			Ext.getCmp('btn-edit').toggle(true);
		}
	},
	bbar : [{
		text : 'Save',
		iconCls : 'icon-save',
                disabled: checkRole(!ROLE.SAVE_PARENT),
		tooltip : {
			title : 'Save Form',
			text : 'Save Change to Database'
		},
		handler : function() {
			if (!checkRole(ROLE.SAVE_PARENT)){
				this.disable();
				return false; 		
			}
			
			frmEdt = Ext.getCmp('form-edit');
			id_pe = frmEdt.getForm().getValues().id_penduduk;
			if (id_pe != "")
				if (frmEdt.getForm().isValid()) {
					frmEdt.getForm().submit({
						url : ajax_url,
						waitMsg : 'Saving Data',
						params : {
							task : 'editParent'
						},
						success : function(a, b) {
							ds.reload();
							store_detail.removeAll();
							frmEdt.getForm().reset();
							Ext.example.msg('Save Data',
									'Data has been successfully saved');
						},
						failure : function(a, b) {
							Ext.MessageBox.show({
										title : 'Error On Saving Data',
										msg : b.result.msg,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
						}

					});
				}
		}
	}, '-', {
		text : 'Reload Form',
		iconCls : 'drop',
		tooltip : {
			title : 'Reload Form',
			text : 'Reload Form from Database'
		},
		handler : function() {
			if (grid.getSelectionModel().hasSelection()) {
				Ext.getCmp('form-edit').getForm().setValues(grid
						.getSelectionModel().getSelected().data);
				Ext.example.msg('Reload Form', 'Form Edit has Been Reloaded');
			}

		}
	}]
};

var main_content = {
	id : 'main_content',
	layout : 'border',
	// title:'Data Kepala Keluarga',
	border : false,
	items : [item1, item2]
};

/*
 * var main_content = { xtype: 'tabpanel', id: 'main_content', plain: true,
 * //remove the header border activeItem: 0, items: [tab1] };
 */