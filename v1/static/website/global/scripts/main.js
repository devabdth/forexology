const headerTabsConfig = () => {
	const tabs = document.querySelectorAll('header div#tabs a');
	for (let tab of tabs) {
		if (tab.href == window.location.href) {
			tab.classList.add('active');
		}
	}

	const drawerTabs = document.querySelectorAll('.drawer-tab');
	for (let tab of drawerTabs) {
		if (tab.href === window.location.href) {
			tab.classList.add('active');
		}
	}
}

if (window.addEventListener) window.addEventListener('load', () => {
	headerTabsConfig();
});

else if (window.attachEvent) window.attachEvent('load', () => {
	headerTabsConfig();
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
	dialog.style.transform = 'translate(-50%, -350%)';

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
	dialog.style.transform = 'translate(-50%, -350%)';

}

const loginDialogSubmit = () => {
	console.log('Found');
}

window.addEventListener('scroll', () => {
	if (window.scrollY >= 50) {
		document.querySelector('header #intro-row').style.display = 'none';
		document.querySelectorAll('header #tabs .main-icon-button').forEach(element => { element.classList.remove('collabsed') })
		document.querySelectorAll('header #tabs button.shadow-icon-button').forEach(element => { element.style.display = 'flex'; })
		if (window.innerWidth > 1024) {
			document.querySelector('header #tabs #logo').style.width = '8vw';
		} else if (window.innerWidth > 650 && window.innerWidth < 1024) {
			document.querySelector('header #tabs #logo').style.width = '12vw';
		} else if (window.innerWidth < 650) {
			document.querySelector('header #tabs #logo').style.width = '16vw';

		}
		document.querySelector('header').style.backgroundColor = 'var(--secondaryColor)';
		return;
	}
	document.querySelectorAll('header #tabs .main-icon-button').forEach(element => { element.classList.add('collabsed') })
	document.querySelectorAll('header #tabs button.shadow-icon-button').forEach(element => { element.style.display = 'none'; })
	document.querySelector('header #tabs #logo').style.width = '0';
	document.querySelector('header #intro-row').style.display = 'flex';
	document.querySelector('header').style.backgroundColor = 'transparent';
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

const initDrawer = (lang) => {
	document.querySelector('#drawer-overlay').onclick = toggleDrawer;
	switch (lang) {
		case "AR":
			document.querySelector('#drawer-menu').classList.add('right');
			document.querySelector('#drawer-overlay').classList.add('right');
			break;
		default:
			document.querySelector('#drawer-menu').classList.add('left');
			document.querySelector('#drawer-overlay').classList.add('left');
			break;
	}
}

const toggleDrawer = () => {
	document.querySelector('#drawer-menu').classList.toggle('active');
	document.querySelector('#drawer-overlay').classList.toggle('active');
}

const toggleClassificationRow = (element) => {
	element.querySelector('.header .icon').classList.toggle('active');
	console.log(element.querySelector('.header .icon').classList)
	element.querySelector('.body').classList.toggle('active');
}