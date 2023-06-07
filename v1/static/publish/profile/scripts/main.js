let username, password, tags,
    categories, parentCategories,
    selectedCategories, selectedParentCategories,
    profile, bgfree, cover;

const initCategories = (categories_, parentCategories_) => {
    categories = categories_;
    parentCategories = parentCategories_;
}


const initData = (writer) => {
    profile = 'Existed'
    bgfree = 'Existed'
    cover = 'Existed'
    document.querySelector('#fields div.image-picker#bgfree').style.backgroundImage = `url('/assets/writers/bgFree/${writer.id}')`;
    document.querySelector('#fields div.image-picker#cover').style.backgroundImage = `url('/assets/covers/writers/${writer.id}')`;
    document.querySelector('#fields div.image-picker#profile-picture').style.backgroundImage = `url('/assets/writers/${writer.id}')`;


    const enNameField = document.querySelector('#fields input.single-line-field#en-name');
    enNameField.value = writer.name['EN']

    const arNameField = document.querySelector('#fields input.single-line-field#ar-name');
    arNameField.value = writer.name['AR']

    const enBioField = document.querySelector('#fields textarea.mutli-line-field#en-bio');
    enBioField.value = writer.bio['EN'];

    const arBioField = document.querySelector('#fields textarea.mutli-line-field#ar-bio');
    arBioField.value = writer.bio['AR'];

    const tagsField = document.querySelector('#fields .tags .header input');
    const tagsSubmit = document.querySelector('#fields .tags .header #tags-submit');
    tagsSubmit.onclick = () => {

        if (tagsField.value.trim().length === 0) {
            tagsField.style.border = '1px red solid';
            return;
        }

        if ((tags ?? []).includes(tagsField.value.trim())) {
            tagsField.style.border = '1px red solid';
            document.querySelector('.form-dialog#parent-category .options #status-msg').innerHTML = 'Tag is existed!';
            return;
        }

        tagsField.style.border = 'none';
        tags.push(tagsField.value.trim());
        tagsField.value = '';
        generateTagsTiles(tagsContainer);
    }


    const tagsContainer = document.querySelector('#fields .tags .body');
    tags = writer.tags;
    generateTagsTiles(tagsContainer);


    selectedCategories = writer.prefered_category;
    const categoriesContainer = document.querySelector('#fields #categories');
    categoriesContainer.innerHTML = '';
    for (let category of categories) {

        const categoryTile = document.createElement('div');
        categoryTile.setAttribute('id', category.id);
        categoryTile.classList.add('category-tile');
        if (selectedCategories.includes(category.id)) {
            categoryTile.classList.add('active');
        }

        const title = document.createElement('h3');
        title.innerHTML = category.name['EN'];
        const bio = document.createElement('p');
        bio.innerHTML = category.bio['EN'];

        categoryTile.appendChild(title);
        categoryTile.appendChild(bio);
        categoryTile.onclick = () => {
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


    selectedParentCategories = writer.prefered_parent_category;
    const parentCategoriesContainer = document.querySelector('#fields #classifications');
    parentCategoriesContainer.innerHTML = '';
    for (let parentCategory of parentCategories) {
        const parentCategoryTile = document.createElement('div');
        parentCategoryTile.setAttribute('id', parentCategory.id);
        parentCategoryTile.classList.add('category-tile');
        if (selectedParentCategories.includes(parentCategory.id)) {
            parentCategoryTile.classList.add('active');
        }

        const title = document.createElement('h3');
        title.innerHTML = parentCategory.name['EN'];
        const bio = document.createElement('p');
        bio.innerHTML = parentCategory.bio['EN'];

        parentCategoryTile.appendChild(title);
        parentCategoryTile.appendChild(bio);
        parentCategoryTile.onclick = () => {
            if (selectedParentCategories.includes(parentCategory.id)) {
                parentCategoryTile.classList.remove('active');
                selectedParentCategories.splice(selectedParentCategories.indexOf(parentCategory.id), 1);
                return;
            }
            parentCategoryTile.classList.add('active')
            selectedParentCategories.push(parentCategory.id);
        }
        parentCategoriesContainer.appendChild(parentCategoryTile);
    }

}


const completeProfileFormValidation = () => {
    const statusMsg = document.querySelector('.options p#status-msg');
    const enNameField = document.querySelector('#fields input.single-line-field#en-name');
    const arNameField = document.querySelector('#fields input.single-line-field#ar-name');
    const enBioField = document.querySelector('#fields textarea.mutli-line-field#en-bio');
    const arBioField = document.querySelector('#fields textarea.mutli-line-field#ar-bio');

    if (bgfree === undefined) {
        statusMsg.innerHTML = 'Select your Background-Free picture!';
        return;
    }
    statusMsg.innerHTML = '';

    if (profile === undefined) {
        statusMsg.innerHTML = 'Select your profile picture!';
        return;
    }
    statusMsg.innerHTML = '';

    if (cover === undefined) {
        statusMsg.innerHTML = 'Select your cover picture!';
        return;
    }
    statusMsg.innerHTML = '';

    if (enNameField.value.trim().length < 8) {
        statusMsg.innerHTML = 'Enter a valid English name!'
        enNameField.style.border = '1px red solid';
        return;
    }
    statusMsg.innerHTML = ''
    enNameField.style.border = 'none';


    if (arNameField.value.trim().length < 8) {
        statusMsg.innerHTML = 'Enter a valid Arabic name!'
        arNameField.style.border = '1px red solid';
        return;
    }
    statusMsg.innerHTML = ''
    arNameField.style.border = 'none';


    if (enBioField.value.trim().length < 8) {
        statusMsg.innerHTML = 'Enter a valid English bio!'
        enBioField.style.border = '1px red solid';
        return;
    }
    statusMsg.innerHTML = ''
    enBioField.style.border = 'none';


    if (arBioField.value.trim().length < 8) {
        statusMsg.innerHTML = 'Enter a valid Arabic bio!'
        arBioField.style.border = '1px red solid';
        return;
    }
    statusMsg.innerHTML = ''
    arBioField.style.border = 'none';


    if (tags === undefined || tags.length < 5) {
        statusMsg.innerHTML = 'Enter at least 5 tags';
        return;
    }
    statusMsg.innerHTML = '';


    if (selectedCategories === undefined || selectedCategories.length < 1) {
        statusMsg.innerHTML = 'Enter at least one category';
        return;
    }
    statusMsg.innerHTML = '';


    if (selectedParentCategories === undefined || selectedParentCategories.length < 1) {
        statusMsg.innerHTML = 'Enter at least one classification';
        return;
    }
    statusMsg.innerHTML = '';

    return {
        name: {
            EN: enNameField.value.trim(),
            AR: arNameField.value.trim(),
        },
        bio: {
            EN: enBioField.value.trim(),
            AR: arBioField.value.trim(),
        },
        prefered_category: selectedCategories,
        prefered_parent_category: selectedParentCategories,
        tags: tags
    }
}



const generateTagsTiles = (container) => {
    container.innerHTML = '';

    for (let tag of tags) {
        const tile = document.createElement('div');
        tile.classList.add('tag-tile');

        const tagText = document.createElement('p')
        tagText.innerHTML = tag;

        const closeOption = document.createElement('div');
        closeOption.innerHTML = 'x';
        closeOption.onclick = () => {
            tags.splice(tags.indexOf(tag), 0);
            container.removeChild(tile);
        }

        tile.appendChild(tagText);
        tile.appendChild(closeOption);
        container.appendChild(tile);
    }
}

const pickImage = (container) => {
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
            container.style.backgroundImage = `url(${reader.result})`;
            switch (container.id) {
                case 'bgfree':
                    bgfree = file_;
                    break;
                case 'profile-picture':
                    profile = file_;
                    break;
                case 'cover':
                    cover = file_;
                    break;
            }
        }
        reader.readAsDataURL(file_)
    }
    input.click();
}


