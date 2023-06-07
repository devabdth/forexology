let lang;
window.onload = () => {
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

const findEmail = async () => {
  const submission = document.querySelector('#form #actions button.main-button');
  const statusMsg = document.querySelector('#form #actions p#status-msg');

  const emailField = document.querySelector('#form input.single-line-field-awhite#email');
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!(emailField.value.trim().length > 8 && String(emailField.value.trim()).toLowerCase().match(re))) {
    emailField.style.border = '2px red solid';
    statusMsg.innerHTML = lang === 'EN' ? 'Enter a valid email!' : 'أدخل بريد إلكتروني صحيح';
    return;
  }
  emailField.style.border = 'none';
  statusMsg.innerHTML = lang === 'EN' ? 'Loading...' : 'جاري التحميل';
  submission.style.pointerEvents = 'none';

  try {
    const res = await fetch('./', {
      method: 'PATCH',
      body: JSON.stringify({
        mode: 'EMAIL',
        email: emailField.value.trim(),
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (res.status === 200) {
      statusMsg.innerHTML = ''
      emailField.style.display = 'none';
      document.querySelector('#form #otp').style.display = 'flex';
      document.querySelector('#form #actions #row-actions').style.display = 'flex';
      submission.innerHTML = lang == 'EN' ? 'Verify' : 'تأكيد';
      submission.style.pointerEvents = 'all';
      submission.onclick = codeValidation;
      return;
    } else if (res.status === 404) {
      emailField.style.border = '2px red solid';
      statusMsg.innerHTML = lang == 'EN' ? 'Email not found!' : 'الحساب غير موجود';
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

const codeValidation = async () => {
  const submission = document.querySelector('#form #actions button.main-button');
  const statusMsg = document.querySelector('#form #actions p#status-msg');

  const digitsField = Array.from({ length: 6 }, (_, i) => document.querySelector(`#form #otp .otp-field#digit-${i}`))
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
      statusMsg.innerHTML = ''
      document.querySelector('#form #otp').style.display = 'none';
      document.querySelector('#form #actions #row-actions').style.display = 'none';
      document.querySelector('.single-line-field-awhite#password').style.display = 'flex';
      document.querySelector('.single-line-field-awhite#repassword').style.display = 'flex';
      submission.innerHTML = lang == 'EN' ? 'Change Password' : 'تغيير كلمة المرور';
      submission.style.pointerEvents = 'all';
      submission.onclick = changePasswordConfirmation;
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

const changePasswordConfirmation = async () => {
  const password = document.querySelector('.single-line-field-awhite#password');
  const repassword = document.querySelector('.single-line-field-awhite#repassword');

  const submission = document.querySelector('#form #actions button.main-button');
  const statusMsg = document.querySelector('#form #actions p#status-msg');

  if (password.value.trim().length < 8 && password.value.trim().length > 32) {
    password.style.border = '2px red solid';
    statusMsg.innerHTML = lang == 'EN' ? 'Enter valid password!' : 'كلمة السر لا تصلح';
  }
  password.style.border = '';


  if (repassword.value.trim().length < 8 && repassword.value.trim().length > 32) {
    repassword.style.border = '2px red solid';
    statusMsg.innerHTML = lang == 'EN' ? 'Passwords missmatched' : 'كلمتي السر غير متطابقتين';
  }
  repassword.style.border = '';

  statusMsg.innerHTML = lang === 'EN' ? 'Loading...' : 'جاري التحميل';
  submission.style.pointerEvents = 'none';

  try {
    const res = await fetch('./', {
      method: 'PATCH',
      body: JSON.stringify({
        mode: 'CHANGE_PASSWORD',
        password: password.value.trim(),
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (res.status === 200) {
      window.open('/login/', '_self');
      return;
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