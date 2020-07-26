import * as React from "react";
import ctx from "../context";
import Transformer from "react-xml-transformer";

export default class DataRender extends Transformer.Template {
  render() {
    return (
      <section>
        <Transformer.ApplyTemplates {...this.ctx} mode="render" />
      </section>
    );
  }
}

ctx.register(DataRender, { path: "p:data", mode: "render" });
