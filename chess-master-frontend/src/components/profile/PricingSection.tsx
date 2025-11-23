import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { DollarSign, Clock } from 'lucide-react';

interface PricingSectionProps {
	pricing: {
		price5min: number | null;
		price10min: number | null;
		price15min: number | null;
		price30min: number | null;
		price45min: number | null;
		price60min: number | null;
	};
	onPricingChange: (
		key: string,
		value: number | null
	) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
	pricing,
	onPricingChange,
}) => {
	const pricingOptions = [
		{ key: 'price5min', label: '5 minutes', duration: 5 },
		{ key: 'price10min', label: '10 minutes', duration: 10 },
		{ key: 'price15min', label: '15 minutes', duration: 15 },
		{ key: 'price30min', label: '30 minutes', duration: 30 },
		{ key: 'price45min', label: '45 minutes', duration: 45 },
		{ key: 'price60min', label: '1 hour', duration: 60 },
	];

	return (
		<div className='space-y-4'>
			<div className='flex items-center gap-2 mb-2'>
				<DollarSign className='h-5 w-5 text-primary' />
				<h3 className='text-xl font-semibold'>Session Pricing</h3>
			</div>
			<p className='text-sm text-muted-foreground mb-4'>
				Set your rates for different session durations. Prices are in
				your local currency.
			</p>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{pricingOptions.map(({ key, label, duration }) => (
					<Card
						key={key}
						className='border-2 hover:border-primary transition-colors'>
						<CardContent className='pt-4'>
							<div className='flex items-center gap-2 mb-3'>
								<Clock className='h-4 w-4 text-muted-foreground' />
								<Label htmlFor={key} className='text-sm font-medium'>
									{label}
								</Label>
							</div>
							<div className='relative'>
								<span className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
									$
								</span>
								<Input
									id={key}
									type='number'
									name={key}
									value={pricing[key as keyof typeof pricing] || ''}
									onChange={(e) => {
										const value =
											e.target.value === ''
												? null
												: parseFloat(e.target.value);
										onPricingChange(key, value);
									}}
									placeholder='0.00'
									min='0'
									step='0.01'
									className='pl-7'
								/>
							</div>
							{pricing[key as keyof typeof pricing] && (
								<p className='text-xs text-muted-foreground mt-2'>
									${pricing[key as keyof typeof pricing]} per{' '}
									{duration} min
								</p>
							)}
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

