/*********************************************************************
 *
 *  Great Innovus Solutions Private Limited
 *
 *  Module      :   practysApp 
 *
 *  Description :  	user profile controller 
 *
 *  Date        :   24/10/2016
 *
 *  Version     :   1.0
 *
 **********************************************************************/
 (function(){
 	angular
 		.module('practysApp')
 		.factory('profileService',profileService);
 		profileService.inject 	=	['$q','__env','commonService'];
 		function profileService($q,__env,commonService){
 			 var url      = __env.apiUrl;
 			var services = {
 				update			:update,
 				updatedValues	:updatedValues,
 				passwordUpdate : passwordUpdate
 			};
 			return services;

         function   update(userDetails){
            var deferred        = $q.defer();
            var data =$.param(userDetails);
                var serviceCall     = commonService.Create(url+'doctors/update',data);
                return serviceCall
                .success(function(response){
                    console.log(response);
                    deferred.resolve(response);
                })
                .error(function(response){
                    console.log(response);
                    deferred.reject(response);
                })
         };
         function updatedValues(id){
         	var deferred 		=	$q.defer();
         	var serviceCall 	=	commonService.GetAll(url+'doctors/get?userId='+id);
         	return serviceCall
         	.success(function(response){
         		deferred.resolve(response);
         	})
         	.error(function(response){
         		deferred.reject(response);
         	})
         };


         function passwordUpdate(data){
         	console.log(data);
              var sendDate = $.param(data);
         	var deferred 		=	$q.defer();
         	var serviceCall 	=	commonService.Create(url+'users/changePassword',sendDate);
         	return serviceCall
         	.success(function(response){
         		deferred.resolve(response);
         	})
         	.error(function(response){
         		deferred.reject(response);
         	})
         }

 		}
 })();

 // http://demo.greatinnovus.com/practysServerApp/users/changePassword