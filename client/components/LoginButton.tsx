import React from 'react';



const LoginButton = () => {
    return (
        <div><a href="http://localhost:8080/auth/spotify"
                className={"bg-green-500 hover:bg-green-600 text-yellow-200 font-bold py-2 px-4 rounded-2xl inline-block"}>Log
            in with Spotify</a></div>
    );
}

export default LoginButton;