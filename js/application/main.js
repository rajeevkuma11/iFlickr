Ext.setup({
    onReady: function() {
        applicationToolbar = new Ext.Toolbar({
            dock: 'top',
            xtype: 'toolbar',
            cls: 'header',
            defaults: {
                iconMask: true,
                ui: 'plain'
            },
            layout: {
                pack: 'right'
            },
            title:'Camera',
            items: [
                {
                    iconCls: 'settings x-icon-mask',
                    handler: function()
                    {
                        mainContainer.setCard(1);
                    }
                }
            ]
        });

        application = new Ext.TabPanel({
            animation: {
                type: 'slide',
                cover: true
            },
            tabBar: {
                dock: 'bottom',
                scroll: {
                    direction: 'horizontal',
                    scrollbars: false
                },
                layout: {
                    pack: 'center',
                    align: 'left'
                }
            },
            dockedItems: [applicationToolbar],
            items: [
                camera,
                about
            ],
            listeners: {
                cardswitch: function(cont, new_card, old_card, index, anim)
                {
                    applicationToolbar.setTitle(new_card.title);
                }
            }
        });

        mainContainer = new Ext.Panel({
            layout: 'card',
            fullscreen: true,
            animation: {
                type: 'fade',
                cover: true
            },
            listeners: {
                afterrender: function()
                {
                    db.executeQuery("CREATE TABLE IF NOT EXISTS settings (parameter varchar(8),contains text);", [], function(t, r){
                        db.executeQuery("SELECT contains FROM settings WHERE parameter = 'session';", [], function(t, r){
                            if (r.rows.length > 0)
                            {
                                session = r.rows.item(0).contains;
                                flickr.auth_checkToken(session, function(response){
                                    if (response.stat == 'ok')
                                        Ext.getCmp('take-photo').enable();
                                    else
                                        mainContainer.setCard(1);
                                });
                            }
                            else
                                mainContainer.setCard(1);
                        });
                    });
                }
            },
            items: [
                application,
                settings
            ]
        });
    }
});