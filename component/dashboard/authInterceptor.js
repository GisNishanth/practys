app.factory('Interceptor',function($rootScope,$q,toastr){
        var Interceptor ={
            responseError: function(response){
               console.log("Cannot Connect To  Server");
               toastr.error("Cannot Connect To The Server");
                // $rootScope.status = response.status;
                if(response.status == 403){
                    AuthenticationService.ClearCredentials();
                    toastr.error("Token Experied");
                }
                $q.reject(response);
                return response;
            },
            
            response: function(response){
                // $rootScope.status = response.status;
                return response;
            }
            
        };
        return Interceptor;
});