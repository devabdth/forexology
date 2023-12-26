let userData, lang;
const initialState = (lang_, userData_) => {
    lang = lang_;
    userData_ = userData;
}
const openCourseEnrollForm = () => {
    const overlay = document.querySelector('div.overlay#application-overlay');
    const form = document.querySelector('div.form#application-form');
    const nameField = form.querySelector('div.body#body input.single-line-field#name');
    const emailField = form.querySelector('div.body#body input.single-line-field#email');
    const phoneNumberField = form.querySelector('div.body#body input.single-line-field#phone-number');

    console.log(userData)
    if (userData !== undefined) {
        nameField.value = userData['name'];
        emailField.value = userData['email'];
    }

    form.style.display = 'flex';
    overlay.style.display = 'flex';
}

const closeCourseEnrollForm = () => {
    const overlay = document.querySelector('div.overlay#application-overlay');
    const form = document.querySelector('div.form#application-form');

    form.style.display = 'none';
    overlay.style.display = 'none';
}

const submitCourseApplication = async (name, email, phone) => {
    const form = document.querySelector('div.form#application-form');
    const statusMsg = form.querySelector('div.options#options #status-msg');
    if (name === undefined && email === undefined && phone === undefined) {
        const nameField = form.querySelector('div.body#body input.single-line-field#name');
        const emailField = form.querySelector('div.body#body input.single-line-field#email');
        const phoneNumberField = form.querySelector('div.body#body input.single-line-field#phone-number');

        if (nameField.value.trim().length < 8 || nameField.value.trim().length > 64) {
            nameField.style.border = '2px red solid';
            statusMsg.innerHTML = lang == 'EN' ? "Please, Enter a valid name!" : "من فضلك، أدخل اسم صحيح!"
            return;
        }
        statusMsg.innerHTML = '';
        nameField.style.border = 'none';

        if (nameField.value.trim().length < 8 || nameField.value.trim().length > 64) {
            nameField.style.border = '2px red solid';
            statusMsg.innerHTML = lang == 'EN' ? "Please, Enter a valid name!" : "من فضلك، أدخل اسم صحيح!"
            return;
        }
        statusMsg.innerHTML = '';
        nameField.style.border = 'none';

        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!(emailField.value.trim().length > 8 && String(emailField.value.trim()).toLowerCase().match(emailRegex))) {
            emailField.style.border = '2px red solid';
            statusMsg.innerHTML = lang == 'EN' ? "Please, Enter a valid email address!" : "من فضلك، أدخل بريد الكتروني صحيح!"
            return;
        }
        statusMsg.innerHTML = '';
        emailField.style.border = 'none';

        const phoneRegex = "^01[0-2,5]{1}[0-9]{8}$";

        if (!(phoneNumberField.value.trim().length > 8 && String(phoneNumberField.value.trim()).toLowerCase().match(phoneRegex))) {
            phoneNumberField.style.border = '2px red solid';
            statusMsg.innerHTML = lang == 'EN' ? "Please, Enter a valid Phone Number!" : "من فضلك، أدخل رقم هاتف صحيح!"
            return;
        }
        statusMsg.innerHTML = '';
        phoneNumberField.style.border = 'none';

        var payload = {
            name: nameField.value.trim(),
            email: emailField.value.trim(),
            phone: phoneNumberField.value.trim(),
        }
    } else {
        var payload = {
            name: name,
            email: email,
            phone: phone,
        }
    }

    try {
        submit.onclick = () => { }
        submit.innerHTML = lang === 'EN' ? 'Loading' : 'جاري التحميل';
        const res = await fetch('./', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 201) {
            submit.onclick = submitCourseApplication
            submit.innerHTML = lang == 'EN' ? "Submit" : 'تأكيد';
            statusMsg.innerHTML = lang === 'EN' ? 'Successfull! Our Sales team will get in touch soon' : 'عملية ناجحة! فريق المبيعات الخاص بنا سيتواصل معك قريباً';
            if (name === undefined && email === undefined && phone === undefined) {
                nameField.value = '';
                emailField.value = '';
                phoneNumberField.value = '';
            }
            return;
        } else if (res.status === 405) {
            statusMsg.innerHTML = lang == 'EN' ? 'You\'ve applied with this data before, Our Sales team will contact you!' : 'لقد سجلت بهذه البيانات من قبل، فريق المبيعات الخاص بنا سيتواصل معك!';
            submit.innerHTML = 'Failed!';
            setTimeout(() => {
                submit.onclick = submitCourseApplication;
                statusMsg.innerHTML = '';
                submit.innerHTML = lang == 'EN' ? "Submit" : 'تأكيد';
            }, 3000);
            return;
        }
        statusMsg.innerHTML = lang == 'EN' ? 'Try again later!' : 'أعد المحاولة لاحقاً!';
        submit.innerHTML = 'Failed!';
        setTimeout(() => {
            submit.onclick = submitCourseApplication;
            statusMsg.innerHTML = '';
            submit.innerHTML = lang == 'EN' ? "Submit" : 'تأكيد';
        }, 3000);
    } catch (e) {
        console.log(e);
        statusMsg.innerHTML = 'Try again later!';
        submit.innerHTML = 'Failed!';
        setTimeout(() => {
            submit.onclick = submitCourseApplication;
            statusMsg.innerHTML = '';
            submit.innerHTML = lang == 'EN' ? "Submit" : 'تأكيد';
        }, 3000);
    }
}