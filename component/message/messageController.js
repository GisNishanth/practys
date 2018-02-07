/*******************************************************************************
 * 
 * Great Innovus Solutions Private Limited
 * 
 * Module       : Message 
 * 
 * Description : Message contolller
 * 
 * Date    	   : 
 * 
 * Version    : 1.0
 * 
 ******************************************************************************/



(function(){
	'use strict';
	angular
		.module('practysApp')
		.controller('messagecontroller',messagecontroller);
		messagecontroller.$inject=['messageService','utilService','toastr','$scope','$timeout','ngDialog','Upload','__env','$interval','$state'];
		function messagecontroller(messageService,utilService,toastr,$scope,$timeout,ngDialog,Upload,__env,$interval,$state){
			var vm 					             = this;
			var url 				             = __env.apiUrl; 
      $scope.sample                = 0;
			vm.data         		         = [];
			vm.data.patientDetails	     = angular.fromJson(utilService.getItem('user'));
			vm.data.clinicDetails        = [];
			vm.data.messageDetails       = [];
			vm.data.flag                 = 0;
      vm.data.msg                  = '';
			vm.onPageLoad   		         = onPageLoad;
			vm.getPatientMessage         = getPatientMessage;
			vm.sendMessage               = sendMessage;
			vm.sendImage                 = sendImage;
			vm.openDefault               = openDefault;
			vm.download 			           = download;
      vm.updateCount               = updateCount;
      vm.getSenderDetails          = getSenderDetails;
      vm.getUpdatePatientMessage   = getUpdatePatientMessage;
      vm.changeDateFormat          = changeDateFormat;
      vm.instantMessage            = instantMessage;
      vm.interval;


			/*
				get all clinic for patient
			*/
			function onPageLoad(){ 
        var patientId    = vm.data.patientDetails.id;
				messageService.getClinicList(patientId).then(function(response){
					if(response.data.data.status == 'success'){
						vm.data.clinicDetails   =  response.data.data.message;
					}
          if(vm.data.clinicDetails.length == 0)
              toastr.error("No Clinic Found");
				});
			}

      /*
          get all message for patient
      */
			function getPatientMessage(obj){
        vm.data.clinicinfo   	= obj;
				vm.data.messageDetails  = [];
        clearInterval(vm.interval);
				messageService.getMessage(vm.data.patientDetails.id,vm.data.clinicinfo.id).then(function(response){
					if(response.data.data.status == 'success'){
						vm.data.messageDetails = response.data.data.message;
            vm.instantMessage();
					}else{
            toastr.error("No message to read");
            vm.instantMessage();
          }
				});
			}

			 

      /*
          send message by patient
      */
       function sendMessage(msg){
        console.log(msg);
        // return false;
          vm.data.msg         = '';
			    vm.data.receiverId 	=  vm.data.clinicinfo.id; 
			    vm.data.senderId   	=  vm.data.patientDetails.id;  
          vm.data.created     = moment().format('YYYY-MM-DD HH:mm:ss');     
            if(msg == undefined || msg == ''){
                toastr.error('Enter Text Before Send');
                return false;
            }
            if(vm.data.receiverId != undefined || vm.data.senderId != null ){
                var obj = {senderId: vm.data.senderId, receiverId: vm.data.receiverId,message: msg, type:'message',isView: 0,created:vm.data.created,clinicId:vm.data.receiverId };
                 messageService.createMessage(obj).then(function(resp) {
                      if(resp.data.status == 'success'){
                          $timeout(function () {
                              vm.data.messageDetails.push(resp.data.message);
                              $scope.$apply();
                            }, 100);
                       }else{
                         toastr.error(resp.data.message);
                       }
                });
             }
           }


        $scope.fileReaderSupported = window.FileReader != null;
        $scope.photoChanged = function(files){
            $scope.files = files[0];
            if (files != null) {
                var file = files[0];
            if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
                $timeout(function() {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = function(e) {
                        $timeout(function(){
                            $scope.thumbnail_url = e.target.result;
                            vm.openDefault($scope.thumbnail_url,files);
                        });
                    }
                });
                
            }
        }
        }; 

        function openDefault(image,file){ 
            $scope.image = image;
            $scope.sample  =  0;
            $scope.file = file;
                ngDialog.open({
                    template: 'firstDialog',
                    scope: $scope
                });

         };


        function getUpdatePatientMessage(lastElement){
          var getUpdatePatientMessage = [];
          if(vm.data.patientDetails.id && vm.data.clinicinfo.id && lastElement){
              messageService.lastMessage(vm.data.patientDetails.id,vm.data.clinicinfo.id,vm.data.lastElement).then(function(response){
                 if(response.data.data.status == 'success'){
                     getUpdatePatientMessage = response.data.data.message;
                     angular.forEach(getUpdatePatientMessage,function(value,key){
                       vm.data.messageDetails.push(value);
                     });
                 }
              });
          }
        }

        function sendImage(imageData){
            if(imageData == null || imageData == undefined){
                toastr.error('Select Image Before Send');
                return false;
            }
            vm.data.created     = moment().format('YYYY-MM-DD HH:mm:ss');
            // var obj = {senderId: vm.data.patientDetails.id, receiverId: vm.data.clinicinfo.id, image:imageData[0], type: 'image'};
            Upload.upload({
                    url: url+'messages/create',
                    data: {image: imageData[0], senderId: vm.data.patientDetails.id,receiverId: vm.data.clinicinfo.id, type: 'image',isView: 0,created:vm.data.created,clinicId:vm.data.clinicinfo.id}
              }).then(function (resp) {
                  if(resp.data.data.status == 'success'){
                      ngDialog.close();
                      vm.data.messageDetails.push(resp.data.data.message);
                   }else{
                        toastr.error(resp.data.message);
                   }
                    console.log('Success ' + resp.config.data.image.name + 'Uploaded. Response: ' + resp.data);
                  
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.name);
                    $scope.sample  = progressPercentage;
                });
        }

        function download(image,name) {
            var getUrl =  image.toString().match(/.*\/(.+?)\./);
            var link = document.createElement("a");
            if(getUrl && getUrl.length > 1){
              link.download = getUrl[1];
            }else{
              link.download = 'chatImage';
            }
            link.href = image;
            link.click();
        }

         function updateCount(senderId){
          var receiverId  =  vm.data.patientDetails.id;
          var updateUsersCount = '';
            messageService.updateMessageCount(senderId,receiverId).then(function(resp){
                console.log(resp);
                if(resp.data.status == 'success'){
                  angular.forEach(vm.data.clinicDetails,function(value,key){
                      if(value.id == senderId){
                          value.unreadCount = 0;
                      }
                  });
                } 
            });
        }


        function getSenderDetails(obj,data){
          // if(obj == vm.data.patientDetails.id){
            return data.senderUser.origImage+data.senderUser.image;
          // }else{
          //   return data.receivedUser.origImage+data.receivedUser.image; 
          // }
        }

        function changeDateFormat(date){
          if(date){
            return moment(new Date(date)).format("D,MMM YYYY h:mma");
          }

        }

        function instantMessage(){
           vm.interval = $interval(function(){
            if(vm.data.clinicinfo && vm.data.clinicinfo != undefined && vm.data.clinicinfo != ''&& $state.current.name == 'message'){
              if(vm.data.messageDetails.length > 0){
                    vm.data.lastElement    = vm.data.messageDetails[vm.data.messageDetails.length - 1].id;
                    vm.getUpdatePatientMessage(vm.data.lastElement);
               }
            }
          },10000);
        }

       


			vm.onPageLoad();
		}
})();