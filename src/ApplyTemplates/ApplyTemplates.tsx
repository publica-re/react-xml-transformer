import * as React from "react";
import { XPath, XPathDataType } from "../Utils/Types";
import { Context } from "../Utils/Context";

/**
 * The properties the pass to `ApplyTemplates`
 *
 * @interface ApplyTemplatesProps
 */
export interface ApplyTemplatesProps {
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
   * The current rendering mode.
   *
   * @type {string}
   */
  mode?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ApplyTemplatesState {}

/**
 * Applies the registered template to the selection.
 *
 * It should be called from a `Template` as `<Transformer.ApplyTemplates {...this.ctx} select={SELECT} />` (`this.ctx` is defined automatically).
 */
export default class ApplyTemplates extends React.Component<
  ApplyTemplatesProps,
  ApplyTemplatesState
> {
  /**
   * Returns the current context
   *
   * @readonly
   * @type {{ contextData: Context; contextNode: Node; mode?: string }}
   */
  get ctx(): { contextData: Context; contextNode: Node; mode?: string } {
    return {
      contextData: this.props.contextData,
      contextNode: this.props.contextNode,
      mode: this.props.mode,
    };
  }

  /**
   * Pulls the current template for the given `node` and renders it.
   *
   * @param {Node} node the new context node
   * @param {number} index the react `key`
   * @returns {React.ReactNode} the template
   */
  private __processTemplate(node: Node, index: number): React.ReactNode {
    const Template = this.props.contextData.getTemplateByNode(
      node,
      this.props.mode
    );
    if (Template !== null) {
      return <Template {...{ ...this.ctx, contextNode: node }} key={index} />;
    } else {
      return this.props.contextData.notFoundTemplateNode(node);
    }
  }

  /**
   * Renders the template on the targeted nodes.
   *
   * It should be called from a `Template` as `<Transformer.ApplyTemplates {...this.ctx} />` (`this.ctx` is defined automatically).
   *
   * @returns {React.ReactNode}
   */
  render(): React.ReactNode {
    const result = this.props.contextData.xpath(
      this.props.select || "node()",
      this.props.contextNode,
      XPathDataType.OrderedNodeList
    );
    return result.map((node, index) => {
      return this.__processTemplate(node, index);
    });
  }
}
