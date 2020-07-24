import * as React from "react";
import { Context } from "../Utils/Context";

/**
 * The properties the pass to `CallTemplate`
 *
 * @interface CallTemplatesProps
 */
export interface CallTemplateProps {
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
   * The name of the template.
   *
   * @type {XPath}
   */
  name: string;
  /**
   * The current rendering mode.
   *
   * @type {string}
   */
  mode?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CallTemplateState {}

/**
 * Calls the desired template.
 *
 * It should be called from a `Template` as `<Transformer.CallTemplate {...this.ctx} name={NAME} />` (`this.ctx` is defined automatically).
 *
 */
export default class CallTemplate extends React.Component<
  CallTemplateProps,
  CallTemplateState
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
   * Renders the named template.
   *
   * It should be called from a `Template` as `<Transformer.CallTemplate {...this.ctx} name={NAME} />` (`this.ctx` is defined automatically).
   *
   * @returns {React.ReactNode}
   */
  render(): React.ReactNode {
    const Template = this.props.contextData.getTemplateByName(
      this.props.name,
      this.props.mode
    );
    if (Template !== null) {
      return <Template {...this.ctx} />;
    } else {
      return this.props.contextData.notFoundTemplateName(this.props.name);
    }
  }
}
