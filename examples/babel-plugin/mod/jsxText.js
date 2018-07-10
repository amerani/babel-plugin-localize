let localizer; //import

export default function render() {
  return [<App><Simple>{localize("loc_0")}</Simple><Nested>{localize("loc_1")}<Inline>{localize("loc_2")}</Inline>. </Nested><ul>{localize("loc_3")}<li>{localize("loc_4")}</li><li>{localize("loc_5")}</li></ul><PreserveMyText>i am special</PreserveMyText></App>];
}

const localize = key => localizer(keyMap)(key);

const keyMap = {
  loc_0: "here is some text",
  loc_1: "here is some text. and also",
  loc_2: "inline text",
  loc_3: "this is a list",
  loc_4: "item one.",
  loc_5: "item two."
};