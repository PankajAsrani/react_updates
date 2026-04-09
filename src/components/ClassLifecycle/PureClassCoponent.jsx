import { PureComponent } from "react";

class PureClassComponent extends PureComponent{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.warn("Pure component mount")
    }

    componentDidUpdate(){
        console.warn("Pure component update")
    }

    render(){
        return <div>{this.props.name}</div>
    }
}

export default PureClassComponent