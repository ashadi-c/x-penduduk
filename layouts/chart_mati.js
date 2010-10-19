/** untuk menandakan bahwa script ini valid dan akan di eksekusi * */
valid_script = true;
ajax_url = 'ajax.handler.php?id=' + page;
Ext.chart.Chart.CHART_URL = 'extjs/resources/charts.swf';

var dsDate = new Ext.data.JsonStore({
	url: ajax_url,
	autoLoad:true,
	baseParams: {
		task: 'getChartDate',
		start:0,
		limit:100000
	},
	root: 'data',
	fields: [
		{
			name:'tanggal_kematian',
			type:'date',
			dateFormat:'m-Y'
		},
		{
			name:'total',
			type:'int'
		}
	
	],
	  sortInfo: {field: 'tanggal_kematian', direction: 'ASC'},
	  remoteSort: true,
	  listeners: {
	  	load: function(){
	  		rDsData.refreshData();
	  	}
	  }
 }); 
 
 var rDsData = new Ext.data.JsonStore({
 	fields: ['tanggal_kematian','total'],
 	data : [],
 	refreshData: function(){
 		var data =[];
 		dsDate.each(function(r,i){
 			data.push({
 				tanggal_kematian : r.data.tanggal_kematian.format('M Y'),
 				total : Math.floor(r.data.total)
 			});
 		});
 		rDsData.loadData(data);
 	}
 });

var dsYear = new Ext.data.JsonStore({
	url: ajax_url,
	autoLoad:true,
	baseParams: {
		task: 'getChartYear',
		start:0,
		limit:100000
	},
	root: 'data',
	fields: [
		{
			name:'tanggal_kematian',
			type:'string'
		},
		{
			name:'total',
			type:'int'
		}
	
	],
	  sortInfo: {field: 'tanggal_kematian', direction: 'ASC'},
	  remoteSort: true,
	  listeners: {
	  	load: function(){
	  		dsYear2.refreshData();
	  	}
	  }
 }); 
 
 var dsYear2 = new Ext.data.JsonStore({
 	fields: ['tanggal_kematian','total'],
 	data : [],
 	refreshData: function(){
 		var data =[];
 		dsYear.each(function(r,i){
 			data.push(r.data)
 		});
 		dsYear2.loadData(data);
 	}
 });

the_first = {
	title:'Statistik Berdasarkan Tahun (Per Bulan)',
	iconCls:'stat-line2',
	layout:'fit',
	border:false,
	bbar: [{
		text:'Refresh',
		iconCls:'drop',
		qtip:'Refresh Data',
		handler:function(){
			dsDate.reload();
		}
	}],
    items: {
        xtype: 'linechart',
        store: rDsData,
        //url: 'extjs/resources/charts.swf',
        xField: 'tanggal_kematian',
        yField: 'total',
        yAxis: new Ext.chart.NumericAxis({
            displayName: 'Jumlah Per Bulan',
            labelRenderer : Ext.util.Format.numberRenderer()
        }),
        tipRenderer : function(chart, record){
            return record.data.total + ' Kematian Pada ' + record.data.tanggal_kematian;
        },
        extraStyle: {
           xAxis: {
                labelRotation: -90,
                font: {
                	size:6
                }
                
            }
        }        
    }	
};

the_second = {
	title:'Statistik Tahun',
	iconCls:'stat',
	layout:'fit',
	border:false,
	bbar: [{
		text:'Refresh',
		iconCls:'drop',
		qtip:'Refresh Data',
		handler:function(){
			dsYear.reload();
		}
	}],
	items:{
            xtype: 'columnchart',
            store: dsYear2,
            yField: 'total',
            xField: 'tanggal_kematian',
            xAxis: new Ext.chart.CategoryAxis({
                title: 'Tahun'
            }),
            yAxis: new Ext.chart.NumericAxis({
                title: 'Jumlah'
            })
        }
};

the_content = {
	border:true,
	layout:'accordion',
	activeItem:0,
	items:[the_first,the_second]
};

var main_content = {
	id : 'main_content',
	iconCls:'stat-line',
	title:'Statistik Kematian',
	layout:'fit',
	bodyStyle:'padding:5px;',
	items:[the_content]
};
