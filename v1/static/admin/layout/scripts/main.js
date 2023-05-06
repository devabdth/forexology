const manageFragments= (tab)=> {
	const id= tab.id;
	const fragment= document.querySelector(`.fragment#${id}`);
	if (fragment.classList.contains('active')) {
		return;
	}

	tab.classList.add('active');
	fragment.classList.add('active');

	const activeFragmnet= document.querySelector('.fragment.active');
	activeFragmnet.classList.remove('active');

	const activeTab= document.querySelector('.fragment-controller.active');
	activeTab.classList.remove('active');
}

const toggleCollapsable= (element)=> {
	element.parentElement.classList.toggle('active');
}


const openArticleSelectorDialog= (cb) => {
	
}