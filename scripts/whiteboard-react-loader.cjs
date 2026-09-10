const { dirname, relative } = require("node:path");

// Next's App Router aliases bare React imports to React 19, even inside
// white-web-sdk's private React 16 dependencies. Keep the SDK and its renderer
// on their own matching React version (including hooks and legacy render APIs).
// This loader is scoped to white-web-sdk in both bundlers; the app uses Next's
// normal React runtime. Nothing in node_modules is modified.
module.exports = function whiteboardReactLoader(source) {
  return source.replace(
    /\brequire\((['"])(react|react-dom)\1\)/g,
    (_match, _quote, dependency) => {
      const resolved = require.resolve(dependency, {
        paths: [dirname(this.resourcePath)],
      });
      this.addDependency(resolved);
      const request = relative(dirname(this.resourcePath), resolved).replace(
        /\\/g,
        "/"
      );
      return `require(${JSON.stringify(request.startsWith(".") ? request : `./${request}`)})`;
    }
  );
};
