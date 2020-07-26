import * as React from "react";
import ctx from "../context";
import Transformer from "react-xml-transformer";

export default class CommentCopy extends Transformer.Template {
  render() {
    return (
      <span className="hljs-comment">
        &lt;!--
        <Transformer.ValueOf {...this.ctx} select="string(.)" />
        --&gt;
      </span>
    );
  }
}

ctx.register(CommentCopy, { path: "comment()", mode: "copy", priority: -1 });
