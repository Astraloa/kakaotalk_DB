let channelError = require("./../../error")("channelError");
let AutoParse = require("../../AutoParse");
let decrypt = require("./../../decrypt");

let openLinkTable = ["id", "user_id", "token", "name", "url", "image_url", "type", "member_limit", "direct_chat_limit", "active", "expired", "created_at", "view_type", "push_alert", "icon_url", "v", "searchable", "description"];
let channelTable = ["_id", "id", "type", "members", "active_member_ids", "last_log_id", "last_message", "last_updated_at", "unread_count", "watermarks", "temporary_message", "v", "ext", "last_read_log_id", "last_update_seen_id", "active_members_count", "meta", "is_hint", "private_meta", "last_chat_log_type", "schat_token", "last_skey_token", "last_pk_tokens", "link_id", "moim_meta", "invite_info", "blinded_member_ids", "mute_until_at", "last_joined_log_id"];

function getChannel(dbs, chatId, botID) {
    let db = dbs[0];
    let db2 = dbs[1];
    let channelCursor = db.rawQuery("SELECT " + channelTable.join(",") + " FROM chat_rooms WHERE id = ? ORDER BY last_updated_at DESC LIMIT 1", [chatId]);

    let channel = {};

    if (channelCursor.moveToFirst()) {
        try {
            for (let key of cursor.getColumnNames()) {
                let idx = channelCursor.getColumnIndex(key);
                let type = channelCursor.getType(idx);

                if (!type) {
                    channel[key] = null;
                } else if (type == 1 || type == 2) {
                    channel[key] = Number(channelCursor.getString(idx));
                } else if (type == 3) {
                    channel[key] = channelCursor.getString(idx);
                } else if (type == 4) {
                    channel[key] = channelCursor.getBlob(idx);
                }
            }
        } catch (err) {
            channelCursor.close();
            throw new channelError("caught UnException Error while create channel Object:\n  - " + err);
        }
    } else {
        channelCursor.close();
        throw new channelError("cannot find channel with this chatId: " + chatId);
    }
    channelCursor.close();
    channel = AutoParse(channel);

    let channelEncryptKey = ['last_message'];
    channelEncryptKey.forEach(key => {
        if (channel[key]) try {
            channel[key] = decrypt(botID, 31, channel[key]);
        } catch (err) { }
    });

    switch (channel.type) {
        case "OM": {
            let openLinkCursor = db2.rawQuery("SELECT " + openLinkTable.join(",") + " FROM open_link WHERE id = ? LIMIT 1", [channel['link_id']]);
            let openLink = {};

            if (openLinkCursor.moveToFirst()) {
                try {
                    var columns = openLinkCursor.columnNames;
                    for (var i = 0; i < columns.length; i++) {
                        var value = openLinkCursor.getString(i);
                        openLink[columns[i]] = value;
                    }

                } catch (err) {
                    throw new channelError("caught UnException Error while create channel Object:\n  - " + err);
                }
            } else throw new channelError("cannot find openChat with this linkId: " + channel['link_id']);
            channel.openLink = (JSON.stringify(openLink) == '{}' ? null : openLink);
            channel.name = openLink.name;
            openLinkCursor.close();
            break;
        }
        default: {
            if (typeof channel.meta == 'object' && channel.meta[0]) channel.name = channel.meta[0].content;
            else channel.name = null;
            break;
        }
    }
    return channel;
}

module.exports = getChannel;