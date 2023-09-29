import { auObserver, swapOptions, defaultConfig} from "../../src/index.js";
import { createElement, defineElement, html } from "../../src/utils/index.js";
import { DIALOG_POST, DialogPostExample } from "./auPostExample.js";
import { DIALOG_GET, DialogGetExample } from "./auGetExample.js";

auObserver(document.body, defaultConfig)
export const placeholderCED = {
  tagName: 'div',
  attributes: {
    id: 'dialog-placeholder'
  }
}
defineElement(DIALOG_POST, DialogPostExample, 'dialog')
defineElement(DIALOG_GET, DialogGetExample, 'dialog')

const placeholderEle = createElement<HTMLDivElement>(placeholderCED)

const main = html`
<main>
  <!-- Example 1-->
  <button
    au-ced="get dialog?is=dialog-get&open"
    au-target="#${placeholderCED.attributes.id}"
    au-swap="${swapOptions.innerHTML}"
    au-trigger="click">get open dialog attribute</button>
  <!-- Example 2-->
  <button
    au-ced="post dialog?is=dialog-post"
    au-target="#${placeholderCED.attributes.id}"
    au-trigger="click"
    au-swap="${swapOptions.innerHTML}"
    name="button_action"
    value="show">post dialog.show</button>
  <!-- Example 3-->
  <button
    au-ced="post dialog?is=dialog-post"
    au-target="#${placeholderCED.attributes.id}"
    au-trigger="click"
    au-swap="${swapOptions.innerHTML}"
    name="button_action"
    value="showModal">post dialog.showModal</button>
  </main>
  `

document.body.append(main, placeholderEle)
