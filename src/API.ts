import { Character, CharacterFilter, Info } from 'rickmortyapi/dist/interfaces';

export const GET_CHARACTERS = 'https://rickandmortyapi.com/api/character';

export async function getCharacter(
	params?: CharacterFilter
): Promise<Info<Character[]>> {
	const url = `${GET_CHARACTERS}?${new URLSearchParams(params as any)}`;

	let response = await fetch(url);

	return await response.json();
}

