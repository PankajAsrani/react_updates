import { useDebugValue, useEffect, useState } from "react"

export const useCustom = (num) => {
    const [state, setState] = useState(num)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setTimeout(()=> {
            setState(num => num + 1)
            setLoading(false)
        },1000)        
    },[])

    useDebugValue("loading ->" + loading)
    useDebugValue("state ->"+  state)

    return {
        customData: state, loading
    }

}