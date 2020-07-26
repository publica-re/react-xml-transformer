import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";

export default class File extends Transformer.Template {
  render() {
    return (
      <span className="file">
        <Transformer.ApplyTemplates {...this.ctx} />
      </span>
    );
  }
}

ctx.register(File, { path: "p:file" });
