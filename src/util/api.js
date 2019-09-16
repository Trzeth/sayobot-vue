let cdnBase = "https://cdn.sayobot.cn:25225";
let resourceBase = "https://txy1.sayobot.cn";
let apiBase = "https://api.sayobot.cn";

export const NoticeUri = apiBase + "/static/notice";

export const SupportUri = apiBase + "/static/support";

export function SearchtoUri(params, limit, offset = 0) {
  let uri = apiBase + "/beatmaplist";
  uri += "?0=" + limit;
  uri += "&";
  uri += "1=" + offset;
  uri += "&";
  uri += "2=" + params.mode;
  if (params.mode == 4) {
    let searchOptine = params.searchOptine;
    uri += "&3=" + searchOptine.keyword;

    let temp = 0;
    temp = sum(searchOptine.subType);
    uri += temp ? "&4=" + temp : "";
    temp = sum(searchOptine.mode);
    uri += temp ? "&5=" + temp : "";
    temp = sum(searchOptine.class);
    uri += temp ? "&6=" + temp : "";
    temp = sum(searchOptine.genre);
    uri += temp ? "&7=" + temp : "";
    temp = sum(searchOptine.language);
    uri += temp ? "&8=" + temp : "";

    // To do other paramer
  }
  return uri;
}

function sum(params) {
  let sum = 0;
  if (params != null) {
    params.forEach(element => {
      sum += Number(element);
    });
  }

  return sum;
}
