let courses, selectedSession, cover, addSnippetSectionBtn;
const openCourseFormDialog = (mode, payload) => {
	const body= document.querySelector('.form-dialog#courses-form-dialog div.body')
	switch (mode) {
		case 'CREATE':
			document.querySelector('.form-dialog#courses-form-dialog .header h2').innerHTML = 'Create'
			document.querySelector('.form-dialog-overlay#courses-form-dialog-overlay').style.display = 'flex';
			document.querySelector('.form-dialog#courses-form-dialog').style.display = 'flex';
			document.querySelector('.form-dialog#courses-form-dialog .options #delete').style.display = 'none';
			addSnippetSectionBtn= document.createElement('button');
			addSnippetSectionBtn.classList.add('shadow-button');
			addSnippetSectionBtn.setAttribute('id', 'snippet-section-btn');
			addSnippetSectionBtn.innerHTML= 'Add Section';
			addSnippetSectionBtn.onclick= ()=> {
				const div= document.createElement('div');
				div.classList.add('content-snippet');
				div.innerHTML= `
					<div class="row">
						<label>Content Snippet English Title</label>
						<label>Content Snippet Arabic Title</label>
					</div>
					<div class="row">
						<input id="en-title" type="name" class="single-line-field" >
						<input id="ar-title" type="name" class="single-line-field" >
					</div>
					<label>English Snippets</label>
					<div class="snippets en">
						<div class="header">
						  <input
						    type="name"
						    name="tag"
						    placeholder="English Snippet"
						    class="single-line-field"
						    id="cat-snippets"
						  />
						  <button class="shadow-button" id="snippets-submit" onclick="createSnippetTile(this);">Add</button>
						</div>
						<div class="body"></div>
					</div>					

					<label>Arabic Snippets</label>
					<div class="snippets ar">
						<div class="header">
						  <input
						    type="name"
						    name="tag"
						    placeholder="Arabic Snippet"
						    class="single-line-field"
						    id="cat-snippets"
						  />
						  <button class="shadow-button" id="snippets-submit" onclick="createSnippetTile(this);">Add</button>
						</div>
						<div class="body"></div>
					</div>					
					<div class="options"><button class="shadow-button" style="color: red;" onclick="this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);"> Delete</button></div>

				`;
				body.appendChild(div);
				if (!document.querySelector('#snippet-section-btn')) body.appendChild(addSnippetSectionBtn);
			}
			if (!document.querySelector('#snippet-section-btn')) body.appendChild(addSnippetSectionBtn);

			document.querySelector('.form-dialog#courses-form-dialog .main-button').onclick = ()=>{
				const enNameField= document.querySelector('.form-dialog#courses-form-dialog #en-title');
				const arNameField= document.querySelector('.form-dialog#courses-form-dialog #ar-title');
				const enBioField= document.querySelector('.form-dialog#courses-form-dialog #en-bio');
				const arBioField= document.querySelector('.form-dialog#courses-form-dialog #ar-bio');
				const priceField= document.querySelector('.form-dialog#courses-form-dialog #price');
				const coverField= document.querySelector('.form-dialog#courses-form-dialog .image-picker#cover');				
				const statusMsg= document.querySelector('.form-dialog#courses-form-dialog p#status-msg');
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
				if (cover === undefined) {
					statusMsg.innerHTML= 'Course should have a cover image!';
					return;
				}
				let snippets= []
				const snippetsSections= document.querySelectorAll('.content-snippet');
				if (snippetsSections.length === 0) {
					statusMsg.innerHTML= 'Course should have at least one content snippet section!';
					return;
				}
				for (let snippetSection of snippetsSections) {
					let enTitle= snippetSection.querySelector('input#en-title');
					if (enTitle.value.trim().length < 8) {
						statusMsg.innerHTML= 'Enter a valid snippet\'s English title!';
						enTitle.style.border= '2px red solid';
						return;
					}
					statusMsg.innerHTML= '';
					enTitle.style.border= 'none';
					let arTitle= snippetSection.querySelector('input#ar-title');
					if (arTitle.value.trim().length < 2) {
						statusMsg.innerHTML= 'Enter a valid snippet\'s Arabic title!';
						arTitle.style.border= '2px red solid';
						return;
					}
					statusMsg.innerHTML= '';
					arTitle.style.border= 'none';

					let enSnippets= snippetSection.querySelectorAll('div.snippets');
					let arSnippets= enSnippets[1];
					enSnippets= enSnippets[0];
					let enSnippetsField= enSnippets.querySelector('input');
					let arSnippetsField= arSnippets.querySelector('input');
					enSnippets= Array.from(enSnippets.querySelectorAll('.snippet-tile p')).map(e=> e.innerHTML);
					if (enSnippets.length === 0) {
						statusMsg.innerHTML= 'Snippets Section should have at least one element!';
						enSnippetsField.style.border= '2px red solid';
						return;
					}
					statusMsg.innerHTML= '';
					enSnippetsField.style.border= 'none';

					arSnippets= Array.from(arSnippets.querySelectorAll('.snippet-tile p')).map(e=> e.innerHTML);
					if (arSnippets.length === 0) {
						statusMsg.innerHTML= 'Snippets Section should have at least one element!';
						arSnippetsField.style.border= '2px red solid';
						return;
					}
					statusMsg.innerHTML= '';
					arSnippetsField.style.border= 'none';
					snippets.push({
						title: {
							EN: enTitle.value.trim(),
							AR: arTitle.value.trim(),
						},
						content: {
							EN: enSnippets,
							AR: arSnippets,
						}
					});
				}
				createCourse({
					title: {
						EN: enNameField.value,
						AR: arNameField.value,
					},
					bio: {
						EN: enBioField.value,
						AR: arBioField.value,
					},
					price: Number.parseFloat(priceField.value),
					content_list: snippets,
				})
			} ;

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
			const coverField= document.querySelector('.form-dialog#courses-form-dialog .image-picker#cover');
			coverField.style.backgroundImage= `url(/courses/cover/${payload["id"]}/)`;
			for (let snippet of payload["content_list"]) {
				let div= document.createElement('div');
				div.classList.add('content-snippet')
				div.innerHTML= `
					<div class="row">
						<label>Content Snippet English Title</label>
						<label>Content Snippet Arabic Title</label>
					</div>
					<div class="row">
						<input id="en-title" type="name" class="single-line-field" value='${snippet["title"]["EN"]}' >
						<input id="ar-title" type="name" class="single-line-field" value='${snippet["title"]["AR"]}' >
					</div>
					<label>English Snippets</label>
					<div class="snippets">
						<div class="header">
						  <input
						    type="name"
						    name="tag"
						    placeholder="English Snippet"
						    class="single-line-field"
						    id="cat-snippets"
						  />
						  <button class="shadow-button" id="snippets-submit" onclick="createSnippetTile(this);">Add</button>
						</div>
						<div class="body">${snippet["content"]["EN"].map(e=> `<div class="snippet-tile"><p>${e}</p><div onclick="this.parentElement.parentElement.removeChild(this.parentElement)">x</div></div>`).toString().replaceAll(',', '')}</div>
					</div>					

					<label>Arabic Snippets</label>
					<div class="snippets">
						<div class="header">
						  <input
						    type="name"
						    name="tag"
						    placeholder="Arabic Snippet"
						    class="single-line-field"
						    id="cat-snippets"
						  />
						  <button class="shadow-button" id="snippets-submit" onclick="createSnippetTile(this);">Add</button>
						</div>
						<div class="body">${snippet["content"]["AR"].map(e=> `<div class="snippet-tile"><p>${e}</p><div onclick="this.parentElement.parentElement.removeChild(this.parentElement)">x</div></div>`).toString().replaceAll(',', '')}</div>
					</div>					
					<div class="options"><button class="shadow-button" style="color: red;" onclick="this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);"> Delete</button></div>
				`;
				body.appendChild(div);
			}
			addSnippetSectionBtn= document.createElement('button');
			addSnippetSectionBtn.classList.add('shadow-button');
			addSnippetSectionBtn.setAttribute('id', 'snippet-section-btn');
			addSnippetSectionBtn.innerHTML= 'Add Section';
			addSnippetSectionBtn.onclick= ()=> {
				body.removeChild(addSnippetSectionBtn);
				const div= document.createElement('div');
				div.classList.add('content-snippet');
				div.innerHTML= `
					<div class="row">
						<label>Content Snippet English Title</label>
						<label>Content Snippet Arabic Title</label>
					</div>
					<div class="row">
						<input id="en-title" type="name" class="single-line-field" >
						<input id="ar-title" type="name" class="single-line-field" >
					</div>
					<label>English Snippets</label>
					<div class="snippets en">
						<div class="header">
						  <input
						    type="name"
						    name="tag"
						    placeholder="English Snippet"
						    class="single-line-field"
						    id="cat-snippets"
						  />
						  <button class="shadow-button" id="snippets-submit" onclick="createSnippetTile(this);">Add</button>
						</div>
						<div class="body"></div>
					</div>					

					<label>Arabic Snippets</label>
					<div class="snippets ar">
						<div class="header">
						  <input
						    type="name"
						    name="tag"
						    placeholder="Arabic Snippet"
						    class="single-line-field"
						    id="cat-snippets"
						  />
						  <button class="shadow-button" id="snippets-submit" onclick="createSnippetTile(this);">Add</button>
						</div>
						<div class="body"></div>
					</div>					
					<div class="options"><button class="shadow-button" style="color: red;" onclick="this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);"> Delete</button></div>

				`;
				body.appendChild(div);
				if (!document.querySelector('#snippet-section-btn')) body.appendChild(addSnippetSectionBtn);
			}
			if (!document.querySelector('#snippet-section-btn')) body.appendChild(addSnippetSectionBtn);
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
				let snippets= []
				const snippetsSections= document.querySelectorAll('.content-snippet');
				if (snippetsSections.length === 0) {
					statusMsg.innerHTML= 'Course should have at least one content snippet section!';
					return;
				}
				for (let snippetSection of snippetsSections) {
					let enTitle= snippetSection.querySelector('input#en-title');
					if (enTitle.value.trim().length < 8) {
						statusMsg.innerHTML= 'Enter a valid snippet\'s English title!';
						enTitle.style.border= '2px red solid';
						return;
					}
					statusMsg.innerHTML= '';
					enTitle.style.border= 'none';
					let arTitle= snippetSection.querySelector('input#ar-title');
					if (arTitle.value.trim().length < 2) {
						statusMsg.innerHTML= 'Enter a valid snippet\'s Arabic title!';
						arTitle.style.border= '2px red solid';
						return;
					}
					statusMsg.innerHTML= '';
					arTitle.style.border= 'none';

					let enSnippets= snippetSection.querySelectorAll('div.snippets');
					let arSnippets= enSnippets[1];
					enSnippets= enSnippets[0];
					let enSnippetsField= enSnippets.querySelector('input');
					let arSnippetsField= arSnippets.querySelector('input');
					enSnippets= Array.from(enSnippets.querySelectorAll('.snippet-tile p')).map(e=> e.innerHTML);
					if (enSnippets.length === 0) {
						statusMsg.innerHTML= 'Snippets Section should have at least one element!';
						enSnippetsField.style.border= '2px red solid';
						return;
					}
					statusMsg.innerHTML= '';
					enSnippetsField.style.border= 'none';

					arSnippets= Array.from(arSnippets.querySelectorAll('.snippet-tile p')).map(e=> e.innerHTML);
					if (arSnippets.length === 0) {
						statusMsg.innerHTML= 'Snippets Section should have at least one element!';
						arSnippetsField.style.border= '2px red solid';
						return;
					}
					statusMsg.innerHTML= '';
					arSnippetsField.style.border= 'none';
					snippets.push({
						title: {
							EN: enTitle.value.trim(),
							AR: arTitle.value.trim(),
						},
						content: {
							EN: enSnippets,
							AR: arSnippets,
						}
					});
				}
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
					content_list: snippets
				})
			} ;

			break;
	}
}

