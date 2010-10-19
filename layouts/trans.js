/** untuk menandakan bahwa script ini valid dan akan di eksekusi * */
valid_script = true;
ajax_url = 'ajax.handler.php?id=' + page; //biarin saja
/** =============================================================* */
Date.monthNames =
   					["Januari",
    					"Februari",
    					"Maret",
    					"April",
    					"Mei",
    					"Juni",
    					"Juli",
    					"Agustus",
    					"September",
    					"Oktober",
    					"November",
    					"Desember"];

var ds = new Ext.data.GroupingStore({
			url : ajax_url,
			id : 'id',
			baseParams : {
				task : 'doRead' //lihat di ajax
			},
                        reader : new Ext.data.JsonReader({
			totalProperty : 'total',
                        root : 'data',
                        fields: [
                            {
                                name:'id'
                            },{
                                name:'nospp'
                            },{
                                name:'nospm'
                            },{
                                name:'nokw'
                            },{
                                name:'tanggal',
                                type:'date',
                                dateFormat: 'Y-m-d'
                            },{
                                name:'bulan'
                            },{
                                name:'idpagu'
                            },{
                                name:'kdpagu'
                            },{
                                name:'kdmak'
                            },{
                                name:'tahun'
                            },{
                                name:'subject'
                            },{
                                name:'ket'
                            },{
                                name:'jumlah',
                                type:'float'
                            }
                        ]}),
			sortInfo : {
				field : 'bulan',
				direction : 'ASC'
			},
			remoteSort : true,
                        remoteGroup:false,
                        groupField:'bulan'

});
		    function date_style(val){
				var dt = new Date( val );
		        return dt.format('j F Y');
		    }

var filter = new Ext.ux.grid.GridFilters({
    filters: [
        {
            type:'string',
            dataIndex:'nosppp'
        },{
            type:'string',
            dataIndex:'nospm'
        },{
            type:'string',
            dataIndex:'nokw'
        },{
            type:'date',
			dataIndex:'tanggal'
        },{
            type:'string',
            dataIndex:'bulan'
        },{
            type:'numeric',
            dataIndex:'idpagu'
        },{
            type:'string',
            dataIndex:'kdpagu'
        },{
            type:'string',
            dataIndex:'kdmak'
        },{
            type:'numeric',
            dataIndex:'tahun'
        },{
            type:'string',
            dataIndex:'subject'
        },{
            type:'string',
            dataIndex:'ket'
        },{
            type:'numeric',
            dataIndex:'jumlah'
        }
    ]
});

function renderbulan(val){
                if(val == 01){
				//-> this = obj (row from grid, properties of id, name='change', style)
                    return 'Januari';
                }else if(val == 02){
                    return 'Februari';
                }else if(val == 03){
                    return 'Maret';
                }else if(val == 04){
                    return 'April';
                }else if(val == 05){
                    return 'Mei';
                }else if(val == 06){
                    return 'Juni';
                }else if(val == 07){
                    return 'Juli';
                }else if(val == 08){
                    return 'Agustus';
                }else if(val == 09){
                    return 'September';
                }else if(val == 10){
                    return 'Oktober';
                }else if(val == 11){
                    return 'November';
                }else if(val == 12){
                    return 'Desember';
                }
                return val;
            };
var summary = new Ext.ux.grid.GroupSummary();

var cm = new Ext.grid.ColumnModel({
	defaults : {
		sortable : true
		
	},
	columns : [
            {
                dataIndex : 'id',
				header: 'ID',
				width: 30
//                hidden : true,
//                hideable : false,
//                menuDisabled : true
             },{
                dataIndex:'nospp',
                header:'No. SPP',
				hidden: false,
                width: 70
             },{
                dataIndex:'nospm',
                header:'nospm',
				hidden: true,
                width: 50
             },{
                dataIndex:'nokw',
                header:'nokw',
				hidden: true,
                width: 50
             },{
                dataIndex:'tanggal',
                header:'Tanggal',
				renderer: date_style,
                width: 100,
                align:'right'

             },{
                dataIndex:'bulan',
                header:'Bulan',
				renderer: renderbulan,
				hidden: true,
                width: 70

             },{
                dataIndex:'idpagu',
                header:'idpagu',
				hidden: true,
                width: 50

             },{
                dataIndex:'kdpagu',
                header:'Kode PAGU',
                width: 100

             },{
                dataIndex:'kdmak',
                header:'MAK',
                width: 70

             },{
                dataIndex:'subject',
                header:'Subject',
                width: 200

             },{
                dataIndex:'ket',
                header:'Uraian',
                width: 300

             },{
                dataIndex:'jumlah',
                header:'Jumlah',
		renderer: function(val,cell) {cell.attr = 'style=color:blue'; return '' + Ext.util.Format.number(val,'0.000,00/i');},
                align: 'right',
		width: 150,
                summaryType: 'sum',
                summaryRenderer:function(val){
                    x = Ext.util.Format.number(val,'0.000,00/i');
                    return String.format("<span style=color:blue><b>{0}</b></span>",x);
                }

             },{
                dataIndex:'tahun',
                header:'tahun',
                width: 50

             }
        ]
});

