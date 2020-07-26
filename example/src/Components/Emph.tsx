import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";

export default class Emph extends Transformer.Template {
  render() {
    return (
      <em>
        <Transformer.ApplyTemplates {...this.ctx} />
      </em>
    );
  }
}

ctx.register(Emph, { path: "p:emph" });
