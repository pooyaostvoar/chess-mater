import axios from 'axios';
import { API_URL } from './config';

export const getMyBookings = async () => {
	const res = await axios.get(`${API_URL}/schedule/slot/my-bookings`, {
		withCredentials: true,
	});
	return res;
};

export const getMasterBookings = async () => {
	const res = await axios.get(`${API_URL}/schedule/slot/master-bookings`, {
		withCredentials: true,
	});
	return res;
};

