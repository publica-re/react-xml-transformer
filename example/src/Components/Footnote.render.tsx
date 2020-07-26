import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";
import ReactDOMServer from "react-dom/server";

export default class FootnoteRender extends Transformer.Template {
  render() {
    return (
      <p
        className="footnote-render"
        id={ReactDOMServer.renderToString(
          <Transformer.ValueOf
            {...this.ctx}
            select="concat('footnote-', count(preceding::p:footnote)+1)"
          />
        )}
      >
        <sup>
          <Transformer.ValueOf
            {...this.ctx}
            select="count(preceding::p:footnote)+1"
          />
        </sup>
        <Transformer.ApplyTemplates {...this.ctx} />
      </p>
    );
  }
}

ctx.register(FootnoteRender, { path: "p:footnote", mode: "footnote:render" });
