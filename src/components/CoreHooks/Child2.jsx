import { forwardRef, memo, useContext, useImperativeHandle } from "react"
import PropTypes from 'prop-types';
import { HookContext } from "./CoreHooks";

// When using an arrow function with forwardRef, the issue is the component loses its name for debugging:
const Child2= memo(forwardRef(function Child2({greet, onUpdateCount}, ref) {

    const { a } = useContext(HookContext);

    useImperativeHandle(ref, () =>  ({
        updateCount : () => 5
    }))

    console.log("Child 2 called")

    return <h1>
        {greet} <button type="button" onClick={onUpdateCount}>Update count</button>
        {/* if using imperativehandle then ref to element will be undefined */}
        <button ref={ref} type="button" onClick={onUpdateCount}>Update count to 1</button>
        <div>Context Value : {a}</div>
    </h1>
}))

Child2.propTypes = {
    greet: PropTypes.string,
    onUpdateCount: PropTypes.func
}
export default Child2