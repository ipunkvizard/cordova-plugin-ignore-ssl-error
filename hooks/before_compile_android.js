module.exports = function (context) {
    let fs = require('fs'),
        path = require('path'),
        originalString = "handler.proceed();",
        replaceString = "/**REPLACED**/super.onReceivedSslError(view, handler, error);/**REPLACED**/";

    let file = path.resolve('platforms/android/CordovaLib/src/org/apache/cordova/engine/SystemWebViewClient.java');
    let data = fs.readFileSync(file, "utf8");
    if (context.opts.options.release) {
        /** @var string**/
        data = data.replace(originalString, replaceString);

    } else {
        data = data.replace(replaceString, originalString);
    }

    fs.writeFileSync(file, data);
};