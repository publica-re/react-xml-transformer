import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";

export default class Text extends Transformer.Template {
  render() {
    return (
      <Transformer.If {...this.ctx} test="normalize-space()!=''">
        <span>
          <Transformer.ValueOf {...this.ctx} select="string(.)" />
        </span>
      </Transformer.If>
    );
  }
}

ctx.register(Text, { path: "text()" });
