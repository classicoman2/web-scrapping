const fs = require("fs");
const start = require("./start");

const OUTPUT_DIR = "_output";
const CURRENT_SEASON = 2021;

(function () {
  const url_base = "https://www.procyclingstats.com";
  //Obté directoris dels equips
  let scrapImages = process.argv[2] == "true" ? true : false;
  let scrapData = process.argv[3] == "true" ? true : false;

  let teamStart = process.argv[4];
  let teamEnd = process.argv[5];

  let season = process.argv[6] !== undefined ? process.argv[6] : CURRENT_SEASON;

  //Create output dir if doesn't exist
  if (scrapImages || scrapData) {
    if (!fs.existsSync("./" + OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    let i = Number(teamStart);
    // Random interval between 3 and 6 sec
    let interval = setInterval(() => {
      start(OUTPUT_DIR, url_base, scrapImages, scrapData, i, i + 1, season);
      i++;

      if (i == teamEnd) clearInterval(interval);
    }, Math.floor(Math.random() * (6000 - 3000) + 3000));
  }
})();
