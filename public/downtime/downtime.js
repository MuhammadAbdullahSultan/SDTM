/*global angular*/
var app = angular.module('downtime', ['ngRoute', 'firebase', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/downtime', {
        templateUrl: 'downtime/downtime.html',
        controller: 'downtimeCtrl'
    })
}]);

app.controller('downtimeCtrl', ['$scope', '$firebaseObject', '$firebaseArray', 'toaster', function ($scope, $firebaseObject, $firebaseArray, toaster) {
    'use strict';
    
    $scope.notEmptyOrNull = function(item){
  return !(item.name_fr === null || item.name_fr.trim().length === 0)
}
    
    $scope.onEquipmentChange = function(item){
   // once user is selected equipment, we take 1st key from second list
    var key =  Object.keys($scope.add[$scope.currentEquipment].$id)[0]

    $scope.currentSystem = $scope.add[$scope.currentEquipment].system;   
  }
     $scope.allEquipments = [];
     $scope.allSystems = [];
     $scope.allDT = [];
    
    $scope.manageDowntime = function () {
        
        var doesExist = false;
        angular.forEach ($scope.data , function (d) {
        angular.forEach (d.equipments, function (e) {
        })
    });
        
        if($scope.addEquipment === null) {
            toaster.pop({type: 'warning', title: "Equipment Field Empty", body: "Please select an equipment from the dropdown"});
        } else if ($scope.type === null) {
            toaster.pop({type: 'warning', title: "Type not selected", body: "Please select the type of maintenance"});
        } else if ($scope.startDT === undefined) {
            toaster.pop({type: 'warning', title: "Start Time Empty", body: "Please enter a start time"});
        } else if ($scope.endDT === undefined) {
            toaster.pop({type: 'warning', title: "End Time Empty", body: "Please enter an end time"});
        } else {
            firebase.database().ref('downtime/' + $scope.addEquipment).push({
            equipment: $scope.addEquipment,
            type : $scope.type,
            start: $scope.startDT,
            end: $scope.endDT
            });
            toaster.pop({type: 'Success', title: "Downtime Added", body: "A new downtime was added"});
        }
        
        
    };
    
        var ref = firebase.database().ref();
        var data = ref.child("AllEquipments");
        var list = $firebaseArray(data);
        
        // for adding
        list.$loaded().then(function(data) {
                $scope.add = data;
                
//                angular.forEach ($scope.add , function (d) {
//
//                  $scope.allSystems.push(d.$id);  
//                    console.log(d.equipments);
//                    angular.forEach (d.equipments, function (e) {
//                        $scope.allEquipments.push(e.equipment);
//                        console.log(e.system);
//                    })
//                });
            }).catch(function(error) {
                $scope.error = error;
            });
         // for searching
        list.$loaded().then(function(data) {
            $scope.data = data;
            angular.forEach ($scope.data , function (d) {
                
              $scope.allSystems.push(d.$id);  
                
                angular.forEach (d.equipments, function (e) {
                    $scope.allEquipments.push(e.equipment);
                })
            });
        }).catch(function(error) {
            $scope.error = error;
        });
    
    //FOR DOWN TIME RETRIEVE
    
        var newref = firebase.database().ref();
        var dtdata = newref.child("downtime");
        var dtlist = $firebaseArray(dtdata);
    
        dtlist.$loaded().then(function(dtdata) {
                $scope.dtdata = dtdata;
                angular.forEach ($scope.dtdata , function (d) {
                    angular.forEach (d , function (e) {
                    $scope.allDT.push(e);
                    
                })
                });
                
            }).catch(function(error) {
                $scope.error = error;
            });
            

    
    $(document).ready(function () {
    

        $('#datetimepicker1').datetimepicker({
            viewMode: 'years',
            format: 'DD/MM/YYYY hh:mm'
            
            
//            if ($scope.startDT > $.now()) 
//            {
//            toaster.pop({type: 'warning', title: "Start Time Empty", body: "Please enter a start time"});
//            }
//        }
        }); 
        
        $('#datetimepicker3').datetimepicker({
            viewMode: 'years',
            format: 'DD/MM/YYYY hh:mm'

        });
        
        $('#datetimepickerSearch').datetimepicker({
            viewMode: 'years',
            format: 'DD/MM/YYYY'

        });
        
        
        $("#datetimepicker1").on("dp.change", function() {

        $scope.startDT = $("#datetimepicker1").val();

    });
        
        $("#datetimepicker3").on("dp.change", function() {

        $scope.endDT = $("#datetimepicker3").val();

    });
        
        $("#datetimepickerSearch").on("dp.change", function() {

        $scope.start = $("#datetimepickerSearch").val();

    });
        
});
    
        $scope.totalItems = $scope.data.length;
      $scope.currentPage = 1;

      $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };

      $scope.pageChanged = function() {
        $log.log('Page changed to: ' + $scope.currentPage);
      };

      $scope.maxSize = 5;
      $scope.bigTotalItems = 175;
      $scope.bigCurrentPage = 1;
    

}]);

app.directive('customzdatetime', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            element.datetimepicker({
                debug: false,
                format: 'DD-MM-YYYY hh:mm'
            }).on('dp.change', function (e) {
                ngModelCtrl.$setViewValue(e.date);
                scope.$apply();
            });
        }
    };
});

