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
    let $contextPath = $("#contextPath") ;
    return $contextPath.val() ;
}

export default {
    jsonSyntaxHighlight,
    simpleFormat2JsonStr,
    getContextPath,
    validateJSONStr
} ;

