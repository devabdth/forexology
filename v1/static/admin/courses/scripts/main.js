let courses;
const openCourseFormDialog = (mode, payload) => {
	switch (mode) {
		case 'CREATE':
			document.querySelector('.form-dialog#courses-form-dialog .header h2').innerHTML = 'Create'
			document.querySelector('.form-dialog-overlay#courses-form-dialog-overlay').style.display = 'flex';
			document.querySelector('.form-dialog#courses-form-dialog').style.display = 'flex';
			break;

		case 'EDIT':
			document.querySelector('.form-dialog#courses-form-dialog .header h2').innerHTML = 'Edit'
			document.querySelector('.form-dialog#courses-form-dialog').style.display = 'flex';
			document.querySelector('.form-dialog-overlay#courses-form-dialog-overlay').style.display = 'flex';
			const enNameField= document.querySelector('.form-dialog#courses-form-dialog #en-title');
			enNameField.value = payload['title']['EN'];
			const arNameField= document.querySelector('.form-dialog#courses-form-dialog #ar-title');
			arNameField.value = payload['title']['AR'];
			const enBioField= document.querySelector('.form-dialog#courses-form-dialog #en-bio');
			enBioField.value = payload['bio']['EN'];
			const arBioField= document.querySelector('.form-dialog#courses-form-dialog #ar-bio');
			arBioField.value = payload['bio']['AR'];
			const priceField= document.querySelector('.form-dialog#courses-form-dialog #price');
			priceField.value = payload['price'];
			const statusMsg= document.querySelector('.form-dialog#courses-form-dialog p#status-msg');
			document.querySelector('.form-dialog#courses-form-dialog .main-button').onclick = ()=>{
				if (enNameField.value.trim().length < 16) {
					statusMsg.innerHTML= 'Enter a valid English course title';
					enNameField.style.border= '2px red solid';
					return;
				}
				statusMsg.innerHTML= '';
				enNameField.style.border= 'none';
				if (arNameField.value.trim().length < 16) {
					statusMsg.innerHTML= 'Enter a valid Arabic course title';
					arNameField.style.border= '2px red solid';
					return;
				}
				statusMsg.innerHTML= '';
				arNameField.style.border= 'none';
				if (enBioField.value.trim().length < 32) {
					statusMsg.innerHTML= 'Enter a valid English course bio';
					enBioField.style.border= '2px red solid';
					return;
				}
				statusMsg.innerHTML= '';
				enBioField.style.border= 'none';
				if (arBioField.value.trim().length < 32) {
					statusMsg.innerHTML= 'Enter a valid Arabic course title';
					arBioField.style.border= '2px red solid';
					return;
				}
				statusMsg.innerHTML= '';
				arBioField.style.border= 'none';
				if (priceField.value.trim().length < 1 || Number.parseInt(priceField.value.trim()) === undefined) {
					statusMsg.innerHTML= 'Enter a valid price';
					priceField.style.border= '2px red solid';
					return;
				}
				statusMsg.innerHTML= '';
				priceField.style.border= 'none';
				updateCourse({
					id: payload['id'],
					title: {
						EN: enNameField.value,
						AR: arNameField.value,
					},
					bio: {
						EN: enBioField.value,
						AR: arBioField.value,
					},
					price: Number.parseFloat(priceField.value),
				})
			} ;

			break;
	}
}

const updateCourse= (payload)=> {
	const statusMsg= document.querySelector('.form-dialog#courses-form-dialog p#status-msg');
	const submit= document.querySelector('.form-dialog#courses-form-dialog .main-button');
	try {
		const xhr= new XMLHttpRequest();

		const formData= new FormData();
		formData.append('payload', JSON.stringify(payload));
		xhr.onload= ()=> {
			if (xhr.status=== 200) {
				window.open('./', '_self');
				return;
			}
			submit.innerHTML= 'Failed!';
			setTimeout(()=> {
				statusMsg.innerHTML= '';
				submit.innerHTML= 'Submit';
				submit.onclick= ()=> { updateCourse(payload); }
			}, 3000);
		}

		xhr.open('PATCH', './');
		xhr.send(formData);
	} catch (e) {
		console.log(e);
		statusMsg.innerHTML= 'Try again later!';
		submit.innerHTML= 'Failed!';
		setTimeout(()=> {
			statusMsg.innerHTML= '';
			submit.innerHTML= 'Submit';
			submit.onclick= ()=> { updateCourse(payload); }
		}, 3000);innerHTML= 'Try again later!';
	}
}

const clearCourseInfoFormDialog= ()=> {
		document.querySelector('.form-dialog#courses-form-dialog #en-title').value = '';
		document.querySelector('.form-dialog#courses-form-dialog #ar-title').value = '';
		document.querySelector('.form-dialog#courses-form-dialog #en-bio').value = '';
		document.querySelector('.form-dialog#courses-form-dialog #ar-bio').value = '';
		document.querySelector('.form-dialog#courses-form-dialog #price').value= '';
}

const closeCourseInfoFormDialog= ()=> {
	clearCourseInfoFormDialog();
	document.querySelector('.form-dialog#courses-form-dialog').style.display = 'none';
	document.querySelector('.form-dialog-overlay#courses-form-dialog-overlay').style.display = 'none';
}

const applicationRequestTraffic = async (status, courseId, element) => {
	const statusMsg = document.querySelector('#access-manager #options #status-msg');
	const childs = element.childNodes;
	const table = element.parentElement;
	table.removeChild(element)
	const userId = childs[1].innerHTML;
	const name = childs[3].innerHTML;
	const email = childs[5].innerHTML;
	const phone = childs[7].innerHTML;

	const res = await fetch('./applications/', {
		body: JSON.stringify({
			status: status,
			courseId: courseId,
			request: {
				userId: userId,
				name: name,
				email: email,
				phone: phone
			},
		}),
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (res.status === 200) {
		element.removeChild(element.querySelector('td#options'))
		if (status) {
			document.querySelector('table#students tbody').appendChild(element)
		}
	} else {
		table.appendChild(element)
		statusMsg.innerHTML = 'Try again later!';
	}
}

const openAccessManagerForm = (courseId, studentsList) => {
	document.querySelector('.form-dialog-overlay#access-manager').style.display = 'flex';
	const form = document.querySelector('.form-dialog#access-manager');
	form.style.display = 'flex';
	const course = courses.filter(course => course.id == courseId)[0];
	form.querySelector('table#requests tbody');
	for (let application in course.application_list) {
		row = document.createElement('tr');
		tr.innerHTML = `
		<td>${application['userId']}</td>
		<td>${application['name']}</td>
		<td>${application['email']}</td>
		<td>${application['phone']}</td>
		<td id="options">
		  <button
			class="shadow-button"
			id="accent"
			style="color: green"
			onclick="applicationRequestTraffic(true, ${courseId}, this.parentElement.parentElement)"
		  >
			Accept
		  </button>
		  <button
			class="shadow-button"
			id="Decline"
			style="color: red"
			onclick="applicationRequestTraffic(false, ${courseId}, this.parentElement.parentElement)"
		  >
			Decline
		  </button>

		`;
	}

}

const closeAccessManagerForm = () => {
	document.querySelector('.form-dialog#access-manager').style.display = 'none';
	document.querySelector('.form-dialog-overlay#access-manager').style.display = 'none';
}