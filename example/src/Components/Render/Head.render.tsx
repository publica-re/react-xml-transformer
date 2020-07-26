import * as React from "react";
import ctx from "../context";
import Transformer from "react-xml-transformer";

export default class HeadRender extends Transformer.Template {
  render() {
    return (
      <h2>
        <Transformer.ApplyTemplates {...this.ctx} mode="render" />
      </h2>
    );
  }
}

ctx.register(HeadRender, { path: "p:head", mode: "render" });
