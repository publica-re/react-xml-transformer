import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";

export default class Divider extends Transformer.Template {
  render() {
    return <div className="divider">🟂</div>;
  }
}

ctx.register(Divider, { path: "p:divider" });
