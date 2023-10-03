const openCourseFormDialog= (mode, payload) => {
	switch( mode ) {
		case 'CREATE':
			document.querySelector('.form-dialog#courses-form-dialog .header h2').innerHTML= 'Create'
			document.querySelector('.form-dialog#courses-form-dialog').style.display= 'flex';
			document.querySelector('.form-dialog-overlay#courses-form-dialog-overlay').style.display= 'flex';
			break;
	}
}