const createSnippetTile= (element)=> {
	const statusMsg= document.querySelector('.form-dialog#courses-form-dialog p#status-msg');
	const input= element.parentElement.querySelector('input');
	if (input.value.trim().length < 8) {
		input.style.border= '2px red solid';
		statusMsg.innerHTML= 'Add valid snippet!';
		return;
	}
	input.style.border= 'none';
	statusMsg.innerHTML= '';
	const text= input.value.trim();
	element.parentElement.parentElement.querySelector('.body').innerHTML+= `<div class="snippet-tile">
	<p>${text}</p>
	<div onclick="this.parentElement.parentElement.removeChild(this.parentElement)">x</div>
	</div>`
	input.value= '';
}

const updateCourse= (payload)=> {
	const statusMsg= document.querySelector('.form-dialog#courses-form-dialog p#status-msg');
	const submit= document.querySelector('.form-dialog#courses-form-dialog .main-button');
	try {
		const xhr= new XMLHttpRequest();

		const formData= new FormData();
		formData.append('payload', JSON.stringify(payload));
		if (cover !== undefined) formData.append('cover', cover);
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
		document.querySelector('.form-dialog#courses-form-dialog #cover').style.backgroundImage= 'var(--image-placeholder)';
		cover= undefined;
		Array.from(document.querySelectorAll('.form-dialog#courses-form-dialog .content-snippet')).map(element => {document.querySelector('.form-dialog#courses-form-dialog .body').removeChild(element)});
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

	if (status) {
		openStartPointSelectionDialog(async (startPoint) => {
			closeStartPointSelectionDialog();
			const res = await fetch('./applications/', {
			body: JSON.stringify({
				status: status,
				courseId: courseId,
				startPoint: startPoint,
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

		})
	} else {		
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
}

const openStartPointAssignmentDialog= async (status, courseId, request) => {

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

const openStartPointSelectionDialog= (callback, cancelCallback)=> {
	document.querySelector('.form-dialog#start-point-selection').style.display= 'flex';
	document.querySelector('.form-dialog-overlay#start-point-selection').style.display= 'flex';
	document.querySelector('.form-dialog#start-point-selection .header div').onclick= cancelCallback
	document.querySelector('.form-dialog#start-point-selection .options .shadow-button').onclick= cancelCallback
	document.querySelector('.form-dialog#start-point-selection .options .main-button').onclick= ()=> {callback(selectedSession)}
}

const closeStartPointSelectionDialog= ()=> {
	document.querySelector('.form-dialog#start-point-selection').style.display= 'none';
	document.querySelector('.form-dialog-overlay#start-point-selection').style= 'none';
}

const selectSession = (session) => {
    const btn = document.querySelector('button.sessions-dropbtn');
    selectedSession = session.id;
    console.log(selectedSession)
    btn.innerHTML = session.title['EN'];
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

const createCourse= (payload)=> {
	const statusMsg= document.querySelector('.form-dialog#courses-form-dialog p#status-msg');
	const submit= document.querySelector('.form-dialog#courses-form-dialog .main-button');
	try {
		const xhr= new XMLHttpRequest();

		const formData= new FormData();
		formData.append('payload', JSON.stringify(payload));
		if (cover !== undefined) formData.append('cover', cover);
		xhr.onload= ()=> {
			if (xhr.status=== 201) {
				window.open('./', '_self');
				return;
			}
			submit.innerHTML= 'Failed!';
			setTimeout(()=> {
				statusMsg.innerHTML= '';
				submit.innerHTML= 'Submit';
				submit.onclick= ()=> { createCourse(payload); }
			}, 3000);
		}

		xhr.open('POST', './');
		xhr.send(formData);
	} catch (e) {
		console.log(e);
		statusMsg.innerHTML= 'Try again later!';
		submit.innerHTML= 'Failed!';
		setTimeout(()=> {
			statusMsg.innerHTML= '';
			submit.innerHTML= 'Submit';
			submit.onclick= ()=> { createCourse(payload); }
		}, 3000);innerHTML= 'Try again later!';
	}
}

const openManageSessionsFormDialog= (course) => {
	const statusMsg= document.querySelector('div.form-dialog#manage-sessions p#status-msg');
	document.querySelector('.information-snippet#snippet-one').onclick= () => {
		// openCreateSessionDialog(async (session)=> {
		// 	openManageSessionsFormDialog(course);
		// 	console.log(session);
		// }, ()=> {
		// 	closeCreateSessionDialog();
		// 	openManageSessionsFormDialog(course);
		// 	statusMsg.innerHTML= 'Creating a session was canceled!';
		// 	setTimeout(()=> {
		// 		statusMsg.innerHTML= '';
		// 	}, 3000);
		// });
	}

	document.querySelector('.information-snippet#snippet-two').onclick= () => {
		// openCreateTestDialog(async (test)=> {
		// 	openManageSessionsFormDialog(course);
		// 	console.log(test);
		// }, ()=> {
		// 	openManageSessionsFormDialog(course);
		// 	statusMsg.innerHTML= 'Creating a test was canceled!';
		// });
	}
	document.querySelector('div.form-dialog#manage-sessions div#sessions').innerHTML= `
	${Array.from(Object.values(course.sessions)).map(session => `
          <div class="session-row" id="sess-${session.id}"
          >
            <h3>${session['title']['EN']}</h3>
            <p id="bio">${session['bio']['EN']}</p>
            <p id="type">Type: ${session['type']}</p>
            <div class="options">
            	<button class="shadow-button" style="color: red;">Delete</button>
            </div>
          </div>
		</div>
		`).toString().replaceAll(',', '')}
	`;
	document.querySelector('div.form-dialog#manage-sessions').style.display= 'flex'
	document.querySelector('div.form-dialog-overlay#manage-sessions').style.display= 'flex'
}

const closeManageSessionsFormDialog= () => {
	document.querySelector('div.form-dialog#manage-sessions').style.display= 'none'
	document.querySelector('div.form-dialog-overlay#manage-sessions').style.display= 'none'
	document.querySelector('div.form-dialog#manage-sessions div#sessions').innerHTML= '';
}

const openCreateSessionDialog= async (callback, cancelCallback) => {
	closeManageSessionsFormDialog();
	document.querySelector('.form-dialog#create-session').style.display= 'flex';
	document.querySelector('.form-dialog#create-session div.header div').onclick= cancelCallback;
	document.querySelector('.form-dialog#create-session div.options .shadow-button').onclick= cancelCallback;
	document.querySelector('.form-dialog#create-session').style.display= 'flex';
	document.querySelector('.form-dialog-overlay#create-session').style.display= 'flex';
	Array.from(document.querySelectorAll('.form-dialog .fragments-controllers div')).forEach(controller => {
		controller.onclick= ()=> {
			if (controller.classList.contains('active')) return;
				document.querySelector('.form-dialog .fragments-controllers div.active').classList.remove('active');
				document.querySelector('.form-dialog .fragments div.active').classList.remove('active');
				controller.classList.add('active');
				document.querySelector(`.fragments div#${controller.id}`).classList.add('active');
			}
	});
	const payload= {};

	await callback(payload);
}
const openCreateTestDialog= async (callback, cancelCallback) => {
	closeManageSessionsFormDialog();
	const payload= {};

	await callback(payload);
}

const closeCreateSessionDialog= ()=> {
	document.querySelector('.form-dialog#create-session').style.display= 'none';
	document.querySelector('.form-dialog-overlay#create-session').style.display= 'none';
	Array.from(document.querySelectorAll('.form-dialog#create-session input')).forEach(e => {
		e.value= '';
	});

	Array.from(document.querySelectorAll('.form-dialog#create-session textarea')).forEach(e => {
		e.value= '';
	});
}