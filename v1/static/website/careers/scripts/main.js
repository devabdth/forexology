const selectTab= (element) => {
	const activeTab= document.querySelector('section#careers #header .fragment-controller.active');
	if (!(activeTab === undefined)) activeTab.classList.remove('active')

	const activeFragment= document.querySelector('section#careers #body .fragment.active');
	if (!(activeFragment === undefined)) activeFragment.classList.remove('active')

	element.classList.add('active');
	document.querySelector(`section#careers #body .fragment#${element.id}`).classList.add('active');
}