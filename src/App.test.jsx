import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./components/CoreHooks/CoreHooks", () => ({
  default: () => <div>Core Hooks Mock</div>,
}));

vi.mock("./components/ClassLifecycle/Lifecycle", () => ({
  default: ({ setHide }) => (
    <div>
      <button onClick={() => setHide(true)}>Hide</button>
      <div>Lifecycle Mock</div>
    </div>
  ),
}));

vi.mock("./components/ClassLifecycle/ErrorBoundary", () => ({
  default: ({ children }) => <div data-testid="error-boundary">{children}</div>,
}));

vi.mock("./components/ReactConcepts/RenderProps", () => ({
  default: ({ render }) => <div>{render("mock data")}</div>,
}));

vi.mock("./components/ReactConcepts/ChildrenAPI", () => ({
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock("./components/React18/SyncExternalStore", () => ({
  default: () => <div>Sync External Store Mock</div>,
}));

vi.mock("./components/React18/ActivityOrOffscreenAPI", () => ({
  default: () => <div>Activity Mock</div>,
}));

describe("App", () => {
  it("renders the main composed sections", async () => {
    render(<App />);

    expect(screen.getByText("Core Hooks Mock")).toBeInTheDocument();
    expect(screen.getByText("Lifecycle Mock")).toBeInTheDocument();
    expect(await screen.findByText("RenderProps : mock data")).toBeInTheDocument();
    expect(screen.getByText("1")).not.toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Sync External Store Mock")).toBeInTheDocument();
    expect(screen.getByText("Activity Mock")).toBeInTheDocument();
  });
});
