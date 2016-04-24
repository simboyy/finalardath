'use strict';

angular.module('shopnxApp')
  .controller('ProfileCtrl', function ($scope, socket,Users, Product, Category, Brand, Statistic,Feature, Modal, toastr, $loading, Settings) {
    var cols = [
      {heading:'sku',dataType:'text', sortType:'lowercase'},
      {heading:'name',dataType:'text', sortType:'lowercase'},
      {heading:'info',dataType:'text', sortType:'lowercase'}
    ];


   

    $scope.save = function(user){
      // if(Settings.demo){
      //   toastr.error('Save not allowed in demo mode');
      //   return;
      // }
      console.log(user);

      
      $scope.user = user;
     
     
      if('_id' in user){

        // delete product

          // User.delete({id:user._id},function(){
          //   console.log("user deleted");

          //     User.save($scope.user).$promise.then(function() {
          //      toastr.success("Profile info saved successfully","Success");
          // });
          // });


          Users.update({ id:user._id }, user).$promise.then(function(data) {
            console.log(data);
            toastr.success("Profile info saved successfully","Success");

          }, function(error) { // error handler
            console.log(error);
            var err = error.data.errors;
            toastr.error(err[Object.keys(err)].message,err[Object.keys(err)].name);
          });

          // regenerate product
        }
        else{
         // do nothing
        }

    };
    $scope.changeActive = function(b){ // success handler
      b.active = !b.active;
      Product.update({ id:b._id }, b).$promise.then(function() {

      }, function(error) { // error handler
          // console.log(error);
          toastr.error(error.statusText + ' (' +  error.status + ')');
          b.active = !b.active;
      });
    };

    

    $scope.profileDetail = function(user){
        if(user){ $scope.profile = user; }
        else{ $scope.profile = {}; }
    };

  });
