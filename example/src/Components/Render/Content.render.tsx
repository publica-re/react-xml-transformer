import * as React from "react";
import ctx from "../context";
import Transformer from "react-xml-transformer";

export default class ContentRender extends Transformer.Template {
  render() {
    return (
      <p>
        <Transformer.ApplyTemplates {...this.ctx} mode="render" />
      </p>
    );
  }
}

ctx.register(ContentRender, { path: "p:content", mode: "render" });
