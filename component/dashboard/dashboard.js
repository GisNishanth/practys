/*******************************************************************************
 *
 * Great Innovus Solutions Private Limited
 *
 * Module       : Dashboard
 *
 * Description : Dashboard controller
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
 		.controller('dashboardController',dashboardController);
 			dashboardController.$inject=['ngDialog','dashboardservices','$scope','utilService','toastr','$state','$rootScope'];

 		function dashboardController(ngDialog,dashboardservices,$scope,utilService,toastr,$state,$rootScope){
 			var vm    					           	= this;
 			vm.data                		     	= [];
 			vm.data.userDetails             = {};
      vm.data.clinicAvaliable         = [];
 			vm.data.submitted               = false;
 			vm.data.currentDate             = new Date();
 			vm.data.previousData            = new Date(vm.data.currentDate.getFullYear(),vm.data.currentDate.getMonth()+1,vm.data.currentDate.getDate());
 			vm.data.userDetails             = angular.fromJson(utilService.getItem('user'));
      vm.sendData            			    = [];
 			vm.format                   	  = 'dd-MM-yyyy';
      vm.data.date                    = {};
      vm.data.date.days               = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
 			vm.sendData.service             = {};
 			vm.sendData.service.mins        = 1;
 			vm.onPageLoad					          = onPageLoad;
 			vm.getDoctorDetails             = getDoctorDetails;
 			vm.getClinicDetails             = getClinicDetails;
 			vm.makeAnAppointment 		        = makeAnAppointment;
 			vm.dateAdd                      = dateAdd;
 			vm.checkAppointmentDate         = checkAppointmentDate;
 			vm.findAppointment              = findAppointment;
 			vm.feedbackDetailsSubmit        = feedbackDetailsSubmit;
 			vm.dateDisabled                 = dateDisabled;
 			vm.getServiceDetails            = getServiceDetails;
 			vm.getAllClinic                 = getAllClinic;
      vm.getSpecailityDetails         = getSpecailityDetails;
      vm.getClinicTiming              = getClinicTiming;
      vm.checkClinicTiming            = checkClinicTiming;

      function getClinicTiming(obj){
        if(obj){
             vm.data.date.open   = {};
              vm.data.date.close  = {};
              var data = JSON.parse(vm.sendData.clinic.clinicTiming);
              if(checkClinicTiming(obj)){
              angular.forEach(data,function(value,key){
                   if(value.day == vm.data.date.days[obj.getDay()]){
                      vm.data.date.open  = value.open;
                      vm.data.date.close = value.close;
                      toastr.info("Clinic Timing:"+vm.data.date.open+'-'+vm.data.date.close);
                     }
              });
             }else{
              toastr.error("Clinic Off");
            }
        }
      }
 			/*appointment date engages by doctor*/
 		function findAppointment(obj){      
 			 obj    = moment(new Date(obj)).format('YYYY-MM-DD HH:mm:ss');
        if(vm.data.appointmentTime.indexOf(obj) != -1 || vm.data.appointmentEndTime.indexOf(obj) != -1 || vm.data.appointmentTimes.indexOf(obj) != -1){
          toastr.error(obj+' '+"Doctor is Engage");
           return true;
        }else{
          return false;
        }
 			}


 		function getServiceDetails(clinic,speciality,doctor){
        var userId      =  $rootScope.userName.id;
        if(clinic && speciality && doctor){
           vm.data.serviceErrorMsg    = '';
           dashboardservices.getServiceData(clinic,speciality,doctor).then(function(response){
             if(response.data.data.status == 'success'){
                vm.data.serviceDetails =  response.data.data.message;
              }else if(response.data.data.status == 'error'){
                vm.data.serviceErrorMsg = response.data.data.message;
              }
            });
        }else{
          vm.sendData.service         = '';
          vm.data.serviceErrorMsg    = '';
          vm.data.serviceDetails      = [];
        }
 		}


 			/* get clinic details*/
 		function onPageLoad(){
 			var data  = {};
      if(vm.data.userDetails){
            vm.getAllClinic();
        }
 			}


 			/*
 			get all Clinic for Patient
 			*/
 		function getAllClinic(){
 			if(vm.data.userDetails){
 				var data = vm.data.userDetails.id;
 				dashboardservices.getClinic(data).then(function(response){
            if(response.data.data.status == 'success')
 					           $rootScope.clinicDetails = response.data.data.message;
 			});
 			}
 		}

    function getSpecailityDetails(obj){
      vm.data.clinicAvaliable       = [];
      if(obj){
         var data = obj;
        vm.data.specialityErrorMsg  = '';
         vm.data.doctorErrorMsg     = '';
         vm.data.serviceErrorMsg    = '';
          dashboardservices.getSpecialityData(data).then(function(response){
            if(response.data.data.status == 'success'){
                vm.data.specialityDetails = response.data.data.message;
                var data = JSON.parse(vm.sendData.clinic.clinicTiming);
                angular.forEach(data,function(value,key){
                    vm.data.clinicAvaliable.push(vm.data.date.days.indexOf(value.day));
                });
            }else{
                vm.data.specialityErrorMsg = response.data.data.message;
            }
        });
      }else{
        // vm.sendData.clinic         = '';
        vm.sendData.doctor         = '';
        vm.sendData.service        = '';
        vm.sendData.speciality     = '';
        // vm.data.clinicErrorMsg     = '';
        vm.data.specialityErrorMsg = '';
        vm.data.doctorErrorMsg     = '';
        vm.data.serviceErrorMsg    = '';
        vm.data.serviceDetails     = [];
        vm.data.doctorDetails      = [];
        vm.data.specialityDetails  = [];
      }

    }

 			 /*get doctor details*/
      	function getDoctorDetails(Specialityobj,Clinicobj){
        	if(Specialityobj && Clinicobj){
            vm.data.doctorErrorMsg     = '';
            vm.data.serviceErrorMsg    = '';
         		 var Clinicdata               = Clinicobj.id;
         		 var Specialitydata           = Specialityobj.id;
          		 dashboardservices.getDoctorData(Specialitydata,Clinicdata).then(function(response){
          			if(response.data.data.status == 'success'){
                    vm.data.doctorDetails         =  response.data.data.message;
                    if(vm.data.doctorDetails.length > 0){
                         angular.forEach(vm.data.doctorDetails,function(value,key){
                           value.UserDes = '';
                           value.UserDes =  'Dr'+' '+value.username;
                         });
                       }

                }

              				if(response.data.data.status == 'error')
                    			vm.data.doctorErrorMsg         = response.data.data.message;
          					});
        				}else{
               				vm.sendData.doctor         = '';
                      vm.sendData.service        = '';
                      vm.data.doctorErrorMsg     = '';
                      vm.data.serviceErrorMsg    = '';
               				vm.data.doctorDetails      = [];
                      vm.data.serviceDetails     = [];
      					 }
      				}

 			 /* get clinic*/
        function getClinicDetails(obj){
           if(obj){
           		vm.data.serviceDetails = [];
              obj                     = angular.fromJson(obj);
              var data                = obj.id
              dashboardservices.getClinicData(data).then(function(response){
               if(response.data.data.status == 'success'){
                       vm.data.clinicDetails         =  response.data.data.message;
               }else {
                      vm.data.clinicErrorMsg = 'error';
               }
                    });
               angular.forEach(vm.data.specialityDetails,function(value,key){
               		if(data == value.id){
               			vm.data.serviceDetails = (value.services);
               		}
               });
                    }else{
                          vm.data.doctorDetails = [];
                          vm.sendData.doctor    = '';
                          vm.data.clinicDetails = [];
                          vm.sendData.clinic    = '';
                          vm.sendData.service   = '';
                          vm.data.serviceDetails= [];
                          vm.data.doctorErrorMsg= '';
                          vm.data.clinicErrorMsg= '';
              	}
        }

 			/* check appointment date for doctor*/
 			function checkAppointmentDate(){
 				vm.data.appointmentTime = [];
        vm.data.appointmentEndTime = [];
        vm.data.appointmentTimes = [];
        if(vm.sendData.doctor){
           var clinicId          = vm.sendData.clinic.id;
           var doctorId          = vm.sendData.doctor.id;
           dashboardservices.getAppointment(clinicId,doctorId).then(function(response){
              vm.data.checkAppointment = response.data.data.message;
              angular.forEach(vm.data.checkAppointment,function(value,key){

                var startDateValue  =   value.startDate +' '+value.startTime;
                var endDateValue    =   value.endDate+' '+value.endTime;


                var startDateMoment = moment(new Date(startDateValue)).format('YYYY-MM-DD HH:mm:ss');
                var endDateMoment = moment(new Date(endDateValue)).format('YYYY-MM-DD HH:mm:ss');


                var startDateMili = new Date(startDateMoment).getTime();
                for(var i=0;startDateMili < new Date(endDateMoment).getTime();i++){
                        var a       =   startDateMili+60000;
                        var startDateTime = moment(new Date(a)).format('HH:mm:ss');
                     vm.data.appointmentTimes.push(value.startDate +' '+startDateTime);
                         startDateMili = startDateMili+60000;
                }

              vm.data.appointmentTime.push(value.startDate +' '+value.startTime);
              vm.data.appointmentEndTime.push(value.endDate+' '+value.endTime);

          });
        });
        }
 			}

 			/*make an appointment*/
 			function makeAnAppointment(obj,minute){
 				vm.data.submitted            = true;
 				vm.data.userDetails          = angular.fromJson(utilService.getItem('user'));
 				if(vm.data.userDetails == null){
 					toastr.error("Need To Login Before Appointment");
 					ngDialog.open({
						templateUrl:"assets/shared/template/directive/loginForm.html",
						controller:'mainController'
					});
 				}else{
 				 if(obj.appointmentStart != undefined && obj.speciality != undefined && obj.clinic !=undefined && obj.doctor != undefined && obj.reason != undefined && obj.service != undefined){
             vm.data.getTiming            =  moment(new Date(obj.appointmentStart)).format('HH:mm:ss');
             if(vm.checkClinicTiming(obj.appointmentStart)){
             if(vm.data.date.open < vm.data.getTiming  && vm.data.date.close > vm.data.getTiming){
                      vm.data.submitted            = true;
                      var sendData                 = {};
                      sendData.reason              = obj.reason;
                      sendData.specaility          = obj.speciality;
                      // sendData.appointmentStart   = moment(new Date(obj.appointmentStart)).format('YYYY-MM-DD HH:mm:ss');
                      sendData.appointmentStart    = obj.appointmentStart;
                      sendData.specialityId        = obj.speciality.id;
                      sendData.clinicId            = obj.clinic.id;
                      sendData.doctorId            = obj.doctor.id;
                      sendData.serviceId           = obj.service.id;
                      sendData.serviceTime         = obj.service.mins;
                      sendData.patientId           = vm.data.userDetails.id;
                      sendData.userId              = sendData.patientId;
                      sendData.endsAt              = sendData.appointmentStart;
                      sendData.appointmentEnd      = vm.dateAdd(vm.sendData.appointmentStart, 'minute',minute);
                      sendData.startDate           = moment(obj.appointmentStart).format("YYYY-MM-DD");
                      sendData.startTime           = moment(obj.appointmentStart).format("H:mm:ss");
                      sendData.endDate             = moment(obj.appointmentStart).format("YYYY-MM-DD");
                      sendData.endTime             = moment(sendData.appointmentEnd).format("H:mm:ss");
                      sendData.createdBy           = vm.data.userDetails.username+"(Patient)";
                      sendData.type                = 'patient';
                      sendData.isview              = '0';
                      sendData.fromdevice          = '1';
                      vm.data.doctorEngage         = vm.findAppointment(vm.sendData.appointmentStart);
                    // sendData.appointmentEnd      = moment(new Date(sendData.appointmentEnd)).format('YYYY-MM-DD HH:mm:ss');
                      if(vm.data.doctorEngage != true){
                        // var saveData     = angular.toJson(sendData);
                        dashboardservices.makeAppointment(sendData).then(function(response){
                          if(response.data.data.status == 'success'){
                            toastr.success("Appointment Scheduled");
                            $state.reload();
                            $state.go('appointment');
                          }else{
                            toastr.error("Appointment Not Scheduled");
                          }
                        });
                      }else{
                        toastr.error("Your Appointment Time is Doctor Engages ");
                        vm.data.doctorEngage = false;
                  }
             }else{
                toastr.error("Clinic Timing:"+vm.data.date.open+'-'+vm.data.date.close);
             }
	 				}else{
            toastr.error("Clinic Off");
          }
        }
	 			}
 			}

 			function dateAdd(date, interval, units) {
			      var ret = new Date(date); //don't change original date
			      switch(interval.toLowerCase()) {
			        case 'year'   :  ret.setFullYear(ret.getFullYear() + units);  break;
			        case 'quarter':  ret.setMonth(ret.getMonth() + 3*units);  break;
			        case 'month'  :  ret.setMonth(ret.getMonth() + units);  break;
			        case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
			        case 'day'    :  ret.setDate(ret.getDate() + units);  break;
			        case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
			        case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
			        case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
			        default       :  ret = undefined;  break;
     			 }
      			return ret;
    		}

    		/*feedback  details submit*/
    		function feedbackDetailsSubmit(obj){
    			if(!$rootScope.userName){
    				toastr.error("Need To Login Before Feedback");
    			}else{
    			vm.data.submit       = true;
    			if(obj.message != undefined && obj.email != undefined && obj.name != undefined && obj.clinic != undefined ){
	    			var data      	= {};
	    			data.message  	= obj.message;
	    			data.email    	= obj.email;
	    			data.name     	= obj.name;
	    			data.clinicMail = obj.clinic.email;
            data.clinicName = obj.clinic.username;
	    			dashboardservices.feedbackDetails(data).then(function(response){
	    				if(response.data.data.status == 'success'){
	    					toastr.success("Feedback Sent Successfully");
	    					$state.reload();
	    				}
	    			});
    			}
    			}
    		}


        function checkClinicTiming(obj){
          if(vm.sendData.clinic && obj){
            var data           = false;
            var clinicTiming   = JSON.parse(vm.sendData.clinic.clinicTiming);
            if(clinicTiming[obj.getDay()].clinicOpen){
                data =  true;
            }
          }
          return data;
        }

    		/*for date disabled */
    		function dateDisabled(date,mode){
          if(vm.data.clinicAvaliable.indexOf(date.getDay()) == -1){
              return (mode === 'day' && date.getDay());
          }
    		}

 			vm.onPageLoad();
 		}
 })();
