/** untuk menandakan bahwa script ini valid dan akan di eksekusi * */
valid_script = true;
ajax_url = 'ajax.handler.php?id=' + page;
/** =============================================================* */
var id_penduduk = new Ext.form.TextField({
			name : 'id_penduduk',
			id : 'id_penduduk',
			allowBlank : false,
                        hidden: true
		});
var tanggal_kematian = new Ext.form.DateField({
			fieldLabel : 'Tanggal Kematian',
			name : 'tanggal_kematian',
			labelSeparator : '',
			maxValue : (new Date()).clearTime(),
			format : 'd/m/Y',
			width : 100,
			allowBlank : false
		});

var jam_kematian = new Ext.form.TimeField({
			fieldLabel : 'Jam Kematian',
			labelSeparator : '',
			name : 'jam_kematian',
			format : 'H:i',
			allowBlank : false,
			width : 100
		});

var tempat_makam = new Ext.form.TextField({
			fieldLabel : 'Tempat Pemakaman',
			name : 'tempat_makam',
			labelSeparator : '',
			anchor : '95%',
			allowBlank : false
		});

var keterangan = new Ext.form.TextArea({
			fieldLabel : 'Keterangan Kematian',
			labelSeparator : '',
			name : 'keterangan',
			allowBlank : true,
			anchor : '95%',
			height : 80
		});

var frmKeterangan = new Ext.FormPanel({
			id : 'frmKeterangan',
			region : 'center',
			frame : true,
			title : 'Keterangan Kematian',
			iconCls : 'form',
			border : true,
			labelAlign : 'left',
			bodyStyle : 'padding:5px 5px 0 15px',
			labelWidth : 150,
			items : [id_penduduk,tanggal_kematian, jam_kematian, tempat_makam, keterangan]

		});
/** membuat grid untuk menampilkan data penduduk * */
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
// cmx.defaultSortable = true;
// dsWindows.load({params:{start: 0, limit: 30}});
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
var detailTplMarkup = [
		'<div style="float:left;" ><img src="upload_foto/{picture}" /></div>',
		'<div style="margin-left:110px;">', '<h2>{nama}</h2>',
		'<p>No Kartu Keluarga : {no_kk}</p>', '<p>No Ktp: {no_ktp}</p>',
		'<p>Tempat Tanggal Lahir : {tempat_lahir}, {tanggal_lahir}</p>',
		'<p>RT/RW: {rt}/{rw}</p>', '<p>Dusun: {dusun}</p>', '</div>'

];

var detailTpl = new Ext.Template(detailTplMarkup);

var detailOrang = {
	id : 'detailOrang',
	region : 'south',
	split : true,
	height : 240,
	collapsible : true,
	cmargins : '2 0 0 0',
	title : 'Keterangan Penduduk',
	iconCls : 'user-female',
	autoScroll : true,
	bodyStyle : {
		background : '#eee',
		padding : '7px'
	},
	html : 'Pilih Penduduk yang Meninggal',
	tbar : [{
				text : 'Pilih Penduduk',
				iconCls : 'add-data',
				tooltip : {
					title : 'Pilih Penduduk',
					text : 'Pilih Penduduk yang Meninggal'
				},
				handler : function() {
					winGrid.show(this.id);
				}
			}, '-', {
				text : 'Reset',
				iconCls : 'drop',
				tooltip : {
					title : 'Reset',
					text : ''
				},
				handler : function() {
					Ext.getCmp('detailOrang').body
							.update('Pilih Penduduk yang Meninggal');
                                        frmKeterangan.getForm().setValues({id_penduduk:''});
				}
			}]
};

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
				frmKeterangan.getForm().setValues(
                                {id_penduduk: gridWindows.getSelectionModel()
						.getSelected().data.id_penduduk
                                })
				winGrid.hide();
                                detIbu = Ext.getCmp('detailOrang');
                                rd = gridWindows.getSelectionModel().getSelected();
                                r = rd.copy();
                                r.data.tanggal_lahir = Ext.util.Format.date(
                                                r.data.tanggal_lahir, 'd, F Y');
                                detailTpl.overwrite(detIbu.body, r.data);
                                detIbu.body.highlight('#c3daf9', {
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

/** =============================================* */

var main_content = {
	xtype : 'tabpanel',
	id : 'main_content',
	plain : true, // remove the header border
	activeItem : 0,
	items : [{
		layout : 'fit',
		bodyStyle : 'padding:7px;',
		title : 'Form Input Data Kematian Penduduk',
		items : [{
					layout : 'border',
					region : 'center',
					// margins: '5 5 5 0',
					border : false,
					// bodyStyle: 'padding:15px;',
					// viewConfig:{forceFit:true},
					items : [frmKeterangan,detailOrang]
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
				if (frmKeterangan.getForm().isValid()) {
					// var records = store_detail.getModifiedRecords();
					frmKeterangan.getForm().submit({
						url : ajax_url,
						waitMsg : 'Saving Data',
						params : {
							task : 'addNew'
						},
						success : function(a, b) {
							frmKeterangan.getForm().reset();
                                                        Ext.getCmp('detailOrang').body.update('Pilih Orang yang Meninggal');
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
                                Ext.getCmp('detailOrang').body
						.update('Pilih Orang yang Meninggal');

				frmKeterangan.getForm().reset();
				Ext.example
						.msg('Reset Form',
								'Isian Form dan Anggota telah di reset ulang, Silahkan isi kembali');
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