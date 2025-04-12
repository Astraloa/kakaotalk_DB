const { startService } = require("./AndroidHiddenApi");
module.exports = (function () {
    /**
     * send msg with NotiRef value
     * @author ye-seola
     * @see {@link https://github.com/ye-seola/gok-db}
     */
    let NotiRef = null;
    /**
     * 
     * @param {string} chat_id
     * @param {number} user_id - katalk called user_id
     */
    function sendMsg(chat_id, user_id) {
        if (NotiRef == null || typeof NotiRef == 'string' ? NotiRef.equals("default_noti_ref") : false) {
            let prefsFile = new java.io.File("/data/data/com.kakao.talk/shared_prefs/KakaoTalk.hw.perferences.xml");
            let prefsReader = null;
            try {
                prefsReader = new java.io.BufferedReader(new java.io.FileReader(prefsFile));
                let line;
                while ((line = prefsReader.readLine()) != null) {
                    if (line.includes("<string name=\"NotificationReferer\">")) {
                        let start = line.indexOf(">") + 1;
                        let end = line.indexOf("</string>");
                        NotiRef = line.substring(start, end);
                        break;
                    }
                }
            } catch (err) {
                throw new Error("Error closing preferences file reader: " + err.toString());
            }
            if (NotiRef == null || NotiRef.equals("default_noti_ref")) {
                throw new Error("NotificationReferer not found in preferences file or error occurred, using default or potentially failed to load.");
            }
        }
        this.chat_id = chat_id;
        this.user_id = user_id || 0;
    }
    sendMsg.prototype.replyMessage = function (chat_id, message) {
        let intent = new android.content.Intent();
        intent.setComponent(new android.content.ComponentName("com.kakao.talk", "com.kakao.talk.notification.NotificationActionService"));
        intent.putExtra("noti_referer", notiRefValue);
        intent.putExtra("chat_id", chat_id);
        intent.setAction("com.kakao.talk.notification.REPLY_MESSAGE");
        let results = new android.os.Bundle();
        results.putCharSequence("reply_message", String(message));
        let remoteInput = new android.app.RemoteInput.Builder("reply_message").build();
        let remoteInputs = [
            remoteInput
        ];
        android.app.RemoteInput.addResultsToIntent(remoteInputs, intent, results);
        startService(
            null, /* called */
            intent,
            intent.getType(),
            false, /** forgeground */
            "com.android.shell",
            null,
            this.user_id
        );
    }
    sendMsg.prototype.send = function (c, m) {
        if (m == void 0) {
            return new Promise(() => {
                this.replyMessage(this.chat_id, c);
            });
        } else if (c == void 0) {
            throw new Error('invaild send message arguements');
        } else {
            return new Promise(() => {
                this.replyMessage(c, m);
            });
        }
    }

    return sendMsg;
})();