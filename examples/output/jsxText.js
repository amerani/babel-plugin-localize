import { localize } from "./localizer";
export default function render() {
  return [<App>
            <Simple>{localize("0")}</Simple>
            <Nested>{localize("1")}<Inline>{localize("2")}</Inline>. </Nested>
            <ul>{localize("3")}<li>{localize("4")}</li>
                <li>{localize("5")}</li>
            </ul>
            <PreserveMyText>i am special</PreserveMyText>
        </App>];
}
export default {};
export const k1 = 0;
export { o, k };
export const localizeKeyMap = {
  0: "here is some text",
  1: "here is some text. and also",
  2: "inline text",
  3: "this is a list",
  4: "item one.",
  5: "item two."
};