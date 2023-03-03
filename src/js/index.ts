import { Application } from "@hotwired/stimulus"
//this is my glob import to get all the controllers, like require.context in webpack
import * as files from "./controllers/**/*.ts"
import {definitionsFromContext} from "./definitionsFromContext";

declare global {
    interface Window {
        Stimulus:any;
    }
}
var f = definitionsFromContext(files)
console.log(f)
window.Stimulus = Application.start() 
window.Stimulus.debug = true;
window.Stimulus.load(f)
 