import { DragItem } from '../DragItem';

export const isHidden = (
	dragItem: DragItem | null,
	itemType: string,
	id: string,
	isPreview?: boolean
): boolean =>
	Boolean(
		!isPreview && dragItem && dragItem.type === itemType && dragItem.id === id
	);
