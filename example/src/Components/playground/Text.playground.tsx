import * as React from "react";
import ctx from "../context";
import Transformer from "react-xml-transformer";
import * as _ from "lodash";

export default class Text extends Transformer.Template {
  do_changeValue(event: React.KeyboardEvent<HTMLSpanElement>): void {
    const value = (event.target as HTMLSpanElement).textContent;
    const node = this.props.contextNode;
    if (node) node.textContent = value || " ";
  }

  debounced_changeValue = _.debounce(this.do_changeValue.bind(this), 500);

  changeValue(event: React.KeyboardEvent<HTMLSpanElement>): void {
    event.persist();
    this.debounced_changeValue.bind(this)(event);
  }

  render() {
    return (
      <span
        contentEditable={true}
        suppressContentEditableWarning={true}
        onKeyUp={this.changeValue.bind(this)}
      >
        <Transformer.Choose
          {...this.ctx}
          cases={[
            {
              test: "boolean(normalize-space()='' and parent::p:para)",
              node: <span>Change me!</span>,
            },
          ]}
          otherwise={<Transformer.ValueOf {...this.ctx} select="string(.)" />}
        />
      </span>
    );
  }
}

ctx.register(Text, { path: "text()", mode: "playground" });
