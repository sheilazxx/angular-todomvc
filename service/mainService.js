/**
 * Created by hc on 2017/3/2.
 */

(function (angular) {
	"use strict";
	var serviceModule = angular.module('app.service.main',[]);
	//服务一般用于处理业务逻辑(一般能够重复使用),第二个参数中的函数就是服务的构造函数
	serviceModule.service('mainService',['$window',function ($window) {
		//任务列表:每个任务为一个对象
		var storage = $window.localStorage;
		var todos = storage['my_todo_list'] ? JSON.parse(storage['my_todo_list']) : [];
		 this.getToDos = function(){
			return todos;
		 };
		this.saveData = function() {
			storage['my_todo_list'] = JSON.stringify(todos);
		};
		function getId(){
			var id = Math.random();
			for(var i=0;i<todos.length;i++){
				if(todos[i].id === id){
					id = getId();//这里不使用arguments.callee，主要是因为ES5严格模式下废除了该功能
					break;
				}
			}
			return id;
		}
		//添加一个任务
		this.addTask = function (text) {
			todos.push({id:getId(),text:text,completed:false});
			this.saveData();
		};

		//删除任务
		this.removeTask = function (taskId) {

			for(var i=0;i<todos.length;i++){
				if(todos[i].id === taskId){
					todos.splice(i,1);
					break;
				}
			}
			this.saveData();
		};

		//清空已经完成的任务项
		this.clearTasks = function () {
			var tempArr = [];
			for(var i=0;i<todos.length;i++){
				if(!todos[i].completed){
					tempArr.push(todos[i]);
				}
			}
			todos = tempArr;
			this.saveData();
			return todos;
		};

		//动态清除任务项
		this.isShowItem = function () {
			for(var i=0;i<todos.length;i++){
				if(todos[i].completed){
					return true;
				}
			}

			return false;
		};

		//全选/反选
		var isChecked = true;
		this.check = function () {
			for(var i=0;i<todos.length;i++){
				todos[i].completed = isChecked;
			}
			isChecked = !isChecked;
			this.saveData();
		}


	}]);

})(angular);
