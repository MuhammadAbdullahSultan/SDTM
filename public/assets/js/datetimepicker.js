var app=angular.module('datetimepicker', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
app.controller('DatepickerPopupDemoCtrl', function ($scope, uibDateParser) {
    $scope.startDT = 'dd/MM/yyyy HH:mm';
    $scope.endDT = 'dd/MM/yyyy HH:mm';
    $scope.yearFilter = 'yyyy';
    $scope.monthFilter = 'MM/yyyy';
    $scope.dateFilter = 'dd/MM/yyyy';

    $scope.date = new Date();
    
  $scope.today = function() {
    $scope.startDT = new Date();
    $scope.endDT = new Date();
    $scope.yearFilter = new Date();
    $scope.monthFilter = new Date();
    $scope.dateFilter = new Date();
  };
    
  $scope.today();

  $scope.clear = function() {
    $scope.startDT = null;
    $scope.endDT = null;
    $scope.yearFilter = null;
    $scope.monthFilter = null;
    $scope.dateFilter = null;

  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    formatYear: 'yyyy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
    mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };
    
    $scope.open3 = function() {
    $scope.popup3.opened = true;
  };
    
    $scope.open4 = function() {
    $scope.popup4.opened = true;
  };
    
    $scope.open5 = function() {
    $scope.popup5.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.startDT = new Date(year, month, day);
    $scope.endDT = new Date(year, month, day);
    $scope.yearFilter = new Date(year);
    $scope.monthFilter = new Date(year, month);
    $scope.dateFilter = new Date(year, month, day);

  };

  $scope.formats = ['dd/MM/yyyy HH:mm', 'yyyy', 'MM/yyyy', 'dd/MM/yyyy' ];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['d!/M!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };
    
  $scope.popup3 = {
    opened: false
  };
    
    $scope.popup4 = {
    opened: false
  };
    
    $scope.popup5 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
});