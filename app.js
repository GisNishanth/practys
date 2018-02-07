/*********************************************************************
 *
 *  Great Innovus Solutions Private Limited
 *
 *  Module      :   practysApp
 *
 *  Description :   practys module
 *
 *  Date        :   24/10/2016
 *
 *  Version     :   1.0
 *
 **********************************************************************/
 var __env = {};

 if(window){  
  Object.assign(__env, window.__env);
}

var  app = angular.module('practysApp',['ui.router','angular-loading-bar','ngDialog','ngCookies','angularSimpleSlider','ui.bootstrap','toastr','oi.select','ui.bootstrap.datetimepicker','ui.bootstrap.timepicker','angular-svg-round-progressbar','datatables','slickCarousel','ngFileUpload','luegg.directives'])
				  .run(function($rootScope,$state,$stateParams,$location,utilService,toastr,$anchorScroll,cfpLoadingBar,$window){
					$rootScope.online = $window.navigator.onLine;
				  	// $window.addEventListener("online",function(event){
				  	// 	$rootScope.$apply(function(){
				  	// 		$rootScope.online = true;
				  	// 	});
				  	// });
				  	// $window.addEventListener('offline',function(event){
				  	// 	$rootScope.$apply(function(){
				  	// 		$rootScope.online = false;
				  	// 	});
				  	// });
					$rootScope.$state 				= $state;
					$rootScope.$stateParams 		= $state;
					$rootScope.$on("$stateChangeStart",function(event,toState,toParams,fromState,fromParams){
						if($rootScope.online == true){
							if(!utilService.getItem('token') && toState.name == 'dashboard'){
								cfpLoadingBar.start();
								$state.current  			= toState;
		 						$rootScope.currentstate		= $state.current.name;
		 						$location.hash($stateParams.scrollTo);
								$anchorScroll();	
							}else if(utilService.getItem('token')){
								cfpLoadingBar.start();
								$state.current  			= toState;
		 						$rootScope.currentstate		= $state.current.name;
		 						$location.hash($stateParams.scrollTo);
								$anchorScroll();
								if(toState.name == 'message'){
									$rootScope.popup = false;
								}else{
									$rootScope.popup = true;
								}
							}else{
								cfpLoadingBar.start();
								 toastr.warning("need to login");
								 event.preventDefault();
							}
						}else{
							toastr.error("No Internet Connection");
							event.preventDefault();
						}	
						})   
			}).config(function($httpProvider,toastrConfig) {
 					 angular.extend(toastrConfig, {
   								 autoDismiss: true,
    							 containerId: 'toast-container',
								    maxOpened: 0,    
								    newestOnTop: true,
								    positionClass: 'toast-top-right',
								    preventDuplicates: false,
								    preventOpenDuplicates: true,
								    timeOut: 3000,
								    target: 'body'
  				});
 					$httpProvider.interceptors.push('AuthInterceptor'); 
 					
 					 });
	app.constant('__env', __env);			  
