"use strict";angular.module("vnbidding.github.ioApp",["firebase"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/user",{templateUrl:"views/user.html",controller:"UserCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("vnbidding.github.ioApp").controller("MainCtrl",["$scope","auth","$rootScope","safeApply","angularFireCollection",function(a,b,c,d,e){a.bids=e("https://bidding.firebaseio.com/bids"),c.$on("login",function(b,c){a.user=c,d(a)})}]),angular.module("vnbidding.github.ioApp").controller("UserCtrl",["$scope","auth","$rootScope","safeApply","angularFireCollection",function(a,b,c,d,e){a.bids=e("https://bidding.firebaseio.com/bids"),a.login=function(a,c){b.login(a,c)},a.logout=function(){b.logout(),d(a)},a.bid=function(){var b=a.item.price,c=a.item.name;a.bids.add({user:a.user.username,price:b,name:c})},c.$on("login",function(b,c){a.user=c,d(a)}),c.$on("logout",function(){delete a.user,d(a)})}]),angular.module("vnbidding.github.ioApp").factory("auth",["$rootScope",function(a){var b=new Firebase("https://bidding.firebaseio.com"),c=new FirebaseAuthClient(b,function(b,c){c?a.$emit("login",c):b?a.$emit("loginError",b):a.$emit("logout")});return{login:function(a,b){c.login(a,b)},logout:function(){c.logout()},loginError:function(a){alert(a)}}}]),angular.module("vnbidding.github.ioApp").factory("safeApply",function(){return function(a,b){var c=a.$root.$$phase;"$apply"==c||"$digest"==c?b&&a.$eval(b):b?a.$apply(b):a.$apply()}});