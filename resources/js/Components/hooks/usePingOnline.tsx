import axios from "axios";
import { useEffect } from "react";

const usePingOnline = () => {
    useEffect(() => {
        const interval = setInterval(() => {
            axios.post("/api/ping-online");
        }, 60000 * 5); // every 5 minutes

        return () => clearInterval(interval);
    }, []);
};

export default usePingOnline;
