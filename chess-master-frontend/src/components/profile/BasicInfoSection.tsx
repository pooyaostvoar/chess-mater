import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface BasicInfoSectionProps {
	username: string;
	email: string;
	onChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
	username,
	email,
	onChange,
}) => {
	return (
		<div className='space-y-4'>
			<h3 className='text-xl font-semibold'>Basic Information</h3>
			<div className='space-y-4'>
				<div>
					<Label htmlFor='username'>Username</Label>
					<Input
						id='username'
						type='text'
						name='username'
						value={username || ''}
						onChange={onChange}
						placeholder='Your username'
					/>
				</div>

				<div>
					<Label htmlFor='email'>Email</Label>
					<Input
						id='email'
						type='email'
						name='email'
						value={email || ''}
						onChange={onChange}
						placeholder='your.email@example.com'
					/>
				</div>
			</div>
		</div>
	);
};

