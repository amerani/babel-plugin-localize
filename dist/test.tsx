let App;
let LabelProvider;
let localize;
export default class ListPage {
  constructor(props: any) {
  }
  render() {
    return (
      <App>{localize("loc_0")}

        <p>{localize("loc_1")}</p>
        <LabelProvider label={localize("loc_2")} />
      </App>);
  }}