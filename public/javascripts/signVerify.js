app.controller('signVerify', ['$scope', '$http', function ($scope, $http) {
  
  $scope.sign="";
  $scope.message="";
  $scope.verifyStatus="";

  $scope.signData = function (req, res) {

    console.log("calling signData method");

    console.log("Message:-"+$scope.message);
    console.log("sign:-"+$scope.sign);

    $http({
      method: 'POST',
      url: __appurl + "/sign",
      data: {"message":$scope.message},
      headers: { 'Content-Type': 'application/json' }
    }).then(function (success) {
      console.log("success" + JSON.stringify(success));
      $scope.sign=success.data.sign;
    }, function (error) {
      console.log("error" + JSON.stringify(error));
    });

  };

  $scope.verifyData = function (req, res) {
    console.log("calling verify Data method");
    console.log("Message:-"+$scope.message);
    console.log("sign:-"+$scope.sign);
    $http({
      method: 'POST',
      url: __appurl + "/verify",
      data: {"message":$scope.message,"sign":$scope.sign},
      headers: { 'Content-Type': 'application/json' }
    }).then(function (success) {
      console.log("success:" + JSON.stringify(success));
      console.log("success.data.response"+success.data.response);
      if(success.data.response==true)
      {
        $scope.verifyStatus="Matched";
      }
      else{
        $scope.verifyStatus="doesn't Match";
      }
    }, function (error) {
      console.log("error:" + error);
    });

  };

}]);