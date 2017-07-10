var fs = require('fs'); // 引入fs模块
var path = require('path') ;
var stat = fs.stat ;


//删除指定的目录
function deleteall(path) {
    var files = [];
    if(fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index) {
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteall(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

/*
* 复制目录中的所有文件包括子目录
* @param{ String } 需要复制的目录
* @param{ String } 复制到指定的目录
*/
var copy = function( src, dst ){
    // 读取目录中的所有文件/目录
    fs.readdir( src, function( err, paths ){
        if( err ){
            throw err;
        }
        paths.forEach(function( path ){
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;       
            stat( _src, function( err, st ){
                if( err ){
                    throw err;
                }
                // 判断是否为文件
                if( st.isFile() ){
                    // 创建读取流
                    readable = fs.createReadStream( _src );
                    // 创建写入流
                    writable = fs.createWriteStream( _dst );   
                    // 通过管道来传输流
                    readable.pipe( writable );
                }else if( st.isDirectory() ){// 如果是目录则递归调用自身
                    copyAllFileToPath( _src, _dst, copy );
                }
            });
        });
    });
};
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var copyAllFileToPath = function( src, dst ){
    fs.exists( dst, function( exists ){
        if( exists ){// 已存在
            copy( src, dst );
        }else{// 不存在
            fs.mkdir( dst, function(){
                copy( src, dst );
            });
        }
    });
};

function getIPAdress(){  
    var interfaces = require('os').networkInterfaces();  
    for(var devName in interfaces){  
          var iface = interfaces[devName];  
          for(var i=0;i<iface.length;i++){  
               var alias = iface[i];  
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                     return alias.address;  
               }  
          }  
    }  
} 

module.exports = {
    deleteall:deleteall,
    copyAllFileToPath:copyAllFileToPath,
    getIPAdress:getIPAdress
} ;