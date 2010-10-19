/** untuk menandakan bahwa script ini valid dan akan di eksekusi * */
valid_script = true;
ajax_url = 'ajax.handler.php?id=' + page;
Ext.chart.Chart.CHART_URL = 'extjs/resources/charts.swf';

/*
 * Chart Grouping By Gender 
 */
 var dsGender = new Ext.data.JsonStore({
	url: ajax_url,
	totalProperty: 'total',
	autoLoad:true,
	baseParams: {
		task: 'getChartGender',
		start:0,
		limit:10000
	},
	root: 'data',
	fields: [
		{
			name:'gender',
			type:'string'
		},
		{
			name:'total',
			type:'int'
		}
	
	],
	  sortInfo: {field: 'gender', direction: 'ASC'},
	  remoteSort: true
 }); 

var chartGender ={
	title:'Berdasarkan Jenis Kelamin',
	iconCls:'stat-pie',
	draggable:false,
	collapsible:false,
	layout:'fit',
	height:240,
    items: {
        store: dsGender,
        xtype: 'piechart',
        dataField: 'total',
        categoryField: 'gender',
        extraStyle:
        {
            legend:
            {
                display: 'bottom',
                padding: 5,
                font:
                {
                    family: 'Tahoma',
                    size: 11
                }
            }
        }
    }	
};

var dsWeight = new Ext.data.JsonStore({
	url: ajax_url,
	totalProperty: 'total',
	autoLoad:true,
	baseParams: {
		task: 'getChartWeight',
		start:0,
		limit:10000
	},
	root: 'data',
	fields: [
		{
			name:'berat',
			type:'string'
		},
		{
			name:'total',
			type:'float'
		}
	
	],
	  sortInfo: {field: 'berat', direction: 'ASC'},
	  remoteSort: true
 }); 

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
			name:'tgl_lahir',
			type:'date',
			dateFormat:'m-Y'
		},
		{
			name:'total',
			type:'int'
		}
	
	],
	  sortInfo: {field: 'tgl_lahir', direction: 'ASC'},
	  remoteSort: true,
	  listeners: {
	  	load: function(){
	  		rDsData.refreshData();
	  	}
	  }
 }); 
 
 var rDsData = new Ext.data.JsonStore({
 	fields: ['tgl_lahir','total'],
 	data : [],
 	refreshData: function(){
 		var data =[];
 		dsDate.each(function(r,i){
 			data.push({
 				tgl_lahir : r.data.tgl_lahir.format('M Y'),
 				total : Math.floor(r.data.total)
 			});
 		});
 		rDsData.loadData(data);
 	}
 });
 
var chartWeight ={
	title:'Berdasarkan Berat (Kg)',
	iconCls:'stat-pie',
	collapsible:false,	
	draggable:false,
	layout:'fit',
	height:240,
    items: {
        store: dsWeight,
        xtype: 'piechart',
        dataField: 'total',
        categoryField: 'berat'/*,
        extraStyle:
        {
            legend:
            {
                display: 'right',
                padding: 30,
                font:
                {
                    family: 'Tahoma',
                    size: 9
                }
            }
        }
*/    }	
};

the_center = {
	region:'center',
	title:'Statistik Kelahiran Berdasarkan Tahun (Per Bulan)',
	iconCls:'stat-line2',
	layout:'fit',
	tools: [{
		id:'refresh',
		qtip:'Refresh Data',
		handler:function(){
			dsDate.reload();
		}
	}],
    items: {
        xtype: 'linechart',
        store: rDsData,
        //url: 'extjs/resources/charts.swf',
        xField: 'tgl_lahir',
        yField: 'total',
        yAxis: new Ext.chart.NumericAxis({
            displayName: 'Angka Kelahiran',
            labelRenderer : Ext.util.Format.numberRenderer()
        }),
        tipRenderer : function(chart, record){
            return record.data.total + ' Kelahiran Pada ' + record.data.tgl_lahir;
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
the_portal = {
	region:'south',
	collapsible:true,
	margins:'2 0 0 0',
	cmargins:'2 0 0 0',
	height:290,
	xtype:'portal',
	items:[
	{
		columnWidth: .50,
		style:'padding:5px 0 5px 5px',
		items:[chartGender]
	},
	{
		columnWidth: .50,
		style:'padding:5px 5px 5px 5px',
		items:[chartWeight]
	}
	
	]
}; 
the_content = {
	border:false,
	layout:'border',
	items:[the_center,the_portal]
};

var main_content = {
	id : 'main_content',
	iconCls:'stat-line',
	title:'Statistik Kelahiran',
	layout:'fit',
	bodyStyle:'padding:5px;',
	items:[the_content]
};
