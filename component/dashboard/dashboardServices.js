/*******************************************************************************
 * 
 * Great Innovus Solutions Private Limited
 * 
 * Module       : Dashboard 
 * 
 * Description : Dashboard services
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
 		.factory('dashboardservices',dashboardservices);

 		dashboardservices.$inject=['$q','commonService','__env','utilService'];

 		function dashboardservices($q,commonService,__env,utilService){
 			var url 	 = __env.apiUrl;
 			var services ={
 				getSpecialityData  		: getSpecialityData,
 				getDoctorData      		: getDoctorData,
 				getClinicData      		: getClinicData,
 				getAppointment     		: getAppointment,
 				makeAppointment    		: makeAppointment,
 				forgetPassword     		: forgetPassword,
 				getClinic          		: getClinic,
 				feedbackDetails    		: feedbackDetails,
 				getNotification    		: getNotification,
 				updateNotificationCount : updateNotificationCount,
 				getServiceData          : getServiceData
 				// notificationChecked: notificationChecked 
 			};

 			return services;

 			/*get all appointment date for doctor*/
 			function getAppointment(clinicId,doctorId){
 				var deferred       = $q.defer();
 				var serviceCall    = commonService.GetAll(url+'appointments?clinicId='+clinicId+'&doctorId='+doctorId);

 				return serviceCall
 					.success(function(response){
 						deferred.resolve(response);
 					})
 					.error(function(response){
 						deferred.reject(response);
 					});
 			}

 			/* get all specaility details*/
 			
 			function getSpecialityData(id){
 				var deferred 		= $q.defer();
 				var serviceCall		= commonService.GetAll(url+'specialities?clinicId='+id);
 				return serviceCall
 					.success(function(response){
 						deferred.resolve(response);
 					})

 					.error(function(response){
 						deferred.reject(response.data);
 					});
 			}

 			/* get all doctor details*/

 			function getDoctorData(Specialitydata,Clinicdata){
 				var deferred       = $q.defer();
 				var serviceCall    = commonService.GetAll(url+'doctors/getDoctorsById?specialityId='+Specialitydata+'&clinicId='+Clinicdata);

 				return serviceCall
 					.success(function(response){
 						deferred.resolve(response);
 					})

 					.error(function(response){
 						deferred.reject(response.data);
 					});
 			}

 			/*push notification for user*/
 			function getNotification(obj){
 				var deferred     = $q.defer();
 				var data         = {};
 				data.type        = 'mobile';
 				data.receiverId  = obj.id;
 				data             = $.param(data);
 				var serviceCall  = commonService.Create(url+'messages/announcement',data);
 				return serviceCall
 				.success(function(response){
 					console.log(response);
 				})
 				.error(function(response){
 					console.log(response);
 				});
 			}

 			function getClinicData(obj){
 				var deferred       = $q.defer();
 				var serviceCall    = commonService.GetAll(url+'specialities/getClinic?specialityId='+obj);

 				return serviceCall
 					.success(function(response){
 						deferred.resolve(response);
 					})

 					.error(function(response){
 						deferred.reject(response.data);
 					});
 			}

 			function getServiceData(clinicId,specialityId,userId){
 				var deferred 		= $q.defer();
 				var serviceCall 	= commonService.GetAll(url+'specialities/getServices?clinicId='+clinicId+'&specialityId='+specialityId+'&userId='+userId);

 				return serviceCall

 					.success(function(response){
 						deferred.resolve(response);
 					})	 
 					.error(function(response){
 						deferred.resolve(response.data);
 					});
 			}

 			/* create appointment for user */
 			function makeAppointment(obj){
 				var sendData 	   = $.param(obj);
 				var deferred       = $q.defer();
 				var serviceCall    = commonService.Create(url+'appointments/create',sendData);
 				return serviceCall
 				.success(function(response){
 					console.log(response);
 					deferred.resolve(response);
 				})
 				.error(function(response){
 					deferred.reject(response);
 				});
 			}


 			function forgetPassword(data){
 				var deferred     = $q.defer();
 				var serviceCall  = commonService.GetAll(url+'users/forgotPassword?email='+data);
 				return serviceCall
 				.success(function(response){
 					console.log(response);
 					deferred.resolve(response);
 				})
 				.error(function(response){
 					console.log(response);
 					deferred.reject(response);
 				});
 			}

 			function getClinic(obj){
 				var deferred     = $q.defer();
 				var serviceCall  = commonService.GetAll(url+'clinics?patientId='+obj);
 				return serviceCall
 				.success(function(response){
 					deferred.resolve(response);
 				})
 				.error(function(response){
 					deferred.reject(response);
 				});
 			}

 			/*feedback details submit*/
 			function feedbackDetails(obj){
 				var dataObj 	   = $.param(obj);
 				var deferred       = $q.defer();
 				var serviceCall    = commonService.Create(url+'users/feedback',dataObj);
 				return serviceCall
 				.success(function(response){
 					console.log(response);
 					deferred.resolve(response);
 				})
 				.error(function(response){
 					deferred.reject(response);
 				});
 			}



 			function updateNotificationCount(userId){
 				var deferred     = $q.defer();
 				var serviceCall  = commonService.GetAll(url+'messages/updateNotificationCount?receiverId='+userId);
 				return serviceCall
 				.success(function(response){
 					console.log(response);
 					deferred.resolve(response);
 				})
 				.error(function(response){
 					console.log(response);
 					deferred.reject(response);
 				});
 			}



 			// function notificationChecked(obj){
 			// 	console.log(obj);
 			// 	var deferred     = $q.defer();
 			// 	var serviceCall  = commonService.Create(url+'messages/checkedNotification',obj);
 			// 	return serviceCall
 			// 	 	.success(function(response){
 			// 	 		console.log(response);
 			// 	 	})
 			// 	 	.error(function(response){
 			// 	 		console.log(response);
 			// 	 	});
 			// };
 		};
 })();
