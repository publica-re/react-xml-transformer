import * as React from "react";
import ctx from "../context";
import Transformer from "react-xml-transformer";

export default class TextRender extends Transformer.Template {
  render() {
    return <Transformer.ValueOf {...this.ctx} select="string(.)" />;
  }
}

ctx.register(TextRender, { path: "text()", mode: "render" });
