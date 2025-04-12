var AndroidHiddenApi = (function() {
    var callingPackageName = java.lang.System.getenv("IRIS_RUNNER") || "com.android.shell";

    function getService(name) {
        var ServiceManager = android.os.ServiceManager;
        return ServiceManager.getService(name);
    }

    function getStartServiceMethod() {
        var IActivityManagerStub = android.app.IActivityManager.Stub;
        var IActivityManager = android.app.IActivityManager;
        var IApplicationThread = android.app.IApplicationThread;

        var activityManager = IActivityManagerStub.asInterface(getService("activity"));

        try {
            var method = IActivityManager.getMethod(
                "startService",
                IApplicationThread.class,
                android.content.Intent.class,
                java.lang.String.class,
                java.lang.Boolean.TYPE,
                java.lang.String.class,
                java.lang.String.class,
                java.lang.Integer.TYPE
            );
            return function(intent) {
                method.invoke(activityManager, null, intent, null, false, callingPackageName, null, -3);
            };
        } catch (e1) {}

        try {
            var method = IActivityManager.getMethod(
                "startService",
                IApplicationThread.class,
                android.content.Intent.class,
                java.lang.String.class,
                java.lang.Boolean.TYPE,
                java.lang.String.class,
                java.lang.Integer.TYPE
            );
            return function(intent) {
                method.invoke(activityManager, null, intent, null, false, callingPackageName, -3);
            };
        } catch (e2) {}

        var sdk = android.os.Build.VERSION.SDK_INT;
        var methods = java.util.Arrays.stream(IActivityManager.getMethods())
            .map(String)
            .filter(function(m) { return m.includes("startService"); })
            .toArray()
            .join("\n");

        var msg = "failed to get startService Method. Please report\nSDK: " + sdk + "\nMETHODS: " + methods;
        throw msg;
    }

    function getStartActivityMethod() {
        var IActivityManagerStub = android.app.IActivityManager.Stub;
        var IActivityManager = android.app.IActivityManager;
        var IApplicationThread = android.app.IApplicationThread;

        var activityManager = IActivityManagerStub.asInterface(getService("activity"));

        try {
            var ProfilerInfo = android.app.ProfilerInfo;
            var method = IActivityManager.getMethod(
                "startActivity",
                IApplicationThread.class,
                java.lang.String.class,
                java.lang.String.class,
                android.content.Intent.class,
                java.lang.String.class,
                android.os.IBinder.class,
                java.lang.String.class,
                java.lang.Integer.TYPE,
                java.lang.Integer.TYPE,
                ProfilerInfo.class,
                android.os.Bundle.class,
                java.lang.Integer.TYPE
            );
            return function(intent) {
                method.invoke(activityManager, null, callingPackageName, null, intent, intent.getType(), null, null, 0, 0, null, null, -3);
            };
        } catch (e1) {}

        try {
            var ProfilerInfo = android.app.ProfilerInfo;
            var method = IActivityManager.getMethod(
                "startActivityAsUser",
                IApplicationThread.class,
                java.lang.String.class,
                android.content.Intent.class,
                java.lang.String.class,
                android.os.IBinder.class,
                java.lang.String.class,
                java.lang.Integer.TYPE,
                java.lang.Integer.TYPE,
                ProfilerInfo.class,
                android.os.Bundle.class,
                java.lang.Integer.TYPE
            );
            return function(intent) {
                method.invoke(activityManager, null, callingPackageName, intent, intent.getType(), null, null, 0, 0, null, null, -3);
            };
        } catch (e2) {}

        var sdk = android.os.Build.VERSION.SDK_INT;
        var methods = java.util.Arrays.stream(IActivityManager.getMethods())
            .map(String)
            .filter(function(m) { return m.includes("startActivity"); })
            .toArray()
            .join("\n");

        var msg = "failed to get startActivity Method. Please report\nSDK: " + sdk + "\nMETHODS: " + methods;
        throw msg;
    }

    function getBroadcastIntentMethod() {
        var IActivityManagerStub = android.app.IActivityManager.Stub;
        var IActivityManager = android.app.IActivityManager;
        var IApplicationThread = android.app.IApplicationThread;

        var activityManager = IActivityManagerStub.asInterface(getService("activity"));

        try {
            var IIntentReceiver = android.content.IIntentReceiver;
            var method = IActivityManager.getMethod(
                "broadcastIntent",
                IApplicationThread.class,
                android.content.Intent.class,
                java.lang.String.class,
                IIntentReceiver.class,
                java.lang.Integer.TYPE,
                java.lang.String.class,
                android.os.Bundle.class,
                java.lang.String,
                java.lang.Integer.TYPE,
                android.os.Bundle.class,
                java.lang.Boolean.TYPE,
                java.lang.Boolean.TYPE,
                java.lang.Integer.TYPE
            );
            return function(intent) {
                method.invoke(
                    activityManager,
                    null, intent, null,
                    null, 0, null, null, null,
                    -1, null, false, false, -3
                );
            };
        } catch (e) {}

        var sdk = android.os.Build.VERSION.SDK_INT;
        var methods = java.util.Arrays.stream(IActivityManager.getMethods())
            .map(String)
            .filter(function(m) { return m.includes("broadcastIntent"); })
            .toArray()
            .join("\n");

        var msg = "failed to get broadcastIntent Method. Please report\nSDK: " + sdk + "\nMETHODS: " + methods;
        throw msg;
    }

    return {
        startService: getStartServiceMethod(),
        startActivity: getStartActivityMethod(),
        broadcastIntent: getBroadcastIntentMethod()
    };
})();