var hapusFilter = true;	

var limit_store = new Ext.data.SimpleStore({
	fields : ['limit'],
	data : [[25], [50], [100]]
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
			width : 55
		});
limit_combo.setValue(150);

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
	title : 'Daftar Transaksi',
	// region:'center',
	iconCls : 'parent-form',
	// viewConfig:{forceFit:true}, //agar colom2 mengecil sendiri waktu diresize
	// windows
	//layout : 'fit',
	ds : ds,
	cm : cm,
	stripeRows : true,
	enableColLock : false,
	view : new Ext.grid.GroupingView({
		forceFit : false,
		groupTextTpl : '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "transaksi" : "transaksi"]})'
	}),

	loadMask : true,
	plugins : [filter,summary],
        tbar: [{
                text:'Tambah Data',
                iconCls:'add-data',
                tooltip:{
                    title:'Tambah Data',
                    text:'Tambah Data Baru'
                },
                handler: function()
				{
					if (!checkRole(ROLE.ADD_DATA)){
					this.disable();
					return false; 		
					}
                    winEdit.setTitle('Add Data');
                    winEdit.show(this.id); 
                    frm_edit.getForm().reset();

                }
            },'-',{
                text:'Edit Data',
                iconCls:'form-edit',
				tooltip : {
				title : 'Edit',
				text : 'Edit Data'
				},
                handler: function(){
					if (!checkRole(ROLE.EDIT_DATA)){
					this.disable();
					return false; 		
					}
                    if (!grid.getSelectionModel().getSelected())
                        return false;
                    
                    winEdit.setTitle('Edit Data');
                    winEdit.show(this.id); 
					frm_edit.getForm().setValues(
                    grid.getSelectionModel().getSelected().data
                    );
                }
            },'-',{
		text : 'Hapus Data',
		iconCls : 'table-delete',
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
                    a = grid.getSelectionModel().getSelections();
                    if (!a)
                        return false;
                   var data = [];
                   Ext.each(a, function(r, i) {
                       data.push({id:r.data.id});
                   });
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
									task : "remove",
									data : Ext.encode(data)
								},
								success : function(response) {
									Ext.getCmp('content-panel').body.unmask();
									var res = Ext.decode(response.responseText);
									if (res.success) {
										ds.reload();
										Ext.example
												.msg('Remove Selected Item',
														'Data has been deleted from Database');

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
					icon : Ext.MessageBox.WARNING
				});

                }

            },'-',{
					text : 'Pilihan Cetak',
					iconCls : 'report-mode',
					tooltip : {
								title : 'Pilihan Cetak',
								text : 'Pilih Format Cetakan PDF atau WORD'
							  },
								menu : new Ext.menu.Menu({
								items : [{
											text : 'PDF Format',
											checked : true,
											group : 'print',
											checkHandler : function() {
											Ext.getCmp('print').setText('Cetak (PDF)');
											Ext.getCmp('print')
											.setIconClass('report-pdf');
																	   }
										 }, {
											text : 'Word Format',
											checked : false,
											group : 'print',
											checkHandler : function() {
											Ext.getCmp('print').setText('Cetak (WORD)');
											Ext.getCmp('print')
											.setIconClass('report-word');
											}
										}]
														})

														}, {
															text : 'Cetak (PDF)',
															id : 'print',
															iconCls : 'report-pdf',
															tooltip : {
																title : 'Cetak',
																text : 'Simpan File'
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

			  }],
	bbar : new Ext.PagingToolbar({
				id : 'pagingBar',
				store : ds,
				pageSize : parseInt(limit_combo.getValue()),
				plugins : filter,
				displayInfo : true,
				displayMsg : 'Menampilkan Data {0} - {1} dari {2}',
				emptyMsg : "Tidak Ada Data",
				items : ['-', {
							// text:'Clear Filter',
							tooltip : {
								title : 'Clear Filter',
								text : 'Clear Searching Filter'
							},
							iconCls : 'drop',
							handler : function() {
								filter.clearFilters();
							}
						}, '-', 'Jumlah Perhalaman ', limit_combo
                                            ]
			})
        
});


