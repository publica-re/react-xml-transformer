import * as React from "react";
import ctx from "../context";
import Transformer from "react-xml-transformer";

export default class NodeCopy extends Transformer.Template {
  render() {
    const node = this.props.contextNode;
    const attributes = [...Array.from((node as Element).attributes)].map(
      (attr: Attr) => (
        <span>
          {" "}
          <span className="hljs-attr">{attr.nodeName}</span>=
          <span className="hljs-string">"{attr.nodeValue}"</span>
        </span>
      )
    );
    if (node.childNodes.length === 0) {
      return (
        <span className="hljs-tag">
          &lt;
          <span className="hljs-name">{this.props.contextNode.nodeName}</span>
          {attributes} /&gt;
        </span>
      );
    }
    return (
      <span>
        <span className="hljs-tag">
          &lt;
          <span className="hljs-name">
            {this.props.contextNode.nodeName}
            {attributes}
          </span>
          &gt;
        </span>
        <Transformer.ApplyTemplates {...this.ctx} mode="copy" />
        <span className="hljs-tag">
          &lt;/
          <span className="hljs-name">{this.props.contextNode.nodeName}</span>
          &gt;
        </span>
      </span>
    );
  }
}

ctx.register(NodeCopy, { path: "p:*", mode: "copy", priority: 0 });
