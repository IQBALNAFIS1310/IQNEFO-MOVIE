import { useState } from "react";
import { apiRegister } from "../utils/api";

export default function SignUp() {
    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
        name: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { id: Date.now(), ...form };
        const res = await apiRegister(user);
        setMessage(JSON.stringify(res, null, 2));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow w-96">
                <h2 className="text-xl font-bold mb-4">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input name="username" placeholder="Username" className="w-full p-2 border rounded"
                        value={form.username} onChange={handleChange} />
                    <input name="password" type="password" placeholder="Password" className="w-full p-2 border rounded"
                        value={form.password} onChange={handleChange} />
                    <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded"
                        value={form.email} onChange={handleChange} />
                    <input name="name" placeholder="Nama Lengkap" className="w-full p-2 border rounded"
                        value={form.name} onChange={handleChange} />
                    <button className="bg-blue-500 text-white w-full p-2 rounded">Register</button>
                </form>
                {message && <pre className="bg-gray-800 text-white p-2 mt-3 rounded text-sm">{message}</pre>}
                <p className="text-center text-sm mt-4">
                    Sudah Punya Akun?{" "}
                    <a href="/SignIn" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
