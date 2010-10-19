/** untuk menandakan bahwa script ini valid dan akan di eksekusi * */
valid_script = true;
ajax_url = 'ajax.handler.php?id=' + page;
/** =============================================================* */

/** -------------->Tab 2 Input Data<-------------------------* */
var no_ktp = new Ext.form.TextField({
			fieldLabel : 'NO KTP',
			name : 'no_ktp',
			labelSeparator : '',
			anchor : '95%',
			allowBlank : true
		});

var no_kk = new Ext.form.TextField({
			fieldLabel : 'NO Kartu Keluarga',
			name : 'no_kk',
			labelSeparator : '',
			anchor : '95%',
			allowBlank : true
		});

var emp_name = new Ext.form.TextField({
			fieldLabel : 'Nama Penduduk',
			labelSeparator : '',
			name : 'emp_name',
			anchor : '95%',
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
			anchor : '95%'
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
			width : 150
		});

var place_of_birth = new Ext.form.TextField({
			fieldLabel : 'Tempat Lahir',
			labelSeparator : '',
			name : 'place_of_birth',
			anchor : '95%',
			allowBlank : true
		});

var date_of_birth = new Ext.form.DateField({
			fieldLabel : 'Tanggal Lahir',
			name : 'date_of_birth',
			labelSeparator : '',
			format : 'd/m/Y',
			maxValue : (new Date()).clearTime(),
			anchor : '95%',
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
			anchor : '95%'
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
			anchor : '95%'
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
			anchor : '95%'
		});

var pekerjaan = new Ext.form.TextField({
			fieldLabel : 'Pekerjaan',
			labelSeparator : '',
			name : 'pekerjaan',
			anchor : '95%',
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
			anchor : '95%'
		});

comboBaca.setValue('Bisa');

var rt = new Ext.form.NumberField({
			fieldLabel : 'RT',
			labelSeparator : '',
			name : 'rt',
			anchor : '95%',
			allowBlank : false
		});

var rw = new Ext.form.NumberField({
			fieldLabel : 'RW',
			labelSeparator : '',
			name : 'rw',
			anchor : '95%',
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
			anchor : '95%',
			emptyText : 'Pilih Dusun',
			allowBlank : false
		});

var company = new Ext.form.TriggerField({
			fieldLabel : 'Company',
			name : 'company',
			labelSeparator : '',
			width : 200,
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
			anchor : '95%'
		});

comboActive.setValue(1);

var foto = new Ext.form.TextField({
			fieldLabel : 'Pilih Foto',
			labelSeparator : '',
			name : 'foto',
			anchor : '95%'
		});

