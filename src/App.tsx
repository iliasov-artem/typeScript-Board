import { useAppState } from './state/AppStateContext';

import { addList } from './state/actions';

import { AppContainer } from './styles';
import { AddNewItem } from './AddNewItem';
import { CustomDragLayer } from './CustomDragLayer';
import { Column } from './Column';

export const App = () => {
	const { lists, dispatch } = useAppState();

	return (
		<AppContainer>
			<CustomDragLayer />
			{lists.map(({ id, text }) => (
				<Column id={id} key={id} text={text} />
			))}
			<AddNewItem
				toggleButtonText="+ Add another list"
				onAdd={(text) => dispatch(addList(text))}
			/>
		</AppContainer>
	);
};
