import React from "react";
import { Context } from "../Utils/Context";

/**
 * The properties the pass to `Stylesheet`
 *
 * @interface StylesheetProps
 */
export interface StylesheetProps {
  /**
   * The document to be rendered
   *
   * @type {XMLDocument}
   */
  contextDocument: XMLDocument;
  /**
   * The Context from which the templates are pulled.
   *
   * @type {Context}
   */
  contextData: Context;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StylesheetState {}

/**
 * The root note, that renders the stylesheets.
 */
export default class Stylesheet extends React.Component<
  StylesheetProps,
  StylesheetState
> {
  /**
   * Renders the stylesheets.
   */
  render(): React.ReactNode {
    return this.props.contextData.__render(this.props.contextDocument);
  }
}
