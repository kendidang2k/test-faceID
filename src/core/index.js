import MessageTypes from "./constants/message-types";
import {
  // NotAllowedType,
  RequestPermissionFailed,
  SystemNotReadyError,
} from "./utils/errors";
import EventEmitter from "./utils/event-emitter";

/**
 *
 * @param {string} message
 * @returns {Promise<string | {type: string; payload: any} | undefined>}
 */
//receive nsg
// data

const receiveData = {
  "take-picture": -1,
  "on-take-picture": -1,
  "start-video-detect": -1,
  "on-detect-frame": -1,
  "stop-video-detect": -1,
  "upload-front-card-video": -1,
  "start-video-record": -1,
  "on-upload-video": -1,
  "ekyc-complete": -1,
};
async function waitUntil(command) {
  return await new Promise((resolve) => {
    const interval = setInterval(() => {
      if (typeof receiveData[command] != "number") {
        resolve();
        clearInterval(interval);
      }
    }, 1000);
  });
}
async function sendMessageToFlutter(message) {
  if (typeof receiveData[message.command] != "undefined") {
    receiveData[message.command] = 0;
  }
  //post msg
  if (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.callbackHandler
  ) {
    window.webkit.messageHandlers.callbackHandler.postMessage(
      JSON.stringify(message)
    );
  } else {
    throw "not found window.webkit";
  }

  if (typeof receiveData[message.command] === "undefined") {
    return;
  }

  // sleep
  await waitUntil(message.command);

  // console.log("4444", message.command);
  // console.log("5555", receiveData[message.command]);

  return receiveData[message.command];

  // return window.flutter_inappwebview?.callHandler?.('Flutter', message);
}

class SystemCore extends EventEmitter {
  // get acceptedTypes() {
  //   return this._acceptedTypes;
  // }

  get isReady() {
    return this._isReady;
  }

  get statusNotch() {
    return this._hasNotch;
  }
  setStatusNotch(status = false) {
    this._hasNotch = status;
  }

  constructor() {
    super();
    // this._isReady = !window.flutter_inappwebview ? !!window.opener : false;
    this._isReady =
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.callbackHandler
        ? true
        : !!window.opener;
    // this._acceptedTypes = Object.values(MessageTypes);
    this._subscribe();
  }
  // type,
  async send(payload = {}) {
    if (!this.isReady) {
      throw new SystemNotReadyError();
    }
    // if (!this._checkIsAllowType(type)) {
    //   throw new NotAllowedType();
    // }
    // type,
    // const msg = JSON.stringify(payload);
    if (window.webkit && window.webkit.messageHandlers) {
      // const res = await sendMessageToFlutter(msg);
      // console.log('xxxxx1', payload);
      const res = await sendMessageToFlutter(payload);
      // console.log('xxxxx2', payload, res);
      if (res == null) {
        return;
      }
      if (typeof res === "string") {
        return this._handleJsonStringMessage(res);
      }
      const command = res.command;
      const response = res.data;
      receiveData[command] = -1;

      if (typeof response == "undefined") {
        throw `Command not response - ${JSON.stringify(res)}`;
      }
      if (response.success !== true) {
        throw response.message;
      }
      // if (res?.type !== type) {
      //   return;
      // }
      // res?.type || type,
      // this.emit(command, res.data);
      return res.data;
    }
    // type,
    var valueResponse = await this._postMessageToWindow(payload);
    // console.log('valueResponse = ', valueResponse);
    return valueResponse;
  }

  async exit() {
    await this.send(MessageTypes.EXIT);
  }

  async requestPermission(permission, option = undefined) {
    const res = await this.send(MessageTypes.PERMISSION, {
      permission,
      option,
    });
    if (!res?.payload?.success) {
      const error = new RequestPermissionFailed();

      if (!res?.payload) {
        error.success = false;
        error.permission = permission;
        throw error;
      }
      Object.assign(error, res.payload);
      throw error;
    }
    res.payload.permission = permission;
    return res.payload;
  }
  // type,
  _postMessageToWindow(message) {
    const _this = this;
    return new Promise((resolve) => {
      const handleReceivedResponse = function (res) {
        resolve(res);
        // type,
        this.removeEventListener(handleReceivedResponse);
      }.bind(_this);
      // type,
      this.on(handleReceivedResponse);
      window.opener?.postMessage(message, "*");
    });
  }

  // _checkIsAllowType(type) {
  //   return this._acceptedTypes.includes(type);
  // }

  _subscribe() {
    window.addEventListener("flutterInAppWebViewPlatformReady", () => {
      this._isReady = true;
      this.emit("ready");
    });
    window.addEventListener("message", (ev) => {
      const { data } = ev;
      if (typeof data === "string") {
        return this._handleJsonStringMessage(data, true);
      }
      if (data.platform == "ios") {
        // console.log('-----------data native back --------', data);
        if (data.isSocket !== true) {
          return (receiveData[data.command] = data.data);
        }
        try {
          // console.log('is socket from native', data.command, typeof data.data);
          this.emit(data.command, data.data);
        } catch (error) {
          //
        }
        return;
      }
      this.emit(data.command, data.data);
      // this.emit(data);
      return data;
    });
  }

  /**
   *
   * @param {string} stringData
   * @returns {Promise<{type: string; payload: any} | undefined>}
   */
  _handleJsonStringMessage(stringData, isListen) {
    if (!stringData) {
      return;
    }
    try {
      const res = JSON.parse(stringData);
      // console.log("<=== res ===>", JSON.stringify(res));

      const command = res.command;
      const response = res.data;
      if (response.success !== true) {
        if (isListen) {
          this.emit(command, res);
        }
        throw response.message;
      }
      if (isListen) {
        this.emit(command, res);
      }
      return res.data;
    } catch (err) {
      throw err.toString();
    }
  }
}

const core = new SystemCore();
export { core as SystemCore };