ds.load({
			params : {
				start : 0,
				limit : parseInt(limit_combo.getValue())
			}
});

/* =========================membuat form edit =========================== */
var dsnokw = new Ext.data.SimpleStore({
	fields:['nokw'],
	data:[['BELANJA AKOMODASI'],['BELANJA JASA'],['BELANJA MODAL'],['BELANJA LAINNYA']]
	});
//var inpidpagu = new Ext.ux.grid.InputTextMask('9999', true);
tempvalue=0
function cr(action) {
		if (!action & !this.el.dom.readOnly) {
			this.el.dom.value=tempvalue;//replace all alphabetic ans special characters except '.'
		} else {
			value=this.el.dom.value.replace(/[^0-9.]+/g,'');//replace all alphabetic ans special characters except '.'
			tempvalue=value
			diff=value-Ext.getCmp('cr').getValue()
			this.el.dom.value=SetMoney(tempvalue,'.')
		}

}


var jml = new Ext.ux.customRendererField({
            fieldLabel: 'Jumlah',
            name: 'jumlah',
		//	customRenderer:cr,
            width:175
            
        });
Ext.form.Field.prototype.msgTarget = 'side';

var item_form = [{
			xtype : 'hidden',
			name : 'id',
			allowBlank : false
		}, {
            fieldLabel:'nospp',
            name:'nospp',
            width:100,
			xtype:'textfield'
        }, {
            fieldLabel:'nospm',
            name:'nospm',
            width:100,
			xtype:'hidden'
        }, {
            fieldLabel:'nospm',
            name:'nokw',
            width:100,
			xtype:'hidden'
        }, {
			xtype : 'datefield',
			fieldLabel : 'Tanggal',
			name : 'tanggal',
			format : 'd/m/Y',
			allowBlank : false

		}, {
			xtype : 'hidden',
			fieldLabel : 'bulan',
            name:'bulan',
			allowBlank : false,
			width:100
		}, {
			xtype:'trigger',
			fieldLabel : 'ID Pagu',
			allowBlank : false,
			name : 'idpagu',
			width : 50,
			enableKeyEvents : true,
						listeners: {
						specialkey: function(o, e){
						if (e.getKey() == e.ENTER){winGridpagu.show(this.id);}
												  }
					   },
						onTriggerClick: function(){
							if (!this.disabled)
								winGridpagu.show(this.id);
												  }

		}, {
			xtype : 'textfield',
			fieldLabel : 'kdpagu',
			name : 'kdpagu',
			width:100
		}, {
			xtype : 'numberfield',
			fieldLabel : 'kdmak',
			name : 'kdmak',
			width:100
		}, {
			xtype : 'hidden',
			fieldLabel : 'tahun',
			name : 'tahun',
			width:80
		}, {
			xtype:'trigger',
			fieldLabel : 'Subject',
			allowBlank : false,
			name : 'subject',
			width : 200,
			enableKeyEvents : true,
						listeners: {
						specialkey: function(o, e){
						if (e.getKey() == e.ENTER){winGridpeny.show(this.id);}
												  }
					   },
						onTriggerClick: function(){
							if (!this.disabled)
								winGridpeny.show(this.id);
												  }
		}, {
			xtype : 'textarea',
			fieldLabel : 'Uraian',
			name : 'ket',
			height: 50,
			width:300
		}, jml];


var frm_edit = new Ext.FormPanel({
			id : 'frm_edit',
			frame : true,
			url : ajax_url,
			border : false,
			bodyStyle : 'padding:5px 5px 0 5px',
			labelAlign : 'left',
			labelWidth : 100,
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
			width : 450,
			height : 350,
			closeAction : 'hide',
			iconCls : 'form',
			title : 'Add',
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
								ds.reload();
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
					
				}
			}
		});
/* ====================================================================== */

/* ============================================================================================================ 
*
*                            ####   MEMBUAT GRID DATA PAGU  ####                  
*
   ============================================================================================================ */

