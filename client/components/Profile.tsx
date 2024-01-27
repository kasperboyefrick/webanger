import React, {useEffect, useState} from "react";

interface User {
    username? : string;
    displayname? : string;
}
const Profile = () => {
    const [user, setUser] = useState<User | null>();


    useEffect(() => {
        fetch("http://localhost:8080/api/user", {credentials: "include"})
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((error) => console.error(error));
    }, []);

    if (!user) {
        return (
            <div><a href="http://localhost:8080/auth/spotify"
                    className={"bg-green-500 hover:bg-green-600 text-yellow-200 font-bold py-2 px-4 rounded-2xl inline-block"}>Log
                in with Spotify</a></div>
        );
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p>Username: {user.username}</p>
        </div>
    );
};

export default Profile;