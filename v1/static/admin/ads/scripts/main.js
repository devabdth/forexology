let currentBGMode, currentBGImage, currentBG, bgImage;
const initializePreviewAdSpace = async (ad) => {
	const verticalContainer = document.querySelector('#vertical-preview');
	verticalContainer.innerHTML = '';
	const horizontalContainer = document.querySelector('#horizontal-preview');
	horizontalContainer.innerHTML = '';
	if (currentBGMode == 'COLOR') {
		horizontalContainer.style.background = currentBG;
		verticalContainer.style.background = currentBG;
	}

	if (currentBGMode == 'BG') {
		horizontalContainer.style.backgroundImage = `url(${currentBG})`;
		horizontalContainer.style.backgroundSize = 'cover';
		horizontalContainer.style.backgroundPosition = 'center';
		horizontalContainer.style.backgroundRepeat = 'no-repeat';
		verticalContainer.style.backgroundImage = `url(${currentBG})`;
		verticalContainer.style.backgroundSize = 'cover';
		verticalContainer.style.backgroundPosition = 'center';
		verticalContainer.style.backgroundRepeat = 'no-repeat';
	}

	if (ad['title'] !== "None" || ad['subtitle'] !== "None" || ad['bio'] !== "None") {
		const verticalOverlay = document.createElement('div');
		verticalOverlay.setAttribute('id', 'overlay');
		verticalOverlay.style.background = 'linear-gradient(180deg, transparent 10%, rgba(0, 0, 0, 0.15) 100%)';

		const horizontalOverlay = document.createElement('div');
		horizontalOverlay.setAttribute('id', 'overlay');

		horizontalOverlay.style.background = 'linear-gradient(180deg, transparent 10%, rgba(0, 0, 0, 0.15) 100%)';
		const verticalSnippet = document.createElement('p');
		verticalSnippet.classList.add('snippet');
		verticalSnippet.innerHTML = '> AD';

		const horizontalSnippet = document.createElement('p');
		horizontalSnippet.classList.add('snippet');
		horizontalSnippet.innerHTML = '> AD';

		verticalOverlay.appendChild(verticalSnippet);
		horizontalOverlay.appendChild(horizontalSnippet);

		if (ad['subtitle'] !== "None") {
			const verticalSubtitle = document.createElement('p');
			verticalSubtitle.classList.add('subtitle');
			verticalSubtitle.innerHTML = ad.subtitle['EN'];

			const horizontalSubtitle = document.createElement('p');
			horizontalSubtitle.classList.add('subtitle');
			horizontalSubtitle.innerHTML = ad.subtitle['EN'];

			verticalOverlay.appendChild(verticalSubtitle);
			horizontalOverlay.appendChild(horizontalSubtitle);
		}

		if (ad['title'] !== "None") {
			const verticalTitle = document.createElement('h5');
			verticalTitle.classList.add('title');
			verticalTitle.innerHTML = ad.title['EN'];

			const horizontalTitle = document.createElement('h5');
			horizontalTitle.classList.add('title');
			horizontalTitle.innerHTML = ad.title['EN'];

			verticalOverlay.appendChild(verticalTitle);
			horizontalOverlay.appendChild(horizontalTitle);
		}

		if (ad['bio'] !== "None") {
			const verticalBio = document.createElement('p');
			verticalBio.classList.add('bio');
			verticalBio.innerHTML = ad.bio['EN'];

			const horizontalBio = document.createElement('p');
			horizontalBio.classList.add('bio');
			horizontalBio.innerHTML = ad.bio['EN'];

			verticalOverlay.appendChild(verticalBio);
			horizontalOverlay.appendChild(horizontalBio);
		}
		horizontalContainer.appendChild(horizontalOverlay);
		verticalContainer.appendChild(verticalOverlay);
	}
}

