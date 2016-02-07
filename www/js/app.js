// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('myApp', ['ionic'])

myApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


myApp.config(function ($stateProvider,$urlRouterProvider) {

  $stateProvider.state('detalhes',{
    url:'/detalhes/:codigo',
    controller : 'detalhesController',
    templateUrl: 'partials/detalhes.html'
  });

  $stateProvider.state('lista',{
    url:'/lista',
    controller: 'myCtrl',
    templateUrl: 'partials/lista.html'
  });

  $urlRouterProvider.otherwise('/lista')

  var Teste = 0 ;
})


myApp.factory('myService', function($http) {
  var myService = {
    async: function() {
      // $http returns a promise, which has a then function, which also returns a promise

      var url = './produtos.json';

      if(ionic.Platform.isAndroid()){
        url = "/android_asset/www/produtos.json";
      }

      if(ionic.Platform.isIOS()){
        url = "produtos.json";
      }

      var promise = $http.get(url).then(function (response) {
        // The then function here is an opportunity to modify the response
        console.log('No serviço : '+ response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return myService;
});


myApp.controller('myCtrl', ['$http','$scope','myService', function($http,$scope,myService){

  $scope.processando = true ;
  myService.async().then(function(listaDeProdutos) {
    $scope.produtos = listaDeProdutos ;
    $scope.processando = false;
  });

}])


myApp.controller('detalhesController', function($scope,$http, $stateParams,myService,$scope) {

  $scope.processando = true ;
  $scope.CodigoDoProdutoAlfa = $stateParams.codigo ;

  myService.async().then(function(listaDeProdutos) {
    $scope.produtosDetalhe= listaDeProdutos ;
    console.log('Lista nos detalhes > '+ $scope.produtosDetalhe );
    $scope.processando = false ;

  });

});




myApp.controller('myCtrlbkp', ['$http','$scope', function($http,$scope){

  var url = './produtos.js';

  if(ionic.Platform.isAndroid()){
    url = "/android_asset/www/produtos.js";
  }

  if(ionic.Platform.isIOS()){
    url = "produtos.js";
  }

  console.log(url);

  $http.get(url).
    success(function (response) {

      $scope.produtos = response;

      console.log($scope.produtos);
    }).
    error(function (data, status, headers, config) {
      console.log('Erro ao ler os dados :' + status);
    });


}])
