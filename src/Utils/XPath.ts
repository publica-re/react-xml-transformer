import { XPath } from "./Types";

/**
 * Computes the XPath for a given element.
 *
 * *Implementation details*:
 * - if the node or a parent has an `id` attribute, and it is the single node that has this `id`, then it will be used as the top node of the query.
 * - if the node or a parent is a processing instruction, a comment or a DTD, it will throw a `TypeError`.
 * - it will ignore document fragments.
 *
 * @param {Node} contextNode the node to compute the XPath from
 * @returns {XPath} the XPath
 */
export function computeXPathFromElement(contextNode: Node): XPath {
  const segments: string[] = [];
  let currentNode: Node | null = contextNode;
  for (; currentNode !== null; currentNode = currentNode.parentNode) {
    const element = currentNode as Element;
    let sibling = contextNode.previousSibling;
    let nth = 1;
    switch (currentNode.nodeType) {
      case Node.ELEMENT_NODE:
        if (
          element.hasAttribute("id") &&
          document.querySelectorAll(`#${element.getAttribute("id")}`).length ===
            1
        ) {
          segments.unshift(`//id("${element.getAttribute("id")}")`);
          return segments.join("/");
        } else {
          const name = element.nodeName;
          let sibling = element.previousSibling;
          let nth = 1;
          for (; sibling !== null; sibling = sibling.previousSibling) {
            if (sibling.nodeName === name) nth++;
          }
          segments.unshift(
            `*[local-name()='${element.localName}' and namespace-uri()='${element.namespaceURI}'][${nth}]`
          );
        }
        break;
      case Node.DOCUMENT_NODE:
        return `/${segments.join("/")}`;
      case Node.TEXT_NODE:
        for (; sibling !== null; sibling = sibling.previousSibling) {
          if (sibling.nodeType === Node.TEXT_NODE) nth++;
        }
        segments.unshift(`text()[${nth}]`);
        break;
      case Node.COMMENT_NODE:
        for (; sibling !== null; sibling = sibling.previousSibling) {
          if (sibling.nodeType === Node.COMMENT_NODE) nth++;
        }
        segments.unshift(`comment()[${nth}]`);
        break;
      case Node.PROCESSING_INSTRUCTION_NODE:
      case Node.DOCUMENT_TYPE_NODE:
        throw TypeError(
          `react-xml-transformer: you shouldn't try to render the XPath of a comment node and/or a processing instruction.`
        );
      case Node.DOCUMENT_FRAGMENT_NODE:
        break;
    }
  }
  return `/${segments.join("/")}`;
}
