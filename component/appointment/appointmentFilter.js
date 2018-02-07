/*******************************************************************************
 * 
 * Great Innovus Solutions Private Limited
 * 
 * Module       : Appointment 
 * 
 * Description : 
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
 			.filter('startFrom',startFrom);
 			function startFrom(){
 				return function(input,start){
 					if(input){
 					start =+ start;
 					return input.slice(start);
 					}
 					
 				}
 			}
 })();