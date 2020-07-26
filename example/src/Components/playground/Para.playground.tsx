import * as React from "react";
import ctx from "../context";
import Transformer from "react-xml-transformer";

export default class Para extends Transformer.Template {
  dragEnd(event: React.DragEvent<HTMLParagraphElement>) {
    const sourceNodePath = event.dataTransfer.getData("nodePath");
    if (sourceNodePath !== null) {
      const node = this.props.contextNode;
      const doc = node.ownerDocument as XMLDocument;
      const parent = node.parentElement;
      console.log("dropping", sourceNodePath);
      const sourceNode = this.props.contextData.xpath(
        sourceNodePath,
        doc,
        Transformer.XPathDataType.FirstNode
      );
      if (parent !== null && sourceNode !== null) {
        parent.insertBefore(sourceNode, node);
      }
    }
  }

  dragStart(event: React.DragEvent<HTMLParagraphElement>) {
    if (this.state.path) {
      console.log("dragging", this.state.path);

      event.dataTransfer.setData("nodePath", this.state.path);
    }
  }

  render() {
    return (
      <div
        className="draggable-para"
        draggable={true}
        onDrop={this.dragEnd.bind(this)}
        onDragOver={(ev) => ev.preventDefault()}
        onDragStart={this.dragStart.bind(this)}
      >
        <span className="drag-handle">⸬</span>
        <p>
          <Transformer.ApplyTemplates {...this.ctx} mode="playground" />
        </p>
      </div>
    );
  }
}

ctx.register(Para, { path: "p:para", mode: "playground" });
