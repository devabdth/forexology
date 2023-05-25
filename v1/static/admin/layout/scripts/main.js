let ads, articles, writers, carrers, selectedArticles, selectedAd;
const adsData = {}

const initArticles = (articles_) => {
	articles = articles_;
}

const initAds = (ads_) => {
	ads = ads_;
}

const initWriters = (writers_) => {
	writers = writers_;
}

const initCarreres = (carrers_) => {
	carrers = carrers_;
}

const manageFragments = (tab) => {
	const id = tab.id;
	let fragment = document.querySelector(`.fragment#${id}`);
	if (fragment.classList.contains('active')) {
		return;
	}


	let activeFragmnet = document.querySelector('.fragment.active');
	activeFragmnet.classList.remove('active');

	let activeTab = document.querySelector('.fragment-controller.active');
	activeTab.classList.remove('active');

	tab.classList.add('active');
	fragment.classList.add('active');
}

const toggleCollapsable = (element) => {
	console.log(element);
	element.parentElement.classList.toggle('active');
}

const generatSelectioneDialogCard = (article, parent) => {
	const card = document.createElement('div');
	card.classList.add('article-card');
	card.setAttribute('id', article['id']);

	const cover = document.createElement('div');
	cover.classList.add('cover');
	cover.style.backgroundImage = `url(/assets/articles/covers/${article['id']})`;

	const content = document.createElement('div');
	content.classList.add('content');

	const title = document.createElement('h3');
	title.innerHTML = article['title']['EN'];

	const subtitle = document.createElement('p');
	subtitle.innerHTML = article['short_brief']['EN'].length < 100 ? article['short_brief']['EN'] : article['short_brief']['EN'].substring(0, 100);

	const options = document.createElement('div');
	options.classList.add('options');

	const action = document.createElement('button');
	action.classList.add('shadow-button');
	action.innerHTML = 'Remove';
	action.onclick = () => {
		parent.removeChild(card);
		selectedArticles.splice(selectedArticles.indexOf(article), 1);
	}

	options.appendChild(action);

	content.appendChild(title);
	content.appendChild(subtitle);
	content.appendChild(options);

	card.appendChild(cover);
	card.appendChild(content);

	return card;

}

const openADSelectionDialog = (props) => {
	const cardsContainer = document.querySelector('div#ad-selection-dialog div#ads-cards');

	const selection = document.querySelector('div#ad-selection-dialog div#selected-ad');
	selection.innerHTML = '';
	const ad = document.createElement('div');
	selection.appendChild(ad);
	ad.classList.add('ad-space');
	selectedAd = props.initiallySelectedAd.id;
	initializeAdSpace(ad, props.initiallySelectedAd, 'EN');

	cardsContainer.innerHTML = '';
	for (let ad of ads) {
		let adCard = document.createElement('div');
		adCard.classList.add('ad-space');
		adCard.setAttribute('id', ad.id);
		cardsContainer.appendChild(adCard)
		initializeAdSpace(adCard, ad, 'EN', () => {
			if (selectedAd == ad.id) return;
			selection.innerHTML = '';
			const ad_ = document.createElement('div');
			selection.appendChild(ad_);
			ad_.classList.add('ad-space');
			selectedAd = ad.id;
			initializeAdSpace(ad_, ads.filter(ad => ad.id == adCard.id)[0], 'EN');

		});
	}
	const confirmOption = document.querySelector('div#ad-selection-dialog #options .main-button');
	confirmOption.onclick = () => {
		props.placementParent.innerHTML = '';
		initializeAdSpace(props.placementParent, ads.filter(ad => ad.id == selectedAd)[0], 'EN')
		adsData[props.placementParent.classList[1]] = selectedAd;
		document.querySelector('div#ad-selection-dialog-overlay').style.display = 'none';
		document.querySelector('div#ad-selection-dialog').style.display = 'none';
	}


	document.querySelector('div#ad-selection-dialog-overlay').style.display = 'flex';
	document.querySelector('div#ad-selection-dialog').style.display = 'flex';
}

