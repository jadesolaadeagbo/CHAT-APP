import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/users");

				// Check if the response is OK (status 200)
				if (res.status !== 200) {
					// If the response is not ok, throw an error with the status
					throw new Error(`HTTP error! status: ${res.status}`);
				}

				// Check if the response is JSON
				const contentType = res.headers.get("content-type");
				if (!contentType || !contentType.includes("application/json")) {
					throw new Error("Received non-JSON response");
				}

				const data = await res.json();
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
				console.error("Error fetching conversations:", error);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};

export default useGetConversations;
