let App;
let LabelProvider;
let localize;
export default class ListPage {
  constructor(props) {}

  render() {
    return <App>{localize("loc_0")}<p>{localize("loc_1")}</p>
            <LabelProvider label={localize("loc_2")} />
        </App>;
  }

}
const keyMap = {
  loc_0: "text",
  loc_1: "some text also",
  loc_2: "important"
};