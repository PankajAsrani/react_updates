/* eslint-disable no-unused-vars */
import { createContext, useCallback, useDebugValue, useEffect, useInsertionEffect, useLayoutEffect, useReducer, useRef, useState } from 'react'
import Child1 from './Child1';
import Child2 from './Child2';
import { useCustom } from './useCustom';

// eslint-disable-next-line react-refresh/only-export-components
export const HookContext = createContext()

function reducer(state, action){
  switch(action.type){
    case "Add":
      return {
        ...state,
        data: [...state.data, action.payload]
      }
    }
    return state
}


const HookContextProvider = ({children}) => {

  const [a, setA] = useState(1)
  const [b, setB] = useState(1)

  return <HookContext.Provider  value={{
    a,
    setA,
    b,
    setB
  }}>
    {children}
  </HookContext.Provider>
}

function CoreHooks() {

  const [state, dispatch] = useReducer(reducer,{
    data: []
  })

  const {loading, customData} = useCustom(10)


  const [greet1, setGreet1] = useState("Hello Child 1");
  const [greet2, _] = useState("Hello Child 2");
  const [count, setCount] = useState(0)

  const ref = useRef()

  useEffect(()=>{
    console.log("count update to " + count)
    setGreet1("I have updated greet 1 with count " + count)
    // setGreet2("I have updated greet 2 with count" + count)
  },[count])
  useEffect(()=>{
    console.log(greet1 + " from useeffect")
  },[greet1])

  useEffect(()=>{
    console.log(greet2 + " from useeffect")
  },[greet2])



  const onUpdateCount = useCallback(() =>{
    setCount(c => c + 1)
  },[])

  console.log("Memorization called")

  //useLayoutEffect is a React Hook that runs synchronously after DOM updates but BEFORE the browser paints the screen. 
  // ✅ Yes (can block rendering)
  // DOM measurement, layout fixes
  useLayoutEffect(()=>{
    console.log("running layout effect with offset height",ref.current.offsetHeight, " with innertext ", ref.current.innerText, "with object" ,ref.current)
    if(ref.current?.updateCount){
      setCount(ref?.current.updateCount())
    }
  },[])
  // useDebugValue is a React Hook used only for debugging custom hooks — it helps show useful labels in React DevTools.
  useDebugValue(count);


  return (
    <HookContextProvider>
    <div> 
      <Child1  greet={greet1}/>
      <Child2 ref={ref}  greet={greet2} onUpdateCount={onUpdateCount}/>
      <button onClick={()=>{
        dispatch({
          type: "Add",
          payload: count
        })
      }}> Add Data</button>
      <div>{JSON.stringify(state.data)}</div>
      <div style={{color: loading ? "red" : "green"}}>
        custom hook data : {customData}
      </div>
    </div>
    </HookContextProvider>
  )
}



export default CoreHooks
