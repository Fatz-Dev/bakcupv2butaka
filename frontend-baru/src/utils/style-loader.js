export const StyleLoader = {
  loadedStyles: {},

  load(id, href) {
    if (this.loadedStyles[id]) return;

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
    this.loadedStyles[id] = link;
  },

  remove(id) {
    if (this.loadedStyles[id]) {
      document.head.removeChild(this.loadedStyles[id]);
      delete this.loadedStyles[id];
    }
  },

  loadScript(id, src) {
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    document.body.appendChild(script);
  },

  removeScript(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  },
};
