let courseData, userProgressData, lang, userId, sessionCompletion;
const initData = async (courseData_, userProgressData_, lang_, userId_) => {
	courseData = courseData_;
	userProgressData = userProgressData_;
	lang = lang_;
	userId = userId_;
}

const openSessionsDialog = (customSessionId) => {
	if (courseData === undefined) {
		document.querySelector('#intro .main-button').innerHTML= lang === 'EN'? 'Loading...': "جاري التحميل";
		setTimeout(openSessionsDialog, 500);
		return;
	}
		document.querySelector('#intro .main-button').innerHTML= lang === 'EN'? 'Complete': "أكمل الدورة";
	sessionCompletion= false;
	const dialog = document.querySelector('div.dialog#dialog');
	dialog.style.display = 'flex'
	const dialogOverlay = document.querySelector('div.dialog-overlay#dialog-overlay');
	dialogOverlay.style.display = 'flex'
	let displaySession, userStep, index;
	if (customSessionId === undefined) {
		userStep= userProgressData['completed_sessions'][userProgressData['completed_sessions'].length - 1];
		index= Object.keys(courseData.sessions).indexOf(userStep);
		if (!(index +1 === Object.keys(courseData.sessions).length)) {
			displaySession = courseData.sessions[Object.keys(courseData.sessions)[index+1]];
		}
	} else {
		userStep= customSessionId;
		index= Object.keys(courseData.sessions).indexOf(userStep);
		if (!(index === Object.keys(courseData.sessions).length)) {
			displaySession = courseData.sessions[Object.keys(courseData.sessions)[index]];
		}
	}

	if (displaySession === undefined) {
		displaySession = Object.values(courseData.sessions)[0];
	}

	dialog.querySelector('.dialog#dialog #header h3').innerHTML = displaySession.title[lang];
	if (displaySession.type === "video") {
		dialog.querySelector('#body #main-section').innerHTML = `
			<div id="video-section">
				<video id="video" autoplay="autoplay"></video>
				<div id="controllers">
					<div>
						<i id="forward" class="fa-solid fa-forward"></i>
						<p>${lang === 'EN' ? "Forward" : "تقديم"}</p>
						</div>
					<div>
						<i id="voice-up" class="fa-solid fa-volume-high"></i>
						<p>${lang === 'EN' ? "Volume+" : "رفع الصوت"}</p>
					</div>
						<div>
						<i id="start-over" class="fa-solid fa-stop"></i>
						<p>${lang === 'EN' ? "Start Over" : "إبدأ من جديد"}</p>
					</div>
						<div>
						<i class="fa-solid fa-pause" id="playback"></i>
						<p>${lang === 'EN' ? "Pause" : "إيقاف"}</p>
						</div>
					<!--<div><i id="full-page" class="fa-solid fa-up-right-and-down-left-from-center"></i><p>${lang === 'EN' ? "Full Screen" : "تكبير الشاشة"}</p></div>-->
					<div>
						<i id="voice-down" class="fa-solid fa-volume-low"></i>
						<p>${lang === 'EN' ? "Volume-" : "تقليل الصوت"}</p>
					</div>
						<div>
						<i id="backward" class="fa-solid fa-backward"></i>
						<p>${lang === 'EN' ? "Backward" : "تآخير"}</p>
					</div>
				</div>
				<div id="times">
					<p id="full-time">01:51:32</p>
					<p id="current-time">00:00:00</p>
				</div>
				<div id="logo-watermark"></div>
				<div id="userID-watermark">${userId}</div>
			</div>
			<div id="info-section">
				<h3>${displaySession.title[lang]}</h3>
				<p>${displaySession.bio[lang]}</p>
			</div>
			`;
		const videoPlayer = dialog.querySelector('video#video');
		videoPlayer.load();

		videoPlayer.onloadedmetadata = () => {
			dialog.querySelector('#times #full-time').innerHTML = `${new Date(videoPlayer.duration * 1000).toISOString().substring(11, 19)}`;
			setInterval(()=> {
				const min = 25;
  				const max = 75;
  				const value = Math.random() * (max - min) + min;
				document.querySelector('#video-section #userID-watermark').style.top= `${value}%`;
				document.querySelector('#video-section #userID-watermark').style.left= `${value}%`;
			}, 80000);
		}
		videoPlayer.addEventListener('timeupdate', ()=> {
			dialog.querySelector('#times #current-time').innerHTML = `${new Date(videoPlayer.currentTime * 1000).toISOString().substring(11, 19)}`
			if (!sessionCompletion) {
				if ((videoPlayer.currentTime / videoPlayer.duration) >= 0.85) {
					completedSessionListener(displaySession.id);
				}
			}

		});

		videoPlayer.controls = false;
		videoPlayer.src = `/assets/courses/${courseData.id}/session/video/${displaySession.id}`;
		dialog.querySelector('#controllers #start-over').onclick = () => {
			videoPlayer.pause()
			videoPlayer.currentTime = 0;
			videoPlayer.play()
		}
		// dialog.querySelector('#controllers #full-page').onclick = () => {
		// 	const element = videoPlayer;
		// 	if (element.requestFullscreen) {
		// 		element.requestFullscreen();
		// 	} else if (element.mozRequestFullScreen) {
		// 		element.mozRequestFullScreen();
		// 	} else if (element.webkitRequestFullscreen) {
		// 		element.webkitRequestFullscreen();
		// 	} else if (element.msRequestFullscreen) {
		// 		element.msRequestFullscreen();
		// 	} else {
		// 		element.classList.toggle('fullscreen');
		// 	}

		// }
		dialog.querySelector('#controllers #forward').onclick = () => {
			videoPlayer.currentTime = videoPlayer.currentTime + 10;
		}

		dialog.querySelector('#controllers #backward').onclick = () => {
			videoPlayer.currentTime = videoPlayer.currentTime - 10;
		}

		dialog.querySelector('#controllers #voice-up').onclick = () => {
			if (videoPlayer.volume === 1) return;
			videoPlayer.volume += 0.1;
		}
		dialog.querySelector('#controllers #voice-down').onclick = () => {
			if (videoPlayer.volume === 0) return;
			videoPlayer.volume -= 0.1;
		}
		dialog.querySelector('#controllers #playback').onclick = () => {
			if (videoPlayer.paused) {
				videoPlayer.play();
				dialog.querySelector('#controllers #playback').parentElement.querySelector('p').innerHTML = `${lang === 'EN' ? "Pause" : "إيقاف"}`
				dialog.querySelector('#controllers #playback').classList.remove('fa-play')
				dialog.querySelector('#controllers #playback').classList.add('fa-pause')
			}
			else {
				videoPlayer.pause();
				dialog.querySelector('#controllers #playback').parentElement.querySelector('p').innerHTML = `${lang === 'EN' ? "Play" : "تشغيل"}`
				dialog.querySelector('#controllers #playback').classList.add('fa-play')
				dialog.querySelector('#controllers #playback').classList.remove('fa-pause')
			};
		}
	} else if (displaySession.type === "article") {
		dialog.querySelector('#body #main-section').innerHTML = "article";

	}


}

