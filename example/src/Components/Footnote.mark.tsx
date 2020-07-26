import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";
import ReactDOMServer from "react-dom/server";

export default class FootnoteMark extends Transformer.Template {
  render() {
    return (
      <sup>
        <a
          href={ReactDOMServer.renderToString(
            <Transformer.ValueOf
              {...this.ctx}
              select="concat('#footnote-', count(preceding::p:footnote)+1)"
            />
          )}
        >
          <Transformer.ValueOf
            {...this.ctx}
            select="count(preceding::p:footnote)+1"
          />
        </a>
      </sup>
    );
  }
}

ctx.register(FootnoteMark, { path: "p:footnote" });
