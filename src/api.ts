import { AppState } from './state/appStateReducer';

export const save = (payload: AppState) => {
	return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/save`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
		},
		body: JSON.stringify(payload),
	}).then((res) => {
		if (res.ok) {
			return res.json();
		} else {
			throw new Error('Error while saving the state.');
		}
	});
};

export const load = () => {
	return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/load`).then((res) => {
		if (res.ok) {
			return res.json() as Promise<AppState>;
		} else {
			throw new Error('Error while loading the state');
		}
	});
};
