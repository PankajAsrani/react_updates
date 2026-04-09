/* eslint-disable no-unused-vars */
import { Component } from "react";
import PureClassComponent from "./PureClassCoponent";

class Lifecycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 1,
      tog: false,
      ref: null
    };
    console.warn("constructor callled")
  }

  static getDerivedStateFromProps(props, state){
    console.warn("getDerivedStateFromProps")
    return state.b ? null : {
        b:0
    }
    // return null
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.warn("getSnapshotBeforeUpdate")
    return null;
  }

  componentDidMount() {
    console.warn("ComponentDidMount called");
    this.state.ref = setTimeout(() => {
      this.setState({
        b: 2
      })
    },1000);
    // throw new Error("Something went wrong")
}

  componentDidUpdate(prevProps, prevState) {
    console.warn("ComponentDidUpdate called");
  }

  componentWillUnmount(){
    console.warn("Componentunmount");
    if(this.state.ref){
        clearTimeout(this.state.ref)
    }
  }

  render() {
    return <>
    <button onClick={()=> this.props.setHide(true)}>Hide</button>
    <button onClick={()=> this.setState(prev => ({
        tog: !prev.tog
    }))}>Toggle</button>
    <div> value of a is : {this.state.a}/{this.state.b}</div>
    <PureClassComponent name="Pankaj"/>
    </>
  }
}

export default Lifecycle;
