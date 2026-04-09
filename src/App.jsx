import { lazy, Profiler, Suspense, useState } from "react";
import "./App.css";
import Lifecycle from "./components/ClassLifecycle/Lifecycle";
import CoreHooks from "./components/CoreHooks/CoreHooks";
import ErrorBoundary from "./components/ClassLifecycle/ErrorBoundary";
import ChildrenAPI from "./components/ReactConcepts/ChildrenAPI";
import SyncExternalStore from "./components/React18/SyncExternalStore";
import ActivityOrOffscreenAPI from "./components/React18/ActivityOrOffscreenAPI";

const RenderProps = lazy(() => import("./components/ReactConcepts/RenderProps"))

function App() {
  const [hide, setHide] = useState(false);

  return (
    <div>
      <CoreHooks />
      {!hide && (
        <ErrorBoundary>
          <Lifecycle setHide={setHide} data={[1, 2, 3]} />
        </ErrorBoundary>
      )}
      <Profiler id="render_props" onRender={(id, phase, actualDuration, baseDuration, startTime, commitTime )=> {
        console.log(id, phase, actualDuration, baseDuration, startTime, commitTime)
      }}>
      <Suspense fallback="Loading...">
        <RenderProps render={(data) => <h1> RenderProps : {data}</h1> } />
      </Suspense>
      </Profiler>
      <ChildrenAPI>
        <span>1</span>
        <span>2</span>
      </ChildrenAPI>
      <SyncExternalStore />
      <ActivityOrOffscreenAPI />
    </div>
  );
}

export default App;
