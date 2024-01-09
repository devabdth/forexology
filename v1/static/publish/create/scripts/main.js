// Necessary Data
let categories, parentCategories, audioArticleDuratio, enableLocalizations;
const initialize = (props) => {

    const actionsHeader = document.querySelector('#right-section .options#header');
    document.querySelector('#right-section').addEventListener('scroll', () => {
        if (document.querySelector('#right-section').scrollTop >= 50) {
            actionsHeader.style.boxShadow = '0 1vw 2vw 1px rgba(0, 0, 0, 0.25)';
            return;
        }
        actionsHeader.style.boxShadow = 'none';
        if (changeHeaderLogoOnScroll) document.querySelector('header #logo').style.backgroundImage = 'var(--logo-256-white)';
    })

    categories = props.categories;
    parentCategories = props.parentCategories;
   enableLocalizations= false;
   const localizationSwitch = document.getElementById('toggleSwitch');
    localizationSwitch.addEventListener('change', handleSwitchChange);

}
    function handleSwitchChange() {
   const localizationSwitch = document.getElementById('toggleSwitch');
        const isSwitchOn = localizationSwitch.checked;
        if (isSwitchOn) {
            Array.from(document.querySelectorAll('#ar-title')).forEach(e => {e.style.display= 'flex'});
            Array.from(document.querySelectorAll('#ar-short-brief')).forEach(e => {e.style.display= 'flex'});
            Array.from(document.querySelectorAll('#ar-cover-msg')).forEach(e => {e.style.display= 'flex'});
                        Array.from(document.querySelectorAll('.section-form #ar-title')).forEach(e => {e.style.display= 'flex'});
            Array.from(document.querySelectorAll('.section-form #ar-subtitle')).forEach(e => {e.style.display= 'flex'});
            Array.from(document.querySelectorAll('.section-form #ar-bio')).forEach(e => {e.style.display= 'flex'});
            Array.from(document.querySelectorAll('.section-form #ar-media-message')).forEach(e => {e.style.display= 'flex'});

            enableLocalizations= true;
        } else {
            Array.from(document.querySelectorAll('#ar-title')).forEach(e => {e.style.display= 'none'});
            Array.from(document.querySelectorAll('#ar-short-brief')).forEach(e => {e.style.display= 'none'});
            Array.from(document.querySelectorAll('#ar-cover-msg')).forEach(e => {e.style.display= 'none'});
                        Array.from(document.querySelectorAll('.section-form #ar-title')).forEach(e => {e.style.display= 'none'});
            Array.from(document.querySelectorAll('.section-form #ar-subtitle')).forEach(e => {e.style.display= 'none'});
            Array.from(document.querySelectorAll('.section-form #ar-bio')).forEach(e => {e.style.display= 'none'});
            Array.from(document.querySelectorAll('.section-form #ar-media-message')).forEach(e => {e.style.display= 'none'});

            enableLocalizations= false;
        }
    }

const selectCategory = (catId) => {
    const btn = document.querySelector('button.categories-dropbtn');
    selectedCategory = catId;
    categoryData = categories.filter((cat) => cat.id === catId)[0];
    if (!categoryData) toast({ msg: 'Category not found!' });
    btn.innerHTML = categoryData.name['EN'];
}

const selectParentCategory = (pcatId) => {
    const btn = document.querySelector('button.classification-dropbtn');
    selectedParentCategory = pcatId;
    parentCategoryData = parentCategories.filter(pcat => pcat.id === pcatId)[0];
    if (!parentCategoryData) toast({ msg: 'Classification not found!' });
    btn.innerHTML = parentCategoryData.name['EN'];
}

// Article Paramaters
let tags, sectionCovers, sectionAudios, sectionVideos, selectedCategory, selectedParentCategory, audioArticle, cover;