const openAdsFormDialog = (mode, ad) => {
	const title = document.querySelector('.form-dialog#ads-form .header h2');
	const clear = document.querySelector('.form-dialog#ads-form .options .shadow-button#clear');
	const deleteBtn = document.querySelector('.form-dialog#ads-form .options .shadow-button#delete');
	const submit = document.querySelector('.form-dialog#ads-form .options .main-button');
	const statusMsg = document.querySelector('.form-dialog#ads-form .options p#status-msg');
	const enSubtitle = document.querySelector('.form-dialog#ads-form .body #form .single-line-field#en-subtitle');
	enSubtitle.onchange = (v) => {
		const validation = adsFormValidator();
		if (validation === undefined) return;
		initializePreviewAdSpace(validation);
	}

	const arSubtitle = document.querySelector('.form-dialog#ads-form .body #form .single-line-field#ar-subtitle');
	arSubtitle.onchange = (v) => {
		const validation = adsFormValidator();
		if (validation === undefined) return;
		initializePreviewAdSpace(validation);
	}
	const enTitle = document.querySelector('.form-dialog#ads-form .body #form .single-line-field#en-title');
	enTitle.onchange = (v) => {
		const validation = adsFormValidator();
		if (validation === undefined) return;
		initializePreviewAdSpace(validation);
	}
	const arTitle = document.querySelector('.form-dialog#ads-form .body #form .single-line-field#ar-title');
	arTitle.onchange = (v) => {
		const validation = adsFormValidator();
		if (validation === undefined) return;
		initializePreviewAdSpace(validation);
	}
	const enBio = document.querySelector('.form-dialog#ads-form .body #form .mutli-line-field#en-bio');
	enBio.onchange = (v) => {
		const validation = adsFormValidator();
		if (validation === undefined) return;
		initializePreviewAdSpace(validation);
	}
	const arBio = document.querySelector('.form-dialog#ads-form .body #form .mutli-line-field#ar-bio');
	arBio.onchange = (v) => {
		const validation = adsFormValidator();
		if (validation === undefined) return;
		initializePreviewAdSpace(validation);
	}
	const redirect = document.querySelector('.form-dialog#ads-form .body #form .single-line-field#redirect');
	redirect.onchange = (v) => {
		const validation = adsFormValidator();
		if (validation === undefined) return;
		initializePreviewAdSpace(validation);
	}
	const bgFragments = document.querySelectorAll('.form-dialog#ads-form #background-mode .background-fragment');
	for (let bgFragment of bgFragments) {
		bgFragment.onclick = () => {
			if (bgFragment.classList.contains('active')) return;

			const activeFragment = document.querySelector('.form-dialog#ads-form .background-fragment.active');
			if (activeFragment !== null) activeFragment.classList.remove('active');

			bgFragment.classList.add('active');
			currentBGMode = bgFragment.id.toUpperCase();
			switch (bgFragment.id) {
				default:
					break;
				case 'color':
					initializeColorImageSelector();
					break;
				case 'bg':
					initializeBackgroundImageSelector();
					break;
			}
		}
	}
	switch (mode) {
		default:
		case 'CREATE':
			title.innerHTML = 'Create';
			document.querySelector('.form-dialog-overlay#ads-form').style.display = 'flex';
			document.querySelector('.form-dialog#ads-form').style.display = 'flex';
			clear.onclick = clearAdFormDialog;
			deleteBtn.style.display = 'none';
			submit.onclick = async () => {
				const payload = adsFormValidator();
				if (payload === undefined) return;
				statusMsg.innerHTML = 'Loading...';
				submit.style.pointerEvents = 'none';
				clear.style.pointerEvents = 'none';

				try {
					const formData = new FormData();
					formData.append('data', JSON.stringify(payload));
					formData.append('bg', currentBGMode == 'COLOR' ? currentBG : currentBGImage);

					const xhr = new XMLHttpRequest();
					xhr.onload = () => {
						if (xhr.status === 201) {
							window.open('./', '_self');
							return;
						}
						statusMsg.innerHTML = 'Try again later!';
						submit.innerHTML = 'Failed';
						setTimeout(() => {
							clear.style.pointerEvents = 'all';
							submit.style.pointerEvents = 'all';
							submit.innerHTML = 'Submit';

						}, 3000);
					}

					xhr.open('POST', './');
					xhr.send(formData);
				} catch (e) {
					console.log(e);
					statusMsg.innerHTML = 'Try again later!';
					submit.innerHTML = 'Failed';
					setTimeout(() => {
						clear.style.pointerEvents = 'all';
						submit.style.pointerEvents = 'all';
						submit.innerHTML = 'Submit';

					}, 3000)
					clear.style.pointerEvents = 'all';
					submit.style.pointerEvents = 'all';
				}
			}
			break;
		case 'EDIT':
			title.innerHTML = 'Edit';
			if (ad['subtitle'] != "None") {
				enSubtitle.value = ad['subtitle']['EN'];
				arSubtitle.value = ad['subtitle']['AR'];
			}
			if (ad['title'] != "None") {
				enTitle.value = ad['title']['EN'];
				arTitle.value = ad['title']['AR'];
			}
			if (ad['bio'] != "None") {
				enBio.value = ad['bio']['EN'];
				arBio.value = ad['bio']['AR'];
			}
			redirect.value = ad['redirect'];
			currentBGMode = ad['background_mode'];
			document.querySelector(`.form-dialog#ads-form #background-mode .background-fragment#${ad['background_mode'].toLowerCase()}`).classList.add('active');
			switch (ad['background_mode']) {
				case 'COLOR':
					currentBG = ad['background'];
					initializeColorImageSelector(currentBG);
					break;
				case 'BG':
					currentBG = `/assets/ads/covers/${ad['id']}/`;
					initializeBackgroundImageSelector(currentBG);
					break;
			}
			initializePreviewAdSpace(ad);


			document.querySelector('.form-dialog-overlay#ads-form').style.display = 'flex';
			document.querySelector('.form-dialog#ads-form').style.display = 'flex';
			clear.onclick = clearAdFormDialog;
			deleteBtn.style.display = 'flex';
			deleteBtn.onclick = async () => {
				try {
					statusMsg.innerHTML = 'Loading...';
					submit.style.pointerEvents = 'none';
					clear.style.pointerEvents = 'none';
					deleteBtn.style.pointerEvents = 'none';

					const res = await fetch(
						`./?adid=${ad['id']}`, {
						method: 'DELETE',
					});

					if (res.status === 200) {
						window.open('./', '_self');
						return;
					}

					submit.innerHTML = 'Failed';
					statusMsg.innerHTML = 'Try again later!';
					setTimeout(() => {
						statusMsg.innerHTML = '';
						submit.innerHTML = 'Submit';
						submit.style.pointerEvents = 'all';
						clear.style.pointerEvents = 'all';
						deleteBtn.style.pointerEvents = 'all';
					}, 3000);
				} catch (error) {
					console.log(error);
					submit.innerHTML = 'Failed';
					statusMsg.innerHTML = 'Try again later!';
					setTimeout(() => {
						statusMsg.innerHTML = '';
						submit.innerHTML = 'Submit';
						submit.style.pointerEvents = 'all';
						clear.style.pointerEvents = 'all';
						deleteBtn.style.pointerEvents = 'all';
					}, 3000);
				}

			};
			submit.onclick = async () => {
				const payload = adsFormValidator();
				if (payload === undefined) return;
				payload.id = ad['id'];
				statusMsg.innerHTML = 'Loading...';
				submit.style.pointerEvents = 'none';
				clear.style.pointerEvents = 'none';
				deleteBtn.style.pointerEvents = 'none';
				try {

					const formData = new FormData();
					formData.append('data', JSON.stringify(payload));
					formData.append('bg', currentBGMode == 'COLOR' ? currentBG : currentBGImage);

					const xhr = new XMLHttpRequest();
					xhr.onload = () => {
						if (xhr.status === 200) {
							window.open('./', '_self');
							return;
						}
						statusMsg.innerHTML = 'Try again later!';
						submit.innerHTML = 'Failed';
						setTimeout(() => {
							clear.style.pointerEvents = 'all';
							submit.style.pointerEvents = 'all';
							deleteBtn.style.pointerEvents = 'all';
							submit.innerHTML = 'Submit';

						}, 3000);
					}

					xhr.open('PATCH', './');
					xhr.send(formData);
				} catch (e) {
					console.log(e);
					statusMsg.innerHTML = 'Try again later!';
					submit.innerHTML = 'Failed';
					setTimeout(() => {
						clear.style.pointerEvents = 'all';
						submit.style.pointerEvents = 'all';
						deleteBtn.style.pointerEvents = 'all';
						submit.innerHTML = 'Submit';

					}, 3000)
				}

			}
			break;

	}
}

