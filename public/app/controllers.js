/**
 * Created by Jaypax on 1/30/2015.
 */
/** Controllers only **/

angular.module("DormmetitaApp").controller("MainCtrl", MainCtrl);

function MainCtrl($scope, uiGmapGoogleMapApi){
    var self = this;

    var map;

    self.mapData = {
        center: {
            latitude: 45,
            longitude: -73
        },
        zoom: 8,
        bounds: {}
    };

    self.mapOptions = {
        scrollWheel: false
    };

    var createRandomMarker = function(i, bounds, idKey) {
        var lat_min = bounds.southwest.latitude,
            lat_range = bounds.northeast.latitude - lat_min,
            long_min = bounds.southwest.longitude,
            long_range = bounds.northeast.longitude - long_min;

        if (idKey == null) {
            idKey = "id";
        }

        var latitude = lat_min + (Math.random() * lat_range);
        var longitude = long_min + (Math.random() * long_range);
        var ret = {
            latitude: latitude,
            longitude: longitude,
            title: 'm' + i
        };
        ret[idKey] = i;
        return ret;
    }

    self.randomMarkers = [];

    $scope.$watch(function() {
        return self.mapData.bounds;
    }, function(nv, ov) {
        if (!ov.southwest && nv.southwest) {
            var markers = [];
            for (var i = 0; i < 10; i++) {
                markers.push(createRandomMarker(i, self.mapData.bounds));
            }
            self.randomMarkers = markers;
        }
    }, true);
    

    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function(maps) {
        map = maps;
    });
}
