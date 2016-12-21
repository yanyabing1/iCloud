// var todo=[
//     {
//         id:1,
//         title:"列表1",
//         color:'rgba(201,112,227,1)',
//         list:[
//             {
//                 title:'列表1未完成',
//                 done:false
//             },
//             {
//                 title:'列表1未完成',
//                 done:false
//             },
//             {
//                 title:'列表1',
//                 done:true
//             }
//         ]
//     },
//     {
//         id:2,
//         title:"列表2",
//         color:'rgba(109,219,49,1)',
//         list:[
//             {
//                 title:"列表2未完成",
//                 done:false
//             },
//             {
//                 title:"列表2未完成",
//                 done:false
//             },
//             {
//                 title:"列表2",
//                 done:true
//             }
//         ]
//     },
//     {
//         id:3,
//         title:"列表3",
//         color:'rgba(65,172,249,1)',
//         list:[
//             {
//                 title:"列表3未完成",
//                 done:false
//             },
//             {
//                 title:"列表3",
//                 done:true
//             },
//             {
//                 title:"列表3",
//                 done:true
//             }
//         ]
//     }
// ];
var todo=[];
var colors=['rgba(201,112,227,1)','rgba(109,219,49,1)','rgba(65,172,249,1)','rgba(243,203,0,1)','rgba(159,133,93,1)','rgb(247,36,105,1)','rgba(249,150,0,1)'];
var ctrl=angular.module('ctrl',['sevice']);
ctrl.controller('c',function ($scope,$filter,localS) {
    $scope.todo=localS.getdata();
    $scope.index=0;
    $scope.colors=colors;
    $scope.comfalg=false;
    $scope.add = function () {
        $scope.index=$scope.todo.length;
        var id=$scope.todo[$scope.todo.length-1].id+1;
        var i=$scope.todo.length%7;
        $scope.todo.push({
            id:id,
            color:colors[i],
            title:'新列表'+id,
            list:[]
        })
        localS.savedata($scope.todo);
    };
    //选择指定列表
    $scope.select=function (i) {
        $scope.index=i;
        $scope.setShow=false;
        localS.savedata($scope.todo);
    }
    $scope.setShow=false;
    //点击选项setbox出现和隐藏
    $scope.change=function () {
        $scope.setShow=!$scope.setShow;
        $scope.cColor=$scope.todo[$scope.index].color;
        $scope.Ttitle=$scope.todo[$scope.index].title;
        localS.savedata($scope.todo);
    }
    // 左侧列表前图标颜色
        $scope.changeColor=function (c) {
        $scope.cColor=c;
        $scope.Ttitle=$scope.todo[$scope.index].title;
        localS.savedata($scope.todo);
    }
    //完成
    $scope.done=function () {
        var o=$scope.todo[$scope.index];
        o.color=$scope.cColor;
        o.title=$scope.Ttitle;
        $scope.setShow=false;
        localS.savedata($scope.todo);
    };
    //取消
    $scope.cancel=function () {
        $scope.setShow=false;
        localS.savedata($scope.todo);
    }
    //删除
    $scope.del=function () {
        $scope.todo.splice($scope.index,1);
        $scope.setShow=false;
        $scope.index=0;
        localS.savedata($scope.todo);
    };
    //确定
    $scope.click=function () {
        $scope.comfalg=!$scope.comfalg;
    };
    //已完成计数
    $scope.cnum=function () {
        var o=$scope.todo[$scope.index].list;
        $scope.num=$filter('filter')(o,{'done':true}).length
        localS.savedata($scope.todo);
    };
    //已完成和未完成状态转换
    $scope.changestate=function (v,s) {
        v.done=s;
        $scope.cnum();
        localS.savedata($scope.todo);
    };
    $scope.f=false;
    $scope.i=-1;
    //已完成和未完成背景
    $scope.changebg=function (o,i) {
        if(o.done){
            $scope.f=true;
        }else {
            $scope.f=false;
        }
        $scope.i=i;
    };
    // $scope.changetext=function (o,e) {
    //
    //     o.title=e.target.innerHTML;
    // };
    $scope.$watch('index',function () {
        $scope.cnum()
        localS.savedata($scope.todo);
    }),
        //右侧添加新列表
    $scope.newpro=function(){
        var list=$scope.todo[$scope.index].list;
        list.push({
            title:'',
            done:false
        })
        localS.savedata($scope.todo);
    },
    //清除已完成第一种方法（会出问题 list中length改变，导致清除不干净）
    // $scope.qingchu=function(){
    //     var list=$scope.todo[$scope.index].list;
    //     for( var i;i<list.length;i++){
    //         if(list[i].done){
    //             list.splice(i,1);
    //         }
    //     }
    // }
    //清除已完成第二种方法
    $scope.qingchu=function(){
        var list=$scope.todo[$scope.index].list;
        $scope.todo[$scope.index].list=$filter('filter')(list,{done:false});
        $scope.cnum();
    }
    // 失去焦点保存数据
    $scope.saveData=function(){
        localS.savedata($scope.todo)
    }
})
