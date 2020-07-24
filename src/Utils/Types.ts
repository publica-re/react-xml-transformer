/**
 * A XPath query.
 */
export type XPath = string;

/**
 * The return type of a XPath query.
 */
export enum XPathDataType {
  /**
   * Any value.
   */
  Any = 0,
  /**
   * A number.
   */
  Number = 1,
  /**
   * A string.
   */
  String = 2,
  /**
   * A boolean.
   */
  Boolean = 3,
  /**
   * An iterator on nodes, in any order.
   */
  UnorderedNodeIterator = 4,
  /**
   * An iterator on nodes, ordered from top to bottom of the XML.
   */
  OrderedNodeIterator = 5,
  /**
   * An array of nodes, in any order.
   */
  UnorderedNodeList = 6,
  /**
   * An array of nodes, ordered from top to bottom of the XML.
   */
  OrderedNodeList = 7,
  /**
   * Any node matching the query.
   */
  AnyNode = 8,
  /**
   * The first node matching the query, from top to bottom.
   */
  FirstNode = 9,
}