var frmInput = new Ext.FormPanel({
			id : 'mygrid',
			region : 'north',
			height : 260,
			frame : true,
			split : true,
			iconCls : 'form',
			url : ajax_url,
			title : 'Kepala Keluarga',
			border : true,
			// bodyStyle:'padding:5px 5px 0',
			labelAlign : 'left',
			layout : 'column',
			items : [{
				columnWidth : 0.5,
				xtype : 'fieldset',
				labelWidth : 120,
				// defaults: {width: 140}, // Default config options for child
				// items
				// defaultType: 'textfield',
				autoHeight : true,
				bodyStyle : Ext.isIE
						? 'padding:0 0 5px 15px;'
						: 'padding:10px 15px;',
				border : false,
				style : {
					"margin-left" : "5px", // when you add custom margin in IE
											// 6...
					"margin-right" : Ext.isIE6 ? (Ext.isStrict
							? "-10px"
							: "-13px") : "0" // you have to adjust for it
												// somewhere else
				},
				items : [no_kk, no_ktp, emp_name, comboGender, place_of_birth,
						date_of_birth, comboMaritalstatus, comboRegion]
			}, {
				columnWidth : 0.5,
				xtype : 'fieldset',
				labelWidth : 120,
				// defaults: {width: 140}, // Default config options for child
				// items
				// defaultType: 'textfield',
				autoHeight : true,
				bodyStyle : Ext.isIE
						? 'padding:0 0 5px 15px;'
						: 'padding:10px 15px;',
				border : false,
				style : {
					"margin-left" : "5px", // when you add custom margin in IE
											// 6...
					"margin-right" : Ext.isIE6 ? (Ext.isStrict
							? "-10px"
							: "-13px") : "0" // you have to adjust for it
												// somewhere else
				},
				items : [comboPendidikan, pekerjaan, comboBaca, rt, rw,
						comboDusun, comboActive

				]
			}]
		});

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
				header : "Hubungan",
				dataIndex : 'hub',
				width : 80,
				align : 'left',
				editor : new Ext.form.ComboBox({
							typeAhead : true,
							triggerAction : 'all',
							store : dsKeluarga,
							mode : 'local',
							displayField : 'hubungan',
							valueField : 'hubungan',
							lazyRender : true,
							listClass : 'x-combo-list-small'
						})
			}, {
				header : "No KTP",
				dataIndex : 'no_ktp',
				width : 120,
				editor : new fm.TextField({
							allowBlank : true
						})
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
				editor : new Ext.form.ComboBox({
							typeAhead : true,
							triggerAction : 'all',
							store : dsgender,
							mode : 'local',
							displayField : 'EMP_GENDER',
							valueField : 'GENDER_VALUE',
							lazyRender : true,
							listClass : 'x-combo-list-small'
						})
			}, {
				header : "Tempat Lahir",
				dataIndex : 'tmp_lahir',
				width : 100,
				editor : new fm.TextField({
							allowBlank : true
						})
			}, {
				header : "Tanggal Lahir",
				dataIndex : 'tgl_lahir',
				width : 100,
				renderer : formatDate,
				editor : new fm.DateField({
					format : 'd/m/Y',
					allowBlank : false,
					maxValue : (new Date()).clearTime(),
					// minValue: '01/01/06',
					// disabledDays: [0, 6],
					disabledDaysText : 'Tanggal lahir harus lebih kecil dari besok'
				})
			}, {
				header : "Status Kawin",
				dataIndex : 'st_kawin',
				width : 100,
				align : 'left',
				editor : new Ext.form.ComboBox({
							typeAhead : true,
							triggerAction : 'all',
							store : dsmarital,
							mode : 'local',
							displayField : 'MARITAL_STATUS',
							valueField : 'MARITAL_STATUS',
							lazyRender : true,
							listClass : 'x-combo-list-small'
						})
			}, {
				header : "Agama",
				dataIndex : 'agama',
				width : 100,
				align : 'left',
				editor : new Ext.form.ComboBox({
							typeAhead : true,
							triggerAction : 'all',
							store : dsregion,
							mode : 'local',
							displayField : 'REGION_1',
							valueField : 'REGION_2',
							lazyRender : true,
							listClass : 'x-combo-list-small'
						})
			}, {
				header : "Pendidikan",
				dataIndex : 'pendidikan',
				width : 100,
				align : 'left',
				editor : new Ext.form.ComboBox({
							typeAhead : true,
							triggerAction : 'all',
							store : dsPendidikan,
							mode : 'local',
							displayField : 'PENDIDIKAN',
							valueField : 'PENDIDIKAN',
							lazyRender : true,
							listClass : 'x-combo-list-small'
						})
			}, {
				header : "Pekerjaan",
				dataIndex : 'pekerjaan',
				width : 100,
				editor : new fm.TextField({
							allowBlank : true
						})
			}, {
				header : "RT",
				dataIndex : 'rt',
				align : 'right',
				width : 40,
				editor : new fm.NumberField({
							allowBlank : false
						})
			}, {
				header : "RW",
				dataIndex : 'rw',
				align : 'right',
				width : 40,
				editor : new fm.NumberField({
							allowBlank : false
						})
			}, {
				header : "Dusun",
				dataIndex : 'dusun',
				width : 100,
				align : 'left',
				editor : new Ext.form.ComboBox({
							typeAhead : true,
							triggerAction : 'all',
							store : dsDusun,
							mode : 'local',
							displayField : 'dusun',
							valueField : 'dusun',
							lazyRender : true,
							listClass : 'x-combo-list-small'
						})
			}, checkColumn

	]
});

// cmDetail.defaultSortable = true;