const closeSessionsDialog = () => {
	const dialog = document.querySelector('div.dialog#dialog');
	const dialogOverlay = document.querySelector('div.dialog-overlay#dialog-overlay');

	dialog.querySelector('#body video').pause()
	dialog.style.display = 'none';
	dialog.querySelector('#body #main-section').innerHTML = ''
	dialog.querySelector('.dialog#dialog #header h3').innerHTML = ''

	dialogOverlay.style.display = 'none';
}

const completedSessionListener= async (sessionId) => {
	try {
		const res= await fetch('./completedSession/', {
			method: 'PATCH', 
			body: JSON.stringify({
				session: sessionId,
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (res.status === 200) {
			sessionCompletion= true;
			userProgressData["completed_sessions"].push(sessionId);
			const infoCountTile= document.querySelector('.information-snippet#snippet-one h3');
			infoCountTile.innerHTML = `${userProgressData["completed_sessions"].length}<span> ` + infoCountTile.innerHTML.split("<span>")[1]
			const infoPercentageTile= document.querySelector('.information-snippet#snippet-three h3');
			infoPercentageTile.innerHTML = `${((userProgressData["completed_sessions"].length / Object.keys(courseData.sessions).length)*100).toFixed()}<span> ` + infoPercentageTile.innerHTML.split("<span>")[1]
			const sessionRow= document.querySelector(`.session-row#sess-${sessionId}`);
			sessionRow.querySelector('#completed').innerHTML= lang === 'EN' ? 'Completed' : 'اكتملت';
			sessionRow.querySelector('#completed').style.color= 'green';

		}
		if (res.status===400) sessionCompletion= true;
		console.log(res.status);
	} catch (e) {
		console.log(e);
	}

}