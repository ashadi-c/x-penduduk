/** untuk menandakan bahwa script ini valid dan akan di eksekusi * */
valid_script = true;
ajax_url = 'ajax.handler.php?id=' + page;
/** =============================================================* */
var id_penduduk = new Ext.form.Hidden({
			name : 'id_penduduk',
			id : 'id_penduduk',
			allowBlank : false
		});

var anggota_dari = new Ext.form.Hidden({
			name : 'anggota_dari',
			id : 'anggota_dari',
			allowBlank : false
		});
var no_kk = new Ext.form.Hidden({
			name : 'no_kk',
			id : 'no_kk',
			allowBlank : false
		});

var agama = new Ext.form.Hidden({
			name : 'agama',
			id : 'agama',
			allowBlank : false
		});

var rt = new Ext.form.Hidden({
			name : 'rt',
			id : 'rt',
			allowBlank : false
		});

var rw = new Ext.form.Hidden({
			name : 'rw',
			id : 'rw',
			allowBlank : false
		});

var dusun = new Ext.form.Hidden({
			name : 'dusun',
			id : 'dusun',
			allowBlank : false
		});

var nama_bayi = new Ext.form.TextField({
			fieldLabel : 'Nama Bayi',
			name : 'nama_bayi',
			labelSeparator : '',
			anchor : '70%',
			allowBlank : false
		});

comboGender = new Ext.form.ComboBox({
			fieldLabel : 'Jenis Kelamin',
			// name:'kelamin',
			store : dsgender,
			displayField : 'EMP_GENDER',
			valueField : 'GENDER_VALUE',
			triggerAction : 'all',
			emptyText : 'Pilih Jenis Kelamin',
			mode : 'local',
			readOnly : false,
			hiddenName : 'kelamin_bayi',
			allowBlank : false,
			labelSeparator : '',
			width : 100
		});

var tanggal_lahir_bayi = new Ext.form.DateField({
			fieldLabel : 'Tanggal Lahir',
			name : 'tanggal_lahir_bayi',
			labelSeparator : '',
			format : 'd/m/Y',
			maxValue : (new Date()).clearTime(),
			width : 100,
			allowBlank : false,
			disabledDaysText : 'Tanggal lahir harus lebih kecil dari besok'
		});

var tempat_lahir_bayi = new Ext.form.TextField({
			fieldLabel : 'Tempat Lahir',
			name : 'tempat_lahir_bayi',
			labelSeparator : '',
			anchor : '70%',
			allowBlank : true
		});

var berat_badan = new Ext.form.NumberField({
			fieldLabel : 'Berat Badan (kg)',
			labelSeparator : '',
			name : 'berat_badan',
			width : 50,
			allowBlank : false
		});

var keterangan = new Ext.form.TextArea({
			fieldLabel : 'Keterangan',
			labelSeparator : '',
			name : 'keterangan',
			allowBlank : true,
			width : 400,
			anchor : '95%'
		});

var frmKelahiran = new Ext.FormPanel({
			id : 'frmKelahiran',
			region : 'center',
			url : ajax_url,
			frame : true,
			title : 'Form Kelahiran',
			iconCls : 'form',
			border : true,
			labelAlign : 'left',
			bodyStyle : 'padding:5px 5px 0 10px',
			labelWidth : 100,
			items : [id_penduduk, no_kk, nama_bayi, comboGender,
					tanggal_lahir_bayi, tempat_lahir_bayi, berat_badan,
					keterangan, anggota_dari, rt, rw, dusun, agama]
		});

/** membuat grid untuk menampilkan data penduduk * */
var dsKelahiran = new Ext.data.JsonStore({
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
						name : 'anggota_dari'
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
					},{
                                                name : 'picture'
                                        }

			],
			sortInfo : {
				field : 'nama',
				direction : 'ASC'
			},
			remoteSort : true
		});

var filterKel = new Ext.ux.grid.GridFilters({
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
var cmKel = new Ext.grid.ColumnModel({
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
			// repeat-x;';
			return the_number;
		},
		align : 'center'
	}, {
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
	},{
                dataIndex:'picture',
                hidden: true,
                hideable:false,
                menuDisabled: true
        }]
});
// cmKel.defaultSortable = true;