const openArticleSelectionDialog = (props) => {
	const status = document.querySelector('div#article-selection-dialog #status');
	const cards = document.querySelector('div#article-selection-dialog div#selected-articles');
	if (props.initiallySelectedArticles !== undefined && props.initiallySelectedArticles.length != 0) {
		selectedArticles = props.initiallySelectedArticles;
		for (let article of props.initiallySelectedArticles) {
			cards.appendChild(generatSelectioneDialogCard(article, cards));
		}
	}

	const articleCards = document.querySelectorAll('div#article-selection-dialog .search-dialog-article-card');
	articleCards.forEach(articleCard => {
		articleCard.onclick = () => {
			if (props.limit !== undefined && cards.childNodes.length == props.limit) return;
			if (selectedArticles.filter(article_ => article_.id == articleCard.id).length != 0) return;
			selectedArticles.push(articles.filter(article_ => article_.id == articleCard.id)[0])
			cards.appendChild(generatSelectioneDialogCard(
				articles.filter(article_ => article_.id == articleCard.id)[0],
				cards,
			));
		}
	});

	const confirmOption = document.querySelector('div#article-selection-dialog #options .main-button');
	confirmOption.onclick = () => {
		if (selectedArticles.length < props.minimum) {
			status.innerHTML = `Select at least (${props.minimum}) articles!`;
			return;
		}
		status.innerHTML = '';
		props.placementParent.innerHTML = cards.innerHTML;
		document.querySelector('div#article-selection-dialog-overlay').style.display = 'none';
		document.querySelector('div#article-selection-dialog').style.display = 'none';
	}


	document.querySelector('div#article-selection-dialog-overlay').style.display = 'flex';
	document.querySelector('div#article-selection-dialog').style.display = 'flex';
}

const closeArticleSelectionDialog = () => {
	document.querySelector('div#article-selection-dialog-overlay').style.display = 'none';
	document.querySelector('div#article-selection-dialog').style.display = 'none';
}

const closeADSelectionDialog = () => {
	document.querySelector('div#ad-selection-dialog-overlay').style.display = 'none';
	document.querySelector('div#ad-selection-dialog').style.display = 'none';
}

const openWritersSelectionDialog = (props) => {
	const selectedWritersContainer = document.querySelector('#writers-selection-dialog #body #selected-writers');
	selectedWritersContainer.innerHTML = '';
	const allWritersContainer = document.querySelector('#writers-selection-dialog #body #all-writers');
	allWritersContainer.innerHTML = '';
	const status = document.querySelector('#writers-selection-dialog #status');

	for (let writer of props.initialillySelectedWriters) {
		const writerCard = document.createElement('div');
		writerCard.classList.add('writer-card');
		writerCard.setAttribute('id', writer.id);
		writerCard.style.cursor = 'pointer';

		const cover = document.createElement('div');
		cover.classList.add('cover');
		cover.style.backgroundImage = `url('/assets/writers/bgFree/${writer.id}')`;

		const information = document.createElement('div');
		information.classList.add('information');

		const title = document.createElement('h3');
		title.innerHTML = writer.name[props.lang];

		const subtitle = document.createElement('p');
		subtitle.innerHTML = writer.bio[props.lang];

		const options = document.createElement('options');
		const action = document.createElement('button');
		action.classList.add('shadow-button');
		action.innerHTML = 'Remove';
		action.onclick = () => {
			selectedWritersContainer.removeChild(writerCard);
		}

		options.appendChild(action);


		information.appendChild(title);
		information.appendChild(subtitle);
		information.appendChild(options);

		writerCard.appendChild(cover)
		writerCard.appendChild(information)

		selectedWritersContainer.appendChild(writerCard);
	}

	for (let writer of writers) {
		const writerCard = document.createElement('div');
		writerCard.classList.add('writer-card');
		writerCard.setAttribute('id', writer.id);
		writerCard.style.cursor = 'pointer';
		writerCard.onclick = () => {
			if (selectedWritersContainer.childNodes.length < props.limit) {
				if (document.querySelector(`#writers-selection-dialog #selected-writers .writer-card#${writer.id}`) == undefined) {
					const writerCard_ = document.createElement('div');
					writerCard_.classList.add('writer-card');
					writerCard_.setAttribute('id', writer.id);
					writerCard_.style.cursor = 'pointer';

					const cover = document.createElement('div');
					cover.classList.add('cover');
					cover.style.backgroundImage = `url('/assets/writers/bgFree/${writer.id}')`;

					const information = document.createElement('div');
					information.classList.add('information');

					const title = document.createElement('h3');
					title.innerHTML = writer.name[props.lang];
					const subtitle = document.createElement('p');
					subtitle.innerHTML = writer.bio[props.lang];

					const options = document.createElement('options');
					const action = document.createElement('button');
					action.classList.add('shadow-button');
					action.innerHTML = 'Remove';
					action.onclick = () => {
						selectedWritersContainer.removeChild(writerCard_);
					}

					options.appendChild(action);


					information.appendChild(title);
					information.appendChild(subtitle);
					information.appendChild(options);

					writerCard_.appendChild(cover)
					writerCard_.appendChild(information)

					selectedWritersContainer.appendChild(writerCard_);
				}
			}
		}

		const cover = document.createElement('div');
		cover.classList.add('cover');
		cover.style.backgroundImage = `url('/assets/writers/bgFree/${writer.id}')`;

		const information = document.createElement('div');
		information.classList.add('information');

		const title = document.createElement('h3');
		title.innerHTML = writer.name[props.lang];
		const subtitle = document.createElement('p');
		subtitle.innerHTML = writer.bio[props.lang];

		information.appendChild(title);
		information.appendChild(subtitle);

		writerCard.appendChild(cover)
		writerCard.appendChild(information)

		allWritersContainer.appendChild(writerCard);
	}
	const confirmOption = document.querySelector('div#writers-selection-dialog #options .main-button');
	confirmOption.onclick = () => {
		let currentWritersCount = selectedWritersContainer.childNodes.length;
		if (!(currentWritersCount >= props.minimum && currentWritersCount <= props.limit)) {
			status.innerHTML = `Select at least (${props.minimum}) writers!`;
			return;
		}
		status.innerHTML = '';
		props.placementParent.innerHTML = selectedWritersContainer.innerHTML;
		closeWritersSelectionDialog();
	}

	document.querySelector('#writers-selection-dialog').style.display = 'flex';
	document.querySelector('#writers-selection-dialog-overlay').style.display = 'flex';
}

