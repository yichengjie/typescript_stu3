import {Tooltip} from 'antd'; 
import * as React from 'react' ;

interface EllipsisProps{
    width?:number ;
    children:string;
}
function Ellipsis (props:EllipsisProps){
    const width = props.width || 150 ;
    const style = {width:  width+'px'} ;
    return(
        <Tooltip placement="topLeft" title={props.children}>
            <span className="ellipsis" style={style}>
                {props.children}
            </span>
        </Tooltip>
    ) ;
} 
export default Ellipsis ;