var dspagu = new Ext.data.GroupingStore({
			url : ajax_url,
			id : 'id',
			baseParams : {
				task : 'getPagu' //lihat di ajax
			},
                        reader : new Ext.data.JsonReader({
			totalProperty : 'total',
                        root : 'data',
                        fields: [
                            {
                                name:'id'
                            },{
                                name:'thang'
                            },{
                                name:'kdgiat'
                            },{
                                name:'kdsgiat'
                            },{
                                name:'kdmak'
                            },{
                                name:'noitem'
                            },{
                                name:'nmitem'
                            },{
                                name:'jumlah'
                            }
                        ]}),
			sortInfo : {
				field : 'kdgiat',
				direction : 'ASC'
			},
			remoteSort : true,
                        remoteGroup:false,
                        groupField:'kdgiat'

});

var filterpagu = new Ext.ux.grid.GridFilters({
    filters: [
        {
            type:'numeric',
            dataIndex:'thang'
        },{
            type:'numeric',
			dataIndex:'kdgiat'
			
        },{
            type:'numeric',
            dataIndex:'kdsgiat'
        },{
            type:'string',
            dataIndex:'kdmak'
			
        },{
            type:'numeric',
            dataIndex:'noitem'
        },{
            type:'string',
            dataIndex:'nmitem'
        },{
            type:'float',
            dataIndex:'jumlah'
        }
    ]
});

var cmpagu = new Ext.grid.ColumnModel({
	defaults : {
		sortable : true
		
	},
	columns : [
            {
                dataIndex : 'id',
//                hidden : true,
//                hideable : false,
				direction:'ASC',
                header:'ID',
				groupable : false,
				align: 'center',
                width: 30
//                menuDisabled : true
             },{
                dataIndex:'thang',
                header:'Tahun',
				groupable : false,
                width: 50
             },{
                dataIndex:'kdgiat',
                header:'Kegiatan',
				groupable : true,
                width: 100
             },{
                dataIndex:'kdsgiat',
                header:'Subkeg',
				groupable : false,
                width: 80
             },{
                dataIndex:'kdmak',
                header:'MAK',
				groupable : false,
                width: 50
             },{
                dataIndex:'noitem',
                header:'No',
				groupable : false,
                width: 50,
				align:'center'
             },{
                dataIndex:'nmitem',
                header:'Keterangan',
				groupable : false,
                width: 350
             },{
                dataIndex:'jumlah',
                header:'Jumlah',
                width: 150,
				groupable : false,
//				renderer: function(val) {return 'Rp. ' + Ext.util.Format.number(val,'0.000,00/i');},
				renderer: function(val) {return '' + Ext.util.Format.number(val,'0.000,00/i');},

				align: 'right'
             }
        ]
});


var gridWindowspagu = new Ext.grid.GridPanel({    ////////////////////////////////////////////////////////////////////////
	// layout:'fit',
	ds : dspagu,
	cm : cmpagu,
	sm : new Ext.grid.RowSelectionModel({
				singleSelect : true
			}),
	stripeRows : true,
	enableColLock : false,
	loadMask : true,
	view : new Ext.grid.GroupingView({
		forceFit : false,
		groupTextTpl : '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
	}),
	plugins : filterpagu,
	listeners : {
		render : function() {

		}
	},
	bbar : new Ext.PagingToolbar({
		store : dspagu,
		pageSize : 30,
		plugins : filterpagu,
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
				filterpagu.clearFilters();
				for (i = 0; i < gridWindowspagu.getColumnModel().getColumnCount(); i++)
					if (gridWindowspagu.getColumnModel().isMenuDisabled(i) == false)
						gridWindowspagu.getColumnModel().setHidden(i, false);
				// dsWindows.load({params:{start: 0, limit: 30}});
			}
		}]
	})
});


