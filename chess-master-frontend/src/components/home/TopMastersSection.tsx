import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Card,
	CardContent,
} from '../ui/card';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { MasterCard } from './MasterCard';
import type { User } from '../../services/auth';

interface TopMastersSectionProps {
	masters: User[];
	loading: boolean;
	onViewSchedule: (userId: number) => void;
}

export const TopMastersSection: React.FC<TopMastersSectionProps> = ({
	masters,
	loading,
	onViewSchedule,
}) => {
	const navigate = useNavigate();

	return (
		<div className='mb-12'>
			<div className='flex justify-between items-center mb-8'>
				<div>
					<h2 className='text-3xl md:text-4xl font-bold mb-2'>
						Top Rated Masters
					</h2>
					<p className='text-lg text-muted-foreground'>
						Meet our highest-rated chess masters
					</p>
				</div>
				<Button
					variant='outline'
					onClick={() => navigate('/masters')}
					className='hidden md:flex'>
					View All Masters
					<ArrowRight className='ml-2 h-4 w-4' />
				</Button>
			</div>

			{loading ? (
				<div className='flex justify-center items-center py-20'>
					<div className='w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin' />
				</div>
			) : masters.length === 0 ? (
				<Card className='text-center py-12'>
					<CardContent>
						<p className='text-muted-foreground'>
							No masters available at the moment
						</p>
					</CardContent>
				</Card>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
					{masters.map((master) => (
						<MasterCard
							key={master.id}
							master={master}
							onViewSchedule={onViewSchedule}
						/>
					))}
				</div>
			)}

			<div className='text-center'>
				<Button
					variant='outline'
					size='lg'
					onClick={() => navigate('/masters')}
					className='md:hidden'>
					View All Masters
					<ArrowRight className='ml-2 h-4 w-4' />
				</Button>
			</div>
		</div>
	);
};

