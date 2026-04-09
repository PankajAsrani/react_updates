import { Activity, useEffect, useState } from "react";

const ActivityOrOffscreenAPI = () => {
  const [visible, setVisible] = useState();

  return (
    <div>
      <button onClick={() => setVisible((v) => !v)}>Toggle</button>
      <Activity mode={visible ? "visible" : "hidden"}>
        <Sample></Sample>
      </Activity>
    </div>
  );
};

export default ActivityOrOffscreenAPI;

const Sample = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => setCount((c) => c + 1));
  }, []);

  return <h3>Count : {count}</h3>;
};
