import React, { useState } from "react";
import { VscCallIncoming, VscCallOutgoing } from "react-icons/vsc";
import { LuPhoneMissed } from "react-icons/lu";
import { MdArchive } from "react-icons/md";
import { MdUnarchive } from "react-icons/md";
import { CgVoicemailR } from "react-icons/cg";

import "./CallItem.css";

import {
  handleSingleArchive,
  handleSingleUnarchive,
} from "../../services/CallApi";

function CallItem({ call, getCalls }) {
  const date = new Date(call.created_at);
  const handleArchive = () => {
    handleSingleArchive(call.id)
      .then(() => {
        getCalls();
      })
      .catch((error) => console.log(error));
  };
  const handleUnrchive = () => {
    handleSingleUnarchive(call.id)
      .then(() => {
        getCalls();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      {/* <div className="date_display">
        <hr />
        <p>{`${date.getDate()} ${date.toLocaleString("default", {
          month: "long",
        })} ${date.getFullYear()}`}</p>
        <hr />
      </div> */}
      <div className="call_item">
        {call.direction === "inbound" && call.call_type === "answered" && (
          <VscCallIncoming className="call_icon" />
        )}
        {call.direction === "inbound" && call.call_type === "missed" && (
          <LuPhoneMissed className="call_icon" />
        )}
        {call.direction === "inbound" && call.call_type === "voicemail" && (
          <CgVoicemailR className="call_icon" />
        )}
        {call.direction === "outbound" && (
          <VscCallOutgoing className="call_icon" />
        )}

        <div className="caller_data">
          <p className="via">+{call.via ? call.via : call.from}</p>
          <p className="callee">
            tried to call on<span>{` ${call.to}`}</span>
          </p>
        </div>
        <div className="call_time">
          <p>
            {new Date(call.created_at).toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        {call.is_archived && (
          <MdUnarchive className="icon unarchive" onClick={handleUnrchive} />
        )}
        {!call.is_archived && (
          <MdArchive className="icon archive" onClick={handleArchive} />
        )}
      </div>
    </div>
  );
}

export default CallItem;
