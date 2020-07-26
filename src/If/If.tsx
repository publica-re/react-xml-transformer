import * as React from "react";
import { XPath, XPathDataType } from "../Utils/Types";
import { Context } from "../Utils/Context";
import Updatable from "../Updatable";

/**
 * The properties the pass to `If`
 *
 * @interface IfProps
 */
export interface IfProps {
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
   * The XPath to perform. Should be a boolean.
   *
   * @type {XPath}
   */
  test: XPath;
  /**
   * The rendered data if the test succeeds.
   *
   * @type {React.ReactChildren | undefined}
   */
  children?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IfState {}

/**
 * Renders the desired content if the test succeeds, else return null.
 *
 * It should be called from a `Template` as `<Transformer.If {...this.ctx} test={TEST}>children</Transformer.If>` (`this.ctx` is defined automatically).
 *
 */
export default class If extends Updatable<IfProps, IfState> {
  /**
   * Renders the desired content if the test succeeds, else return null.
   *
   * It should be called from a `Template` as `<Transformer.If {...this.ctx} test={TEST} />` (`this.ctx` is defined automatically).
   *
   * @returns {React.ReactNode}
   */
  render(): React.ReactNode {
    const result = this.props.contextData.xpath(
      this.props.test,
      this.props.contextNode,
      XPathDataType.Boolean
    );
    return result !== false ? this.props.children || null : null;
  }
}
