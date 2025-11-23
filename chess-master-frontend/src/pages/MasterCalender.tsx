import React from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import MasterCalendarView from './MasterCalendarView';
import BookCalendarView from './BookCalendarView';

const MasterScheduleCalendar: React.FC = () => {
	const { userId } = useParams<{ userId: string }>();
	const { user } = useUser();

	// Check if current user is the master owner
	const isOwner = user?.id === Number(userId) && user?.isMaster;

	// Render appropriate view based on ownership
	return isOwner ? <MasterCalendarView /> : <BookCalendarView />;
};

export default MasterScheduleCalendar;
