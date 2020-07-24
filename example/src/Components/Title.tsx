import * as React from "react";
import ctx from "./context";
import Transformer from "react-xml-transformer";

export default class Title extends Transformer.Template {
  onClickHandler() {
    const node = this.props.contextNode;
    if ((this.props.contextNode as Element).hasAttribute("clicked"))
      node.textContent = (this.props.contextNode as Element).getAttribute(
        "clicked"
      );
  }

  render() {
    return (
      <h1 onClick={this.onClickHandler.bind(this)}>
        <Transformer.ApplyTemplates {...this.ctx} />
      </h1>
    );
  }
}

ctx.register(Title, { path: "p:title" });
