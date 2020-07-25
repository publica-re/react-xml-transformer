import * as React from "react";
import { XPath, XPathDataType } from "../Utils/Types";
import { Context } from "../Utils/Context";

/**
 * A test case
 */
export interface ChooseCase {
  /**
   *  The XPath for the test (should be a boolean)
   *
   * @type {XPath}
   */
  test: XPath;
  /**
   * The rendered node if the test succeeds
   *
   * @type {React.ReactNode}
   */
  node: React.ReactNode;
}

/**
 * The properties the pass to `Chosse`
 *
 * @interface ChooseProps
 */
export interface ChooseProps {
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
   * The various match cases
   *
   * @type {ChooseCase[]}
   */
  cases: ChooseCase[];
  /**
   * The child to be rendered if no test succeeds
   *
   * @type {React.ReactNode}
   */
  otherwise: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ChooseState {}

/**
 * Chooses the first node whoose test succeeds.
 *
 * It should be called from a `Template` as `<Transformer.Choose {...this.ctx} cases={...} otherwise={...} />` (`this.ctx` is defined automatically).
 *
 */
export default class Choose extends React.Component<ChooseProps, ChooseState> {
  /**
   * Chooses the first node whoose test succeeds.
   *
   * It should be called from a `Template` as `<Transformer.Choose {...this.ctx} cases={...} otherwise={...} />` (`this.ctx` is defined automatically).
   *
   * @returns {React.ReactNode}
   */
  render(): React.ReactNode {
    for (let opt of this.props.cases) {
      const result = this.props.contextData.xpath(
        opt.test,
        this.props.contextNode,
        XPathDataType.Boolean
      );
      if (result !== false) {
        return opt.node;
      }
    }
    return this.props.otherwise;
  }
}
