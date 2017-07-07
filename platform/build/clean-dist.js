/**
 * Created by yichengjie on 2017/5/16.
 */
var fs = require('fs'); // 引入fs模块
var path = require('path') ;
var distPath = path.join(__dirname, '../dist') ;

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

deleteall(distPath)//将文件夹传入即可