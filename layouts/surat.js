/** untuk menandakan bahwa script ini valid dan akan di eksekusi * */
valid_script = true;
ajax_url = 'ajax.handler.php?id=' + page;
/** =============================================================* */
var dsSurat = new Ext.data.GroupingStore({
        url : ajax_url,
        baseParams : {
                task : 'getSurat'
        },
        reader : new Ext.data.JsonReader({
        idProperty : 'id_surat',
        totalProperty : 'total',
        root : 'data',
        fields: [
            {name: 'id_surat'},
            {name:'id_penduduk'},
            {name:'no_surat'},
            {name: 'nama'},
            {name: 'tanggal_lahir', type:'date',dateFormat:'Y-m-d'},
            {name: 'no_ktp'},
            {name:'no_kk'},
            {name: 'tempat_lahir'},
            {name: 'rt'},
            {name:'rw'},
            {name:'dusun'},
            {name:'jenis_surat'},
            {name:'tgl_buat'},
            {name:'tgl_ttd'},
            {name:'keterangan_1'},
            {name:'keterangan_2'},
            {name:'tambahan',type:'date',dateFormat:'d/m/Y'},
            {name:'umur'},
            {name:'picture'}
        ]}),
        sortInfo : {
                field : 'id_surat',
                direction : 'DESC'
        },
        remoteSort : true,
        remoteGroup:false,
        groupField:'tgl_buat'
}); 

var filterSurat = new Ext.ux.grid.GridFilters({
    filters: [
        {type:'string',dataIndex:'nama'},
        {type:'date',dataIndex:'tanggal_lahir'},
        {type:'list',dataIndex:'jenis_surat',phpMode:true,options:['GAKIN','SKCK','BEASISWA','KTP','SK']},
        {type:'date',dataIndex:'tgl_buat'},
        {type:'date',dataIndex:'tgl_ttd'},
        {type:'numeric',dataIndex:'rt'},
        {type:'numeric',dataIndex:'rw'},
        {type:'list',dataIndex:'dusun',phpMode:true,options:filterDusun}
    ]
});

var cmSurat = new Ext.grid.ColumnModel({
	defaults : {
		sortable : true,
                groupable:false
	},
	columns : [
            {dataIndex : 'id_surat',hidden : true,hideable : false,menuDisabled : true},
            {dataIndex:'no_surat',header:'No Surat',width:130,
            renderer: function(val,cell,rec){
                dt = Date.parseDate(rec.data.tgl_ttd,'Y-m-d');
                no = val; 
                switch (rec.data.jenis_surat){
                    case 'BEASISWA':
                        no = '420/'+val +'/421.621.010/' + dt.format('Y');
                    break;
                    case 'KTP':
                        no = '470/'+val +'/421.621.010/' + dt.format('Y');
                    break;
                    case 'GAKIN':
                        no = '440/'+val +'/421.621.010/' + dt.format('Y');
                    break;
                    case 'SKCK':
                        no = '330/'+val +'/421.621.010/' + dt.format('Y');
                    break;
                    case 'SK':
                        no = '440/'+val +'/421.621.010/' + dt.format('Y');
                    break;
                }
                return no;
            }},
            {dataIndex:'jenis_surat',header:'Jenis Surat',width:90,groupable:true},
            {dataIndex:'tgl_buat',header:'Tanggal',width:90,renderer:Ext.util.Format.dateRenderer('d/m/Y'),groupable:true},
            {dataIndex:'tgl_ttd',header:'Tanggal TTD',width:90,renderer:Ext.util.Format.dateRenderer('d/m/Y')},
            {dataIndex:'nama',header:'Pemohon',width:100},
            {dataIndex:'keterangan_1',header:'Keterangan',width:160},
            {dataIndex:'tanggal_lahir',header:'Tanggal lahir',width:90,renderer:Ext.util.Format.dateRenderer('d/m/Y')},
            {dataIndex:'rt',header:'RT',width:30},
            {dataIndex:'rw',header:'RW',width:30},
            {dataIndex:'dusun',header:'DUSUN',width:100,renderer:function(val){return val.toUpperCase()}}
        ]
});

var limit_store = new Ext.data.SimpleStore({
    fields : ['limit'],
    data : [[30], [50], [100]]
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
dsSurat.load({
    params : {
            start : 0,
            limit : parseInt(limit_combo.getValue())
    }
    });
});
function buatSurat(jns_surat){
    if (!checkRole(ROLE.ADD_DATA)){
            //this.disable();
            return false;
    }
    winEdit.setTitle('Buat Surat Baru');
    winEdit.show(gridSurat.getTopToolbar().get(0).getId());
    frm_edit.getForm().reset();
    frm_edit.getForm().setValues({jenis_surat:jns_surat});
    setInputan(jns_surat);
    Ext.getCmp('frm_view').body.update('');
  }

