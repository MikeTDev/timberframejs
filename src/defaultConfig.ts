import { swapOptions, triggerOptions } from "./auConstants.js";
import { eventListenerBuilder } from "./eventListener/addEventListener.js";
import { mainWorkflow } from "./eventListener/workflow.js";
import { getJson, postJson } from "./fetcher.js";
import { tfConfigType } from "./types.js";
import { preserveFocusPlugin } from "./plugins/preserveFocus/index.js";
import { auHrefPlugin } from "./plugins/auHref/index.js";
import { auHostPlugIn } from "./plugins/auHost/index.js";
import { tfHashPlugin } from "./plugins/tfHash/index.js";

// for now the assumption is that all responses will be json 
// you can send data to the server as FormData or json, but the response should be json
export const defaultConfig = {
  eventListenerBuilder,
  workflow:mainWorkflow,
  // note: serverPost can be postForm or postJson or a custom one
  serverPost:postJson,
  serverGet: getJson,
  defaultAttributes:{
    'tf-swap': swapOptions.outeHTML,
    'tf-trigger':triggerOptions.click,
  },
  auCed:{
    verb:'post'
  },
  plugins:[ auHrefPlugin, preserveFocusPlugin, auHostPlugIn, tfHashPlugin]
} as tfConfigType
