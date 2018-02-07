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
 			.controller('patientDetailsController',patientDetailsController);
 		
 		patientDetailsController.$inject = ['$state','$stateParams','$scope'];


 		function patientDetailsController($state,$stateParams,$scope){
 			var vm						= this;
 			vm.data                 	= [];
 			vm.onPageLoad           	= onPageLoad;
 			// vm.demoFromHTML         	= demoFromHTML;
 			vm.createPDF            	= createPDF;
 			// vm.taxCalculation  			= taxCalculation;
 			// vm.balanceCalculation 		= balanceCalculation;
 			// vm.getTableRowCounter       = getTableRowCounter;
 			$scope.fileReaderSupported  = window.FileReader != null;
 			vm.data.counter         	= 0;
 			vm.addAmounts 				= addAmounts;
 			vm.taxCal 					= taxCal;
 			vm.dateFormat 				= dateFormat;

 		//customizing date format   -Nishant

 		function dateFormat(date){
 			return moment(new Date(date)).format('ll');
 		}

 	
 		function onPageLoad(){
 				vm.data.PatientDetails  	= $stateParams.data;
 				console.log(vm.data.PatientDetails);
 				if(vm.data.PatientDetails){
 					if(vm.data.PatientDetails.Appointment){
 						if(vm.data.PatientDetails.Appointment.prescription)
 								vm.data.PatientDetails.prescriptions = JSON.parse(vm.data.PatientDetails.Appointment.prescription);
 					}else{
 						vm.data.PatientDetails.prescriptions = JSON.parse(vm.data.PatientDetails.manualInvoiceItems);
 					}
 					if(vm.data.PatientDetails.additionalItems)
 						vm.data.PatientDetails.additionalItemJson = JSON.parse(vm.data.PatientDetails.additionalItems);
 					if(vm.data.PatientDetails.serviceList)
 						vm.data.PatientDetails.serviceListJson = JSON.parse(vm.data.PatientDetails.serviceList);
 					if(!vm.data.PatientDetails.discount)
 						vm.data.PatientDetails.discount = 0;
 					if(!vm.data.PatientDetails.tax)
 						vm.data.PatientDetails.tax   = 0;

 					// vm.data.PatientDetails.paidDate = vm.dateFormat(vm.data.PatientDetails.modified);
 				}else{
 					$state.go('billingHistory');
 				}
 		}

 		//Balance calculation     -Nishant

 		function addAmounts(pendingAmount,appointmentBalanceAmount){
        	//alert(pendingAmount+ ''+ appointmentBalanceAmount);
        	// alert("success");
          return parseFloat(pendingAmount)+parseFloat(appointmentBalanceAmount);
        }

       	//tax calculation     -Nishant

        function taxCal(obj){
        	console.log(obj);
        	if(obj != undefined){
        		var tx = (obj.tax != '' && obj.tax != undefined) ? parseFloat(obj.amount * (obj.tax/100)) : 0;
	        	var disc = (obj.discount != '' && obj.discount != undefined) ? parseFloat(obj.amount * (obj.discount/100)) : 0;
	        	var taxdiscValue = (obj.amount  - disc + tx).toFixed(2);
	        	// if(obj.appointmentBalanceAmount){
	        	// 	var total = parseFloat(taxdiscValue)+parseFloat(obj.appointmentBalanceAmount);
	        	// }else{
	        	var total = parseFloat(taxdiscValue);
	        	// }
	          return total;
        	}

        }


 		// // Tax & Discount calculation...

 		// function taxCalculation(datas){
 		// 	var subamt       =    parseFloat(datas.amount);
   //      	var discount     =   (datas.discount != undefined && datas.discount != '') ? parseFloat(subamt * (datas.discount/100)) : 0;

   //          var amt          =   subamt - discount;
   //      	var tax          =   (datas.tax != '' && datas.tax != undefined) ? parseFloat(subamt * (datas.tax/100)) : 0;
   //      	$scope.subTotal  = (amt + tax).toFixed(2);
   //      	return $scope.subTotal;
 		// }

 		// // balance  calculation...
 		// function balanceCalculation(datas){
 		// 	var appointmentBalanceAmount = (datas.appointmentBalanceAmount != undefined && datas.appointmentBalanceAmount != '') ? datas.appointmentBalanceAmount : 0;
 		// 	if(appointmentBalanceAmount == 0){
 		// 		var balance = parseFloat(datas.pendingAmount).toFixed(2);
 		// 	}else if(appointmentBalanceAmount && datas.pendingAmount == 0){
 		// 		var balance = parseFloat(appointmentBalanceAmount).toFixed(2);
 		// 	}else{
 		// 		var balance = (parseInt(appointmentBalanceAmount) + parseFloat($scope.subTotal)).toFixed(2);
 		// 	}
 			
 		// 	return balance;
 		// }
 			
 		function demoFromHTML(){	
 		
		}

			var form    = $('#form'),
 			cache_width = form.width(),
 					a4  =[ 595.28,  841.89]; 

 			function createPDF(){

			}

		var form = $('#exportable'),
		cache_width = form.width(),
		a4  =[ 595.28,  841.89];  // for a4 size paper width and height

		$scope.createPDF = function(){
			var date  = moment().format('YYYY-MM-DD HH:mm:ss');
			$scope.getCanvas().then(function(canvas){
			 var 
			 img = canvas.toDataURL("image/png"),
			 doc = new jsPDF({
			         unit:'px', 
			         format:'a4'
			       });
			       doc.addImage(img, 'JPEG', 30, 90);
			       doc.save(date+'.pdf');
			       form.width(cache_width);
			});
		}
		// create canvas object
		$scope.getCanvas = function(){
			form.width((a4[0]*1.33333) -80);
			return html2canvas(form,{
			    imageTimeout:2000,
			    removeContainer:true
			   }); 
		}

		 $scope.getDataUri = function(url, callback) {
		    var image = new Image();

		    image.onload = function () {
		        var canvas = document.createElement('canvas');
		        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
		        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

		        canvas.getContext('2d').drawImage(this, 0, 0);

		        // Get raw image data
		        callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

		        // ... or get as Data URI
		        callback(canvas.toDataURL('image/png'));
    			};
    	  image.src = url;
		}


		 

			function getCanvas(){
				 form.width((a4[0]*1.33333) -80);
				 return html2canvas(form,{
				     imageTimeout:2000,
				     removeContainer:true
				    }); 
			};		

 			vm.onPageLoad();

 		};

 })();


