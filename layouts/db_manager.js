/** untuk menandakan bahwa script ini valid dan akan di eksekusi * */
valid_script = true;

var main_content = {
	id : 'main_content',
	layout : 'fit',
	title : 'Database Manager',
	iconCls : 'db-refresh',
	border : true,
	bodyStyle : 'padding:5px',
	frame : false,
	items : [
		{
			id:'db-panel',
			title:'',
			xtype:'iframepanel',
			border:false,
			frame:false
		}	
	
	],
	listeners : {
		render : function() {
			treePanel.disable();
    		src = 'db-manager/';
    		iframe = Ext.getCmp('db-panel'); 
    		iframe.setSrc.defer(350, iframe, [src, true]);
			
		},
		destroy : function() {
			treePanel.enable();
			treePanel.getRootNode().reload();
			pageAdmin=""; 
		}
	},
	tools : [{
		id : 'close',
		qtip : 'Close Menu Manager',
		handler : function() {
			Ext.getCmp('content-panel')
					.remove(Ext.getCmp('content-panel').layout.activeItem);
			Ext.getCmp('content-panel').add(start);
			Ext.getCmp('content-panel').layout.setActiveItem('start-panel');
		}
	}]
};