var winGridpagu = new Ext.Window({
	layout : 'fit',
	id : 'winGridpagu',
	width : 720,
	height : 400,
	closeAction : 'hide',
	iconCls : 'app-grid',
	title : 'Lihat Data Pagu',
	modal : true,
	plain : true,
	border : false,
	items : [gridWindowspagu

	],
	buttons : [{
		text : 'Select Data',
		handler : function() {
			if (gridWindowspagu.getSelectionModel().hasSelection()) {
				data = gridWindowspagu.getSelectionModel().getSelected().data; 
				frm_edit.getForm().setValues({idpagu: data.id,kdpagu: data.kdgiat,kdmak: data.kdmak});
				winGridpagu.hide();
				frm_edit.body.highlight('#c3daf9', {
							block : true
				});
			}
		}
	}, {
		text : 'Close',
		handler : function() {
			winGridpagu.hide();
		}
	}],
	listeners : {
		show : function() {
			if (hapusFilter) {
				filterpagu.clearFilters();
				for (i = 0; i < gridWindowspagu.getColumnModel().getColumnCount(); i++)
					if (gridWindowspagu.getColumnModel().isMenuDisabled(i) == false)
						gridWindowspagu.getColumnModel().setHidden(i, false);
			}
			hapusFilter = false;
			dspagu.load({
						params : {
							start : 0,
							limit : 30
						}
					});
		}
	}

});

/* ============================================================================================================ 
*
*                            ####   MEMBUAT GRID DATA PENYEDIA  ####                  
*
   ============================================================================================================ */

var dspeny = new Ext.data.GroupingStore({
			url : ajax_url,
			id : 'id',
			baseParams : {
				task : 'getPeny' //lihat di ajax
			},
                        reader : new Ext.data.JsonReader({
			totalProperty : 'total',
                        root : 'data',
                        fields: [
                            {
                                name:'id'
                            },{
                                name:'nama'
                            },{
                                name:'alamat',
                            },{
                                name:'kota'
                            },{
                                name:'namattd'
                            },{
                                name:'jabttd'
                            },{
                                name:'tlp'
                            },{
                                name:'fax'
                            },{
                                name:'email'
                            },{
                                name:'npwp'
                            },{
                                name:'tglpkp',
								type:'date',
                                dateFormat: 'Y-m-d'
                            },{
                                name:'hotel'
                            },{
                                name:'ijin'
                            },{
                                name:'noijin'
                            },{
                                name:'pengijin'
                            },{
                                name:'noakta'
                            },{
                                name:'tglakta',
								type:'date',
                                dateFormat: 'Y-m-d'
                            },{
                                name:'notakta'
                            },{
                                name:'noaktap'
                            },{
                                name:'tglaktap',
								type:'date',
                                dateFormat: 'Y-m-d'
                            },{
                                name:'notaktap'
                            },{
                                name:'nmttd1'
                            },{
                                name:'jabttd1'
                            },{
                                name:'nmttd2'
                            },{
                                name:'jabttd2'
                            },{
                                name:'nmttd3'
                            },{
                                name:'jabttd3'
                            },{
                                name:'nmttd4'
                            },{
                                name:'jabttd4'
                            },{
                                name:'norek'
                            },{
                                name:'bank'
                            },{
                                name:'anrek'
                            }
                        ]}),
			sortInfo : {
				field : 'nama',
				direction : 'ASC'
			},
			remoteSort : true,
                        remoteGroup:false,
                        groupField:'nama'

});


var filterpeny = new Ext.ux.grid.GridFilters({
    filters: [
        {
            type:'string',
            dataIndex:'nama'
        },{
            type:'string',
            dataIndex:'alamat'
        },{
            type:'string',
            dataIndex:'kota'
        },{
            type:'string',
            dataIndex:'namattd'
        },{
            type:'string',
            dataIndex:'namattd'
        },{
            type:'string',
            dataIndex:'jabttd'
        },{
            type:'string',
            dataIndex:'tlp'
        },{
            type:'string',
            dataIndex:'fax'
        },{
            type:'string',
            dataIndex:'email'
        },{
            type:'string',
            dataIndex:'npwp'
        },{
            type:'date',
            dataIndex:'tglpkp'
        },{
            type:'string',
            dataIndex:'hotel'
        },{
            type:'string',
            dataIndex:'ijin'
        },{
            type:'string',
            dataIndex:'noijin'
        },{
            type:'string',
            dataIndex:'pengijin'
        },{
            type:'string',
            dataIndex:'noakta'
        },{
            type:'date',
            dataIndex:'tglakta'
        },{
            type:'string',
            dataIndex:'notakta'
        },{
            type:'string',
            dataIndex:'noaktap'
        },{
            type:'date',
            dataIndex:'tglaktap'
        },{
            type:'string',
            dataIndex:'notaktap'
        },{
            type:'string',
            dataIndex:'nmttd1'
        },{
            type:'string',
            dataIndex:'jabttd1'
        },{
            type:'string',
            dataIndex:'nmttd2'
        },{
            type:'string',
            dataIndex:'jabttd2'
        },{
            type:'string',
            dataIndex:'nmttd3'
        },{
            type:'string',
            dataIndex:'jabttd3'
        },{
            type:'string',
            dataIndex:'nmttd4'
        },{
            type:'string',
            dataIndex:'jabttd4'
        },{
            type:'string',
            dataIndex:'norek'
        },{
            type:'string',
            dataIndex:'bank'
        },{
            type:'string',
            dataIndex:'anrek'
        }
    ]
});

