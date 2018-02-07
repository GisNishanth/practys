/*********************************************************************
 *
 *  Great Innovus Solutions Private Limited
 *
 *  Module      :   practysApp 
 *
 *  Description :   path file for every components
 *
 *  Date        :   24/10/2016
 *
 *  Version     :   1.0
 *
 **********************************************************************/

 app.config(['$stateProvider','$urlRouterProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$locationProvider){
 			$urlRouterProvider.otherwise('home');
 			$locationProvider.html5Mode(true);
 			
 			$stateProvider
 				.state('dashboard',{
 					url  :'/home',
 					params:{data:null},
 					// templateUrl:"component/dashboard/main.html",
 					// controller:"dashboardController as vm"
 					views:{
	 						'':{
	 							templateUrl:'component/dashboard/main.html',
	 							controller:'dashboardController as vm'
	 						},
	 						'home@dashboard':{
	 							templateUrl:'component/dashboard/home.html'
	 						},
	 						'patientDetails@dashboard':{
	 							templateUrl:'component/dashboard/patientDetail.html'
	 						},
	 						'makeAnAppoinment@dashboard':{
	 							templateUrl:'component/dashboard/makeAnAppoinment.html'
	 						},
	 						'feedback@dashboard':{
	 							templateUrl:'component/dashboard/feedback.html'
	 						}
 					}
 				})
 				.state('billingHistory',{
 					url          : "/billingHistory",
 					templateUrl  : "component/billingHistory/billingHistoryList.html",
 					controller   : 'billingHistoryController as vm'
 				})
 				.state('patientDetails',{
 					url         : "/patientDetails",
 					templateUrl :"component/patientDetails/patientDetails.html",
 					controller  : 'patientDetailsController as vm',
 					params      : {data:null}
 				})
 				.state('billingHistoryList',{
 					url         : '/billingHistoryLists',
 					templateUrl : "component/billingHistory/billingHistoryDetails.html",
 					controller  : 'billingHistoryController as vm',
 					params      : {data:null}
 				})
 				.state('myrecord',{
 					url         : '/records',
 					templateUrl : 'component/records/mydoctor.html',
 					controller  : 'recordsController as vm'
 				})
 				.state('myrecordlist',{
 					url         : '/recordlists',
 					templateUrl : 'component/records/myrecord.html',
 					controller  : 'recordsController as vm',
 					params		:{data:null}
 				})
 				.state('myrecorddetails',{
 					url        : '/recorddetails',
 					templateUrl: 'component/records/myrecorddetails.html',
 					controller : 'recordsController as vm',
 					params     : {data:null}
 				})
 				.state('mydoctorList',{
 					url:'/mydoctorList',
 					templateUrl :'components/billingHistory/mydoctorList.html'
 				})
 				.state('appointment',{
 					url          : "/appointment",
 					params       :{data:null},
 					views:{
	 						'':{
	 							templateUrl:'component/appointment/appointment.html',
	 							controller :'appointmentController as vm'
	 						},
	 						'myappointment@appointment'    :{
	 							templateUrl:'component/appointment/myappointment.html'
	 						},'makeappointment@appointment':{
	 							templateUrl:'component/appointment/makeappointment.html'
	 						}
 					}
 				})
 				.state('message',{
 					url          : "/message",
 					templateUrl  : 'component/message/message.html',
 					controller   : 'messagecontroller as vm'
 				})
 				.state('userprofile',{
 					url         : "/userprofile",
 					templateUrl : 'component/userProfile/userprofile.html',
 					controller  : 'userProfileController as vm'
 				})
 }]);