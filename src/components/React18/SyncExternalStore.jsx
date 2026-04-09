/* eslint-disable no-unused-vars */
import { useEffect, useState, useSyncExternalStore } from "react";

const store = {
  value: 0,
  listeneres: [],

  set(val) {
    ((this.value = val), this.listeneres.forEach((l) => l()));
  },

  subscribe(listner) {
    this.listeneres.push(listner);
  },
};

const safeStore = {
  value: 0,
  listeneres: new Set(),

  set(val) {
    ((this.value = val), this.listeneres.forEach((l) => l()));
  },

  subscribe(listner) {
    this.listeneres.add(listner);
    return () => this.listeneres.delete(listner)
  },

  getSnapshot(){
    return this.value
  }
};

//This is something which is not visible but it can happen in some cases
const SyncExternalStore = () => {
  return <>
    <Counter label="A" />
    <Counter label="B" />

    {/* <button onClick={() => store.set(store.value + 1)}>Increment</button> */}
    <button onClick={() => safeStore.set(safeStore.value + 1)}>Increment</button>
  </>;
};

function Counter({ label }) {
  
  // const [count, setCount] = useState(store.value);

  const count = useSyncExternalStore(
    safeStore.subscribe.bind(safeStore),
    safeStore.getSnapshot.bind(safeStore),
    safeStore.getSnapshot.bind(safeStore)
  )

  // useEffect(() => {
  //   store.subscribe(() => {
  //     setCount(store.value);
  //   });
  // }, []);

  return (
    <h2>
      {label}: {count}
    </h2>
  );
}

export default SyncExternalStore;
