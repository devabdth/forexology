let currentCover, currentIcon, tags, categories, selectedCategories;
const initCategories= (categories_)=> { categories= categories_; }
const openParentFormDialog= (mode, parentCategory) => {
	const tagsField= document.querySelector('.form-dialog#parent-category .tags .header input');
	const tagsSubmit= document.querySelector('.form-dialog#parent-category .tags .header #tags-submit');
	const tagsContainer= document.querySelector('.form-dialog#parent-category .tags .body');
	const categoriesContainer= document.querySelector('.form-dialog#parent-category .categories');
	const deleteBtn= document.querySelector('.form-dialog#parent-category .options .shadow-button#delete-btn');

	categoriesContainer.innerHTML= '';
	for (let category of categories) {
		const categoryTile= document.createElement('div');
		categoryTile.setAttribute('id', category.id);
		categoryTile.classList.add('category-tile');

		const title= document.createElement('h3');
		title.innerHTML= category.name['EN'];
		const bio= document.createElement('p');
		bio.innerHTML= category.bio['EN'];

		categoryTile.appendChild(title);
		categoryTile.appendChild(bio);
		categoryTile.onclick= ()=> {
			if (selectedCategories.includes(category.id)) {
				categoryTile.classList.remove('active');
				selectedCategories.splice(selectedCategories.indexOf(category.id), 1);
				return;
			}
			categoryTile.classList.add('active')
			selectedCategories.push(category.id);
		}
		categoriesContainer.appendChild(categoryTile);
	}


	switch(mode) {
		default:
		case 'CREATE':
			tags= [];

			tagsSubmit.onclick= ()=> {
				if (tagsField.value.trim().length === 0) {
					tagsField.style.border= '1px red solid';
					return;
				}

				if((tags??[]).includes(tagsField.value.trim())) {
					tagsField.style.border= '1px red solid';
					document.querySelector('.form-dialog#parent-category .options #status-msg').innerHTML= 'Tag is existed!';
					return;
				}

				tagsField.style.border= 'none';
				tags.push(tagsField.value.trim());
				tagsField.value= '';
				generateTagsTiles(tagsContainer);
			}

			selectedCategories= [];
			document.querySelector('.form-dialog#parent-category .options .main-button').onclick= parentCategoryFormCreateSubmit;
			deleteBtn.style.display= 'none';
			document.querySelector('.form-dialog#parent-category .header h2').innerHTML= 'Create';
		break;
		case 'EDIT':
			const enNameField= document.querySelector('.form-dialog#parent-category #cat-en-name');
			enNameField.value= parentCategory.name['EN'];
			const arNameField= document.querySelector('.form-dialog#parent-category #cat-ar-name');
			arNameField.value= parentCategory.name['AR'];
			const enBioField= document.querySelector('.form-dialog#parent-category #cat-en-bio');
			enBioField.value= parentCategory.bio['EN'];
			const arBioField= document.querySelector('.form-dialog#parent-category #cat-ar-bio');
			arBioField.value= parentCategory.bio['AR'];

			tags= parentCategory.tags;
			generateTagsTiles(tagsContainer);
			tagsSubmit.onclick= ()=> {
				if (tagsField.value.trim().length === 0) {
					tagsField.style.border= '1px red solid';
					return;
				}

				if((tags??[]).includes(tagsField.value.trim())) {
					tagsField.style.border= '1px red solid';
					document.querySelector('.form-dialog#parent-category .options #status-msg').innerHTML= 'Tag is existed!';
					return;
				}

				tagsField.style.border= 'none';
				tags.push(tagsField.value.trim());
				tagsField.value= '';
				generateTagsTiles(tagsContainer);
			}

			selectedCategories= parentCategory.categories;
			console.log(selectedCategories);
			for (let category of selectedCategories) {
				document.getElementById(category).classList.add('active');
			}

			deleteBtn.onclick= ()=> {
				deleteParentCategory(parentCategory.id);
			}

			document.querySelector('.form-dialog#parent-category .options .main-button').onclick= ()=> {
				updateParentCategory(parentCategory['id']);
			}

			document.querySelector('.form-dialog#category .header h2').innerHTML= 'Edit';		

	}
	document.querySelector('.form-dialog#parent-category').style.display= 'flex';
	document.querySelector('.form-dialog-overlay#parent-category').style.display= 'flex';
}

