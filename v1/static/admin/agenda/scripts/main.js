let snippets;

const init = (snippets_) => {
    snippets = snippets_;
}

const openAgendaSnippetEditDialog= (snippet)=> {
    document.querySelector('div.form-dialog#agenda-snippet-dialog .header h2').innerHTML = 'Update Snippet'
    document.querySelector('div.form-dialog#agenda-snippet-dialog .options .main-button').innerHTML = 'Update';
    document.querySelector('div.form-dialog#agenda-snippet-dialog .options .main-button').onclick = ()=> {updateAgendaSnippet(snippet['id'])};
    const form = document.querySelector('div.form-dialog#agenda-snippet-dialog');
    form.style.display = 'flex';
    form.querySelector('form').action= ()=> {updateAgendaSnippet(snippetId)};
    console.log(form.querySelector('form').action)
    form.querySelector('input#timestamp').value= (date => new Date(new Date(snippet['timestamp']).getTime() + new Date(snippet['timestamp']).getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 19))();
    form.querySelector('input#en-event').value= snippet['event']['EN'];
    form.querySelector('input#ar-event').value= snippet['event']['AR'];
    form.querySelector('textarea#en-comment').value= snippet['comment']['EN'];
    form.querySelector('textarea#ar-comment').value= snippet['comment']['AR'];
    form.querySelector('input#previous').value= snippet['previous'];
    form.querySelector('input#forecast').value= snippet['forecast'];
    form.querySelector('input#actual').value= snippet['actual'];
    form.querySelector(`input#country-${snippet['country_code']}`).checked= true;
    form.querySelector(`input#power-${snippet['power']}`).checked= true;
    const formOverlay = document.querySelector('div.form-dialog-overlay#agenda-snippet-dialog');
    formOverlay.style.display = 'flex';    
}

