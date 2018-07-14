import { localize } from "./localizer";
export default function render() {
  return [<App>
            <LabelProvider label={localize("6")} className="inputLabel" />
            <Input id="id" />
        </App>];
}
export const localizeKeyMap = {
  6: "important"
};