(this["webpackJsonpreact-transformer-example"]=this["webpackJsonpreact-transformer-example"]||[]).push([[0],{10:function(t,e,n){},16:function(t,e,n){"use strict";n.r(e);n(10);var r,o=n(0),a=n.n(o),i=n(7),s=n.n(i),c=n(5),u=n.n(c),p=n(8),l=n(1),d=n(2),h=n(4),f=n(3);function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function N(t,e,n){return e&&m(t.prototype,e),n&&m(t,n),t}function y(){return(y=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function b(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}function v(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function x(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function O(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"===typeof t)return x(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?x(t,e):void 0}}(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var r=0;return function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=t[Symbol.iterator]()).next.bind(n)}function _(t){for(var e=[],n=t;null!==n;n=n.parentNode){var r=n,o=t.previousSibling,a=1;switch(n.nodeType){case Node.ELEMENT_NODE:if(r.hasAttribute("id")&&1===document.querySelectorAll("#"+r.getAttribute("id")).length)return e.unshift('//id("'+r.getAttribute("id")+'")'),e.join("/");for(var i=r.nodeName,s=r.previousSibling,c=1;null!==s;s=s.previousSibling)s.nodeName===i&&c++;e.unshift("*[local-name()='"+r.localName+"' and namespace-uri()='"+r.namespaceURI+"']["+c+"]");break;case Node.DOCUMENT_NODE:return"/"+e.join("/");case Node.TEXT_NODE:for(;null!==o;o=o.previousSibling)o.nodeType===Node.TEXT_NODE&&a++;e.unshift("text()["+a+"]");break;case Node.PROCESSING_INSTRUCTION_NODE:case Node.COMMENT_NODE:case Node.DOCUMENT_TYPE_NODE:throw TypeError("react-transformer: you shouldn't try to render the XPath of a comment node and/or a processing instruction.")}}return"/"+e.join("/")}!function(t){t[t.Any=0]="Any",t[t.Number=1]="Number",t[t.String=2]="String",t[t.Boolean=3]="Boolean",t[t.UnorderedNodeIterator=4]="UnorderedNodeIterator",t[t.OrderedNodeIterator=5]="OrderedNodeIterator",t[t.UnorderedNodeList=6]="UnorderedNodeList",t[t.OrderedNodeList=7]="OrderedNodeList",t[t.AnyNode=8]="AnyNode",t[t.FirstNode=9]="FirstNode"}(r||(r={}));var E={ApplyTemplates:function(t){function e(){return t.apply(this,arguments)||this}b(e,t);var n=e.prototype;return n.__processTemplate=function(t,e){var n=this.props.contextData.getTemplateByNode(t,this.props.mode);return null!==n?Object(o.createElement)(n,Object.assign({},y({},this.ctx,{contextNode:t}),{key:e})):this.props.contextData.notFoundTemplateNode(t)},n.render=function(){var t=this;return this.props.contextData.xpath(this.props.select||"node()",this.props.contextNode,r.OrderedNodeList).map((function(e,n){return t.__processTemplate(e,n)}))},N(e,[{key:"ctx",get:function(){return{contextData:this.props.contextData,contextNode:this.props.contextNode,mode:this.props.mode}}}]),e}(o.Component),CallTemplate:function(t){function e(){return t.apply(this,arguments)||this}return b(e,t),e.prototype.render=function(){var t=this.props.contextData.getTemplateByName(this.props.name,this.props.mode);return null!==t?Object(o.createElement)(t,Object.assign({},this.ctx)):this.props.contextData.notFoundTemplateName(this.props.name)},N(e,[{key:"ctx",get:function(){return{contextData:this.props.contextData,contextNode:this.props.contextNode,mode:this.props.mode}}}]),e}(o.Component),ValueOf:function(t){function e(){return t.apply(this,arguments)||this}return b(e,t),e.prototype.render=function(){return this.props.contextData.xpath(this.props.select||"node()",this.props.contextNode,r.OrderedNodeList).map((function(t){return t.nodeValue})).join(this.props.separator||"")},e}(o.Component),Template:function(t){function e(e){var n;return(n=t.call(this,e)||this).__observer=null,n.onBeforeMutate=function(t){return t()},n.onAfterMutate=function(){return null},n.state={path:_(e.contextNode)},n.__onMutate=n.__onMutate.bind(v(n)),n.__setupObserver=n.__setupObserver.bind(v(n)),n.onBeforeMutate=n.onBeforeMutate.bind(v(n)),n.onAfterMutate=n.onAfterMutate.bind(v(n)),n}b(e,t);var n=e.prototype;return n.__setupObserver=function(){this.__observer=new MutationObserver(this.__onMutate),this.__observer.observe(this.props.contextNode,{subtree:!0,childList:!0,attributes:!0,characterData:!0})},n.__onMutate=function(){var t=this;this.onBeforeMutate((function(){t.setState({path:_(t.props.contextNode)},(function(){return t.forceUpdate(t.onAfterMutate)}))}))},n.componentDidMount=function(){this.__setupObserver()},N(e,[{key:"ctx",get:function(){return{contextData:this.props.contextData,contextNode:this.props.contextNode}}}]),e}(o.Component),Stylesheet:function(t){function e(){return t.apply(this,arguments)||this}return b(e,t),e.prototype.render=function(){return this.props.contextData.__render(this.props.contextDocument)},e}(a.a.Component),If:function(t){function e(){return t.apply(this,arguments)||this}return b(e,t),e.prototype.render=function(){return!1!==this.props.contextData.xpath(this.props.test,this.props.contextNode,r.Boolean)&&this.props.children||null},e}(o.Component),ForEach:function(t){function e(){return t.apply(this,arguments)||this}return b(e,t),e.prototype.render=function(){var t=this;return this.props.contextData.xpath(this.props.select||"node()",this.props.contextNode,r.OrderedNodeList).map((function(e){return t.props.do(y({},t.ctx,{contextNode:e}))}))},N(e,[{key:"ctx",get:function(){return{contextData:this.props.contextData,contextNode:this.props.contextNode,mode:this.props.mode}}}]),e}(o.Component),Context:function(){function t(){this.__templates=[]}var e=t.prototype;return e.__nsResolver=function(t){return(t.ownerDocument||t).createNSResolver(t)},e.sortedTemplate=function(){return this.__templates=this.__templates.sort((function(t,e){return void 0!==t.priority?void 0!==e.priority?t.priority-e.priority:1:void 0!==e.priority?-1:0})),this.__templates},e.notFoundStyleSheet=function(){return a.a.createElement("span",{className:"react-transform-internal not-found"},"No stylesheet")},e.notFoundTemplateName=function(t){return a.a.createElement("span",{className:"react-transform-internal not-found"},"Template ",t," not found")},e.notFoundTemplateNode=function(t){return a.a.createElement("span",{className:"react-transform-internal not-found"},"No template found for ",t.nodeName)},e.xpath=function(t,e,n){var o=e.ownerDocument||e;if(null===o&&n<XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE)return null;if(null===o&&n>=XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE)return[];var a=o.evaluate(t,e,this.__nsResolver(o.documentElement),n);switch(n){case r.Any:return a.booleanValue||a.numberValue||a.singleNodeValue||a.stringValue||[].concat(Array(a.snapshotLength).keys()).map((function(t,e){return a.snapshotItem(e)})).filter((function(t){return null!==t}));case r.Number:return a.numberValue;case r.String:return a.stringValue;case r.Boolean:return a.booleanValue;case r.AnyNode:case r.FirstNode:return a.singleNodeValue;case r.UnorderedNodeIterator:case r.OrderedNodeIterator:return u.a.mark((function t(){var e;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=null;case 1:if(!(e=a.iterateNext())){t.next=6;break}return t.next=4,e;case 4:t.next=1;break;case 6:case"end":return t.stop()}}),t)}))();case r.UnorderedNodeList:case r.OrderedNodeList:return[].concat(Array(a.snapshotLength).keys()).map((function(t,e){return a.snapshotItem(e)})).filter((function(t){return null!==t}))}},e.getTemplateByNode=function(t,e){for(var n,o=O(this.sortedTemplate().filter((function(t){return t.mode===e&&void 0!==t.path})));!(n=o()).done;){var a=n.value,i=""+a.path;if(this.xpath(i,t.parentNode||t,r.UnorderedNodeList).find((function(e){return Object.is(e,t)})))return a.template}return null},e.getTemplateByName=function(t,e){var n;return(null===(n=this.sortedTemplate().find((function(n){return n.name===t&&n.mode===e})))||void 0===n?void 0:n.template)||null},e.register=function(t,e){this.__templates.push({template:t,path:e.path,name:e.name,mode:e.mode,priority:e.priority})},e.__render=function(t){var e=this.getTemplateByNode(t);return null===e?this.notFoundStyleSheet():a.a.createElement(e,{contextData:this,contextNode:t})},t}()},g=new E.Context,T=function(t){Object(h.a)(n,t);var e=Object(f.a)(n);function n(){return Object(l.a)(this,n),e.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){return o.createElement("article",null,o.createElement(E.ApplyTemplates,Object.assign({},this.ctx,{select:"./p:root/p:title"})),o.createElement(E.ApplyTemplates,Object.assign({},this.ctx,{select:"./p:root/*[not(self::p:title)]"})),o.createElement("footer",null,"Here's a reference to the text of the title:"," ",o.createElement("span",{className:"dont-click",title:"No, not me, the title!"},o.createElement(E.ApplyTemplates,Object.assign({},this.ctx,{select:"./p:root/p:title/text()"})))))}}]),n}(E.Template);g.register(T,{path:"/"});var j=function(t){Object(h.a)(n,t);var e=Object(f.a)(n);function n(){return Object(l.a)(this,n),e.apply(this,arguments)}return Object(d.a)(n,[{key:"onClickHandler",value:function(){var t=this.props.contextNode;this.props.contextNode.hasAttribute("clicked")&&(t.textContent=this.props.contextNode.getAttribute("clicked"))}},{key:"render",value:function(){return o.createElement("h1",{onClick:this.onClickHandler.bind(this)},o.createElement(E.ApplyTemplates,this.ctx))}}]),n}(E.Template);g.register(j,{path:"p:title"});var D=function(t){Object(h.a)(n,t);var e=Object(f.a)(n);function n(){return Object(l.a)(this,n),e.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){return o.createElement(E.If,Object.assign({},this.ctx,{test:"normalize-space()!=''"}),o.createElement("span",null,o.createElement(E.ValueOf,Object.assign({},this.ctx,{select:"."}))))}}]),n}(E.Template);g.register(D,{path:"text()"});var A=function(t){Object(h.a)(n,t);var e=Object(f.a)(n);function n(){return Object(l.a)(this,n),e.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){return o.createElement("p",null,o.createElement(E.ApplyTemplates,this.ctx))}}]),n}(E.Template);g.register(A,{path:"p:para"});var S=g,k=function(t){Object(h.a)(n,t);var e=Object(f.a)(n);function n(t){var r;return Object(l.a)(this,n),(r=e.call(this,t)).state={document:void 0},r}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var t=Object(p.a)(u.a.mark((function t(){var e,n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("demo.xml");case 2:return t.next=4,t.sent.text();case 4:e=t.sent,n=(new DOMParser).parseFromString(e,"text/xml"),this.setState({document:n});case 7:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){return void 0!==this.state.document?a.a.createElement("div",{className:"App"},a.a.createElement(E.Stylesheet,{contextData:S,contextDocument:this.state.document})):null}}]),n}(a.a.Component);s.a.render(a.a.createElement(k,null),document.getElementById("root"))},9:function(t,e,n){t.exports=n(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.b14ae69e.chunk.js.map