var expander1 = new Ext.ux.grid.RowExpander({
    tpl : new Ext.XTemplate(
         "<div><span class='nama'>{hotel}</span>",
         "<br /><span>Penandatangan : {namattd} </span><br />",
         "<span>Jabatan : {jabttd} </span><br />",
         "<span>No. telepon/fax : {tlp} / {fax} </span><br />",
         "<span>email : {email} </span><br />",
		 "<span>NPWP : {npwp} </span><br />",
		 "<span>Tanggal PKP : {[values.tglpkp.format('j F Y')]} </span><br />",
		 "<span>Nomor Akta : {noakta} </span><br />",
		 "<span>Tanggal Akta : {[values.tglakta.format('j F Y')]} </span><br />",
		 "<span>Notaris : {notakta} </span><br />",
		 "<span>Nomor Akta Perubahan: {noaktap} </span><br />",
		 "<span>Tanggal Akta Perubahan : {[values.tglaktap.format('j F Y')]} </span><br />",
		 "<span>Notaris : {notaktap} </span><br />",
		 "<span>{jabttd1} : {nmttd1} </span><br />",
		 "<span>{jabttd2} : {nmttd2} </span><br />",
		 "<span>{jabttd3} : {nmttd3} </span><br />",
		 "<span>{jabttd4} : {nmttd4} </span><br />",
		 "<span>Nomor Rekening : {norek} </span><br />",
		 "<span>Bank : {bank} </span><br />",
		 "<span>Atas Nama : {anrek} </span><br />",
         "</div>"
    )
});


var cmpeny = new Ext.grid.ColumnModel({
	defaults : {
		sortable : true
		
	},
	columns : [expander1,
            {
                dataIndex : 'id',
                hidden : true,
                hideable : false,
                menuDisabled : true
             },{
                dataIndex:'nama',
                header:'Nama Penyedia',
                width: 300
             },{
                dataIndex:'alamat',
                header:'Alamat Penyedia',
                width: 300
             },{
                dataIndex:'namattd',
                header:'Nama Penandatangan',
				hidden : true,
                width: 100
             },{
                dataIndex:'jabttd',
                header:'Jabatan Penandatangan',
                hidden : true,
				width: 100
             },{
                dataIndex:'tlp',
                header:'Nomor Telepon',
                hidden : true,
				width: 100
             },{
                dataIndex:'fax',
                header:'Nomor Fax',
                hidden : true,
				width: 100
             },{
                dataIndex:'email',
                header:'Email',
                hidden : true,
				width: 100
             },{
                dataIndex:'npwp',
                header:'NPWP',
                hidden : true,
				width: 50
             },{
                dataIndex:'tglpkp',
                header:'Tanggal PKP',
				renderer: date_style,
                width: 100,
                hidden : true,
				align:'right'
             },{
                dataIndex:'hotel',
                header:'Hotel',
                hidden : true,
				width: 100
             },{
                dataIndex:'ijin',
                header:'Jenis Ijin',
                hidden : true,
				width: 130
             },{
                dataIndex:'noijin',
                header:'Nomor Ijin',
                hidden : true,
				width: 130
             },{
                dataIndex:'pengijin',
                header:'Pemberi Ijin',
                hidden : true,
				width: 130
             },{
                dataIndex:'noakta',
                header:'Nomor Akta',
                hidden : true,
				width: 100
             },{
                dataIndex:'tglakta',
                header:'Tanggal Akta',
				renderer: date_style,
                width: 100,
                hidden : true,
				align:'right'
             },{
                dataIndex:'notakta',
                header:'Notaris',
                hidden : true,
				width: 100
             },{
                dataIndex:'noaktap',
                header:'Nomor Akta Perub.',
                hidden : true,
				width: 100
             },{
                dataIndex:'tglaktap',
                header:'Tanggal Akta Perub.',
				renderer: date_style,
                width: 100,
                hidden : true,
				align:'right'
             },{
                dataIndex:'notaktap',
                header:'Notaris Perub.',
                hidden : true,
				width: 100
             },{
                dataIndex:'nmttd1',
                header:'Nama Pejabat 1',
                hidden : true,
				width: 100
             },{
                dataIndex:'jabttd1',
                header:'Jabatan 1',
                hidden : true,
				width: 100
             },{
                dataIndex:'nmttd2',
                header:'Nama Pejabat2',
                hidden : true,
				width: 100
             },{
                dataIndex:'jabttd2',
                header:'Jabatan 2',
                hidden : true,
				width: 100
             },{
                dataIndex:'nmttd3',
                header:'Nama Pejabat 3',
                hidden : true,
				width: 100
             },{
                dataIndex:'jabttd3',
                header:'Jabatan 3',
                hidden : true,
				width: 100
             },{
                dataIndex:'nmttd4',
                header:'Nama Pejabat 4',
                hidden : true,
				width: 100
             },{
                dataIndex:'jabttd4',
                header:'Jabatan 4',
                hidden : true,
				width: 100
             },{
                dataIndex:'norek',
                header:'Nomor Rekening',
                hidden : true,
				width: 100
             },{
                dataIndex:'bank',
                header:'Nama Bak',
                hidden : true,
				width: 100
             },{
                dataIndex:'anrek',
                header:'Atas Nama',
                hidden : true,
				width: 100
             }
        ]
});

