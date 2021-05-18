import React, { useState } from 'react';
import { NewItemFormContainer, NewItemButton, NewItemInput } from './styles';

import { useFocus } from './utils/useFocus';

type NewItemFormProps = {
	onAdd(text: string): void;
};

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
	const [text, setText] = useState('');
	const inputRef = useFocus();

	const handleAddText = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onAdd(text);
		}
	};

	return (
		<NewItemFormContainer>
			<NewItemInput
				ref={inputRef}
				value={text}
				onChange={({ target: { value } }) => setText(value)}
				onKeyPress={handleAddText}
			/>
			<NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
		</NewItemFormContainer>
	);
};
