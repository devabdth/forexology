let username, password, tags,
    categories, parentCategories,
    selectedCategories, selectedParentCategories,
    profile, bgfree, cover;

window.onload = () => {
    document.querySelector('section#entry #auth-form #password-field').style.display = 'none';
    document.querySelector('section#entry #auth-form #repassword-field').style.display = 'none';
    const submit = document.querySelector('#auth-form .main-button');
    submit.onclick = stepOne;

}

const initCategories = (categories_, parentCategories_) => {
    categories = categories_;
    parentCategories = parentCategories_;
}

const stepOne = async () => {
    const statusMsg = document.querySelector('#auth-form #status')
    const submit = document.querySelector('#auth-form .main-button');
    const usernameField = document.querySelector('section#entry #auth-form #username-field');
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!(usernameField.value.trim().length > 8 && String(usernameField.value.trim()).toLowerCase().match(re))) {
        statusMsg.innerHTML = 'Enter valid email!';
        usernameField.style.border = '2px solid red';
        return;
    }
    statusMsg.innerHTML = 'Loading';
    usernameField.style.border = 'none';
    submit.style.pointerEvents = 'none';


    try {
        const res = await fetch(
            './', {
            method: 'PATCH',
            body: JSON.stringify({ 'username': usernameField.value.trim(), 'mode': 'email' }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );

        switch (res.status) {
            case 200:
                statusMsg.innerHTML = '';
                usernameField.style.display = 'none';
                submit.onclick = stepTwo;
                username = usernameField.value.trim();
                document.querySelector('section#entry #auth-form #password-field').style.display = 'flex';
                break;
            case 403:
                statusMsg.innerHTML = 'Complete your registration first!'
                usernameField.style.display = 'none';
                submit.onclick = stepThree;
                username = usernameField.value.trim();
                document.querySelector('section#entry #auth-form #password-field').style.display = 'flex';
                document.querySelector('section#entry #auth-form #repassword-field').style.display = 'flex';
                break;
            case 404:
                statusMsg.innerHTML = 'Writer not found!';
                usernameField.style.border = '2px red solid';
                break;
            case 500:
            default:
                statusMsg.innerHTML = 'Something went wrong!';
                break;
        }
        submit.style.pointerEvents = 'all';
    } catch (e) {
        console.log(e)
        statusMsg.innerHTML = 'Something went wrong!';
        submit.style.pointerEvents = 'all';
    }

}

const stepTwo = async () => {
    const statusMsg = document.querySelector('#auth-form #status')
    const submit = document.querySelector('#auth-form .main-button');
    const passwordField = document.querySelector('section#entry #auth-form #password-field');
    if (passwordField.value.trim().length < 8 || passwordField.value.toUpperCase().length > 32) {
        passwordField.style.border = '2px red solid';
        statusMsg.innerHTML = 'Enter valid password!';
        return;
    }

    passwordField.style.border = 'none';
    statusMsg.innerHTML = 'Loading...';
    submit.style.pointerEvents = 'none';

    try {
        const res = await fetch(
            './', {
            method: 'PATCH',
            body: JSON.stringify({
                mode: 'auth',
                username: username,
                password: passwordField.value.trim(),
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        );
        if (res.status == 200) {
            window.open('../', '_self');
            return;
        }

        if (res.status == 400) {
            passwordField.style.border = '2px red solid';
            statusMsg.innerHTML = 'Wrong Password!';
            submit.style.pointerEvents = 'all';
            return;
        }

    } catch (e) {
        console.log(e);
        passwordField.style.border = 'none';
        statusMsg.innerHTML = 'Something went wrong!';
        submit.style.pointerEvents = 'all';
    }
}

const stepThree = async () => {
    const statusMsg = document.querySelector('#auth-form #status')
    const submit = document.querySelector('#auth-form .main-button');
    const passwordField = document.querySelector('section#entry #auth-form #password-field');
    const repasswordField = document.querySelector('section#entry #auth-form #repassword-field');
    if (passwordField.value.trim().length < 8 || passwordField.value.toUpperCase().length > 32) {
        passwordField.style.border = '2px red solid';
        statusMsg.innerHTML = 'Enter valid password!';
        return;
    }

    if (passwordField.value.trim() !== repasswordField.value.trim()) {
        passwordField.style.border = '2px red solid';
        repasswordField.style.border = '2px red solid';
        statusMsg.innerHTML = 'Passwords Missmatched!';
        return;

    }

    passwordField.style.border = 'none';
    repasswordField.style.border = 'none';
    statusMsg.innerHTML = 'Loading...';
    submit.style.pointerEvents = 'none';
    password = passwordField.value.trim();
    stepFour();
}

const stepFour = () => {
    document.querySelector('#auth-form').style.display = 'none';
    document.querySelector('#complete-reg-form').style.display = 'flex';


    const statusMsg = document.querySelector('.options p#status-msg');
    const submit = document.querySelector('.options button.main-button');

    tags = [];
    const tagsField = document.querySelector('#fields .tags .header input');
    const tagsSubmit = document.querySelector('#fields .tags .header #tags-submit');
    const tagsContainer = document.querySelector('#fields .tags .body');
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

    selectedCategories = [];
    const categoriesContainer = document.querySelector('#fields #categories');
    categoriesContainer.innerHTML = '';
    for (let category of categories) {
        const categoryTile = document.createElement('div');
        categoryTile.setAttribute('id', category.id);
        categoryTile.classList.add('category-tile');

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


    selectedParentCategories = [];
    const parentCategoriesContainer = document.querySelector('#fields #classifications');
    parentCategoriesContainer.innerHTML = '';
    for (let parentCategory of parentCategories) {
        const parentCategoryTile = document.createElement('div');
        parentCategoryTile.setAttribute('id', parentCategory.id);
        parentCategoryTile.classList.add('category-tile');

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

    submit.onclick = async () => {
        const validation = completeProfileFormValidation();
        if (validation === undefined) return;

        console.log('HERE')
        try {
            statusMsg.innerHTML = 'Loading...';
            submit.style.pointerEvents = 'none';
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {

                if (xhr.status == 200) {
                    window.open('./', '_self');
                    return;
                }

                statusMsg.innerHTML = 'Something went wrong!';
                setTimeout(() => {
                    statusMsg.innerHTML = '';
                    submit.style.pointerEvents = 'all';
                }, 3000);
            }

            const data = new FormData();
            data.append('username', username);
            data.append('password', password);
            data.append('writer', JSON.stringify(validation));
            data.append('bgFree', bgfree);
            data.append('profile', profile);
            data.append('cover', cover);

            xhr.open('PATCH', './completeProfile/');
            xhr.send(data);
        } catch (e) {
            console.log(e);
            statusMsg.innerHTML = 'Something went wrong!';
            setTimeout(() => {
                statusMsg.innerHTML = '';
                submit.style.pointerEvents = 'all';
            }, 3000);
        }
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