const openFormDialog= (mode, category)=> {
	const tagsField= document.querySelector('.form-dialog#category .tags .header input');
	const tagsSubmit= document.querySelector('.form-dialog#category .tags .header #tags-submit');
	const tagsContainer= document.querySelector('.form-dialog#category .tags .body');
	const icon= document.querySelector('.form-dialog#category .body .icon');
	const cover= document.querySelector('.form-dialog#category .body .cover');
	const deleteBtn= document.querySelector('.form-dialog#category .options .shadow-button#delete-btn');
	switch(mode) {
		default:
		case 'CREATE':
			tags= [];

			tagsSubmit.onclick= ()=> {
				if (tagsField.value.trim().length === 0) {
					tagsField.style.border= '1px red solid';
					return;
				}

				if((tags??[]).includes(tagsField.value.trim())) {
					tagsField.style.border= '1px red solid';
					document.querySelector('.form-dialog#category .options #status-msg').innerHTML= 'Tag is existed!';
					return;
				}

				tagsField.style.border= 'none';
				tags.push(tagsField.value.trim());
				tagsField.value= '';
				generateTagsTiles(tagsContainer);
			}
			icon.onclick= ()=> { pickImage(icon, (value)=> { currentIcon= value; }); }
			cover.onclick= ()=> { pickImage(cover, (value)=> { currentCover= value; }); }

			document.querySelector('.form-dialog#category .options .main-button').onclick= categoryFormCreateSubmit;
			deleteBtn.style.display= 'none';
			document.querySelector('.form-dialog#category .header h2').innerHTML= 'Create';
			break;

		case 'EDIT':
			const enNameField= document.querySelector('.form-dialog#category #cat-en-name');
			enNameField.value= category.name['EN'];
			const arNameField= document.querySelector('.form-dialog#category #cat-ar-name');
			arNameField.value= category.name['AR'];
			const enBioField= document.querySelector('.form-dialog#category #cat-en-bio');
			enBioField.value= category.bio['EN'];
			const arBioField= document.querySelector('.form-dialog#category #cat-ar-bio');
			arBioField.value= category.bio['AR'];

			tags= category.tags;
			generateTagsTiles(tagsContainer);
			tagsSubmit.onclick= ()=> {
				if (tagsField.value.trim().length === 0) {
					tagsField.style.border= '1px red solid';
					return;
				}

				if((tags??[]).includes(tagsField.value.trim())) {
					tagsField.style.border= '1px red solid';
					document.querySelector('.form-dialog#category .options #status-msg').innerHTML= 'Tag is existed!';
					return;
				}

				tagsField.style.border= 'none';
				tags.push(tagsField.value.trim());
				tagsField.value= '';
				generateTagsTiles(tagsContainer);
			}

			icon.style.backgroundImage= `url(/assets/categories/icons/${category.id}`;
			icon.onclick= ()=> { pickImage(icon, (value)=> { currentIcon= value; }); }

			cover.style.backgroundImage= `url(/assets/categories/covers/${category.id}`;
			cover.onclick= ()=> { pickImage(cover, (value)=> { currentCover= value; }); }

			deleteBtn.onclick= ()=> {
				deleteCategory(category.id);
			}

			document.querySelector('.form-dialog#category .options .main-button').onclick= ()=> {
				updateCategory(category['id']);
			}

			document.querySelector('.form-dialog#category .header h2').innerHTML= 'Edit';
			break;
	}
	document.querySelector('.form-dialog-overlay#category').style.display= 'flex';
	document.querySelector('.form-dialog#category').style.display= 'flex';
}

