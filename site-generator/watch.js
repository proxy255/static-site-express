// @flow
const chokidar = require("chokidar");
const log = require("./utils/logger");
const buildSite = require("./core/generator");

// Initially build site from source to destination
buildSite();

// Initialize watcher
chokidar
  .watch(["./content/layouts", "./content/pages", "./content/posts", "./content/assets", "./content/data", "./config/site.config.js"], {
    interval: 1000,
    persistent: true,
  })
  .on("change", () => {
    setTimeout(buildSite, 3000);
  })
  .on("error", (error) => log.error(`Watcher error: ${error}`));
