/*******************************************************************************
 * 
 * Great Innovus Solutions Private Limited
 * 
 * Module       : Message 
 * 
 * Description : Message service
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
 		.factory('messageService',messageService);
 		messageService.$inject=['__env','commonService','$q'];
 		function messageService(__env,commonService,$q){
 			var url 	 = __env.apiUrl;
 			var service  ={
 				getClinicList 		: getClinicList,
 				getMessage			: getMessage,
 				createMessage   	: createMessage,
 				updateMessageCount  : updateMessageCount,
 				lastMessage         : lastMessage
 			};

 			return service;

 			function getClinicList(obj){
 				var deferred       = $q.defer();
 				var serviceCall    = commonService.GetAll(url+'clinics?patientId='+obj+'&type=message');

 				return serviceCall
 					.success(function(response){
 						deferred.resolve(response);
 					})
 					.error(function(response){
 						deferred.reject(response);
 					});
 					return deferred.promise;
 			}

 			function getMessage(senderId,receiverId){
 				var deferred 	 	= $q.defer();
 				var serviceCall		= commonService.GetAll(url+'messages/get?senderId='+senderId+'&receiverId='+receiverId+'&clinicId='+receiverId);
 				return serviceCall
 					.success(function(response){
 						deferred.resolve(response.data);
 					})
 					.error(function(response){
 						deferred.reject(response.data);
 					});
 					return deferred.promise;
 			}

 		

	    	function createMessage(obj){
	    	var deferred = $q.defer();

	    	var dataObj = $.param(obj);

	    	var serviceCall	 =	commonService.Create(url+'messages/create', dataObj);

			serviceCall
				.success(function(data) {
					console.log(data);
					deferred.resolve(data);
				}).
				error(function(response){
					console.log("Error : message save failed ");
					console.log(response);
					deferred.reject(response.data);
				});
				return deferred.promise;
	    }


	    function lastMessage(senderId,receiverId,lastmsg){
 				var deferred  = $q.defer();
 				var serviceCall		= commonService.GetAll(url+'messages/get?senderId='+senderId+'&receiverId='+receiverId+'&lastId='+lastmsg+'&clinicId='+receiverId);
 				return serviceCall
 					.success(function(response){
 						deferred.resolve(response.data);
 					})
 					.error(function(response){
 						deferred.reject(response.data);
 					});
 					return deferred.promise;
 			}

	    function updateMessageCount(senderId,receiverId){

	    	var deferred = $q.defer();
	    	
	    	var serviceCall	=	commonService.GetAll(url+'messages/updateCount?senderId='+senderId+'&recieverId='+receiverId);

			serviceCall
				.success(function(data) {
					console.log(data);
					deferred.resolve(data);
				}).
				error(function(response){
					console.log("Error : message retrive failed ");
					console.log(response);
					deferred.reject(response);
				});

			return deferred.promise;

	    }


	    	
 		}
 })();