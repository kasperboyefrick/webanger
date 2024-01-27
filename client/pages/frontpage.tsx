// pages/frontpage.tsx
import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import PlaylistList from '../components/PlaylistList';
import ScheduleMeeting from "@/components/ScheduleMeeting";

function Frontpage() {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        // Replace with your data loading logic here (e.g., an API call).
        // For demonstration purposes, you can use a placeholder data array.
        const loadPlaylists = async () => {
            try {
                // Replace this with your actual data fetching logic.
                const response = await fetch('/api/playlists'); // Assuming you have an API route to fetch playlists
                if (response.ok) {
                    const data = await response.json();
                    setPlaylists(data);
                } else {
                    // Handle errors
                    console.error('Failed to load playlists');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        loadPlaylists();
    }, []);

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold">Front Page</h1>
                <p>Welcome to your music nomination app!</p>
                <PlaylistList/>
            </div>
            <ScheduleMeeting/>
        </Layout>
    );
}

export default Frontpage;
