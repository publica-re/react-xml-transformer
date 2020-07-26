import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";

export default class Doc extends Transformer.Template {
  render() {
    return (
      <article>
        <header>
          <Transformer.ApplyTemplates {...this.ctx} select="./p:title[1]" />
          <Transformer.CallTemplate {...this.ctx} name="toc" />
        </header>
        <main>
          <Transformer.ApplyTemplates
            {...this.ctx}
            select="./*[not(self::p:title[1])]"
          />
        </main>
        <footer>
          <Transformer.CallTemplate {...this.ctx} name="collect-footnotes" />
        </footer>
      </article>
    );
  }
}

ctx.register(Doc, { path: "p:doc" });
