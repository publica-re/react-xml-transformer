import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";

export default class FootnoteCollect extends Transformer.Template {
  render() {
    return (
      <div className="footnotes">
        <Transformer.ApplyTemplates
          {...this.ctx}
          select="//p:footnote"
          mode="footnote:render"
        />
      </div>
    );
  }
}

ctx.register(FootnoteCollect, { name: "collect-footnotes" });
