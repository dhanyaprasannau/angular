var app=angular.module('myApp',["ngRoute"])

app.config([ '$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {   
        
        $routeProvider
        .when('/article/:articleId', {
            templateUrl : 'article.html',
            controller : 'ArticleController'
        })
        .when('/',{
            templateUrl : 'welcome.html'
        })
        .when('/home',{
            templateUrl : 'welcome.html'
        })
        .when('/articles',{
            templateUrl : 'articles.html',
            controller : 'ArticlesController'
        })
        .when('/users',{
            templateUrl : 'users.html',
            controller : 'UsersController'
        })
        .when('/user/:userId', {
            templateUrl : 'user.html',
            controller : 'UserController'
        })

        .otherwise({
            redirectTo : '/'
        });
        //$locationProvider.html5Mode(true); //Remove the '#' from URL.
    } 
]);

app.controller('UsersController',function($scope,$http){
   
    $http.get("http://localhost:8080/user/user"
    ).then(function(response){
         $scope.users=response.data;
    },function(response){
         $scope.users=response.statusText;
    }); 

    $scope.addUser = function(){
        var dataObj = {"name":$scope.name};
        $http.post("http://localhost:8080/user/user",dataObj
        ).then(function(response){
             dataObj.userId=response.headers().location.split("/").pop();
             $scope.name="";
             $scope.users.push(dataObj);
        },function(response){
              console.log("fail");
        });  
    }

    $scope.removeUser= function(index,user){
        console.log(user.userId);
        $http.delete("http://localhost:8080/user/user/"+user.userId
        ).then(function(response){
             $scope.users.splice(index,1)
        },function(response){
              console.log("fail");
        });  
    }
    
});

app.controller('UserController',function($scope,$http,$routeParams){
    console.log($routeParams);
    $scope.articleList = false;
    $http.get("http://localhost:8080/user/user/"+$routeParams.userId
    ).then(function(response){
         $scope.user = response.data; 
         console.log($scope.user.article);
         var id=$scope.user.article[0];
         console.log(" Id="+id);
         if(id){
            $scope.articleList = true;
         }
         else
            console.log("fail");
    },function(response){
         $scope.user = response.statusText;
    });
});




app.controller('ArticleController',function($scope, $http, $routeParams){
        
    $http.get("http://localhost:8080/user/article/"+$routeParams.articleId
    ).then(function(response){
         $scope.article = response.data; 
     $scope.title = $scope.article.title;
         $scope.category = $scope.article.category;
    },function(response){
         $scope.article = response.statusText;
    });

    $scope.updateArticle = function(){
        article={};
        article.articleId=$routeParams.articleId;
        article.title = $scope.title;
        article.category = $scope.category;
        $http.put("http://localhost:8080/user/article",article
        ).then(function(response){
            history.back();
        },function(response){
            console.log("fail");
        });  
    }
});

app.controller('ArticlesController',function($scope,$http){
    $scope.save="Add";
    $scope.listPage=true;
    $scope.viewPage=false;
    $http.get("http://localhost:8080/user/articles"
    ).then(function(response){
         $scope.articles=response.data;
    },function(response){
         $scope.articles=response.statusText;
    }); 

    $scope.addArticle = function(){
        var dataObj = {"title":$scope.title,"category":$scope.category};
        $http.post("http://localhost:8080/user/article",dataObj
        ).then(function(response){
             console.log(response.headers());
             dataObj.articleId=response.headers().location.split("/").pop();
             $scope.title="";
             $scope.category="";
             console.log(dataObj);
             $scope.articles.push(dataObj);
        },function(response){
              console.log("fail");
        });  
    }

    $scope.removeArticle = function(index,article){
        $http.delete("http://localhost:8080/user/article/"+article.articleId
        ).then(function(response){
             $scope.articles.splice(index,1)
        },function(response){
              console.log("fail");
        });  
    }

    // $scope.editArticle = function(index,article){
    //     $scope.title = article.title;
    //     $scope.category = article.category;
    //     $scope.save="Update";
          
    // }

    // $scope.viewArticle = function(article){
    //     $scope.listPage=false;
    //     $scope.viewPage=true;
    // }
    
});