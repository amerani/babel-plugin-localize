export default function render() {
  return [<App><Simple>{localize("loc_0")}</Simple><Nested>{localize("loc_1")}<Inline>{localize("loc_2")}</Inline>. </Nested><ul>{localize("loc_3")}<li>{localize("loc_4")}</li><li>{localize("loc_5")}</li></ul><PreserveMyText>i am special</PreserveMyText></App>];
}