'use strict';

angular.module('myAppApp')
  .controller('FormCreateCtrl', function ($scope) {
    $scope.message = 'Hello';
    $scope.questions=[];
    $scope.options = [{name:"text"},{name:"radio"},{name:"hidden"},{name:"date"}];

    $scope.submitForm = function (form) {
    	//validation
    	//send form
        $http.post('/api/forms/',{name:$scope.name,questions:form}).success(function (response){
            console.log(response);
        });
    }
    $scope.addQuestion = function(form) {
        console.log(form);
        var newquestion = {
            data:form.data,
            type:form.type.name
        };
        console.log(newquestion);
        $scope.questions.push(newquestion);
    }
  })
  .directive('contentItem', function ($compile,$http) {
    var textTemplate = '<label>{{content.data}}</label><input type="text" class="form-control">';
    var radioTemplate ='<label>{{content.data}}</label><input type="radio">';
    var dateTemplate ='<label>{{content.data}}</label><input type="date">';
    var getTemplate = function(contentType) {
        var template = '';

        switch(contentType) {
            case "radio":
                template = radioTemplate;
                break;
            case "text":
                template = textTemplate;
                break;
            case "date":
                template = dateTemplate;
                break;
        }
        
        return template;
    }

    var linker = function(scope, element, attrs) {

        element.html(getTemplate(scope.content.type)).show();

        $compile(element.contents())(scope);
    }

    return {
        restrict: "E",
        link: linker,
        scope: {
            content:'='
        }
    };
});
