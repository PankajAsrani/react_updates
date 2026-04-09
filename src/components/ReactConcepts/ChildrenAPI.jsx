import { Children, Component, createRef } from "react";

class ChildrenAPI extends Component {

    
    constructor(props){
        super(props)
        this.myRef = createRef();
    }

    componentDidMount(){
        console.log(this.myRef.current)
    }

    render(){
        return <div>
            {Children.map(this.props.children, (child, i) => <div key={i}>{child}</div>)}
            <div ref={this.myRef}>Hello create ref</div>
        </div>
    }
}

export default ChildrenAPI