import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";

export default class TableOfContents extends Transformer.Template {
  render() {
    return (
      <ol className="toc">
        <Transformer.ForEach
          {...this.ctx}
          select="//p:section"
          do={(fCtx): React.ReactNode => (
            <li>
              <a
                href={ctx.toString(
                  <Transformer.ValueOf
                    {...fCtx}
                    select="concat('#section-',string(count(preceding-sibling::p:section)+1))"
                  />
                )}
              >
                <Transformer.ApplyTemplates
                  {...fCtx}
                  select="./p:title/*|./p:title/text()"
                />
              </a>
            </li>
          )}
        />
      </ol>
    );
  }
}

ctx.register(TableOfContents, { name: "toc" });