const initializeColorImageSelector = (initial) => {
	const container = document.querySelector('.form-dialog#ads-form #background-mode-select');
	container.innerHTML = '';
	const input = document.createElement('input');
	input.setAttribute('type', 'color');
	input.classList.add('single-line-field');
	if (initial !== undefined) input.value = initial;
	input.onchange = () => {
		currentBG = input.value;
		currentBGMode = 'COLOR';
		const validation = adsFormValidator();
		if (validation === undefined) return;
		initializePreviewAdSpace(validation);
	}
	container.appendChild(input)
}

const initializeBackgroundImageSelector = (initial) => {
	const container = document.querySelector('.form-dialog#ads-form .body #background-mode-select');
	container.innerHTML = '';

	const imagePicker = document.createElement('div');
	imagePicker.setAttribute('id', 'image-picker');
	imagePicker.style.backgroundImage = 'var(--image-placeholder)';
	if (initial !== undefined) imagePicker.backgroundImage = `url(${initial})`;

	imagePicker.onclick = () => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.onchange = e => {
			if (e.target.files.length === 0) {
				return;
			}
			const file_ = e.target.files[0]
			const reader = new FileReader();
			reader.onload = () => {
				imagePicker.style.backgroundImage = `url(${reader.result})`;
				currentBGImage = file_;
				currentBG = reader.result;
				console.log(currentBG);
				bgImage = file_;
				const validation = adsFormValidator();
				if (validation === undefined) return;
				initializePreviewAdSpace(validation);
			}
			reader.readAsDataURL(file_)
		}

		input.click();
	}
	container.style.height = '25vw';
	container.appendChild(imagePicker);

}

