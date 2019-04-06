const express = require("express");
const session = require("client-sessions");

const secret = "as.mdfhluiayf klahfkadsf";

const WS_OPEN = 1;

const app = express();
const expressWS = require("express-ws")(app);

const builddir = __dirname + "/dist";
app.use(express.static(builddir));

app.use(session({ 
  cookieName: "session",
  secret: secret,
  duration: 30 * 60 * 1000
}));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: builddir });
});

app.use(express.json());

// handle post data for creating classroom
app.post("/classroom", (req,res) => {
  if (req.session.id == undefined) throw "Unknown client creating classroom"; 
  classrooms.set(req.body.roomName, req.session.id);
  res.end();
});

// map client ids to ws connection object
const clients = new Map();
const classrooms = new Map();
var id = 0;

// assign client ids in increasing order
function assignClientID(clientWS) { 
  var newID = id++;
  clients.set(newID, clientWS);
  return newID;
}

app.ws("/", (ws, req) => {
  if (req.session.id == null) {
    req.session.id = assignClientId(ws);
    sendClient(ws, { type: "assignID", clientID: req.session.id });
  }
  console.log("new client: ", req.session.id);
  
  // receive message from client
  ws.on("message", ss.processClientMessage);
  ws.on("end", () => console.log("Connection ended with client ", req.session.id));
});

app.listen(3000);
console.log("listening on port 3000");

/** ------ Websockets functions ------ **/
function sendMessage(ws, msgobj) {
  if (ws.readyState == WS_OPEN) 
    ws.send(JSON.stringify(msgobj));
  else
    throw "[WS SERVER => CLIENT ERROR]: WS not ready";
}

// handle client message from websockets
function processClientMessage(msg) {
  msg = JSON.parse(msg);

  switch (msg.type) {
    case "presentOffer": 
      var childWS = clients.get(message.cid);
      if (childWS == null) throw "Invalid client id: " + message.cid;
      sendMessage(childWS, { type: "parentOffer", offer: message.offer , pid: message.pid });
      break;
    case "presentAnswer":
      console.log("redirect answer");
      var parentWS = clients.get(message.pid); 
      if (parentWS == null) throw "Invalid client id: " + message.pid;
      sendMessage(parentWS, { type: "childAnswer", answer: message.answer, pid: message.pid , cid: message.cid});
      break;
    default: throw "Unknown message type: " + msg.type;
  }
}