window.onload = () => {
    sectionCovers = {};
    sectionAudios = {};
    sectionVideos = {};
    tags = [];
    const tagsField = document.querySelector('.tags .header input');
    const tagsSubmit = document.querySelector('.tags .header #tags-submit');
    const tagsContainer = document.querySelector('.tags .body');
    tagsSubmit.onclick = () => {

        if (tagsField.value.trim().length === 0) {
            tagsField.style.border = '1px red solid';
            return;
        }

        if ((tags ?? []).includes(tagsField.value.trim())) {
            tagsField.style.border = '1px red solid';
            toast({ msg: 'Tag is already existed!' });
            return;
        }

        tagsField.style.border = 'none';
        tags.push(tagsField.value.trim());
        tagsField.value = '';
        generateTagsTiles(tagsContainer);
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

const toast = (props) => {
    const toastDiv = document.querySelector('div#toast');
    toastDiv.innerHTML = props.msg;
    toastDiv.style.display = 'flex';
    toastDiv.style.opacity = '0';
    setTimeout(() => {
        toastDiv.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        toastDiv.style.opacity = '0';
    }, 3010);

    setTimeout(() => {
        toastDiv.style.display = 'none';
    }, 3040);
}

// Files Pickers
const selectAudioFile = () => {
    const fileNameDisplay = document.querySelector('#audio-selection #selected-audio-file');
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".mp3,.aac");
    input.onchange = e => {
        if (e.target.files.length === 0) {
            return;
        }
        const file_ = e.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
            const passivePlayer = document.createElement('audio');
            passivePlayer.src = reader.result;
            passivePlayer.load();
            toast({ msg: 'Loading article\'s audio!' });
            setTimeout(() => {
                audioArticleDuratio = passivePlayer.duration;
                toast({ msg: 'Article\'s audio loaded successfully!' });
            }, 5000);
            audioArticle = file_;
            fileNameDisplay.innerHTML = file_.name.split('.')[0].length > 10 ? `${file_.name[0].substring(0, 6)}...${file_.name.split('.')[0].slice(-6)}.${file_.name.split('.')[1]}` : file_.name;
        }
        reader.readAsDataURL(file_)
    }
    input.click();

}

const selectSectionAudioFile = (section) => {
    const fileNameDisplay = section.querySelector('.media-selector p');
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".mp3,.aac");
    input.onchange = e => {
        if (e.target.files.length === 0) {
            return;
        }
        const file_ = e.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
            sectionAudios[section.id] = file_;
            fileNameDisplay.innerHTML = 'Picked File: ' + (file_.name.split('.')[0].length > 10 ? `${file_.name[0].substring(0, 6)}...${file_.name.split('.')[0].slice(-6)}.${file_.name.split('.')[1]}` : file_.name);
        }
        reader.readAsDataURL(file_)
    }
    input.click();

}


const selectSectionVideoFile = (section) => {
    const fileNameDisplay = section.querySelector('.media-selector p');
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".mp4,.mpg,.mpeg,.m2v,.flv");
    input.onchange = e => {
        if (e.target.files.length === 0) {
            return;
        }
        const file_ = e.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
            sectionVideos[section.id] = file_;
            fileNameDisplay.innerHTML = 'Picked File: ' + (file_.name.split('.')[0].length > 10 ? `${file_.name[0].substring(0, 6)}...${file_.name.split('.')[0].slice(-6)}.${file_.name.split('.')[1]}` : file_.name);
        }
        reader.readAsDataURL(file_)
    }
    input.click();

}


const pickImage = (container, props) => {
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
            if (props.coverSize) container.style.backgroundSize = 'cover';
            switch (props.mode) {
                case 'COVER':
                    cover = file_;
                    break;
                case 'SECTION_COVER':
                    sectionCovers[props.sectionId] = file_;
                    break;
            }
        }
        reader.readAsDataURL(file_)
    }
    input.click();
}


