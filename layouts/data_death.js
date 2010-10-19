/** untuk menandakan bahwa script ini valid dan akan di eksekusi * */
valid_script = true;
ajax_url = 'ajax.handler.php?id=' + page;
/** =============================================================* */
var dsDeath = new Ext.data.JsonStore({
			url : ajax_url,
			id : 'id',
			totalProperty : 'total',
			baseParams : {
				task : 'getDeathAll'
			},
			root : 'data',
			fields : [{
						name : 'id_penduduk'
					}, {
						name : 'nama'
					}, {
						name : 'tanggal_kematian',
						type : 'date',
						dateFormat : 'Y-m-d'
					}, {
						name : 'jam_kematian'
					}, {
						name : 'tempat_makam'
					}, {
						name : 'keterangan'
					}, {
						name : 'no_ktp'
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

var filterDeath = new Ext.ux.grid.GridFilters({
			filters : [{
						type : 'string',
						dataIndex : 'nama'
					}, {
						type : 'date',
						dataIndex : 'tanggal_kematian'
					}, {
						type : 'string',
						dataIndex : 'tempat_makam'
					}, {
						type : 'string',
						dataIndex : 'no_ktp'
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

var cmDeath = new Ext.grid.ColumnModel({
	defaults : {
		sortable : true
	},
	columns : [/*{
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
	},*/expander, {
		dataIndex : 'id_penduduk',
		hidden : true,
		hideable : false,
		menuDisabled : true
	}, {
		dataIndex : 'nama',
		header : 'Nama',
		id : 'nama',
		width : 200
	}, {
		dataIndex : 'tanggal_kematian',
		header : 'Tanggal Kematian',
		width : 100,
		renderer : Ext.util.Format.dateRenderer('d/m/Y')
	}, {
		dataIndex : 'jam_kematian',
		header : 'Jam',
		width : 50
	}, {
		dataIndex : 'tempat_makam',
		header : 'Dimakamkan',
		width : 150
	}, {
		dataIndex : 'keterangan',
		header : 'Keterangan',
		width : 200
	}, {
		dataIndex : 'no_ktp',
		header : 'No KTP',
		width : 100
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
// cmDeath.defaultSortable = true;

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
			dsDeath.load({
						params : {
							start : 0,
							limit : parseInt(limit_combo.getValue())
						}
					});
		});

var gridDeath = new Ext.grid.GridPanel({
	title : 'Data Orang Meninggal',
	// region:'center',
	iconCls : 'parent-form',
	// viewConfig:{forceFit:true}, //agar colom2 mengecil sendiri waktu diresize
	// windows
	//layout : 'fit',
        showPreview: false,
	ds : dsDeath,
	cm : cmDeath,
	stripeRows : true,
	enableColLock : false,
	loadMask : true,
	plugins : [filterDeath,expander],
	// autoExpandColumn: 'nama',
	tbar : [{
		text : 'Batalkan Kematian',
		iconCls : 'drop',
                disabled: checkRole(!ROLE.CANCEL_DATA),
		id : 'batalkan',
		tooltip : {
			title : 'Batalkan Kematian',
			text : 'Batalkan data kematian * jika salah mengisi data'
		},
		handler : function() {
			if (!checkRole(ROLE.CANCEL_DATA)){
				this.disable();
				return false; 		
			}
			a = gridDeath.getSelectionModel().getSelections();
			var data = [];
			Ext.each(a, function(r, i) {
						var o = r.copy(); // mengcopy record agar aslinya
											// tidak dirubah...
						o = o.data;
						for (cnt in o)
							if (Ext.isDate(o[cnt]))
								o[cnt] = Ext.util.Format.date(o[cnt], 'd/m/Y');
						data.push({
									id_penduduk : o.id_penduduk
								});
					});
			if (data.length) {
				Ext.MessageBox.show({
					title : 'Restore',
					msg : "Are You Sure to restore Selected(s) Data?",
					buttons : Ext.MessageBox.YESNO,
					fn : function(a) {
						if (a == "yes") {

							Ext.MessageBox.show({
								msg : 'Saving data, please wait...',
								progressText : 'Saving...',
								wait : true,
								icon : 'ext-mb-download' // custom class in
															// msg-box.html
									// animEl: 'batalkan'
								});

							Ext.Ajax.request({
								url : ajax_url,
								params : {
									task : "restoreDeath",
									dataList : Ext.encode(data)
								},
								success : function(response) {
									var res = Ext.decode(response.responseText);
									setTimeout(function() {
										Ext.MessageBox.hide();
										if (res.success) {
											dsDeath.reload();
											Ext.example
													.msg('Batalkan Kematian',
															'Data penduduk dikembalikan ke data asal');

										} else {
											Ext.MessageBox.show({
												title : 'Alert',
												msg : 'Failed to Restore Data: Error Message : '
														+ res.msg,
												buttons : Ext.MessageBox.OK,
												// animEl: n.id,
												icon : Ext.MessageBox.ERROR
											});
										}
									}, 2000);
								}
							});
						}
					},
					animEl : 'batalkan',
					icon : Ext.MessageBox.WARNING
				});
			}
		}
	}, '-', {
		text : 'Edit Data',
		id : 'btn-edit',
                disabled: checkRole(!ROLE.EDIT_DATA),
		iconCls : 'form-edit',
		enableToggle : true,
		pressed : false,
		tooltip : {
			title : 'Edit Data',
			text : 'View Form Edit Data'
		},
		toggleHandler : function(btn, pressed) {
			if (!checkRole(ROLE.EDIT_DATA)){
				this.disable();
				return false; 		
			}
			
			if (pressed) {
				if (gridDeath.getSelectionModel().hasSelection()) {
					winEdit.show(Ext.get('btn-edit'));
					frm_edit.getForm().setValues(gridDeath.getSelectionModel()
							.getSelected().data);
				}
			} else
				winEdit.hide();
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
			
			option = gridDeath.store.lastOptions.params;
			options = Ext.urlEncode(option);
			a = this.text;
			pdf = a.search(/PDF/);
			mode_report = (pdf > 0) ? "&mode=pdf" : "&mode=xls";
			report_link = 'report.php?id=' + page + mode_report + "&" + options;
			rType = (pdf > 0) ? 'PDF' : 'XLS';
			winReport({
						id : this.id,
						title : 'Laporan Data Orang Meninggal',
						url : report_link,
						type : rType
					});

		}
	}],
	bbar : new Ext.PagingToolbar({
				id : 'pagingBar',
				store : dsDeath,
				pageSize : parseInt(limit_combo.getValue()),
				plugins : filterDeath,
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
								filterDeath.clearFilters();
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
                                                        gridDeath.showPreview = pressed;
                                                        gridDeath.getView().refresh();
                                                    }
                                                }
                                                
                                            ]
			})
});
gridDeath.getView().on("refresh",function(){
    dsDeath.each(function(r,i){
        if (gridDeath.showPreview)
            expander.expandRow(i);
        else
            expander.collapseRow(i);
    });
});

// membuang filter jika pertama kali dibuka
filterDeath.clearFilters();
for (i = 0; i < gridDeath.getColumnModel().getColumnCount(); i++)
	if (gridDeath.getColumnModel().isMenuDisabled(i) == false)
		gridDeath.getColumnModel().setHidden(i, false);

dsDeath.load({
			params : {
				start : 0,
				limit : parseInt(limit_combo.getValue())
			}
		});

/* =========================membuat form edit =========================== */
var item_form = [{
			xtype : 'hidden',
			name : 'id_penduduk',
			allowBlank : false
		}, {
			xtype : 'datefield',
			fieldLabel : 'Tanggal Kematian',
			name : 'tanggal_kematian',
			format : 'd/m/Y',
			maxValue : (new Date()).clearTime(),
			allowBlank : false

		}, {
			xtype : 'timefield',
			fieldLabel : 'Jam Kematian',
			name : 'jam_kematian',
			format : 'H:i',
			allowBlank : false
		}, {
			fieldLabel : 'Tempat Pemakaman',
			name : 'tempat_makam',
			width : 400,
			allowBlank : false
		}, {
			xtype : 'textarea',
			fieldLabel : 'Keterangan Kematian',
			name : 'keterangan',
			allowBlank : true,
			width : 400,
			height : 100
		}];
var frm_edit = new Ext.FormPanel({
			id : 'frm_edit',
			frame : true,
			url : ajax_url,
			border : false,
			bodyStyle : 'padding:5px 5px 0 5px',
			labelAlign : 'left',
			labelWidth : 200,
			defaults : {
				width : 100,
				labelSeparator : ''
			},
			defaultType : 'textfield',
			items : item_form

		});

var winEdit = new Ext.Window({
			layout : 'fit',
			id : 'winEdit',
			width : 650,
			height : 300,
			closeAction : 'hide',
			iconCls : 'form',
			title : 'Edit Data Kematian',
			modal : true,
			plain : true,
			border : false,
			items : [frm_edit

			],
			buttons : [{
				text : 'Save',
				handler : function() {
					if (frm_edit.getForm().isValid()) {
						frm_edit.getForm().submit({
							waitMsg : 'Saving Data',
							params : {
								task : 'saveEdit'
							},
							success : function(a, b) {
								winEdit.hide();
								dsDeath.reload();
								Ext.example.msg('Save Data',
										'Data has been successfully saved');
							},
							failure : function(a, b) {
								Ext.MessageBox.show({
											title : 'Alert',
											msg : 'Failed Save Data : '
													+ b.result.msg,
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
				}
			}
		});
/* ====================================================================== */

var main_content = {
	xtype : 'tabpanel',
	id : 'main_content',
	plain : true, // remove the header border
	activeItem : 0,
	items : [gridDeath],
	listeners : {
		destroy : function() {
			myWin = Ext.getCmp('winEdit');
			if (myWin)
				myWin.destroy();
		}
	}
};
