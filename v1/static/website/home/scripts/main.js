let currentSelectedArticle;

const initializeFragments = (articles, lang, categories) => {
	const fragmentsParent = document.getElementById('featured-fragments');
	currentSelectedArticle = 0;

	// Initialize Fragments
	for (let article of articles) {
		const articleCard = document.createElement('div');
		articleCard.classList.add('fragment');
		articleCard.setAttribute('id', `fragment-${articles.indexOf(article)}`);
		articleCard.style.backgroundImage = `url(/assets/articles/covers/${article['id']})`;
		articleCard.onclick= ()=> {
			window.open(`/articles/${article['id']}`, '_self');
		}

		const overlay = document.createElement('div');
		overlay.classList.add('overlay');

		const labellingSection = document.createElement('div');
		labellingSection.classList.add('labelling');

		const dateLabel = document.createElement('p'), categoryLabel = document.createElement('p');
		categoryLabel.classList.add('category');
		let category= categories.filter(cat=> cat['id'] == article['category'])[0];
		categoryLabel.innerText = category['name'][lang];
		labellingSection.appendChild(categoryLabel);

		dateLabel.classList.add('date');
		const date = Date(article['published_in']);
		dateLabel.innerText = `${date.split(' ')[1]} ${date.split(' ')[2]}, ${date.split(' ')[3]}`;
		labellingSection.appendChild(dateLabel);



		const title = document.createElement('div');
		title.classList.add('title');

		const h3 = document.createElement('h3');
		h3.innerHTML = article['title'][lang];

		const p = document.createElement('p');
		p.innerHTML = article['short_brief'][lang];

		title.appendChild(h3);
		title.appendChild(p);

		articleCard.appendChild(overlay);
		articleCard.appendChild(labellingSection);
		articleCard.appendChild(title);

		fragmentsParent.appendChild(articleCard);
	}

	// Initialize Controllers
	const leftController = document.getElementById('left-controller');
	leftController.onclick = () => {
		if (currentSelectedArticle === 0) return;
		selectFragmentByTab(currentSelectedArticle - 1);
	}
	const rightController = document.getElementById('right-controller');
	rightController.onclick = () => {
		if (currentSelectedArticle === 4) return;
		selectFragmentByTab(currentSelectedArticle + 1);
	}
	const tabs = document.querySelector('#featured-fragments .tabs');

	for (let i = 0; i !== articles.length; i++) {
		const tab = document.createElement('div');
		tab.classList.add('tab');
		tab.setAttribute('id', `fragment-tab-${i}`)
		if (i == 0) {
			tab.classList.add('active');
		}

		tab.onclick = () => {
			selectFragmentByTab(i);
		}
		tabs.appendChild(tab);
	}
	selectFragmentByTab(currentSelectedArticle);

}


const selectFragmentByTab = (i) => {
	const leftController = document.getElementById('left-controller');
	const rightController = document.getElementById('right-controller');
	if (i === 0) {
		leftController.style.transform = 'scale(0)';
	} else {
		leftController.style.transform = 'scale(1)';
	}
	if (i === 4) {
		rightController.style.transform = 'scale(0)';
	} else {
		rightController.style.transform = 'scale(1)';
	}
	document.getElementById(`fragment-tab-${currentSelectedArticle}`).classList.remove('active');
	document.getElementById(`fragment-${currentSelectedArticle}`).classList.remove('active');
	document.getElementById(`fragment-${i}`).classList.add('active');
	document.getElementById(`fragment-tab-${i}`).classList.add('active');
	currentSelectedArticle = i;
	showArticleByIndex(i);
}

const showArticleByIndex = (i) => { }

let currentSelectedCategoryFragment= -1;
const initializeCategoriesFragments= (categories)=> {
	categories= categories.map(cat=> cat.id);
	let categoriesTabs= categories.map(catId=> document.querySelector(`.articles-category-tab#${catId}`))
	const allTab= document.querySelector('.articles-category-tab#all');
	allTab.onclick= ()=> {
		if (currentSelectedCategoryFragment == -1) return;

		const activeFragment= document.querySelector(`.articles-category-fragment#${categories[currentSelectedCategoryFragment]}`);
		activeFragment.classList.remove('active');

		const allFragment= document.querySelector(`.articles-category-fragment#all-fragment`);
		allFragment.classList.add('active');
			
		const activeTab= document.querySelector('.articles-category-tab.active');
		activeTab.classList.remove('active');

		allTab.classList.add('active');

		currentSelectedCategoryFragment= -1
	}

	for (let i in categoriesTabs) {
		categoriesTabs[i].onclick= ()=> {
			if (currentSelectedCategoryFragment === i) return;

			const activeFragment= document.querySelector(`.articles-category-fragment#${currentSelectedCategoryFragment==-1? 'all-fragment': categories[currentSelectedCategoryFragment]}`);
			activeFragment.classList.remove('active');

			const currentFragment= document.querySelector(`.articles-category-fragment#${categories[i]}`);
			currentFragment.classList.add('active');

			const activeTab= document.querySelector('.articles-category-tab.active');
			activeTab.classList.remove('active');

			categoriesTabs[i].classList.add('active');
			currentSelectedCategoryFragment= i;

		}
	}
}


const initializeAdSpace= async (container, ad, lang)=> {
	container.onclick= ()=> {
		window.open(ad['redirect']);
	}

	if (ad['background_mode'] == 'IMAGE') {
		container.style.backgroundImage= `url(/assets/ads/${ad['id']})`;
	}
	else if (ad['background_mode'] == 'COLOR') {
		container.style.backgroundColor= ad['background'];

	}

	if (ad['title'] !== "None" && ad['subtitle'] !== "None" && ad['bio'] !== "None") {
		const snippet= document.createElement('p');
		snippet.classList.add('snippet');
		snippet.innerHTML= lang == 'EN'? '> AD': '> إعلان';

		const overlay= document.createElement('div');
		overlay.setAttribute('id','overlay');
		overlay.style.background= 'linear-gradient(180deg, transparent 10%, rgba(0, 0, 0, 0.15) 100%)';

		const subtitle= document.createElement('p');
		subtitle.classList.add('subtitle');
		subtitle.innerHTML= ad['subtitle'][lang];

		const title= document.createElement('h5');
		title.classList.add('title');
		title.innerHTML= ad['title'][lang];

		const bio= document.createElement('p');
		bio.classList.add('bio');
		bio.innerHTML= ad['bio'][lang];
		overlay.appendChild(snippet);
		overlay.appendChild(subtitle);
		overlay.appendChild(title);
		overlay.appendChild(bio);

		container.appendChild(overlay);
	}

}