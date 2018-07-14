import { localize } from "./localizer";
let App;
let LabelProvider;
export default class ListPage {
  constructor(props) {}

  render() {
    return <App>{localize("7")}<p>{localize("8")}</p>
            <LabelProvider label={localize("9")} />
        </App>;
  }

}
export const some2 = {};
export const localizeKeyMap = {
  7: "text",
  8: "some text also",
  9: "important"
};