import React,{Component,PureComponent} from 'react' ;
import PropTypes from 'prop-types' ; 
import {Tooltip} from 'antd'; 
interface EllipsisProps{
    width?:number ;
    children:string;
}
function Ellipsis (props:EllipsisProps){
    let width = props.width || 150 ;
    let style = {width:  width+'px'} ;
    return(
        <Tooltip placement="topLeft" title={props.children}>
            <span className="ellipsis" style={style}>
                {props.children}
            </span>
        </Tooltip>
    ) ;
} 
export default Ellipsis ;
