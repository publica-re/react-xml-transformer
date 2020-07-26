import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";
import Highlight from "react-highlight.js";

export default class Code extends Transformer.Template {
  render() {
    return (
      <Highlight
        language={ctx.toString(
          <Transformer.ValueOf {...this.ctx} select="string(./@lang)" />
        )}
      >
        <Transformer.ValueOf {...this.ctx} select="string(./text())" />
      </Highlight>
    );
  }
}

ctx.register(Code, { path: "p:code" });
