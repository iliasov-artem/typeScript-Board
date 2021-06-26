import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppState } from './state/AppStateContext';

import { addTask, moveList, moveTask, setDraggedItem } from './state/actions';
import { useItemDrag } from './utils/useItemDrag';
import { isHidden } from './utils/isHidden';

import { ColumnContainer, ColumnTitle } from './styles';
import { AddNewItem } from './AddNewItem';
import { Card } from './Card';

type ColumnProps = {
	text: string;
	id: string;
	isPreview?: boolean;
};

export const Column = ({ text, id, isPreview }: ColumnProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const { getTasksByListId, dispatch, dragItem } = useAppState();
	const tasks = getTasksByListId(id);

	const [, drop] = useDrop({
		accept: ['COLUMN', 'CARD'],
		hover() {
			if (!dragItem) {
				return;
			}
			if (dragItem.type === 'COLUMN') {
				if (dragItem.id === id) {
					return;
				}
				dispatch(moveList(dragItem.id, id));
			}

			if (
				dragItem.type === 'CARD' &&
				dragItem.columnId !== id &&
				tasks.length === 0
			) {
				dispatch(moveTask(dragItem.id, null, dragItem.columnId, id));
				dispatch(setDraggedItem({ ...dragItem, columnId: id }));
			}
		},
	});

	const { drag } = useItemDrag({ type: 'COLUMN', id, text });
	drag(drop(ref));

	const isHiddenColumn = isHidden(dragItem, 'COLUMN', id, isPreview);

	return (
		<ColumnContainer ref={ref} isHidden={isHiddenColumn} isPreview={isPreview}>
			<ColumnTitle>{text}</ColumnTitle>
			{tasks.map(({ id: cardId, text }) => (
				<Card id={cardId} key={cardId} text={text} columnId={id} />
			))}
			<AddNewItem
				onAdd={(text) => dispatch(addTask(id, text))}
				toggleButtonText="+ Add another task"
				dark
			/>
		</ColumnContainer>
	);
};
