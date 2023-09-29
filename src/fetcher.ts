import { pluginArgs } from "./types.js";

/**
 * It is recommended that you implement your own post and get functions.
 */
export async function postForm(url:string, body, plugin:pluginArgs) {
  try {
    if (body === undefined) { return; }
    const response = await fetch(url, {
      method: 'POST',
      body: body
    })
    if (response.ok) {
      const data = await response.json(); // Assuming the server responds with JSON data
      return data;
    } else {
      throw new Error('Network response was not ok');
    }
  } catch(error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}
export async function postJson(url:string, postData, plugin:pluginArgs ) {
  if (postData === undefined) { return; }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })

    if (response.ok) {
      const data = await response.json(); // Assuming the server responds with JSON data
      return data;
    } else {
      throw new Error('Network response was not ok');
    }
  } catch(error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

export async function getJson(url, plugin:pluginArgs) {
  if (url === undefined) { 
    // todo: throw a user friendly error that the url is undefined?
    // and which component needs to be fixed
    return; }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      const data = await response.json(); // Assuming the server responds with JSON data
      return data;
    } else {
      throw new Error('Network response was not ok');
    }
  } catch(error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}
