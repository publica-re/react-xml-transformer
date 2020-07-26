import * as React from "react";
import { XPath, XPathDataType } from "../Utils/Types";
import Updatable from "../Updatable";
import { Context } from "../Utils/Context";

/**
 * The properties the pass to `ValueOf`
 *
 * @interface ValueOfProps
 */
export interface ValueOfProps {
  /**
   * The Context from which the templates are pulled.
   *
   * @type {Context}
   */
  contextData: Context;
  /**
   * The node that is currently being rendered.
   *
   * @type {Node}
   */
  contextNode: Node;
  /**
   * The XPath to the nodes that have to be rendered. Defaults to `node()` if not defined.
   *
   * @type {XPath}
   */
  select?: XPath;
  /**
   * If more than one node is to be rendered, how they are separated. Defaults to `""`.
   *
   * @type {string}
   */
  separator?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ValueOfState {}

/**
 * Returns the value from the targeted nodes.
 *
 * It should be called from a `Template` as `<Transformer.ValueOf {...this.ctx} select={SELECT} />` (`this.ctx` is defined automatically).
 */
export default class ValueOf extends React.Component<
  ValueOfProps,
  ValueOfState
> {
  /**
   * Renders the target nodes values.
   *
   * It should be called from a `Template` as `<Transformer.ValueOf {...this.ctx} test={TEST} />` (`this.ctx` is defined automatically).
   *
   * @returns {React.ReactNode}
   */
  render(): React.ReactNode {
    const result = this.props.contextData.xpath(
      this.props.select || "node()",
      this.props.contextNode,
      XPathDataType.Any
    );
    if (Array.isArray(result)) {
      return result
        .map((node) => {
          return node.nodeValue;
        })
        .join(this.props.separator || "");
    } else {
      return result;
    }
  }
}
