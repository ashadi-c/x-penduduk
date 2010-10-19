/** untuk menandakan bahwa script ini valid dan akan di eksekusi * */
valid_script = true;
ajax_url = 'ajax.handler.php?id=' + page;

/** =============================================================* */

/** -------------->Tab 1 Browse Data <-------------------------* */

var dsAll = new Ext.data.GroupingStore({
			url : ajax_url,
			id : 'id',
			baseParams : {
				task : 'getDataAll'
			},
			reader : new Ext.data.JsonReader({
						totalProperty : 'total',
						root : 'data',
						fields : [{
									name : 'id_penduduk'
								}, {
									name : 'anggota_dari'
								}, {
									name : 'hub'
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
                                                                        name: 'picture'
                                                                }

						]
					}),
			sortInfo : {
				field : 'id_penduduk',
				direction : 'ASC'
			},
			groupField : 'anggota_dari',
			remoteSort : false
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

var filtersAll = new Ext.ux.grid.GridFilters({
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

var cmAll = new Ext.grid.ColumnModel({
			defaults : {
				sortable : true
			},
			columns : [
					// {width:30,hideable:false,menuDisabled:true,fixed:true,
					// renderer: function(val,cell,rec,row,col,st) {
					// //console.log(st.lastOptions); menampilkan di console js
					// the_start = st.lastOptions.params.start;
					// the_number = row + 1 + the_start;
					// cell.attr = 'style= background:#eee
					// url(images/cmp-bg.gif) repeat-x;';
					// return the_number;
					// }, align:'center'
					// },
                                 expander,
				{
				dataIndex : 'id_penduduk',
				hidden : true,
				hideable : false,
				menuDisabled : true
			}, {
				dataIndex : 'anggota_dari',
				hidden : true,
				hideable : false,
				menuDisabled : true
			}, {
				dataIndex : 'hub',
				header : 'Hubungan',
				groupable : false,
				width : 100
			}, {
				dataIndex : 'no_kk',
				header : 'No KK',
				groupable : false,
				width : 100
			}, {
				dataIndex : 'no_ktp',
				header : 'No KTP',
				groupable : false,
				width : 100
			}, {
				dataIndex : 'nama',
				header : 'Nama',
				id : 'nama',
				groupable : false,
				width : 150
			}, {
				dataIndex : 'kelamin',
				header : 'Gender',
				groupable : false,
				width : 70
			}, {
				dataIndex : 'tempat_lahir',
				header : 'Tempat Lahir',
				groupable : false,
				width : 100
			}, {
				dataIndex : 'tanggal_lahir',
				header : 'Tanggal Lahir',
				groupable : false,
				renderer : Ext.util.Format.dateRenderer('d/m/Y'),
				width : 75
			}, {
				dataIndex : 'umur',
				header : 'Umur (Thn)',
				groupable : false,
				width : 65,
				align : 'center'
			}, {
				dataIndex : 'umur_bln',
				header : 'Bulan',
				groupable : false,
				width : 50,
				align : 'center'
			}, {
				dataIndex : 'umur_hari',
				header : 'Hari',
				groupable : false,
				width : 50,
				align : 'center'
			}, {
				dataIndex : 'status_kawin',
				header : 'Status Kawin',
				groupable : false,
				width : 90
			}, {
				dataIndex : 'agama',
				header : 'Agama',
				groupable : false,
				width : 70
			}, {
				dataIndex : 'pendidikan',
				header : 'Pendidikan',
				groupable : false,
				width : 70
			}, {
				dataIndex : 'pekerjaan',
				header : 'Pekerjaan',
				groupable : false,
				width : 100
			}, {
				dataIndex : 'baca_tulis',
				header : 'Baca Tulis',
				groupable : false,
				width : 70
			}, {
				dataIndex : 'rt',
				header : 'RT',
				groupable : false,
				width : 40
			}, {
				dataIndex : 'rw',
				header : 'RW',
				groupable : false,
				width : 40
			}, {
				dataIndex : 'dusun',
				header : 'Dusun',
				groupable : false,
				width : 70
			}
			// {dataIndex:'id_penduduk',header:'Delete',width:50,hideable:false,menuDisabled:true,sortable:false,
			// renderer: function() {
			// return "<center><img style='cursor: pointer;padding:0 0 0
			// 0;margin:0 0 0 0;' src='images/panel-close.gif'></img></center>";
			// }
			// }
			]
		});
// cmAll.defaultSortable = true;

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
			dsAll.load({
						params : {
							start : 0,
							limit : parseInt(limit_combo.getValue())
						}
					});
		});

var gridAll = new Ext.grid.GridPanel({
	title : 'Data Penduduk',
	ddGroup : 'grid2DDGroup',
	enableDragDrop : true,	
	border:true,
        showPreview: false,
	margins:'2 2 0 2',
	region : 'center',
	iconCls : 'parent-form',
	// viewConfig:{forceFit:true}, //agar colom2 mengecil sendiri waktu diresize
	// windows
	ds : dsAll,
	cm : cmAll,
	view : new Ext.grid.GroupingView({
		forceFit : false,
		groupTextTpl : 'No Kartu Keluarga : {[values.rs[0].data.no_kk]} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})',
		showGroupName : false,
		enableNoGroups : false, // REQUIRED!
		hideGroupedColumn : false
	}),
	stripeRows : true,
	enableColLock : false,
	loadMask : true,
	plugins : [filtersAll,expander],
	// autoExpandColumn: 'nama',
	tbar : [{
		text : 'Remove Selected',
		iconCls : 'table-delete',
                disabled: checkRole(!ROLE.REMOVE_PARENT),
		id : 'remove-s',
		tooltip : {
			title : 'Remove Selected Item',
			text : 'Remove Selected row in grid'
		},
		handler : function() {
			if (!checkRole(ROLE.REMOVE_PARENT)){
				this.disable();
				return false; 		
			}
			
			a = gridAll.getSelectionModel().getSelections();
			var data = [];
			kpl = 0;
			Ext.each(a, function(r, i) {
						var o = r.copy(); // mengcopy record agar aslinya
						// tidak dirubah...
						o = o.data;
						for (cnt in o)
							if (Ext.isDate(o[cnt]))
								o[cnt] = Ext.util.Format.date(o[cnt], 'd/m/Y');
						data.push({
									id_penduduk : o.id_penduduk,
									hub : o.hub
								});
						if (o.hub == 'Kepala Keluarga')
							kpl++;
					});
			if (kpl) {
				Ext.MessageBox.show({
					title : 'Alert',
					msg : 'Anda Tidak Boleh Menghapus Kepala Keluarga, Pilih Ulang Lagi ',
					buttons : Ext.MessageBox.OK,
					animEl : 'remove-s',
					icon : Ext.MessageBox.WARNING
				});
				data = [];
				gridAll.getSelectionModel().clearSelections();
			}

			if (data.length) {
				Ext.MessageBox.show({
					title : 'Delete?',
					msg : "Are You Sure to delete Selected(s) Data?",
					buttons : Ext.MessageBox.YESNO,
					fn : function(a) {
						if (a == "yes") {
							Ext.getCmp('content-panel').body.mask(
									'Removing Data', 'x-mask-loading');
							Ext.Ajax.request({
								url : ajax_url,
								params : {
									task : "removeList2",
									dataList : Ext.encode(data)
								},
								success : function(response) {
									Ext.getCmp('content-panel').body.unmask();
									var res = Ext.decode(response.responseText);
									if (res.success) {
										dsAll.reload();
										Ext.example
												.msg('Remove Selected Item',
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
		text : 'Edit Data',
		id : 'btn-edit',
		iconCls : 'form-edit',
                disabled: checkRole(!ROLE.EDIT_PARENT),
		enableToggle : true,
		pressed : false,
		tooltip : {
			title : 'Edit Data',
			text : 'View Form Edit Data'
		},
		toggleHandler : function(btn, pressed) {
			if (!checkRole(ROLE.EDIT_PARENT)){
				this.disable();
				return false; 		
			}
			
			if (gridAll.getSelectionModel().hasSelection()) {
				if (pressed)
					popUpEdit(12);
				else
					winEdit.hide();
			} // else
			// winEdit.toggle(false);
			// winEdit.show(Ext.get('btn-edit'));
		}
	}, '-', {
		text:'Pisah KK',
		iconCls:'split-kk',
		handler:function(){
			grid2.expand();
		}
		
	},'-',{
		text : 'Set Kepala Keluarga',
		id : 'kpl-keluarga',
                disabled: checkRole(!ROLE.SAVE_PARENT),
		iconCls : 'user-comment',
		handler : function() {
				if (!checkRole(ROLE.SAVE_PARENT)){
					this.disable();
					return false; 		
				}			
			if (gridAll.getSelectionModel().hasSelection())
				if (gridAll.getSelectionModel().getSelected().data.hub != 'Kepala Keluarga')
					Ext.MessageBox.show({
						title : 'Set Kepala Keluarga?',
						msg : "Apakah Anda Yakin data ini akan jadi kepala keluarga?",
						buttons : Ext.MessageBox.YESNO,
						fn : function(a) {
							if (a == "yes")
								Ext.Ajax.request({
									url : ajax_url,
									params : {
										task : "setKepala",
										id_penduduk : gridAll.getSelectionModel().getSelected().data.id_penduduk,
										anggota_dari : gridAll.getSelectionModel().getSelected().data.anggota_dari
									},
									success : function(response) {
										var res = Ext
												.decode(response.responseText);
										if (res.success) {
											dsAll.reload();
											Ext.example.msg('Set Kepala Keluarga','Kepala Keluarga berhasil di set ulang');

										} else {
											Ext.MessageBox.show({
												title : 'Alert',
												msg : 'Failed to Save Data: Error Message : '
														+ res.msg,
												buttons : Ext.MessageBox.OK,
												animEl : 'kpl-keluarga',
												icon : Ext.MessageBox.ERROR
											});
										}
									}
								});
						},
						animEl : 'kpl-keluarga',
						icon : Ext.MessageBox.WARNING
					});

		}
	}, '-',{
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
			option = gridAll.store.lastOptions.params;
			options = Ext.urlEncode(option);
			a = this.text;
			pdf = a.search(/PDF/);
			mode_report = (pdf > 0) ? "&mode=pdf" : "&mode=xls";
			report_link = 'report.php?id=' + page + mode_report + "&" + options;
			rType = (pdf > 0) ? 'PDF' : 'XLS';
			winReport({
						id : this.id,
						title : 'Laporan Data Penduduk',
						url : report_link,
						type : rType
					});

		}
	}],
	bbar : new Ext.PagingToolbar({
				id : 'pagingBar',
				store : dsAll,
				pageSize : parseInt(limit_combo.getValue()),
				plugins : filtersAll,
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
								filtersAll.clearFilters();
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
                                                        gridAll.showPreview = pressed;
                                                        gridAll.getView().refresh();
                                                    }
                                                }

                                            ]
			})
});

// membuang filter jika pertama kali dibuka
filtersAll.clearFilters();
for (i = 0; i < gridAll.getColumnModel().getColumnCount(); i++)
	if (gridAll.getColumnModel().isMenuDisabled(i) == false)
		gridAll.getColumnModel().setHidden(i, false);

// action grid
gridAll.getView().on("refresh",function(){
    dsAll.each(function(r,i){
        if (gridAll.showPreview)
            expander.expandRow(i);
        else
            expander.collapseRow(i);
    });
});

gridAll.on("celldblclick", function(a, b, c, d) {
	if (gridAll.getColumnModel().getColumnHeader(c) == "Delete")
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

// meload data dari database
dsAll.load({
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

var cmbHubungan = new Ext.form.ComboBox({
			fieldLabel : 'Hubungan',
			labelSeparator : '',
			typeAhead : true,
			triggerAction : 'all',
			store : dsKeluarga,
			mode : 'local',
			displayField : 'hubungan',
			valueField : 'hubungan',
			lazyRender : true,
			allowBlank : false,
			width : 120,
			hiddenName : 'hHub'
		});
var id_penduduk = new Ext.form.Hidden({
			name : 'id_penduduk',
			allowBlank : false
		});
var no_ktp = new Ext.form.TextField({
			fieldLabel : 'NO KTP',
			name : 'no_ktp',
			labelSeparator : '',
			width : 120,
			allowBlank : true
		});

var no_kk = new Ext.form.TextField({
			fieldLabel : 'NO Kartu Keluarga',
			name : 'no_kk',
			labelSeparator : '',
			width : 120,
			allowBlank : true,
			readOnly : true
		});

var emp_name = new Ext.form.TextField({
			fieldLabel : 'Nama Penduduk',
			labelSeparator : '',
			name : 'nama',
			width : 120,
			allowBlank : false
		});

comboGender = new Ext.form.ComboBox({
			fieldLabel : 'Jenis Kelamin',
			store : dsgender,
			displayField : 'EMP_GENDER',
			valueField : 'GENDER_VALUE',
			triggerAction : 'all',
			emptyText : 'Pilih Jenis Kelamin',
			mode : 'local',
			readOnly : false,
			hiddenName : 'hgender',
			allowBlank : false,
			labelSeparator : '',
			width : 120
		});

comboempType = new Ext.form.ComboBox({
			fieldLabel : 'Employee Type',
			// store: dsgender,
			// displayField:'EMP_GENDER',
			// valueField:'GENDER_VALUE',
			triggerAction : 'all',
			// mode: 'local',
			readOnly : false,
			hiddenName : 'hempType',
			labelSeparator : '',
			width : 120
		});

var place_of_birth = new Ext.form.TextField({
			fieldLabel : 'Tempat Lahir',
			labelSeparator : '',
			name : 'place_of_birth',
			width : 120,
			allowBlank : true
		});

var date_of_birth = new Ext.form.DateField({
			fieldLabel : 'Tanggal Lahir',
			name : 'date_of_birth',
			labelSeparator : '',
			format : 'd/m/Y',
			maxValue : (new Date()).clearTime(),
			width : 120,
			allowBlank : true,
			disabledDaysText : 'Tanggal lahir harus lebih kecil dari besok'
		});

comboMaritalstatus = new Ext.form.ComboBox({
			fieldLabel : 'Status Kawin',
			store : dsmarital,
			displayField : 'MARITAL_STATUS',
			valueField : 'MARITAL_STATUS',
			triggerAction : 'all',
			emptyText : 'Pilih Status Kawin',
			mode : 'local',
			readOnly : false,
			hiddenName : 'hmarital',
			allowBlank : false,
			labelSeparator : '',
			width : 120
		});

comboRegion = new Ext.form.ComboBox({
			fieldLabel : 'Agama',
			store : dsregion,
			displayField : 'REGION_1',
			valueField : 'REGION_2',
			allowBlank : false,
			emptyText : 'Pilih Agama',
			triggerAction : 'all',
			mode : 'local',
			readOnly : false,
			hiddenName : 'hregion',
			labelSeparator : '',
			width : 120
		});

comboPendidikan = new Ext.form.ComboBox({
			fieldLabel : 'Pendidikan',
			store : dsPendidikan,
			displayField : 'PENDIDIKAN',
			emptyText : 'Pilih Pendidikan',
			valueField : 'PENDIDIKAN',
			triggerAction : 'all',
			mode : 'local',
			readOnly : false,
			hiddenName : 'hPnd',
			labelSeparator : '',
			width : 120
		});

var pekerjaan = new Ext.form.TextField({
			fieldLabel : 'Pekerjaan',
			labelSeparator : '',
			name : 'pekerjaan',
			width : 120,
			allowBlank : true
		});

comboBaca = new Ext.form.ComboBox({
			fieldLabel : 'Baca Tulis',
			store : dsBaca,
			displayField : 'ACTIVESTATUS',
			valueField : 'ACTIVESTATUS',
			triggerAction : 'all',
			mode : 'local',
			readOnly : false,
			hiddenName : 'hBaca',
			labelSeparator : '',
			width : 120
		});

comboBaca.setValue('Bisa');

var rt = new Ext.form.TextField({
			fieldLabel : 'RT',
			labelSeparator : '',
			name : 'rt',
			width : 50,
                        vtype:'angka',
			allowBlank : false
		});

var rw = new Ext.form.TextField({
			fieldLabel : 'RW',
			labelSeparator : '',
			name : 'rw',
                        vtype:'angka',
			width : 50,
			allowBlank : false
		});

comboDusun = new Ext.form.ComboBox({
			fieldLabel : 'Dusun',
			store : dsDusun,
			displayField : 'dusun',
			valueField : 'dusun',
			triggerAction : 'all',
			mode : 'local',
			readOnly : false,
			hiddenName : 'hdusun',
			labelSeparator : '',
			width : 120,
			emptyText : 'Pilih Dusun',
			allowBlank : false
		});

var company = new Ext.form.TriggerField({
			fieldLabel : 'Company',
			name : 'company',
			labelSeparator : '',
			width : 120,
			allowBlank : true
		});

comboActive = new Ext.form.ComboBox({
			fieldLabel : 'Status',
			store : dsactive,
			displayField : 'ACTIVESTATUS',
			valueField : 'ACTIVESTATUS_VAL',
			triggerAction : 'all',
			mode : 'local',
			readOnly : true,
			hiddenName : 'hactive',
			disabled : true,
			labelSeparator : '',
			width : 120
		});

comboActive.setValue(1);

var foto = new Ext.form.TextField({
			fieldLabel : 'Pilih Foto',
			labelSeparator : '',
			name : 'foto',
			width : 100

		});

var frmInput = {
	id : 'frmInput',
	xtype : 'form',
	// height:260,
	frame : true,
	iconCls : 'form',
	url : ajax_url,
	// title:'Kepala Keluarga',
	border : false,
	// bodyStyle:'padding:5px 5px 0',
	labelAlign : 'left',
	layout : 'column',
	items : [{
		columnWidth : 0.5,
		xtype : 'fieldset',
		labelWidth : 110,
		// defaults: {width: 140}, // Default config options for child items
		// defaultType: 'textfield',
		autoHeight : true,
		bodyStyle : Ext.isIE ? 'padding:0 0 5px 10;' : 'padding:10px 10;',
		border : false,
		style : {
			"margin-left" : "5px", // when you add custom margin in IE 6...
			"margin-right" : Ext.isIE6
					? (Ext.isStrict ? "-10px" : "-13px")
					: "0" // you have to adjust for it somewhere else
		},
		items : [id_penduduk, cmbHubungan, no_kk, no_ktp, emp_name,
				comboGender, place_of_birth, date_of_birth, comboMaritalstatus

		]
	}, {
		columnWidth : 0.5,
		xtype : 'fieldset',
		labelWidth : 110,
		// defaults: {width: 140}, // Default config options for child items
		// defaultType: 'textfield',
		autoHeight : true,
		bodyStyle : Ext.isIE ? 'padding:0 0 5px 10;' : 'padding:10px 10;',
		border : false,
		style : {
			"margin-left" : "5px", // when you add custom margin in IE 6...
			"margin-right" : Ext.isIE6
					? (Ext.isStrict ? "-10px" : "-13px")
					: "0" // you have to adjust for it somewhere else
		},
		items : [comboRegion, comboPendidikan, pekerjaan, comboBaca, rt, rw,
				comboDusun]
	}]
};
var winEdit = new Ext.Window({
	layout : 'fit',
	id : 'winEdit',
	width : 580,
	height : 300,
	closeAction : 'hide',
	iconCls : 'form',
	title : 'Edit Data',
	modal : true,
	plain : true,
	border : false,
	items : [frmInput

	],
	buttons : [{
		text : 'Save',
		handler : function() {
			if (Ext.getCmp('frmInput').getForm().isValid()) {
				Ext.getCmp('frmInput').getForm().submit({
					waitMsg : 'Saving Data',
					params : {
						task : 'saveEdit'
					},
					success : function(a, b) {
						winEdit.hide();
						dsAll.reload();
						Ext.example.msg('Save Data',
								'Data has been successfully saved');
					},
					failure : function(a, b) {
						Ext.MessageBox.show({
									title : 'Alert',
									msg : 'Failed Save Data : ' + b.result.msg,
									buttons : Ext.MessageBox.OK,
									// animEl: n.id,
									icon : Ext.MessageBox.ERROR
								});
					}
				});
			}
		}
	}, {
		text : 'Close',
		handler : function() {
			winEdit.hide();
		}
	}],
	listeners : {
		hide : function() {
			Ext.getCmp('btn-edit').toggle(false);
		},
		show : function() {
			Ext.getCmp('frmInput').getForm().load({
				waitMsg : 'Loading Data',
				params : {
					task : 'getFormEdit',
					id_penduduk : gridAll.getSelectionModel().getSelected().data.id_penduduk
				},
				success : function(a, b) {
					if (b.result.data.hHub == 'Kepala Keluarga')
						cmbHubungan.disable();
					else
						cmbHubungan.enable();
				}
			});
		}
	}
});

/** Function to show PoP UP windows * */
function popUpEdit(id_penduduk) {
	winEdit.show(Ext.get('btn-edit'));
}
/** ---------------------------------* */
/* Grid PIsah KK  
 * 
 */
var ds2 = new Ext.data.JsonStore({
			root:'data',
			fields : [{
						name : 'id_penduduk'
					}, {
						name : 'no_ktp'
					},{
						name:'anggota_dari'
					},{
						name:'hub'
					},{
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
					}]
		});

var cm2 = new Ext.grid.ColumnModel({
			defaults : {
				sortable : false
			},
			columns : [new Ext.grid.RowNumberer(), {
						dataIndex : 'id_penduduk',
						hidden : true,
						hideable : false,
						menuDisabled : true
					},{
						dataIndex : 'anggota_dari',
						hidden : true,
						hideable : false,
						menuDisabled : true
					},{
						dataIndex : 'hub',
						header : 'Hubungan',
						width : 100,
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
					}]
		});
 
var grid2 = new Ext.grid.EditorGridPanel({
			region : 'south',
			split : true,
			title : 'Pisah Kartu Keluarga',
			collapsible : true,
			collapsed : true,
			clicksToEdit : 1,
			margins : '0 2 2 2',
			height : 250,
			iconCls : 'browse',
			cmargins : '2 2 2 2',
			store : ds2,
			cm : cm2,
			tbar : [
			{
				text:'Save',
				iconCls:'icon-save',
                                disabled: checkRole(!ROLE.SAVE_CHILD),
				tooltip: {
					title:'Save Grid Pisah KK',
					text:'Save data to Database'
				}, 
				handler: function(){
					if (!checkRole(ROLE.SAVE_CHILD)){
						this.disable();
						return false; 		
					}
					
					var data = []; 
					ds2.each(function(r,i){
						tmp = r.copy(); 
						data.push({
							id_penduduk : tmp.data.id_penduduk,
							anggota_dari : tmp.data.anggota_dari,
							no_kk : tmp.data.no_kk,
							hub: tmp.data.hub
						})
					}); 
					if (data.length){
			Ext.MessageBox.show({
					title : 'Save?',
					msg : "Simpan Perubahan Data KK?",
					buttons : Ext.MessageBox.YESNO,
					fn : function(a) {
						if (a == "yes") {
							grid2.body.mask(
									'Save Data', 'x-mask-loading');
							Ext.Ajax.request({
								url : ajax_url,
								params : {
									task : "pisahKK",
									dataList : Ext.encode(data)
								},
								success : function(response) {
									grid2.body.unmask();
									var res = Ext.decode(response.responseText);
									if (res.success) {
										Ext.getCmp('txt_kk').setValue(''); 
										ds2.removeAll(); 
										dsAll.reload();
										Ext.example
												.msg('Save Data',
														'Data has been saved to Database');

									} else {
										Ext.MessageBox.show({
											title : 'Alert',
											msg : 'Failed to Delete Data: Error Message : '
													+ res.msg,
											buttons : Ext.MessageBox.OK,
											animEl : this.id,
											icon : Ext.MessageBox.ERROR
										});
									}
								}
							});
						}
					},
					animEl : this.id,
					icon : Ext.MessageBox.INFO
				});
						
					}
				}
			},'-',{
				text : 'Remove Selected',
				iconCls : 'table-delete',
				tooltip : {
					title : 'Remove Selected Item',
					text : 'Remove Selected row in grid'
				},
				handler : function() {
					index = grid2.getSelectionModel().getSelectedCell();
					if (!index){
						return false;
					}
					r = ds2.getAt(index[0]); 
					x = ds2.getCount();
					if ((index[0] > 0) || (x ==1))
						ds2.remove(r)
				}
			}, '-', {
				text : 'Reset All',
				iconCls : 'drop',
				tooltip : {
					title : 'Clear Grid',
					text : 'Clear Grid All'
				},
				handler : function() {
					ds2.removeAll();
				}
			},'-',{
				text:'No KK Baru',
				id:'btn_kk',
				iconCls:'split-kk',
				menu:[
				{
					text:'KK Baru',
					checked:true,
					group:'kk',
					checkHandler: function(){
						Ext.getCmp('btn_kk').setText(this.text);
						radio_kk =1; 
						Ext.getCmp('txt_kk').enable();
						ds2.removeAll();
					}
				},{
					text:'Ikut KK Lain',
					group:'kk',
					checked:false,
					checkHandler: function(){
						Ext.getCmp('btn_kk').setText(this.text);
						radio_kk =2; 
						Ext.getCmp('txt_kk').reset();
						Ext.getCmp('txt_kk').disable();
						ds2.removeAll();
					}
				}
				]
			},' ',{
				xtype:'textfield',
				id:'txt_kk',
				listeners:{
					change: function(){
						kk_baru = this.getValue();
						if (radio_kk ==1){
							ds2.each(function(r,i){
								r.data.no_kk = kk_baru;
								//r.set('no_kk',kk_baru);
							});
							grid2.getView().refresh();
						}
					}
				}
			}],
			listeners : {
				afterrender : function() {
					setUpDrag();
				},
				beforeedit: function(e){
						if (e.row ==0)
							e.cancel = true; 
				}
			}
		});
var radio_kk = 1; 

function setUpDrag() {
	//var secondGridDropTargetEl = grid2.getView().el.dom.childNodes[0].childNodes[1];
	var secondGridDropTargetEl	= grid2.getView().scroller.dom;
	var destGridDropTarget = new Ext.dd.DropTarget(secondGridDropTargetEl, {
				ddGroup : 'grid2DDGroup',
				notifyDrop : function(ddSource, e, data) {
					function addRow(record, index, allItems) {

						// Search for duplicates
						var foundItem = ds2.findExact('id_penduduk',
								record.data.id_penduduk);
						// if not found
						rec = record.copy();
						if (foundItem == -1) {
							if (radio_kk == 1){
								if (rec.data.hub !='Kepala Keluarga'){
									if (!ds2.getCount()){
										rec.data.hub ='Kepala Keluarga'; 
										rec.data.anggota_dari =0; 
									} else {
										rec.data.anggota_dari = ds2.getAt(0).copy().data.id_penduduk; 
									}
									rec.data.no_kk = Ext.getCmp('txt_kk').getValue(); 
									ds2.add(rec);
								}else{
									Ext.MessageBox.show({
										title : 'Warning',
										msg : 'Hubungan tidak boleh sebagai Kepala Keluarga',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.WARNING
									});
								}
							}
							
							if (radio_kk ==2){
								if (!ds2.getCount()){
									if (rec.data.hub =='Kepala Keluarga'){
										rec.data.anggota_dari = 0; 
										ds2.add(rec); 
									} else {
										Ext.MessageBox.show({
											title : 'Warning',
											msg : 'Data Pertama harus Kepala Keluarga',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.WARNING
										});										
									}
								} else {
									if (rec.data.hub !='Kepala Keluarga'){
										anggota_dari = ds2.getAt(0).copy().data.id_penduduk; 
										rec.data.anggota_dari = anggota_dari;
										rec.data.no_kk = ds2.getAt(0).copy().data.no_kk; 
										ds2.add(rec); 
									} else {
										Ext.MessageBox.show({
											title : 'Warning',
											msg : 'Hubungan Keluarga tidak boleh Kepala Keluarga',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.WARNING
										});										
										
									}
								}
							}
						}
					}
					// Loop through the selections
					Ext.each(ddSource.dragData.selections, addRow);
					return true;
				}
			});
}

/*
 * 
 */
var main_content = {
	xtype : 'tabpanel',
	id : 'main_content',
	plain : true, // remove the header border
	activeItem : 0,
	items:[
	{
		layout:'border',
		title:'Data Penduduk',
		items : [gridAll,grid2]
	}
	],
	listeners : {
		destroy : function() {
			myWin = Ext.getCmp('winEdit');
			if (myWin)
				myWin.destroy();
		}
	}
};
