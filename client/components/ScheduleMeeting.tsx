// ScheduleMeeting.tsx

import React, {useState} from 'react';
import {util} from "zod";
import getValidEnumValues = util.getValidEnumValues;

const ScheduleMeeting: React.FC = () => {
    const [meetingDate, setMeetingDate] = useState<string>('');

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMeetingDate(e.target.value);
    };

    const handleScheduleMeeting = () => {
        const response = fetch("http://localhost:8080/api/schedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"heooe", "ooe"}),
            credentials: "include",
        }).then(r => r.text()).then(value => console.log(value)).catch(e => console.log("error"));

    };

    return (
        <div>
            <h1 className="font-bold text ">Schedule a New Meeting</h1>
            <label>Date and Time: </label>
            <div>
                <input
                    type="date"
                    value={meetingDate}
                    onChange={handleDateChange}

                /></div>
            <button onClick={handleScheduleMeeting}>Schedule Meeting</button>
        </div>
    );
};

export default ScheduleMeeting;
