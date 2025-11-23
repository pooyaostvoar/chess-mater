import React from 'react';
import { Label } from '../ui/label';

interface AccountTypeSectionProps {
	isMaster: boolean;
	onChange: (isMaster: boolean) => void;
}

export const AccountTypeSection: React.FC<AccountTypeSectionProps> = ({
	isMaster,
	onChange,
}) => {
	return (
		<div className='space-y-4'>
			<h3 className='text-xl font-semibold'>Account Type</h3>
			<div className='flex items-center space-x-2 p-4 bg-muted rounded-lg'>
				<input
					type='checkbox'
					id='isMaster'
					name='isMaster'
					checked={!!isMaster}
					onChange={(e) => onChange(e.target.checked)}
					className='h-4 w-4 rounded border-gray-300'
				/>
				<Label htmlFor='isMaster' className='cursor-pointer'>
					I am a chess master and want to offer coaching sessions
				</Label>
			</div>
		</div>
	);
};