const updateAgendaSnippet= async (snippetId) => {
    let countryCode, power, timestampValue;
    const statusMsg = document.querySelector('div.form-dialog#agenda-snippet-dialog .options #status-msg');

    const timestampField = document.querySelector('div.form-dialog#agenda-snippet-dialog .body form input.single-line-field#timestamp');
    try {
        const timestamp = new Date(timestampField.value).getTime();
        const now = new Date().getTime();
        if (timestamp > now) {
            timestampValue = timestamp;
        } else {
            statusMsg.innerHTML = 'Please, Select valid date and time!';
            return;
        }
    } catch (e) {
        console.log(e)
        statusMsg.innerHTML = 'Please, Select valid date and time!';
        return;
    }

    const enEvent = document.querySelector('div.form-dialog#agenda-snippet-dialog .body form input.single-line-field#en-event');
    if (enEvent.value.trim().length < 8 && enEvent.value.trim().length < 128) {
        statusMsg.innerHTML = 'Please, Enter a valid english event name!';
        enEvent.style.border = '2px red solid';
        return;
    }
    statusMsg.innerHTML = '';
    enEvent.style.border = 'none';

    const arEvent = document.querySelector('div.form-dialog#agenda-snippet-dialog .body form input.single-line-field#ar-event');
    if (arEvent.value.trim().length < 8 && arEvent.value.trim().length < 128) {
        statusMsg.innerHTML = 'Please, Enter a valid arabic event name!';
        arEvent.style.border = '2px red solid';
        return;
    }
    statusMsg.innerHTML = '';
    arEvent.style.border = 'none';

    const previous = document.querySelector('div.form-dialog#agenda-snippet-dialog .body form input.single-line-field#previous');
    if (previous.value.trim().length === 0) {
        statusMsg.innerHTML = 'Please, Enter a valid previous value!';
        previous.style.border = '2px red solid';
        return;
    }
    statusMsg.innerHTML = '';
    previous.style.border = 'none';

    const forecast = document.querySelector('div.form-dialog#agenda-snippet-dialog .body form input.single-line-field#forecast');
    if (forecast.value.trim().length === 0) {
        statusMsg.innerHTML = 'Please, Enter a valid forecast value!';
        forecast.style.border = '2px red solid';
        return;
    }
    statusMsg.innerHTML = '';
    forecast.style.border = 'none';

    const enComment = document.querySelector('div.form-dialog#agenda-snippet-dialog .body form textarea.mutli-line-field#en-comment');
    const arComment = document.querySelector('div.form-dialog#agenda-snippet-dialog .body form textarea.mutli-line-field#ar-comment');
    if (!(enComment.value.trim().length === 0 && arComment.value.trim().length === 0)) {
        if (enComment.value.trim().length < 32 && enComment.value.trim().length < 128) {
            statusMsg.innerHTML = 'Please, Enter a valid english comment!';
            enComment.style.border = '2px red solid';
            return;
        }
        statusMsg.innerHTML = '';
        enComment.style.border = 'none';

        if (arComment.value.trim().length < 32 && arComment.value.trim().length < 128) {
            statusMsg.innerHTML = 'Please, Enter a valid arabic comment!';
            arComment.style.border = '2px red solid';
            return;
        }
        statusMsg.innerHTML = '';
        arComment.style.border = 'none';

    }
    try {
        countryCode = document.querySelector('input[name= "country-code"]:checked').value
    } catch (e) {
        statusMsg.innerHTML = 'Please, Select country code of the event!';
        return;
    }

    try {
        power = document.querySelector('input[name= "power"]:checked').value
    } catch (e) {
        statusMsg.innerHTML = 'Please, Select power of the event!';
        return;
    }

    const newSnippet = {
        event: {
            EN: enEvent.value.trim(),
            AR: arEvent.value.trim(),
        },
        comment: {
            EN: enComment.value.trim(),
            AR: arComment.value.trim(),
        },
        countryCode: countryCode,
        power: power,
        timestamp: timestampValue,
        actual: Number.parseFloat(actual.value.trim()),
        forecast: Number.parseFloat(forecast.value.trim()),
        previous: Number.parseFloat(previous.value.trim()),
        id: snippetId
    }

    const submit = document.querySelector('div.form-dialog#agenda-snippet-dialog .options button.main-button');
    submit.innerHTML = 'Loading...';
    statusMsg.innerHTML = 'Updating agenda snippet!';
    submit.onclick = () => { }

    try {
        const res = await fetch(`./${snippetId}/`, {
            method: 'PATCH',
            body: JSON.stringify(newSnippet),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 200) {
            window.open('./', '_self');
            return;
        }
        console.log(res.status)
        submit.innerHTML = 'Failed';
        statusMsg.innerHTML = 'Try again later!';
        setInterval(() => {
            submit.innerHTML = 'Create';
            submit.onclick = createAgendaSnippet;
            statusMsg.innerHTML = '';
        }, 3000);
    } catch (e) {
        console.log(e);
        submit.innerHTML = 'Failed';
        statusMsg.innerHTML = 'Try again later!';
        setInterval(() => {
            submit.innerHTML = 'Create';
            submit.onclick = createAgendaSnippet;
            statusMsg.innerHTML = '';
        }, 3000);
    }
}

const openCreateSnippetDialog = () => {
    document.querySelector('div.form-dialog#agenda-snippet-dialog .header h2').innerHTML = 'Create'
    document.querySelector('div.form-dialog#agenda-snippet-dialog .options .main-button').innerHTML = 'Create';
    document.querySelector('div.form-dialog#agenda-snippet-dialog .options .main-button').onclick = createAgendaSnippet;
    const form = document.querySelector('div.form-dialog#agenda-snippet-dialog');
    form.style.display = 'flex';
    form.querySelector('form').action= createAgendaSnippet;
    const formOverlay = document.querySelector('div.form-dialog-overlay#agenda-snippet-dialog');
    formOverlay.style.display = 'flex';

}

const closeCreateSnippetDialog = () => {
    document.querySelector('div.form-dialog#agenda-snippet-dialog .options #status-msg').innerHTML = ''
    document.querySelectorAll('div.form-dialog#agenda-snippet-dialog .single-line-field').forEach(e => { e.value = ''; })
    document.querySelectorAll('div.form-dialog#agenda-snippet-dialog .mutli-line-field').forEach(e => { e.value = ''; })
    const form = document.querySelector('div.form-dialog#agenda-snippet-dialog');
    form.style.display = 'none';
    const formOverlay = document.querySelector('div.form-dialog-overlay#agenda-snippet-dialog');
    formOverlay.style.display = 'none';

}

const createAgendaSnippet = async () => {
    let countryCode, power, timestampValue;
    const statusMsg = document.querySelector('div.form-dialog#agenda-snippet-dialog .options #status-msg');

    const timestampField = document.querySelector('div.form-dialog#agenda-snippet-dialog .body form input.single-line-field#timestamp');
    try {
        const timestamp = new Date(timestampField.value).getTime();
        const now = new Date().getTime();
        if (timestamp > now) {
            timestampValue = timestamp;
        } else {
            statusMsg.innerHTML = 'Please, Select valid date and time!';
            return;
        }
    } catch (e) {
        console.log(e)
        statusMsg.innerHTML = 'Please, Select valid date and time!';
        return;
    }

    const enEvent = document.querySelector('div.form-dialog#agenda-snippet-dialog .body form input.single-line-field#en-event');
    if (enEvent.value.trim().length < 8 && enEvent.value.trim().length < 128) {
        statusMsg.innerHTML = 'Please, Enter a valid english event name!';
        enEvent.style.border = '2px red solid';
        return;
    }
    statusMsg.innerHTML = '';
    enEvent.style.border = 'none';

    const arEvent = document.querySelector('div.form-dialog#agenda-snippet-dialog .body form input.single-line-field#ar-event');
    if (arEvent.value.trim().length < 8 && arEvent.value.trim().length < 128) {
        statusMsg.innerHTML = 'Please, Enter a valid arabic event name!';
        arEvent.style.border = '2px red solid';
        return;
    }
    statusMsg.innerHTML = '';
    arEvent.style.border = 'none';

    const previous = document.querySelector('div.form-dialog#agenda-snippet-dialog .body form input.single-line-field#previous');
    if (previous.value.trim().length === 0) {
        statusMsg.innerHTML = 'Please, Enter a valid previous value!';
        previous.style.border = '2px red solid';
        return;
    }
    statusMsg.innerHTML = '';
    previous.style.border = 'none';

    const forecast = document.querySelector('div.form-dialog#agenda-snippet-dialog .body form input.single-line-field#forecast');
    if (forecast.value.trim().length === 0) {
        statusMsg.innerHTML = 'Please, Enter a valid forecast value!';
        forecast.style.border = '2px red solid';
        return;
    }
    statusMsg.innerHTML = '';
    forecast.style.border = 'none';

    const enComment = document.querySelector('div.form-dialog#agenda-snippet-dialog .body form textarea.mutli-line-field#en-comment');
    const arComment = document.querySelector('div.form-dialog#agenda-snippet-dialog .body form textarea.mutli-line-field#ar-comment');
    if (!(enComment.value.trim().length === 0 && arComment.value.trim().length === 0)) {
        if (enComment.value.trim().length < 32 && enComment.value.trim().length < 128) {
            statusMsg.innerHTML = 'Please, Enter a valid english comment!';
            enComment.style.border = '2px red solid';
            return;
        }
        statusMsg.innerHTML = '';
        enComment.style.border = 'none';

        if (arComment.value.trim().length < 32 && arComment.value.trim().length < 128) {
            statusMsg.innerHTML = 'Please, Enter a valid arabic comment!';
            arComment.style.border = '2px red solid';
            return;
        }
        statusMsg.innerHTML = '';
        arComment.style.border = 'none';

    }
    try {
        countryCode = document.querySelector('input[name= "country-code"]:checked').value
    } catch (e) {
        statusMsg.innerHTML = 'Please, Select country code of the event!';
        return;
    }

    try {
        power = document.querySelector('input[name= "power"]:checked').value
    } catch (e) {
        statusMsg.innerHTML = 'Please, Select power of the event!';
        return;
    }

    const snippet = {
        event: {
            EN: enEvent.value.trim(),
            AR: arEvent.value.trim(),
        },
        comment: {
            EN: enComment.value.trim(),
            AR: arComment.value.trim(),
        },
        countryCode: countryCode,
        power: power,
        timestamp: timestampValue,
        actual: Number.parseFloat(actual.value.trim()),
        forecast: Number.parseFloat(forecast.value.trim()),
        previous: Number.parseFloat(previous.value.trim()),
    }

    const submit = document.querySelector('div.form-dialog#agenda-snippet-dialog .options button.main-button');
    submit.innerHTML = 'Loading...';
    statusMsg.innerHTML = 'Creating new agenda snippet!';
    submit.onclick = () => { }

    try {
        const res = await fetch('./', {
            method: 'POST',
            body: JSON.stringify(snippet),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 201) {
            window.open('./', '_self');
            return;
        }
        console.log(res.status)
        submit.innerHTML = 'Failed';
        statusMsg.innerHTML = 'Try again later!';
        setInterval(() => {
            submit.innerHTML = 'Create';
            submit.onclick = createAgendaSnippet;
            statusMsg.innerHTML = '';
        }, 3000);
    } catch (e) {
        console.log(e);
        submit.innerHTML = 'Failed';
        statusMsg.innerHTML = 'Try again later!';
        setInterval(() => {
            submit.innerHTML = 'Create';
            submit.onclick = createAgendaSnippet;
            statusMsg.innerHTML = '';
        }, 3000);

    }
}

const openDeleteAgendaSnippetDialog= (snippet) => {
    const form= document.querySelector('div.form-dialog#delete-agenda-snippet-dialog');
    const overlay= document.querySelector('div.form-dialog-overlay#delete-agenda-snippet-dialog');

    form.querySelector('div.body p').innerHTML= `Are you sure, you want to delete this snippet (<span>${snippet['event']['EN']} - ${snippet['event']['AR']})</span>`;
    form.querySelector('button.main-button').onclick= ()=> {
        deleteAgendaSnippet(snippet['id']);
    }

    form.style.display= 'flex';
    overlay.style.display= 'flex';
}

const deleteAgendaSnippet= async (snippetId) => {
    const form= document.querySelector('div.form-dialog#delete-agenda-snippet-dialog');
    const submit= form.querySelector('div.options button.main-button');
    const statusMsg= form.querySelector('div.options p#status-msg')
    submit.innerHTML = 'Loading...';
    statusMsg.innerHTML = 'Deleting agenda snippet!';
    submit.onclick = () => { }

    try {
        const res= await fetch(`./${snippetId}`, {
            method: 'DELETE'
        });
        if (res.status === 200) {
            window.open('./', '_self');
            return;
        }
        console.log(res.status)
        submit.innerHTML = 'Failed';
        statusMsg.innerHTML = 'Try again later!';
        setInterval(() => {
            submit.innerHTML = 'Create';
            submit.onclick = createAgendaSnippet;
            statusMsg.innerHTML = '';
        }, 3000);

    } catch (e) {
        console.log(e);
        submit.innerHTML = 'Failed';
        statusMsg.innerHTML = 'Try again later!';
        setInterval(() => {
            submit.innerHTML = 'Create';
            submit.onclick = createAgendaSnippet;
            statusMsg.innerHTML = '';
        }, 3000);
       
    }
}