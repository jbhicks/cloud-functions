/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
const functions = require("firebase-functions");
const axios = require("axios");

export const getSCStream = functions.https.onRequest((req: any, res: any) => {
  console.log(`req received with params ${JSON.stringify(req.query)}`);
  const offset = req.query.offset;
  const limit = req.query.limit;
  const url = `https://api-v2.soundcloud.com/stream?offset=${offset}&sc_a_id=20cfd6d050175896f575cdef54de242f5e1c6013&limit=${limit}&promoted_playlist=true&client_id=RfoqFLXghO6UuFNArI1Ksd17qWClDBFt&app_version=1660231961&app_locale=en`;
  const headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Authorization": "OAuth 2-293438-141564746-gzTC5XoJOlbORK",
    "Connection": "keep-alive",
    "Host": "api-v2.soundcloud.com",
    "Origin": "https://soundcloud.com",
    "Referer": "https://soundcloud.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Microsoft Edge\";v=\"101\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
  };

  axios.get(url, {headers})
      .then(function(response: any) {
        console.log(`retrieved ${response.data.collection.length} tracks`);
        res.send(response.data);
      });
});
