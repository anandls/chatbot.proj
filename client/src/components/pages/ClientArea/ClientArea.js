import React, { useState, useEffect, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import StyledHeading from "../../../styles/StyledHeading";
import "./ClientArea.css";

import api from "../../../services/api";
// import {
//   initiateSocket,
//   disconnectSocket,
//   subscribeToChat,
//   sendMessage,
//   socket,
// } from "../../../WebSocket";

import { getClient, getToken } from "../../../services/localstorage";

const StyledClient = styled.div`
  width: 80%;
  margin: 2em auto;
  padding: 2em;
  background: ${(props) => props.theme.white};
  box-shadow: ${(props) => props.theme.bs2};
  border-radius: 6px;

  @media (max-width: 500px) {
    width: 90%;
  }
`;

const StyledBox = styled.div`
  margin: 1em auto;
  padding: 2em;
  background: ${(props) => props.theme.white};
  box-shadow: ${(props) => props.theme.bs2};
  border-radius: 2px;

  @media (max-width: 500px) {
    width: 90%;
  }
`;

const ClientArea = () => {
  const history = useHistory();
  let newState;
  const [state, setState] = useState({ text: "", session: "" });
  const [clientInfo, setClientState] = useState("");

  useEffect(() => {
    //initiateSocket();
  }, []);

  useEffect(() => {
    const getAuthDetails = async () => {
      try {
        const clientDetails = getClient();
        const token = await getToken();
        token ? true : history.push("/sign-up");
        setClientState(clientDetails);
      } catch (err) {
        console.error(err);
      }
    };
    getAuthDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    newState = {
      ...state,
      text: value,
    };

    setState(newState);
  };

  // const addMessage = async (author, payload) => {
  //   socket.emit("sendPayload", payload);
  // };

  const appendMessage = (firstname, lastname, position, messageText) => {
    let msgerChat = document.getElementsByClassName("msger-chat");

    const msgHTML = `
        <div class="msg ${position}-msg">
            <div class="msg-img" ></div>
            <div class="msg-bubble">
              <div class="msg-info">
                <div class="msg-info-name">${firstname} ${lastname}</div>
              </div>
              <div class="msg-text">${messageText}</div>
            </div>
          </div>
      `;

    msgerChat[0].insertAdjacentHTML("beforeend", msgHTML);
    msgerChat[0].scrollTop += 500;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;
    let payload;

    if (!state.sessionId) {
      payload = {
        text: state.text.trim(),
        author: clientInfo.id,
        authortype: "CLIENT",
        sessionId: null,
      };
      //addMessage(clientInfo.id, payload);
      response = await api.message.postMessage(payload);
      payload = "";
      newState = {
        ...state,
        text: state.text,
        sessionId: response.newSessionId,
      };
      setState(newState);
    } else {
      payload = {
        text: state.text.trim(),
        author: clientInfo.id,
        authortype: "CLIENT",
        sessionId: state.sessionId,
      };
      //addMessage(state.sessionId, payload);
      response = await api.message.postMessage(payload);
      payload = "";
    }

    appendMessage(
      clientInfo.firstname,
      clientInfo.lastname,
      "right",
      state.text
    );
    appendMessage("Assistant", "", "left", response.response);
    document.getElementById("messageInput").value = "";
  };

  return (
    <>
      <StyledClient>
        <StyledBox
          style={{
            backgroundColor: "#1c2237",
            height: "160px",
            width: "80%",
            color: "#ffffff",
          }}
        >
          <StyledHeading>CLIENT AREA</StyledHeading>
        </StyledBox>
      </StyledClient>

      <section className="msger">
        <header className="msger-header">
          <div className="msger-header-title">
            <i className="fas fa-comment-alt"></i>
            MiBank
            <br />
            {state.sessionId ? (
              <span>
                {/* Please use this : <strong>{state.sessionId}</strong>session Id
                to check stats */}
              </span>
            ) : null}
          </div>
          <div className="msger-header-options">
            <span>
              <i className="fas fa-cog"></i>
            </span>
          </div>
        </header>
        <main className="msger-chat">
          <div className="msg left-msg">
            <div className="msg-img"></div>
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">Assistant</div>
              </div>
              <div className="msg-text">Welcome</div>
            </div>
          </div>
        </main>
        <form className="msger-inputarea" onSubmit={handleSubmit}>
          <input
            name="message"
            type="text"
            id="messageInput"
            className="msger-input"
            placeholder="Enter your message..."
            onChange={handleChange}
          />
          <button type="submit" className="msger-send-btn">
            Send
          </button>
        </form>
      </section>
    </>
  );
};

export default ClientArea;
