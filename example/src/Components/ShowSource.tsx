import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";

export default class ShowSource extends Transformer.Template {
  render() {
    return (
      <a href="#source">
        <pre className="hljs sourceCode" id="source">
          <code>
            <Transformer.ApplyTemplates {...this.ctx} select="/*" mode="copy" />
          </code>
        </pre>
      </a>
    );
  }
}

ctx.register(ShowSource, { path: "p:showSource" });
