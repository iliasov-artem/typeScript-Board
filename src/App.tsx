import { AppContainer } from './styles';
import { AddNewItem } from './AddNewItem';
import { Card } from './Card';
import { Column } from './Column';

export const App = () => {
	return (
		<AppContainer>
			<Column text="To Do">
				<Card text="Generate app" />
			</Column>
			<Column text="In Progress">
				<Card text="Learn Typescript" />
			</Column>
			<Column text="Done">
				<Card text="Begin using static typing" />
			</Column>
			<AddNewItem
				toggleButtonText="+ Add another list"
				onAdd={(text) => console.log(text)}
			/>
		</AppContainer>
	);
};
