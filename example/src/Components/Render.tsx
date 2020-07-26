import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";

export default class Render extends Transformer.Template {
  render() {
    return (
      <div className="render">
        <Transformer.ApplyTemplates {...this.ctx} mode="render" />
      </div>
    );
  }
}

ctx.register(Render, { path: "p:render" });
