let ads, articles, writers, careers, selectedArticles, selectedAd;
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

const initCarreres = (careers_) => {
	careers = careers_;
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
	subtitle.innerHTML = article['short_brief']['EN'].length < 65 ? article['short_brief']['EN'] : article['short_brief']['EN'].substring(0, 65);

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
	if (props.initiallySelectedAd !== undefined) {
		const ad = document.createElement('div');
		selection.appendChild(ad);
		ad.classList.add('ad-space');
		selectedAd = props.initiallySelectedAd.id;
		initializeAdSpace(ad, props.initiallySelectedAd, 'EN');
	}

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
		if (props.customListener !== undefined) {
			props.customListener(selectedAd);
		} else {
			adsData[props.placementParent.classList[1]] = selectedAd;
		}
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
		subtitle.innerHTML = writer.bio[props.lang].length > 65 ? `${writer.bio[props.lang].substring(0, 65)}...` : writer.bio[props.lang];

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
				let existWriterCard;
				const writersCards = document.querySelectorAll(`#writers-selection-dialog #selected-writers .writer-card`)
				for (let writerCard of writersCards) {
					if (writerCard.id == writer.id) {
						existWriterCard = writerCard;
					}
				}
				if (existWriterCard == undefined) {
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
					subtitle.innerHTML = writer.bio[props.lang].length > 65 ? `${writer.bio[props.lang].substring(0, 65)}...` : writer.bio[props.lang];

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
		subtitle.innerHTML = writer.bio[props.lang].length > 65 ? `${writer.bio[props.lang].substring(0, 65)}...`: writer.bio[props.lang];

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

const openCareersSelectionDialog = (props) => {
	const selectedCareersContainer = document.querySelector('#careers-selection-dialog #body #selected-careers');
	selectedCareersContainer.innerHTML = '';
	const allCareersContainer = document.querySelector('#careers-selection-dialog #body #all-careers');
	allCareersContainer.innerHTML = '';
	const status = document.querySelector('#careers-selection-dialog #status');

	for (let carrer of props.initialillySelectedCareers) {
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
			selectedCareersContainer.removeChild(carrerCard);
		}

		options.appendChild(action);


		information.appendChild(title);
		information.appendChild(subtitle);
		information.appendChild(options);

		carrerCard.appendChild(information)

		selectedCareersContainer.appendChild(carrerCard);
	}

	for (let carrer of careers) {
		const carrerCard = document.createElement('div');
		carrerCard.classList.add('carrer-card');
		carrerCard.setAttribute('id', carrer.id);
		carrerCard.style.cursor = 'pointer';
		carrerCard.onclick = () => {
			if (selectedCareersContainer.childNodes.length < props.limit) {
				let _card;
				try {
					const cards = document.querySelectorAll(`#careers-selection-dialog #selected-careers .carrer-card`);
					for (let card of cards) {
						if (card.id == carrer.id) {
							_card = card;
						}
					}
				} catch (e) {
					console.log(e)
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
						selectedCareersContainer.removeChild(carrerCard_);
					}

					options.appendChild(action);


					information.appendChild(title);
					information.appendChild(subtitle);
					information.appendChild(options);

					carrerCard_.appendChild(information)

					selectedCareersContainer.appendChild(carrerCard_);
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

		allCareersContainer.appendChild(carrerCard);
	}
	const confirmOption = document.querySelector('div#careers-selection-dialog #options .main-button');
	confirmOption.onclick = () => {
		let currentCareersCount = selectedCareersContainer.childNodes.length;
		if (!(currentCareersCount >= props.minimum && currentCareersCount <= props.limit)) {
			status.innerHTML = `Select at least (${props.minimum}) careers!`;
			return;
		}
		status.innerHTML = '';
		props.placementParent.innerHTML = selectedCareersContainer.innerHTML;
		closeCareersSelectionDialog();
	}

	document.querySelector('#careers-selection-dialog').style.display = 'flex';
	document.querySelector('#careers-selection-dialog-overlay').style.display = 'flex';
}

const closeCareersSelectionDialog = () => {
	document.querySelector('#careers-selection-dialog').style.display = 'none';
	document.querySelector('#careers-selection-dialog-overlay').style.display = 'none';
}



const homeFragmentSave = async () => {
	const saveBtn = document.querySelector('.fragment#home #options .main-button');
	const cancelBtn = document.querySelector('.fragment#home #options .shadow-button');
	const articles = [], writers = [], careers = [];
	const articlesCards = document.querySelectorAll('#featured-articles #articles .article-card');
	for (let artCar of articlesCards) articles.push(artCar.id);
	const writersCards = document.querySelectorAll('#writers #writers .writer-card');
	for (let wriCard of writersCards) writers.push(wriCard.id);
	const careersCards = document.querySelectorAll('#careers #careers .carrer-card');
	for (let carCard of careersCards) careers.push(carCard.id);


	const payload = {
		page: 'home',
		featuredArticles: articles,
		adsData: adsData,
		writers: writers,
		careers: careers
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
		id: 'a05685021712b94519ea3dade83cf7323cd9419b362af6cb',
		mode: 'link',
		text: 'agenda',
		redirect: '/agenda/'
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
		text: 'careers',
		redirect: '/careers/'
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
	console.log(allTabs)
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
			if (selectedTabs.length >= 12) {
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


const closeArticleAdsPicker = () => {
	document.querySelector('.form-dialog#article-ads-picker-dialog').style.display = 'none';
	document.querySelector('.form-dialog-overlay#article-ads-picker-dialog-overlay').style.display = 'none';
}

const openArticleAdsPicker = (article_) => {
	let article = article_;
	const dialogBody = document.querySelector('.form-dialog#article-ads-picker-dialog .body');
	dialogBody.innerHTML = '';
	const statusMsg = document.querySelector('.form-dialog#article-ads-picker-dialog .options p#status-msg')

	// Init Cover
	const coverTile = document.createElement('div');
	coverTile.classList.add('tile');

	coverTile.innerHTML = `
	<h3>Cover</h3>
	`;

	const covreTileAdSpace = document.createElement('div');
	covreTileAdSpace.classList.add('ad-space');
	covreTileAdSpace.style.backgroundPosition = 'center';
	covreTileAdSpace.style.backgroundRepeat = 'no-repeat';
	covreTileAdSpace.style.backgroundSize = 'cover';
	covreTileAdSpace.setAttribute('id', '-1');
	coverTile.appendChild(covreTileAdSpace);

	coverTile.innerHTML += `
	<div class="options">
		<button class="shadow-button" id="remove" style="color: red">Remove</button>
		<button class="shadow-button" id="replace">Replace</button>
		<button class="shadow-button" id="select">Select</button>
	</div>
	`;

	const coverSelectBtn = coverTile.querySelector('div.options .shadow-button#select');
	const coverRemoveBtn = coverTile.querySelector('div.options .shadow-button#remove');
	const coverReplaceBtn = coverTile.querySelector('div.options .shadow-button#replace');

	coverRemoveBtn.onclick = () => {
		coverTile.querySelector('div.ad-space').innerHTML = '';
		coverTile.querySelector('div.ad-space').style.backgroundImage = 'none';
		coverTile.querySelector('div.ad-space').style.backgroundColor = 'none';
		coverRemoveBtn.style.display = 'none';
		coverReplaceBtn.style.display = 'none';
		coverSelectBtn.style.display = 'flex';
		article.attached_ad = '';
		statusMsg.innerHTML = 'Press submit to complete removing ad!';
		setTimeout(() => { statusMsg.innerHTML = ''; }, 5000);
	}

	coverReplaceBtn.onclick = () => {
		openADSelectionDialog({
			initiallySelectedAd: coverAdData[0],
			placementParent: coverTile.querySelector('div.ad-space'),
			customListener: (selectedAdId) => {
				if (selectedAdId != undefined) {
					article.attached_ad = selectedAdId;
					coverSelectBtn.style.display = 'none';
					coverRemoveBtn.style.display = 'flex';
					coverReplaceBtn.style.display = 'flex';
				}
			}
		})
	}

	coverSelectBtn.onclick = () => {
		openADSelectionDialog({
			initiallySelectedAd: undefined,
			placementParent: coverTile.querySelector('div.ad-space'),
			customListener: (selectedAdId) => {
				if (selectedAdId != undefined) {
					article.attached_ad = selectedAdId;
					coverSelectBtn.style.display = 'none';
					coverRemoveBtn.style.display = 'flex';
					coverReplaceBtn.style.display = 'flex';
				}
			}
		})
	}

	const coverAdData = ads.filter(ad => ad.id == article.attached_ad);
	if (!(coverAdData == undefined || coverAdData.length == 0)) {
		coverSelectBtn.style.display = 'none';
		initializeAdSpace(coverTile.querySelector('div.ad-space'), coverAdData[0], 'EN')
	} else {
		coverRemoveBtn.style.display = 'none';
		coverReplaceBtn.style.display = 'none';

	}

	dialogBody.appendChild(coverTile);


	// Init Sections
	for (let section of article.sections) {
		const sectionTile = document.createElement('div');
		sectionTile.classList.add('tile');

		sectionTile.innerHTML = `
		<h3>Section ${article.sections.indexOf(section)}</h3>
		`;

		const covreTileAdSpace = document.createElement('div');
		covreTileAdSpace.classList.add('ad-space');
		covreTileAdSpace.style.backgroundPosition = 'center';
		covreTileAdSpace.style.backgroundRepeat = 'no-repeat';
		covreTileAdSpace.style.backgroundSize = 'cover';
		covreTileAdSpace.setAttribute('id', '-1');
		sectionTile.appendChild(covreTileAdSpace);

		sectionTile.innerHTML += `
		<div class="options">
			<button class="shadow-button" id="remove" style="color: red">Remove</button>
			<button class="shadow-button" id="replace">Replace</button>
			<button class="shadow-button" id="select">Select</button>
		</div>
		`;

		const sectionSelectBtn = sectionTile.querySelector('div.options .shadow-button#select');
		const sectionRemoveBtn = sectionTile.querySelector('div.options .shadow-button#remove');
		const sectionReplaceBtn = sectionTile.querySelector('div.options .shadow-button#replace');

		sectionRemoveBtn.onclick = () => {
			sectionTile.querySelector('div.ad-space').innerHTML = '';
			sectionTile.querySelector('div.ad-space').style.backgroundImage = 'none';
			sectionTile.querySelector('div.ad-space').style.backgroundColor = 'none';
			sectionRemoveBtn.style.display = 'none';
			sectionReplaceBtn.style.display = 'none';
			sectionSelectBtn.style.display = 'flex';
			section.attached_ad_id = '';
			statusMsg.innerHTML = 'Press submit to complete removing ad!';
			setTimeout(() => { statusMsg.innerHTML = ''; }, 5000);
		}

		sectionReplaceBtn.onclick = () => {
			openADSelectionDialog({
				initiallySelectedAd: sectionAdData[0],
				placementParent: sectionTile.querySelector('div.ad-space'),
				customListener: (selectedAdId) => {
					if (selectedAdId != undefined) {
						section.attached_ad_id = selectedAdId;
						sectionSelectBtn.style.display = 'none';
						sectionRemoveBtn.style.display = 'flex';
						sectionReplaceBtn.style.display = 'flex';
					}
				}
			})
		}

		sectionSelectBtn.onclick = () => {
			openADSelectionDialog({
				initiallySelectedAd: undefined,
				placementParent: sectionTile.querySelector('div.ad-space'),
				customListener: (selectedAdId) => {
					if (selectedAdId != undefined) {
						section.attached_ad_id = selectedAdId;
						sectionSelectBtn.style.display = 'none';
						sectionRemoveBtn.style.display = 'flex';
						sectionReplaceBtn.style.display = 'flex';
					}
				}
			})
		}

		const sectionAdData = ads.filter(ad => ad.id == section.attached_ad_id);
		if (!(sectionAdData == undefined || sectionAdData.length == 0)) {
			sectionSelectBtn.style.display = 'none';
			initializeAdSpace(sectionTile.querySelector('div.ad-space'), sectionAdData[0], 'EN')
		} else {
			sectionRemoveBtn.style.display = 'none';
			sectionReplaceBtn.style.display = 'none';

		}

		dialogBody.appendChild(sectionTile);

	}


	document.querySelector('.form-dialog#article-ads-picker-dialog .options .main-button').onclick = () => { saveArticleAds(article) };
	document.querySelector('.form-dialog#article-ads-picker-dialog').style.display = 'flex';
	document.querySelector('.form-dialog-overlay#article-ads-picker-dialog-overlay').style.display = 'flex';
}


const saveArticleAds = async (article) => {
	const submit = document.querySelector('.form-dialog#article-ads-picker-dialog .options .main-button');
	const cancel = document.querySelector('.form-dialog#article-ads-picker-dialog .options .shadow-button');
	const statusMsg = document.querySelector('.form-dialog#article-ads-picker-dialog .options p#status-msg');

	try {
		statusMsg.innerHTML = 'Loading...';
		submit.style.pointerEvents = 'all';
		cancel.style.pointerEvents = 'all';


		const res = await fetch('./articlesAds/', {
			method: 'PATCH',
			body: JSON.stringify(article),
			headers: {
				'Content-Type': 'application/json',
			}
		});

		if (res.status == 200) {
			window.open('./', '_self');
			return;
		}

		submit.innerHTML = 'Failed';
		statusMsg.innerHTML = 'Try again later!';
		setTimeout(() => {
			statusMsg.innerHTML = '';
			submit.innerHTML = 'Submit';
			submit.style.pointerEvents = 'all';
			cancel.style.pointerEvents = 'all';
		}, 3000);
	} catch (e) {
		console.log(e);
		submit.innerHTML = 'Failed';
		statusMsg.innerHTML = 'Try again later!';
		setTimeout(() => {
			statusMsg.innerHTML = '';
			submit.innerHTML = 'Submit';
			submit.style.pointerEvents = 'all';
			cancel.style.pointerEvents = 'all';
		}, 3000);

	}

}