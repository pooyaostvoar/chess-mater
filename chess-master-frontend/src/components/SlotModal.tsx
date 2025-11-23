import React from 'react';
import axios from 'axios';
import { deleteSlots } from '../services/schedule';

const API_URL = 'http://localhost:3004';

interface SlotModalProps {
	visible: boolean;
	onClose: () => void;
	slotId: number | null;
	slot?: any;
	onDeleted?: (id: number) => void;
	onStatusChange?: (slot: any) => void;
}

const SlotModal: React.FC<SlotModalProps> = ({
	visible,
	onClose,
	slotId,
	slot,
	onDeleted,
	onStatusChange,
}) => {
	if (!visible || slotId == null) return null;

	const isReserved = slot?.status === 'reserved';
	const reservedBy = slot?.reservedBy;

	const handleDelete = async () => {
		if (!window.confirm('Are you sure you want to delete this slot?'))
			return;

		try {
			await deleteSlots([slotId]);
			onDeleted?.(slotId);
			onClose();
		} catch (err) {
			console.error(err);
			alert('Error deleting slot. Please try again.');
		}
	};

	const updateStatus = async (status: 'free' | 'reserved' | 'booked') => {
		try {
			const res = await axios.patch(
				`${API_URL}/schedule/slot/${slotId}/status`,
				{ status },
				{ withCredentials: true }
			);

			onStatusChange?.(res.data.slot);
			onClose();
		} catch (err) {
			console.error(err);
			alert('Error updating status. Please try again.');
		}
	};

	const handleApprove = () => {
		updateStatus('booked');
	};

	const handleReject = () => {
		if (
			!window.confirm(
				`Reject the request from ${
					reservedBy?.username || 'this user'
				}? The slot will become available again.`
			)
		) {
			return;
		}
		updateStatus('free');
	};

	return (
		<div
			style={styles.overlay}
			onClick={onClose}>
			<div
				style={styles.modal}
				onClick={(e) => e.stopPropagation()}>
				<div style={styles.header}>
					<h3 style={styles.title}>
						{isReserved ? 'Slot Request' : 'Manage Time Slot'}
					</h3>
					<button
						style={styles.closeIcon}
						onClick={onClose}>
						×
					</button>
				</div>

				{isReserved && reservedBy && (
					<div style={styles.requestInfo}>
						<p style={styles.requestText}>
							<strong>{reservedBy.username}</strong> has requested
							this time slot
						</p>
						{reservedBy.email && (
							<p style={styles.requestEmail}>
								{reservedBy.email}
							</p>
						)}
					</div>
				)}

				<p style={styles.subtitle}>
					{isReserved
						? 'Approve or reject this request'
						: 'Choose an action for this time slot'}
				</p>

				<div style={styles.actions}>
					{isReserved ? (
						<>
							<button
								style={styles.approveBtn}
								onClick={handleApprove}>
								<span style={styles.btnIcon}>✅</span>
								<div style={styles.btnContent}>
									<div style={styles.btnTitle}>
										Approve Request
									</div>
									<div style={styles.btnDesc}>
										Confirm the booking
									</div>
								</div>
							</button>

							<button
								style={styles.rejectBtn}
								onClick={handleReject}>
								<span style={styles.btnIcon}>❌</span>
								<div style={styles.btnContent}>
									<div style={styles.btnTitle}>
										Reject Request
									</div>
									<div style={styles.btnDesc}>
										Make slot available again
									</div>
								</div>
							</button>
						</>
					) : (
						<>
							<button
								style={styles.statusBtn}
								onClick={() => updateStatus('free')}>
								<span style={styles.btnIcon}>🟢</span>
								<div style={styles.btnContent}>
									<div style={styles.btnTitle}>
										Set as Available
									</div>
									<div style={styles.btnDesc}>
										Open for booking
									</div>
								</div>
							</button>

							<button
								style={styles.statusBtn}
								onClick={() => updateStatus('reserved')}>
								<span style={styles.btnIcon}>🟠</span>
								<div style={styles.btnContent}>
									<div style={styles.btnTitle}>
										Mark as Reserved
									</div>
									<div style={styles.btnDesc}>
										Pending confirmation
									</div>
								</div>
							</button>

							<button
								style={styles.statusBtn}
								onClick={() => updateStatus('booked')}>
								<span style={styles.btnIcon}>🔴</span>
								<div style={styles.btnContent}>
									<div style={styles.btnTitle}>
										Mark as Booked
									</div>
									<div style={styles.btnDesc}>
										Confirmed session
									</div>
								</div>
							</button>

							<button
								style={styles.deleteBtn}
								onClick={handleDelete}>
								<span style={styles.btnIcon}>🗑️</span>
								<div style={styles.btnContent}>
									<div style={styles.btnTitle}>
										Delete Slot
									</div>
									<div style={styles.btnDesc}>
										Remove permanently
									</div>
								</div>
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

const styles: Record<string, React.CSSProperties> = {
	overlay: {
		position: 'fixed',
		inset: 0,
		background: 'rgba(0,0,0,0.6)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 999,
		backdropFilter: 'blur(2px)',
	},
	modal: {
		background: 'white',
		padding: 0,
		borderRadius: '16px',
		width: '90%',
		maxWidth: '420px',
		boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
		animation: 'slideIn 0.2s ease',
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '24px',
		borderBottom: '1px solid #e0e0e0',
	},
	title: {
		margin: 0,
		fontSize: '22px',
		fontWeight: 700,
		color: '#2c3e50',
	},
	closeIcon: {
		width: '32px',
		height: '32px',
		borderRadius: '50%',
		border: 'none',
		background: '#f0f0f0',
		color: '#2c3e50',
		fontSize: '24px',
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		transition: 'all 0.2s ease',
		lineHeight: 1,
	},
	subtitle: {
		margin: '16px 24px 24px 24px',
		fontSize: '15px',
		color: '#7f8c8d',
	},
	actions: {
		display: 'flex',
		flexDirection: 'column',
		gap: '12px',
		padding: '0 24px 24px 24px',
	},
	statusBtn: {
		display: 'flex',
		alignItems: 'center',
		gap: '16px',
		padding: '16px',
		background: 'white',
		border: '2px solid #e0e0e0',
		borderRadius: '12px',
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		textAlign: 'left',
	},
	deleteBtn: {
		display: 'flex',
		alignItems: 'center',
		gap: '16px',
		padding: '16px',
		background: '#fee',
		border: '2px solid #e74c3c',
		borderRadius: '12px',
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		textAlign: 'left',
	},
	btnIcon: {
		fontSize: '24px',
		flexShrink: 0,
	},
	btnContent: {
		flex: 1,
	},
	btnTitle: {
		fontSize: '16px',
		fontWeight: 600,
		color: '#2c3e50',
		marginBottom: '4px',
	},
	btnDesc: {
		fontSize: '13px',
		color: '#7f8c8d',
	},
	requestInfo: {
		padding: '16px 24px',
		background: '#fff9e6',
		borderLeft: '4px solid #f39c12',
		margin: '0 24px',
		borderRadius: '8px',
	},
	requestText: {
		margin: 0,
		fontSize: '15px',
		color: '#2c3e50',
		marginBottom: '4px',
	},
	requestEmail: {
		margin: 0,
		fontSize: '13px',
		color: '#7f8c8d',
	},
	approveBtn: {
		display: 'flex',
		alignItems: 'center',
		gap: '16px',
		padding: '16px',
		background: '#e8f5e9',
		border: '2px solid #4caf50',
		borderRadius: '12px',
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		textAlign: 'left',
	},
	rejectBtn: {
		display: 'flex',
		alignItems: 'center',
		gap: '16px',
		padding: '16px',
		background: '#ffebee',
		border: '2px solid #f44336',
		borderRadius: '12px',
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		textAlign: 'left',
	},
};

export default SlotModal;
