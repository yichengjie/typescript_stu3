export function jsonSyntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

export function simpleFormat2JsonStr(jsObj){
    return JSON.stringify(jsObj,null,4) ;
}

export function validateJSONStr(jsonStr){
    try {
        JSON.parse(jsonStr) ; 
        return true ; 
    } catch (error) {
        return false; 
    }
}

export function getContextPath() {
    let value = '' ;
    let contextPathNode = document.getElementById('contextPath') ;
    if(contextPathNode != null){
        value = contextPathNode.value ;
    }
    return value ;
}

export function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        }
        else {
            len += 1;
        }
    }
    return len;
}

export default {
    jsonSyntaxHighlight,
    simpleFormat2JsonStr,
    getContextPath,
    validateJSONStr,
    getByteLen
} ;

