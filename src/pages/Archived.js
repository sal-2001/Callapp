import React, { useEffect, useState } from "react";
import { MdUnarchive } from "react-icons/md";
import CallItem from "../components/callitems/CallItem.js";
import "./Callpage.css";
import { handleAllUnarchive, handleGetCalls } from "../services/CallApi.js";
export default function Archived() {
  const [calls, setCalls] = useState([]);
  const [callobj, setCallobj] = useState([]);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    getArchivedCalls();
  }, []);

  const getArchivedCalls = () => {
    handleGetCalls()
      .then((allcalls) => {
        let temp = [...allcalls];
        temp.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          // Compare dates in descending order
          return dateB - dateA;
        });
        return temp;
      })
      .then((temp) => {
        const groupedData = {};
        temp.forEach((data) => {
          const createdDate = new Date(data.created_at).toLocaleDateString(
            "en-GB"
          );
          if (data.direction && data.is_archived === true) {
            if (!groupedData[createdDate]) {
              groupedData[createdDate] = [];
            }
            groupedData[createdDate].push(data);
          }
        });
        let datedData = [];
        for (let item in groupedData) {
          datedData.push({
            date: item,
            value: groupedData[item],
          });
        }
        setCallobj(datedData);
        setCalls(temp);
      })
      .catch((error) => console.log(error));
  };

  const handleUnrchiveAll = () => {
    handleAllUnarchive()
      .then(() => getArchivedCalls())
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div>
        <div className="archive_container" onClick={handleUnrchiveAll}>
          <MdUnarchive className="icon" />
          <span>Unarchive all calls</span>
        </div>
        {/* {calls &&
          calls.length > 0 &&
          calls.map((call) => {
            if (call.call_type && call.direction && call.is_archived) {
              return (
                <CallItem
                  key={call.id}
                  call={call}
                  getCalls={getArchivedCalls}
                />
              );
            }
            return null;
          })} */}
        {callobj &&
          callobj.length > 0 &&
          callobj.map((item) => {
            return (
              <div>
                {item.value && item.value.length > 0 && (
                  <div>
                    <div className="date_display">
                      <hr />
                      <p>{`${item.date.split("/")[0]} ${
                        monthNames[parseInt(item.date.split("/")[1]) - 1]
                      } ${item.date.split("/")[2]}`}</p>
                      <hr />
                    </div>
                    <div>
                      {item.value.map((call) => {
                        if (call.direction && call.is_archived === true) {
                          return (
                            <CallItem
                              key={call.id}
                              call={call}
                              getCalls={getArchivedCalls}
                            />
                          );
                        }
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
