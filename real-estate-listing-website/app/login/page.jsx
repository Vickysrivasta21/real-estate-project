"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
      
        localStorage.setItem("token", data.token);

        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 1500,
        });

        
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1600);
      } else {
        toast.error(data.msg || "Incorrect email or password", {
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="auth-page" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <button type="submit">Log In</button>
      </form>

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Don't have an account?{" "}
        <Link
          href="/signup"
          style={{ color: "#2563eb", textDecoration: "underline" }}
        >
          Register
        </Link>
      </p>
    </div>
  );
}
