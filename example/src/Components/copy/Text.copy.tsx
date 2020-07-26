import * as React from "react";
import ctx from "../context";
import Transformer from "react-xml-transformer";

export default class TextCopy extends Transformer.Template {
  render() {
    const node = this.props.contextNode;
    if (node.nodeType === Node.TEXT_NODE) {
      return (
        <span>
          <Transformer.ValueOf {...this.ctx} select="string(.)" />
        </span>
      );
    } else if (node.nodeType === Node.CDATA_SECTION_NODE) {
      return (
        <span>
          &lt;![CDATA[
          <Transformer.ValueOf {...this.ctx} select="string(.)" />
          ]]&gt;
        </span>
      );
    }
    return "<!!!>";
  }
}

ctx.register(TextCopy, { path: "text()", mode: "copy", priority: -1 });