var hapusFilter = true;
var reloadTab2 = true;

var gridKel = new Ext.grid.GridPanel({
	// layout:'fit',
	ds : dsKelahiran,
	cm : cmKel,
	sm : new Ext.grid.RowSelectionModel({
				singleSelect : true
			}),
	stripeRows : true,
	enableColLock : false,
	loadMask : true,
	plugins : filterKel,
	listeners : {
		render : function() {

		}
	},
	bbar : new Ext.PagingToolbar({
		store : dsKelahiran,
		pageSize : 30,
		plugins : filterKel,
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
						filterKel.clearFilters();
						for (i = 0; i < gridKel.getColumnModel()
								.getColumnCount(); i++)
							if (gridKel.getColumnModel().isMenuDisabled(i) == false)
								gridKel.getColumnModel().setHidden(i, false);
						// dsKelahiran.load({params:{start: 0, limit: 30}});
					}
				}]
	})
});

var winKel = new Ext.Window({
			layout : 'fit',
			id : 'winKel',
			width : 720,
			height : 400,
			closeAction : 'hide',
			iconCls : 'user-female',
			title : 'Lihat Data Ibu',
			modal : true,
			plain : true,
			border : false,
			items : [gridKel

			],
			buttons : [{
				text : 'Select Data',
				handler : function() {
					if (gridKel.getSelectionModel().hasSelection()) {
						detIbu = Ext.getCmp('detailIbu');
						rd = gridKel.getSelectionModel().getSelected();
						r = rd.copy();
						r.data.tanggal_lahir = Ext.util.Format.date(
								r.data.tanggal_lahir, 'd, F Y');
						detailTpl.overwrite(detIbu.body, r.data);
						detIbu.body.highlight('#c3daf9', {
									block : true
								});
						winKel.hide();
						frmKelahiran.getForm().setValues(r.data);
					}
				}
			}, {
				text : 'Close',
				handler : function() {
					winKel.hide();
				}
			}],
			listeners : {
				show : function() {
					if (hapusFilter) {
						filterKel.clearFilters();
						for (i = 0; i < gridKel.getColumnModel()
								.getColumnCount(); i++)
							if (gridKel.getColumnModel().isMenuDisabled(i) == false)
								gridKel.getColumnModel().setHidden(i, false);
					}
					hapusFilter = false;
					dsKelahiran.load({
								params : {
									start : 0,
									limit : 30
								}
							});
				}
			}

		});

/** =============================================* */
var detailTplMarkup = [
		'<div style="float:left;" ><img src="upload_foto/{picture}" /></div>',
		'<div style="margin-left:110px;">', '<h2>{nama}</h2>',
		'<p>No Kartu Keluarga : {no_kk}</p>', '<p>No Ktp: {no_ktp}</p>',
		'<p>Tempat Tanggal Lahir : {tempat_lahir}, {tanggal_lahir}</p>',
		'<p>RT/RW: {rt}/{rw}</p>', '<p>Dusun: {dusun}</p>', '</div>'

];

var detailTpl = new Ext.Template(detailTplMarkup);

var detailIbu = {
	id : 'detailIbu',
	region : 'south',
	split : true,
	height : 240,
	collapsible : true,
	cmargins : '2 0 0 0',
	title : 'Keterangan Ibu',
	iconCls : 'user-female',
	autoScroll : true,
	bodyStyle : {
		background : '#eee',
		padding : '7px'
	},
	html : 'Pilih Ibu yang melahirkan anak tersebut',
	tbar : [{
				text : 'Pilih Ibu',
				iconCls : 'add-data',
				tooltip : {
					title : 'Pilih Ibu',
					text : 'Pilih Ibu yang melahirkan'
				},
				handler : function() {
					winKel.show(Ext.get('detailIbu'));
				}
			}, '-', {
				text : 'Reset',
				iconCls : 'drop',
				tooltip : {
					title : 'Reset',
					text : ''
				},
				handler : function() {
					Ext.getCmp('detailIbu').body
							.update('Pilih Ibu yang melahirkan anak tersebut');
				}
			}]
};

