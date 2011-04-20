settingsToolbar = new Ext.Toolbar({
    dock: 'top',
    xtype: 'toolbar',
    cls: 'header',
    defaults: {
        iconMask: true,
        ui: 'back'
    },
    layout: {
        pack: 'left'
    },
    title:'Settings',
    items: [
        {
            text: 'Back',
            handler: function()
            {
                mainContainer.setCard(0);
            }
        }
    ]
});

settings = new Ext.form.FormPanel({
    standardSubmit : false,
    scroll: 'vertical',
    dockedItems: [ settingsToolbar ],
    listeners: {
        beforeshow: function(){
            Ext.getCmp('authorization-begin').enable();
            Ext.getCmp('authorization-end').disable();
        }
    },
    items: [{
        xtype: 'fieldset',
        title: 'Authorization',
        defaults: {
            required: true,
            labelAlign: 'left',
            autoCapitalize : false,
            height: 50,
            margin: 30
        },
        items: [
            new Ext.Button({
                id: 'authorization-begin',
                ui: 'action',
                text: 'Start',
                handler: function(){
                    this.disable();
                    Ext.getCmp('authorization-end').enable();
                    flickr.authorize();
                }
            }),
            {hidden: true, html: '<div id="flickr-browser" class="display:none;"></div>'},
            new Ext.Button({
                id: 'authorization-end',
                ui: 'action',
                text: 'Complete',
                handler: function(){
                    db.executeQuery("SELECT contains FROM settings WHERE parameter = 'frob';", [], function(t, r){
                        if (r.rows.length > 0)
                            flickr.auth_getToken(r.rows.item(0).contains, function(response){
                                if (response.stat == 'ok')
                                {
                                    session = response.auth.token._content;
                                    Ext.getCmp('authorization-end').disable();
                                    Ext.getCmp('take-photo').enable();
                                    db.executeQuery("DELETE FROM settings WHERE parameter = 'session';", [], function(){
                                        db.executeQuery("INSERT INTO settings (parameter, contains) VALUES ('session', '" + session + "');", [], function(){
                                            mainContainer.setCard(0);
                                        });
                                    });
                                }
                                else
                                {
                                    alert("Access denied!\nPlease try again.");
                                    Ext.getCmp('authorization-begin').enable();
                                    Ext.getCmp('authorization-end').disable();
                                }
                            });
                        else
                            mainContainer.setCard(1);
                    });
                }
            }),
        ]

    }]
});
