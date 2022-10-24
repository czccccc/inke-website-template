export const getUrlParams = (sourceStr) => {
  // 防止hash值, 影响参数名称
  let search;
  if (sourceStr) {
    search =
      sourceStr.indexOf('?') > -1
        ? sourceStr.split('?').slice(-1).toString()
        : sourceStr;
  } else {
    // 链接中的最后一个
    search =
      location.href.indexOf('?') > -1 &&
      location.href
        .split('?')
        .slice(-1)
        .toString()
        .replace(/#(|\!)\/(.+)?/, '');
  }
  // 如果没有, 则返回空对象
  if (!search) return {};

  let searchArr = decodeURIComponent(search).split('&');

  let urlParams = {};

  searchArr.map((str) => {
    let paramArr = str.split('=');
    // 如果已经有该参数就不添加进去了
    if (urlParams[paramArr[0]]) return false;

    urlParams[paramArr[0]] = unescape(paramArr[1]);
  });

  return urlParams;
};
