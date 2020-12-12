!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=15)}([function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,s){function r(e){try{a(i.next(e))}catch(e){s(e)}}function c(e){try{a(i.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,c)}a((i=i.apply(e,t||[])).next())}))};function o(e,t,n){const i=t-e.length;let o="";for(let e=0;e<i;e++)o+=n;return o+e}function s(e){return o(e.toString(16),2,"0")}function r(e){return o(e.toString(16),4,"0")}function c(e){return btoa(new Uint8Array(e).reduce((e,t)=>e+String.fromCharCode(t),""))}Object.defineProperty(t,"__esModule",{value:!0}),t.toHex8=s,t.toHex16=r,t.toHex32=function(e){return o(e.toString(16),8,"0")},t.hexdump=function(e,t=""){const n=new TextDecoder;for(let i=0;i<e.byteLength;i+=16){const o=e.byteLength-i>16?16:e.byteLength-i;let c,a=t+r(i)+" ";for(c=0;c<o;c++)a+=" "+s(e.getUint8(i+c));for(;c<16;c++)a+="   ";a+=" | "+n.decode(new DataView(e.buffer,i,o)),console.log(a)}},t.toB64=c,t.privateKeyDump=function(e){return i(this,void 0,void 0,(function*(){if(!e.privateKey.extractable)return void console.log("cannot dump the private key, it's not extractable");const t=yield crypto.subtle.exportKey("pkcs8",e.privateKey);console.log(`-----BEGIN PRIVATE KEY-----\n${c(t)}\n-----END PRIVATE KEY-----`)}))},t.publicKeyDump=function(e){return i(this,void 0,void 0,(function*(){if(!e.publicKey.extractable)return void console.log("cannot dump the public key, it's not extractable");const t=yield crypto.subtle.exportKey("spki",e.publicKey);console.log(`-----BEGIN PUBLIC KEY-----\n${c(t)}'\n-----END PUBLIC KEY-----`)}))},t.encodeCmd=function(e){const t=(new TextEncoder).encode(e).buffer;return new DataView(t).getUint32(0,!0)},t.decodeCmd=function(e){const t=new TextDecoder,n=new ArrayBuffer(4);return new DataView(n).setUint32(0,e,!0),t.decode(n)}},function(e,t,n){"use strict";function i(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),i(n(10)),i(n(6)),i(n(9)),i(n(4)),i(n(7)),i(n(2)),i(n(13))},function(e,t,n){"use strict";function i(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),i(n(5)),i(n(11)),i(n(3))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(0);class o{constructor(e,t,n,i,o){this.cmd=e,this.arg0=t,this.arg1=n,this.length=i,this.checksum=o}toDataView(){const e=new DataView(new ArrayBuffer(24)),t=i.encodeCmd(this.cmd),n=4294967295^t;return e.setUint32(0,t,!0),e.setUint32(4,this.arg0,!0),e.setUint32(8,this.arg1,!0),e.setUint32(12,this.length,!0),e.setUint32(16,this.checksum,!0),e.setUint32(20,n,!0),e}static parse(e,t=!1){const n=e.getUint32(0,!0),s=e.getUint32(4,!0),r=e.getUint32(8,!0),c=e.getUint32(12,!0),a=e.getUint32(16,!0);if(t&&e.byteLength>20){if(-1!=(n^e.getUint32(20,!0)))throw new Error("magic mismatch")}return new o(i.decodeCmd(n),s,r,c,a)}}t.MessageHeader=o},function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,s){function r(e){try{a(i.next(e))}catch(e){s(e)}}function c(e){try{a(i.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,c)}a((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(2),s=n(0),r=n(7),c=n(8);class a{constructor(e,t,n,i,o){this.client=e,this.service=t,this.localId=n,this.remoteId=i,this.options=o,this.messageQueue=new c.AsyncBlockingQueue}close(){return i(this,void 0,void 0,(function*(){yield this.write("CLSE"),this.options.debug&&(console.log("Closed stream "+this.service),console.log(" local_id: 0x"+s.toHex32(this.localId)),console.log(" remote_id: 0x"+s.toHex32(this.remoteId))),this.client.unregisterStream(this)}))}consumeMessage(e){return 0!==e.header.arg0&&e.header.arg0===this.remoteId&&0!==e.header.arg1&&e.header.arg1===this.localId&&(this.messageQueue.enqueue(e),!0)}write(e,t){return i(this,void 0,void 0,(function*(){const n=this.newMessage(e,t);yield this.client.sendMessage(n)}))}read(){return i(this,void 0,void 0,(function*(){return this.messageQueue.dequeue()}))}pull(e){return i(this,void 0,void 0,(function*(){const t=(new TextEncoder).encode(e),n=new r.SyncFrame("RECV",t.byteLength),i=this.newMessage("WRTE",n.toDataView());yield this.client.sendMessage(i);const o=yield this.read();if("OKAY"!==o.header.cmd)throw new Error("WRTE/RECV failed: "+o);const s=this.newMessage("WRTE",new DataView(t.buffer));yield this.client.sendMessage(s);const c=yield this.read();if("OKAY"!==c.header.cmd)throw new Error("WRTE/filename failed: "+c);const a=this.newMessage("OKAY");let d=yield this.read();yield this.client.sendMessage(a);let u=r.SyncFrame.fromDataView(new DataView(d.data.buffer.slice(0,8))),l=new Uint8Array(d.data.buffer.slice(8));const h=[];for(;"DONE"!==u.cmd;){for(;u.byteLength>=l.byteLength;){d=yield this.read(),yield this.client.sendMessage(a);const e=l.byteLength+d.data.byteLength,t=new Uint8Array(e);t.set(l,0),t.set(new Uint8Array(d.data.buffer),l.byteLength),l=t}h.push(l.slice(0,u.byteLength).buffer),l=l.slice(u.byteLength),u=r.SyncFrame.fromDataView(new DataView(l.slice(0,8).buffer)),l=l.slice(8)}return new Blob(h)}))}newMessage(e,t){return o.Message.newMessage(e,this.localId,this.remoteId,this.options.useChecksum,t)}static open(e,t,n){return i(this,void 0,void 0,(function*(){const i=a.nextId++;let r=0;const c=o.Message.open(i,r,t,n.useChecksum);let d;yield e.sendMessage(c);do{d=yield e.awaitMessage()}while(d.header.arg1!==i);if("OKAY"!==d.header.cmd)throw new Error("OPEN Failed");r=d.header.arg0,n.debug&&(console.log("Opened stream "+t),console.log(" local_id: 0x"+s.toHex32(i)),console.log(" remote_id: 0x"+s.toHex32(r)));const u=new a(e,t,i,r,n);return e.registerStream(u),u}))}}t.Stream=a,a.nextId=1},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(3),o=n(0);class s{constructor(e,t){this.header=e,this.data=t}dataAsString(){if(!this.data)return null;return(new TextDecoder).decode(this.data)}static newMessage(e,t,n,o,r){let c=0,a=0;r&&(a=r.byteLength,o&&(c=s.checksum(r)));const d=new i.MessageHeader(e,t,n,a,c);return new s(d,r)}static open(e,t,n,i){const o=new TextEncoder,r=new DataView(o.encode(n+"\0").buffer);return s.newMessage("OPEN",e,t,i,r)}static cnxn(e,t,n,i){const o=new TextEncoder,r=new DataView(o.encode(n).buffer);return s.newMessage("CNXN",e,t,i,r)}static authSignature(e,t){return s.newMessage("AUTH",2,0,t,e)}static authPublicKey(e,t){const n=(new TextEncoder).encode(o.toB64(e.buffer)+"\0");return s.newMessage("AUTH",3,0,t,new DataView(n.buffer))}static checksum(e){let t=0;for(let n=0;n<e.byteLength;n++)t+=e.getUint8(n);return 4294967295&t}}t.Message=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class i{constructor(e,t,n,i){this.productName=e,this.productDevice=t,this.productModel=n,this.features=i}static fromDataView(e){const t=(new TextDecoder).decode(e);return i.fromString(t)}static fromString(e){const t=e.indexOf("::"),n=e.substring(t+2).split(";");let o="<unkwnown>",s="<unkwnown>",r="<unkwnown>",c=[];for(const e of n)e.startsWith("ro.product.name")?o=e.substring("ro.product.name".length+1):e.startsWith("ro.product.model")?r=e.substring("ro.product.model".length+1):e.startsWith("ro.product.device")?s=e.substring("ro.product.device".length+1):e.startsWith("features")&&(c=e.substring("features".length+1).split(","));return new i(o,s,r,c)}}t.AdbConnectionInformation=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(0);class o{constructor(e,t){this.cmd=e,this.byteLength=t}toDataView(){const e=new ArrayBuffer(8),t=i.encodeCmd(this.cmd),n=new DataView(e);return n.setUint32(0,t,!0),n.setUint32(4,this.byteLength,!0),n}static fromDataView(e){const t=i.decodeCmd(e.getUint32(0,!0)),n=e.getUint32(4,!0);return new o(t,n)}}t.SyncFrame=o},function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,s){function r(e){try{a(i.next(e))}catch(e){s(e)}}function c(e){try{a(i.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,c)}a((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});class o{constructor(e){this.data=e}}class s{enqueue(e){const t=new o(e);this.tail&&(this.tail.next=t),this.tail=t,this.head||(this.head=this.tail)}dequeue(){if(this.isEmpty())throw new Error("Cannot dequeue. Queue is empty");const e=this.head.data;return this.head=this.head.next,e}isEmpty(){return null==this.head}}t.Queue=s;t.AsyncBlockingQueue=class{constructor(){this.promiseQueue=new s,this.resolverQueue=new s}add(){const e=new Promise(e=>{this.resolverQueue.enqueue(e)});this.promiseQueue.enqueue(e)}enqueue(e){this.resolverQueue.isEmpty()&&this.add(),this.resolverQueue.dequeue()(e)}dequeue(){return i(this,void 0,void 0,(function*(){return this.promiseQueue.isEmpty()&&this.add(),this.promiseQueue.dequeue()}))}hasPendingPromises(){return!this.promiseQueue.isEmpty()}hasPendingResolvers(){return!this.resolverQueue.isEmpty()}}},function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,s){function r(e){try{a(i.next(e))}catch(e){s(e)}}function c(e){try{a(i.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,c)}a((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});t.Shell=class{constructor(e,t){this.stream=e,this.callbackFunction=t,this.textDecoder=new TextDecoder,this.textEncoder=new TextEncoder,this.messageListener=[],this.closed=!1,this.loopRead()}loopRead(){return i(this,void 0,void 0,(function*(){try{let e;do{if(e=yield this.stream.read(),"WRTE"===e.header.cmd){this.stream.write("OKAY");const t=this.textDecoder.decode(e.data);this.callbackFunction&&this.callbackFunction(t)}for(const t of this.messageListener)t(e)}while(!this.closed)}catch(e){console.error("loopRead crashed",e)}this.stream.client.unregisterStream(this.stream)}))}waitForMessage(e){return new Promise(t=>{const n=i=>{if(i.header.cmd===e){const e=this.messageListener.indexOf(n);this.messageListener.splice(e,1),t(i)}};this.messageListener.push(n)})}write(e){return i(this,void 0,void 0,(function*(){const t=this.textEncoder.encode(e);yield this.stream.write("WRTE",new DataView(t.buffer)),yield this.waitForMessage("OKAY")}))}close(){return i(this,void 0,void 0,(function*(){this.closed=!0,yield this.write("CLSE")}))}}},function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,s){function r(e){try{a(i.next(e))}catch(e){s(e)}}function c(e){try{a(i.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,c)}a((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(2),s=n(0),r=n(6),c=n(4),a=n(9),d=n(8),u=n(12);class l{constructor(e,t,n){this.transport=e,this.options=t,this.keyStore=n,this.messageQueue=new d.AsyncBlockingQueue,this.openStreams=new Set,this.messageChannel=new o.MessageChannel(e,t,this)}registerStream(e){this.openStreams.add(e)}unregisterStream(e){this.openStreams.delete(e)}newMessage(e){const t=Array.from(this.openStreams);for(const n of t)if(n.consumeMessage(e))return;this.messageQueue.enqueue(e)}awaitMessage(){return i(this,void 0,void 0,(function*(){return this.messageQueue.dequeue()}))}connect(){return i(this,void 0,void 0,(function*(){const e=this.options.useChecksum?16777216:16777217,t=o.Message.cnxn(e,262144,"host::\0",this.options.useChecksum);let n;yield this.sendMessage(t);do{n=yield this.awaitMessage()}while("CNXN"!==n.header.cmd&&"AUTH"!==n.header.cmd);if("CNXN"===n.header.cmd){if(!n.data)throw new Error("Connection doesn't have data");return r.AdbConnectionInformation.fromDataView(n.data)}if(n=yield this.doAuth(n),!n.data)throw new Error("Connection doesn't have data");return r.AdbConnectionInformation.fromDataView(n.data)}))}disconnect(){return i(this,void 0,void 0,(function*(){this.messageChannel.close()}))}shell(e){return i(this,void 0,void 0,(function*(){const t=yield c.Stream.open(this,"shell:"+e,this.options),n=yield t.read();return yield t.close(),n.dataAsString()||""}))}framebuffer(){return i(this,void 0,void 0,(function*(){return u.Framebuffer.create(this,this.options)}))}interactiveShell(e){return i(this,void 0,void 0,(function*(){const t=yield c.Stream.open(this,"shell:",this.options);return new a.Shell(t,e)}))}sync(){return i(this,void 0,void 0,(function*(){return yield c.Stream.open(this,"sync:",this.options)}))}pull(e){return i(this,void 0,void 0,(function*(){const t=yield this.sync(),n=yield t.pull(e);return yield t.close(),n}))}doAuth(e){return i(this,void 0,void 0,(function*(){if("AUTH"!==e.header.cmd)throw new Error("Not an AUTH response");if(1!==e.header.arg0)throw new Error("\n          Invalid AUTH parameter. Expected 1 and received "+e.header.arg0);if(!e.data)throw new Error("AUTH message doens't contain data");const t=e.data.buffer,n=yield this.keyStore.loadKeys();for(const e of n){const n=yield crypto.subtle.sign("RSASSA-PKCS1-v1_5",e.privateKey,t),i=o.Message.authSignature(new DataView(n),this.options.useChecksum);yield this.sendMessage(i);const s=yield this.awaitMessage();if("CNXN"===s.header.cmd)return s;console.log("Received message ",s,"from phone")}const i=yield l.generateKey(this.options.dump,this.options.keySize);yield this.keyStore.saveKey(i);const s=new DataView(yield crypto.subtle.exportKey("spki",i.publicKey)),r=o.Message.authPublicKey(s,this.options.useChecksum);yield this.sendMessage(r),this.options.debug&&console.log("Waiting for key to be accepted on the device.");const c=yield this.awaitMessage();if("CNXN"!==c.header.cmd)throw console.error("AUTH failed. Phone didn't accept key",c),new Error("AUTH failed. Phone didn't accept key");return c}))}sendMessage(e){return i(this,void 0,void 0,(function*(){yield this.messageChannel.write(e)}))}static generateKey(e,t){return i(this,void 0,void 0,(function*(){const n=e,i=yield crypto.subtle.generateKey({name:"RSASSA-PKCS1-v1_5",modulusLength:t,publicExponent:new Uint8Array([1,0,1]),hash:{name:"SHA-1"}},n,["sign","verify"]);return e&&(yield s.privateKeyDump(i)),i}))}}t.AdbClient=l},function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,s){function r(e){try{a(i.next(e))}catch(e){s(e)}}function c(e){try{a(i.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,c)}a((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(5),s=n(3);t.MessageChannel=class{constructor(e,t,n){this.transport=e,this.options=t,this.listener=n,this.active=!0,this.readLoop()}readLoop(){return i(this,void 0,void 0,(function*(){let e;do{e=yield this.read(),this.options.debug&&console.log("<<<",e),this.listener.newMessage(e)}while(this.active)}))}readHeader(){return i(this,void 0,void 0,(function*(){const e=yield this.transport.read(24);return s.MessageHeader.parse(e,this.options.useChecksum)}))}read(){return i(this,void 0,void 0,(function*(){const e=yield this.readHeader();let t;return e.cmd,e.length>0&&(t=yield this.transport.read(e.length)),new o.Message(e,t)}))}close(){this.active=!1}write(e){return i(this,void 0,void 0,(function*(){this.options.debug&&console.log(">>>",e);const t=e.header.toDataView();yield this.transport.write(t.buffer),e.data&&(yield this.transport.write(e.data.buffer))}))}}},function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,s){function r(e){try{a(i.next(e))}catch(e){s(e)}}function c(e){try{a(i.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,c)}a((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(4);class s{constructor(e,t,n,i,o,s,r,c,a,d,u,l,h,f,g){this.version=e,this.bpp=t,this.colorSpace=n,this.size=i,this.width=o,this.height=s,this.redOffset=r,this.redLength=c,this.blueOffset=a,this.blueLength=d,this.greenOffset=u,this.greenLength=l,this.alphaOffset=h,this.alphaLength=f,this.imageData=g}static create(e,t){var n;return i(this,void 0,void 0,(function*(){const i=yield o.Stream.open(e,"framebuffer:",t);let r=yield i.read();if("WRTE"!==r.header.cmd)throw yield i.write("CLSE"),new Error("Expected WRTE message but received "+r.header.cmd);if(!r.data)throw yield i.write("CLSE"),new Error("message doesn't contain data");yield i.write("OKAY");const c=r.data.getUint32(0,!0),a=r.data.getUint32(4,!0),d=r.data.getUint32(8,!0),u=r.data.getUint32(12,!0),l=r.data.getUint32(16,!0),h=r.data.getUint32(20,!0),f=r.data.getUint32(24,!0),g=r.data.getUint32(28,!0),y=r.data.getUint32(32,!0),v=r.data.getUint32(36,!0),p=r.data.getUint32(40,!0),w=r.data.getUint32(44,!0),m=r.data.getUint32(48,!0),b=r.data.getUint32(52,!0),x=new Uint8Array(u);let C=0,E=new Uint8Array(r.data.buffer.slice(s.BYTE_LENGTH));for(x.set(E,0),C=E.length;C<u&&(r=yield i.read(),"CLSE"!==r.header.cmd);){if(!r.data)throw yield i.write("CLSE"),new Error("message doesn't contain data");E=new Uint8Array(null===(n=r.data)||void 0===n?void 0:n.buffer),x.set(E,C),C+=E.length,yield i.write("OKAY")}return yield i.close(),new s(c,a,d,u,l,h,f,g,y,v,p,w,m,b,Uint8ClampedArray.from(x))}))}}t.Framebuffer=s,s.BYTE_LENGTH=56},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(14))},function(e,t,n){"use strict";var i=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,s){function r(e){try{a(i.next(e))}catch(e){s(e)}}function c(e){try{a(i.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,c)}a((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),s={classCode:255,subclassCode:66,protocolCode:1},r={classCode:255,subclassCode:66,protocolCode:3},c=[s,r];class a{constructor(e,t,n,i,o,s=console.log){this.device=e,this.match=t,this.endpointIn=n,this.endpointOut=i,this.options=o,this.log=s}close(){return i(this,void 0,void 0,(function*(){yield this.device.releaseInterface(this.match.intf.interfaceNumber),yield this.device.close()}))}write(e){return i(this,void 0,void 0,(function*(){this.options.dump&&o.hexdump(new DataView(e),this.endpointOut+"==> "),yield this.device.transferOut(this.endpointOut,e)}))}read(e){return i(this,void 0,void 0,(function*(){const t=yield this.device.transferIn(this.endpointIn,e);if(!t.data)throw new Error("Response didn't contain any data");return t.data}))}isAdb(){return null!=a.findMatch(this.device,s)}isFastboot(){return null!=a.findMatch(this.device,r)}static open(e){return i(this,void 0,void 0,(function*(){const t=yield navigator.usb.requestDevice({filters:c});yield t.open();const n=this.findMatch(t,s);if(!n)throw new Error("Could not find an ADB device");yield t.selectConfiguration(n.conf.configurationValue),yield t.claimInterface(n.intf.interfaceNumber);const i=a.getEndpointNum(n.alternate.endpoints,"in"),o=a.getEndpointNum(n.alternate.endpoints,"out"),r=new a(t,n,i,o,e);return e.debug&&console.log("Created new Transport: ",r),r}))}static findMatch(e,t){for(const n of e.configurations)for(const e of n.interfaces)for(const i of e.alternates)if(t.classCode===i.interfaceClass&&t.subclassCode===i.interfaceSubclass&&t.protocolCode===i.interfaceProtocol)return{conf:n,intf:e,alternate:i};return null}static getEndpointNum(e,t,n="bulk"){for(const i of e)if(i.direction===t&&i.type===n)return i.endpointNumber;throw new Error(`Cannot find ${t} endpoint`)}}t.WebUsbTransport=a},function(e,t,n){"use strict";n.r(t);var i=n(1),o=function(e,t,n,i){return new(n||(n=Promise))((function(o,s){function r(e){try{a(i.next(e))}catch(e){s(e)}}function c(e){try{a(i.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,c)}a((i=i.apply(e,t||[])).next())}))};let s,r;const c=document.querySelector("#connect"),a=document.querySelector("#disconnect"),d=document.querySelector("#start"),u=document.querySelector("#stop"),l=document.querySelector("#screencapture"),h=document.querySelector("#video"),f=document.querySelector("#screenshot"),g=document.querySelector("#download"),y=document.querySelector("#status"),v={debug:!0,useChecksum:!1,dump:!1,keySize:2048};const p=new class{constructor(){this.keys=[]}loadKeys(){return o(this,void 0,void 0,(function*(){return this.keys}))}saveKey(e){return o(this,void 0,void 0,(function*(){this.keys.push(e),console.log("Saving Key"+e)}))}};c.addEventListener("click",e=>o(void 0,void 0,void 0,(function*(){try{s=yield i.WebUsbTransport.open(v),r=new i.AdbClient(s,v,p),y.textContent="Accept prompt on device";const e=yield r.connect();y.textContent="Connected and ready",console.log("Connected: ",e),c.classList.toggle("hidden"),a.classList.toggle("hidden"),d.removeAttribute("disabled"),l.removeAttribute("disabled"),u.removeAttribute("disabled")}catch(e){console.error("Connection Failed: ",e),y.textContent="Failed to connect to a device"}}))),a.addEventListener("click",e=>o(void 0,void 0,void 0,(function*(){try{if(r){try{yield r.disconnect()}catch(e){console.log("Error disconnecting ADB Client: ",e)}r=null}s&&(yield s.close(),s=null),c.classList.toggle("hidden"),a.classList.toggle("hidden"),d.disabled=!0,u.disabled=!0,l.disabled=!0,y.textContent="Connect to a device to start"}catch(e){console.error("Disconnecting Failed: ",e)}})));let w=null;d.addEventListener("click",()=>o(void 0,void 0,void 0,(function*(){w=yield i.Stream.open(r,"shell:screenrecord /sdcard/webadb-record-2.mp4",v),y.textContent="Recording...",u.classList.toggle("hidden"),d.classList.toggle("hidden")}))),u.addEventListener("click",()=>o(void 0,void 0,void 0,(function*(){y.textContent="Finishing Recording...",yield w.close(),y.textContent="Pulling video...",setTimeout(()=>o(void 0,void 0,void 0,(function*(){console.log("Starting ADB Pull");const e=yield r.pull("/sdcard/webadb-record-2.mp4"),t=window.URL.createObjectURL(e);h.src=t,g.href=t,g.download="recording.mp4",u.classList.toggle("hidden"),d.classList.toggle("hidden"),f.classList.add("hidden"),h.classList.remove("hidden"),g.classList.remove("hidden"),y.textContent="Done! Connected and ready"})),2e3)}))),l.addEventListener("click",()=>o(void 0,void 0,void 0,(function*(){y.textContent="Generating Screenshot...",yield r.shell("screencap -p /sdcard/screenshot.png"),y.textContent="Pulling image...",setTimeout(()=>o(void 0,void 0,void 0,(function*(){console.log("Starting ADB Pull");const e=yield r.pull("/sdcard/screenshot.png"),t=window.URL.createObjectURL(e);f.src=t,g.href=t,g.download="screenshot.png",g.classList.remove("hidden"),f.classList.remove("hidden"),h.classList.add("hidden"),y.textContent="Done! Connected and ready"})),2e3)})))}]);