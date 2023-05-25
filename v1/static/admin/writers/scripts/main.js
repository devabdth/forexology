
const toggleWriterRow = (element) => {
    const collapse = element.childNodes[5];
    collapse.classList.toggle('active');
}

const openWriterFormDialog = () => {
    const emailField = document.querySelector('.confirmation-dialog#writer-form .body input.single-line-field');
    const clear = document.querySelector('.confirmation-dialog#writer-form .options button.shadow-button#clear');
    const cancel = document.querySelector('.confirmation-dialog#writer-form .options button.shadow-button#cancel');
    const submit = document.querySelector('.confirmation-dialog#writer-form .options button.main-button#submit');
    const statusMsg = document.querySelector('.confirmation-dialog#writer-form .options p#status-msg');

    submit.onclick = async () => {
        try {
            const re = `/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i`;
            if (emailField.value.trim().length < 8 || String(emailField.value.trim()).toLowerCase().match(re)) {
                statusMsg.innerHTML = 'Enter valid email!';
                emailField.style.border = '2px solid red';
                return;
            }
            statusMsg.innerHTML = '';
            emailField.style.border = 'none';

            const res = await fetch('./invitation/', {
                method: 'POST',
                body: JSON.stringify({ email: emailField.value.trim() }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (res.status === 201) {
                statusMsg.innerHTML = 'Invitation sent successfully! Updating Data!';
                setTimeout(() => {
                    window.open('./', '_self');
                }, 3000);
                return;
            } else if (res.status === 203) {
                statusMsg.innerHTML = 'Invitation was sent berfore!';
                return;

            }
            statusMsg.innerHTML = 'Try again later!';
            submit.innerHTML = 'Failed';
            clear.style.pointerEvents = 'none';
            submit.style.pointerEvents = 'none';
            cancel.style.pointerEvents = 'none';
            setTimeout(() => {
                statusMsg.innerHTML = '';
                submit.innerHTML = 'Submit';
                clear.style.pointerEvents = 'all';
                submit.style.pointerEvents = 'all';
                cancel.style.pointerEvents = 'all';
            }, 3000);
        } catch (e) {
            console.log(e);
            statusMsg.innerHTML = 'Try again later!';
            submit.innerHTML = 'Failed';
            clear.style.pointerEvents = 'none';
            submit.style.pointerEvents = 'none';
            cancel.style.pointerEvents = 'none';
            setTimeout(() => {
                statusMsg.innerHTML = '';
                submit.innerHTML = 'Submit';
                clear.style.pointerEvents = 'all';
                submit.style.pointerEvents = 'all';
                cancel.style.pointerEvents = 'all';
            }, 3000);
        }
    }
    document.querySelector('.confirmation-dialog#writer-form').style.display = 'flex';
    document.querySelector('.confirmation-dialog-overlay#writer-form').style.display = 'flex';
}

const closeWriterForm = () => {
    document.querySelector('.confirmation-dialog#writer-form').style.display = 'none';
    document.querySelector('.confirmation-dialog-overlay#writer-form').style.display = 'none';
}

const closeInvitationsForm = () => {
    document.querySelector('.form-dialog#invitations-dialog').style.display = 'none';
    document.querySelector('.form-dialog-overlay#invitations-dialog').style.display = 'none';
}

const openInvitationsForm = () => {
    document.querySelector('.form-dialog#invitations-dialog').style.display = 'flex';
    document.querySelector('.form-dialog-overlay#invitations-dialog').style.display = 'flex';
}

const deleteInvitation = async (email) => {
    const statusMsg = document.querySelector('.form-dialog#invitations-dialog .options p#status-msg');
    const dialogActions = document.querySelectorAll('.form-dialog#invitations-dialog .options table td button.shadow-button');
    try {
        statusMsg.innerHTML = 'Loading!';
        dialogActions.forEach(da => { da.style.pointerEvents = 'none' });

        const res = await fetch('./invitation/', {
            method: 'DELETE',
            body: JSON.stringify({ email: email }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status === 200) {
            window.open('./', '_self');
            return;
        }
        statusMsg.innerHTML = 'Try again Later!';
        dialogActions.forEach(da => { da.style.pointerEvents = 'none' });
        setTimeout(() => {
            dialogActions.forEach(da => { da.style.pointerEvents = 'all' });
        }, 3000);

    } catch (e) {
        console.log(e);
        statusMsg.innerHTML = 'Try again Later!';
        dialogActions.forEach(da => { da.style.pointerEvents = 'none' });
        setTimeout(() => {
            dialogActions.forEach(da => { da.style.pointerEvents = 'all' });
        }, 3000);

    }
}