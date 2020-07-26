import React from "react";
import Template from "../Template";
import { XPath, XPathDataType } from "./Types";
import ReactDOMServer from "react-dom/server";

interface InternalTemplate {
  template: typeof Template;
  path?: XPath;
  mode?: string;
  name?: string;
  priority?: number;
}

/**
 * The context is shared across all templates and is used as a
 * general register and getter.
 */
export class Context {
  /**
   * A list of all registered templates.
   *
   * @private
   * @type {InternalTemplate[]}
   */
  private __templates: InternalTemplate[] = [];

  /**
   * Guesses a namespace resolver from a given node.
   *
   * @param {Node} contextNode the node to guess the namespace from
   * @returns {XPathNSResolver} a namespace resolver
   */
  __nsResolver(contextNode: Node): XPathNSResolver {
    const contextDocument = (contextNode.ownerDocument ||
      contextNode) as XMLDocument;
    return contextDocument.createNSResolver(contextNode);
  }

  /**
   * Sorts the templates by priority and saves it.
   *
   * @private
   * @returns {InternalTemplate[]}
   */
  private sortedTemplate(): InternalTemplate[] {
    this.__templates = this.__templates.sort((templateA, templateB) => {
      if (templateA.priority !== undefined) {
        if (templateB.priority !== undefined) {
          return templateA.priority - templateB.priority;
        } else {
          return 1;
        }
      } else if (templateB.priority !== undefined) {
        return -1;
      } else {
        return 0;
      }
    });
    return this.__templates;
  }

  /**
   * A node returned when no stylesheet was found. Could be overwritten.
   *
   * @returns {React.ReactNode} the error node
   */
  notFoundStyleSheet(): React.ReactNode {
    return (
      <span className="react-transform-internal not-found">No stylesheet</span>
    );
  }

  /**
   * A node returned when no template matching the name was found. Could be overwritten.
   *
   * @param {string} name the name of the template that was not found
   * @returns {React.ReactNode} the error node
   */
  notFoundTemplateName(name: string): React.ReactNode {
    return (
      <span className="react-transform-internal not-found">
        Template {name} not found
      </span>
    );
  }

  /**
   * A node returned when no template was found for the given node. Could be overwritten.
   *
   * @param {Node} node the node that did'nt have a matching template
   * @returns {React.ReactNode} the error node
   */
  notFoundTemplateNode(node: Node): React.ReactNode {
    return (
      <span className="react-transform-internal not-found">
        No template found for {node.nodeName}
      </span>
    );
  }

  /**
   * Performs a XPath query with `contextNode` as a context node, returning a type matching the `XPathDataType`.
   *
   * @param {XPath} query the XPath query
   * @param {Node} contextNode the context node
   * @param {XPathDataType} result the return type
   * @returns {number | string | boolean | Node | Node[] | Iterable<Node> | null}
   */
  xpath(
    query: XPath,
    contextNode: Node,
    resultType: XPathDataType.Any
  ): number | string | boolean | Node | Node[] | null;

  xpath(
    query: XPath,
    contextNode: Node,
    resultType: XPathDataType.Number
  ): number | null;

  xpath(
    query: XPath,
    contextNode: Node,
    resultType: XPathDataType.String
  ): string | null;

  xpath(
    query: XPath,
    contextNode: Node,
    resultType: XPathDataType.Boolean
  ): boolean | null;

  xpath(
    query: XPath,
    contextNode: Node,
    resultType: XPathDataType.UnorderedNodeIterator
  ): Iterable<Node>;

  xpath(
    query: XPath,
    contextNode: Node,
    resultType: XPathDataType.OrderedNodeIterator
  ): Iterable<Node>;

  xpath(
    query: XPath,
    contextNode: Node,
    resultType: XPathDataType.UnorderedNodeList
  ): Node[];

  xpath(
    query: XPath,
    contextNode: Node,
    resultType: XPathDataType.OrderedNodeList
  ): Node[];

  xpath(
    query: XPath,
    contextNode: Node,
    resultType: XPathDataType.AnyNode
  ): Node | null;

  xpath(
    query: XPath,
    contextNode: Node,
    resultType: XPathDataType.FirstNode
  ): Node | null;

