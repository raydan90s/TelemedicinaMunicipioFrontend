import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const socket: Socket = io(API_URL);

export default function VideoCall() {
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);

  const peerRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    startCamera();

    socket.on("offer", handleReceiveOffer);
    socket.on("answer", handleReceiveAnswer);
    socket.on("ice-candidate", handleNewICECandidate);

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, []);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (localVideo.current) {
      localVideo.current.srcObject = stream;
    }
    localStreamRef.current = stream;

    createPeer();
  };

  const createPeer = () => {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerRef.current = peer;

    // Enviar ICE al servidor
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", event.candidate);
      }
    };

    // Cuando recibo video remoto
    peer.ontrack = (event) => {
      if (remoteVideo.current) {
        remoteVideo.current.srcObject = event.streams[0];
      }
    };

    // Enviar mis tracks al peer
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track: MediaStreamTrack) => {
        if (peerRef.current && localStreamRef.current) {
          peerRef.current.addTrack(track, localStreamRef.current);
        }
      });
    }
  };

  const startCall = async () => {
    if (!peerRef.current) return;
    
    const offer = await peerRef.current.createOffer();
    await peerRef.current.setLocalDescription(offer);

    socket.emit("offer", offer);
  };

  const handleReceiveOffer = async (offer: RTCSessionDescriptionInit) => {
    if (!peerRef.current) return;
    
    await peerRef.current.setRemoteDescription(offer);

    const answer = await peerRef.current.createAnswer();
    await peerRef.current.setLocalDescription(answer);

    socket.emit("answer", answer);
  };

  const handleReceiveAnswer = async (answer: RTCSessionDescriptionInit) => {
    if (!peerRef.current) return;
    
    await peerRef.current.setRemoteDescription(answer);
  };

  const handleNewICECandidate = async (candidate: RTCIceCandidateInit) => {
    if (!peerRef.current) return;
    
    try {
      await peerRef.current.addIceCandidate(candidate);
    } catch (err) {
      console.error("Error adding ICE candidate", err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Videollamada WebRTC</h1>

      <div className="flex gap-4">
        <video ref={localVideo} autoPlay playsInline className="w-72 h-52 bg-black rounded" />
        <video ref={remoteVideo} autoPlay playsInline className="w-72 h-52 bg-black rounded" />
      </div>

      <button 
        onClick={startCall}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Iniciar Llamada
      </button>
    </div>
  );
}