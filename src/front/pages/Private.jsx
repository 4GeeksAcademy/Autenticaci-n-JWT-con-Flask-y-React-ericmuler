import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Private() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchPrivateData = async () => {
            const backendURL = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendURL}/api/private`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                sessionStorage.removeItem("token");
                navigate("/login");
            }
        };

        fetchPrivateData();
    }, []);

    if (!user) return <p className="text-center mt-5">Loading private content...</p>;

    return (
        <div className="text-center mt-5">
            <h2>Welcome to the Private Page</h2>
            <p>Email: {user.user_email}</p>
            <p>User ID: {user.user_id}</p>
        </div>
    );
}

export default Private;
