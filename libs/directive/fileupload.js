    
    app.directive('myFileUpload', function (utilService) {
            return function (scope, element, attrs) {
                element.bind('change', function () {
                    var index;
                    var index_file = 0;
                    for (index = 0; index < element[0].files.length; index++) {
                      utilService.setFile(element[0].files[index], index_file, attrs.myFileUpload);
                      index_file++;
                    }
                    index_file = 0;
                });
            }
        });