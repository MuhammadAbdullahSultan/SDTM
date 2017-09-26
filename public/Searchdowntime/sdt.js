/*global angular*/
var app = angular.module('sdt', ['ngRoute', 'firebase']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/sdt', {
        templateUrl: 'searchdowntime/sdt.html',
        controller: 'sdtCtrl'
    });
}]);

app.controller('sdtCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function ($scope, $firebaseObject, $firebaseArray) {
    'use strict';
    
    
    
    $(document).ready(function () {
    

        $('#datetimepicker2').datetimepicker({
            viewMode: 'years'
        }); 
        
        $('#datetimepicker10').datetimepicker({
                viewMode: 'years',
                format: 'MM/YYYY'
            });
        
        $('#datetimepicker11').datetimepicker({
                viewMode: 'years',
                format: 'YYYY'
            });
        
        $("#datetimepicker11").on("dp.change", function() {

        $scope.yearFilter = $("#datetimepicker11").val();

    });
        
        $("#datetimepicker10").on("dp.change", function() {

        $scope.monthFilter = $("#datetimepicker10").val();

    });
        
        $("#datetimepicker2").on("dp.change", function() {

        $scope.dateFilter = $("#datetimepicker2").val();

    });
});
      
}]);