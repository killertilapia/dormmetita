/**
 * Created by Jaypax on 1/30/2015.
 */
/** main angularJS script **/
/** configs and inits should be placed here **/


angular.module("DormmetitaApp",['uiGmapgoogle-maps']);

angular.module("DormmetitaApp").config(initGmapApiProvider);

function initGmapApiProvider(uiGmapGoogleMapApiProvider){
    uiGmapGoogleMapApiProvider.configure({
        // key: 'api key',
        v: '3.17',
        libraries: 'weather, geometry, visualization'
    });
}