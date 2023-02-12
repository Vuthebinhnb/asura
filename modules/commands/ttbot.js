module.exports.config = {
  name: "ttbot",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kanichi",
  description: "Kiểm tra thông tin adminbot.",
  commandCategory: "Thông tin adminbot",
  usages: "/ttbot để xem thông tin về bot",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = [
"https://i.imgur.com/Tqy5f8o.jpg"
  ];
  var callback = () => api.sendMessage({body:`🤖 𝐌𝐢𝐫𝐚𝐢 𝐁𝐨𝐭 🤖 
✅Dùng lệnh *ad để biết thông tin về ADMINBOT
✅Nếu có yêu cầu hay thắc mắc gì bạn có thể lệnh *callad
✅(Có thể bạn chưa biết) Dùng lệnh *help và *menu để xem các lệnh có thể sử dụng trong bot
❎Không spam bot nếu spam mà để admin biết sẽ bị cấm sử dụng bot
❎Không chửi bot vì bot rất dễ thương và cute
❎Có qua có lại tôn trọng bot cũng như tôn trọng admin bot
🍀Kí Tên :Đinh Văn Quý`,attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
   };