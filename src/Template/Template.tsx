import * as React from "react";
import { Context } from "../Utils/Context";
import { computeXPathFromElement } from "../Utils/XPath";

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
export default abstract class Template extends React.Component<
  TemplateProps,
  TemplateState
> {
  /**
   * An observer for the mutations on the context node.
   */
  private __observer: MutationObserver | null = null;
  constructor(props: TemplateProps) {
    super(props);
    this.state = {
      path: computeXPathFromElement(props.contextNode),
    };
    this.__onMutate = this.__onMutate.bind(this);
    this.__setupObserver = this.__setupObserver.bind(this);
    this.onBeforeMutate = this.onBeforeMutate.bind(this);
    this.onAfterMutate = this.onAfterMutate.bind(this);
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

  /**
   * Sets the observer for mutations on the context node.
   */
  private __setupObserver(): void {
    this.__observer = new MutationObserver(this.__onMutate);
    this.__observer.observe(this.props.contextNode, {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true,
    });
  }

  /**
   * The mutation handler.
   */
  private __onMutate(): void {
    this.onBeforeMutate(() => {
      this.setState(
        {
          path: computeXPathFromElement(this.props.contextNode),
        },
        () => this.forceUpdate(this.onAfterMutate)
      );
    });
  }

  componentDidMount(): void {
    this.__setupObserver();
  }

  /**
   * Event that is triggered before doing the mutation. It should call `callback` at the end.
   */
  onBeforeMutate: (callback: () => void) => void = (callback) => callback();
  /**
   * Event that is triggered at the end of the mutation.
   */
  onAfterMutate: () => void = () => null;
}
