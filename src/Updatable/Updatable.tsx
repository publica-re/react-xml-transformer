import * as React from "react";
import { Context } from "../Utils/Context";

/**
 * The properties the pass to `Updatable`
 *
 * @interface UpdatableProps
 */
export interface UpdatableProps {
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
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdatableState {}

/**
 * The base class of all of the templates. Every template should extend this class and the be registered using `Context.register`.
 */
export default abstract class Updatable<T = {}, S = {}> extends React.Component<
  UpdatableProps & T,
  UpdatableState & S
> {
  /**
   * An observer for the mutations on the context node.
   */
  private __observer: MutationObserver | null = null;
  constructor(props: UpdatableProps & T) {
    super(props);
    this.__onMutate = this.__onMutate.bind(this);
    this.__setupObserver = this.__setupObserver.bind(this);
    this.onBeforeMutate = this.onBeforeMutate.bind(this);
    this.onAfterMutate = this.onAfterMutate.bind(this);
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
    this.onBeforeMutate(() => this.forceUpdate(this.onAfterMutate));
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
