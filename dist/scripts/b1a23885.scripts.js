"use strict";angular.module("vnbidding.github.ioApp",["firebase"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/user",{templateUrl:"views/user.html",controller:"UserCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("vnbidding.github.ioApp").controller("MainCtrl",["$scope","auth","$rootScope","safeApply","angularFireCollection",function(a,b,c,d,e){var f="https://bidding.firebaseio.com/bids";a.bids=e(new Firebase(f).limit(5)),a.auction={id:1,name:"HTC One X+",image:"http://images.anandtech.com/doci/6348/HTC%20One%20X%20Global%20Front%20and%20Back2_575px.jpg",description:"Đấu giá điện thoại của NguyenNB",topPrice:1e3,startTime:new Date(2013,6,26).getTime(),endTime:new Date(2013,7,1).getTime()},a.price=Math.floor(1500*Math.random()),a.bid=function(){var b={userId:a.user.id,name:a.user.name,username:a.user.username},c=a.price,d=a.auction.id;a.bids.add({user:b,auction:{auctionId:d},bidPrice:c,bidTime:Firebase.ServerValue.TIMESTAMP})},c.$on("login",function(b,c){a.user=c,d(a)})}]),angular.module("vnbidding.github.ioApp").controller("UserCtrl",["$scope","auth","$rootScope","safeApply","angularFireCollection",function(a,b,c,d){a.login=function(a,c){b.login(a,c)},a.logout=function(){b.logout(),d(a)},a.bid=function(){var b=a.item.price,c=a.item.name;a.bids.add({user:a.user.username,price:b,name:c})},c.$on("login",function(b,c){a.user=c,d(a)}),c.$on("logout",function(){delete a.user,d(a)})}]),angular.module("vnbidding.github.ioApp").factory("auth",["$rootScope",function(a){var b=new Firebase("https://bidding.firebaseio.com"),c=new FirebaseAuthClient(b,function(b,c){c?a.$emit("login",c):b?a.$emit("loginError",b):a.$emit("logout")});return{login:function(a,b){c.login(a,b)},logout:function(){c.logout()},loginError:function(a){alert(a)}}}]),angular.module("vnbidding.github.ioApp").factory("safeApply",function(){return function(a,b){var c=a.$root.$$phase;"$apply"==c||"$digest"==c?b&&a.$eval(b):b?a.$apply(b):a.$apply()}});