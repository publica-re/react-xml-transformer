import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";

export default class EntryPoint extends Transformer.Template {
  render() {
    return <Transformer.ApplyTemplates {...this.ctx} />;
  }
}

ctx.register(EntryPoint, { path: "/" });