const adsFormValidator = () => {
	let subtitle, title, bio;
	const statusMsg = document.querySelector('.form-dialog#ads-form .options #status-msg')
	const enSubtitle = document.querySelector('.form-dialog#ads-form .body #form .single-line-field#en-subtitle');
	const arSubtitle = document.querySelector('.form-dialog#ads-form .body #form .single-line-field#ar-subtitle');
	const enTitle = document.querySelector('.form-dialog#ads-form .body #form .single-line-field#en-title');
	const arTitle = document.querySelector('.form-dialog#ads-form .body #form .single-line-field#ar-title');
	const enBio = document.querySelector('.form-dialog#ads-form .body #form .mutli-line-field#en-bio');
	const arBio = document.querySelector('.form-dialog#ads-form .body #form .mutli-line-field#ar-bio');
	const redirect = document.querySelector('.form-dialog#ads-form .body #form .single-line-field#redirect');

	if (enSubtitle.value.trim() !== '' || arSubtitle.value.trim() !== '') {
		if (enSubtitle.value.trim().length < 8) {
			statusMsg.innerHTML = 'Enter valid English subtitle!';
			enSubtitle.style.border = '2px red solid';
			return;
		}
		enSubtitle.style.border = 'none';

		if (arSubtitle.value.trim().length < 8) {
			statusMsg.innerHTML = 'Enter valid Arabic subtitle!';
			arSubtitle.style.border = '2px red solid';
			return;
		}
		statusMsg.innerHTML = '';
		arSubtitle.style.border = 'none';
		subtitle = {
			'EN': enSubtitle.value.trim(),
			'AR': arSubtitle.value.trim(),
		}
	} else {
		subtitle = "None";
		enSubtitle.style.border = 'none';
		arSubtitle.style.border = 'none';
	}

	if (enTitle.value.trim() !== '' || arTitle.value.trim() !== '') {
		if (enTitle.value.trim().length < 8) {
			statusMsg.innerHTML = 'Enter valid English title!';
			enTitle.style.border = '2px red solid';
			return;
		}
		enTitle.style.border = 'none';
		if (arTitle.value.trim().length < 8) {
			statusMsg.innerHTML = 'Enter valid Arabic title!';
			arTitle.style.border = '2px red solid';
			return;
		}
		statusMsg.innerHTML = '';
		arTitle.style.border = 'none';
		title = {
			'EN': enTitle.value.trim(),
			'AR': arTitle.value.trim(),
		}
	} else {
		title = "None";
		arTitle.style.border = 'none';
		enTitle.style.border = 'none';
	}

	if (enBio.value.trim() !== '' || arBio.value.trim() !== '') {
		if (enBio.value.trim().length < 8) {
			statusMsg.innerHTML = 'Enter valid English bio!';
			enBio.style.border = '2px red solid';
			return;
		}
		enBio.style.border = 'none';
		if (arBio.value.trim().length < 8) {
			statusMsg.innerHTML = 'Enter valid Arabic bio!';
			arBio.style.border = '2px red solid';
			return;
		}
		statusMsg.innerHTML = '';
		arBio.style.border = 'none';
		bio = {
			'EN': enSubtitle.value.trim(),
			'AR': arSubtitle.value.trim(),
		}
	} else {
		bio = "None";
		enBio.style.border = 'none';
		arBio.style.border = 'none';
	}

	try {
		new URL(redirect.value.trim());
	} catch (e) {
		statusMsg.innerHTML = 'Enter valid url!';
		redirect.style.border = '2px red solid';
		return;
	}
	statusMsg.innerHTML = '';
	redirect.style.border = 'none';

	if (currentBGMode === undefined) {
		statusMsg.innerHTML = 'Select background mode!';
		return;
	}
	statusMsg.innerHTML = '';

	if (currentBG === undefined) {
		statusMsg.innerHTML = 'Select background!';
		return;
	}
	statusMsg.innerHTML = '';

	return {
		subtitle: subtitle,
		title: title,
		bio: bio,
		redirect: redirect.value.trim(),
		background_mode: currentBGMode,
	}

}

