let localizer;//import
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
        </App>
    ])
}
const localize = (key) => localizer(keyMap)(key);