let changeHeaderLogoOnScroll;
const toggleTheme= async (mode)=> {
	switch(mode) {
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

const openSearchDialog= ()=> {
	const overlay= document.getElementById('search-dialog-overlay');
	const dialog= document.getElementById('search-dialog');
	overlay.style.display= 'flex';
	setTimeout(()=> {
		overlay.style.backgroundColor= 'rgba(0, 0, 0, 0.5)';
	}, 100);

	dialog.style.transform= 'translate(-50%, -50%)';

}

const closeSearchDialog= ()=> {
	const overlay= document.getElementById('search-dialog-overlay');
	const dialog= document.getElementById('search-dialog');
		overlay.style.backgroundColor= 'transparent';
		setTimeout(()=> {
			overlay.style.display= 'none';
		}, 100);
	dialog.style.transform= 'translate(-50%, -250%)';

}

const openLoginDialog= ()=> {
	const overlay= document.getElementById('login-dialog-overlay');
	const dialog= document.getElementById('login-dialog');
	overlay.style.display= 'flex';
	setTimeout(()=> {
		overlay.style.backgroundColor= 'rgba(0, 0, 0, 0.5)';
	}, 100);

	dialog.style.transform= 'translate(-50%, -50%)';

}

const closeLoginDialog= ()=> {
	const overlay= document.getElementById('login-dialog-overlay');
	const dialog= document.getElementById('login-dialog');
		overlay.style.backgroundColor= 'transparent';
		setTimeout(()=> {
			overlay.style.display= 'none';
		}, 100);
	dialog.style.transform= 'translate(-50%, -250%)';

}

const loginDialogSubmit= ()=> {
	console.log('Found');
}

window.addEventListener('scroll', ()=> {
	if (window.scrollY >= 50) {
		document.querySelector('header').style.backgroundColor= 'var(--secondaryColor)';
		if(changeHeaderLogoOnScroll) document.querySelector('header #logo').style.backgroundImage= 'var(--logo-256)';
		return;
	}
	document.querySelector('header').style.backgroundColor= 'transparent';
	if(changeHeaderLogoOnScroll) document.querySelector('header #logo').style.backgroundImage= 'var(--logo-256-white)';
})
