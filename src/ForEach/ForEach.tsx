import * as React from "react";
import { XPath, XPathDataType } from "../Utils/Types";
import { Context } from "../Utils/Context";

/**
 * The properties the pass to `ForEach`
 *
 * @interface ForEachProps
 */
export interface ForEachProps {
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
   * The XPath to iterate from. Defaults to `node()` if not defined.
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
  /**
   * The child to be rendered.
   *
   */
  do: (ctx: { contextData: Context; contextNode: Node }) => React.ReactChildren;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ForEachState {}

/**
 * Renders the desired content on all of the targeted nodes.
 *
 * It should be called from a `Template` as  (`this.ctx` is defined automatically).
 *
 * ```tsx
 * <Transformer.ForEach {...this.ctx} select={SELECT} do={(ctx) =>
 *  <>
 *    ...
 *    <Transformer.ApplyTemplates {...ctx} />
 *    ...
 *  </>
 * }/>```
 *
 */
export default class ForEach extends React.Component<
  ForEachProps,
  ForEachState
> {
  /**
   * Returns the current context
   *
   * @readonly
   * @type {{ contextData: Context; contextNode: Node; mode?: string }}
   */
  get ctx(): {
    contextData: Context;
    contextNode: Node;
    mode?: string;
  } {
    return {
      contextData: this.props.contextData,
      contextNode: this.props.contextNode,
      mode: this.props.mode,
    };
  }
  /**
   * Renders the desired content on all of the targeted nodes.
   *
   * It should be called from a `Template` as  (`this.ctx` is defined automatically).
   *
   * ```tsx
   * <Transformer.ForEach {...this.ctx} select={SELECT} do={(ctx) =>
   *  <>
   *    ...
   *    <Transformer.ApplyTemplates {...ctx} />
   *    ...
   *  </>
   * }/>```
   *
   */
  render(): React.ReactNode {
    const result = this.props.contextData.xpath(
      this.props.select || "node()",
      this.props.contextNode,
      XPathDataType.OrderedNodeList
    );
    return result.map((node) =>
      this.props.do({ ...this.ctx, contextNode: node })
    );
  }
}
