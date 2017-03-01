(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	//创建一个模块,作为主模块
	var myApp = angular.module('myToDoMvc',[]);
	//注册一个主控制器
	myApp.controller('MainController',['$scope', function ($scope) {
		function getId(){
			var id = Math.random();
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id === id){
					id = getId();//这里不使用arguments.callee，主要是因为ES5严格模式下废除了该功能
					break;
				}
			}
			return id;
		}
		//文本框需要一个模型
		$scope.text = '';

		//任务列表:每个任务为一个对象
		$scope.todos = [
			{id:0.01,text:"sleep",completed:false},
			{id:0.00002,text:"study",completed:false},
			{id:0.389,text:"play",completed:true},
		];

		//添加一个任务
		$scope.addTask = function () {
			if($scope.text == ''){
				return;
			}
			$scope.todos.push({id:getId(),text:$scope.text,completed:false});
			//并且清空文本框模型中的数据
			$scope.text = '';
		};

		//删除任务
		$scope.removeTask = function (taskId) {

			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id === taskId){
					$scope.todos.splice(i,1);
					break;
				}
			}
		};

		//清空已经完成的任务项
		$scope.clearTasks = function () {
			var tempArr = [];
			for(var i=0;i<$scope.todos.length;i++){
				if(!$scope.todos[i].completed){
					tempArr.push($scope.todos[i]);
				}
			}

			$scope.todos = tempArr;
		};

		//动态清除任务项
		$scope.isShowItem = function () {
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].completed){
					return true;
				}
			}

			return false;
		};
		$scope.currentEditingId = -1;
		//编辑任务
		$scope.edit = function (taskId) {
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id === taskId){
					if($scope.todos[i].completed){
						$scope.currentEditingId = -1;
						alert("has completed task can not be edit o(^▽^)o");
					}else {
						$scope.currentEditingId = taskId;
					}
				}
			}
		};

		//处理编辑回车的问题:停止编辑
		$scope.stopEditing = function () {
			$scope.currentEditingId = -1;
		};

		//全选/反选
		var isChecked = true;
		$scope.check = function () {
			for(var i=0;i<$scope.todos.length;i++){
				$scope.todos[i].completed = isChecked;
			}

			isChecked = !isChecked;
		}

	}]);

})(angular);
