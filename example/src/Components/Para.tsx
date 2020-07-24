import * as React from "react";
import ctx from "./context";
import Transformer from "react-transformer";

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
