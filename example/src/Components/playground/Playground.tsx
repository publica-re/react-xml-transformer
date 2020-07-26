import * as React from "react";
import ctx from "../context";
import Transformer from "react-xml-transformer";

export default class Playground extends Transformer.Template {
  constructor(props: any) {
    super(props);
    this.addParagraph = this.addParagraph.bind(this);
  }

  addParagraph() {
    const doc = this.props.contextNode.ownerDocument as XMLDocument;
    const node = this.props.contextNode;
    const newPara = doc.createElementNS(
      doc.documentElement.getAttribute("xmlns") || "",
      "para"
    );
    newPara.textContent = " ";
    if (node !== null) node.appendChild(newPara);
    console.log(this.props.contextNode.ownerDocument);
  }

  render() {
    return (
      <div className="playground">
        <Transformer.ApplyTemplates {...this.ctx} mode="playground" />
        <Transformer.Choose
          {...this.ctx}
          cases={[
            {
              test: "count(./p:para)<5",
              node: (
                <span
                  onClick={this.addParagraph}
                  className="more-paragraphs"
                  title={ctx.toString(
                    <Transformer.ValueOf
                      {...this.ctx}
                      select="concat('remains ',5-count(./p:para))"
                    />
                  )}
                >
                  ⊕
                </span>
              ),
            },
          ]}
          otherwise={
            <span className="more-paragraphs-error">
              Sorry, you are not allowed to add anymore paragraphs. 😭
            </span>
          }
        />
      </div>
    );
  }
}

ctx.register(Playground, { path: "p:playground" });
