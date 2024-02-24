import { isAuElement } from "../src/common.js";
import { tfConfigType, auElementType } from "../src/types.js";

export async function recurseTestNodes(node: HTMLElement, auConfig: tfConfigType) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    await Array.from(node.children).forEach(child => recurseTestNodes(child as HTMLHtmlElement, auConfig))
    if (!isAuElement(node)) { return; }
    await auConfig.eventListenerBuilder(node as unknown as HTMLElement, auConfig)
  }
}