var gridWindowspeny = new Ext.grid.GridPanel({    ////////////////////////////////////////////////////////////////////////
	// layout:'fit',
	ds : dspeny,
	cm : cmpeny,
	sm : new Ext.grid.RowSelectionModel({
				singleSelect : true
			}),
	stripeRows : true,
	enableColLock : false,
	loadMask : true,
	view : new Ext.grid.GroupingView({
		forceFit : false,
		groupTextTpl : '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
	}),
	plugins : [filterpeny,expander1],
	listeners : {
		render : function() {

		}
	},
	bbar : new Ext.PagingToolbar({
		store : dspeny,
		pageSize : 30,
		plugins : filterpeny,
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
				filterpeny.clearFilters();
				for (i = 0; i < gridWindowspeny.getColumnModel().getColumnCount(); i++)
					if (gridWindowspeny.getColumnModel().isMenuDisabled(i) == false)
						gridWindowspeny.getColumnModel().setHidden(i, false);
				// dsWindows.load({params:{start: 0, limit: 30}});
			}
		}]
	})
});


var winGridpeny = new Ext.Window({
	layout : 'fit',
	id : 'winGridpeny',
	width : 720,
	height : 400,
	closeAction : 'hide',
	iconCls : 'app-grid',
	title : 'Lihat Data Penyedia',
	modal : true,
	plain : true,
	border : false,
	items : [gridWindowspeny

	],
	buttons : [{
		text : 'Select Data',
		handler : function() {
			if (gridWindowspeny.getSelectionModel().hasSelection()) {
				data = gridWindowspeny.getSelectionModel().getSelected().data; 
				frm_edit.getForm().setValues({subject: data.nama});
				winGridpeny.hide();
				frm_edit.body.highlight('#c3daf9', {
							block : true
				});
			}
		}
	}, {
		text : 'Close',
		handler : function() {
			winGridpeny.hide();
		}
	}],
	listeners : {
		show : function() {
			if (hapusFilter) {
				filterpeny.clearFilters();
				for (i = 0; i < gridWindowspeny.getColumnModel().getColumnCount(); i++)
					if (gridWindowspeny.getColumnModel().isMenuDisabled(i) == false)
						gridWindowspeny.getColumnModel().setHidden(i, false);
			}
			hapusFilter = false;
			dspeny.load({
						params : {
							start : 0,
							limit : 30
						}
					});
		}
	}

});




/* ============================================================================================================ */
/* ============================================================================================================ */

var main_content = {
	xtype : 'tabpanel',
	id : 'main_content',
	plain : true, // remove the header border
	activeItem : 0,
	items : [grid],
	listeners : {
		destroy : function() {
			myWin = Ext.getCmp('winEdit');
			if (myWin)
				myWin.destroy();
			myWin = Ext.getCmp('winGridpagu');
			if (myWin)
				myWin.destroy();
			myWin = Ext.getCmp('winGridpeny');
			if (myWin)
				myWin.destroy();	

		}
	}
};