const closeWritersSelectionDialog = () => {
	document.querySelector('#writers-selection-dialog').style.display = 'none';
	document.querySelector('#writers-selection-dialog-overlay').style.display = 'none';
}

const openCarrersSelectionDialog = (props) => {
	const selectedCarrersContainer = document.querySelector('#carrers-selection-dialog #body #selected-carrers');
	selectedCarrersContainer.innerHTML = '';
	const allCarrersContainer = document.querySelector('#carrers-selection-dialog #body #all-carrers');
	allCarrersContainer.innerHTML = '';
	const status = document.querySelector('#carrers-selection-dialog #status');

	for (let carrer of props.initialillySelectedCarrers) {
		const carrerCard = document.createElement('div');
		carrerCard.classList.add('carrer-card');
		carrerCard.setAttribute('id', carrer.id);
		carrerCard.style.cursor = 'pointer';
		const information = document.createElement('div');
		information.classList.add('information');

		const title = document.createElement('h3');
		title.innerHTML = carrer.title[props.lang];

		const subtitle = document.createElement('p');
		subtitle.innerHTML = carrer.bio[props.lang];

		const options = document.createElement('options');
		const action = document.createElement('button');
		action.classList.add('shadow-button');
		action.innerHTML = 'Remove';
		action.onclick = () => {
			selectedCarrersContainer.removeChild(carrerCard);
		}

		options.appendChild(action);


		information.appendChild(title);
		information.appendChild(subtitle);
		information.appendChild(options);

		carrerCard.appendChild(information)

		selectedCarrersContainer.appendChild(carrerCard);
	}

	for (let carrer of carrers) {
		const carrerCard = document.createElement('div');
		carrerCard.classList.add('carrer-card');
		carrerCard.setAttribute('id', carrer.id);
		carrerCard.style.cursor = 'pointer';
		carrerCard.onclick = () => {
			if (selectedCarrersContainer.childNodes.length < props.limit) {
				let _card;
				try {
					_card = document.querySelector(`#carrers-selection-dialog #selected-carrers .carrer-card#${carrer.id}`);
				} catch (e) {
					_card = null;
				}
				if (_card == null) {
					const carrerCard_ = document.createElement('div');
					carrerCard_.classList.add('carrer-card');
					carrerCard_.setAttribute('id', carrer.id);
					carrerCard_.style.cursor = 'pointer';

					const information = document.createElement('div');
					information.classList.add('information');

					const title = document.createElement('h3');
					title.innerHTML = carrer.title[props.lang];
					const subtitle = document.createElement('p');
					subtitle.innerHTML = carrer.bio[props.lang];

					const options = document.createElement('options');
					const action = document.createElement('button');
					action.classList.add('shadow-button');
					action.innerHTML = 'Remove';
					action.onclick = () => {
						selectedCarrersContainer.removeChild(carrerCard_);
					}

					options.appendChild(action);


					information.appendChild(title);
					information.appendChild(subtitle);
					information.appendChild(options);

					carrerCard_.appendChild(information)

					selectedCarrersContainer.appendChild(carrerCard_);
				}
			}
		}


		const information = document.createElement('div');
		information.classList.add('information');

		const title = document.createElement('h3');
		title.innerHTML = carrer.title[props.lang];
		const subtitle = document.createElement('p');
		subtitle.innerHTML = carrer.bio[props.lang];

		information.appendChild(title);
		information.appendChild(subtitle);

		carrerCard.appendChild(information)

		allCarrersContainer.appendChild(carrerCard);
	}
	const confirmOption = document.querySelector('div#carrers-selection-dialog #options .main-button');
	confirmOption.onclick = () => {
		let currentCarrersCount = selectedCarrersContainer.childNodes.length;
		if (!(currentCarrersCount >= props.minimum && currentCarrersCount <= props.limit)) {
			status.innerHTML = `Select at least (${props.minimum}) carrers!`;
			return;
		}
		status.innerHTML = '';
		props.placementParent.innerHTML = selectedCarrersContainer.innerHTML;
		closeCarrersSelectionDialog();
	}

	document.querySelector('#carrers-selection-dialog').style.display = 'flex';
	document.querySelector('#carrers-selection-dialog-overlay').style.display = 'flex';
}

