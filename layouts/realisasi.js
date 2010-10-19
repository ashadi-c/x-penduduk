/** untuk menandakan bahwa script ini valid dan akan di eksekusi * */
valid_script = true;
ajax_url = 'ajax.handler.php?id=' + page;
Ext.chart.Chart.CHART_URL = 'extjs/resources/charts.swf';

var dsRs = new Ext.data.JsonStore({
	url: ajax_url,
	autoLoad:true,
	baseParams: {
		task: 'getChart',
		start:0,
		limit:1000000
	},
	root: 'data',
	fields: [
                {name:'tahun'},
                {name:'jumlah',type:'float'},
                {name:'realisasi',type:'float'}
	],
	  sortInfo: {field: 'tahun', direction: 'ASC'},
	  remoteSort: true,
	  listeners: {
	  	load: function(){
	  		rDsData.refreshData();
	  	}
	  }
 }); 
 
 var rDsData = new Ext.data.JsonStore({
 	fields: ['tahun','jumlah','realisasi'],
 	data : [],
 	refreshData: function(){
 		var data =[];
 		dsRs.each(function(r,i){
 			data.push({
 				tahun: r.data.tahun,
 				jumlah : Math.floor(r.data.jumlah),
                                realisasi : Math.floor(r.data.realisasi)
 			});
 		});
 		rDsData.loadData(data);
 	}
 });

the_first = {
	title:'Statistik Realiasi',
	iconCls:'stat-line2',
	layout:'fit',
	border:false,
	bbar: [{
		text:'Refresh',
		iconCls:'drop',
		qtip:'Refresh Data',
		handler:function(){
			dsRs.reload();
		}
	}],
    items: {
            xtype: 'stackedbarchart',
            store: rDsData,
            yField: 'tahun',
            xAxis: new Ext.chart.NumericAxis({
                stackingEnabled: true,
                labelRenderer: function (val){
                    return Ext.util.Format.number(val,'0.000/i')
                }
            }),
            series: [{
                xField: 'jumlah',
                displayName: 'Jumlah',
                style:{
                    color : 0x393DFF
                }
            },{
                xField: 'realisasi',
                displayName: 'Realisasi',
                style:{
                    color : 0xFF0000
                }
            }]
        }
};

the_content = {
	border:true,
	layout:'accordion',
	activeItem:0,
	items:[the_first]
};

var main_content = {
	id : 'main_content',
	iconCls:'stat-line',
	title:'Statistik Kematian',
	layout:'fit',
	bodyStyle:'padding:5px;',
	items:[the_content]
};
