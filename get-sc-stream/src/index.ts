import { HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"

const encoder = new TextEncoder()
let router = utils.Router();

async function getScStream(offset: string, limit: string) {
  const client_id = spinSdk.config.get("sc_client_id");
  const sc_token = spinSdk.config.get("sc_token");
  const urlStr = `https://api-v2.soundcloud.com/stream?offset=${offset}&limit=${limit}&promoted_playlist=true&client_id=${client_id}&app_version=1686915292&app_locale=en`;
  console.log(`url: ${urlStr}`);
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

  return data;
}

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {
  const url = new URL(request.headers["spin-full-url"]);
  const params = url.searchParams;
  const offset = params.get("offset") ?? "0";
  const limit = params.get("limit") ?? "100";
  const data = await getScStream(offset, limit);

  return {
    status: 200,
    body: encoder.encode(JSON.stringify(data)).buffer
  }
}
