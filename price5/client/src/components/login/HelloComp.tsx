import React from 'react'; 

interface HelloCompStates{
    isChecked:boolean ;
}

class HelloComp extends React.Component<any,HelloCompStates>{
   constructor(props:any) {
        super(props);
        this.state = {isChecked: false};
        // bind manually because React class components don't auto-bind
        // http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding
        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        console.info('hello world') ;
        this.setState({isChecked: !this.state.isChecked});
    }
    render() {
        return (
            <label>
                <input
                    type="checkbox"
                    checked={this.state.isChecked}
                    onChange={this.onChange}
                />
                {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
            </label>
    );
  }
}

export default HelloComp ;
