export default function render() {
  return ([
        <App>
            <Simple>here is some text</Simple>
            <Nested>here is some text. and also <Inline>inline text</Inline>. </Nested>
            <ul>this is a list
                <li>item one.</li>
                <li>item two.</li>
            </ul>
            <PreserveMyText>i am special</PreserveMyText>
        </App>,
  ]);
}

export const k1 = 0;
const o = 0;
const k = 1;
export {
  o,
  k,
};