// function demoFromHTML() {
//  				var data = vm.data.PatientDetails;
//  				console.log(data);
//  				var doc = new jsPDF();
//  				doc.text(80,10,"INVOICE DETAILS");
//  				doc.text(10,20,"Bill To");
//  				doc.text(31,20,data.patient.username);
//  				doc.text(31,30,data.patient.address);
//  				doc.text(31,40,data.patient.city);
//  				doc.text(10,60,"Remittance");
//  				doc.setFontSize(8);
//  				doc.text(31,70,"To ensure proper credit, please enclose a copy of this statement");
//  				doc.text(10,75,"with you check and remit to:");
//  				doc.setFontSize(15);
//  				doc.text(51,80,data.clinic.firstName);
//  				// doc.text(51,90,data.clinic.address);
//  				// doc.text(51,100,data.clinic.username);
//  				doc.text(150,60,"Ammount Summary");
// // We'll make our own renderer to skip this editor
// var specialElementHandlers = {
// 	'#editor': function(element, renderer){
// 		return true;
// 	}
// };

// // All units are in the set measurement for the document
// // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
// doc.fromHTML($('#render_me').get(0), 25, 110, {
// 	'width': 170, 
// 	'elementHandlers': specialElementHandlers
// });
				
// 					doc.save('patientDetails.pdf');
 				
// 			}




		// 	var form = $('#exportable'),
		// cache_width = form.width(),
		// a4  =[ 595.28,  841.89];  // for a4 size paper width and height

		// $scope.createPDF = function()
		// {
		// $scope.getCanvas().then(function(canvas){
		//  var 
		//  img = canvas.toDataURL("image/png"),
		//  doc = new jsPDF({
		//          unit:'px', 
		//          format:'a4'
		//        }); 
		//                doc.setFontSize(12);
		//                // doc.text("Spot Check Report", 15, 15);    
		//        doc.addImage(img, 'JPEG', 20, 20);
		//        doc.save('SpotCheckReport.pdf');
		//        form.width(cache_width);
		// });
		// }
		// // create canvas object
		// $scope.getCanvas = function()
		// {
		// form.width((a4[0]*1.33333) -80).css('max-width','none');
		// return html2canvas(form,{
		//     imageTimeout:2000,
		//     removeContainer:true
		//    }); 
		// }


			/*html file to pdf conversion*/
//  			function demoFromHTML(){
//  					var data = vm.data.PatientDetails;
//  				console.log(data);
//  				var doc = new jsPDF();
//  				doc.text(80,10,"INVOICE DETAILS");
//  				doc.text(10,20,"Bill To");
//  				doc.text(31,20,data.patient.username);
//  				doc.text(31,30,data.patient.address);
//  				doc.text(31,40,data.patient.city);
//  				doc.text(10,60,"Remittance");
//  				doc.setFontSize(8);
//  				doc.text(31,70,"To ensure proper credit, please enclose a copy of this statement");
//  				doc.text(10,75,"with you check and remit to:");
//  				doc.setFontSize(15);
//  				doc.text(51,80,data.clinic.firstName);
//  				// doc.text(51,90,data.clinic.address);
//  				// doc.text(51,100,data.clinic.username);
//  				doc.text(150,60,"Doctor Details:");
//  				doc.text(140,80,"DoctorName:");
//  				doc.text(140,90,"speciality:");
//  				doc.text(140,100,"service");
//  				doc.text(200,80,data.doctor.firstName);
//  				// doc.text(200,90,data.doctor.doctorname);
//  				// doc.text(200,100,data.doctor.service);
// // We'll make our own renderer to skip this editor
// var specialElementHandlers = {
// 	'#editor': function(element, renderer){
// 		return true;
// 	}
// };

// // All units are in the set measurement for the document
// // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
// doc.fromHTML($('#render_me').get(0), 25, 110, {
// 	'width': 170, 
// 	'elementHandlers': specialElementHandlers
// });
				
// 					doc.save('patientDetails.pdf');
//  			}


// getCanvas().then(function(canvas){
// 				  var 
// 				  // img = canvas.toDataURL("image/png"),
// 				  doc = new jsPDF({
// 				          unit:'px', 
// 				          format:'a4'
// 				        });     
// 				        // doc.addImage(img, 'JPEG', 20, 20);
// 				        doc.save('techumber-html-to-pdf.pdf');
// 				        form.width(cache_width);
// 				 });