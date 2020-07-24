import React from "react";
import ctx from "./Components";
import Transformer from "react-transformer";

export default class App extends React.Component<
  {},
  { document?: XMLDocument }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      document: undefined,
    };
  }

  async componentDidMount() {
    const text = await (await fetch("demo.xml")).text();
    const xml = new DOMParser().parseFromString(text, "text/xml");
    this.setState({
      document: xml,
    });
  }

  render() {
    if (this.state.document !== undefined)
      return (
        <div className="App">
          <Transformer.Stylesheet
            contextData={ctx}
            contextDocument={this.state.document}
          />
        </div>
      );
    return null;
  }
}
