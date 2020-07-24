# react-transformer ⚙

> A XSLT-inspired XML transformer for React

[![NPM](https://img.shields.io/npm/v/react-transformer.svg)](https://www.npmjs.com/package/react-transformer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Note

This is currently a proof of concept. I do not recommend using it in a production build.

Contributions are still welcome to ship it into the wild ! 🚀

## Demonstration

You can find a demo [here](https://react-transformer.publica.re/demo/) and the source code on [GitHub](https://github.com/publica-re/react-transformer/blob/master/example/) !

## Install

```bash
yarn add react-transformer
```

## Usage

### Basic usage

First, you have to note that we rely on a global context to which the templates are registered, which allows us to use concurrent template systems in the same project.

We thus recommend to create a file `context.ts` with the following code:

```ts
import Transformer from "react-transformer";
const ctx = new Transformer.Context();
export default ctx;
```

When that's done, you can create your main component that imports your context. That's a good place to load the XML file you want to render too, but you can also do as I did, that is to pass the document to your `App`.

```ts
import React from "react";
import Transformer from "react-transformer";
import ctx from "./context";

export default class App extends React.Component<{ document: XMLDocument }> {
  render() {
    if (this.state.document !== undefined)
      return (
        <Transformer.Stylesheet
          contextData={ctx}
          contextDocument={this.state.document}
        />
      );
    return null;
  }
}
```

You're now ready to implement your first template ! In order to do that, just inherit `Transformer.Template` and you can get rocking !

```ts
import * as React from "react";
import Transformer from "react-transformer";
import ctx from "./context";

export default class Para extends Transformer.Template {
  render() {
    return (
      <p>
        <Transformer.ApplyTemplates {...this.ctx} />
      </p>
    );
  }
}

ctx.register(Para, { path: "para" });
```

Notice two things: 1. we imported our `context` 2. we used it to register our `template`. The `path` is just the XPath that has to match your node !

It now only remains to import our newly defined template in our `App`, and we're done !

```ts
...
import Transformer from "react-transformer";
import ctx from "./context";
import "./Para";

export default class App extends React.Component<{ document: XMLDocument }> {
...
```

### Go futher

You can take a look at [GitHub](https://github.com/publica-re/react-transformer/blob/master/example/) for an example or the [documentation](https://react-transformer.publica.re) !

## License

Copyright 2020, [David Baumgartner](https://github.com/dvbmgr).

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

## Contributing

I welcome happily contributions to pull request through [GitHub](https://github.com/publica-re/react-transformer).
