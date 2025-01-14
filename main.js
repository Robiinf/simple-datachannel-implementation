const receivedMessages = document.getElementById("receivedMessages");
const messageInput = document.getElementById("messageInput");
const sendMessageButton = document.getElementById("sendMessage");

// Initialize peer connections
const PC1 = new RTCPeerConnection(); // Local peer
const PC2 = new RTCPeerConnection(); // Remote peer

// Create DataChannel on PC1
const dataChannel = PC1.createDataChannel("chat");
console.log("DataChannel created on PC1.", dataChannel);

// Set up DataChannel event listeners
dataChannel.onopen = () => {
  console.log("DataChannel is open!");
};
dataChannel.onmessage = (event) => {
  console.log("Message received on PC1:", event.data);
  receivedMessages.value += `Peer: ${event.data}\n`;
};

// Handle incoming DataChannel on PC2
PC2.ondatachannel = (event) => {
  const remoteChannel = event.channel;
  console.log("DataChannel received on PC2.");

  remoteChannel.onmessage = (event) => {
    console.log("Message received on PC2:", event.data);
    receivedMessages.value += `Peer: ${event.data}\n`;
  };

  remoteChannel.onopen = () => {
    console.log("Remote DataChannel is open!");
  };
};

// ICE candidate exchange ( Find the best network path for data to travel )
PC1.onicecandidate = ({ candidate }) => {
  if (candidate) {
    PC2.addIceCandidate(candidate).catch(console.error);
  }
};
PC2.onicecandidate = ({ candidate }) => {
  if (candidate) {
    PC1.addIceCandidate(candidate).catch(console.error);
  }
};

// Create and exchange offer/answer
async function connectPeers() {
  const offer = await PC1.createOffer();
  await PC1.setLocalDescription(offer);
  await PC2.setRemoteDescription(offer);
  console.log("Create offer", offer);

  const answer = await PC2.createAnswer();
  await PC2.setLocalDescription(answer);
  await PC1.setRemoteDescription(answer);
  console.log("Create answer", answer);

  console.log("Peers connected.");
}

// Send a message via the DataChannel
sendMessageButton.addEventListener("click", () => {
  const message = messageInput.value;
  if (dataChannel.readyState === "open" && message) {
    console.log("Sending message:", message);
    dataChannel.send(message);
    receivedMessages.value += `You: ${message}\n`;
    messageInput.value = "";
  } else {
    console.log("DataChannel is not open or message is empty.");
  }
});

// Start the connection
connectPeers();
