let App;
let LabelProvider;
let localize;
export default class ListPage {
  constructor(props) {}

  render() {
    return <App>{localize("loc_7")}<p>{localize("loc_8")}</p><LabelProvider label={localize("loc_9")} /></App>;
  }

}
const keyMap = {
  loc_7: "text",
  loc_8: "some text also",
  loc_9: "important"
};