const clearAdFormDialog = () => {
	const statusMsg = document.querySelector('.form-dialog#ads-form .options #status-msg');
	statusMsg.innerHTML = '';
	const container = document.querySelector('.form-dialog#ads-form #background-mode-select');
	container.innerHTML = '';
	const enSubtitle = document.querySelector('.form-dialog#ads-form .body #form .single-line-field#en-subtitle');
	enSubtitle.value = '';
	const arSubtitle = document.querySelector('.form-dialog#ads-form .body #form .single-line-field#ar-subtitle');
	arSubtitle.value = '';
	const enTitle = document.querySelector('.form-dialog#ads-form .body #form .single-line-field#en-title');
	enTitle.value = '';
	const arTitle = document.querySelector('.form-dialog#ads-form .body #form .single-line-field#ar-title');
	arTitle.value = '';
	const enBio = document.querySelector('.form-dialog#ads-form .body #form .mutli-line-field#en-bio');
	enBio.value = '';
	const arBio = document.querySelector('.form-dialog#ads-form .body #form .mutli-line-field#ar-bio');
	arBio.value = '';
	const redirect = document.querySelector('.form-dialog#ads-form .body #form .single-line-field#redirect');
	redirect.value = '';

	const activeFragment = document.querySelector('.form-dialog#ads-form .background-fragment.active');
	if (activeFragment !== null) activeFragment.classList.remove('active');
	currentBG = 'COLOR';
	currentBGMode = 'transparent';

	document.querySelector('#horizontal-preview').innerHTML = '';
	document.querySelector('#horizontal-preview').background = 'transparent';
	document.querySelector('#vertical-preview').innerHTML = '';
	document.querySelector('#vertical-preview').background = 'transparent';
	initializePreviewAdSpace({
		"title": "None",
		"subtitle": "None",
		"bio": "None",
	})
	currentBG = undefined;
	currentBGMode = undefined;
	currentBGImage = undefined;
}

const closeAdFormDialog = () => {
	clearAdFormDialog();
	document.querySelector('.form-dialog-overlay#ads-form').style.display = 'none';
	document.querySelector('.form-dialog#ads-form').style.display = 'none';
}