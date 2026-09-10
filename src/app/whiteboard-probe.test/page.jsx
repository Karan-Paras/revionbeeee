"use client";

import { useEffect, useRef, useState, version } from "react";

export default function WhiteboardProbe() {
  const container = useRef(null);
  const [result, setResult] = useState("running");
  useEffect(() => {
    let cancelled = false;
    let dispose;
    async function run() {
      const [sdk, fastboard, reactModule, domModule] = await Promise.all([
        import("white-web-sdk"),
        import("@netless/fastboard-react"),
        import("../../../node_modules/white-web-sdk/node_modules/react"),
        import("../../../node_modules/white-web-sdk/node_modules/react-dom"),
      ]);
      if (cancelled) return;
      const legacy = reactModule.default ?? reactModule;
      const dom = domModule.default ?? domModule;
      function ToolProbe() {
        const [tool, setTool] = legacy.useState("pencil");
        return legacy.createElement(
          "button",
          { onClick: () => setTool("eraser") },
          tool
        );
      }
      const node = container.current;
      dom.render(legacy.createElement(ToolProbe), node);
      const initial = node.textContent;
      node.querySelector("button").click();
      const updated = node.textContent;
      dom.unmountComponentAtNode(node);
      const cleared = node.childNodes.length === 0;
      const data = {
        appReact: version,
        sdkReact: legacy.version,
        sdkReactDOM: dom.version,
        sdkLoaded: typeof sdk.WhiteWebSdk === "function",
        fastboardLoaded: typeof fastboard.createFastboard === "function",
        initial,
        updated,
        cleared,
      };
      window.whiteboardProbe = data;
      setResult(JSON.stringify(data));
      dispose = () => dom.unmountComponentAtNode(node);
    }
    run().catch((error) => {
      window.whiteboardProbe = { error: String(error), stack: error.stack };
      setResult(String(error));
    });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);
  return (
    <main>
      <h1>Whiteboard renderer probe</h1>
      <pre id="result">{result}</pre>
      <div ref={container} />
    </main>
  );
}
