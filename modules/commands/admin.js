module.exports.config = {
    name: "admin",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "Mirai Team",
    description: "Quản lý admin bot",
    commandCategory: "admin",
    usages: "[list/add/remove] [userID]",
    cooldowns: 0,
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.languages = {
    "vi": {
        "listAdmin": ' 𝘿𝙖𝙣𝙝 𝙨𝙖́𝙘𝙝 𝙩𝙤𝙖̀𝙣 𝙗𝙤̣̂ 𝙣𝙜𝙪̛𝙤̛̀𝙞 𝙙𝙞𝙚̂̀𝙪 𝙝𝙖̀𝙣𝙝 𝙗𝙤𝙩: \n\n%1',
        "notHavePermssion": '[🤖] 𝘽𝙖̣𝙣 𝙠𝙝𝙤̂𝙣𝙜 𝙙𝙪̉ 𝙦𝙪𝙮𝙚̂̀𝙣 𝙝𝙖̣𝙣 𝙙𝙚̂̉ 𝙘𝙤́ 𝙩𝙝𝙚̂̉ 𝙨𝙪̛̉ 𝙙𝙪̣𝙣𝙜 𝙘𝙝𝙪̛́𝙘 𝙣𝙖̆𝙣𝙜 "%1"',
        "addedNewAdmin": '[🤖] 𝘿𝙖̃ 𝙩𝙝𝙚̂𝙢 %1 𝙣𝙜𝙪̛𝙤̛̀𝙞 𝙙𝙪̀𝙣𝙜 𝙩𝙧𝙤̛̉ 𝙩𝙝𝙖̀𝙣𝙝 𝙣𝙜𝙪̛𝙤̛̀𝙞 𝙙𝙞𝙚̂̀𝙪 𝙝𝙖̀𝙣𝙝 𝙗𝙤𝙩:\n\n%2',
        "removedAdmin": '[🤖] 𝘿𝙖̃ 𝙜𝙤̛̃ 𝙗𝙤̉ %1 𝙣𝙜𝙪̛𝙤̛̀𝙞 𝙙𝙞𝙚̂̀𝙪 𝙝𝙖̀𝙣𝙝 𝙗𝙤𝙩:\n\n%2',
        "addedNewAdminx": '[🤖] 𝘿𝙖̃ 𝙩𝙝𝙚̂𝙢 %1 𝙣𝙜𝙪̛𝙤̛̀𝙞 𝙙𝙪̀𝙣𝙜 𝙩𝙧𝙤̛̉ 𝙩𝙝𝙖̀𝙣𝙝 𝙣𝙜𝙪̛𝙤̛̀𝙞 𝙝𝙤̂̃ 𝙩𝙧𝙤̛̣  𝙣𝙜𝙪̛𝙤̛̀𝙞 𝙙𝙞𝙚̂̀𝙪 𝙝𝙖̀𝙣𝙝 𝙗𝙤𝙩:\n\n%2'
    },
    "en": {
        "listAdmin": '[Admin] Admin list: \n\n%1',
        "notHavePermssion": '[Admin] You have no permission to use "%1"',
        "addedNewAdmin": '[Admin] Added %1 Admin :\n\n%2',
        "removedAdmin": '[Admin] Remove %1 Admin:\n\n%2'
    }
}
module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = require('fs-extra');
    const { resolve } = require("path");
    const path = resolve(__dirname, 'cache', 'data.json');
    if (!existsSync(path)) {
        const obj = {
            adminbox: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('adminbox')) data.adminbox = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}
module.exports.run = async function ({ api, event, args, Users, permssion, getText }) {
    const content = args.slice(1, args.length);
    const { threadID, messageID, mentions } = event;
    const { configPath } = global.client;
    const { ADMINBOT } = global.config;
    const { userName } = global.data;
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);

    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);
    switch (args[0]) {
        case "list":
        case "all":
        case "-a": {
            const listAdmin = ADMINBOT || config.ADMINBOT || [];
            var msg = [];

            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                    const name = (await Users.getData(idAdmin)).name
                    msg.push(`- ${name}\nLINK: https://facebook.com/${idAdmin}`);
                }
            }
 return api.sendMessage(getText("listAdmin", msg.join("\n")), threadID, messageID);
        }
        case "add": {
            if (event.senderID != 100049606202185) return api.sendMessage(`Quyền lồn biên giới!`, event.threadID, event.messageID)
            if (permssion != 2) return api.sendMessage(getText("notHavePermssion", "add"), threadID, messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
                    listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `🌸[ ADMIN ] » ${name}🌸`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
 case "addx": {
            if (event.senderID != 100049606202185) return api.sendMessage(`🌸Quyền ... biên giới!🌸`, event.threadID, event.messageID)
            if (permssion != 2) return api.sendMessage(getText("notHavePermssion", "addx"), threadID, messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
                    listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdminx", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdminx", 1, `[ ADMIN SP] » ${name}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }

        case "remove":
        case "rm":
        case "delete": {
            if (event.senderID != 100049606202185) return api.sendMessage(`Quyền lồn biên giới!`, event.threadID, event.messageID)
            if (permssion != 2) return api.sendMessage(getText("notHavePermssion", "delete"), threadID, messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.ADMINBOT.findIndex(item => item == id);
                    ADMINBOT.splice(index, 1);
                    config.ADMINBOT.splice(index, 1);
                    listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.ADMINBOT.findIndex(item => item.toString() == content[0]);
                ADMINBOT.splice(index, 1);
                config.ADMINBOT.splice(index, 1);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", 1, `[ ${content[0]} ] » ${name}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
        }
        case 'only': {
      //---> CODE ADMIN ONLY<---//
        if (event.senderID != 100049606202185) return api.sendMessage(`Không có quyền nhập lệnh đó rồi ne!`, event.threadID, event.messageID)
        if (config.adminOnly == false) {
          config.adminOnly = true;
          api.sendMessage("» Bật thành công admin only", threadID, messageID);
        } else {
          config.adminOnly = false;
          api.sendMessage("» Tắt thành công admin only", threadID, messageID);
        }
          writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
          break;
        }
         case '-pa': {
      //---> CODE ADMIN ONLY<---//
        if (event.senderID !=  100049606202185) return api.sendMessage(`Không có quyền nhập lệnh đó rồi ne!`, event.threadID, event.messageID)
        if (config.adminPersonalOnly == false) {
          config.adminPersonalOnly = true;
          api.sendMessage("» Bật thành công chế độ chỉ admin mới trò chuyện riêng được với bot", threadID, messageID);
        } else {
          config.adminPersonalOnly = false;
          api.sendMessage("» Tắt thành công chế độ chỉ admin mới trò chuyện riêng được với bot", threadID, messageID);
        }
          writeFileSync(configPath, JSON.stringify(config, n  ull, 4), 'utf8');
          break;
        }
        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    };
}
