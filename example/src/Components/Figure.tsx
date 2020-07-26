import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";
import ReactDOMServer from "react-dom/server";

export default class Para extends Transformer.Template {
  render() {
    const alt = (
      <Transformer.Choose
        {...this.ctx}
        cases={[
          {
            test: "./p:img/@alt",
            node: (
              <Transformer.ValueOf
                {...this.ctx}
                select="string(./p:img/@alt)"
              />
            ),
          },
          {
            test: "./p:title",
            node: (
              <Transformer.ValueOf
                {...this.ctx}
                select="string(./p:title/text())"
              />
            ),
          },
        ]}
        otherwise={"no alternating text"}
      />
    );
    return (
      <figure>
        <img
          src={ReactDOMServer.renderToString(
            <Transformer.ValueOf {...this.ctx} select="string(./p:img/@src)" />
          )}
          alt={ReactDOMServer.renderToString(alt)}
        />
        <h2>
          <Transformer.ApplyTemplates {...this.ctx} select="./p:title/text()" />
        </h2>
      </figure>
    );
  }
}

ctx.register(Para, { path: "p:figure" });
