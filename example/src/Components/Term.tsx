import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";

export default class Term extends Transformer.Template {
  render() {
    return (
      <span className="term">
        <Transformer.ApplyTemplates {...this.ctx} />
      </span>
    );
  }
}

ctx.register(Term, { path: "p:term" });
