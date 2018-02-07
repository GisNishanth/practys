/*********************************************************************
 *
 *  Great Innovus Solutions Private Limited
 *
 *  Module      :   practysApp 
 *
 *  Description :  	records services 
 *
 *  Date        :   24/10/2016
 *
 *  Version     :   1.0
 *
 **********************************************************************/


(function(){
	'use Strict';
	angular
		.module('practysApp')
		.factory('recordsServices',recordsServices);
			recordsServices.$inject  	    = ['$http','$q','commonService','__env'];

		function recordsServices($http,$q,commonService,__env){
			var url  			= __env.apiUrl;
			var services        = {
				getRecords    	: getRecords,
				getReport       : getReport 
			};

			return services;

			/* 
				services ->   get record details
			*/
			
			function getRecords(patientId,doctorId){
				var deferred    = $q.defer();
				if(!doctorId){
					var serviceCall = commonService.GetAll(url+'appointments/patientAppointmentDetails?patientId='+patientId+'&type=doctor');
				}else{
					var serviceCall = commonService.GetAll(url+'appointments/patientAppointmentDetails?patientId='+patientId+'&doctorId='+doctorId+'&type=record');
				}
				return serviceCall
					.success(function(response){
						console.log(response);
						deferred.resolve();
					})

					.error(function(response){
						deferred.reject();
					});
			}


			function getReport(patientId,appointmentId,clinicId){
				var deferred   		= $q.defer();
				var serviceCall		= commonService.GetAll(url+'appointments/getTreatmentDetails?patientId='+patientId+'&appointmentId='+appointmentId+'&clinicId='+clinicId);	
				
				return serviceCall
				 	.success(function(response){
				 		console.log(response);
				 	})
				 	.error(function(response){
				 		console.log(response);
				 	});
			}
		}
})();