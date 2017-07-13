;(function(window,undefined){
    // function createDynamicLoadPageResoureFn(entryName){
    //     return function(){
    //         new DynamicLoadPageResoure(entryName) ;
    //     } ;
    // }

    function getContextPath(){
        var contextPathNode = document.getElementById('contextPath') ;
        var contextPath =  (contextPathNode && contextPathNode.value) || '';
        return contextPath ;
    }
    
    
    function specialDealUrl(url) {
        var contextPath =  getContextPath();
        return contextPath + '/dist/'+ url ;
    }

    function DynamicLoadPageResoure(entryName,contextPath){
        this.contextPath = contextPath || '' ;
        this.entryName = entryName ;
        this.entryInfoObj = null ;
        this.init() ;
    }

    DynamicLoadPageResoure.prototype.init = function(){
        var url = 'chunk-manifest.json?t=' + Date.now() ;
        url = specialDealUrl.call(this,url) ;
        axios.get(url)
        .then(function (response) {
            var manifestJson = response.data ;
            var entryInfoObj = this.getEntryFileInfo(manifestJson) ;
            this.entryInfoObj = entryInfoObj ;
            //将script，css加载到页面中去
            this.loadPageResoures() ;
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        }); ;
    }


    DynamicLoadPageResoure.prototype.getEntryFileInfo = function(manifestJson){
        if(this.entryName.indexOf('.js') === -1){
            this.entryName = this.entryName+'.js' ;
        }
        var cssUrl = manifestJson['vendor.css'] ;
        var js1Url = manifestJson['vendor.js'] ;
        var js2Url = manifestJson[this.entryName] ;

        cssUrl = specialDealUrl.call(this,cssUrl) ;
        js1Url = specialDealUrl.call(this,js1Url) ;
        js2Url = specialDealUrl.call(this,js2Url) ;

        return {
            css:[cssUrl],
            js:[js1Url,js2Url]
        } ;
    }

    DynamicLoadPageResoure.prototype.loadPageResoures = function(){
       this.loadPageCss() ;
       this.loadPageJs() ;
    }

    DynamicLoadPageResoure.prototype.loadPageCss = function(callback) {
        var cssArr = this.entryInfoObj['css'] ;
        addCssToHead(cssArr[0],callback) ;
    }

    DynamicLoadPageResoure.prototype.loadPageJs = function(callback) {
        var jsArr = this.entryInfoObj['js'] ;
        addScriptToBody(jsArr[0], function (){
            addScriptToBody(jsArr[1],callback)
        }) ;
    }

    function addCssToHead(href,callback){
        // <link rel="stylesheet" href="antd/antd.min.css">
        var head= document.getElementsByTagName('head')[0]; 
        var link = document.createElement('link') ; 
        link.rel = 'stylesheet' ;
        link.href = href ;
        if(callback){
           link.onload = callback ;  
        }
        head.appendChild(link) ;
    }

    function addScriptToBody(src,callback){
        var script = document.createElement('script') ;
        script.type= 'text/javascript'; 
        script.src= src; 
        if(callback != null){
            script.onload = callback ;
        }
        document.body.appendChild(script); 
    }

    window.DynamicLoadPageResoure = DynamicLoadPageResoure ;

})(window,undefined) ;


