/** untuk menandakan bahwa script ini valid dan akan di eksekusi * */
valid_script = true;
ajax_url = 'ajax.handler.php?id=' + page;
/** =============================================================* */

/** -------------->Tab 1 Browse Data <-------------------------* */
function validateFileExtension(fileName) {
   var exp = /^.*.(jpg|JPG)$/;
   return exp.test(fileName);
}

var form_upload = new Ext.FormPanel({
	bodyStyle:'padding: 5 5 0 5',
	frame:true,
	labelWidth: 100,
	fileUpload:true,
	defaults: {
		anchor:'95%',
		allowBlank:false,
		msgTarget:'side',
		labelSeparator:''
	},
	items: [
            {
              xtype:'hidden',
              name:'id_penduduk'
            },
	{
		xtype:'fileuploadfield',
		id:'f-img',
		fieldLabel:'File Name',
		emptyText:'Select Picture',
		name:'fimg',
		buttonText:'',
		buttonCfg: {
			iconCls:'image-add'
		}
	}
	]
});

var win_upload = new Ext.Window({
	layout : 'fit',
	id : 'win_upload',
	width : 400,
	height : 120,
	closeAction : 'hide',
	iconCls : 'image-add',
	title : 'Upload Picture',
	modal : true,
	plain : false,
	border : false,
	items: form_upload,
	buttons: [
	{
		text:'Upload',
		handler: function() {
			if (form_upload.getForm().isValid()){
				if (!validateFileExtension(Ext.getDom('f-img').value)){
					Ext.MessageBox.show({
						title : 'Warning',
						msg : 'Incorrect File Type',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING
					});

				} else
					form_upload.getForm().submit({
						waitMsg :'Uploading File',
						url:ajax_url,
						params : {
							task:'upload'
						},
						success: function(a,b){
                                                        Ext.example.msg('Upload', 'Picture has been changed')
							form_upload.getForm().reset();
							win_upload.hide();
                                                        grid.getSelectionModel().getSelected().set('picture',b.result.img); 

						},
						failure: function(a,b){
							textError ='';
							Ext.each(b.result.err,function(r,i){
								textError += r + " <br />";
							}
							);
							Ext.MessageBox.show({
								title : 'Failed Upload Picture',
								msg : textError,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.WARNING
							});

						}
					})
			}

		}
	},{
		text:'Close',
		handler: function() {
			win_upload.hide();
		}
	}
	]
});


var ds = new Ext.data.JsonStore({
			url : ajax_url,
			id : 'id',
			totalProperty : 'total',
			baseParams : {
				task : 'getData',
                                col : 'nama'
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
					},{
                                                name : 'picture'
                                        }

			],
			sortInfo : {
				field : 'nama',
				direction : 'ASC'
			},
			remoteSort : true
		});


var cm = new Ext.grid.ColumnModel({
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
			the_start = st.lastOptions.params.start;
			the_number = row + 1 + the_start;
			return the_number;
		},
		align : 'center'
	}, {
		dataIndex : 'nama',
                header:'Detail Penduduk',
                renderer : function(val,cell,rec,row,col,st){
                    the_render = String.format(
                                    "<div><img class='foto' src='upload_foto/{0}' /></div>"+
                                     "<div><span class='nama'>{1} [{5}]</span>"+
                                     "<br /><span>Jenis Kelamin : {2} </span><br />"+
                                     "<span>Tempat/Tgl Lahir : {3},{4} </span><br />"+
                                     "<span>Agama : {6} </span><br />"+
                                     "<span>RT/RW : {7}/{8} </span><br />"+
                                     "<span>Dusun : {9} </span><br />"+
                                     "</div>",
                                    rec.data.picture,
                                    rec.data.nama,
                                    rec.data.kelamin,
                                    rec.data.tempat_lahir,
                                    rec.data.tanggal_lahir.format('d M Y'),
                                    rec.data.no_ktp,
                                    rec.data.agama,
                                    rec.data.rt,
                                    rec.data.rw,
                                    rec.data.dusun
                                );
                    return the_render;
                }
	}
	]
});
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
			ds.load({
						params : {
							start : 0,
							limit : parseInt(limit_combo.getValue())
						}
					});
		});

var combo_field = new Ext.form.ComboBox({
    store : new Ext.data.SimpleStore({
        fields:['col','field'],
        data :[['Nama','Nama'],['Kelamin','Kelamin'],['No_Ktp','No KTP'],['No_KK','NO KK'],['RT','RT'],['RW','RW'],['Dusun','Dusun'],['Agama','Agama']]
    }),
    displayField : 'field',
    valueField : 'col',
    typeAhead : true,
    mode : 'local',
    triggerAction : 'all',
    selectOnFocus : true,
    width : 100,
    listeners: {
        change: function(){
            ds.baseParams.col = this.getValue(); 
        }
    }
});