const updateCategory= async (catId) => {
	const deleteBtn= document.querySelector('.form-dialog#category .options .shadow-button#delete-btn');
	const statusMsg= document.querySelector('.form-dialog#category .options #status-msg');
	const submit= document.querySelector('.form-dialog#category .options .main-button');
	const cancel= document.querySelector('.form-dialog#category .options .shadow-button');
	try {
		const validationRes= categoryFormValidation();
		validationRes.id= catId;
		const xhr= new XMLHttpRequest();

		const data= new FormData();
		data.append('data', JSON.stringify(validationRes));
		data.append('icon', currentIcon);
		data.append('cover', currentCover);

		xhr.onload= ()=> {
			if (xhr.status === 200) {
				window.open('./', '_self');
				return;
			}
			statusMsg.innerHTML= 'Try again later!';
			setTimeout(() => {
				statusMsg.innerHTML= '';
				deleteBtn.style.pointerEvents= 'all';
				submit.style.pointerEvents= 'all';
				cancel.style.pointerEvents= 'all';
			}, 3000);
		}

		xhr.open('PATCH', './');
		xhr.send(data)

	} catch (e) {
		console.log(e);
		statusMsg.innerHTML= 'Try again later!';
		setTimeout(() => {
			statusMsg.innerHTML= '';
			deleteBtn.style.pointerEvents= 'all';
			submit.style.pointerEvents= 'all';
			cancel.style.pointerEvents= 'all';
		}, 3000);		
	}

}

const updateParentCategory= async (pcatId) => {
	const deleteBtn= document.querySelector('.form-dialog#parent-category .options .shadow-button#delete-btn');
	const statusMsg= document.querySelector('.form-dialog#parent-category .options #status-msg');
	const submit= document.querySelector('.form-dialog#parent-category .options .main-button');
	const cancel= document.querySelector('.form-dialog#parent-category .options .shadow-button');
	try {
		const validationRes= parentCategoryFormValidation();
		validationRes.id= pcatId;
		const xhr= new XMLHttpRequest();

		const data= new FormData();
		data.append('data', JSON.stringify(validationRes));
		xhr.onload= ()=> {
			if (xhr.status === 200) {
				window.open('./', '_self');
				return;
			}
			statusMsg.innerHTML= 'Try again later!';
			setTimeout(() => {
				statusMsg.innerHTML= '';
				deleteBtn.style.pointerEvents= 'all';
				submit.style.pointerEvents= 'all';
				cancel.style.pointerEvents= 'all';
			}, 3000);
		}

		xhr.open('PATCH', './parent/');
		xhr.send(data)

	} catch (e) {
		console.log(e);
		statusMsg.innerHTML= 'Try again later!';
		setTimeout(() => {
			statusMsg.innerHTML= '';
			deleteBtn.style.pointerEvents= 'all';
			submit.style.pointerEvents= 'all';
			cancel.style.pointerEvents= 'all';
		}, 3000);		
	}

}

const deleteCategory= async (catId) => {
	const deleteBtn= document.querySelector('.form-dialog#category .options .shadow-button#delete-btn');
	const statusMsg= document.querySelector('.form-dialog#category .options #status-msg');
	const submit= document.querySelector('.form-dialog#category .options .main-button');
	const cancel= document.querySelector('.form-dialog#category .options .shadow-button');

	try {
		statusMsg.innerHTML= 'Loading...';
		deleteBtn.style.pointerEvents= 'none';
		submit.style.pointerEvents= 'none';
		cancel.style.pointerEvents= 'none';
		const res= await fetch(`./?cid=${catId}`, {
			method: 'DELETE',
		});

		if (res.status === 200) {
			window.open('./', '_self');
			return;
		}

		statusMsg.innerHTML= 'Try again later!';
		setTimeout(() => {
			statusMsg.innerHTML= '';
			deleteBtn.style.pointerEvents= 'all';
			submit.style.pointerEvents= 'all';
			cancel.style.pointerEvents= 'all';
		}, 3000);
	} catch (e) {
		console.log(e);
		statusMsg.innerHTML= 'Try again later!';
		setTimeout(() => {
			statusMsg.innerHTML= '';
			deleteBtn.style.pointerEvents= 'all';
			submit.style.pointerEvents= 'all';
			cancel.style.pointerEvents= 'all';
		}, 3000);
	}
}

