/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var dsAll = new Ext.data.GroupingStore({
			url : 'urlnya',
			id : 'id',
			baseParams : {
				task : 'getDataAll'
			},
			reader : new Ext.data.JsonReader({
						totalProperty : 'total',
						root : 'data',
						fields : [{
									name : 'jenis_belanja'
								}, {
									name : 'kode_surat'
								}, {
									name : 'tanggal',
									type : 'date',
									dateFormat : 'Y-m-d'
								}
						]
					}),
			sortInfo : {
				field : 'jenis_belanja',
				direction : 'ASC'
			},
			groupField : 'jenis_belanja',
			remoteSort : false
		});

var cmAll = new Ext.grid.ColumnModel({
			defaults : {
				sortable : true
			},
			columns : [
                            {
				dataIndex : 'jenis_belanja',
				hidden : true,
				hideable : false,
				menuDisabled : true
			}, {
				dataIndex : 'jenis_belanja',
				header : 'Jenis Belanja',
				groupable : false,
				width : 100
			}, {
				dataIndex : 'jenis_surat',
				header : 'Jenis Surat',
				groupable : false,
				width : 100
			},{
				dataIndex : 'tanggal',
				header : 'Tanggal ',
				groupable : false,
				renderer : Ext.util.Format.dateRenderer('d/m/Y'),
				width : 75
			}
			]
		});


//dsAll.load({params:{start:0,limit:30}}); load datanya


var gridAll = new Ext.grid.GridPanel({
	title : 'Data Penduduk',
	border:true,
	margins:'2 2 0 2',
	region : 'center',
	iconCls : 'parent-form',
	// viewConfig:{forceFit:true}, //agar colom2 mengecil sendiri waktu diresize
	// windows
	ds : dsAll,
	cm : cmAll,
	view : new Ext.grid.GroupingView({
		forceFit : false,
		groupTextTpl : 'Jenis Belanja : {[values.rs[0].data.jenis_belanja]} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})',
		showGroupName : false,
		enableNoGroups : false, // REQUIRED!
		hideGroupedColumn : false
	}),
	stripeRows : true,
	enableColLock : false,
	loadMask : true
});