const closeCarrersSelectionDialog = () => {
	document.querySelector('#carrers-selection-dialog').style.display = 'none';
	document.querySelector('#carrers-selection-dialog-overlay').style.display = 'none';
}



const homeFragmentSave = async () => {
	const saveBtn = document.querySelector('.fragment#home #options .main-button');
	const cancelBtn = document.querySelector('.fragment#home #options .shadow-button');
	const articles = [], writers = [], carrers = [];
	const articlesCards = document.querySelectorAll('#featured-articles #articles .article-card');
	for (let artCar of articlesCards) articles.push(artCar.id);
	const writersCards = document.querySelectorAll('#writers #writers .writer-card');
	for (let wriCard of writersCards) writers.push(wriCard.id);
	const carrersCards = document.querySelectorAll('#carrers #carrers .carrer-card');
	for (let carCard of carrersCards) carrers.push(carCard.id);


	const payload = {
		page: 'home',
		featuredArticles: articles,
		adsData: adsData,
		writers: writers,
		carrers: carrers
	}

	try {
		saveBtn.innerHTML = 'Loading';
		saveBtn.style.pointerEvents = 'none';
		cancelBtn.style.pointerEvents = 'none';
		const res = await fetch(
			'./', {
			method: 'PATCH',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
			}
		}
		);

		if (res.status == 200) {
			window.open('./', '_self');
			return;
		}
		saveBtn.innerHTML = 'Failed';
		setTimeout(() => {
			saveBtn.innerHTML = 'Save';
			saveBtn.style.pointerEvents = 'all';
			cancelBtn.style.pointerEvents = 'all';
		}, 3000);
	} catch (e) {
		console.log(e);
		saveBtn.innerHTML = 'Failed';
		setTimeout(() => {
			saveBtn.innerHTML = 'Save';
			saveBtn.style.pointerEvents = 'all';
			cancelBtn.style.pointerEvents = 'all';
		}, 3000);
	}
}

const allTabs = [
	{
		id: 'a05685021712b94519ea3dade83cf7323cd9419b362af0cb',
		mode: 'link',
		text: 'home',
		redirect: '/'
	},
	{
		id: 'a05685021712b94519ea3dade83cf7323cd9419b362af1cb',
		mode: 'link',
		text: 'aboutUs',
		redirect: '/about/'
	},
	{
		id: 'a05685021712b94519ea3dade83cf7323cd9419b362af2cb',
		mode: 'link',
		text: 'articles',
		redirect: '/articles/'
	},
	{
		id: 'a05685021712b94519ea3dade83cf7323cd9419b362af3cb',
		mode: 'link',
		text: 'carrers',
		redirect: '/carrers/'
	},
	{
		id: 'a05685021712b94519ea3dade83cf7323cd9419b362af4cb',
		mode: 'link',
		text: 'categories',
		redirect: '/categories/'
	},
	{
		id: 'a05685021712b94519ea3dade83cf7323cd9419b362af5cb',
		mode: 'link',
		text: 'classification',
		redirect: '/classification/'
	},
];