var gridSurat = new Ext.grid.GridPanel({
    title:'Surat Menyurat',
    iconCls : 'parent-form',
    ds : dsSurat,
    cm : cmSurat,
    stripeRows : true,
    enableColLock : false,
    loadMask : true,
    view : new Ext.grid.GroupingView({
            forceFit : false,
            groupTextTpl : '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
    }),
    plugins : [filterSurat],
    tbar: [
      {
          text:'Buat Surat Baru',
          iconCls:'menu-add',
          disabled: checkRole(!ROLE.ADD_DATA),
          tooltip: {
              title: 'Buat Surat Baru',
              text: 'Buat Surat Permohonan Baru'
          },
          menu: [
              {text:'Askes Gakin',handler:function(){buatSurat('GAKIN')}},
              {text:'KTP Sementara',handler:function(){buatSurat('KTP')}},
              {text:'Surat SKCK',handler:function(){buatSurat('SKCK')}},
              {text: 'Surat Keterangan BEASISWA',handler:function(){buatSurat('BEASISWA')}},
              {text:'Surat Keterangan',handler:function(){buatSurat('SK')}}
          ]
      },'-',
      {
          text:'Edit Surat',
          iconCls:'form-edit',
          disabled: checkRole(!ROLE.EDIT_DATA),
          tooltip: {
              title: 'Edit Surat',
              text: 'Ubah Data yang di seleksi'
          },
          handler: function(){
              if (gridSurat.getSelectionModel().hasSelection()){
                  winEdit.show(this.id);
                  winEdit.setTitle('Edit Surat');
                  frm_edit.getForm().setValues(
                        gridSurat.getSelectionModel().getSelected().data
                    );
                    setInputan(gridSurat.getSelectionModel().getSelected().data.jenis_surat);
                    detIbu = Ext.getCmp('frm_view');
                    rd = gridSurat.getSelectionModel().getSelected();
                    r = rd.copy();
                    r.data.tanggal_lahir = Ext.util.Format.date(
                                    r.data.tanggal_lahir, 'd, F Y');
                    detailTpl.overwrite(detIbu.body, r.data);

              }
          }

      },'-',
      {
          text:'Hapus Surat',
          iconCls:'table-delete',
          disabled: checkRole(!ROLE.REMOVE_DATA),
          tooltip: {
              title: 'Hapus Data',
              text: 'Hapus Surat yang diseleksi'
          },
          handler: function(){
                    a = gridSurat.getSelectionModel().getSelections();
                    if (!a)
                        return false;
                   var data = [];
                   Ext.each(a, function(r, i) {
                       data.push(r.data.id_surat);
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
										dsSurat.reload();
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
          text:'Print Letter',
          iconCls:'report-pdf',
          disabled: checkRole(!ROLE.PRINT_DATA),
          tooltip: {
              title:'Cetak Data',
              text:'Cetak Surat yang diseleksi'
          },
          handler:function(){
            if (!gridSurat.getSelectionModel().getSelected())
                return false;
            id_data = gridSurat.getSelectionModel().getSelected().data.id_surat;
            jns = gridSurat.getSelectionModel().getSelected().data.jenis_surat;
            print_data(id_data, jns);            
          }
      }
    ],
    bbar : new Ext.PagingToolbar({
                id : 'pagingBar',
                store : dsSurat,
                pageSize : parseInt(limit_combo.getValue()),
                plugins : filterSurat,
                displayInfo : true,
                displayMsg : 'Displaying Data {0} - {1} of {2}',
                emptyMsg : "No Data to display",
                items : ['-', {
                            tooltip : {
                                    title : 'Clear Filter',
                                    text : 'Clear Searching Filter'
                            },
                            iconCls : 'drop',
                            handler : function() {
                                    filterSurat.clearFilters();
                            }
                    }, '-', 'Display Per Page ', limit_combo
                ]
        })
    
});

function print_data(id_data,jns){
            ketua_rw ="";
            options = "id_surat="+ id_data;
            report_link = 'report.php?id=' + page + "&" + options;
            if (jns=="SKCK"){
                Ext.MessageBox.prompt('Surat SKCK', 'Silahkan isi Nama Ketua RT',
                function(btn,text){
                    if (btn =="ok"){
                        ketua_rw = "&rw="+text;
                        report_link += ketua_rw;
                        winReport({
                            //id : this.id,
                            title : 'Preview Surat',
                            url : report_link,
                            type : 'PDF'
                         });
                    }
                });
            }else {
                winReport({
                    id : this.id,
                    title : 'Preview Surat',
                    url : report_link,
                    type : 'PDF'
             });
            }

}

dsSurat.load({
    params : {
            start : 0,
            limit : parseInt(limit_combo.getValue())
    }});

filterSurat.clearFilters();
for (i = 0; i < gridSurat.getColumnModel().getColumnCount(); i++)
	if (gridSurat.getColumnModel().isMenuDisabled(i) == false)
		gridSurat.getColumnModel().setHidden(i, false);

function setInputan(v){
    switch (v) {
        case 'KTP':
            frm_edit.get(5).setVisible(true);
            frm_edit.get(6).setVisible(true);
            frm_edit.get(7).setVisible(false);
        break;
        case 'GAKIN':
            frm_edit.get(5).setVisible(false);
            frm_edit.get(6).setVisible(true);
            frm_edit.get(7).setVisible(false);
        break;
        case 'BEASISWA':
            frm_edit.get(5).setVisible(false);
            frm_edit.get(6).setVisible(true);
            frm_edit.get(7).setVisible(false);
        break;
        case 'SKCK':
            frm_edit.get(5).setVisible(false);
            frm_edit.get(6).setVisible(true);
            frm_edit.get(7).setVisible(false);
        break;
        case 'SK':
            frm_edit.get(5).setVisible(false);
            frm_edit.get(6).setVisible(true);
            frm_edit.get(7).setVisible(true);
        break;
    }
}


var item_form = 
    [
        {xtype:'hidden',name:'id_surat'},
        {xtype:'hidden',name:'id_penduduk'},
        {xtype:'textfield',name:'jenis_surat',fieldLabel:'Jenis Surat',allowBlank:false,readOnly:true,width:100},
        {xtype:'textfield',name:'no_surat',fieldLabel:'Nomor Surat (hanya No urutnya)',allowBlank:false,width:100,vtype:'angka'},
        {xtype:'datefield',fieldLabel:'Tanggal Buat',name:'tgl_ttd',allowBlank:false,width:100,format:'d/m/Y'},
        {xtype:'datefield',fieldLabel:'Masa Berlaku',name:'tambahan',allowBlank:true,width:100,format:'d/m/Y'},
        {xtype:'textarea',fieldLabel:'Keterangan',name:'keterangan_1',anchor:'95%',height:60},
        {xtype:'textarea',fieldLabel:'Digunakan Untuk',name:'keterangan_2',anchor:'95%',height:60}
        
    ];
var frm_edit = new Ext.FormPanel({
        //title:'Keterangan Surat',
        //iconCls:'menu-add',
        region:'center',
        frame : true,
        url : ajax_url,
        border : true,
        bodyStyle : 'padding:5px 5px 0 5px',
        labelAlign : 'left',
        labelWidth : 170,
        defaults : {
                width : 100,
                labelSeparator : ''
        },
        defaultType : 'textfield',
        items : item_form

});
var detailTplMarkup = [
		'<div style="float:left;" ><img src="upload_foto/{picture}" /></div>',
		'<div style="margin-left:110px;">', '<h2>{nama}</h2>',
		'<p>No Kartu Keluarga : {no_kk}</p>', '<p>No Ktp: {no_ktp}</p>',
		'<p>Tempat Tanggal Lahir : {tempat_lahir}, {tanggal_lahir}</p>',
		'<p>RT/RW: {rt}/{rw}</p>', '<p>Dusun: {dusun}</p>', '</div>'

];

var detailTpl = new Ext.Template(detailTplMarkup);

var frm_view = {
   region:'north',
   id:'frm_view',
   height:180,
   split:false,
   border:true,
   margins: '0 0 2 0 ',
    bodyStyle : {
            background : '#eee',
            padding : '7px'
    },
    html : 'Pilih Penduduk',
    tbar: [
        {
            text:'Pilih Penduduk',
            iconCls:'add-data',
            handler:function(){
                winGrid.show(this.id);
            }
        },'-',{
            text:'Reset',
            iconCls:'drop',
            handler: function(){
                frm_edit.get(1).reset();
                Ext.getCmp('frm_view').body.update(''); 
            }
        }
    ]
   
};

var winEdit = new Ext.Window({
                    layout : 'border',
                    id : 'winEdit',
                    width : 500,
                    height : 510,
                    closeAction : 'hide',
                    iconCls : 'form',
                    title : 'Buat Surat Baru',
                    modal : true,
                    plain : true,
                    border : false,
                    items : [frm_view,frm_edit],
                    buttons : [{
                            text : 'Save',
                            handler : function() {
                               if (Ext.getCmp('winEdit').get(1).getForm().getValues().id_penduduk !='')
                                    if (Ext.getCmp('winEdit').get(1).getForm().isValid()) {
                                            Ext.getCmp('winEdit').get(1).getForm().submit({
                                                    waitMsg : 'Saving Data',
                                                    params : {
                                                            task : 'saveEdit'
                                                    },
                                                    success : function(a, b) {
                                                            Ext.getCmp('winEdit').hide();
                                                            dsSurat.reload();
                 
                                                            Ext.example.msg('Save Data',
                                                                            'Data has been successfully saved');
                                                            if (b.result.lastId)
                                                                print_data.defer(1000,this,[b.result.lastId, b.result.jenisSurat]);
                                                    },
                                                    failure : function(a, b) {
                                                            Ext.MessageBox.show({
                                                                                    title : 'Alert',
                                                                                    msg : 'Failed Save Data : '
                                                                                                    + b.result.msg,
                                                                                    buttons : Ext.MessageBox.OK,
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
                    }]
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
				Ext.getCmp('winEdit').get(1).getForm().setValues(
                                {id_penduduk: gridWindows.getSelectionModel()
						.getSelected().data.id_penduduk
                                })
				winGrid.hide();
                                detIbu = Ext.getCmp('frm_view');
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
	items : [gridSurat],
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
