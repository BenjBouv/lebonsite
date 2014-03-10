angular.module('apparts', [])
       .controller('AppartsCtrl', function($scope, $http) {

    $http({method:'GET', url:API_SOURCE})
      .success(function(data, status, headers) {
          var apparts = [];
          var raw = data.aaData;
          for (var i = 0; i < raw.length; ++i) {
              var a = raw[i];
              var k = 0;

              var current = {
                  id: a[k++],
                  url: a[k++],
                  title: a[k++],
                  photo: a[k++],
                  rate: parseInt(a[k++]),
                  city: a[k++],
                  postal: parseInt(a[k++]),
                  rooms: parseInt(a[k++]),
                  withFurnitures: a[k++],
                  surface: parseInt(a[k++]),
                  date: a[k++],
                  source: a[k++]
              };

              current.sqRate = ((100 * (current.rate / current.surface)) | 0) / 100;

              apparts.push(current);
          }

          apparts.sort(function(a,b) { return a.sqRate > b.sqRate });
          var l = apparts.length;
          var m = apparts[l / 2 | 0].sqRate,        // median
              q1 = apparts[l / 4 | 0].sqRate,       // first quartile
              q3 = apparts[3 * l / 4 | 0].sqRate;   // last quartile

          for (var i = 0; i < l; ++i) {
              var sqr = apparts[i].sqRate;
              apparts[i].style = {
                  "background-color": (sqr <= q1) ? '#AFA' : (sqr <= m) ? '#FF7' : (sqr <= q3) ? '#FC4' : '#F42'
              }
          }

          $scope.apparts = apparts;
      })
      .error(function(data, status, headers) {
          alert('error ' + status + ' when retrieving apparts: ' + data);
      });
});
