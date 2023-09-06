

var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src', 'https://code.jquery.com/jquery-3.5.1.min.js');
document.head.appendChild(jQueryScript);


var jQueryScript2 = document.createElement('script');
jQueryScript2.setAttribute('src', 'https://cdn.jsdelivr.net/npm/simple-notify@0.5.5/dist/simple-notify.min.js');
document.head.appendChild(jQueryScript2);


(async function () {

    chrome.storage.sync.get(['cooldown'], function(result) {
    const redirectCoolDown = result.cooldown || 0;

    // change 0 to any number and the script will wait that much time in seconds before redirecting


    sleep(redirectCoolDown * 1000)


    // change false to true if you want notifications
    var notification = false
    try {
        notification = !!Notify
    }
    catch (e) {

    }
    'use strict';
    if (notification) {
        const cssUrl = "https://cdn.jsdelivr.net/npm/simple-notify/dist/simple-notify.min.css";
        GM_xmlhttpRequest({
            method: "GET",
            url: cssUrl,
            onload: function (response) {
                if (response.status === 200) {
                    // Add CSS to the document
                    GM_addStyle(response.responseText);
                }
            }
        });
    }
    var url = "https://api.bypass.city/v9?" + window.location.href;
    var oReq = new XMLHttpRequest();
    async function serverRequestFailed() {
        console.log("alerted")
        if (url.startsWith("https://api.bypass.city")) {
            url = "https://main-bypass-server.tk/v9?" + window.location.href;
            return makeReqq();
        }
        alert('failed to contact backend bypass server. Please make sure an app (antivirus) is not blocking https://api.bypass.city and if it is let us know in our discord server. If you are still facing problems the server could be DOWN or something else please report this to us in our discord server and get help: https://discord.gg/uMEtrpRvAf')
        if (notification) {
            new Notify({
                status: 'warning',
                title: 'Redirecting to discord server in 10 seconds',
                text: 'I',
                effect: 'slide',
                speed: 300,
                customClass: '',
                customIcon: '',
                showIcon: true,
                showCloseButton: true,
                autoclose: false,
                autotimeout: 10000,
                gap: 20,
                distance: 20,
                type: 2,
                position: 'right top'
            })
        }
        await sleep(10000)
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    if (getCookie("useManualfa") == 'yes') {
        if (notification) {
            new Notify({
                status: 'success',
                title: 'Local Bypass Loaded. Bypassing!',
                text: '',
                effect: 'slide',
                speed: 300,
                customClass: '',
                customIcon: '',
                showIcon: true,
                showCloseButton: true,
                autoclose: false,
                autotimeout: 10000,
                gap: 20,
                distance: 20,
                type: 2,
                position: 'right top'
            })
            new Notify({
                status: 'warning',
                title: 'Please solve any captcha that shows up!',
                text: '',
                effect: 'slide',
                speed: 300,
                customClass: '',
                customIcon: '',
                showIcon: true,
                showCloseButton: true,
                autoclose: false,
                autotimeout: 10000,
                gap: 20,
                distance: 20,
                type: 2,
                position: 'right top'
            })
        }
        setCookie("useManualfa", 'no', 30)
        let response, target_token, ut, linkvertise_link, link_id, key = getCookie("BPtoke");
        setCookie("BPtoke", "", 1)
        let GAI = false
        let mBP = XMLHttpRequest.prototype.open; XMLHttpRequest.prototype.open = function () {
            this.addEventListener('load', async (data) => {
                if (data.currentTarget.responseText.includes('tokens')) {
                    response = JSON.parse(data.currentTarget.responseText);
                    target_token = response.data.tokens['TARGET'];
                    ut = localStorage.getItem("X-LINKVERTISE-UT");
                    linkvertise_link = location.pathname.replace(/\/[0-9]$/, "");
                    if (!getCookie('permssssss')) {
                        alert('You will be asked to allow the script to make requests to the linkvertise api (to bypass linkvertise links). Please hit "always allow" it or the script wont work')
                        GM_xmlhttpRequest({
                            method: "GET",
                            url: `https://publisher.linkvertise.com/api/v1/redirect/link/static${linkvertise_link}?X-Linkvertise-UT=${ut}`,
                            onload: function (response) {
                                setCookie('permssssss', "yes", 3365)
                                window.location.reload()
                            }
                        })
                    }
                    const uagt = await httpGet('https://api.bypass.city/ua')

                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: `https://publisher.linkvertise.com/api/v1/redirect/link/static${linkvertise_link}?X-Linkvertise-UT=${ut}`,
                        headers: {
                            "User-Agent": uagt
                        },
                        onload: function (response) {
                            var json = JSON.parse(response.responseText)
                            var target_type = json.data.link.target_type
                            link_id = json.data.link.id;
                            const json_body = { serial: btoa(JSON.stringify({ timestamp: new Date().getTime(), random: "6548307", link_id: link_id })), token: target_token };
                            GM_xmlhttpRequest({
                                method: 'POST',
                                url: `https://publisher.linkvertise.com/api/v1/redirect/link${linkvertise_link}${target_type == "PASTE" ? '/paste' : "/target"}?X-Linkvertise-UT=${ut}`,
                                data: JSON.stringify(json_body),
                                headers: {
                                    "Accept": 'application/json',
                                    "Content-Type": 'application/json',
                                    "User-Agent": uagt
                                },
                                onload: function (response) {
                                    var json = JSON.parse(response.responseText)
                                    httpGet(`https://api.bypass.city/manual?targetToken=${encodeURIComponent(target_token)}&linkId=${encodeURIComponent(link_id)}&lvLink=${encodeURIComponent(linkvertise_link)}&ut=${encodeURIComponent(ut)}&url=${encodeURIComponent(window.location.href)}&key=${encodeURIComponent(key)}&tType=${encodeURIComponent(target_type)}&Fts=${encodeURIComponent(btoa(JSON.stringify(json)))}`)
                                        .then((w) => {
                                            window.location.replace(JSON.parse(w).destination)
                                        })
                                }
                            });
                            GAI = true;
                        }
                    })
                }
            }); mBP.apply(this, arguments);
        };
        // alert('Please solve the captcha (if it shows up)')
    } else {
        makeReqq()
    }
    function makeReqq() {
        if (window.location.href.includes('linkvertise.com/48193/')) {
            console.log("loading the specific version for krnl :)");
            if (notification) {
                new Notify({
                    status: 'warning',
                    title: 'KRNL detected',
                    text: 'waiting 15 seconds before bypassing (to avoid getting blacklisted)',
                    effect: 'slide',
                    speed: 300,
                    customClass: '',
                    customIcon: '',
                    showIcon: true,
                    showCloseButton: true,
                    autoclose: false,
                    autotimeout: 10000,
                    gap: 20,
                    distance: 20,
                    type: 2,
                    position: 'right top'
                })
            }
            function reqListener() {
                var a = this.responseText;
                var b = JSON.parse(a);
                setTimeout(function () {
                    window.location.replace(b.destination)
                }, 17100);
            }
            oReq.addEventListener("load", reqListener);
            oReq.addEventListener("error", serverRequestFailed);
            oReq.open("GET", url);
            oReq.send();
        }
        else {
            if (notification) {
                new Notify({
                    status: 'success',
                    title: 'Bypassing!',
                    text: '',
                    effect: 'slide',
                    speed: 300,
                    customClass: '',
                    customIcon: '',
                    showIcon: true,
                    showCloseButton: true,
                    autoclose: false,
                    autotimeout: 10000,
                    gap: 20,
                    distance: 20,
                    type: 2,
                    position: 'right top'
                })
            }
            async function reqListener() {
                var a = this.responseText;
                var b = JSON.parse(a);

                if (b.destination.includes("https://errorr.ml/?")) {
                    var key = b.destination.substring(19)
                    // alert(key)
                    if (notification) {
                        new Notify({
                            status: 'warning',
                            title: 'Server Bypass Failed! ',
                            text: 'Trying local bypass. Your page will refresh in 5 seconds',
                            effect: 'slide',
                            speed: 300,
                            customClass: '',
                            customIcon: '',
                            showIcon: true,
                            showCloseButton: true,
                            autoclose: false,
                            autotimeout: 10000,
                            gap: 20,
                            distance: 20,
                            type: 2,
                            position: 'right top'
                        })
                    }
                    await sleep(5000)
                    setCookie("useManualfa", "yes", 1);
                    setCookie("BPtoke", key, 1)
                    window.location.reload()
                }
                else {
                    if (notification) {
                        new Notify({
                            status: 'success',
                            title: 'Done! Redirecting . . .',
                            text: '',
                            effect: 'slide',
                            speed: 300,
                            customClass: '',
                            customIcon: '',
                            showIcon: true,
                            showCloseButton: true,
                            autoclose: false,
                            autotimeout: 10000,
                            gap: 20,
                            distance: 20,
                            type: 2,
                            position: 'right top'
                        })
                    }
                    window.location.replace(b.destination)
                }
            }
            oReq.addEventListener("load", reqListener);
            oReq.addEventListener("error", serverRequestFailed);
            oReq.open("GET", url);
            oReq.send();
        }
    }
    })
})();