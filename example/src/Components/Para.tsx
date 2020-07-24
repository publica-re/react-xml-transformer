import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";

export default class Para extends Transformer.Template {
  render() {
    return (
      <p>
        <Transformer.ApplyTemplates {...this.ctx} />
      </p>
    );
  }
}

ctx.register(Para, { path: "p:para" });