var Plant = Ext.data.Record.create([
// the "name" below matches the tag name to read, except "tgl_lahir"
		// which is mapped to the tag "availability"
		{
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
			dateFormat : 'd/m/Y'
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
			name : 'rt',
			type : 'float'
		}, {
			name : 'rw',
			type : 'float'
		}, {
			name : 'dusun',
			type : 'string'
		}, {
			name : 'baca_tulis',
			type : 'bool'
		}]);

// create the Data Store
var store_detail = new Ext.data.SimpleStore({
			fields : [{
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
						dateFormat : 'd/m/Y'
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
						name : 'rt',
						type : 'float'
					}, {
						name : 'rw',
						type : 'float'
					}, {
						name : 'dusun',
						type : 'string'
					}, {
						name : 'baca_tulis',
						type : 'bool'
					}]
		});

// create the editor grid
var gridDetail = new Ext.grid.EditorGridPanel({
	region : 'center',
	// layout:'fit',
	// height:260,
	store : store_detail,
	// viewConfig:{forceFit:true},
	cm : cmDetail,
	frame : false,
	plugins : checkColumn,
	clicksToEdit : 1,
	tbar : [{
		text : 'Tambah Anggota Keluarga',
		iconCls : 'table-add',
		tooltip : {
			title : 'Tambah Anggota Keluarga',
			text : 'Add new Row on Grid'
		},
		handler : function() {
			var myPlant = new Plant({
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
						dusun : comboDusun.getValue(),
						rt : rt.getValue(),
						rw : rw.getValue(),
						baca_tulis : true
					});
			gridDetail.stopEditing();
			store_detail.add(myPlant);
			gridDetail.startEditing(store_detail.getCount() - 1, 0);
			Ext.example.msg('Tambah Anggota',
					'Silahkan isi data Anggota Keluarga dengan lengkap!');
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
				// breject = store_detail.getAt(a[0]);
				// breject.reject();
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
		text : 'Clear Table',
		iconCls : 'table-delete',
		tooltip : {
			title : 'Clear Table',
			text : 'Clear All Row on Grid'
		},
		handler : function() {
			// gridDetail.getStore().rejectChanges();
			store_detail.removeAll();
			Ext.example.msg('Clear Table', 'Semua data anggota telah dihapus!');
		}
	}]
});
// trigger the data store load
// store_detail.load();

// ---------------->end of tab 2 <---------------------------------//

var main_content = {
	xtype : 'tabpanel',
	id : 'main_content',
	plain : true, // remove the header border
	activeItem : 0,
	items : [{
		layout : 'fit',
		bodyStyle : 'padding:7px;',
		title : 'Form Input Data Kepala Keluarga',
		items : [{
					layout : 'border',
					region : 'center',
					// margins: '5 5 5 0',
					border : false,
					// bodyStyle: 'padding:15px;',
					// viewConfig:{forceFit:true},
					items : [frmInput, gridDetail]
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
				if (frmInput.getForm().isValid()) {
					// var records = store_detail.getModifiedRecords();
					var data = [];
					store_detail.each(function(r, i) {
								var o = r.copy(); // mengcopy record agar
													// aslinya tidak dirubah...
								o = o.data;
								for (cnt in o)
									if (Ext.isDate(o[cnt]))
										o[cnt] = Ext.util.Format.date(o[cnt],
												'Y-m-d');
								data.push(o);
							}, this);
					dtAnggota = Ext.encode(data);
					frmInput.getForm().submit({
						url : ajax_url,
						waitMsg : 'Saving Data',
						params : {
							task : 'addNew',
							anggota : dtAnggota
						},
						success : function(a, b) {
							// store_detail.commitChanges();
							frmInput.getForm().reset();
							// gridDetail.getStore().rejectChanges();
							store_detail.removeAll();

							b = b.result;
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
				frmInput.getForm().reset();
				// store_detail.commitChanges();
				// gridDetail.getStore().rejectChanges();
				store_detail.removeAll();
				Ext.example
						.msg('Reset Form',
								'Isian Form dan Anggota telah di reset ulang, Silahkan isi kembali');
			}
		}]
	}]
};
