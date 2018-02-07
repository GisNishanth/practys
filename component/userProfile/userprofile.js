/*********************************************************************
 *
 *  Great Innovus Solutions Private Limited
 *
 *  Module      :   practysApp 
 *
 *  Description :   user profile controller 
 *
 *  Date        :   24/10/2016
 *
 *  Version     :   1.0
 *
 **********************************************************************/
 (function(){
    angular
        .module('practysApp')
        .controller('userProfileController',userProfileController);
        userProfileController.$inject = ['$scope','$state','$timeout','__env','Upload','utilService','toastr','ngDialog','profileService','AuthenticationService','$rootScope','$window'];

        function userProfileController($scope,$state,$timeout,__env,Upload,utilService,toastr,ngDialog,profileService,AuthenticationService,$rootScope,$window){
            var vm                       =   this;
            var url                      =   __env.apiUrl; 
            vm.data                      =   [];
            vm.data.userDetails          =   [];
            vm.data.tempData             =   utilService.getItem('user');
            vm.data.userDetails          =   utilService.RestoreStateObj(vm.data.tempData);
            vm.data.origData             =   {};
            vm.data.origData.id          =   vm.data.userDetails.id;
            vm.data.origData.firstName   =   vm.data.userDetails.firstName;
            vm.data.origData.email       =   vm.data.userDetails.email;
            vm.data.origData.mobile      =   vm.data.userDetails.mobile;
            vm.data.origData.address     =   vm.data.userDetails.address;
            vm.data.userImage            =   {};
            vm.data.userImage.url        =   'assets/img/profile-img.png';
            vm.update                    =   update;
            vm.passwordUpdated           =   passwordUpdated;
            vm.onPageLoad                =   onPageLoad;
            vm.userDetailsInfo           =   {};
           
        // $scope.fileReaderSupported = window.FileReader != null;
        // $scope.photoChanged = function(files){
        //     $scope.file = files[0];
        //     if (files != null) {
        //         var file = files[0];
        //     if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
        //         $timeout(function() {
        //             var fileReader = new FileReader();
        //             fileReader.readAsDataURL(file);
        //             fileReader.onload = function(e) {
        //                 $timeout(function(){
        //                     $scope.thumbnail_url = e.target.result;
        //                     $scope.data = file;
        //                     vm.update(vm.data.userDetails,$scope.file)
        //                 });
        //             }
        //         });
                
        //     }
        // }
        // }; 
        $scope.thumbnail = {
            dataUrl: 'adsfas'
        };

        $scope.fileReaderSupported = window.FileReader != null;
        $scope.photoChanged = function(files){
            if (files != null) {
                var file = files[0];
            if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
                $timeout(function() {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = function(e) {
                        $timeout(function(){
                            $scope.thumbnail.dataUrl = e.target.result;
                            $scope.data = file;
                        });
                    }
                });
            }
        }
        };

         function update(userDetails,image){
            vm.userDetailsInfo.id               =   userDetails.id;
            vm.userDetailsInfo.firstName        =   userDetails.firstName;
            vm.userDetailsInfo.email            =   userDetails.email;
            vm.userDetailsInfo.mobile           =   parseInt(userDetails.mobile);
            vm.userDetailsInfo.address          =   userDetails.address;
            vm.userDetailsInfo.specialityId     =   '';
            vm.userDetailsInfo.gender           =   vm.data.userDetails.gender;
            vm.userDetailsInfo.type             =   'website';

            var data=JSON.stringify(vm.userDetailsInfo);
            if(image){
                Upload.upload({
                    url: url+'doctors/update',
                    data: {image: image,imageName:image.name,id: vm.userDetailsInfo.id,firstName: vm.userDetailsInfo.firstName,mobile:vm.userDetailsInfo.mobile,email:vm.userDetailsInfo.email,specialityId:vm.userDetailsInfo.specialityId,gender:vm.userDetailsInfo.gender,address:vm.userDetailsInfo.address,type:'website',user_level:userDetails.user_level}
                }).then(function(response){
                    if(response.data.data.status == 'success'){
                        toastr.success("Details Updated Successfully");
                        // vm.data.imageUrl = "http://demo.greatinnovus.com/practysServerApp/files/userimages/original/";
                        // vm.data.imageName = response.config.data.imageName;
                         vm.onPageLoad();
                      }else{
                        toastr.error("Unable to Update Your Details");
                      }
                });
            }
            else{
               profileService.update(vm.userDetailsInfo).then(function(response){
                if(response.data.data.status == 'success'){
                toastr.success("Details Updated Successfully");
                vm.onPageLoad();
              }else{
                toastr.error("Unable to Update Your Details");
              }
            }); 
            }
            
         };

         function passwordUpdated(obj){
            if(obj){
                if((obj.newPassword.length + 1) <= 5){
                    toastr.error("Atleast 5 Character");
                    return false;
                }else{
                  var data             = {};
                  data.id              = vm.data.userDetails.id;
                  data.oldPassword     = obj.oldPassword;
                  data.newPassword     = obj.newPassword;
                  if(data.newPassword == obj.confirmPassword){
                        profileService.passwordUpdate(data).then(function(response){
                         if(response.data.data.status == 'error'){
                              toastr.error("Current Password Incorrect");
                            }else if(response.data.data.status == 'success'){
                            toastr.success("Password Updated Successfully");
                            $window.location.reload();
                        }
                    });  
                  }else{
                    toastr.error("Password doesn't Match");
                  }
                }
            }
         }

         function onPageLoad(){
                profileService.updatedValues(vm.data.userDetails.id).then(function(response){
                    vm.data.userDetails     =   response.data.data.message[0];
                    vm.data.userDetails.mobile = parseInt(response.data.data.message[0].mobile);
                    $scope.thumbnail.dataUrl =  response.data.data.message[0].origImage + response.data.data.message[0].image;
                    var token = utilService.getItem('token');
                    AuthenticationService.SetCredentials(vm.data.userDetails.email,vm.data.userDetails.password,token,vm.data.userDetails);
                    $rootScope.userName      = utilService.RestoreStateObj(utilService.getItem('user'));
                });
         }
          vm.onPageLoad();

        };

 })();