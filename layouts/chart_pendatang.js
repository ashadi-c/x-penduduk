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
			name:'tgl_datang',
			type:'date',
			dateFormat:'m-Y'
		},
		{
			name:'total',
			type:'int'
		}
	
	],
	  sortInfo: {field: 'tgl_datang', direction: 'ASC'},
	  remoteSort: true,
	  listeners: {
	  	load: function(){
	  		rDsData.refreshData();
	  	}
	  }
 }); 
 
 var rDsData = new Ext.data.JsonStore({
 	fields: ['tgl_datang','total'],
 	data : [],
 	refreshData: function(){
 		var data =[];
 		dsDate.each(function(r,i){
 			data.push({
 				tgl_datang : r.data.tgl_datang.format('M Y'),
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
			name:'tgl_datang',
			type:'string'
		},
		{
			name:'total',
			type:'int'
		}
	
	],
	  sortInfo: {field: 'tgl_datang', direction: 'ASC'},
	  remoteSort: true,
	  listeners: {
	  	load: function(){
	  		dsYear2.refreshData();
	  	}
	  }
 }); 
 
 var dsYear2 = new Ext.data.JsonStore({
 	fields: ['tgl_datang','total'],
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
	title:'Statistik Pendatang Berdasarkan Tahun (Per Bulan)',
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
        xField: 'tgl_datang',
        yField: 'total',
        yAxis: new Ext.chart.NumericAxis({
            displayName: 'Jumlah Per Bulan',
            labelRenderer : Ext.util.Format.numberRenderer()
        }),
        tipRenderer : function(chart, record){
            return record.data.total + ' Pendatang Pada ' + record.data.tgl_datang;
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
	title:'Statistik Pendatang Berdasarkan Tahun',
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
            xField: 'tgl_datang',
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
	title:'Statistik Pendatang',
	layout:'fit',
	bodyStyle:'padding:5px;',
	items:[the_content]
};
