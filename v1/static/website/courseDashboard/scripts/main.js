let courseData, userProgressData, lang, userId;
const initData= async (courseData_, userProgressData_, lang_, userId_)=> {
	courseData= courseData_;
	userProgressData= userProgressData_;
	lang= lang_;
	userId= userId_;
}

const openSessionsDialog= () => {
	const dialog= document.querySelector('div.dialog#dialog');
	dialog.style.display= 'flex'
	const dialogOverlay= document.querySelector('div.dialog-overlay#dialog-overlay');
	dialogOverlay.style.display= 'flex'
	let displaySession;
	Object.keys(courseData.sessions).map(session => {
		if (session === userProgressData['completed_sessions'][userProgressData['completed_sessions'].length - 1]) {
			displaySession= courseData.sessions[Object.keys(courseData.sessions).indexOf(session) + 1];
			return;
		}
	});

	if (displaySession === undefined) {
		displaySession= courseData.sessions[0];
	}

	dialog.querySelector('.dialog#dialog #header h3').innerHTML= displaySession.title[lang];
	if(displaySession.type === "video") {
		dialog.querySelector('#body #main-section').innerHTML=`
			<div id="video-section">
				<video id="video" autoplay="autoplay"></video>
				<div id="controllers">
					<div id="voice-up"></div>
					<div id="start-over"></div>
					<div id="playpack"></div>
					<div id="full-page"></div>
					<div id="voice-down"></div>
				</div>
				<div id="logo-watermark"></div>
				<div id="userID-watermark">${userId}</div>
			</div>
			<div id="info-section">
				<h3>${displaySession.title[lang]}</h3>
				<p>${displaySession.bio[lang]}</p>
			</div>
		`;
		dialog.querySelector('video#video').controls= false;
		dialog.querySelector('video#video').src= `/assets/courses/${courseData.id}/session/video/${displaySession.id}`;
		dialog.querySelector('#controllers #start-over').onclick= ()=> {
			dialog.querySelector('video#video').pause()
			dialog.querySelector('video#video').currentTime =0;
		}
		dialog.querySelector('#controllers #full-page').onclick= ()=> {
			const element= dialog.querySelector('video#video');
			  if (element.requestFullscreen) {
			    element.requestFullscreen();
			  } else if (element.mozRequestFullScreen) {
			    element.mozRequestFullScreen();
			  } else if (element.webkitRequestFullscreen) {
			    element.webkitRequestFullscreen();
			  } else if (element.msRequestFullscreen) {
			    element.msRequestFullscreen();
			  } else {
			    element.classList.toggle('fullscreen');
  				}

		}
		dialog.querySelector('#controllers #voice-up').onclick= ()=> {
			if (dialog.querySelector('video#video').volume === 1) return;
			dialog.querySelector('video#video').volume += 0.1;
		}
		dialog.querySelector('#controllers #voice-down').onclick= ()=> {
			if(dialog.querySelector('video#video').volume === 0) return;
			dialog.querySelector('video#video').volume -= 0.1;
		}
		dialog.querySelector('#controllers #playpack').onclick= ()=> {
			if (dialog.querySelector('video#video').paused) dialog.querySelector('video#video').play();
			else dialog.querySelector('video#video').pause();
		}
	} else if (displaySession.type === "article") {
		dialog.querySelector('#body #main-section').innerHTML="article";

	}


}

const closeSessionsDialog= ()=> {
	const dialog= document.querySelector('div.dialog#dialog');
	const dialogOverlay= document.querySelector('div.dialog-overlay#dialog-overlay');

	dialog.querySelector('#body video').pause()
	dialog.style.display= 'none';
	dialog.querySelector('#body #main-section').innerHTML=''
	dialog.querySelector('.dialog#dialog #header h3').innerHTML= ''

	dialogOverlay.style.display= 'none';
}