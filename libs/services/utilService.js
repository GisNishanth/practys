/*********************************************************************
 *
 *  Great Innovus Solutions Private Limited
 *
 *  Module          :   Task
 *
 *  Description     :   Task Service
 *
 *  Developer       :   karthick
 * 
 *  Date            :   30/08/2016
 *
 *  Version         :   1.0
 *
 **********************************************************************/
 

 (function () {
    'use strict';

 angular
    .module('practysApp')
    .factory('utilService', utilService);

    utilService.$inject = ['$q', '$window','$location','commonService','__env'];

    function utilService ($q, $window,$location,commonService,__env) {

          var service = {
            SaveStateObj: SaveStateObj,
            RestoreStateObj: RestoreStateObj,
            getItem: getItem,
            saveItem: saveItem,
            savetoken:savetoken,
            setFile : setFile

          };

          var url = __env.apiUrl;

        return service;


       

        /* functions to save and retrieve object in localstorage */

        function SaveStateObj(obj) {
            return angular.toJson(obj);
        }

        function RestoreStateObj(obj) {
            return angular.fromJson(obj);
        }

        function getItem(name) 
        {
            return $window.localStorage.getItem(name);
        }

        function saveItem(name, config_data) 
        {

            if(config_data)
                $window.localStorage.setItem(name, SaveStateObj(config_data));
            else
                $window.localStorage.removeItem(name);

        }
          function savetoken(name, token) 
        {

            if(token)
                $window.localStorage.setItem(name, token);
            else
                $window.localStorage.removeItem(name);

        }

        function setFile(newFile, index, name) {
            console.log(file);
            if (index === 0 && file === undefined){
                file[name] = [];
                file[name][index] = newFile;
            }
            else if (index === 0 && file[name] === undefined){
                file[name] = [];
                file[name][index] = newFile;
            }
        }

    }

})();