  xpath(
    query: XPath,
    contextNode: Node,
    resultType: XPathDataType
  ): number | string | boolean | Node | Node[] | Iterable<Node> | null {
    const doc = (contextNode.ownerDocument || contextNode) as XMLDocument;
    if (doc === null && resultType < XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE)
      return null;
    else if (
      doc === null &&
      resultType >= XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
    )
      return [];
    const result = doc.evaluate(
      query,
      contextNode,
      this.__nsResolver(doc.documentElement),
      resultType
    );
    switch (resultType) {
      case XPathDataType.Any:
        return (
          result.booleanValue ||
          result.numberValue ||
          result.singleNodeValue ||
          result.stringValue ||
          ([...Array(result.snapshotLength).keys()]
            .map((_, i) => result.snapshotItem(i))
            .filter((node) => node !== null) as Node[])
        );
      case XPathDataType.Number:
        return result.numberValue;
      case XPathDataType.String:
        return result.stringValue;
      case XPathDataType.Boolean:
        return result.booleanValue;
      case XPathDataType.AnyNode:
        return result.singleNodeValue;
      case XPathDataType.FirstNode:
        return result.singleNodeValue;
      case XPathDataType.UnorderedNodeIterator:
      case XPathDataType.OrderedNodeIterator:
        return (function* (): Iterable<Node> {
          let node = null;
          while ((node = result.iterateNext())) yield node;
        })();
      case XPathDataType.UnorderedNodeList:
      case XPathDataType.OrderedNodeList:
        return [...Array(result.snapshotLength).keys()]
          .map((_, i) => result.snapshotItem(i))
          .filter((node) => node !== null) as Node[];
    }
  }

  /**
   * Compute the correct template for the given `contextNode`
   *
   * @param {Node} contextNode the node to compute the template for
   * @param {string} [mode] a rendering mode
   * @returns {typeof Template | null} returns a renderable template if a match was found, null otherwise
   */
  getTemplateByNode(contextNode: Node, mode?: string): typeof Template | null {
    const candidateTemplates = this.sortedTemplate().filter(
      (template) => template.mode === mode && template.path !== undefined
    );
    for (const template of candidateTemplates) {
      const query = `${template.path as XPath}`;
      const allNodes = this.xpath(
        query,
        contextNode.parentNode || contextNode,
        XPathDataType.UnorderedNodeList
      );
      const match = allNodes.find((n) => Object.is(n, contextNode));
      if (match) {
        return template.template;
      }
    }
    return null;
  }

  /**
   * Gives the correct template for the given name.
   *
   * @param {string} name the name of the template
   * @param {string} [mode] a rendering mode
   * @returns {typeof Template | null} returns a renderable template if a match was found, null otherwise
   */
  getTemplateByName(name: string, mode?: string): typeof Template | null {
    return (
      this.sortedTemplate().find(
        (template) => template.name === name && template.mode === mode
      )?.template || null
    );
  }

  /**
   * Registers a template by `path` or by `name`. To be able to call it from a `ApplyTemplates`, you should register by `path`, and by `name` if you want to call it from a `CallTemplate`.
   *
   * @param {typeof Template} template the template to register
   * @param {({ path: XPath; mode?: string; priority?: number } | { name: string; mode?: string; priority?: number })} options see function documentation
   */
  register(
    template: typeof Template,
    options:
      | { path: XPath; mode?: string; priority?: number }
      | { name: string; mode?: string; priority?: number }
  ): void {
    this.__templates.push({
      template,
      path: (options as { path: XPath }).path,
      name: (options as { name: string }).name,
      mode: options.mode,
      priority: options.priority,
    });
  }

  toString(node: React.ReactElement): stringZ {
    return ReactDOMServer.renderToString(node);
  }

  /**
   * Renders a document based on the registered templates, by guessing the most adequate.
   *
   * *Note:* you shouldn't use this function directly, but rather import `../Stylesheet` as a ReactNode.
   *
   * @param {XMLDocument} contextDocument the document to render
   * @returns {React.ReactNode}
   */
  __render(contextDocument: XMLDocument): React.ReactNode {
    const RootStylesheet = this.getTemplateByNode(contextDocument);
    if (RootStylesheet === null) return this.notFoundStyleSheet();
    return <RootStylesheet contextData={this} contextNode={contextDocument} />;
  }
}
