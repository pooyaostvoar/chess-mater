import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

export const HeroSection: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className='bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20'>
			<div className='max-w-7xl mx-auto px-5 text-center'>
				<h1 className='text-5xl md:text-6xl font-bold mb-6'>
					Learn Chess from Masters
				</h1>
				<p className='text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto'>
					Connect with experienced chess masters and elevate your
					game through personalized one-on-one sessions
				</p>
				<div className='flex gap-4 justify-center flex-wrap'>
					<Button
						size='lg'
						variant='secondary'
						onClick={() => navigate('/login')}
						className='text-lg px-8'>
						Get Started
					</Button>
					<Button
						size='lg'
						variant='outline'
						className='text-lg px-8 bg-transparent border-white text-white hover:bg-white/10'
						onClick={() => navigate('/masters')}>
						Browse Masters
					</Button>
				</div>
			</div>
		</div>
	);
};

