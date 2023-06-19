import { HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"

const encoder = new TextEncoder()

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {
  let offset = 1;
  let limit = 100;
  const client_id = spinSdk.config.get("sc_client_id");
  const sc_token = spinSdk.config.get("sc_token");
  const urlStr = `https://api-v2.soundcloud.com/stream?offset=${offset}&limit=${limit}&promoted_playlist=true&client_id=${client_id}&app_version=1686915292&app_locale=en`;

  const stream = await fetch(urlStr, {
    method: "GET",
    headers: {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "Authorization": `${sc_token}`,
      "Connection": "keep-alive",
      "DNT": "1",
      "Host": "api-v2.soundcloud.com",
      "Origin": "https://soundcloud.com",
      "Referer": "https://soundcloud.com/",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "cross-site",

    },
  });
  const data: any = await stream.json();
  console.log(`retrieved ${data.collection.length} tracks`);

  return {
    status: 200,
    headers: { "foo": "bar" },
    body: encoder.encode(JSON.stringify(data)).buffer
  }
}
