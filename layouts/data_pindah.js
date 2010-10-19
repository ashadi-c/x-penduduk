/** untuk menandakan bahwa script ini valid dan akan di eksekusi * */
valid_script = true;
ajax_url = 'ajax.handler.php?id=' + page;
/** =============================================================* */

/** -------------->Tab 1 Browse Data <-------------------------* */

var dsPin = new Ext.data.GroupingStore({
			url : ajax_url,
			id : 'id',
			baseParams : {
				task : 'getDataPindah'
			},
			reader : new Ext.data.JsonReader({
						totalProperty : 'total',
						root : 'data',
						fields : [{
									name : 'id_pindah'
								}, {
									name : 'group_pindah'
								}, {
									name : 'id_penduduk'
								}, {
									name : 'alasan_pindah'
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
									name : 'tgl_pindah',
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

						]
					}),
			sortInfo : {
				field : 'id_pindah',
				direction : 'ASC'
			},
			groupField : 'group_pindah',
			remoteSort : true
		});

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
						type : 'date',
						dataIndex : 'tgl_pindah'
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

var cmPin = new Ext.grid.ColumnModel({
			defaults : {
				sortable : true
			},
			columns : [{
						dataIndex : 'id_pindah',
						hidden : true,
						hideable : false,
						menuDisabled : true
					},expander, {
						dataIndex : 'group_pindah',
						hidden : true,
						hideable : false,
						menuDisabled : true
					}, {
						dataIndex : 'id_penduduk',
						hidden : true,
						hideable : false,
						menuDisabled : true
					}, {
						dataIndex : 'alasan_pindah',
						hidden : true,
						hideable : false,
						menuDisabled : true
					}, {
						dataIndex : 'tgl_pindah',
						header : 'Tanggal Pindah',
						groupable : false,
						width : 100,
						renderer : Ext.util.Format.dateRenderer('d/m/Y')
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
					}]
		});

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
			dsPin.load({
						params : {
							start : 0,
							limit : parseInt(limit_combo.getValue())
						}
					});
		});

