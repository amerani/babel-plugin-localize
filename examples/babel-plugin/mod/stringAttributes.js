export default function render() {
  return [<App>
            <LabelProvider label={localize("loc_0")} className="inputLabel" />
            <Input id="id" />
        </App>];
}
const keyMap = {
  loc_0: "important"
};