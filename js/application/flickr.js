about = new Ext.Panel({
    title: 'About',
    iconCls: 'info',
    html: '<div id="about-title">About</div>'
            + '<div id="about-text">Take photos and put them into your Flickr account!</div>'
                + '<div id="about-text">If you are not logged in yet, please click the icon at the top of the application. Then start the authentication process.</div>'
});

camera = new Ext.Panel({
    title: 'Camera',
    iconCls: 'user',
    items: [{
        xtype: 'fieldset',
        padding: 10,
        defaults: {
            required: true,
            labelAlign: 'left',
            autoCapitalize : false,
            height: 50,
            margin: 50
        },
        items: [
            new Ext.Button({
                id: 'take-photo',
                ui: 'action',
                text: 'Take a Photo',
                disabled: true,
                handler: function()
                {
                    navigator.camera.getPicture(function(image){
                        flickr.upload(session, image);
                    }, function(msg){
                        alert('Error!');
                    }, { quality: 50 });
                }
            }),
        ]

    }]
});