var gridAll = new Ext.grid.GridPanel({
	title : 'Data Orang Pindah',
	region : 'center',
	iconCls : 'parent-form',
	// viewConfig:{forceFit:true}, //agar colom2 mengecil sendiri waktu diresize
	// windows
	// layout:'fit',
	ds : dsPin,
        showPreview: false,
	cm : cmPin,
	view : new Ext.grid.GroupingView({
		forceFit : false,
		groupTextTpl : 'Tanggal Pindah : {[Ext.util.Format.date(values.rs[0].data.tgl_pindah,"d/m/Y")]}, Alasan Pindah : {[values.rs[0].data.alasan_pindah]} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})',
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
                disabled: checkRole(!ROLE.REMOVE_DATA),
		id : 'remove-s',
		tooltip : {
			title : 'Remove Selected Item',
			text : 'Remove Selected row in grid'
		},
		handler : function() {
			if (!checkRole(ROLE.REMOVE_DATA)){
				this.disable();
				return false; 		
			}
			
			a = gridAll.getSelectionModel().getSelections();
			var data = [];
			Ext.each(a, function(r, i) {
						var o = r.copy(); // mengcopy record agar aslinya
											// tidak dirubah...
						o = o.data;
						for (cnt in o)
							if (Ext.isDate(o[cnt]))
								o[cnt] = Ext.util.Format.date(o[cnt], 'd/m/Y');
						data.push({
									id_pindah : o.id_pindah,
									id_penduduk : o.id_penduduk
								});
					});
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
									task : "removeList",
									dataList : Ext.encode(data)
								},
								success : function(response) {
									Ext.getCmp('content-panel').body.unmask();
									var res = Ext.decode(response.responseText);
									if (res.success) {
										dsPin.reload();
										dsAlasan.removeAll();
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
			
			option = gridAll.store.lastOptions.params;
			options = Ext.urlEncode(option);
			a = this.text;
			pdf = a.search(/PDF/);
			mode_report = (pdf > 0) ? "&mode=pdf" : "&mode=xls";
			report_link = 'report.php?id=' + page + mode_report + "&" + options;
			rType = (pdf > 0) ? 'PDF' : 'XLS';
			winReport({
						id : this.id,
						title : 'Laporan Data Orang Pindah',
						url : report_link,
						type : rType
					});

		}

	},'-',{
            text:'Buat Surat Pindah',
            iconCls:'pindah-kk',
            disabled: checkRole(!ROLE.SURAT_PINDAH),
            tooltip: {
                title: 'Surat Keterangan Pindah',
                text:'Buat Surat Keterangan Pindah'
            },
            handler: function(){
                if (!checkRole(ROLE.SURAT_PINDAH)){
                        this.disable();
                        return false; 		
                }
                if (!gridAll.getSelectionModel().getSelected())
                    return false;
                 Ext.MessageBox.prompt('Surat Keterangan Pindah', 'Silahkan Isi Nomor Pindah:',
                 function(btn,text){
                     if (btn =="ok"){
                         group_pindah = gridAll.getSelectionModel().getSelected().data.group_pindah;
                         nomor_pindah = text;
                         group_pindah = "&group_pindah="+group_pindah;
                         nomor_pindah = "&nomor_pindah="+nomor_pindah;
                         report_link = 'report.php?id=' + page + "&mode=spt" + group_pindah + nomor_pindah;
			winReport({
						id : this.id,
						title : 'Surat Keterangan Pindah',
						url : report_link,
						type : 'PDF'
					});
                     }
                 });
            }
        }],
	bbar : new Ext.PagingToolbar({
				id : 'pagingBar',
				store : dsPin,
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
gridAll.getView().on("refresh",function(){
    dsPin.each(function(r,i){
        if (gridAll.showPreview)
            expander.expandRow(i);
        else
            expander.collapseRow(i);
    });
});

gridAll.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
			dsAlasan.load({
						params : {
							group_pindah : r.data.group_pindah
						}
					});
			Ext.getCmp('tbar-tgl-pindah').setValue(r.data.tgl_pindah);
		});

// membuang filter jika pertama kali dibuka
filtersAll.clearFilters();
for (i = 0; i < gridAll.getColumnModel().getColumnCount(); i++)
	if (gridAll.getColumnModel().isMenuDisabled(i) == false)
		gridAll.getColumnModel().setHidden(i, false);

// meload data dari database
dsPin.load({
			params : {
				start : 0,
				limit : parseInt(limit_combo.getValue())
			}
		});

/** -------------->End Of Tab1<-------------------------* */

var dsAlasan = new Ext.data.JsonStore({
			url : ajax_url,
			id : 'id',
			totalProperty : 'total',
			baseParams : {
				task : 'getAlasan'
			},
			root : 'data',
			fields : [{
						name : 'name'
					}, {
						name : 'field'
					}, {
						name : 'value'
					}],
			// sortInfo: {field: 'name', direction: 'ASC'},
			remoteSort : false
		});

var editor = new Ext.ux.grid.RowEditor({
			saveText : 'Change'
		});

var cmAlasan = new Ext.grid.ColumnModel({
			defaults : {
				sortable : false
			},
			columns : [{
						dataIndex : 'name',
						header : 'Name',
						width : 150
					}, {
						dataIndex : 'field',
						hidden : true,
						hideable : false,
						menuDisabled : true
					}, {
						dataIndex : 'value',
						header : 'Value',
						width : 300,
						editor : {
							xtype : 'textfield',
							allowBlank : false
						}
					}]
		});

var gridAlasan = new Ext.grid.GridPanel({
	region : 'south',
	height : 220,
	 title:'Detail Pindah',
	iconCls : 'app-grid',
	// viewConfig:{forceFit:true}, //agar colom2 mengecil sendiri waktu diresize
	// windows
	ds : dsAlasan,
	cm : cmAlasan,
	stripeRows : true,
	collapsible : true,
	enableColLock : false,
	loadMask : true,
	split : true,
	cmargins : '2 0 0 0',
	plugins : [editor],
	tbar : ['Tanggal Pindah ', '-', {
				xtype : 'datefield',
				id : 'tbar-tgl-pindah',
				format : 'd/m/Y',
				//maxValue : (new Date()).clearTime(),
				width : 100,
				allowBlank : false
			}, '-', {
				text : 'Save',
				iconCls : 'icon-save',
				id : 'btn-save',
                                disabled: checkRole(!ROLE.SAVE_DATA),
				tooltip : 'Save Changed Data',
				handler : function() {
					if (!checkRole(ROLE.SAVE_DATA)){
						this.disable();
						return false; 		
					}
					editor.stopEditing();
					gridAlasan.getView().refresh();
					isV = Ext.getCmp('tbar-tgl-pindah').isValid();
					isS = gridAll.getSelectionModel().hasSelection();
					if (!isV)
						Ext.example.msg('Is Not Valid',
								'Tanggal Pindah Harus di isi');
					else if (!isS)
						Ext.example.msg('Error', 'Please Select Data First');
					if (isV && isS) {
						tgl_pindah = Ext.getCmp('tbar-tgl-pindah').getValue();
						o_tgl_pindah = Ext.util.Format
								.date(tgl_pindah, 'Y-m-d');
						var data = [];
						data.push({
									field : 'tgl_pindah',
									value : o_tgl_pindah
								});
						dsAlasan.each(function(r, i) {
									o = r.copy();
									o = o.data;
									data.push(o);
								});
						Ext.MessageBox.show({
							title : 'Information?',
							msg : "Save Data Change?",
							buttons : Ext.MessageBox.YESNO,
							fn : function(a) {
								if (a == "yes") {
									Ext.getCmp('content-panel').body.mask(
											'Saving Data', 'x-mask-loading');
									Ext.Ajax.request({
										url : ajax_url,
										params : {
											task : "editData",
											dataList : Ext.encode(data),
											group_pindah : gridAll
													.getSelectionModel()
													.getSelected().data.group_pindah
										},
										success : function(response) {
											Ext.getCmp('content-panel').body
													.unmask();
											var res = Ext
													.decode(response.responseText);
											if (res.success) {
												dsAlasan.reload();
												Ext.example
														.msg('Save Update',
																'Data has been successfully update');

											} else {
												Ext.MessageBox.show({
													title : 'Alert',
													msg : 'Failed to Update Data: Error Message : '
															+ res.msg,
													buttons : Ext.MessageBox.OK,
													animEl : 'btn-save',
													icon : Ext.MessageBox.ERROR
												});
											}
										}
									});
								}
							},
							animEl : 'btn-save',
							icon : Ext.MessageBox.INFO
						});

					}
				}
			}, '-', {
				text : 'Reload',
				iconCls : 'drop',
				tooltip : 'Reload Data',
				handler : function() {
					isS = gridAll.getSelectionModel().hasSelection();
					if (isS) {
						editor.stopEditing();
						dsAlasan.load({
									params : {
										group_pindah : gridAll
												.getSelectionModel()
												.getSelected().data.group_pindah
									}
								});
						Ext.getCmp('tbar-tgl-pindah')
								.setValue(r.data.tgl_pindah);
					}
				}
			}]
});

var main_content = {
	id : 'main_content',
	plain : true, // remove the header border
	layout : 'border',
	border : false,
	items : [gridAll, gridAlasan]
};
