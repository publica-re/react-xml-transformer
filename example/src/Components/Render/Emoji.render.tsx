import * as React from "react";
import ctx from "../context";
import Transformer from "react-xml-transformer";

export default class EmojiRender extends Transformer.Template {
  render() {
    const emojis = {
      happy: "😊",
      thinking: "🤔",
      rollingeyes: "🙄",
      toohappy: "😂",
      heart: "❤",
    };
    return (
      <Transformer.Choose
        {...this.ctx}
        cases={Object.entries(emojis).map(([name, emoji]) => ({
          test: `boolean(string(./@code)='${name}')`,
          node: emoji,
        }))}
        otherwise={"😁"}
      />
    );
  }
}

ctx.register(EmojiRender, { path: "p:emoji", mode: "render" });
