import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../services/config';

export const useMasterInfo = (userId: string | undefined) => {
	const [masterInfo, setMasterInfo] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadMasterInfo = async () => {
			if (!userId) {
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				const res = await axios.get(`${API_URL}/users`, {
					params: { isMaster: true },
					withCredentials: true,
				});
				const master = res.data.users.find(
					(u: any) => u.id === Number(userId)
				);
				setMasterInfo(master);
			} catch (err) {
				console.error('Failed to load master info', err);
			} finally {
				setLoading(false);
			}
		};

		loadMasterInfo();
	}, [userId]);

	return { masterInfo, loading };
};