/** membuat tab kedua * */
var dsLihat = new Ext.data.JsonStore({
			url : ajax_url,
			id : 'id',
			totalProperty : 'total',
			baseParams : {
				task : 'getData2'
			},
			root : 'data',
			fields : [{
						name : 'id_kelahiran'
					}, {
						name : 'id_penduduk'
					}, {
						name : 'nama_bayi'
					}, {
						name : 'kelamin_bayi'
					}, {
						name : 'tanggal_lahir_bayi',
						type : 'date',
						dateFormat : 'Y-m-d'
					}, {
						name : 'tempat_lahir_bayi'
					}, {
						name : 'berat_badan'
					}, {
						name : 'keterangan'
					}, {
						name : 'ibu_bayi'
					}, {
						name : 'rt'
					}, {
						name : 'rw'
					}, {
						name : 'dusun'
					}

			],
			sortInfo : {
				field : 'nama_bayi',
				direction : 'ASC'
			},
			remoteSort : true
		});

var filterLihat = new Ext.ux.grid.GridFilters({
			filters : [{
						type : 'string',
						dataIndex : 'nama_bayi'
					}, {
						type : 'date',
						dataIndex : 'tanggal_lahir_bayi'
					}, {
						type : 'string',
						dataIndex : 'tempat_lahir_bayi'
					}, {
						type : 'string',
						dataIndex : 'keterangan'
					}, {
						type : 'string',
						dataIndex : 'ibu_bayi'
					}, {
						type : 'numeric',
						dataIndex : 'berat_badan'
					}, {
						type : 'numeric',
						dataIndex : 'rt'
					}, {
						type : 'numeric',
						dataIndex : 'rw'
					}, {
						type : 'list',
						dataIndex : 'kelamin_bayi',
						options : filtergender,
						phpMode : true
					}, {
						type : 'list',
						dataIndex : 'dusun',
						options : filterDusun,
						phpMode : true
					}
			// {type: 'boolean', dataIndex: 'status'}
			]
		});

var cmLihat = new Ext.grid.ColumnModel({
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
			// repeat-x;';
			return the_number;
		},
		align : 'center'
	}, {
		dataIndex : 'id_kelahiran',
		hidden : true,
		hideable : false,
		menuDisabled : true
	}, {
		dataIndex : 'id_penduduk',
		hidden : true,
		hideable : false,
		menuDisabled : true
	}, {
		dataIndex : 'nama_bayi',
		header : 'Nama Bayi',
		id : 'nama',
		width : 150
	}, {
		dataIndex : 'kelamin_bayi',
		header : 'Gender',
		width : 100
	}, {
		dataIndex : 'tempat_lahir_bayi',
		header : 'Tempat Lahir',
		width : 130
	}, {
		dataIndex : 'tanggal_lahir_bayi',
		header : 'Tanggal Lahir',
		renderer : Ext.util.Format.dateRenderer('d/m/Y'),
		width : 80
	}, {
		dataIndex : 'berat_badan',
		header : 'Berat Badan',
		width : 70
	}, {
		dataIndex : 'keterangan',
		header : 'Keterangan',
		width : 140
	}, {
		dataIndex : 'ibu_bayi',
		header : 'Ibu Bayi',
		width : 140
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

	]
});

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
			dsLihat.load({
						params : {
							start : 0,
							limit : parseInt(limit_combo.getValue())
						}
					});
		});

