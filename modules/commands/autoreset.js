module. exports. config = {
    name: "autoreset",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Thแปi gian",
    commandCategory: "Hแป thแปng",
    cooldowns: 5
}
module. exports. handleEvent = async function({ api, event, args, Users,Threads }) {
  const moment = require("moment-timezone");
  var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
  var color = ["\x1b[33m", "\x1b[34m", "\x1b[35m", '\x1b[36m','\x1b[31m','\x1b[1m'];
  var more = color[Math.floor(Math.random() * color.length)];
  var idad = global.config.ADMINBOT;    
  console.log('\x1b[36m'+ 'TIME ๐: '+ more + timeNow)
  var seconds = moment.tz("Asia/Ho_Chi_Minh").format("ss");
  var timeRestart_1 = `02:03:${seconds}`
  //console.log(timeNowRestart)
  if ((timeNow == timeRestart_1) && seconds < 6 ) {
    for( let ad of idad) {
  setTimeout(() =>
          api.sendMessage(`[ ๐ณ๐ธ๐ฝ๐ท ๐๐ฐ๐ฝ ๐๐๐ ] - ๐๐ฎฬ๐ ๐ด๐ถ๐ผฬฬ ๐น๐ฎฬ ๐: ${timeNow}\n๐๐ผ๐ ๐๐ฒฬ ๐๐ถ๐ฒฬฬ๐ป ๐ต๐ฎฬ๐ป๐ต ๐ฟ๐ฒ๐๐ฒ๐ ๐ต๐ฒฬฃฬ ๐๐ต๐ผฬฬ๐ป๐ด ๐น๐ฎฬฃ๐ถ โข๏ธ`,ad, () =>process.exit(1)), 1000);
    }
    }
}
module. exports. run = async  ({ api, event, args }) => {
      const moment = require("moment-timezone");
      var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
        api.sendMessage(`${timeNow}`, event.threadID)
}