combo_field.setValue('Nama');

var grid = new Ext.grid.GridPanel({
	title : 'Data Penduduk',
	iconCls : 'parent-form',
	viewConfig: {
          forceFit:true
        },
	ds : ds,
	cm : cm,
        sm : new Ext.grid.RowSelectionModel({singleSelect: true}),
        border:false,
	stripeRows : true,
	enableColLock : false,
	loadMask : true,
	tbar : [
            'Search: ', ' ',
            new Ext.ux.form.SearchField({
                store: ds,
                emptyText:'Search',
                width:320
            }),' ',combo_field,
            '->',{
                text:'Delete Picture',
                iconCls:'row-delete',
                disabled: checkRole(!ROLE.REMOVE_PIC),
                tooltip: {
                    title:'Delete Picture',
                    text : 'Delete Selected Picture'
                },
                handler: function() {
                    if (!checkRole(ROLE.REMOVE_PIC)){
                            this.disable();
                            return false;
                    }

                    if (!grid.getSelectionModel().getSelected())
                        return false;
				Ext.MessageBox.show({
					title : 'Delete?',
					msg : "Are You Sure to delete Selected Picture?",
					buttons : Ext.MessageBox.YESNO,
					fn : function(a) {
						if (a == "yes") {
							Ext.getCmp('content-panel').body.mask(
									'Removing Data', 'x-mask-loading');
							Ext.Ajax.request({
								url : ajax_url,
								params : {
									task : "removepic",
									id_penduduk : grid.getSelectionModel().getSelected().data.id_penduduk,
                                                                        pic : grid.getSelectionModel().getSelected().data.picture
								},
								success : function(response) {
									Ext.getCmp('content-panel').body.unmask();
									var res = Ext.decode(response.responseText);
									if (res.success) {
										grid.getSelectionModel().getSelected().set('picture','no_image.gif');
										Ext.example.msg('Remove Selected Item',
														'Picture has been deleted from Database');

									} else {
										Ext.MessageBox.show({
											title : 'Alert',
											msg : 'Failed to Delete Picture',
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
            },'-',
            {
				text : 'Change Image',
				iconCls : 'image-add',
                                disabled: checkRole(!ROLE.CHANGE_IMAGE),
				tooltip : {
					title : 'Upload Image',
					text : 'Change Image Picture'
				},
				handler : function() {
					if (!checkRole(ROLE.CHANGE_IMAGE)){
						this.disable();
						return false; 		
					}
                                        if (grid.getSelectionModel().getSelected()){
                                            form_upload.getForm().setValues({
                                               id_penduduk : grid.getSelectionModel().getSelected().data.id_penduduk
                                            });
                                            win_upload.show(this.id);
                                        }else {
                                                Ext.MessageBox.show({
                                                        title : 'Alert',
                                                        msg : 'Please Select Data First',
                                                        buttons : Ext.MessageBox.OK,
                                                        icon : Ext.MessageBox.WARNING
                                                });
                                            
                                        }

                                    }
                },'-',{
                    text: 'Print (PDF)',
                    iconCls:'report-pdf',
                    disabled: checkRole(!ROLE.PRINT_DATA),
                    handler: function(){
                        if (!checkRole(ROLE.PRINT_DATA)){
                                this.disable();
                                return false;
                        }
			option = grid.store.lastOptions.params;
			options = Ext.urlEncode(option);
			report_link = 'report.php?id=' + page  + "&" + options;
			rType = 'PDF';
			winReport({
						id : this.id,
						title : 'Foto',
						url : report_link,
						type : rType
			});
                    }
                }
	],
	bbar : new Ext.PagingToolbar({
				id : 'pagingBar',
				store : ds,
				pageSize : parseInt(limit_combo.getValue()),
				displayInfo : true,
				displayMsg : 'Displaying Data {0} - {1} of {2}',
				emptyMsg : "No Data to display",
				items : [ '-', 'Display Per Page ', limit_combo]
			})
});

// action grid
grid.on("celldblclick", function(a, b, c, d) {
});
ds.load({
			params : {
				start : 0,
				limit : parseInt(limit_combo.getValue())
			}
		});

/** -------------->End Of Tab1<-------------------------* */

var main_content = {
	id : 'main_content',
	//layout : 'fit',
        xtype:'tabpanel',
        activeItem:0,
	border : true,
	items : [grid],
	listeners: {
		destroy: function(){
			mywin = Ext.getCmp('win_upload');
			if (mywin)
				mywin.destroy();
		}
	}

};
