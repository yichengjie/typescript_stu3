import React,{Component,PureComponent} from 'react' ;
import PropTypes from 'prop-types' ; 
import {Tooltip} from 'antd'; 

class Ellipsis  extends PureComponent{
    render(){
        let style = {width:this.props.width +'px'} ;
        return(
            <Tooltip placement="topLeft" title={this.props.children}>
                <span className="ellipsis" style={style}>
                    {this.props.children}
                </span>
            </Tooltip>
        ) ;
    }
} 


Ellipsis.propsTypes ={
    width:PropTypes.number,
    children:PropTypes.string
} ;

Ellipsis.defaultProps = {
   width:150
};

export default Ellipsis ;