const newSection = () => {
    const container = document.querySelector('#right-section');
    const section = document.createElement('div');
    section.classList.add('body-card');
    section.classList.add('section-form');
    section.setAttribute('id', document.querySelectorAll('.body-card.section-form').length)
    section.innerHTML = `
    <h2>Section ${section.id}</h2>
    <div class="fields-row">
        <label id="en-title">English Title</label>
        <label id="ar-title">Arabic Title</label>
        <input class="single-line-field" id="en-title" placeholder="English Title" />
        <input class="single-line-field" id="ar-title" placeholder="Arabic Title" />
    </div>
    <div class="fields-row">
        <label id="en-subtitle">English Subtitle</label>
        <label id="ar-subtitle">Arabic Subtitle</label>
        <input class="single-line-field" id="en-subtitle" placeholder="English Subtitle" />
        <input class="single-line-field" id="ar-subtitle" placeholder="Arabic Subtitle" />
    </div>
    <div class="fields-row">
        <label id="en-bio">English Bio</label>
        <label id="ar-bio">Arabic Bio</label>
        <textarea class="mutli-line-field" id="en-bio" placeholder="English Bio"></textarea>
        <textarea class="mutli-line-field" id="ar-bio" placeholder="Arabic Bio"></textarea>
    </div>
    <div class="fields-row">
        <label>Media Type</label>
        <label>Media</label>
        <div id="media-tiles">
            <div class="media-tile active" id="no-media" onclick="selectMediaType(this.parentNode.parentNode, this, 'NO_MEDIA')">No Media</div>
            <div class="media-tile" id="image" onclick="selectMediaType(this.parentNode.parentNode, this, 'IMAGE')">Image</div>
            <div class="media-tile" id="audio" onclick="selectMediaType(this.parentNode.parentNode, this, 'AUDIO')">Audio</div>
            <div class="media-tile" id="video" onclick="selectMediaType(this.parentNode.parentNode, this, 'VIDEO')">Video</div>
        </div>
        <div class="media-selector"></div>
    </div>
    <label>Audio Stop</label>
    <input type="number" class="single-line-field" id="audio-stop" placeholder="Audio Stop (seconds)" />
    <div class="fields-row">
        <label>English Media Message</label>
        <label id="ar-media-message">Arabic Media Message</label>
        <textarea class="mutli-line-field" id="en-media-message" placeholder="English Media Message"></textarea>
        <textarea class="mutli-line-field" id="ar-media-message" placeholder="Arabic Media Message"></textarea>
    </div>
    <div class="options">
        <button class="shadow-button" onclick="deleteSection(this.parentNode.parentNode)">Delete</button>
        <button class="main-button" onclick="validateSection(this.parentNode.parentNode, true)">Check</button>
    </div>
    `

    container.insertBefore(section, container.childNodes[(container.childNodes.length - 2)]);
    handleSwitchChange()
}

const deleteSection = (instance) => {
    const container = document.querySelector('#right-section');
    container.removeChild(instance);
}

const selectMediaType = (section, tile, type) => {
    if (tile.classList.contains('active')) return;
    const activeTile = section.querySelector('.media-tile.active');
    if (activeTile != undefined) activeTile.classList.remove('active');
    const mediaSelector = section.querySelector('.media-selector');
    mediaSelector.innerHTML = '';
    delete sectionCovers[section.parentNode.id];
    delete sectionAudios[section.parentNode.id];
    delete sectionVideos[section.parentNode.id];
    switch (type) {
        case 'NO_MEDIA':
            tile.classList.add('active');
            break;
        case 'IMAGE':
            console.log('Here')
            tile.classList.add('active');
            const imagePicker = document.createElement('div');
            imagePicker.classList.add('image-picker');
            imagePicker.onclick = () => { pickImage(imagePicker, { mode: 'SECTION_COVER', sectionId: section.parentNode.id }) };
            mediaSelector.appendChild(imagePicker);
            break;
        case 'AUDIO':
            tile.classList.add('active');
            mediaSelector.innerHTML = `
            <p class="shadow-button" style="text-decoration: none"></p>
            <button class="shadow-button" onclick="selectSectionAudioFile(this.parentNode.parentNode.parentNode)">Pick Audio</button>
            `;
            break;
        case 'VIDEO':
            tile.classList.add('active');
            mediaSelector.innerHTML = `
            <p class="shadow-button" style="text-decoration: none"></p>
            <button class="shadow-button" onclick="selectSectionVideoFile(this.parentNode.parentNode.parentNode)">Pick Video</button>
            `;
            break;
    }
}


