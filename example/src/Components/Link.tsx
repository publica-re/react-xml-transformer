import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";
import ReactDOMServer from "react-dom/server";

export default class Link extends Transformer.Template {
  render() {
    return (
      <a
        href={ReactDOMServer.renderToString(
          <Transformer.ValueOf {...this.ctx} select="string(./@to)" />
        )}
      >
        <Transformer.ApplyTemplates {...this.ctx} />
      </a>
    );
  }
}

ctx.register(Link, { path: "p:link" });
