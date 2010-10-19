/** untuk menandakan bahwa script ini valid dan akan di eksekusi * */
valid_script = true;
ajax_url = 'ajax.handler.php?id=' + page;
/** =============================================================* */

var ds1 = new Ext.data.JsonStore({
			url : ajax_url,
			id : 'id',
			totalProperty : 'total',
			baseParams : {
				task : 'getPenduduk'
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

var filter1 = new Ext.ux.grid.GridFilters({
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

var cm1 = new Ext.grid.ColumnModel({
	defaults : {
		sortable : true
	},
	columns : [
            /*{
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
			// repeat-x;border-top:1px solid #ddd;border-bottom:1px solid
			// #ccc;';
			return the_number;
		},
		align : 'center'
	}, */ expander,{
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
			ds1.load({
						params : {
							start : 0,
							limit : parseInt(limit_combo.getValue())
						}
					});
		});

var grid1 = new Ext.grid.GridPanel({
	ddGroup : 'grid2DDGroup',
	enableDragDrop : true,
	title : 'Data Penduduk',
	region : 'center',
	iconCls : 'parent-form',
	// viewConfig:{forceFit:true}, //agar colom2 mengecil sendiri waktu diresize
	// windows
	//layout : 'fit',
	ds : ds1,
	cm : cm1,
        showPreview: false,
	stripeRows : true,
	enableColLock : false,
	loadMask : true,
	plugins : [filter1,expander],
	// autoExpandColumn: 'nama',
	tbar : [{
		text : 'Save',
		iconCls : 'icon-save',
                disabled: checkRole(!ROLE.SAVE_DATA),
		tooltip : {
			title : 'Save',
			text : 'Save Data'
		},
		handler : function() {
			if (!checkRole(ROLE.SAVE_DATA)){
				this.disable();
				return false; 		
			}			
			var data = [];
			ds2.each(function(r, i) {
						record = r.copy();
						data.push({
									id_penduduk : record.data.id_penduduk
								});
					});
			if (data.length)
				if (Ext.getCmp('form-pindah').getForm().isValid()) {
					Ext.getCmp('form-pindah').getForm().submit({
								url : ajax_url,
								waitMsg : 'Saving Data',
								params : {
									task : 'addNew',
									dataList : Ext.encode(data)
								},
								success : function(a, b) {
									Ext.getCmp('form-pindah').getForm().reset();
									ds1.reload();
									ds2.removeAll();
									Ext.example.msg('Save',
											'Data telah tersimpan');
                                                                         Ext.MessageBox.prompt('Surat Keterangan Pindah', 'Silahkan Isi Nomor Pindah:',
                                                                         function(btn,text){
                                                                             if (btn =="ok"){
                                                                                 group_pindah = b.result.id_group;
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
				} else
					Ext.example
							.msg(
									'Peringatan',
									'Ada data yang tidak boleh kosong, silahkan periksa isian di form dengan tanda merah');
		}
	}, '-', {
		text : 'Reset',
		iconCls : 'drop',
		tooltip : {
			title : 'Reset',
			text : 'Reset All'
		},
		handler : function() {
			ds1.reload();
			ds2.removeAll();
			Ext.getCmp('form-pindah').getForm().reset();
		}
	}],
	bbar : new Ext.PagingToolbar({
				id : 'pagingBar',
				store : ds1,
				pageSize : parseInt(limit_combo.getValue()),
				plugins : filter1,
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
								filter1.clearFilters();
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
                                                        grid1.showPreview = pressed;
                                                        grid1.getView().refresh();
                                                    }
                                                }

                                            ]
			}),
	listeners : {
		afterrender : function() {
			setUpDrag1();
		}
	}
});

// membuang filter jika pertama kali dibuka
filter1.clearFilters();
for (i = 0; i < grid1.getColumnModel().getColumnCount(); i++)
	if (grid1.getColumnModel().isMenuDisabled(i) == false)
		grid1.getColumnModel().setHidden(i, false);

// action grid
grid1.getView().on("refresh",function(){
    ds1.each(function(r,i){
        if (grid1.showPreview)
            expander.expandRow(i);
        else
            expander.collapseRow(i);
    });
});

ds1.load({
			params : {
				start : 0,
				limit : parseInt(limit_combo.getValue())
			}
		});

var ds2 = new Ext.data.ArrayStore({
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
					}]
		});

var cm2 = new Ext.grid.ColumnModel({
			defaults : {
				sortable : true
			},
			columns : [new Ext.grid.RowNumberer(), {
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
					}]
		});

var grid2 = new Ext.grid.GridPanel({
			region : 'south',
			split : true,
			ddGroup : 'grid1DDGroup',
			enableDragDrop : true,
			title : 'Data Orang Pindah',
			collapsible : true,
			collapsed : false,
			loadMask : true,
			enableColLock : false,
			margins : '0',
			height : 270,
			iconCls : 'browse',
			cmargins : '3 0 0 0',
			store : ds2,
			cm : cm2,
			tbar : [{
				text : 'Remove Selected',
				iconCls : 'table-delete',
				id : 'remove-s',
				tooltip : {
					title : 'Remove Selected Item',
					text : 'Remove Selected row in grid'
				},
				handler : function() {
					a = grid2.getSelectionModel().getSelections();
					Ext.each(a, function(r, i) {
								var foundItem = ds1.findExact('id_penduduk',
										r.data.id_penduduk);
								if (foundItem == -1)
									ds1.add(r);
								ds2.remove(r);
							});
				}
			}, '-', {
				text : 'Reset All',
				iconCls : 'drop',
				tooltip : {
					title : 'Clear Grid',
					text : 'Clear Grid All'
				},
				handler : function() {
					ds2.each(function(record, i) {
								var foundItem = ds1.findExact('id_penduduk',
										record.data.id_penduduk);
								// if not found
								if (foundItem == -1)
									ds1.add(record);
								ds2.remove(record);
							});

				}
			}, '-', {
				text : 'Tarik Data dari data Penduduk Ke Bawah',
				iconCls : 'arrow-down',
				handler : function() {
					a = grid1.getSelectionModel().getSelections();
					Ext.each(a, function(r, i) {
								var foundItem = ds2.findExact('id_penduduk',
										r.data.id_penduduk);
								if (foundItem == -1) {
									ds2.add(r);
									ds1.remove(r);
								}
							});
				}
			}],
			listeners : {
				afterrender : function() {
					setUpDrag();
				}
			}
		});

function setUpDrag() {
	var secondGridDropTargetEl = grid2.getView().el.dom.childNodes[0].childNodes[1];

	var destGridDropTarget = new Ext.dd.DropTarget(secondGridDropTargetEl, {
				ddGroup : 'grid2DDGroup',
				copy : false,
				notifyDrop : function(ddSource, e, data) {

					// Generic function to add records.
					function addRow(record, index, allItems) {

						// Search for duplicates
						var foundItem = ds2.findExact('id_penduduk',
								record.data.id_penduduk);
						// if not found
						if (foundItem == -1) {
							ds2.add(record);
							// Call a sort dynamically
							ds2.sort('nama', 'ASC');

							// Remove Record from the source
							ddSource.grid.store.remove(record);
						}
					}
					// Loop through the selections
					Ext.each(ddSource.dragData.selections, addRow);
					return (true);
				}
			});
}

function setUpDrag1() {
	var firstGridDropTargetEl = grid1.getView().el.dom.childNodes[0].childNodes[1];

	var destGridDropTarget2 = new Ext.dd.DropTarget(firstGridDropTargetEl, {
				ddGroup : 'grid1DDGroup',
				copy : false,
				notifyDrop : function(ddSource, e, data) {

					// Generic function to add records.
					function addRow(record, index, allItems) {

						// Search for duplicates
						var foundItem = ds1.findExact('id_penduduk',
								record.data.id_penduduk);
						// if not found
						if (foundItem == -1) {
							ds1.add(record);
							// Call a sort dynamically
							// ds1.sort('nama', 'ASC');

							// Remove Record from the source
							ddSource.grid.store.remove(record);
						}
					}
					// Loop through the selections
					Ext.each(ddSource.dragData.selections, addRow);
					return (true);
				}
			});
}

var item1 = {
	layout : 'border',
	region : 'center',
	border : false,
	margins : '0 0 0 0',
	items : [grid1, grid2]
};

var item2 = {
	region : 'east',
	id : 'form-pindah',
	split : true,
	iconCls : 'form',
	title : 'Keterangan Pindah',
	collapsible : true,
	margins : '0 0 0 0',
	cmargins : '0 0 0 3',
	width : 200,
	bodyStyle : "padding: 4px;",
	xtype : 'form',
	labelAlign : 'top',
	labelWidth : 70,
	defaults : {
		anchor : '95%',
		labelSeparator : ''
	},
	defaultType : 'textfield',
	autoScroll : true,
	items : [{
				fieldLabel : 'Tanggal Pindah',
				name : 'tanggal_pindah',
				xtype : 'datefield',
				//maxValue : (new Date()).clearTime(),
				format : 'd/m/Y',
				allowBlank : false
			}, {
				fieldLabel : 'Alamat',
				name : 'alamat',
				allowBlank : false
			}, {
				fieldLabel : 'Kelurahan',
				name : 'kelurahan',
				allowBlank : false
			}, {
				fieldLabel : 'Kecamatan',
				name : 'kecamatan',
				allowBlank : false
			}, {
				fieldLabel : 'Kabupaten/Kota',
				name : 'kota',
				allowBlank : false
			}, {
				fieldLabel : 'Propinsi',
				name : 'propinsi',
				allowBlank : false
			}, {
				fieldLabel : 'Alasan Pindah',
				name : 'alasan',
				allowBlank : true,
				xtype : 'textarea',
				height : 50
			}],
	bbar : [{
				text : 'Reset Form',
				iconCls : 'drop',
				tooltip : {
					title : 'Reset Form',
					text : 'Reset Input Form'
				},
				handler : function() {
					Ext.getCmp('form-pindah').getForm().reset();
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