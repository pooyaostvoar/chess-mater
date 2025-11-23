import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface ChessPlatformSectionProps {
	chesscomUrl: string | null;
	lichessUrl: string | null;
	onChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => void;
}

export const ChessPlatformSection: React.FC<ChessPlatformSectionProps> = ({
	chesscomUrl,
	lichessUrl,
	onChange,
}) => {
	return (
		<div className='space-y-4'>
			<h3 className='text-xl font-semibold'>Chess Platform Profiles</h3>
			<div className='space-y-4'>
				<div>
					<Label htmlFor='chesscomUrl'>
						Chess.com Username/URL (optional)
					</Label>
					<Input
						id='chesscomUrl'
						type='text'
						name='chesscomUrl'
						value={chesscomUrl || ''}
						onChange={onChange}
						placeholder='e.g., username or https://www.chess.com/member/username'
					/>
				</div>

				<div>
					<Label htmlFor='lichessUrl'>
						Lichess Username/URL (optional)
					</Label>
					<Input
						id='lichessUrl'
						type='text'
						name='lichessUrl'
						value={lichessUrl || ''}
						onChange={onChange}
						placeholder='e.g., username or https://lichess.org/@/username'
					/>
				</div>
			</div>
		</div>
	);
};