const deleteParentCategory= async (pcatId) => {
	const deleteBtn= document.querySelector('.form-dialog#parent-category .options .shadow-button#delete-btn');
	const statusMsg= document.querySelector('.form-dialog#parent-category .options #status-msg');
	const submit= document.querySelector('.form-dialog#parent-category .options .main-button');
	const cancel= document.querySelector('.form-dialog#parent-category .options .shadow-button');

	try {
		statusMsg.innerHTML= 'Loading...';
		deleteBtn.style.pointerEvents= 'none';
		submit.style.pointerEvents= 'none';
		cancel.style.pointerEvents= 'none';
		const res= await fetch(`./parent/?pcid=${pcatId}`, {
			method: 'DELETE',
		});

		if (res.status === 200) {
			window.open('./', '_self');
			return;
		}

		statusMsg.innerHTML= 'Try again later!';
		setTimeout(() => {
			statusMsg.innerHTML= '';
			deleteBtn.style.pointerEvents= 'all';
			submit.style.pointerEvents= 'all';
			cancel.style.pointerEvents= 'all';
		}, 3000);
	} catch (e) {
		console.log(e);
		statusMsg.innerHTML= 'Try again later!';
		setTimeout(() => {
			statusMsg.innerHTML= '';
			deleteBtn.style.pointerEvents= 'all';
			submit.style.pointerEvents= 'all';
			cancel.style.pointerEvents= 'all';
		}, 3000);
	}
}

const pickImage= (container, listener)=> {
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
			container.style.backgroundImage= `url(${reader.result})`;
			listener(file_);
		}
		reader.readAsDataURL(file_)
	}

	input.click();

}

const generateTagsTiles= (container) => {
	container.innerHTML= '';

	for (let tag of tags) {
		const tile= document.createElement('div');
		tile.classList.add('tag-tile');

		const tagText= document.createElement('p')
		tagText.innerHTML= tag;

		const closeOption= document.createElement('div');
		closeOption.innerHTML= 'x';
		closeOption.onclick= ()=> {
			tags.splice(tags.indexOf(tag), 0);
			container.removeChild(tile);
		}

		tile.appendChild(tagText);
		tile.appendChild(closeOption);
		container.appendChild(tile);
	}
}

const categoryFormCreateSubmit= ()=> {
	const statusMsg= document.querySelector('.form-dialog#category .options #status-msg');
	const submit= document.querySelector('.form-dialog#category .options .main-button');
	const cancel= document.querySelector('.form-dialog#category .options .shadow-button');
	const validationRes= categoryFormValidation();
	if (!validationRes) return;

	if(currentIcon === undefined) {
		statusMsg.innerHTML= 'Pick icon first!';
		return;
	}

	if(currentCover === undefined) {
		statusMsg.innerHTML= 'Pick cover first!';
		return;
	}

	statusMsg.innerHTML= 'Loading...';
	submit.style.pointerEvents= 'none';
	cancel.style.pointerEvents= 'none';

	try {
		const data= new FormData();
		data.append('category', JSON.stringify(validationRes));
		data.append('icon', currentIcon);
		data.append('cover', currentCover);

		const xhr= new XMLHttpRequest();
		xhr.onload= ()=> {
			if (xhr.status === 201) {
				window.open('./', '_self');
				return;

			}
			statusMsg.innerHTML= 'Try again later!';
			submit.innerHTML= 'Failed';
			setTimeout(()=> {
				statusMsg.innerHTML= '';
				submit.innerHTML= 'Submit';
				submit.style.pointerEvents= 'all';
				cancel.style.pointerEvents= 'all';
			}, 3000);
		}

		xhr.open('POST', './');
		xhr.send(data);
	} catch (e) {
		console.log(e);
		statusMsg.innerHTML= 'Try again later!';
		submit.innerHTML= 'Failed';
		setTimeout(()=> {
			statusMsg.innerHTML= '';
			submit.innerHTML= 'Submit';
			submit.style.pointerEvents= 'all';
			cancel.style.pointerEvents= 'all';
		}, 3000);
	}

}

