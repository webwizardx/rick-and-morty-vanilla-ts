import { getCharacter } from './API';

enum StatusBadge {
	'Alive' = 'bg-success',
	'Dead' = 'bg-danger',
	'unknown' = 'bg-secondary',
}

type LocalInfo = {
	page: number;
	prev: string | null | undefined;
	next: string | null | undefined;
};

const localInfo: LocalInfo = {
	page: 1,
	prev: null,
	next: null,
};

const previousPage = document.querySelector('#previousPage') as HTMLLIElement;
const nextPage = document.querySelector('#nextPage') as HTMLLIElement;

previousPage.addEventListener('click', () => {
	if (localInfo.page === 1) return;

	--localInfo.page;
	renderCharacters();
});

nextPage.addEventListener('click', () => {
	++localInfo.page;
	renderCharacters();
});

function checkPage() {
	if (localInfo.page === 1) {
		previousPage.classList.add('disabled');
	} else {
		previousPage.classList.remove('disabled');
	}

	if (localInfo.next === null) {
		nextPage.classList.add('disabled');
	} else {
		nextPage.classList.remove('disabled');
	}
}

async function renderCharacters() {
	const { info, results } = await getCharacter({ page: localInfo.page });
	localInfo.prev = info?.prev;
	localInfo.next = info?.next;
	checkPage();

	const content = document.querySelector('.content') as HTMLDivElement;
	content.innerHTML = '';

	const cardTemplate = document.querySelector(
		'#card-template'
	) as HTMLTemplateElement;

	const card = cardTemplate.content.querySelector('.card')!;

	results?.forEach(character => {
		const copyCard = card.cloneNode(true) as HTMLElement;
		const img = copyCard.querySelector('img') as HTMLImageElement;
		const name = copyCard.querySelector('#name') as HTMLHeadingElement;
		const statusBadge = copyCard.querySelector(
			'#status-badge'
		) as HTMLSpanElement;
		const status = copyCard.querySelector('#status') as HTMLSpanElement;
		const location = copyCard.querySelector('#location') as HTMLSpanElement;
		const gender = copyCard.querySelector('#gender') as HTMLSpanElement;

		img.setAttribute('src', character.image);
		img.setAttribute('alt', character.name);

		name.textContent = character.name;

		statusBadge.classList.add(StatusBadge[character.status]);

		status.textContent = `${character.status} - ${character.species}`;

		location.textContent = character.location.name;

		gender.textContent = character.gender;

		content.appendChild(copyCard);
	});
}

renderCharacters();

