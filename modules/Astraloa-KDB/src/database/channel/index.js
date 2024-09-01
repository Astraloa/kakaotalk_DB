let BigJSON = require("./../../BigJSON");
let channelError = require("./../../error")("channelError");
let decrypt = require("./../../decrypt");
var DB = require("../open");

function getChannel(chatId, botID) {
    let dbs = DB.getDBs();
    let db = dbs[0];
    let db2 = dbs[1];
    let channelCursor = db.rawQuery("SELECT * FROM chat_rooms WHERE id = ? ORDER BY last_updated_at DESC LIMIT 1", [chatId]);

    let channel = {};

    if (channelCursor.moveToFirst()) {
      try {
        var columns = channelCursor.columnNames;
        for (var i = 0; i < columns.length; i++) {
          var value = channelCursor.getString(i);
          channel[columns[i]] = value;
        }
  
      } catch (err) {
        throw new channelError("caught UnException Error while create channel Object:\n  - " + err);
      }
    }else throw new channelError("cannot find channel with this chatId: " + chatId);
    channel = AutoParse

    let channelEncryptKey = ['last_message'];
    channelEncryptKey.forEach(key => {
        channel[key] = decrypt(botID, 31, channel[key]);
    });
    
    switch (channel.type) {
        case "OM": {
            let openLinkCursor = db2.rawQuery("SELECT * FROM open_link WHERE id = ? LIMIT 1", [channel['link_id']]);
            let openLink = {};

            if(openLinkCursor.moveToFirst()) {
                try{
                    var columns = openLinkCursor.columnNames;
                    for (var i = 0; i < columns.length; i++) {
                        var value = openLinkCursor.getString(i);
                        openLink[columns[i]] = value;
                    }
                
                }catch (err) {
                    throw new channelError("caught UnException Error while create channel Object:\n  - " + err);
                }
            }else throw new channelError("cannot find openChat with this linkId: " + channel['link_id']);
            channel.openLink = (JSON.stringify(openLink) == '{}' ? null : openLink);
            channel.name = openLink.name;
            break;
        }
        default: {
            if(typeof channel.meta == 'object' && channel.meta[0]) channel.name = channel.meta[0].content;
            else channel.name = null;
            break;
        }
    }
    return channel;
}