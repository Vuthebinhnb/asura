module.exports.config = {
  name: "upt",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "DuyVuong",
  description: "Random แบฃnh theo api - uptime",
  commandCategory: "Hแป Thแปng",
  cooldowns: 3
};
function byte2mb(bytes) {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(bytes, 10) || 0;
  while (n >= 1024 && ++l) n = n / 1024;
  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}
module.exports.run = async ({ api, event }) => {
  const axios = require('axios');
  const fetch = global.nodemodule["node-fetch"];
  const request = require('request');
  const res = await axios.get(`https://apituandz1407.herokuapp.com/api/hearing.php`);
  var poem = res.data.data;
  const fs = require("fs");
  const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
  var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = '๐๐ก๐ฎฬ ๐๐ก๐ฬฃฬ๐ญ'
  if (thu == 'Monday') thu = '๐๐ก๐ฎฬฬ ๐๐๐ข'
  if (thu == 'Tuesday') thu = '๐๐ก๐ฎฬฬ ๐๐'
  if (thu == 'Wednesday') thu = '๐๐ก๐ฎฬฬ ๐๐ฎฬ'
  if (thu == "Thursday") thu = '๐๐ก๐ฎฬฬ ๐๐ฬ๐ฆ'
  if (thu == 'Friday') thu = '๐๐ก๐ฎฬฬ ๐๐ฬ๐ฎ'
  if (thu == 'Saturday') thu = '๐๐ก๐ฎฬฬ ๐๐ฬ๐ฒ'
  const time = process.uptime() + global.config.UPTIME;
    hours = Math.floor(time / (60 * 60)),
    minutes = Math.floor((time % (60 * 60)) / 60),
    seconds = Math.floor(time % 60);
  const pidusage = await global.nodemodule["pidusage"](process.pid);
  const timeStart = Date.now();
  axios.get('https://apituandz1407.herokuapp.com/api/gaivuto.php').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
      api.sendMessage({
        body: `๐พ ๐๐ข๐ฬฃฬ๐ง ๐ญ๐ฬฃ๐ข ๐ฅ๐ฬ: ${thu} ${gio}  ๐ก๐ฬฃ๐ฒฬ.\n๐ปโโโโ โข๐โข โโโโ๐ป\nใค===๐ ๐๐๐ง๐ ๐จ๐ฆ๐๐ฅ ๐===\n๐ ๐๐จฬฬ๐ง๐? ๐ง๐?๐ฎฬ๐จฬฬ๐ข ๐๐ฎฬ๐ง๐?: ${global.data.allUserID.length}\n๐ฉ ๐๐จฬฬ๐ง๐? ๐ง๐ก๐จฬ๐ฆ: ${global.data.allThreadID.length}\nใค=====๐ฅ ๐ฆ๐ฌ๐ฆ๐ง๐๐? ๐ฅ=====\n๐ฎ ๐๐จ๐ญ ๐๐ฒ๐ฉ๐: ๐?๐ถ๐ฟ๐ฎ๐ถ \n๐ณ ๐๐ซ๐๐๐ข๐ฑ: ${global.config.PREFIX}\n๐พ ๐๐๐ซ๐ฌ๐ข๐จ๐ง: ๐.๐.๐๐\n๐ป ๐๐ฉ๐ฎ ฤ๐๐ง๐? ๐ฌ๐ฎฬฬ ๐๐ฎฬฃ๐ง๐?: ${pidusage.cpu.toFixed(1)}\n๐ ๐๐๐ฆ ฤ๐๐ง๐? ๐ฌ๐ฎฬฬ ๐๐ฎฬฃ๐ง๐?: ${byte2mb(pidusage.memory)}\n๐ ๐๐ข๐ง๐?: ${Date.now() - timeStart}๐ฆ๐ฌ\n๐ฌ ๐๐ก๐ขฬ๐ง๐ก: ${poem}\n๐โโโโ โข๐ธโข โโโโ๐\n๐๐๐๐๐ : ๐ณ๐ธ๐ฝ๐ท ๐๐ฐ๐ฝ ๐๐๐`,
        attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
      }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), event.messageID);
    };
    request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
  })
} 