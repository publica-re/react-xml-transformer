import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";

export default class Root extends Transformer.Template {
  render() {
    return (
      <article>
        <Transformer.ApplyTemplates {...this.ctx} select="./p:root/p:title" />
        <Transformer.ApplyTemplates
          {...this.ctx}
          select="./p:root/*[not(self::p:title)]"
        />
        <footer>
          Here's a reference to the text of the title:{" "}
          <span className="dont-click" title="No, not me, the title!">
            <Transformer.ApplyTemplates
              {...this.ctx}
              select="./p:root/p:title/text()"
            />
          </span>
        </footer>
      </article>
    );
  }
}

ctx.register(Root, { path: "/" });
