/*********************************************************************
 *
 *  Great Innovus Solutions Private Limited
 *
 *  Module      :   practysApp 
 *
 *  Description :  	main controller 
 *
 *  Date        :   24/10/2016
 *
 *  Version     :   1.0
 *
 **********************************************************************/
 (function(){
 	'use strict';

	angular
 		.module('practysApp')
 		.controller('mainController',mainController);
 		 mainController.$inject = ['ngDialog','$scope','__env','AuthenticationService','$state','$rootScope','utilService','toastr','$location','$anchorScroll','dashboardservices','$interval','$stateParams','$timeout']; 
		
 		function mainController(ngDialog,$scope,__env,AuthenticationService,$state,$rootScope,utilService,toastr,$location,$anchorScroll,dashboardservices,$interval,$stateParams,$timeout){
			var main 						= this;
			main.data               		= [];
			main.data.userDetails       	= utilService.getItem('user');
			main.serverPath        			= __env.apiUrl;
			$rootScope.hideValue    		= false;
			$rootScope.popup            	= true;
			$rootScope.notificationDetails  = [];
			$scope.loginDetails     	    ={
				username:'',
				Password:''
			};
			// $rootScope.notificationLength 	= 0;
			main.openDefault 	   		 	= openDefault;
			main.onPageLoad         	 	= onPageLoad;
			main.bookAnAppointment  	 	= bookAnAppointment;
			main.forgetPassword     	 	= forgetPassword;
			main.passwordSubmit    	 	 	= passwordSubmit;
			// main.checkedNotification  	 = checkedNotification;
			main.countNotification          = countNotification;
			main.updateNotification         = updateNotification;
			main.getUpdateDetails           = getUpdateDetails;
			main.getClinicDetails           = getClinicDetails;
			main.announcementPatient        = announcementPatient;
			main.makeUrl                  	=  makeUrl;
			main.dateFormat                 = dateFormat;


			function dateFormat(date){
 		 		return moment(new Date(date)).format('llll');
 		 	}



		      function makeUrl(url,img){
		        return (url+img);
		      }


			/*forget password --> email submit*/
			function passwordSubmit(data){
				var data            = data.email;
				dashboardservices.forgetPassword(data).then(function(response){
					if(response.data.data.status == 'success'){
						toastr.warning(response.data.data.message);
					}
				});
			}

			/*redirect to appointment page from header*/
			function bookAnAppointment(){
				$state.go('appointment',{
					data:'v1'
				});
			};

			/* forget password*/
			function forgetPassword(){
				ngDialog.close();
				ngDialog.open({
					templateUrl:"assets/shared/template/directive/forgetPassword.html",
					controller:'mainController'
				});
			}

			function openDefault(){
				ngDialog.close();
				ngDialog.open({
						templateUrl:"assets/shared/template/directive/loginForm.html",
						controller:'mainController'
							// className:'ngdialog-theme-default'
				});	
			}

			/* 
				login function - Authentication - setcredentials - user data
			*/		
			$scope.loginFormSubmit  = function(loginDetails){
				if(loginDetails.email && loginDetails.password){
					AuthenticationService.Login(loginDetails.email,loginDetails.password,main.serverPath,function(response){					
						if(response.data.token){
							var tempData             = response.data;
							var authData             = angular.fromJson(tempData.message.User);
							if(authData.user_level == 'patient'){
								$rootScope.userImage 	 = response.data.message.User.origImage+response.data.message.User.image;
								$rootScope.hideValue     = true;
								AuthenticationService.SetCredentials(tempData.message.User.email,tempData.message.User.password,response.data.token,tempData.message.User,response.data.referKey);
								$rootScope.userName   =  utilService.RestoreStateObj(utilService.getItem('user'));
								ngDialog.close();
								main.data.userDetails    = utilService.getItem('user');
								toastr.success("Login Successfully");
								main.onPageLoad();
							}else{
								toastr.error("Not Authenticated User");
							}
						}else{
							toastr.error("Authentication Email or Password incorrect");
						}
					});
				}
			}

			/*
				logout function -  clear ClearCredentials
			 */
			$scope.logoutUserDetails  = function(){
				$rootScope.userName      = '';
				$rootScope.clinicDetails = [];
				AuthenticationService.ClearCredentials();
				toastr.success("Logout Successfully");
				$state.go('dashboard');
				$rootScope.notificationDetails = [];
				$rootScope.hideValue    	   = false;
			} 

			/* on page load*/
			function onPageLoad(){
				if(main.data.userDetails){
					$rootScope.notificationDetails 	  = [];
					$rootScope.hideValue     	  	  = true;
					main.announcementPatient();
					main.getClinicDetails();
				}
			};

			function announcementPatient(){
				var data = angular.fromJson(utilService.getItem('user'));
					$rootScope.userName      = data;
					dashboardservices.getNotification(data).then(function(response){
						if(response.data.data.status == 'success'){
							$rootScope.notificationDetails = response.data.data.message;
							main.countNotification();
						}
					});
			}

			/*notification is checked*/
			// function checkedNotification(){
			// 	var userData = utilService.RestoreStateObj(main.data.userDetails);
			// 	var data   = $.param({receiverId:userData.id});
			// 	dashboardservices.notificationChecked(data).then(function(response){
			// 		console.log(response.data.data.message);
			// 	});
			// }

			/*notification count*/
			function countNotification(){
				$rootScope.notificationLength = 0;
				if($rootScope.notificationDetails.length > 0){
					console.log($rootScope.notificationDetails);
						angular.forEach($rootScope.notificationDetails,function(value,key){
							console.log(value.isView);
							console.log($rootScope.userName.id);
									if(value.isView == 0){
										++$rootScope.notificationLength;
										console.log($rootScope.notificationLength);
									}
						});

				}
			}


			/*update  notification  count */
			function updateNotification(){
				var userId  		= $rootScope.userName.id;
				dashboardservices.updateNotificationCount(userId).then(function(response){
					if(response.data.data.status == 'success'){
						var sendData  = response.data.data.message[0].Announcement;
						$rootScope.notificationLength =  $rootScope.notificationLength > 0 ? --$rootScope.notificationLength : 0;
					}
				});
			}

			function getClinicDetails(){
				var data = $rootScope.userName.id;
				dashboardservices.getClinic(data).then(function(response){
            		if(response.data.data.status == 'success')
 					          $rootScope.clinicDetails = response.data.data.message;
 				});
			}


			function getUpdateDetails(data){
				var sample  = '';
				var getDate = utilService.RestoreStateObj(data.isView);
				angular.forEach(getDate,function(value,key){
					if(value.id == $rootScope.userName.id && value.isView == 0){
						 sample = true;
					}
				});
				return sample == true ? true : false;
			}

			$interval(function(){
				main.announcementPatient();
			},10000);
			main.onPageLoad();

 		};
	})();