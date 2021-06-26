import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppState } from './state/AppStateContext';

import { moveTask, setDraggedItem } from './state/actions';
import { useItemDrag } from './utils/useItemDrag';
import { isHidden } from './utils/isHidden';
import { CardContainer } from './styles';

type CardProps = {
	id: string;
	columnId: string;
	text: string;
	isPreview?: boolean;
};

export const Card = ({ id, columnId, text, isPreview }: CardProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const { dragItem, dispatch } = useAppState();

	const { drag } = useItemDrag({ type: 'CARD', id, columnId, text });

	const [, drop] = useDrop({
		accept: 'CARD',
		hover() {
			if (!dragItem || dragItem.type !== 'CARD' || dragItem.id === id) {
				return;
			}
			dispatch(moveTask(dragItem.id, id, dragItem.columnId, columnId));
			dispatch(setDraggedItem({ ...dragItem, columnId }));
		},
	});

	drag(drop(ref));

	const isHiddenCard = isHidden(dragItem, 'CARD', id, isPreview);
	return (
		<CardContainer isHidden={isHiddenCard} isPreview={isPreview} ref={ref}>
			{text}
		</CardContainer>
	);
};