const articleInfoFormValidation = () => {
    const enTitleField = document.querySelector('input.single-line-field#en-title');
    const arTitleField = document.querySelector('input.single-line-field#ar-title');
    const enShortBriefField = document.querySelector('input.single-line-field#en-short-brief');
    const arShortBriefField = document.querySelector('input.single-line-field#ar-short-brief');
    const enCoverMsgField = document.querySelector('textarea.mutli-line-field#en-cover-msg');
    const arCoverMsgField = document.querySelector('textarea.mutli-line-field#ar-cover-msg');
    const tagsField = document.querySelector('.tags .header input.single-line-field');

    if (enTitleField.value.trim().length < 8) {
        toast({ msg: 'Enter a valid english title!' });
        enTitleField.style.border = '2px red solid';
        return;
    }
    enTitleField.style.border = 'none';

    if (enableLocalizations) {
        if (arTitleField.value.trim().length < 8) {
            toast({ msg: 'Enter a valid arabic title!' });
            arTitleField.style.border = '2px red solid';
            return;
        }
        arTitleField.style.border = 'none';
    }


    if (enShortBriefField.value.trim().length < 8) {
        toast({ msg: 'Enter a valid english short brief!' });
        enShortBriefField.style.border = '2px red solid';
        return;
    }
    enShortBriefField.style.border = 'none';

    if (enableLocalizations) {
        if (arShortBriefField.value.trim().length < 8) {
            toast({ msg: 'Enter a valid arabic short brief!' });
            arShortBriefField.style.border = '2px red solid';
            return;
        }
        arShortBriefField.style.border = 'none';
    }
    if (selectedCategory === undefined) {
        toast({ msg: 'Select article\'s category!' });
        return;
    }

    if (selectedParentCategory === undefined) {
        toast({ msg: 'Select article\'s classification!' });
        return;
    }

    if (cover === undefined) {
        toast({ msg: 'Select article\'s cover!' });
        return;
    }

    if (enCoverMsgField.value.trim().length > 8 || arCoverMsgField.value.trim().length > 8) {
        if (enCoverMsgField.value.trim().length < 8) {
            toast({ msg: 'Enter a valid english cover message!' });
            enCoverMsgField.style.border = '2px red solid';
            return;
        }
        enCoverMsgField.style.border = 'none';

        if (enableLocalizations) {
            if (arCoverMsgField.value.trim().length < 8) {
                toast({ msg: 'Enter a valid arabic cover message!' });
                arCoverMsgField.style.border = '2px red solid';
                return;
            }
            arCoverMsgField.style.border = 'none';
    }
    } else {
        enCoverMsgField.style.border = 'none';
        arCoverMsgField.style.border = 'none';
    }

    if (tags === undefined || tags.length < 5) {
        toast({ msg: 'Select at least 5 tags!' });
        return;
    }

    return {
        title: enableLocalizations ?{
            EN: enTitleField.value.trim(),
            AR: arTitleField.value.trim(),
        } :{
            EN: enTitleField.value.trim(),
            AR: enTitleField.value.trim(),
        },
        short_brief: enableLocalizations?{
            EN: enShortBriefField.value.trim(),
            AR: arShortBriefField.value.trim(),
        }:{
            EN: enShortBriefField.value.trim(),
            AR: enShortBriefField.value.trim(),
        },
        cover_attached_msg: enableLocalizations?{
            EN: enCoverMsgField.value.trim(),
            AR: arCoverMsgField.value.trim(),
        }:{
            EN: enCoverMsgField.value.trim(),
            AR: enCoverMsgField.value.trim(),
        },
        category: selectedCategory,
        parent_category: selectedParentCategory,
        tags: tags,
        record_available: audioArticle !== undefined,
        saves: [],
        ratings: [],
        comments: [],
        thread: '',
    }
}