const confirmation = (writerId) => {
    const reset = document.querySelector('.options button.shadow-button#reset');
    const submit = document.querySelector('.options button.main-button#submit');
    const statusMsg = document.querySelector('.options p#status-msg');

    try {
        const validation = completeProfileFormValidation();
        if (validation === undefined) return;
        validation.id = writerId;

        statusMsg.innerHTML = 'Loading...';
        submit.style.pointerEvents = 'none';
        reset.style.pointerEvents = 'none';

        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('data', JSON.stringify(validation));
        if (cover !== undefined && cover !== 'Existed') formData.append('cover', cover);
        if (bgfree !== undefined && bgfree !== 'Existed') formData.append('bgfree', cover);
        if (profile !== undefined && profile !== 'Existed') formData.append('profile', cover);

        xhr.onload = () => {
            if (xhr.status === 200) {
                window.open('./', '_self');
                return;
            }
            submit.innerHTML = 'Failed';
            statusMsg.innerHTML = 'Try again later!';
            setTimeout(() => {
                submit.innerHTML = 'Submit';
                statusMsg.innerHTML = '';
                submit.style.pointerEvents = 'all';
                reset.style.pointerEvents = 'all';
            }, 3000)
        }

        xhr.open('PATCH', './');
        xhr.send(formData);
    } catch (e) {
        console.log(e);
        submit.innerHTML = 'Failed';
        statusMsg.innerHTML = 'Try again later!';
        setTimeout(() => {
            submit.innerHTML = 'Submit';
            statusMsg.innerHTML = '';
            submit.style.pointerEvents = 'all';
            reset.style.pointerEvents = 'all';
        }, 3000);
    }
}