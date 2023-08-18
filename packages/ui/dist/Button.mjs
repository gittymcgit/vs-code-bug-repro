import { jsx } from "react/jsx-runtime.js";
const Button = () => {
  return /* @__PURE__ */ jsx("button", { onClick: () => alert("boop"), children: "Boop" });
};
export {
  Button
};
