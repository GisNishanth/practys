/*********************************************************************
 *
 *  Great Innovus Solutions Private Limited
 *
 *  Module      :   practysApp 
 *
 *  Description :  	records controller 
 *
 *  Date        :   24/10/2016
 *
 *  Version     :   1.0
 *
 **********************************************************************/
(function(){

	angular
		.module('practysApp')
		.controller('recordsController',recordsController);	
		recordsController.$inject=['ngDialog','utilService','recordsServices','$state','$stateParams','$scope','toastr'];

		function recordsController(ngDialog,utilService,recordsServices,$state,$stateParams,$scope,toastr){
			var vm  					          =  this;
			var tempdata         		    =  []; 
			vm.data                     =  [];
			vm.data.getPatientDetails   =  {};
			vm.data.folderImage         =  'assets/img/folder_icon.png'
			tempdata.userDetails        =  utilService.getItem('user');
			vm.data.userDetails         =  utilService.RestoreStateObj(tempdata.userDetails);
			vm.onPageLoad      		      =  onPageLoad;
			vm.patientdetails           =  patientdetails;   
			// vm.getDoctorDetails         =  getDoctorDetails;
			//vm.getPatientRecord         =  getPatientRecord;
			vm.recordsDetails           =  recordsDetails;
      vm.openDialogBox            =  openDialogBox;
      vm.makeUrl                  =  makeUrl;
      vm.dateFormat               =  dateFormat;


      function dateFormat(date){
        return moment(new Date(date)).format('llll');
      }



      function makeUrl(url,img){
        return url+img;
      }


      function openDialogBox(url,imageData){
        $scope.imageUrl  = url;
        $scope.imageData = imageData;
        ngDialog.open({
          template: 'firstDialogId',
          scope:$scope
        });
      }



			/* 
			onPageLoad function -> send patient id and get doctors details
			*/
			function onPageLoad(){
				if($state.current.name == 'myrecord'){ 
					var sendData         		= vm.data.userDetails.id;
					recordsServices.getRecords(sendData).then(function(response){
						if(response.data.data.status == 'success'){
							vm.data.userDoctor    = response.data.data.message;
						}else if(response.data.data.status == 'error'){
                vm.data.userDoctor = [];
            }
					});
				}else if($state.current.name == 'myrecordlist'){
					var data =  $stateParams.data;
					if(data){
							vm.data.getPatientDetails = $stateParams.data;
              console.log(vm.data.getPatientDetails);
						}else{
							$state.go('myrecord');
						}
				}else{
					var data 			= $stateParams.data;
					if(data == null){
						$state.go('myrecord'); // stateparams  value from myrecord is null
					}else{
						var data   = $stateParams.data;

						vm.data.patientRecordsDetails = $stateParams.data;
            if(vm.data.patientRecordsDetails.Appointment){
              if(vm.data.patientRecordsDetails.Appointment.prescription)
                   vm.data.patientRecordsDetails.prescriptions  = JSON.parse(vm.data.patientRecordsDetails.Appointment.prescription);
              if(vm.data.patientRecordsDetails.Appointment.additionalItems)
                    vm.data.patientRecordsDetails.additionalItems = JSON.parse(vm.data.patientRecordsDetails.additionalItems );    
            }
            if(vm.data.patientRecordsDetails.Invoice){
                if(vm.data.patientRecordsDetails.Invoice.serviceList)
                      vm.data.patientRecordsDetails.servicesList  = JSON.parse(vm.data.patientRecordsDetails.Invoice.serviceList);
            }
					} 										
				}
			}

			function patientdetails(obj){
				var sendData		= vm.data.userDetails.id;
				recordsServices.getRecords(sendData,obj.id).then(function(response){
						if(response.data.data.status == 'success'){
							var data   = response.data.data.message;
							$state.go('myrecordlist',{
								data : data
							});
						}else{
              toastr.error("No Data Found");
            }
					});
			}

			/* get doctor details from response*/

			// function getDoctorDetails(){
			// 	vm.data.doctorsName     = [];
			// 	vm.data.doctorDetails   = [];
			// 	angular.forEach(vm.data.userDoctor,function(value,key){
			// 	if(vm.data.doctorsName.indexOf(value.doctorId) == -1){
			// 			vm.data.doctorsName.push(value.doctor.id);
			// 			vm.data.doctorDetails.push(value.doctor);
			// 	}
			// 	});
			// }

			// function getPatientRecord(data){
			// 	vm.data.getPatientDetails    = [];
			// 	var getData                  = utilService.RestoreStateObj(utilService.getItem('userDetails'));
			// 	angular.forEach(getData,function(value,key){
			// 		if(value.doctorId == data.id)
			// 			 vm.data.getPatientDetails.push(value);
			// 	});
			// }


			/*patient records details*/
			function recordsDetails(obj){
				var pateintID   = vm.data.userDetails.id;
				recordsServices.getReport(pateintID,obj.id,obj.clinicId).then(function(response){
					if(response.data.data.status == 'success'){
							var data = {};
							 data  =  (response.data.data.message[obj.id]);//appointmnetid
							 // data.push(obj.clinic);
							 // data.push(obj.patient);
							$state.go('myrecorddetails',{
								data:data
							});
					}else if(response.data.data.status == 'error'){
              toastr.error('No Records Found');
          }
				});

			}

					//====================================
    // Slick 1
    //====================================
    $scope.number1 = [1, 2, 3, 4, 5, 6, 7, 8];
    $scope.slickConfig1Loaded = true;
    $scope.updateNumber1 = function () {
      $scope.slickConfig1Loaded = false;
      $scope.number1[2] = '123';
      $scope.number1.push(Math.floor((Math.random() * 10) + 100));
      $timeout(function () {
        $scope.slickConfig1Loaded = true;
      }, 5);
    };
    $scope.slickCurrentIndex = 0;
    $scope.slickConfig = {
      dots: true,
      autoplay: true,
      initialSlide: 3,
      infinite: true,
      autoplaySpeed: 1000,
      method: {},
      event: {
        beforeChange: function (event, slick, currentSlide, nextSlide) {
          // console.log('before change', Math.floor((Math.random() * 10) + 100));
        },
        afterChange: function (event, slick, currentSlide, nextSlide) {
          $scope.slickCurrentIndex = currentSlide;
        },
        breakpoint: function (event, slick, breakpoint) {
          // console.log('breakpoint');
        },
        destroy: function (event, slick) {
          // console.log('destroy');
        },
        edge: function (event, slick, direction) {
          // console.log('edge');
        },
        reInit: function (event, slick) {
          // console.log('re-init');
        },
        init: function (event, slick) {
          // console.log('init');
        },
        setPosition: function (evnet, slick) {
          // console.log('setPosition');
        },
        swipe: function (event, slick, direction) {
          // console.log('swipe');
        }
      }
    };

    //====================================
    // Slick 2
    //====================================
    $scope.number2 = [{label: 1, otherLabel: 1}, {label: 2, otherLabel: 2}, {label: 3, otherLabel: 3}, {
      label: 4,
      otherLabel: 4
    }, {label: 5, otherLabel: 5}, {label: 6, otherLabel: 6}, {label: 7, otherLabel: 7}, {label: 8, otherLabel: 8}];
    $scope.slickConfig2Loaded = true;
    $scope.updateNumber2 = function () {
      $scope.slickConfig2Loaded = false;
      $scope.number2[2] = 'ggg';
      $scope.number2.push(Math.floor((Math.random() * 10) + 100));
      $timeout(function () {
        $scope.slickConfig2Loaded = true;
      });
    };

    $scope.slickConfig2 = {
      autoplay: true,
      infinite: true,
      autoplaySpeed: 1000,
      slidesToShow: 3,
      slidesToScroll: 3,
      method: {}
    };

    //====================================
    // Slick 3
    //====================================
    $scope.number3 = [{label: 1}, {label: 2}, {label: 3}, {label: 4}, {label: 5}, {label: 6}, {label: 7}, {label: 8}];
    $scope.slickConfig3Loaded = true;
    $scope.slickConfig3 = {
      method: {},
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    //====================================
    // Slick 4
    //====================================
    $scope.number4 = [{label: 225}, {label: 125}, {label: 200}, {label: 175}, {label: 150}, {label: 180}, {label: 300}, {label: 400}];
    $scope.slickConfig4Loaded = true;
    $scope.updateNumber4 = function () {
      $scope.slickConfig4Loaded = false;
      $scope.number4[2].label = 123;
      $scope.number4.push({label: Math.floor((Math.random() * 10) + 100)});
      $timeout(function () {
        $scope.slickConfig4Loaded = true;
      });
    };
    $scope.slickConfig4 = {
      method: {},
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true
    };

			vm.onPageLoad();

			}
})();