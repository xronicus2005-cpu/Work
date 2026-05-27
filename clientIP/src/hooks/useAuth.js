import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export const useAuth = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get("/me")
            .then((res) => {
                setUser(res.data.user)
            })
            .catch(() => {
                setUser(null)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const logout = async () => {
        try{
            await api.post("/logout")
            setUser(null)
            toast.info("Profildan shiqtiniz!")
        }
        catch{
            toast.error("Profildan shigiwda qatelik!")
        }
    }

    return {user, setUser, loading, logout}
}