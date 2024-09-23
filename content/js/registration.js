



(function () {
    class RegistrationPage {

        encryptKey = '6xFsYzHYo2IwMwWwUEiZS2lVdB14151PAGGHH4r07Xq5OY4qFd';
        data = {};

        constructor(data) {
            this.data = Object.assign(this.data, data);
            this.init();
        }

        init() {
            this.listen();
           // this._saveParam('url', 'https://simplybook.em.vetal.d.simplybook.me/en/company/email-verification/type/wordpress/', 300);
            this.initIframe();
        }

        listen() {
            window.addEventListener('message', (event) => {
                var data = event.data.data;

                switch (event.data.command) {
                    case 'height':
                        var height = data.height;
                        //console.log(height);
                        document.getElementById('sb-iframe').style.height = height + 'px';
                        break;

                    case 'url':
                        this._sendRegistrationDataToIframe();
                        var url = data.url;
                        if(!url) {
                            return;
                        }
                        if(this._checkIsCurrentDomain(url)) {
                            return;
                        }

                        var isDefaultRegistrationUrl = this._isDefaultRegistrationUrl(url);

                        if(isDefaultRegistrationUrl) {
                            return;
                        }
                        //disable url because 3rd party cookies
                        //this._saveParam('url', url, 300);
                        break;

                    default:
                        break;
                }
            });


            //iframe url change sb-iframe
            document.getElementById('sb-iframe').addEventListener('load', () => {
                //check before if accessing a cross-origin frame.
                var isCrossOrigin = false;
                try {
                    var url = document.getElementById('sb-iframe').contentWindow.location.href;
                } catch (e) {
                    isCrossOrigin = true;
                }

                if(isCrossOrigin) {
                    return;
                }
                this._checkIsCurrentDomain(url);
            });

            this._sendRegistrationDataToIframe();
        }

        _sendRegistrationDataToIframe() {
            var _this = this;

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    _this.data.registrationData['latitude'] = position.coords.latitude;
                    _this.data.registrationData['longitude'] = position.coords.longitude;
                    _this.sendCommand('registration_data', _this.data.registrationData);
                }, (error) => {
                    console.log('Geolocation error', error);
                }, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                });
            }

            var registrationData = this.data.registrationData;

            if(registrationData) {
                this.sendCommand('registration_data', registrationData);
            }
        }

        sendCommand(command, data) {
            var iframe = document.getElementById('sb-iframe');
            iframe.contentWindow.postMessage({
                command: command,
                data: data
            }, '*');
        }

        _isDefaultRegistrationUrl(url) {
            const urlWithoutParams = url.split('?')[0];
            const urlWithoutSlash = urlWithoutParams.replace(/\/$/, '');
            return urlWithoutSlash.endsWith('default/registration/type/wordpress');
        }

        _checkIsCurrentDomain(url) {
            //if iframe domain is equal to url domain - redirect parent window
            var currentDomain = window.location.hostname;
            var iframeDomain = new URL(url).hostname;

            console.log(currentDomain, iframeDomain, url);

            if(currentDomain === iframeDomain) {
                //parse url params, find sbcburl => base64 decode and redirect parent window
                var urlParams = new URLSearchParams(url);
                var sbcburl = urlParams.get('sbcburl');
                if(sbcburl) {
                    var allParamsArr = Array.from(urlParams.entries());
                    delete allParamsArr['sbcburl'];
                    var decodedUrl = atob(sbcburl);
                    if(decodedUrl) {
                        var newUrl = new URL(decodedUrl);
                        allParamsArr.forEach((item) => {
                            newUrl.searchParams.append(item[0], item[1]);
                        });
                        window.location.href = newUrl;
                        return true;
                    }
                }
                this._removeParam('url');
                window.location.href = url;
                return true;
            }

            return false;
        }



        initIframe() {
            var iframe = document.getElementById('sb-iframe');
            var url = this._getParam('url');

            if(!url) {
                //get url from data-src attribute
                url = iframe.getAttribute('data-src');
            }
            iframe.src = url;
        }

        //save param to local storage if local storage is available
        //data must be save as one array
        //data must be encrypted
        _saveParam(param, value, activeTime = null) {
            if (typeof(Storage) === "undefined") {
                return;
            }
            var data = localStorage.getItem('sb_reg_data');
            if(!data) {
                data = {};
            } else {
                data = JSON.parse(data);
            }

            var cipher = this._cipher(this.encryptKey);
            data[param] = cipher(value);

            if(activeTime) {
                data[param + '_active_time'] = (new Date()).getTime() + activeTime*1000;
            }
            console.log(param, value,data, JSON.stringify(data));
            localStorage.setItem('sb_reg_data', JSON.stringify(data));
        }

        //get param from local storage if local storage is available
        _getParam(param) {
            if (typeof(Storage) === "undefined") {
                return;
            }
            var data = localStorage.getItem('sb_reg_data');
            if(!data) {
                return;
            }
            data = JSON.parse(data);

            if(!data[param]) {
                return;
            }
            if(data[param + '_active_time']) {
                if((new Date()).getTime() > data[param + '_active_time']) {
                    this._removeParam(param);
                    return;
                }
            }
            var decipher = this._decipher(this.encryptKey);
            return decipher(data[param]);
        }

        _removeParam(param) {
            if (typeof(Storage) === "undefined") {
                return;
            }
            var data = localStorage.getItem('sb_reg_data');
            if(!data) {
                return;
            }
            data = JSON.parse(data);
            delete data[param];
            delete data[param + '_active_time'];
            localStorage.setItem('sb_reg_data', JSON.stringify(data));
        }

        _cipher(salt){
            const textToChars = text => text.split('').map(c => c.charCodeAt(0));
            const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
            const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

            return text => text.split('')
                .map(textToChars)
                .map(applySaltToChar)
                .map(byteHex)
                .join('');
        }

        _decipher(salt){
            const textToChars = text => text.split('').map(c => c.charCodeAt(0));
            const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
            return encoded => encoded.match(/.{1,2}/g)
                .map(hex => parseInt(hex, 16))
                .map(applySaltToChar)
                .map(charCode => String.fromCharCode(charCode))
                .join('');
        }

        _encryptData(data) {
            //encrypt data sha256
            var cipher = this._cipher(this.encryptKey);

            //each key=>val data and encrypt
            var encryptedData = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    encryptedData[key] = cipher(data[key]);
                }
            }
            return encryptedData;
        }

        _decryptData(data){
            //decrypt data sha256
            var decipher = this._decipher(this.encryptKey);

            //each key=>val data and decrypt
            var decryptedData = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    decryptedData[key] = decipher(data[key]);
                }
            }
            return decryptedData;
        }

    }

    window.RegistrationPage = RegistrationPage;
})();