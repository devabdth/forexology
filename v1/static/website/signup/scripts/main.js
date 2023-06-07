let lang, selectedWriters, username, email, password, profile, cover, profileReaderResult, coverReaderResult;
window.onload = () => {
    const profilePicker = document.querySelector('.form#profile-picker div.image-picker');
    profilePicker.onclick = () => {
        pickImage(profilePicker, {
            coverSize: false,
            listener: (readerResult, file) => {
                profile = file;
                profileReaderResult = readerResult;
            }
        });
    }
    const coverPicker = document.querySelector('.form#cover-picker div.image-picker');
    coverPicker.onclick = () => {
        pickImage(coverPicker, {
            coverSize: true,
            listener: (readerResult, file) => {
                cover = file;
                coverReaderResult = readerResult;
            }
        });
    }
    selectedWriters = [];
    inputElements = [...document.querySelectorAll('input.otp-field')]
    inputElements.forEach((ele, index) => {
        ele.addEventListener('keydown', (e) => {
            if (e.keyCode === 8 && e.target.value === '') inputElements[Math.max(0, index - 1)].focus()
        })
        ele.addEventListener('input', (e) => {
            const [first, ...rest] = e.target.value
            e.target.value = first ?? '' // first will be undefined when backspace was entered, so set the input to ""
            const lastInputBox = index === inputElements.length - 1
            const didInsertContent = first !== undefined
            if (didInsertContent && !lastInputBox) {
                // continue to input the rest of the string
                inputElements[index + 1].focus()
                inputElements[index + 1].value = rest.join('')
                inputElements[index + 1].dispatchEvent(new Event('input'))
            }
        })
    });

}
const confirmation = async () => {
    const form = document.querySelector('section #form');
    const nameField = document.querySelector('section div#form input.single-line-field-awhite#name');
    const emailField = document.querySelector('section div#form input.single-line-field-awhite#email');
    const passwordField = document.querySelector('section div#form input.single-line-field-awhite#password');
    const repasswordField = document.querySelector('section div#form input.single-line-field-awhite#repassword');
    const statusMsg = document.querySelector('#actions p#status-msg');
    const confirmBtn = document.querySelector('#actions button.main-button');

    if (nameField.value.trim().length < 8 || nameField.value.trim().length > 64) {
        statusMsg.innerHTML = lang == 'EN' ? 'Enter a valid name!' : 'أدخل اسم صحيح';
        nameField.style.border = '2px red solid';
        return;
    }
    nameField.style.border = 'none';

    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!(emailField.value.trim().length > 8 && String(emailField.value.trim()).toLowerCase().match(re))) {
        emailField.style.border = '2px red solid';
        statusMsg.innerHTML = lang == 'EN' ? 'Enter a valid email!' : 'البريد لإلكتروني لا يصلح';
        return;
    }

    emailField.style.border = 'none';


    if (passwordField.value.trim().length < 8 || passwordField.value.trim().length > 64) {
        statusMsg.innerHTML = lang == 'EN' ? 'Invalid Password!' : 'كلمة المرور لا تصلح';
        passwordField.style.border = '2px red solid';
        return;
    }
    passwordField.style.border = 'none';

    if (repasswordField.value.trim() !== passwordField.value.trim()) {
        statusMsg.innerHTML = lang == 'EN' ? 'Passwords Missmatched' : 'كلمتي المرور غير متطابقتين';
        passwordField.style.border = '2px red solid';
        repasswordField.style.border = '2px red solid';
        return;
    }
    passwordField.style.border = 'none';
    repasswordField.style.border = 'none';

    statusMsg.innerHTML = lang == 'EN' ? 'Loading...' : 'جاري التحميل';
    confirmBtn.style.pointerEvents = 'none'
    try {
        const res = await fetch('./', {
            method: 'PATCH',
            body: JSON.stringify({ email: emailField.value.trim(), mode: 'CHECKING_EMAIL_UNIQUENESS' }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (res.status === 200) {
            username = nameField.value.trim();
            email = emailField.value.trim();
            password = passwordField.value.trim();
            form.style.display = 'none';
            document.querySelector('section #email-validation-form').style.display = 'flex';
        } else if (res.status === 301) {
            statusMsg.innerHTML = lang == 'EN' ? 'Email is existed! Try to Login instead!' : 'الحساب موجود بالفعل، يمكنك أن تسجل الدخول';
            confirmBtn.style.pointerEvents = 'all';
            return;
        }
        statusMsg.innerHTML = lang == 'EN' ? 'Try again later' : 'الرجاء المحاولة لاحقاً';
        setTimeout(() => {
            statusMsg.innerHTML = '';
            confirmBtn.style.pointerEvents = 'all';
        }, 3000);

    } catch (e) {
        console.log(e);
        statusMsg.innerHTML = lang == 'EN' ? 'Try again later' : 'الرجاء المحاولة لاحقاً';
        setTimeout(() => {
            statusMsg.innerHTML = '';
            confirmBtn.style.pointerEvents = 'all';
        }, 3000);
    }
}


const codeValidation = async () => {
    const form = document.querySelector('.form#email-validation-form');
    const submission = document.querySelector('.form#email-validation-form #actions button.main-button');
    const statusMsg = document.querySelector('.form#email-validation-form #actions p#status-msg');

    const digitsField = Array.from({ length: 6 }, (_, i) => document.querySelector(`.form#email-validation-form #otp .otp-field#digit-${i}`))
    digitsField.forEach(digitField => {
        if (digitField.value.trim().length === 0 || Number.parseInt(digitField.value.trim()) == null) {
            digitField.style.border = '2px red solid';
            return;
        }
        digitField.style.border = '';
    });

    let code = '';
    for (let digitField of digitsField) code += `${Number.parseInt(digitField.value.trim())}`;

    statusMsg.innerHTML = lang === 'EN' ? 'Loading...' : 'جاري التحميل';
    submission.style.pointerEvents = 'none';

    try {
        const res = await fetch('./', {
            method: 'PATCH',
            body: JSON.stringify({
                mode: 'CODE',
                code: code,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (res.status === 200) {
            form.style.display = 'none';
            document.querySelector('.form#writers-picker').style.display = 'flex';
            return;
        } else if (res.status === 401) {
            digitsField.forEach(digitField => digitField.style.border = '2px red solid');
            statusMsg.innerHTML = lang == 'EN' ? 'Wrong Code!' : 'رقم التأكيدي غير صحيح';
            submission.style.pointerEvents = 'all';
        } else {
            statusMsg.innerHTML = lang == 'EN' ? 'Try again later!' : 'أعد المحاولة لاحقاً';
            submission.style.pointerEvents = 'all';

        }
    } catch (e) {
        console.log(e);
        statusMsg.innerHTML = lang == 'EN' ? 'Try again later!' : 'أعد المحاولة لاحقاً';
        submission.style.pointerEvents = 'all';

    }


}


const writerTileListener = (element, id) => {
    const count = document.querySelector('.form#writers-picker #actions .main-button span')
    if (element.classList.contains('active')) {
        element.classList.remove('active');
        selectedWriters.splice(selectedWriters.indexOf(id), 1);
    } else {
        element.classList.add('active');
        selectedWriters.push(id);
    }
    count.innerHTML = `(${selectedWriters.length})`
}

const writersPickedSelection = () => {
    const form = document.querySelector('.form#writers-picker');
    const statusMsg = document.querySelector('.form#writers-picker #actions #status-msg');
    if (selectedWriters === undefined || selectedWriters.length === 0) {
        statusMsg.innerHTML = lang == 'EN' ? 'Select one writer at least!' : 'أختر كاتباً واحداً على الأقل';
        return;
    }

    statusMsg.innerHTML = '';
    form.style.display = 'none'
    document.querySelector('.form#profile-picker').style.display = 'flex'
}

const writersPickedSelectionSkip = () => {
    selectedWriters = [];

    const form = document.querySelector('.form#writers-picker');
    form.style.display = 'none'

    document.querySelector('.form#profile-picker').style.display = 'flex'
}

const profilePicterComplete = () => {
    const form = document.querySelector('.form#profile-picker');
    const statusMsg = document.querySelector('.form#profile-picker #actions #status-msg');
    console.log(profile);
    if (profile === undefined) {
        statusMsg.innerHTML = 'Select profile picture!';
        return;
    }

    form.style.display = 'none';
    document.querySelector('.form#cover-picker').style.display = 'flex';
}
const profilePicterCompleteSkip = () => {
    const form = document.querySelector('.form#profile-picker');
    form.style.display = 'none';

    profile = undefined;

    document.querySelector('.form#cover-picker').style.display = 'flex';
}

const coverPicterComplete = () => {
    const form = document.querySelector('.form#cover-picker');
    const statusMsg = document.querySelector('.form#cover-picker #actions #status-msg');
    if (cover === undefined) {
        statusMsg.innerHTML = 'Select cover picture!';
        return;
    }

    form.style.display = 'none';
    showConfirmationPanel();

}
const coverPicterCompleteSkip = () => {
    const form = document.querySelector('.form#cover-picker');
    form.style.display = 'none';

    cover = undefined;

    showConfirmationPanel();
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
            props.listener(reader.result, file_);

        }
        reader.readAsDataURL(file_)
    }
    input.click();
}

const showConfirmationPanel = () => {
    const form = document.querySelector('.form#confirmation-form');
    const coverContainer = form.querySelector('#cover');
    if (cover !== undefined && coverReaderResult !== undefined) {
        coverContainer.style.backgroundImage= `url(${coverReaderResult})`
    } else {
        coverContainer.style.background= 'var(--accentColor)';
    }

    const profileContainer = form.querySelector('#profile');
    if (profile !== undefined && profileReaderResult !== undefined) {
        profileContainer.style.backgroundImage= `url(${profileReaderResult})`
    } else {
        profileContainer.style.background= 'var(--accentColor)';
    }
    const nameDisplay = form.querySelector('#information h3');
    nameDisplay.innerHTML= username
    const emailDisplay = form.querySelector('#information p#email');
    emailDisplay.innerHTML= email
    const writers = form.querySelector('#writers');
    form.style.display = 'flex';
}