var gridLihat = new Ext.grid.GridPanel({
	title : 'Data Kelahiran',
	// region:'center',
	// iconCls:'parent-form',
	// viewConfig:{forceFit:true}, //agar colom2 mengecil sendiri waktu diresize
	// windows
	layout : 'fit',
	ds : dsLihat,
	cm : cmLihat,
	stripeRows : true,
	enableColLock : false,
	loadMask : true,
	plugins : filterLihat,
	// autoExpandColumn: 'nama',
	tbar : [{
				text : 'Clear Selected',
				iconCls : 'drop',
				tooltip : {
					title : 'Clear Selected Item',
					text : 'Clear Selected row in grid'
				},
				handler : function() {
					gridLihat.getSelectionModel().clearSelections();
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
					a = gridLihat.getSelectionModel().getSelections();
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
											id_kelahiran : o.id_kelahiran,
											id_penduduk : o.id_penduduk
										});
							});
					if (data.length) {
						Ext.MessageBox.show({
							title : 'Delete?',
							msg : "Are You Sure to delete Selected(s) Data? <br />Data di daftar penduduk akan dihapus juga",
							buttons : Ext.MessageBox.YESNO,
							fn : function(a) {
								if (a == "yes")
									Ext.Ajax.request({
										url : ajax_url,
										params : {
											task : "removeList",
											dataList : Ext.encode(data)
										},
										success : function(response) {
											var res = Ext
													.decode(response.responseText);
											if (res.success) {
												dsLihat.reload();
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
							},
							animEl : 'remove-s',
							icon : Ext.MessageBox.WARNING
						});

					}
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
                                disabled: checkRole(!ROLE.PRINT_DATA),
				iconCls : 'report-pdf',
				tooltip : {
					title : 'Print',
					text : 'Save File to Disk'
				},
				handler : function() {
					if (!checkRole(ROLE.PRINT_DATA)){
						this.disable();
						return false; 		
					}					
					option = gridLihat.store.lastOptions.params;
					options = Ext.urlEncode(option);
					a = this.text;
					pdf = a.search(/PDF/);
					mode_report = (pdf > 0) ? "&mode=pdf" : "&mode=xls";
					report_link = 'report.php?id=' + page + mode_report + "&"
							+ options;
					rType = (pdf > 0) ? 'PDF' : 'XLS';
					winReport({
								id : this.id,
								title : 'Laporan Data Kelahiran',
								url : report_link,
								type : rType
							});

				}
			}],
	bbar : new Ext.PagingToolbar({
				id : 'pagingBar',
				store : dsLihat,
				pageSize : parseInt(limit_combo.getValue()),
				plugins : filterLihat,
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
								filterLihat.clearFilters();
							}
						}, '-', 'Display Per Page ', limit_combo]
			}),
	listeners : {
		activate : function() {
			if (reloadTab2)
				dsLihat.load({
							params : {
								start : 0,
								limit : parseInt(limit_combo.getValue())
							}
						});
			reloadTab2 = false;
		}
	}
});

filterLihat.clearFilters();
for (i = 0; i < gridLihat.getColumnModel().getColumnCount(); i++)
	if (gridLihat.getColumnModel().isMenuDisabled(i) == false)
		gridLihat.getColumnModel().setHidden(i, false);

var main_content = {
	xtype : 'tabpanel',
	id : 'main_content',
	plain : true, // remove the header border
	activeItem : 0,
	items : [{
		layout : 'fit',
		bodyStyle : 'padding:7px;',
		title : 'Form Input Data Kelahiran',
		items : [{
					layout : 'border',
					region : 'center',
					// margins: '5 5 5 0',
					border : false,
					// bodyStyle: 'padding:15px;',
					// viewConfig:{forceFit:true},
					items : [frmKelahiran, detailIbu]
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
				if ((frmKelahiran.getForm().isValid())
						&& (frmKelahiran.getForm().getValues().id_penduduk != "")) {
					// var records = store_detail.getModifiedRecords();
					frmKelahiran.getForm().submit({
						url : ajax_url,
						waitMsg : 'Saving Data',
						params : {
							task : 'addNew'
						},
						success : function(a, b) {
							frmKelahiran.getForm().reset();
							Ext.getCmp('detailIbu').body
									.update('Pilih Ibu yang melahirkan anak tersebut');
							Ext.example.msg('Save Data',
									'Data has been successfully saved');
							reloadTab2 = true;
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
				} else {
					Ext.example
							.msg(
									'Peringatan',
									'Ada data yang tidak boleh kosong, silahkan periksa isian di form dengan tanda merah');
				}
			}
		}, '-', {
			text : 'Reset Form',
			iconCls : 'drop',
			tooltip : {
				title : 'Reset Form',
				text : 'Clear Form and Grid'
			},
			handler : function() {
				frmKelahiran.getForm().reset();
				Ext.getCmp('detailIbu').body
						.update('Pilih Ibu yang melahirkan anak tersebut');
				Ext.example.msg('Reset Form', 'Isian Form telah dibersihkan');
			}
		}]
	}, gridLihat],
	listeners : {
		destroy : function() {
			myWin = Ext.getCmp('winKel');
			if (myWin)
				myWin.destroy();
		}
	}
};
