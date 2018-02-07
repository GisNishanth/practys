(function(){
	'use strict';
	angular
		.module('practysApp')
		 .directive('htmlToPdf',htmlToPdf);
		function htmlToPdf(){
			return {
				restrict:'EA',
				transclude:true,
				scope:{
					Data : '=details' 
				},
				link:function(scope,elem,attrs){
					console.log(Data);
					scope.exportData = function(){
						console.log(Data);
					}
				}
			}
		} 
})();