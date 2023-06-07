const headerTabsConfig = () => {
	const tabs = document.querySelectorAll('header div#tabs a');
	for (let tab of tabs) {
		if (tab.href == window.location.href) {
			tab.classList.add('active');
			return;
		}
	}
}

const openNewsBottomSheet= ()=> {
	document.querySelector('#news-bottom-sheet').classList.add('active');
	document.querySelector('#news-bottom-sheet #header div').innerHTML= '-';
	document.querySelector('#news-bottom-sheet #header div').onclick= closeNewsBottomSheet;
}

const closeNewsBottomSheet= ()=> {
	document.querySelector('#news-bottom-sheet').classList.remove('active');
	document.querySelector('#news-bottom-sheet #header div').innerHTML= '+';
	document.querySelector('#news-bottom-sheet #header div').onclick= openNewsBottomSheet;
}

if (window.addEventListener) window.addEventListener('load', ()=> {
	headerTabsConfig();
	openNewsBottomSheet();
});

else if (window.attachEvent) window.attachEvent('load', ()=> {
	headerTabsConfig();
	openNewsBottomSheet();
});

let changeHeaderLogoOnScroll;
const toggleTheme = async (mode) => {
	switch (mode) {
		case 'DARk':
		default:
			await fetch('/config/?MODE=LIGHT', { method: 'PATCH' });
			break;
		case 'LIGHT':
			await fetch('/config/?MODE=DARK', { method: 'PATCH' });
			break;
	}

	window.open('./', '_self');
}

const toggleLang = async (lang) => {
	switch (lang) {
		case 'EN':
		default:
			await fetch('/config/?LANG=AR', { method: 'PATCH' });
			break;
		case 'AR':
			await fetch('/config/?LANG=EN', { method: 'PATCH' });
			break;
	}
	window.open('./', '_self');
}

const openSearchDialog = () => {
	const overlay = document.getElementById('search-dialog-overlay');
	const dialog = document.getElementById('search-dialog');
	overlay.style.display = 'flex';
	setTimeout(() => {
		overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
	}, 100);

	dialog.style.transform = 'translate(-50%, -50%)';

}

const closeSearchDialog = () => {
	const overlay = document.getElementById('search-dialog-overlay');
	const dialog = document.getElementById('search-dialog');
	overlay.style.backgroundColor = 'transparent';
	setTimeout(() => {
		overlay.style.display = 'none';
	}, 100);
	dialog.style.transform = 'translate(-50%, -250%)';

}

const openLoginDialog = () => {
	const overlay = document.getElementById('login-dialog-overlay');
	const dialog = document.getElementById('login-dialog');
	overlay.style.display = 'flex';
	setTimeout(() => {
		overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
	}, 100);

	dialog.style.transform = 'translate(-50%, -50%)';

}

const closeLoginDialog = () => {
	const overlay = document.getElementById('login-dialog-overlay');
	const dialog = document.getElementById('login-dialog');
	overlay.style.backgroundColor = 'transparent';
	setTimeout(() => {
		overlay.style.display = 'none';
	}, 100);
	dialog.style.transform = 'translate(-50%, -250%)';

}

const loginDialogSubmit = () => {
	console.log('Found');
}

window.addEventListener('scroll', () => {
	if (window.scrollY >= 50) {
		document.querySelector('header').style.backgroundColor = 'var(--secondaryColor)';
		if (changeHeaderLogoOnScroll) document.querySelector('header #logo').style.backgroundImage = 'var(--logo-256)';
		return;
	}
	document.querySelector('header').style.backgroundColor = 'transparent';
	if (changeHeaderLogoOnScroll) document.querySelector('header #logo').style.backgroundImage = 'var(--logo-256-white)';
})

const adminLogout = async () => {
	const res = await fetch('/webapp/adminstration/logout/');
	if (res.status == 200) window.open('./', '_self');
}

const writerLogout = async () => {
	const res = await fetch('/webapp/publish/logout/');
	if (res.status == 200) window.open('./', '_self');
}

const initializeAdSpace = async (container, ad, lang, customCallback) => {
	container.onclick = () => {
		if (customCallback === undefined) window.open(ad['redirect']);
		else customCallback();
	}

	if (ad['background_mode'] == 'BG') {
		container.style.backgroundImage = `url(/assets/ads/covers/${ad['id']}/)`;
	}
	else if (ad['background_mode'] == 'COLOR') {
		container.style.backgroundColor = ad['background'];

	}

	if (ad['title'] !== "None" || ad['subtitle'] !== "None" || ad['bio'] !== "None") {
		const snippet = document.createElement('p');
		snippet.classList.add('snippet');
		snippet.innerHTML = lang == 'EN' ? '> AD' : '> إعلان';

		const overlay = document.createElement('div');
		overlay.setAttribute('id', 'overlay');
		overlay.style.background = 'linear-gradient(180deg, transparent 10%, rgba(0, 0, 0, 0.15) 100%)';
		overlay.appendChild(snippet);

		if (ad['subtitle'] != "None") {
			const subtitle = document.createElement('p');
			subtitle.classList.add('subtitle');
			subtitle.innerHTML = ad['subtitle'][lang];
			overlay.appendChild(subtitle);
		}

		if (ad['title'] != "None") {
			const title = document.createElement('p');
			title.classList.add('title');
			title.innerHTML = ad['title'][lang];
			overlay.appendChild(title);
			overlay.appendChild(title);
		}

		if (ad['bio'] != "None") {
			const bio = document.createElement('p');
			bio.classList.add('bio');
			bio.innerHTML = ad['bio'][lang];
			overlay.appendChild(bio);
			overlay.appendChild(bio);
		}


		container.appendChild(overlay);
	}
}