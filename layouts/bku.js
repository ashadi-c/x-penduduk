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

var dsbku = new Ext.data.GroupingStore({
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
                                name:'tanggal',
                                type:'date',
                                dateFormat: 'Y-m-d'
                            },{
                                name:'nobukti'
                            },{
                                name:'uraian'
                            },{
                                name:'debet',
								type:'float'
                            },{
                                name:'kredit',
								type:'float'
                            },{
                                name:'tahun'
                            },{
                                name:'bulan'
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

var filterbku = new Ext.ux.grid.GridFilters({
    filters: [
        
        {
            type:'date',
            dataIndex:'tanggal'
			
        },{
            type:'string',
            dataIndex:'nobukti'
        },{
            type:'string',
            dataIndex:'uraian'
			
        },{
            type:'numeric',
            dataIndex:'debet'
        },{
            type:'numeric',
            dataIndex:'kredit'
        },{
            type:'numeric',
            dataIndex:'tahun'
        },{
            type:'numeric',
            dataIndex:'tot'
        },{
            type:'string',
            dataIndex:'bulan'
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

var cmbku = new Ext.grid.ColumnModel({
	defaults : {
		sortable : true
		
	},
	columns : [
            {
                dataIndex : 'id',
                hidden : true,
                hideable : false,
                menuDisabled : true
             },{
                dataIndex:'tanggal',
                header:'Tanggal',
				renderer: date_style,
                width: 100,
                align:'right'

             },{
                dataIndex:'nobukti',
                header:'No. Bukti',
                width: 100

             },{
                dataIndex:'uraian',
                header:'Uraian',
                width: 300

             },{
                dataIndex:'debet',
                header:'Debet',
				renderer: function(val,cell) {cell.attr = 'style=color:green'; return '' + Ext.util.Format.number(val,'0.000,00/i');},
                align: 'right',
				width: 100,
                summaryType: 'sum',
                summaryRenderer:function(val){
                    x = Ext.util.Format.number(val,'0.000,00/i');
                    return String.format("<span style=color:blue><b>{0}</b></span>",x);
                }

             },{
                dataIndex:'kredit',
                header:'Kredit',
				renderer: function(val,cell) {cell.attr = 'style=color:blue'; return '' + Ext.util.Format.number(val,'0.000,00/i');},
                align: 'right',
				width: 100,
                summaryType: 'sum',
                summaryRenderer:function(val){
                    x = Ext.util.Format.number(val,'0.000,00/i');
                    return String.format("<span style=color:blue><b>{0}</b></span>",x);
                }

             },{
                dataIndex:'tot',
                header:'Saldo',
                align: 'right',
                renderer:  function(val,cell,record,rowIndex){
                    cell.attr = 'style=color:blue';
                    if (rowIndex >0){
                        saldo = dsbku.getAt(rowIndex-1).data.tot; 
                        x = saldo + (record.data.debet - record.data.kredit);
                    }else {
                        x = record.data.debet - record.data.kredit;
                    }
                    record.data.tot = x; 
                    return '' + Ext.util.Format.number(x,'0.000,00/i');
                },
                width: 100,
                //summaryType: 'totalReal',
                summaryRenderer:function(val){
                    x = Ext.util.Format.number(val,'0.000,00/i');
                    return String.format("<span style=color:blue><b>{0}</b></span>",x);
                }

             },{
                dataIndex:'bulan',
                header:'Bulan',
				renderer: renderbulan,
				hidden: true,
                width: 70

             },{
                dataIndex:'tahun',
                header:'Tahun',
                width: 50

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
			width : 45
		});
limit_combo.setValue(25);

limit_combo.on("select", function() {
			Ext.getCmp('pagingBar').pageSize = parseInt(limit_combo.getValue());
			dsbku.load({
						params : {
							start : 0,
							limit : parseInt(limit_combo.getValue())
						}
					});
		});

var gridbku = new Ext.grid.GridPanel({
	title : 'Buku Kas Umum',
	// region:'center',
	iconCls : 'parent-form',
	// viewConfig:{forceFit:true}, //agar colom2 mengecil sendiri waktu diresize
	// windows
	//layout : 'fit',
	ds : dsbku,
	cm : cmbku,
	stripeRows : true,
	enableColLock : false,
	view : new Ext.grid.GroupingView({
		forceFit : false,
		groupTextTpl : '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
	}),

	loadMask : true,
	plugins : [filterbku,summary],
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
                    if (!gridbku.getSelectionModel().getSelected())
                        return false;
                    
                    winEdit.setTitle('Edit Data');
                    winEdit.show(this.id); 
					frm_edit.getForm().setValues(
                    gridbku.getSelectionModel().getSelected().data
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
                    a = gridbku.getSelectionModel().getSelections();
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
										dsbku.reload();
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
                                                                                        if (!gridbku.getSelectionModel().getSelected())
                                                                                            return false;
                                                                                        id_data = gridbku.getSelectionModel().getSelected().data.id;

                                                                                        options = "id_data="+ id_data;

                                                                                        a = this.text;
                                                                                        pdf = a.search(/PDF/);
                                                                                        mode_report = (pdf > 0) ? "&mode=pdf" : "&mode=word";
                                                                                        report_link = 'report.php?id=' + page + mode_report + "&" + options;
                                                                                        rType = (pdf > 0) ? 'PDF' : 'WORD';
                                                                                        if (rType =='PDF')
                                                                                        winReport({
                                                                                                                id : this.id,
                                                                                                                title : 'Laporan SPBJ',
                                                                                                                url : report_link,
                                                                                                                type : rType
                                                                                                         });
                                                                                        else
                                                                                            document.location.href = report_link; 

                                                                                                                                 }

			  }],
	bbar : new Ext.PagingToolbar({
				id : 'pagingBar',
				store : dsbku,
				pageSize : parseInt(limit_combo.getValue()),
				plugins : filterbku,
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
								filterbku.clearFilters();
							}
						}, '-', 'Display Per Page ', limit_combo
                                            ]
			})
        
});


dsbku.load({
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
var debet = new Ext.ux.customRendererField({
            fieldLabel: 'Debet',
            name: 'debet',
		//	customRenderer:cr,
            width:150
            
        });
var kredit = new Ext.ux.customRendererField({
            fieldLabel: 'Kredit',
            name: 'kredit',
		//	customRenderer:cr,
            width:150
            
        });



var item_form = [{
			xtype : 'hidden',
			name : 'id',
			allowBlank : false
		}, {
			xtype : 'datefield',
			fieldLabel : 'Tanggal',
			name : 'tanggal',
			format : 'd/m/Y',
			allowBlank : false
		}, {
/*
			fieldLabel : 'Perihal',
			allowBlank : false,
			width:200,
                        height:100,
			xtype:'trigger',
                        name:'perihal',
			fieldLabel:'Perihal',
			enableKeyEvents : true,
			listeners: {
						specialkey: function(o, e){
						if (e.getKey() == e.ENTER){winGrid.show(this.id);}
												  }
					   },
						onTriggerClick: function(){
							if (!this.disabled)
								winGrid.show(this.id);
												  }
*/
            fieldLabel:'No. Bukti',
            name:'nobukti',
            width:100,
			xtype:'textfield'
			
		},{
			fieldLabel : 'Uraian',
			allowBlank : false,
			width:200,
            height:100,
			xtype:'trigger',
            name:'uraian',
			enableKeyEvents : true,
			listeners: {
						specialkey: function(o, e){
						if (e.getKey() == e.ENTER){winGrid.show(this.id);}
												  }
					   },
						onTriggerClick: function(){
							if (!this.disabled)
								winGrid.show(this.id);
												  }
		},debet,kredit];

var filtersx = new Ext.ux.grid.GridFilters({ ///////////////////////////////////////////////////////////////////////////////////
			filters : [
        {
            type:'string',
            dataIndex:'perihal'
        },{
            type:'string',
            dataIndex:'jenis'
        },{
            type:'date',

			dataIndex:'tanggal'

        },{
            type:'string',
            dataIndex:'string'
        },{
            type:'string',
            dataIndex:'kode'
        },{
            type:'numeric',
            dataIndex:'tahun'
        }

			]
		});

var expander = new Ext.ux.grid.RowExpander({
    tpl : new Ext.XTemplate(
         "<div><span class='nama'>{ket}</span>",
         "<br /><span>Penerima : {subject} </span>",
		 "<br /><span>Alamat : {alamat} </span>",
		 "<br /><span>Nomor Rekening : {norek} </span>",
		 "<br /><span>Nama Bank : {bank} </span>",
		 "<br /><span>No. & Tanggal SPK : {nospk} </span>",
		 "<br /><span>Nomor SPP : {nospp} </span>",
		 "<br /><span>Nomor SPM : {nospm} </span>",
		 "<br /><span>Nomor Kuitansi : {nokw} </span>",
		 "<br /><span>NPWP : {npwp} </span>",
		 "<br /><span>Tahun Transaksi : {tahun} </span>",
		 "<br /><span>Tanggal Buku Staf PPK : {[values.tanggal.format('j F Y')]} </span><br />",
         "<span>MAK : {kdmak} </span><br />",
		 "<span>Jumlah :  {[fm.number(values.jml,'Rp  0.000,00/i')]} </span><br />",
         "</div>"
    )
});


var cmx = new Ext.grid.ColumnModel({  ////////////////////////////////////////////////////////////////////////////////////
	defaults : {
		sortable : true
	},
	columns : [expander,
            {
                dataIndex : 'id',
				header: 'ID',
				width: 30,
                hidden : true,
                hideable : false,
                menuDisabled : true
             },{
                dataIndex:'nospp',
                header:'No. SPP',
				align: 'center',
                width: 60
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
                header:'ID Pagu',
				align: 'center',
                width: 50

             },{
                dataIndex:'kdpagu',
                header:'Kode PAGU',
				hidden : true,
                width: 100

             },{
                dataIndex:'kdmak',
				hidden : true,
                header:'MAK',
                width: 70

             },{
                dataIndex:'subject',
                header:'Subject',
                width: 200

             },{
                dataIndex:'ket',
                header:'Uraian',
				summaryType: 'count',
                summaryRenderer: function(val, cell, data){
                    return String.format("<span style=color:blue><b>Total Bulan ini :</b></span>",val);},
                width: 300

             },{
                dataIndex:'jml',
                header:'Jumlah',
				renderer: function(val,cell) {cell.attr = 'style=color:green'; return '' + Ext.util.Format.number(val,'0.000,00/i');},
                align: 'right',
				width: 150,
                summaryType: 'sum',
                summaryRenderer:function(val){
                    x = Ext.util.Format.number(val,'0.000,00/i');
                    return String.format("<span style=color:blue><b>{0}</b></span>",x);
                }

             },{
                dataIndex:'status',
                header:'Status',
                width: 60,
				align: 'center',
				renderer:  function(val,cell,record) {cell.attr = (record.data.status!="PROSES" )?"<span style='color:green';>LUNAS</span":"<span style='color:red';>PROSES</span";}
			 },{
                dataIndex:'tahun',
                header:'tahun',
                width: 50

             }
        ]
});

var dsWindows = new Ext.data.GroupingStore({
			url : ajax_url,
			id : 'id',
			baseParams : {
				task : 'getTrans' //lihat di ajax
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
                                name:'jml',
                                type:'float'
                            },{
                                name:'npwp'
                            },{
                                name:'alamat'
                            },{
                                name:'norek'
                            },{
                                name:'bank'
                            },{
                                name:'nospk'
                            },{
                                name:'status'
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
var hapusFilter = true;		
var gridWindows = new Ext.grid.GridPanel({    ////////////////////////////////////////////////////////////////////////
	// layout:'fit',
	ds : dsWindows,
	cm : cmx,
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
	plugins : [filtersx,expander],
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

var winGrid = new Ext.Window({
	layout : 'fit',
	id : 'winGrid',
	width : 720,
	height : 400,
	closeAction : 'hide',
	iconCls : 'app-grid',
	title : 'Lihat Data Kuintansi',
	modal : true,
	plain : true,
	border : false,
	items : [gridWindows

	],
	buttons : [{
		text : 'Select Data',
		handler : function() {
			if (gridWindows.getSelectionModel().hasSelection()) {
				data = gridWindows.getSelectionModel().getSelected().data; 
				frm_edit.getForm().setValues({uraian: data.ket});
				winGrid.hide();
				frm_edit.body.highlight('#c3daf9', {
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
			height : 250,
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
								dsbku.reload();
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

var main_content = {
	xtype : 'tabpanel',
	id : 'main_content',
	plain : true, // remove the header border
	activeItem : 0,
	items : [gridbku],
	listeners : {
		destroy : function() {
			myWin = Ext.getCmp('winEdit');
			if (myWin)
				myWin.destroy();
			myWin = Ext.getCmp('winGrid');
			if (myWin)
				myWin.destroy();

		}
	}
};
