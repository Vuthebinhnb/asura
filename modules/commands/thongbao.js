const fs = require('fs');
const request = require('request');

module.exports.config = {
    name: "thongbao",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "TruongMini, mod by NCQB vร  Magus",
    description: "",
    commandCategory: "Tiแปn รญch",
    usages: "[msg]",
    cooldowns: 5,
}

let atmDir = [];

const getAtm = (atm, body) => new Promise(async (resolve) => {
    let msg = {}, attachment = [];
    msg.body = body;
    for(let eachAtm of atm) {
        await new Promise(async (resolve) => {
            try {
                let response =  await request.get(eachAtm.url),
                    pathName = response.uri.pathname,
                    ext = pathName.substring(pathName.lastIndexOf(".") + 1),
                    path = __dirname + `/cache/${eachAtm.filename}.${ext}`
                response
                    .pipe(fs.createWriteStream(path))
                    .on("close", () => {
                        attachment.push(fs.createReadStream(path));
                        atmDir.push(path);
                        resolve();
                    })
            } catch(e) { console.log(e); }
        })
    }
    msg.attachment = attachment;
    resolve(msg);
})

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads }) {
    const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, body } = event;
    let name = await Users.getNameUser(senderID);
    switch (handleReply.type) {
        case "sendnoti": {
            let text = `====== [ ๐ฃ๐ต๐ฎฬ๐ป ๐ต๐ผฬฬ๐ถ ๐๐ฬฬ ๐จ๐๐ฒ๐ฟ ] ======\n--------------\nใ๐ง๐ถ๐บ๐ฒใ: ${gio}\n--------------\nใ๐๐จฬฃฬ๐ข ๐๐ฎ๐ง๐ ใ : ${body}\n--------------\n๐ป๐ฬฬ ๐๐๐ฬ๐ฬฬ๐ ๐๐ฬ๐๐ ${name}  ๐๐๐๐๐ ๐๐๐ฬ๐ ${(await Threads.getInfo(threadID)).threadName || "Unknow"}`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `====== [ ๐ฃ๐ต๐ฎฬ๐ป ๐ต๐ผฬฬ๐ถ ๐๐ฬฬ ๐จ๐๐ฒ๐ฟ ] ======\n--------------\nใ๐ง๐ถ๐บ๐ฒใ: ${gio}\n--------------\nใ๐๐จฬฃฬ๐ข ๐๐ฎ๐ง๐ ใ : ${body}\n--------------\n๐ป๐ฬฬ ๐๐๐ฬ๐ฬฬ๐ ๐๐ฬ๐๐ ${name} ๐๐๐๐๐ ๐๐๐ฬ๐ ${(await Threads.getInfo(threadID)).threadName || "Unknow"}`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "reply",
                    messageID: info.messageID,
                    messID: messageID,
                    threadID
                })
            });
            break;
        }
        case "reply": {
            let text = `==== [๐ท๐๐ฬ๐ ๐๐ฬฬ๐ ๐๐ฬฬ ๐จ๐ซ๐ด๐ฐ๐ต ] ====\n--------------\nใ๐ง๐ถ๐บ๐ฒใ: ${gio}\n--------------\nใ๐๐ผฬฬ๐ถ ๐๐ต๐ฎฬฬ๐ป ๐ด๐ถ๐ฎ๐ผ ๐ฐ๐ฎฬ๐ฐ๐ต ๐ฐ๐ฎฬ๐บ ๐๐ฬฬ ๐ฎ๐ฑ๐บ๐ถ๐ปใ : ${body}\n--------------\nใ๐๐ฎฬฬ ๐๐ ๐ฬ๐ขใ ${name} ๐ช๐๐๐๐\n--------------\n๐น๐๐๐๐ ๐๐๐ ๐๐๐ฬฬ๐ => ๐๐ฬฬ๐ ๐๐ฬฬ ๐๐๐๐๐`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `${body}==== [ ๐ท๐๐ฬ๐ ๐๐ฬฬ๐ ๐๐ฬฬ ๐จ๐ซ๐ด๐ฐ๐ต ] ====\n--------------\nใ๐ง๐ถ๐บ๐ฒใ: ${gio}\n--------------\nใ๐๐ฎฬฬ ๐๐ ๐ฬ๐ขใ ${name} ๐ช๐๐๐๐\n--------------\n๐น๐๐๐๐ ๐๐๐ ๐๐๐ฬฬ๐ => ๐๐ฬฬ๐ ๐๐ฬฬ ๐๐๐๐๐`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "sendnoti",
                    messageID: info.messageID,
                    threadID
                })
            }, handleReply.messID);
            break;
        }
    }
}

module.exports.run = async function ({ api, event, args, Users }) {
    const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, messageReply } = event;
    if (!args[0]) return api.sendMessage("Please input message", threadID);
    let allThread = global.data.allThreadID || [];
    let can = 0, canNot = 0;
    let text = `====== [ ๐ป๐๐ฬ๐๐ ๐๐ฬ๐ ] ======\n--------------\nใ๐ง๐ถ๐บ๐ฒใ: ${gio}\n\n--------------\nใ๐๐ผฬฬ๐ถ ๐๐ต๐ฎฬฬ๐ป ๐ด๐ถ๐ฎ๐ผ ๐ฐ๐ฎฬ๐ฐ๐ต ๐ฐ๐ฎฬ๐บ ๐๐ฬฬ ๐ฎ๐ฑ๐บ๐ถ๐ปใ : ${args.join(" ")}\n\n--------------\nใ๐๐ฎฬฬ ๐๐ ๐ฬ๐ขใ ${await Users.getNameUser(senderID)} \n--------------\n๐น๐๐๐๐ ๐๐๐ ๐๐๐ฬฬ๐ => ๐๐ฬฬ๐ ๐๐ฬฬ ๐๐๐๐๐`;
    if(event.type == "message_reply") text = await getAtm(messageReply.attachments, `====== [ ๐ป๐๐ฬ๐๐ ๐๐ฬ๐ ] ======\n--------------\nใ๐ง๐ถ๐บ๐ฒใ: ${gio}\n\n--------------\nใ๐๐ผฬฬ๐ถ ๐๐ต๐ฎฬฬ๐ป ๐ด๐ถ๐ฎ๐ผ ๐ฐ๐ฎฬ๐ฐ๐ต ๐ฐ๐ฎฬ๐บ ๐๐ฬฬ ๐ฎ๐ฑ๐บ๐ถ๐ปใ : ${args.join(" ")}\n\n--------------\nใ๐๐ฎฬฬ ๐๐ ๐ฬ๐ขใ ${await Users.getNameUser(senderID)}\n--------------\n๐น๐๐๐๐ ๐๐๐ ๐๐๐ฬฬ๐ => ๐๐ฬฬ๐ ๐๐ฬฬ ๐๐๐๐๐`);
    await new Promise(resolve => {
        allThread.forEach((each) => {
            try {
                api.sendMessage(text, each, (err, info) => {
                    if(err) { canNot++; }
                    else {
                        can++;
                        atmDir.forEach(each => fs.unlinkSync(each))
                        atmDir = [];
                        global.client.handleReply.push({
                            name: this.config.name,
                            type: "sendnoti",
                            messageID: info.messageID,
                            messID: messageID,
                            threadID
                        })
                        resolve();
                    }
                })
            } catch(e) { console.log(e) }
        })
    })
    api.sendMessage(`ฤรฃ gแปญi ฤแบฟn  ${can} nhรณm, khรดng thแป gแปญi ฤแบฟn ${canNot} nhรฒm`, threadID);
  }
                    