(function(){
	'use strict';

		app.factory('AuthInterceptor',AuthInterceptor);
			AuthInterceptor.$inject = ['$q', 'toastr','$window','$location'];

		function  AuthInterceptor($q,toastr,$window,$location){

			var interceptorFactory  = {};
			interceptorFactory.responseError = function(response){
				console.log(response);
				 if (response.status == 403) {
            				toastr.error("token expired please login");
           					$window.localStorage.clear();
        		} else {
           			 toastr.error('Can not connect to server.');
        		}
        		

        		return $q.reject(response);
			}
			interceptorFactory.request = function(config){
					var stringtoken  = $window.localStorage.getItem('token');
	     			 var stringKey   = $window.localStorage.getItem('referkey');
	     			 if(stringtoken && stringKey){
	     			 	var data = stringtoken+' '+angular.fromJson(stringKey);
	     			 	config.headers.Authorization = 'Basic'+' '+data;
	     			 }
				 
				return config;
			}

			return interceptorFactory;
		};		
})();