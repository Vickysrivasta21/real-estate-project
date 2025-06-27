"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMsg("Not logged in");
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const userData = data.user ?? data;

        if (res.ok) {
          setUser(userData);
        } else {
          setMsg(data.message || "Failed to fetch user");
        }
      } catch (err) {
        setMsg("Something went wrong");
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful!", {
      position: "top-center",
      autoClose: 1500,
    });

    setTimeout(() => {
      router.push("/login");
    }, 1600);
  };

  if (!user) {
    return (
      <div style={styles.centeredContainer}>
        <p>{msg}</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome, {user.name || user.email || "User"}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    marginBottom: "1rem",
    fontSize: "1.5rem",
    color: "#333",
  },
  logoutButton: {
    marginTop: "1.5rem",
    padding: "10px 20px",
    backgroundColor: "#e63946",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  centeredContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.2rem",
    color: "#555",
  },
};
