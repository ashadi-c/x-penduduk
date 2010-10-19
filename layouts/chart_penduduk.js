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
	layout:'fit',
	height:260,
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

 var dsAge = new Ext.data.JsonStore({
	url: ajax_url,
	totalProperty: 'total',
	autoLoad:true,
	baseParams: {
		task: 'getChartAge',
		start:0,
		limit:10000
	},
	root: 'data',
	fields: [
		{
			name:'age',
			type:'string'
		},
		{
			name:'total',
			type:'int'
		}
	
	],
	  sortInfo: {field: 'age', direction: 'ASC'},
	  remoteSort: true
 }); 

var chartAge ={
	title:'Berdasarkan Umur (Tahun)',
	iconCls:'stat-pie',
	draggable:false,
	layout:'fit',
	height:260,
    items: {
        store: dsAge,
        xtype: 'piechart',
        dataField: 'total',
        categoryField: 'age'/*,
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
        }*/
    }	
};
var dsEducation = new Ext.data.JsonStore({
	url: ajax_url,
	totalProperty: 'total',
	autoLoad:true,
	baseParams: {
		task: 'getChartEducation',
		start:0,
		limit:10000
	},
	root: 'data',
	fields: [
		{
			name:'pendidikan',
			type:'string'
		},
		{
			name:'total',
			type:'int'
		}
	
	],
	  sortInfo: {field: 'pendidikan', direction: 'ASC'},
	  remoteSort: true
 }); 

var chartEducation ={
	title:'Berdasarkan Pendidikan',
	iconCls:'stat-pie',
	draggable:false,
	layout:'fit',
	height:260,
    items: {
        store: dsEducation,
        xtype: 'piechart',
        dataField: 'total',
        categoryField: 'pendidikan',
        extraStyle:
        {
            legend:
            {
                display: 'right',
                padding: 30,
                font:
                {
                    family: 'Tahoma',
                    size: 10
                }
            }
        }
    }	
};

var dsReligion = new Ext.data.JsonStore({
	url: ajax_url,
	totalProperty: 'total',
	autoLoad:true,
	baseParams: {
		task: 'getChartReligion',
		start:0,
		limit:10000
	},
	root: 'data',
	fields: [
		{
			name:'agama',
			type:'string'
		},
		{
			name:'total',
			type:'int'
		}
	
	],
	  sortInfo: {field: 'agama', direction: 'ASC'},
	  remoteSort: true
 }); 

var chartReligion ={
	title:'Berdasarkan Agama',
	iconCls:'stat-pie',
	draggable:false,
	layout:'fit',
	height:260,
    items: {
        store: dsReligion,
        xtype: 'piechart',
        dataField: 'total',
        categoryField: 'agama',
        extraStyle:
        {
            legend:
            {
                display: 'right',
                padding: 30,
                font:
                {
                    family: 'Tahoma',
                    size: 10
                }
            }
        }
    }	
};

var main_content = {
	id : 'main_content',
	iconCls:'stat-pie',
	title:'Statistik Penduduk',
	xtype:'portal',
	items:[
	{
		columnWidth: .50,
		style:'padding:10px 0 10px 10px',
		items:[chartGender,chartEducation]
	},
	{
		columnWidth: .50,
		style:'padding:10px 10px 10px 10px',
		items:[chartAge,chartReligion]
	}
	
	]
};
