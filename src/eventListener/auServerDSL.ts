import { objectToQueryParams } from "../common.js"
import { makeFormData } from "./auFormData.js"
import { auCedEle, auMetaType, pluginArgs } from "../types.js"
import { getIncludeElement } from "../eventListener/parseAuTarget.js"

//todo:need to test this function
function toFormData(o) {
  // @ts-ignore
  return Object.entries(o).reduce((d, e) => (d.append(...e), d), new FormData())
}

const errorMsg = (newEle: auCedEle) => { return `Developer, you are using the au-ced attribute without a property of body or model for component named ${newEle?.tagName}. Either add body or model to the component, or remove the post hint` }

export const isAuServer = (auMeta: auMetaType) => { return auMeta.server?.length > 0 }

export const updateCedData = (model, json, plugIn: pluginArgs) => {
  // todo: what if the CED has a get attribute? we need to turn the form into querystring params
  // @ts-ignore
  const merged = { ...model, ...json };
  const hasBody = plugIn.cedEle.hasOwnProperty('body');
  const hasModel = plugIn.cedEle.hasOwnProperty('model');
  if (hasBody) {
    // since we merged, shouldn't have duplicates
    // todo: test this out and uncomment the toFormData(merged) line
    //newEle.body = toFormData(merged)
  }
  if (hasModel) {
    plugIn.cedEle.model = merged
  }
  if (!hasBody && !hasModel) {
    throw new Error(errorMsg(plugIn.cedEle))
  }
}

export const getModel = (plugIn: pluginArgs) => {
  const formDataEle = getIncludeElement(plugIn.ele, plugIn.auMeta)
  const fd = makeFormData(formDataEle, plugIn.ele)
  return Object.fromEntries(fd.entries())
}

/**
 * <div au-server="post ./users"
 * todo: the following are not implemented yet, might be nice
 * <div au-server="post ./users/${model.userid}"
 * <div au-server="post as json ./users"
 * <div au-server="post as formdata ./users"
 */
export async function attachServerRespToCedEle(plugIn: pluginArgs) {
  if (!plugIn.auMeta.server) { return }
  const [verb, url] = plugIn.auMeta.server.split(' ')

  if (verb === 'post') {
    const model = getModel(plugIn)
    const json = await plugIn.auConfig.serverPost(url, model, plugIn)
    // @ts-ignore
    const merged = { ...model, ...json }
    updateCedData(merged, json, plugIn)
  }

  if (verb === 'get') {
    //todo: add in any querystring params from the au-server attribute
    const model = getModel(plugIn);
    const qs = objectToQueryParams(model);
    const urlWithQs = `${url}${qs}`;
    const json = await plugIn.auConfig.serverGet(urlWithQs, plugIn);
    updateCedData(model, json, plugIn)
  }
}