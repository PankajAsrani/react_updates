import { useContext } from "react"
import { HookContext } from "./CoreHooks"

const Child1= ({greet}) => {

    console.log("Child 1 called")

    const ctx = useContext(HookContext)

    return <h1>
        {greet}
        <button onClick={()=> ctx.setB(ctx.b + 1)}>Update Context</button>
    </h1>
}

export default Child1