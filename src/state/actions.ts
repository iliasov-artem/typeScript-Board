import { DragItem } from '../DragItem';

export type Action =
	| { type: 'ADD_LIST'; payload: string }
	| { type: 'ADD_TASK'; payload: { text: string; listId: string } }
	| { type: 'MOVE_LIST'; payload: { draggedId: string; targetId: string } }
	| {
			type: 'MOVE_TASK';
			payload: {
				draggedId: string;
				targetId: string | null;
				sourceColumnId: string;
				targetColumnId: string;
			};
	  }
	| { type: 'SET_DRAGGED_ITEM'; payload: DragItem | null };

export const addList = (text: string): Action => ({
	type: 'ADD_LIST',
	payload: text,
});

export const addTask = (listId: string, text: string): Action => ({
	type: 'ADD_TASK',
	payload: { listId, text },
});

export const moveList = (draggedId: string, targetId: string): Action => ({
	type: 'MOVE_LIST',
	payload: { draggedId, targetId },
});

export const moveTask = (
	draggedId: string,
	targetId: string | null,
	sourceColumnId: string,
	targetColumnId: string
): Action => ({
	type: 'MOVE_TASK',
	payload: { draggedId, targetId, sourceColumnId, targetColumnId },
});

export const setDraggedItem = (dragItem: DragItem | null): Action => ({
	type: 'SET_DRAGGED_ITEM',
	payload: dragItem,
});

// export const moveList = () => ({
// 	type:
// })
