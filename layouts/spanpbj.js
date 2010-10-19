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

var dsspanpbj = new Ext.data.GroupingStore({
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
                                name:'jenis'
                            },{
                                name:'tanggal',
                                type:'date',
                                dateFormat: 'Y-m-d'
                            },{
                                name:'perihal'
                            },{
                                name:'kode'
                            },{
                                name:'tahun'
                            }
                        ]}),
			sortInfo : {
				field : 'jenis',
				direction : 'ASC'
			},
			remoteSort : true,
                        remoteGroup:false,
                        groupField:'jenis'

});
		    function date_style(val){
				var dt = new Date( val );
		        return dt.format('j F Y');
		    }

var filterspanpbj = new Ext.ux.grid.GridFilters({
    filters: [
        {
            type:'string',
            dataIndex:'jenis'
        },{
            type:'date',
            dataIndex:'tanggal'
			
        },{
            type:'string',
            dataIndex:'perihal'
        },{
            type:'string',
            dataIndex:'kode'
			
        },{
            type:'numeric',
            dataIndex:'tahun'
        }
    ]
});

var cmspanpbj = new Ext.grid.ColumnModel({
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
                dataIndex:'jenis',
                header:'Jenis',
                width: 150
             },{
                dataIndex:'tanggal',
                header:'Tanggal',
		renderer: date_style,
                width: 100,
                align:'right'

             },{
                dataIndex:'perihal',
                header:'Perihal',
                width: 300

             },{
                dataIndex:'kode',
                header:'Kode',
                width: 130

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
			dsspanpbj.load({
						params : {
							start : 0,
							limit : parseInt(limit_combo.getValue())
						}
					});
		});

var gridspanpbj = new Ext.grid.GridPanel({
	title : 'Daftar Surat Panitia Pengadaan',
	// region:'center',
	iconCls : 'parent-form',
	// viewConfig:{forceFit:true}, //agar colom2 mengecil sendiri waktu diresize
	// windows
	//layout : 'fit',
	ds : dsspanpbj,
	cm : cmspanpbj,
	stripeRows : true,
	enableColLock : false,
	view : new Ext.grid.GroupingView({
		forceFit : false,
		groupTextTpl : '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
	}),

	loadMask : true,
	plugins : [filterspanpbj],
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
                    if (!gridspanpbj.getSelectionModel().getSelected())
                        return false;
                    frm_edit.getForm().setValues(
                    gridspanpbj.getSelectionModel().getSelected().data
                    );
                    winEdit.setTitle('Edit Data');
                    winEdit.show(this.id); 
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
                    a = gridspanpbj.getSelectionModel().getSelections();
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
										dsspanpbj.reload();
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
                                                                                        if (!gridspanpbj.getSelectionModel().getSelected())
                                                                                            return false;
                                                                                        id_data = gridspanpbj.getSelectionModel().getSelected().data.id;

                                                                                        options = "id_data="+ id_data;

                                                                                        a = this.text;
                                                                                        pdf = a.search(/PDF/);
                                                                                        mode_report = (pdf > 0) ? "&mode=pdf" : "&mode=word";
                                                                                        report_link = 'report.php?id=' + page + mode_report + "&" + options;
                                                                                        rType = (pdf > 0) ? 'PDF' : 'WORD';
                                                                                        if (rType =='PDF')
                                                                                        winReport({
                                                                                                                id : this.id,
                                                                                                                title : 'Laporan SPPK',
                                                                                                                url : report_link,
                                                                                                                type : rType
                                                                                                         });
                                                                                        else
                                                                                            document.location.href = report_link; 

                                                                                                                                 }

			  }],
	bbar : new Ext.PagingToolbar({
				id : 'pagingBar',
				store : dsspanpbj,
				pageSize : parseInt(limit_combo.getValue()),
				plugins : filterspanpbj,
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
								filterspanpbj.clearFilters();
							}
						}, '-', 'Display Per Page ', limit_combo
                                            ]
			})
        
});


dsspanpbj.load({
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

var item_form = [{
			xtype : 'hidden',
			name : 'id',
			allowBlank : false
		},{
            fieldLabel:'Jenis',
            name:'jenis',
            width:140,
			xtype:'combo',
			typeAhead : true,
			triggerAction : 'all',
			store : dsjenis,
			mode : 'local',
			displayField : 'jenis',
			valueField : 'jenis',
			lazyRender : true,
			listClass : 'x-combo-list-small'
        }, {
			xtype : 'datefield',
			fieldLabel : 'Tanggal',
			name : 'tanggal',
			format : 'd/m/Y',
			allowBlank : false
		}, {
			//xtype : 'textarea',
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

			
		},{
			fieldLabel : 'Kode',
			name : 'kode',
			width : 200,
			xtype:'textfield',
			allowBlank : false,
			plugins: [new Ext.ux.InputTextMask('S-999/PNPBJ/LL/2099', false)]

		}, {
			xtype : 'hidden',
			fieldLabel : 'Tahun',
			name : 'tahun'
		}];

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
var cmx = new Ext.grid.ColumnModel({  ////////////////////////////////////////////////////////////////////////////////////
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
	},            {
                dataIndex : 'id',
                hidden : true,
                hideable : false,
                menuDisabled : true
             },{
                dataIndex:'perihal',
                header:'Perihal',
                width: 300

             },{
                dataIndex:'jenis',
                header:'Jenis',
                width: 150
             },{
                dataIndex:'tanggal',
                header:'Tanggal',
		renderer: date_style,
                width: 100,
                align:'right'

             },{
                dataIndex:'kode',
                header:'Kode',
                width: 130

             },{
                dataIndex:'tahun',
                header:'Tahun',
                width: 50

             }
        ]
});
var dsWindows = new Ext.data.JsonStore({       ///////////////////////////////////////////////////////////////////////////////////
			url : ajax_url,
			id : 'id',
			totalProperty : 'total',
			baseParams : {
				task : 'getSppk'
			},
			root : 'data',
			fields : [                            {
                                name:'id'
                            },{
                                name:'jenis'
                            },{
                                name:'tanggal',
                                type:'date',
                                dateFormat: 'Y-m-d'
                            },{
                                name:'perihal'
                            },{
                                name:'kode'
                            },{
                                name:'tahun'
                            }

			],
			sortInfo : {
				field : 'perihal',
				direction : 'ASC'
			},
			remoteSort : true
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

var winGrid = new Ext.Window({
	layout : 'fit',
	id : 'winGrid',
	width : 720,
	height : 400,
	closeAction : 'hide',
	iconCls : 'app-grid',
	title : 'Lihat Data Sppk',
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
				frm_edit.getForm().setValues({perihal: data.perihal,tahun:data.tahun});
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
								dsspanpbj.reload();
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
	items : [gridspanpbj],
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
