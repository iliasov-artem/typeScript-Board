import { createContext, useContext, Dispatch, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { appStateReducer, AppState, List, Task } from './appStateReducer';
import { Action } from './actions';
import { DragItem } from '../DragItem';
import { save } from '../api';
import { withInitialState } from '../withInitialState';

type AppStateProviderProps = {
	children: React.ReactNode;
	initialState: AppState;
};

type AppStateContextProps = {
	lists: List[];
	getTasksByListId(id: string): Task[];
	dispatch: Dispatch<Action>;
	dragItem: DragItem | null;
};

const AppStateContext = createContext<AppStateContextProps>(
	{} as AppStateContextProps
);

export const AppStateProvider = withInitialState<AppStateProviderProps>(
	({ children, initialState }) => {
		const [state, dispatch] = useImmerReducer(appStateReducer, initialState);
		const { lists, dragItem } = state;

		const getTasksByListId = (id: string) =>
			lists.find((list) => list.id === id)?.tasks || [];

		useEffect(() => {
			save(state);
		}, [state]);

		return (
			<AppStateContext.Provider
				value={{ lists, getTasksByListId, dispatch, dragItem }}
			>
				{children}
			</AppStateContext.Provider>
		);
	}
);

export const useAppState = () => {
	return useContext(AppStateContext);
};
