import { ColumnContainer, ColumnTitle } from './styles';
import { AddNewItem } from './AddNewItem';

type ColumnProps = React.PropsWithChildren<{
	text?: string;
}>;

export const Column = ({ text, children }: ColumnProps) => {
	return (
		<ColumnContainer>
			<ColumnTitle>{text}</ColumnTitle>
			{children}
			<AddNewItem
				onAdd={(text) => console.log(text)}
				toggleButtonText="+ Add another task"
				dark
			/>
		</ColumnContainer>
	);
};
