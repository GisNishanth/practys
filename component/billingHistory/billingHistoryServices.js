/*******************************************************************************
 * 
 * Great Innovus Solutions Private Limited
 * 
 * Module       : Billing History 
 * 
 * Description : Billing History contolller
 * 
 * Date    	   : 
 * 
 * Version    : 1.0
 * 
 ******************************************************************************/

 (function(){
 	'use stirct';
 	angular
 		.module('practysApp')
 		.factory('billingHistoryServices',billingHistoryServices);
 		 billingHistoryServices.inject = ['$q','__env','commonService'];
 		function billingHistoryServices($q,__env,commonService){
 			var url      = __env.apiUrl;
 			var services = {
 				getDetails  : getDetails,
 				PDFdocument : PDFdocument
 			};

 			return services;

 			/*call when the controller is loaded --> get Patient details*/
 			function getDetails(obj){
 				var deferred  		= $q.defer();
 				var serviceCall     = commonService.Create(url+'invoices/get?patientId='+obj);
 				return serviceCall
 				.success(function(response){
 					console.log(response);
 					deferred.resolve(response);
 				})
 				.error(function(response){
 					console.log(response);
 					deferred.reject(response);
 				})
 			}


 			/* PDF Document*/
 			function PDFdocument(obj){
 				var deferred     = $q.defer();
 				var serviceCall  = commonService.Create(url+'invoices/edit',obj);
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