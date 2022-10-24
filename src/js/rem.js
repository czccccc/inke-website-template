window.flexible = {
  draftSize: 1440,
  fontUnit: 100,
  maxWidthSize: 2560,
  minWidthSize: 767,
  rate: 1,
  get size() {
    const htmlWidth =
      document.documentElement.clientWidth || document.body.clientWidth;
    return Math.max(this.minWidthSize, Math.min(htmlWidth, this.maxWidthSize));
  },
  pxtorem(val) {
    return val / this.fontUnit;
  },
  rpxtopx(val) {
    return val / this.rate;
  },
  setRem() {
    const htmlDom = document.getElementsByTagName('html')[0];
    htmlDom.style.fontSize =
      (this.size / this.draftSize) * this.fontUnit + 'px';
  },
};

window.flexible.setRem();
window.onresize = function () {
  window.flexible.setRem();
};
