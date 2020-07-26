import { Context } from "../Utils/Context";
import { computeXPathFromElement } from "../Utils/XPath";
import Updatable from "../Updatable";
import { UpdatableProps } from "../Updatable/Updatable";

/**
 * The properties the pass to `Template`
 *
 * @interface TemplateProps
 */
export interface TemplateProps {
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
}

/**
 * The inner state of the template.
 */
export interface TemplateState {
  /**
   * A XPath to the context node.
   */
  path: string | null;
}

/**
 * The base class of all of the templates. Every template should extend this class and the be registered using `Context.register`.
 */
export default abstract class Template extends Updatable<
  TemplateProps,
  TemplateState
> {
  constructor(props: TemplateProps & UpdatableProps) {
    super(props);
    this.state = {
      path: computeXPathFromElement(props.contextNode),
    };
  }

  /**
   * The context to pass to the children.
   *
   */
  get ctx(): { contextData: Context; contextNode: Node } {
    return {
      contextData: this.props.contextData,
      contextNode: this.props.contextNode,
    };
  }
}
