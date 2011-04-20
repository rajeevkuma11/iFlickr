var db,
    about,
    camera,
    flickr,
    session,
    settings,
    settingsToolbar,
    application,
    applicationToolbar,
    mainContainer;

session = null;
db = new JSBase();
db.connect('iFlickrDB');

flickr = new iFlickr();
flickr.init({
    api_key   : 'b40a536c14884b229f84da4cc07524bc',
    secret    : 'd4515700598ed31e',
    permission: 'write'
});

