"use client";
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      setUser(JSON.parse(user));
      setLoading(false);
    }
  }, []);
  return (
    <main>
     {
      loading ? <p>Loading..</p> :  <p>Hoş geldin {user?.username}</p>
     }
    </main>
  )
}