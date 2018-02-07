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
 	'use strict';
 	angular
 		.module('practysApp')
 		.controller('billingHistoryController',billingHistoryController);
 		billingHistoryController.$inject = ['utilService','billingHistoryServices','$state','$stateParams','toastr'];

 		 function billingHistoryController(utilService,billingHistoryServices,$state,$stateParams,toastr){
 		 	var vm 					     =	this;
 		 	vm.data                  	 =   [];
 		 	vm.data.getAllInvoiceDetails =   [];
 		 	vm.data.docotorData          =   [];
 		 	vm.data.patientInvoice       =   [];
 		 	vm.data.userData         	 =   utilService.RestoreStateObj(utilService.getItem('user')); 
 		 	vm.onPageLoad            	 =   onPageLoad;
 		 	vm.getDoctorDetails      	 =   getDoctorDetails;
 		 	vm.patientInvoiceDetails     =   patientInvoiceDetails;
 		 	vm.getPatientInvoiceDetails  =   getPatientInvoiceDetails;
 		 	vm.viewPDFdocumnet           =   viewPDFdocumnet;
 		 	vm.demoFromHTML              =   demoFromHTML;
 		 	vm.dateFormat                =   dateFormat;

 		 	function dateFormat(date){
 		 		return moment(new Date(date)).format('llll');
 		 	}

 		 	/* get invoice details by patient id*/

 		 	function onPageLoad(){
 		 		if($state.current.name =='billingHistory'){
 		 			vm.data.getAllInvoiceDetails  =   [];
	 		 		var data    = vm.data.userData.id;
	 		 		billingHistoryServices.getDetails(data).then(function(response){
	 		 			if(response.data.data.status == 'success'){
	 		 				vm.data.getAllInvoiceDetails = response.data.data.message;
	 		 				utilService.saveItem('invoiceDetails',vm.data.getAllInvoiceDetails);
	 		 				vm.getDoctorDetails(vm.data.getAllInvoiceDetails);
	 		 			}else if(response.data.data.status == 'error'){
	 		 				vm.data.docotorData = [];
	 		 			}
	 		 		});
 		 		}else{
 		 			var data = $stateParams.data;
 		 			if(data == null){
 		 				$state.go('billingHistory');
 		 			}else{
 		 				vm.getPatientInvoiceDetails(data);
 		 			}
 		 		}
 		 	};


 		 	/*view PDF Document*/
 		 	function viewPDFdocumnet(obj){
 		 		 $state.go('patientDetails',{
 		 				 	data:obj
 		 				 });
 		 	}

			/* get doctor details from response*/

 		 	function getDoctorDetails(obj){
 		 		vm.data.doctorid        = []; 
 		 		vm.data.docotorData     = [];
 		 		angular.forEach(obj,function(value,key){
 		 			if(vm.data.doctorid.indexOf(value.doctorId) == -1){
 		 					vm.data.doctorid.push(value.doctorId);
 		 					vm.data.docotorData.push(value.doctor);
 		 			}
 		 		});
 		 	}

 		 	/*get paticular patient invoice details*/

 		 	function getPatientInvoiceDetails(obj){
 		 		console.log(obj,"invopice details");
 		 		vm.data.getInvoiceData   = utilService.RestoreStateObj(utilService.getItem('invoiceDetails'));
 		 		vm.data.patientInvoice   = [];
 		 		angular.forEach(vm.data.getInvoiceData,function(value,key){
 		 			if(value.doctorId == obj.id && value.paymentStatus != 'unpaid'){
 		 				vm.data.patientInvoice.push(value);
 		 			}
 		 		});
 		 		console.log(vm.data.patientInvoice);
 		 	}

 		 	function patientInvoiceDetails(obj){
 		 		$state.go("billingHistoryList",{data:obj});
 		 	}


 		 	/*convert html file to PDF document*/
 		 	function demoFromHTML() {
    			var pdf = new jsPDF('p', 'pt', 'letter');
    			var source = $('#customers')[0];
			    var specialElementHandlers = {
			        '#bypassme': function (element, renderer) {
			            return true
			        }
    				};
			    var margins = {
			        top: 80,
			        bottom: 60,
			        left: 40,
			        width: 522
			    };
			    pdf.fromHTML(
			    source, 
			    margins.left, 
			    margins.top, { 
			        'width': margins.width, 
			        'elementHandlers': specialElementHandlers
			    },
		    function (dispose) {
		        pdf.save('patientDetails.pdf');
		    }, margins);
		}

 		 	vm.onPageLoad();
 		 }
 })();