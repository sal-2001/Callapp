import React, { useEffect, useState } from "react";
import "./Callpage.css";
import { MdArchive } from "react-icons/md";
import CallItem from "../components/callitems/CallItem.js";
import { handleGetCalls, handleSingleArchive } from "../services/CallApi.js";
export default function Allcalls() {
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
    getAllCalls();
  }, []);

  const getAllCalls = () => {
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
        console.log(temp);
        const groupedData = {};
        temp.forEach((data) => {
          const createdDate = new Date(data.created_at).toLocaleDateString(
            "en-GB"
          );
          // console.log(data);

          if (data.direction && data.is_archived === false) {
            if (!groupedData[createdDate]) {
              groupedData[createdDate] = [];
            }
            groupedData[createdDate].push(data);
          }
        });
        console.log(groupedData);
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

  const handleArchiveAll = () => {
    let temp = [...calls];
    let arr = temp.map((call) => {
      return handleSingleArchive(call.id).catch((error) => console.log(error));
    });
    Promise.all(arr).then(() => setCalls([]));
  };
  return (
    <div>
      <div className="archive_container" onClick={handleArchiveAll}>
        <MdArchive className="icon" />
        <span>Archive all calls</span>
      </div>
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
                      if (call.direction && call.is_archived === false) {
                        return (
                          <CallItem
                            key={call.id}
                            call={call}
                            getCalls={getAllCalls}
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
  );
}
