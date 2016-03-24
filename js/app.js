angular.module('gMaps', [])
  .controller('MainController', MainController)
  .directive('map', Gmap);

function MainController() {
  this.mapCenter = { lat: 51.4802, lng: -0.0193 };
  this.places = [{
    name: "Buckingham Palace",
    position: { lat: 51.501364, lng: -0.14189 }
  },{
    name: "Emirates Stadium",
    position: { lat: 51.5548918, lng: -0.1106267 }
  }];
}

Gmap.$inject = ['$timeout'];
function Gmap($timeout) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=',
      markers: '='
    },
    link: function(scope, element, attr) {
      if(!scope.center) {
        throw new Error('You must include a center point for your google map!');
      }
      var map = new google.maps.Map(element[0], {
        center: scope.center,
        zoom: 10
      });

      if(scope.markers) {
        scope.markers.forEach(function(place) {
          new google.maps.Marker({
            position: place.position,
            map: map,
            animation: google.maps.Animation.DROP
          });
        });
      }
    }
  }
}