import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

export const CTASection: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className='bg-muted py-16'>
			<div className='max-w-4xl mx-auto px-5 text-center'>
				<h2 className='text-3xl md:text-4xl font-bold mb-4'>
					Ready to Improve Your Chess?
				</h2>
				<p className='text-lg text-muted-foreground mb-8'>
					Join our community and start learning from the best
				</p>
				<div className='flex gap-4 justify-center flex-wrap'>
					<Button
						size='lg'
						onClick={() => navigate('/signup')}
						className='text-lg px-8'>
						Sign Up Now
					</Button>
					<Button
						size='lg'
						variant='outline'
						onClick={() => navigate('/login')}
						className='text-lg px-8'>
						Log In
					</Button>
				</div>
			</div>
		</div>
	);
};

