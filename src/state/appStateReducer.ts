import { nanoid } from 'nanoid';
import { Action } from './actions';
import { DragItem } from '../DragItem';
import { findItemIndexById, moveItem } from '../utils/arrayUtils';

export type Task = {
	id: string;
	text: string;
};

export type List = {
	id: string;
	text: string;
	tasks: Task[];
};

export type AppState = {
	lists: List[];
	dragItem: DragItem | null;
};

export const appStateReducer = (
	draft: AppState,
	action: Action
): AppState | void => {
	switch (action.type) {
		case 'ADD_LIST':
			draft.lists.push({
				id: nanoid(),
				text: action.payload,
				tasks: [],
			});
			break;
		case 'ADD_TASK':
			const { text, listId } = action.payload;
			const targetListIndex = findItemIndexById(draft.lists, listId);
			draft.lists[targetListIndex].tasks.push({
				id: nanoid(),
				text,
			});
			break;
		case 'MOVE_LIST': {
			const { draggedId, targetId } = action.payload;
			const dragIndex = findItemIndexById(draft.lists, draggedId);
			const targetIndex = findItemIndexById(draft.lists, targetId);
			draft.lists = moveItem(draft.lists, dragIndex, targetIndex);
			break;
		}
		case 'SET_DRAGGED_ITEM':
			draft.dragItem = action.payload;
			break;
		case 'MOVE_TASK': {
			const { draggedId, targetId, sourceColumnId, targetColumnId } =
				action.payload;

			const sourceListIndex = findItemIndexById(draft.lists, sourceColumnId);
			const targetListIndex = findItemIndexById(draft.lists, targetColumnId);

			const dragIndex = findItemIndexById(
				draft.lists[sourceListIndex].tasks,
				draggedId
			);
			const targetIndex = targetId
				? findItemIndexById(draft.lists[targetListIndex].tasks, targetId)
				: 0;

			const task = draft.lists[sourceListIndex].tasks[dragIndex];

			draft.lists[sourceListIndex].tasks.splice(dragIndex, 1);
			draft.lists[targetListIndex].tasks.splice(targetIndex, 0, task);

			break;
		}
		default:
			break;
	}
};
