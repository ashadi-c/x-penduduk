/** untuk menandakan bahwa script ini valid dan akan di eksekusi * */
valid_script = true;
ajax_url = 'ajax.handler.php?id=' + page; //biarin saja
/** =============================================================* */
var dspagu = new Ext.data.GroupingStore({
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
                            },{
                                name:'jumlah_trans',
								type:'float'
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
		sortable : true,
		groupable:false
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
				hidden: true,
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
				renderer: function(val,cell) {cell.attr = 'style=color:blue'; return '' + Ext.util.Format.number(val,'0.000,00/i');},

				align: 'right'
             },{
                 dataIndex:'jumlah_trans',
                 header:'Realisasi',
                 width:110,
				 renderer: function(val,cell) {cell.attr = 'style=color:green'; return '' + Ext.util.Format.number(val,'0.000,00/i');},
                 align:'right'
             },{
                dataIndex:'satuan',
                header:'Sisa Dana',
                width: 110,
				align: 'right',
				renderer:  function(val,cell,record) {cell.attr = ((record.data.jumlah - record.data.jumlah_trans)<0)?"style=color:red":"style=color:blue"; x = record.data.jumlah - record.data.jumlah_trans; return '' + Ext.util.Format.number(x,'0.000,00/i');}
             }
        ]
});


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
limit_combo.setValue(100);

limit_combo.on("select", function() {
			Ext.getCmp('pagingBar').pageSize = parseInt(limit_combo.getValue());
			dspagu.load({
						params : {
							start : 0,
							limit : parseInt(limit_combo.getValue())
						}
					});
		});

var gridpagu = new Ext.grid.GridPanel({
	title : 'Data Rincian Pagu & Realisasi',
	// region:'center',
	iconCls : 'parent-form',
	// viewConfig:{forceFit:true}, //agar colom2 mengecil sendiri waktu diresize
	// windows
	//layout : 'fit',
	ds : dspagu,
	cm : cmpagu,
	stripeRows : true,
	enableColLock : false,
	view : new Ext.grid.GroupingView({
		forceFit : false,
		groupTextTpl : '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
	}),

	loadMask : true,
	plugins : [filterpagu],
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
                    if (!gridpagu.getSelectionModel().getSelected())
                        return false;
                    winEdit.setTitle('Edit Data');
                    winEdit.show(this.id); 
					frm_edit.getForm().setValues(
                    gridpagu.getSelectionModel().getSelected().data
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
                    a = gridpagu.getSelectionModel().getSelections();
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
										dspagu.reload();
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

			  },'-',{
                text:'Cetak',
                iconCls:'report-pdf',
                tooltip:{
                    title:'Cetak Realisasi',
                    text:'Cetak'
                },
                handler: function()
				{
					if (!checkRole(ROLE.PRINT_DATA)){
					this.disable();
					return false; 		
					}
                    winCtk.setTitle('Cetak Data');
                    winCtk.show(this.id); 
                    frm_ctk.getForm().reset();

                }
            }],
	bbar : new Ext.PagingToolbar({
				id : 'pagingBar',
				store : dspagu,
				pageSize : parseInt(limit_combo.getValue()),
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
							}
						}, '-', 'Display Per Page ', limit_combo
                                            ]
			})
        
});


dspagu.load({
			params : {
				start : 0,
				limit : parseInt(limit_combo.getValue())
			}
});

/* =========================membuat form edit =========================== */
var dsjenis = new Ext.data.SimpleStore({
	fields:['jenis'],
	data:[['BELANJA AKOMODASI'],['BELANJA JASA'],['BELANJA MODAL'],['BELANJA LAINNYA']]
	});
//var inpkode = new Ext.ux.grid.InputTextMask('9999', true);
var jml = new Ext.ux.customRendererField({
            fieldLabel: 'Jumlah',
            name: 'jumlah',
		//	customRenderer:cr,
            width:175
            
        });
var item_form = [{
			xtype : 'hidden',
			name : 'id',
			allowBlank : false
		},{
			xtype : 'numberfield',
			fieldLabel : 'Tahun Anggaran',
            name:'thang',
			allowBlank : false,
			width:50
        }, {
			xtype : 'textfield',
			fieldLabel : 'Kode Kegiatan',
            name:'kdgiat',
			allowBlank : false,
			width:100
		}, {
			xtype : 'textfield',
			fieldLabel : 'Kode Subkeg.',
            name:'kdsgiat',
			allowBlank : false,
			width:50
		}, {
			fieldLabel : 'MAK',
			name : 'kdmak',
			width : 75,
			xtype:'textfield',
			allowBlank : false
		}, {
			xtype : 'numberfield',
			fieldLabel : 'No. Item',
            name:'noitem',
			allowBlank : false,
			width:50
		}, {
			xtype : 'textarea',
			fieldLabel : 'Keterangan',
            name:'nmitem',
			allowBlank : false,
			width:200,
			height: 50
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
								dspagu.reload();
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
					
				},
        afterlayout:function(){
          frm_edit.get(1).focus();
          
        }
			}
		});
/* ====================================================================== */


//===============================FORM CETAK=================================
var frm_ctk = new Ext.FormPanel({
			id : 'frm_ctk',
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
			items :[
                            {
                                xtype:'datefield',
                                name:'before_date',
                                fieldLabel:'Antara Tanggal',
                                format:'d/m/Y',
                                allowBlank:false
                            },{
                                xtype:'datefield',
                                name:'after_date',
                                fieldLabel:'Antara Tanggal',
                                format:'d/m/Y',
                                allowBlank:false

                            }
                        ]

		});

var winCtk = new Ext.Window({
			layout : 'fit',
			id : 'winCtk',
			width : 450,
			height : 350,
			closeAction : 'hide',
			iconCls : 'form',
			title : 'Cetak',
			modal : true,
			plain : true,
			border : false,
			items : [frm_ctk

			],
			buttons : [{
				text : 'Cetak',
				handler : function() {
					if (frm_ctk.getForm().isValid()) {
                                            options = frm_ctk.getForm().getValues();
                                            options = Ext.urlEncode(options);
                                            mode_report = "&mode=pdf";
                                            report_link = 'report.php?id=' + page + mode_report + "&" + options;
                                            winReport({
						id : this.id,
						title : 'Laporan Between',
						url : report_link,
						type : 'PDF'
                                            });

                                            
					}
				}
			}, {
				text : 'Close',
				handler : function() {
					winCtk.hide();
				}
			}],
			listeners : {
				hide : function() {
					
				}
			}
		});


//=======================================================================
var main_content = {
	xtype : 'tabpanel',
	id : 'main_content',
	plain : true, // remove the header border
	activeItem : 0,
	items : [gridpagu],
	listeners : {
		destroy : function() {
			myWin = Ext.getCmp('winEdit');
			if (myWin)
				myWin.destroy();
			myWin = Ext.getCmp('winCtk');
			if (myWin)
				myWin.destroy();	

		}
	}
};