const parentCategoryFormCreateSubmit= ()=> {
	const statusMsg= document.querySelector('.form-dialog#category .options #status-msg');
	const submit= document.querySelector('.form-dialog#category .options .main-button');
	const cancel= document.querySelector('.form-dialog#category .options .shadow-button');
	const validationRes= parentCategoryFormValidation();
	if (!validationRes) return;

	statusMsg.innerHTML= 'Loading...';
	submit.style.pointerEvents= 'none';
	cancel.style.pointerEvents= 'none';

	try {
		const data= new FormData();
		data.append('parentCategory', JSON.stringify(validationRes));
		const xhr= new XMLHttpRequest();
		console.log('HERE');
		xhr.onload= ()=> {
			if (xhr.status === 201) {
				window.open('./', '_self');
				return;

			}
			statusMsg.innerHTML= 'Try again later!';
			submit.innerHTML= 'Failed';
			setTimeout(()=> {
				statusMsg.innerHTML= '';
				submit.innerHTML= 'Submit';
				submit.style.pointerEvents= 'all';
				cancel.style.pointerEvents= 'all';
			}, 3000);
		}

		xhr.open('POST', './parent/');
		xhr.send(data);
	} catch (e) {
		console.log(e);
		statusMsg.innerHTML= 'Try again later!';
		submit.innerHTML= 'Failed';
		setTimeout(()=> {
			statusMsg.innerHTML= '';
			submit.innerHTML= 'Submit';
			submit.style.pointerEvents= 'all';
			cancel.style.pointerEvents= 'all';
		}, 3000);
	}

}

const categoryFormValidation= ()=> {
	const enNameField= document.querySelector('.form-dialog#category #cat-en-name');
	const arNameField= document.querySelector('.form-dialog#category #cat-ar-name');
	const enBioField= document.querySelector('.form-dialog#category #cat-en-bio');
	const arBioField= document.querySelector('.form-dialog#category #cat-ar-bio');
	const tagsField= document.querySelector('.form-dialog#category .tags .header input');
	const statusMsg= document.querySelector('.form-dialog#category .options #status-msg');

	if (enNameField.value.trim().length < 6 || enNameField.value.trim().length > 32) {
		enNameField.style.border= '1px red solid';
		statusMsg.innerHTML= 'Enter valid english name!';
		return;
	}
	enNameField.style.border= 'none';
	statusMsg.innerHTML= '';


	if (arNameField.value.trim().length < 6 || arNameField.value.trim().length > 32) {
		arNameField.style.border= '1px red solid';
		statusMsg.innerHTML= 'Enter valid arabic name!';
		return;
	}
	arNameField.style.border= 'none';
	statusMsg.innerHTML= '';


	if (enBioField.value.trim().length < 32) {
		enBioField.style.border= '1px red solid';
		statusMsg.innerHTML= 'Enter valid english bio!';
		return;
	}
	enBioField.style.border= 'none';
	statusMsg.innerHTML= '';


	if (arBioField.value.trim().length < 32) {
		arBioField.style.border= '1px red solid';
		statusMsg.innerHTML= 'Enter valid arabic bio!';
		return;
	}
	arBioField.style.border= 'none';
	statusMsg.innerHTML= '';


	if ((tags??[]).length < 5) {
		tagsField.style.border= '1px red solid';
		statusMsg.innerHTML= 'Enter at least 5 tags';
		return;
	}
	tagsField.style.border= 'none';
	statusMsg.innerHTML= '';


	return {
		enName: enNameField.value.trim(),
		arName: arNameField.value.trim(),
		enBio: enBioField.value.trim(),
		arBio: arBioField.value.trim(),
		tags: tags,
	}
}