const validateSection = (container, wToast) => {
    let mediaType;
    const enTitleField = container.querySelector('input.single-line-field#en-title');
    const arTitleField = container.querySelector('input.single-line-field#ar-title');
    const enSubtitleField = container.querySelector('input.single-line-field#en-subtitle');
    const arSubtitleField = container.querySelector('input.single-line-field#ar-subtitle');
    const enBioField = container.querySelector('textarea.mutli-line-field#en-bio');
    const arBioField = container.querySelector('textarea.mutli-line-field#ar-bio');
    const enMediaMsgField = container.querySelector('textarea.mutli-line-field#en-media-message');
    const arMediaMsgField = container.querySelector('textarea.mutli-line-field#ar-media-message');
    const audioStopField = container.querySelector('input.single-line-field#audio-stop');
    const sectionName = container.querySelector('h2').innerHTML;
    const sectionId = sectionName.split(' ')[1];
    const activeMediaTile = container.querySelector('.media-tile.active');


    if (enTitleField.value.trim().length < 8) {
        toast({ msg: sectionName + ': Enter a valid english title!' });
        enTitleField.style.border = '2px red solid';
        return;
    }
    enTitleField.style.border = 'none';

    if (enableLocalizations) {
        if (arTitleField.value.trim().length < 8) {
            toast({ msg: sectionName + ': Enter a valid arabic title!' });
            arTitleField.style.border = '2px red solid';
            return;
        }
        arTitleField.style.border = 'none';
    }


    if (enSubtitleField.value.trim().length > 8 || arSubtitleField.value.trim().length > 8) {
        if (enSubtitleField.value.trim().length < 8) {
            toast({ msg: sectionName + ': Enter a valid english cover message!' });
            enSubtitleField.style.border = '2px red solid';
            return;
        }
        enSubtitleField.style.border = 'none';

        if (enableLocalizations) {
            if (arSubtitleField.value.trim().length < 8) {
                toast({ msg: sectionName + ': Enter a valid arabic cover message!' });
                arSubtitleField.style.border = '2px red solid';
                return;
            }
            arSubtitleField.style.border = 'none';
        }
    } else {
        enSubtitleField.style.border = 'none';
        arSubtitleField.style.border = 'none';
    }


    if (enBioField.value.trim().length < 64) {
        toast({ msg: sectionName + ': Enter a valid english bio!' });
        enBioField.style.border = '2px red solid';
        return;
    }
    enBioField.style.border = 'none';

    if (enableLocalizations) {
        if (arBioField.value.trim().length < 64) {
            toast({ msg: sectionName + ': Enter a valid arabic bio!' });
            arBioField.style.border = '2px red solid';
            return;
        }
        arBioField.style.border = 'none';
    }

    if (activeMediaTile === undefined) {
        toast({ msg: sectionName + ': Select media type!' });
        return;
    }

    if (activeMediaTile.id !== 'no-media') {
        switch (activeMediaTile.id) {
            case 'image':
                if (sectionCovers[sectionId] === undefined) {
                    toast({ msg: sectionName + ': Select image!' });
                    return;
                }
                mediaType = 'IMAGE';
                break;
            case 'video':
                if (sectionVideos[sectionId] === undefined) {
                    toast({ msg: sectionName + ': Select video!' });
                    return;
                }
                mediaType = 'VIDEO';
                break;
            case 'audio':
                if (sectionAudios[sectionId] === undefined) {
                    toast({ msg: sectionName + ': Select audio!' });
                    return;
                }
                mediaType = 'AUDIO';
                break;
        }
    } else {
        mediaType = 'NO_MEDIA';
    }

    if (audioArticle !== undefined) {
        let selectedDuration = (Number.parseInt(audioStopField.value.trim()));
        console.log(selectedDuration);
        if (selectedDuration === undefined || audioStopField.value.trim().length == 0 || (selectedDuration <= 0 || selectedDuration > audioArticleDuratio)) {
            toast({ msg: sectionName + ': Define a valid article audio stop!' });
            return;
        }
    }

    if (enMediaMsgField.value.trim().length > 8 || arMediaMsgField.value.trim().length > 8) {
        if (enMediaMsgField.value.trim().length < 8) {
            toast({ msg: 'Enter a valid english media message!' });
            enMediaMsgField.style.border = '2px red solid';
            return;
        }
        enMediaMsgField.style.border = 'none';

    if (enableLocalizations) {
            if (arMediaMsgField.value.trim().length < 8) {
                toast({ msg: 'Enter a valid arabic media message!' });
                arMediaMsgField.style.border = '2px red solid';
                return;
            }
            arMediaMsgField.style.border = 'none';
        } else {
            enMediaMsgField.style.border = 'none';
            arMediaMsgField.style.border = 'none';
        }
    }


    if (wToast) toast({ msg: sectionName + ': Section is completed!' });
    return {
        title: enableLocalizations ? {
            EN: enTitleField.value.trim(),
            AR: arTitleField.value.trim(),
        }:{
            EN: enTitleField.value.trim(),
            AR: enTitleField.value.trim(),
        },
        subtitle: enableLocalizations ? {
            EN: enSubtitleField.value.trim(),
            AR: arSubtitleField.value.trim(),
        }:{
            EN: enSubtitleField.value.trim(),
            AR: enSubtitleField.value.trim(),
        },
        bio: enableLocalizations ? {
            EN: enBioField.value.trim(),
            AR: arBioField.value.trim(),
        }:{
            EN: enBioField.value.trim(),
            AR: enBioField.value.trim(),
        },
        attachement_msg: enableLocalizations?{
            EN: enMediaMsgField.value.trim(),
            AR: arMediaMsgField.value.trim(),
        }:{
            EN: enMediaMsgField.value.trim(),
            AR: enMediaMsgField.value.trim(),
        },
        attachment_type: mediaType,
        id: sectionId,
        audio_stop: Number.parseFloat(audioStopField.value.trim()),

    }


}

