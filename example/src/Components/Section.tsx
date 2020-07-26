import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";

export default class Section extends Transformer.Template {
  render() {
    return (
      <section
        id={ctx.toString(
          <Transformer.ValueOf
            {...this.ctx}
            select="concat('section-',string(count(preceding-sibling::p:section)+1))"
          />
        )}
      >
        <h1>
          <span className="titlemark">
            Section{" "}
            <Transformer.ValueOf
              {...this.ctx}
              select="count(preceding-sibling::p:section)+1"
            />
            .{" "}
          </span>
          <Transformer.ApplyTemplates
            {...this.ctx}
            select="./p:title/*|./p:title/text()"
          />
        </h1>
        <Transformer.ApplyTemplates
          {...this.ctx}
          select="./*[not(self::p:title)]"
        />
      </section>
    );
  }
}

ctx.register(Section, { path: "p:section" });
