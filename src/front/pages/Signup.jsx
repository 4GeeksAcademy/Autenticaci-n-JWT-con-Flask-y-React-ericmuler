import React, { useContext } from "react";
import { EmailContext, PasswordContext } from "../pages/UseContext";

function SignUp() {
    const [email, setEmail] = useContext(EmailContext);
    const [password, setPassword] = useContext(PasswordContext);

    const regisSend = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("All fields are required");
            return;
        }

        const backendURL = import.meta.env.VITE_BACKEND_URL;

        const response = await fetch(`${backendURL}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Register successful");
            setEmail("");
            setPassword("");
        } else {
            alert(data.message || "Registration failed");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Register</h3>
                            <form onSubmit={regisSend}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
