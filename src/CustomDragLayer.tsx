import { useDragLayer } from 'react-dnd';
import { Column } from './Column';
import { Card } from './Card';
import { CustomDragLayerContainer, DragPreviewWrapper } from './styles';
import { useAppState } from './state/AppStateContext';

export const CustomDragLayer = () => {
	const { dragItem } = useAppState();
	const { currentOffset } = useDragLayer((monitor) => ({
		currentOffset: monitor.getSourceClientOffset(),
	}));

	return dragItem && currentOffset ? (
		<CustomDragLayerContainer>
			<DragPreviewWrapper position={currentOffset}>
				{dragItem.type === 'COLUMN' ? (
					<Column id={dragItem.id} text={dragItem.text} isPreview />
				) : (
					<Card
						id={dragItem.id}
						columnId={dragItem.columnId}
						text={dragItem.text}
						isPreview
					/>
				)}
			</DragPreviewWrapper>
		</CustomDragLayerContainer>
	) : null;
};