const createArticle = () => {
    const loadingOverlay = document.querySelector('#loading-overlay');
    const loadingDialog = document.querySelector('#loading-dialog');
    try {
        const validation = articleInfoFormValidation();
        if (validation === undefined) return;

        const sections = document.querySelectorAll('.body-card.section-form');
        if (!sections || sections.length === 0) {
            toast({ msg: 'Create at least one section!' });
            return;
        }

        let articleSctions = [];
        for (let section of sections) {
            let sectionValidation = validateSection(section);
            if (sectionValidation === undefined) return;
            articleSctions.push(sectionValidation);
        }
        validation.sections = articleSctions;
        loadingOverlay.style.display = 'flex';
        loadingDialog.style.display = 'flex';

        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status === 201) {
                window.open('../articles/', '_self');
                return;
            } else {
                loadingOverlay.style.display = 'none';
                loadingDialog.style.display = 'none';
                toast({ msg: 'Failed, Try again later!' });
            }
        }

        const data = new FormData();
        data.append('data', JSON.stringify(validation));
        data.append('articleCover', cover);

        for (let k in sectionCovers) data.append(k, sectionCovers[k]);
        for (let k in sectionAudios) data.append(k, sectionAudios[k]);
        for (let k in sectionVideos) data.append(k, sectionVideos[k]);

        xhr.open('POST', './');
        xhr.send(data);
    } catch (e) {
        console.log(e);
        loadingOverlay.style.display = 'none';
        loadingDialog.style.display = 'none';
        toast({ msg: 'Failed, Try again later!' });
    }
}