const parentCategoryFormValidation= ()=> {
	const enNameField= document.querySelector('.form-dialog#parent-category #cat-en-name');
	const arNameField= document.querySelector('.form-dialog#parent-category #cat-ar-name');
	const enBioField= document.querySelector('.form-dialog#parent-category #cat-en-bio');
	const arBioField= document.querySelector('.form-dialog#parent-category #cat-ar-bio');
	const tagsField= document.querySelector('.form-dialog#parent-category .tags .header input');
	const statusMsg= document.querySelector('.form-dialog#parent-category .options #status-msg');

	if (enNameField.value.trim().length < 6 || enNameField.value.trim().length > 32) {
		enNameField.style.border= '1px red solid';
		statusMsg.innerHTML= 'Enter valid english name!';
		return;
	}
	enNameField.style.border= 'none';
	statusMsg.innerHTML= '';


	if (arNameField.value.trim().length < 6 || arNameField.value.trim().length > 32) {
		arNameField.style.border= '1px red solid';
		statusMsg.innerHTML= 'Enter valid arabic name!';
		return;
	}
	arNameField.style.border= 'none';
	statusMsg.innerHTML= '';


	if (enBioField.value.trim().length < 32) {
		enBioField.style.border= '1px red solid';
		statusMsg.innerHTML= 'Enter valid english bio!';
		return;
	}
	enBioField.style.border= 'none';
	statusMsg.innerHTML= '';


	if (arBioField.value.trim().length < 32) {
		arBioField.style.border= '1px red solid';
		statusMsg.innerHTML= 'Enter valid arabic bio!';
		return;
	}
	arBioField.style.border= 'none';
	statusMsg.innerHTML= '';


	if ((tags??[]).length < 5) {
		tagsField.style.border= '1px red solid';
		statusMsg.innerHTML= 'Enter at least 5 tags';
		return;
	}
	tagsField.style.border= 'none';
	statusMsg.innerHTML= '';

	if ((selectedCategories??[]).length < 1) {
		statusMsg.innerHTML= 'Select at least 1 category!';
		return;
	}
	statusMsg.innerHTML= '';


	return {
		enName: enNameField.value.trim(),
		arName: arNameField.value.trim(),
		enBio: enBioField.value.trim(),
		arBio: arBioField.value.trim(),
		tags: tags,
		categories: selectedCategories,
	}
}

const clearCategoryForm= ()=> {
	const enNameField= document.querySelector('.form-dialog#category #cat-en-name');
	enNameField.value= '';
	const arNameField= document.querySelector('.form-dialog#category #cat-ar-name');
	arNameField.value= '';
	const enBioField= document.querySelector('.form-dialog#category #cat-en-bio');
	enBioField.value= '';
	const arBioField= document.querySelector('.form-dialog#category #cat-ar-bio');
	arBioField.value= '';
	const tagsField= document.querySelector('.form-dialog#category .tags .header input');
	tagsField.value= '';
	tags= [];
	generateTagsTiles(document.querySelector('.form-dialog#category .tags .body'));
	tags= undefined;

	const icon= document.querySelector('.form-dialog#category .body .icon');
	icon.style.backgroundImage= 'var(--image-placeholder)';
	const cover= document.querySelector('.form-dialog#category .body .cover');
	cover.style.backgroundImage= 'var(--image-placeholder)';

}

const clearParentCategoryForm= ()=> {
	const enNameField= document.querySelector('.form-dialog#parent-category #cat-en-name');
	enNameField.value= '';
	const arNameField= document.querySelector('.form-dialog#parent-category #cat-ar-name');
	arNameField.value= '';
	const enBioField= document.querySelector('.form-dialog#parent-category #cat-en-bio');
	enBioField.value= '';
	const arBioField= document.querySelector('.form-dialog#parent-category #cat-ar-bio');
	arBioField.value= '';
	const tagsField= document.querySelector('.form-dialog#parent-category .tags .header input');
	tagsField.value= '';
	tags= [];
	generateTagsTiles(document.querySelector('.form-dialog#parent-category .tags .body'));
	tags= undefined;
}

const closeFormDialog = ()=> {
	clearCategoryForm();
	document.querySelector('.form-dialog-overlay#category').style.display= 'none';
	document.querySelector('.form-dialog#category').style.display= 'none';
}
const closeParentFormDialog = ()=> {
	clearParentCategoryForm();
	document.querySelector('.form-dialog-overlay#parent-category').style.display= 'none';
	document.querySelector('.form-dialog#parent-category').style.display= 'none';
}