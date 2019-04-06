const WS_OPEN = 1;

class ClientSocket {
  constructor(rtcNode) {
    this.ws = initWS();
  }

  initWS() {
    var ws = new WebSocket("ws://localhost:3000");
    ws.onmessage = (event) => {
      this.processServerMessage(event.data);
    };
    ws.onopen = (event) => console.log("WS open");
    ws.onclose = () => console.log("WS closed");
    ws.onerror = (err) => console.log("WS error:", err);
    return ws;
  }

  processServerMessage(msg) {
    msg = JSON.parse(msg);
    switch (msg.type) {
      case "assignID": 
        this.rtcNode.clientID = msg.clientID;
        break;
      case "childAnswer":
        this.rtcNode.outgoingRTC.get(msg.cid).signal(msg.answer);         
        break;
      case "initiateConnection":
        this.rtcNode.createSourceRTC(msg.cid);
        break;
      case "parentOffer": 
        console.log("got parent offer");
        this.rtcNode.incomingRTC = this.rtcNode.createReceiverRTC(msg.offer);
        this.rtcNode.parentID = msg.pid;
        break;
      default: throw "Unknown message type: " + msg.type;
    }
  }

  sendMessage(msgobj) {
    if (msgobj.type == undefined) throw "Cannot send message with undefined type";
    if (this.ws.readyState == WS_OPEN) 
      this.ws.send(JSON.stringify(msgobj));
    else
      throw "WS error sending message to server: readyState = " + this.ws.readyState;
  }
}
