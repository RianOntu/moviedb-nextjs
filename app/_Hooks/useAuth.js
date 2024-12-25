'use client'
import { useContext } from "react";
import { AuthContext } from "../_contexts";




export const useAuth = () => {
    const { auth, setAuth } = useContext(AuthContext);
    return { auth, setAuth };
};