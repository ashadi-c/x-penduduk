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


var dspeny = new Ext.data.GroupingStore({
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
		    function date_style(val){
				var dt = new Date( val );
		        return dt.format('j F Y');
		    }

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

var expander = new Ext.ux.grid.RowExpander({
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
	columns : [expander,
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


var id = new Ext.form.Hidden({
			//fieldLabel : 'ID',
			name : 'id',
			//labelSeparator : '',
			//width : 120,
			allowBlank : true
//			readOnly : true
		});


var nama = new Ext.form.TextField({
			fieldLabel : 'Nama Penyedia',
			name : 'nama',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var alamat = new Ext.form.TextField({
			fieldLabel : 'Alamat',
			name : 'alamat',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var kota = new Ext.form.TextField({
			fieldLabel : 'Kota',
			name : 'kota',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var namattd = new Ext.form.TextField({
			fieldLabel : 'Nama Penandatangan',
			name : 'namattd',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var jabttd = new Ext.form.TextField({
			fieldLabel : 'Jabatan',
			name : 'jabttd',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var tlp = new Ext.form.TextField({
			fieldLabel : 'Telepon',
			name : 'tlp',
			labelSeparator : '',
			width : 100,
			allowBlank : true
//			readOnly : true
		});

var fax = new Ext.form.TextField({
			fieldLabel : 'Fax',
			name : 'fax',
			labelSeparator : '',
			width : 100,
			allowBlank : true
//			readOnly : true
		});

var email = new Ext.form.TextField({
			fieldLabel : 'Email',
			name : 'email',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var npwp = new Ext.form.TextField({
			fieldLabel : 'NPWP',
			name : 'npwp',
			labelSeparator : '',
			width : 120,
			plugins: [new Ext.ux.InputTextMask('99.999.999.9-999.999', false)],
			allowBlank : true
//			readOnly : true
		});

var tglpkp = new Ext.form.DateField({
			fieldLabel : 'Tanggal PKP',
			name : 'tglpkp',
			labelSeparator : '',
			format : 'd/m/Y',
			maxValue : (new Date()).clearTime(),
			width : 90,
			allowBlank : true,
			disabledDaysText : 'Tanggal PKP harus lebih kecil dari besok'
		});

var hotel = new Ext.form.TextField({
			fieldLabel : 'Hotel',
			name : 'hotel',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var ijin = new Ext.form.TextField({
			fieldLabel : 'Jenis Ijin',
			name : 'ijin',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var noijin = new Ext.form.TextField({
			fieldLabel : 'No. Ijin',
			name : 'noijin',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var pengijin = new Ext.form.TextField({
			fieldLabel : 'Pemberi Ijin',
			name : 'pengijin',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var noakta = new Ext.form.TextField({
			fieldLabel : 'Nomor Akta',
			name : 'noakta',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var tglakta = new Ext.form.DateField({
			fieldLabel : 'Tanggal Akta',
			name : 'tglakta',
			labelSeparator : '',
			format : 'd/m/Y',
			maxValue : (new Date()).clearTime(),
			width : 90,
			allowBlank : true,
			disabledDaysText : 'Tanggal Akta harus lebih kecil dari besok'
		});

var notakta = new Ext.form.TextField({
			fieldLabel : 'Notaris Akta',
			name : 'notakta',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var noaktap = new Ext.form.TextField({
			fieldLabel : 'Nomor Akta Perub.',
			name : 'noaktap',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var tglaktap = new Ext.form.DateField({
			fieldLabel : 'Tanggal Akta Perub',
			name : 'tglaktap',
			labelSeparator : '',
			format : 'd/m/Y',
			maxValue : (new Date()).clearTime(),
			width : 90,
			allowBlank : true,
			disabledDaysText : 'Tanggal Akta harus lebih kecil dari besok'
		});

var notaktap = new Ext.form.TextField({
			fieldLabel : 'Notaris Akta Perub.',
			name : 'notaktap',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var nmttd1 = new Ext.form.TextField({
			fieldLabel : 'Pejabat 1',
			name : 'nmttd1',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var jabttd1 = new Ext.form.TextField({
			fieldLabel : 'Jabatan 1',
			name : 'jabttd1',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var nmttd2 = new Ext.form.TextField({
			fieldLabel : 'Pejabat 2',
			name : 'nmttd2',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var jabttd2 = new Ext.form.TextField({
			fieldLabel : 'Jabatan 2',
			name : 'jabttd2',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var nmttd3 = new Ext.form.TextField({
			fieldLabel : 'Pejabat 3',
			name : 'nmttd3',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var jabttd3 = new Ext.form.TextField({
			fieldLabel : 'Jabatan 3',
			name : 'jabttd3',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var nmttd4 = new Ext.form.TextField({
			fieldLabel : 'Pejabat 4',
			name : 'nmttd4',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var jabttd4 = new Ext.form.TextField({
			fieldLabel : 'Jabatan 4',
			name : 'jabttd4',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var norek = new Ext.form.TextField({
			fieldLabel : 'Nomor Rekening',
			name : 'norek',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var bank = new Ext.form.TextField({
			fieldLabel : 'Bank',
			name : 'bank',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});

var anrek = new Ext.form.TextField({
			fieldLabel : 'Atas Nama',
			name : 'anrek',
			labelSeparator : '',
			width : 120,
			allowBlank : true
//			readOnly : true
		});


///****************** FORM INPUT ******************************************/////////////////////

var frmInput = new Ext.FormPanel({
	//id : 'frmInput',
	//xtype : 'form',
	frame : true,
	iconCls : 'form',
	url : ajax_url,
	border : false,
	labelAlign : 'left',
	layout : 'column',
	items : [{
		columnWidth : 0.5,
		xtype : 'fieldset',
		labelWidth : 110,
		autoHeight : true,
		bodyStyle : Ext.isIE ? 'padding:0 0 5px 10;' : 'padding:10px 10;',
		border : false,
		style : {
			"margin-left" : "5px", // when you add custom margin in IE 6...
			"margin-right" : Ext.isIE6
					? (Ext.isStrict ? "-10px" : "-13px")
					: "0" // you have to adjust for it somewhere else
		},
		items : [id, nama, alamat, kota, namattd, jabttd, tlp, fax, email, npwp, tglpkp, hotel, ijin, noijin, pengijin, noakta]
	}, {
		columnWidth : 0.5,
		xtype : 'fieldset',
		labelWidth : 110,
		autoHeight : true,
		bodyStyle : Ext.isIE ? 'padding:0 0 5px 10;' : 'padding:10px 10;',
		border : false,
		style : {
			"margin-left" : "5px", // when you add custom margin in IE 6...
			"margin-right" : Ext.isIE6
					? (Ext.isStrict ? "-10px" : "-13px")
					: "0" // you have to adjust for it somewhere else
		},
		items : [tglakta, notakta, noaktap, tglaktap, notaktap, nmttd1, jabttd1, nmttd2, jabttd2, nmttd3, jabttd3, nmttd4, jabttd4, norek, bank, anrek]
	}]
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
			dspeny.load({
						params : {
							start : 0,
							limit : parseInt(limit_combo.getValue())
						}
					});
		});

var gridpeny = new Ext.grid.GridPanel({
	title : 'Daftar Surat Pejabat Pengadaan',
	// region:'center',
	iconCls : 'parent-form',
	// viewConfig:{forceFit:true}, //agar colom2 mengecil sendiri waktu diresize
	// windows
	//layout : 'fit',
	ds : dspeny,
	cm : cmpeny,
	stripeRows : true,
	showPreview: false,
	enableColLock : false,
	view : new Ext.grid.GroupingView({
		forceFit : false,
		groupTextTpl : '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
	}),

	loadMask : true,
	plugins : [filterpeny, expander],
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
                    frmInput.getForm().reset();

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
                    if (!gridpeny.getSelectionModel().getSelected())
                        return false;
                    
                    winEdit.setTitle('Edit Data');
                    winEdit.show(this.id); 
					frmInput.getForm().setValues(
                    gridpeny.getSelectionModel().getSelected().data
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
                    a = gridpeny.getSelectionModel().getSelections();
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
										dspeny.reload();
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
                                                                                        if (!gridpeny.getSelectionModel().getSelected())
                                                                                            return false;
                                                                                        id_data = gridpeny.getSelectionModel().getSelected().data.id;

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
				store : dspeny,
				pageSize : parseInt(limit_combo.getValue()),
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
							}
						}, '-', 'Display Per Page ', limit_combo
                                            ]
			})
        
});


dspeny.load({
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



/////////////////*******************************************//////////////////////////////////////////////////////////////////

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
			plugins: [new Ext.ux.InputTextMask('S-999/PPBJ/LL/2099', false)]

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
var dsWindows = new Ext.data.GroupingStore({
			url : ajax_url,
			id : 'id',
			baseParams : {
				task : 'getSppk' //lihat di ajax
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
	plugins : [filtersx],
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
	title : 'Lihat Data Surat PPK',
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
			width : 550,
			height : 510,
			closeAction : 'hide',
			iconCls : 'form',
			title : 'Add',
			modal : true,
			plain : true,
			border : false,
			items : [frmInput

			],
			buttons : [{
				text : 'Save',
				handler : function() {
					if (frmInput.getForm().isValid()) {
						frmInput.getForm().submit({
							waitMsg : 'Saving Data',
							params : {
								task : 'saveEdit'
							},
							success : function(a, b) {
								winEdit.hide();
								dspeny.reload();
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
	items : [gridpeny],
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
