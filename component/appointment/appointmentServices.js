/*********************************************************************
 *
 *  Great Innovus Solutions Private Limited
 *
 *  Module      :   Appointment  
 *
 *  Description :  	Appointment Services 
 *
 *  Date        :   24/10/2016
 *
 *  Version     :   1.0
 *
 **********************************************************************/
 (function(){
 	angular
 		.module('practysApp')
 		.factory('appointmentService',appointmentService);
 		appointmentService.$inject=['$q','commonService','__env'];
 		
 		function appointmentService($q,commonService,__env){
 			var url 	 = __env.apiUrl;
 			var services ={
 				getAppointmentDetails : getAppointmentDetails,
 				cancelAppointment     : cancelAppointment
 			};

 			return services;

 			/*get Appointment */
 			function getAppointmentDetails(obj){
 				var deferred 		= $q.defer();
 				var serviceCall		= commonService.GetAll(url+'appointments/patientAppointmentDetails?patientId='+obj+'&type=appointment');
 				return serviceCall
 					.success(function(response){
 						console.log(response);
 						deferred.resolve(response);
 					})

 					.error(function(response){
 						deferred.reject(response.data);
 					});
 			}

 			function cancelAppointment(obj){
 				// var data        = $.param(obj);
 				var deferred    = $q.defer();
 				var serviceCall = commonService.Update(url+'appointments/updateStatus',obj);

 				return serviceCall
 					.success(function(response){
 						console.log(response);
 						deferred.resolve(response);
 					})

 					.error(function(response){
 						deferred.reject(response.data);
 					})
 			}
 		};
 })();