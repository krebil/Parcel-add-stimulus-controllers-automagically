import {definitionsFromContext as dfc} from "./src/js/definitionsFromContext";
import {Definition} from "@hotwired/stimulus";

export function definitionsFromContext(context: object): Definition[] {
    return dfc(context)
}