let selectedTabs;
const initHeaderTabs = (categories, classifications) => {
	for (let category of categories) {
		allTabs.push({
			categoryId: category['id'],
			id: category['id'],
			mode: 'category'
		});
	}

	for (let classification of classifications) {
		allTabs.push({
			classificationId: classification['id'],
			id: classification['id'],
			mode: 'classification'
		});
	}
}

const initSelectedTabs = (tabs) => {
	selectedTabs = tabs;
}

const openHeaderTabsAddDialog = () => {
	const statusMsg = document.querySelector('#tabs-selection-dialog #status');
	const cardsContaienr = document.querySelector('#tabs-selection-dialog #body')
	const cards = document.querySelectorAll('#tabs-selection-dialog #body .header-tab-card')
	let selectableTabs = allTabs;
	for (let tab of selectableTabs) {
		let simmiler = selectedTabs.filter(tab_ => tab.id === tab_.id)[0];
		if (simmiler !== undefined) {
			for (let card of cards) {
				if (card.id == simmiler.id) {
					card.querySelector('.shadow-button').style.display = 'none'
					card.style.border = '2px var(--accentColor) solid';
				}
			}
		}
	}
	for (let card of cards) {
		card.querySelector('.shadow-button').onclick = () => {
			if (selectedTabs.length >= 8) {
				statusMsg.innerHTML = 'You have reached tabs limit!';
				return;
			}
			const tabData = selectableTabs.filter((tab_) => tab_.id == card.id);
			selectedTabs.push(tabData[0]);
			let clone = card.cloneNode(true);
			clone.childNodes[7].childNodes[1].innerHTML = 'Remove'
			clone.childNodes[7].childNodes[1].onclick = () => { deleteHeaderTab(card.id); }

			document.querySelector('.fragment#header #cards').appendChild(clone);
			closeHeaderTabsAddDialog();
		}
	}
	document.querySelector('#tabs-selection-dialog-overlay').style.display = 'flex';
	document.querySelector('#tabs-selection-dialog').style.display = 'flex';
}
const deleteHeaderTab = (tabId) => {
	let tab = selectedTabs.filter(tab => tab.id == tabId)[0];
	selectedTabs.splice(selectedTabs.indexOf(tab), 1);
	const allFragmentTabs_ = document.querySelectorAll(`.fragment#header .header-tab-card`);
	const allDialogTabs_ = document.querySelectorAll(`#tabs-selection-dialog #body .header-tab-card`);
	for (let tab of allFragmentTabs_) {
		if (tab.id == tabId) {
			tab.style.display = 'none';
		}
	}

	for (let tab of allDialogTabs_) {
		if (tab.id == tabId) {
			tab.style.border = 'none';
			tab.childNodes[7].childNodes[1].style.display = 'flex'
			tab.childNodes[7].childNodes[1].innerHTML = 'Select'
			tab.childNodes[7].childNodes[1].onclick = () => { deleteHeaderTab(card.id); }
		}
	}
}
const closeHeaderTabsAddDialog = () => {
	document.querySelector('#tabs-selection-dialog-overlay').style.display = 'none';
	document.querySelector('#tabs-selection-dialog').style.display = 'none';
}

const headerTabsFragmentSave = async () => {
	const saveBtn = document.querySelector('.fragment#header #options .main-button');
	const cancelBtn = document.querySelector('.fragment#header #options .shadow-button');
	const payload = {
		page: 'headerTabs',
		tabs: selectedTabs,
	}

	try {
		saveBtn.innerHTML = 'Loading';
		saveBtn.style.pointerEvents = 'none';
		cancelBtn.style.pointerEvents = 'none';
		const res = await fetch(
			'./', {
			method: 'PATCH',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
			}
		}
		);

		if (res.status == 200) {
			window.open('./', '_self');
			return;
		}
		saveBtn.innerHTML = 'Failed';
		setTimeout(() => {
			saveBtn.innerHTML = 'Save';
			saveBtn.style.pointerEvents = 'all';
			cancelBtn.style.pointerEvents = 'all';
		}, 3000);
	} catch (e) {
		console.log(e);
		saveBtn.innerHTML = 'Failed';
		setTimeout(() => {
			saveBtn.innerHTML = 'Save';
			saveBtn.style.pointerEvents = 'all';
			cancelBtn.style.pointerEvents = 'all';
		}, 3000);
	}
}