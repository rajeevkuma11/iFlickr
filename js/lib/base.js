function JSBase() {
this.connection = null;

/*
* @name Connect
* @param database Which database do you want to connect?
* @return Boolean
* This method connects an existed database or creates new one by the given name.
*/
this.connect = function(database) {
        try {
            if (window.openDatabase) {
                this.connection = openDatabase(database, '1.0', null, 200000);
                return true;
            } else return false;
        } catch(e) {return false;}
}

/*
* @name IsConnected
* @return Boolean
* This method checks connection status.
*/
this.isConnected = function(){
    return (typeof this.connection == 'object' ? true : false);
}


    /*
* @name ExecuteQuery
* @param query This is the query string which is gonna run on SQLite.
* @param params This is the query parameters to build your query string with values if necessary.
* @param success This is the function which will be called if execution returns success.
* @param fail This is the function which will be called if execution fails.
* @return Boolean
* This method executes an SQL statement.
*/
    this.executeQuery = function(query, params, success, fail) {
        if (!this.isConnected())
            return false;

        this.connection.transaction(function(t) {
            t.executeSql(query, params || [], success || function(){}, fail || function(){});
        });

        return true;
    }
}