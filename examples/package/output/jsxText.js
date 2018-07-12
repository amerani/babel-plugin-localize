export default function render() {
  return [
  <App>
            <Simple>loc_0</Simple>
            <Nested>loc_1<Inline>loc_2</Inline>.</Nested>
            <ul>loc_3
      <li>loc_4</li>
                <li>loc_5</li>
            </ul>
            <PreserveMyText>i am special</PreserveMyText>
        </App>];

}const keyMap = { loc_0: "here is some text", loc_1: "here is some text. and also", loc_2: "inline text", loc_3: "this is a list", loc_4: "item one.", loc_5: "item two." };