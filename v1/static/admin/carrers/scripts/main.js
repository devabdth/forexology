
const salaryTypes = {
    0: "Per Month",
    1: "Per Task",
    2: "Per Milestone",
    3: "Per Project",
    4: "Long-time Contract",
    5: "Short-time Contract",
}


const jobTypes = {
    0: "Full Time",
    1: "Part Time",
    2: "Freelancer",
    3: "Hour Based Rate",
}

let carrers;
const initCarrersData = (data) => { carrers = data; }

let currentSalaryType, currentJobType, currentEnRequiremnts, currentArRequirments, currentEnDuties, currentArDuties, currentEnBenefits, currentArBenefits;
const openCarrerFormDialog = (mode, job) => {
    initSpecs();
    const salaryTypesTabs = document.querySelectorAll('#carrers-form-dialog .body #salaries .salary-type-tile');
    for (let tab of salaryTypesTabs) {
        tab.onclick = () => {
            if (currentSalaryType === Number.parseInt(tab.id)) return;

            const activeTab = document.querySelector('#carrers-form-dialog .body #salaries .salary-type-tile.active');
            if (activeTab !== null) activeTab.classList.remove('active');

            currentSalaryType = Number.parseInt(tab.id);
            tab.classList.add('active');
        }
    }
    const jobTypesTabs = document.querySelectorAll('#carrers-form-dialog .body #jobs .job-type-tile');
    for (let tab of jobTypesTabs) {
        tab.onclick = () => {
            if (currentJobType === Number.parseInt(tab.id)) return;

            const activeTab = document.querySelector('#carrers-form-dialog .body #jobs .job-type-tile.active');
            if (activeTab !== null) activeTab.classList.remove('active');

            currentJobType = Number.parseInt(tab.id);
            tab.classList.add('active');
            console.log(currentJobType)
        }
    }
    switch (mode) {
        default:
        case 'CREATE':
            currentEnRequiremnts = [];
            currentEnBenefits = [];
            currentEnDuties = [];
            currentArRequirments = [];
            currentArBenefits = [];
            currentArDuties = [];
            document.querySelector('#carrers-form-dialog .header h2').innerHTML = 'Create';
            document.querySelector('#carrers-form-dialog .options .shadow-button#delete').style.display = 'none';
            document.querySelector('#carrers-form-dialog .options .main-button').onclick = createCarrer;

            break;
        case 'EDIT':
            const enTitle = document.querySelector('#carrers-form-dialog .body input.single-line-field#en-title');
            enTitle.value = job.title['EN'];
            const arTitle = document.querySelector('#carrers-form-dialog .body input.single-line-field#ar-title');
            arTitle.value = job.title['AR'];
            const enSubtitle = document.querySelector('#carrers-form-dialog .body input.single-line-field#en-subtitle');
            enSubtitle.value = job.subtitle['EN'];
            const arSubtitle = document.querySelector('#carrers-form-dialog .body input.single-line-field#ar-subtitle');
            arSubtitle.value = job.subtitle['AR'];
            const enBio = document.querySelector('#carrers-form-dialog .body input.single-line-field#en-bio');
            enBio.value = job.bio['EN'];
            const arBio = document.querySelector('#carrers-form-dialog .body input.single-line-field#ar-bio');
            arBio.value = job.bio['AR'];

            const enRequirmentsContainer = document.querySelector('#carrers-form-dialog .body #en-requirements #cards');
            currentEnRequiremnts = job.requiremnts['EN'];
            for (let req of job.requiremnts['EN']) {
                let tile = document.createElement('div');
                tile.classList.add('spec-tile');

                let tileTitle = document.createElement('p');
                tileTitle.innerHTML = req;

                let tileDelete = document.createElement('div');
                tileDelete.innerHTML = 'x';
                tileDelete.onclick = () => {
                    enRequirmentsContainer.removeChild(tile);
                    currentEnRequiremnts.splice(currentEnRequiremnts.indexOf(tileTitle.innerHTML), 1);
                }

                tile.appendChild(tileTitle)
                tile.appendChild(tileDelete);
                enRequirmentsContainer.appendChild(tile);
            }

            const enDutiesContainer = document.querySelector('#carrers-form-dialog .body #en-duties #cards');
            currentEnDuties = job.duties['EN'];
            for (let req of job.duties['EN']) {
                let tile = document.createElement('div');
                tile.classList.add('spec-tile');

                let tileTitle = document.createElement('p');
                tileTitle.innerHTML = req;

                let tileDelete = document.createElement('div');
                tileDelete.innerHTML = 'x';
                tileDelete.onclick = () => {
                    enDutiesContainer.removeChild(tile);
                    currentEnDuties.splice(currentEnDuties.indexOf(tileTitle.innerHTML), 1);
                }

                tile.appendChild(tileTitle)
                tile.appendChild(tileDelete);
                enDutiesContainer.appendChild(tile);
            }

            const enBenefitsContainer = document.querySelector('#carrers-form-dialog .body #en-benefits #cards');
            currentEnBenefits = job.benefits['EN'];
            for (let req of job.benefits['EN']) {
                let tile = document.createElement('div');
                tile.classList.add('spec-tile');

                let tileTitle = document.createElement('p');
                tileTitle.innerHTML = req;

                let tileDelete = document.createElement('div');
                tileDelete.innerHTML = 'x';
                tileDelete.onclick = () => {
                    enBenefitsContainer.removeChild(tile);
                    currentEnBenefits.splice(currentEnBenefits.indexOf(tileTitle.innerHTML), 1);
                }

                tile.appendChild(tileTitle)
                tile.appendChild(tileDelete);
                enBenefitsContainer.appendChild(tile);
            }

            const arRequirmentsContainer = document.querySelector('#carrers-form-dialog .body #ar-requirements #cards');
            currentArRequirments = job.requiremnts['AR'];
            for (let req of job.requiremnts['AR']) {
                let tile = document.createElement('div');
                tile.classList.add('spec-tile');

                let tileTitle = document.createElement('p');
                tileTitle.innerHTML = req;

                let tileDelete = document.createElement('div');
                tileDelete.innerHTML = 'x';
                tileDelete.onclick = () => {
                    arRequirmentsContainer.removeChild(tile);
                    currentArRequirments.splice(currentArRequirments.indexOf(tileTitle.innerHTML), 1);
                }

                tile.appendChild(tileTitle)
                tile.appendChild(tileDelete);
                arRequirmentsContainer.appendChild(tile);
            }

            const arDutiesContainer = document.querySelector('#carrers-form-dialog .body #ar-duties #cards');
            currentArDuties = job.duties['AR'];
            for (let req of job.duties['AR']) {
                let tile = document.createElement('div');
                tile.classList.add('spec-tile');

                let tileTitle = document.createElement('p');
                tileTitle.innerHTML = req;

                let tileDelete = document.createElement('div');
                tileDelete.innerHTML = 'x';
                tileDelete.onclick = () => {
                    arDutiesContainer.removeChild(tile);
                    currentArDuties.splice(currentArDuties.indexOf(tileTitle.innerHTML), 1);
                }

                tile.appendChild(tileTitle)
                tile.appendChild(tileDelete);
                arDutiesContainer.appendChild(tile);
            }

            const arBenefitsContainer = document.querySelector('#carrers-form-dialog .body #ar-benefits #cards');
            currentArBenefits = job.benefits['AR'];
            for (let req of job.benefits['AR']) {
                let tile = document.createElement('div');
                tile.classList.add('spec-tile');

                let tileTitle = document.createElement('p');
                tileTitle.innerHTML = req;

                let tileDelete = document.createElement('div');
                tileDelete.innerHTML = 'x';
                tileDelete.onclick = () => {
                    arBenefitsContainer.removeChild(tile);
                    currentArBenefits.splice(currentArBenefits.indexOf(tileTitle.innerHTML), 1);
                }

                tile.appendChild(tileTitle)
                tile.appendChild(tileDelete);
                arBenefitsContainer.appendChild(tile);
            }

            currentSalaryType = job.salary_type;
            for (let tab of salaryTypesTabs) {
                if (tab.id == `${currentSalaryType}`) tab.classList.add('active');
            }

            currentJobType = job.job_type;
            for (let tab of jobTypesTabs) {
                if (tab.id == `${currentJobType}`) tab.classList.add('active');
            }


            document.querySelector('#carrers-form-dialog .header h2').innerHTML = 'Edit';
            document.querySelector('#carrers-form-dialog .options .shadow-button#delete').style.display = 'flex';
            document.querySelector('#carrers-form-dialog .options .shadow-button#delete').onclick = () => { deleteCarrer(job.id) };
            document.querySelector('#carrers-form-dialog .options .main-button').onclick = () => { updateCarrer(job) };
            break;
    }

    document.querySelector('#carrers-form-dialog').style.display = 'flex';
    document.querySelector('#carrers-form-dialog-overlay').style.display = 'flex';
}


const initSpecs = () => {
    const statusMsg = document.querySelector('#carrers-form-dialog .options #status-msg');
    const enRequirmentsField = document.querySelector('#carrers-form-dialog .body #en-requirements input.single-line-field');
    const enRequirmentsContainer = document.querySelector('#carrers-form-dialog .body #en-requirements #cards');
    const enRequirmentsAction = document.querySelector('#carrers-form-dialog .body #en-requirements button.main-button');
    enRequirmentsAction.onclick = () => {
        if (enRequirmentsField.value.trim().length < 8 || enRequirmentsField.value.trim().length > 64) {
            enRequirmentsField.style.border = '2px red solid';
            statusMsg.innerHTML = 'Enter a valid English Requirment';
            return;
        }
        enRequirmentsField.style.border = 'none';
        statusMsg.innerHTML = '';

        let tile = document.createElement('div');
        tile.classList.add('spec-tile');

        let tileTitle = document.createElement('p');
        tileTitle.innerHTML = enRequirmentsField.value.trim();
        currentEnRequiremnts.push(enRequirmentsField.value.trim());
        enRequirmentsField.value = '';

        let tileDelete = document.createElement('div');
        tileDelete.innerHTML = 'x';
        tileDelete.onclick = () => {
            enRequirmentsContainer.removeChild(tile);
            currentEnRequiremnts.splice(currentEnRequiremnts.indexOf(tileTitle.innerHTML), 1);
        }

        tile.appendChild(tileTitle)
        tile.appendChild(tileDelete);
        enRequirmentsContainer.appendChild(tile);
    }
    const enDutiesField = document.querySelector('#carrers-form-dialog .body #en-duties input.single-line-field');
    const enDutiesContainer = document.querySelector('#carrers-form-dialog .body #en-duties #cards');
    const enDutiesAction = document.querySelector('#carrers-form-dialog .body #en-duties button.main-button');
    enDutiesAction.onclick = () => {
        if (enDutiesField.value.trim().length < 8 || enDutiesField.value.trim().length > 64) {
            enDutiesField.style.border = '2px red solid';
            statusMsg.innerHTML = 'Enter a valid English Duty';
            return;
        }
        enDutiesField.style.border = 'none';
        statusMsg.innerHTML = '';

        let tile = document.createElement('div');
        tile.classList.add('spec-tile');

        let tileTitle = document.createElement('p');
        tileTitle.innerHTML = enDutiesField.value.trim();
        currentEnDuties.push(enDutiesField.value.trim());
        enDutiesField.value = '';

        let tileDelete = document.createElement('div');
        tileDelete.innerHTML = 'x';
        tileDelete.onclick = () => {
            enDutiesContainer.removeChild(tile);
            currentEnDuties.splice(currentEnDuties.indexOf(tileTitle.innerHTML), 1);
        }

        tile.appendChild(tileTitle)
        tile.appendChild(tileDelete);
        enDutiesContainer.appendChild(tile);
    }
    const enBenefitsField = document.querySelector('#carrers-form-dialog .body #en-benefits input.single-line-field');
    const enBenefitsContainer = document.querySelector('#carrers-form-dialog .body #en-benefits #cards');
    const enBenefitsAction = document.querySelector('#carrers-form-dialog .body #en-benefits button.main-button');
    enBenefitsAction.onclick = () => {
        if (enBenefitsField.value.trim().length < 8 || enBenefitsField.value.trim().length > 64) {
            enBenefitsField.style.border = '2px red solid';
            statusMsg.innerHTML = 'Enter a valid English Benefit';
            return;
        }
        enBenefitsField.style.border = 'none';
        statusMsg.innerHTML = '';

        let tile = document.createElement('div');
        tile.classList.add('spec-tile');

        let tileTitle = document.createElement('p');
        tileTitle.innerHTML = enBenefitsField.value.trim();
        currentEnBenefits.push(enBenefitsField.value.trim());
        enBenefitsField.value = '';

        let tileDelete = document.createElement('div');
        tileDelete.innerHTML = 'x';
        tileDelete.onclick = () => {
            enBenefitsContainer.removeChild(tile);
            currentEnBenefits.splice(currentEnBenefits.indexOf(tileTitle.innerHTML), 1);
        }

        tile.appendChild(tileTitle)
        tile.appendChild(tileDelete);
        enBenefitsContainer.appendChild(tile);
    }
    const arRequirmentsField = document.querySelector('#carrers-form-dialog .body #ar-requirements input.single-line-field');
    const arRequirmentsContainer = document.querySelector('#carrers-form-dialog .body #ar-requirements #cards');
    const arRequirmentsAction = document.querySelector('#carrers-form-dialog .body #ar-requirements button.main-button');
    arRequirmentsAction.onclick = () => {
        if (arRequirmentsField.value.trim().length < 8 || arRequirmentsField.value.trim().length > 64) {
            arRequirmentsField.style.border = '2px red solid';
            statusMsg.innerHTML = 'Enter a valid Arabic Requirment';
            return;
        }
        arRequirmentsField.style.border = 'none';
        statusMsg.innerHTML = '';

        let tile = document.createElement('div');
        tile.classList.add('spec-tile');

        let tileTitle = document.createElement('p');
        tileTitle.innerHTML = arRequirmentsField.value.trim();
        currentArRequirments.push(arRequirmentsField.value.trim());
        arRequirmentsField.value = '';

        let tileDelete = document.createElement('div');
        tileDelete.innerHTML = 'x';
        tileDelete.onclick = () => {
            arRequirmentsContainer.removeChild(tile);
            currentArRequirments.splice(currentArRequirments.indexOf(tileTitle.innerHTML), 1);
        }

        tile.appendChild(tileTitle)
        tile.appendChild(tileDelete);
        arRequirmentsContainer.appendChild(tile);
    }
    const arDutiesField = document.querySelector('#carrers-form-dialog .body #ar-duties input.single-line-field');
    const arDutiesContainer = document.querySelector('#carrers-form-dialog .body #ar-duties #cards');
    const arDutiesAction = document.querySelector('#carrers-form-dialog .body #ar-duties button.main-button');
    arDutiesAction.onclick = () => {
        if (arDutiesField.value.trim().length < 8 || arDutiesField.value.trim().length > 64) {
            arDutiesField.style.border = '2px red solid';
            statusMsg.innerHTML = 'Enter a valid Arabic Duty';
            return;
        }
        arDutiesField.style.border = 'none';
        statusMsg.innerHTML = '';

        let tile = document.createElement('div');
        tile.classList.add('spec-tile');

        let tileTitle = document.createElement('p');
        tileTitle.innerHTML = arDutiesField.value.trim();
        currentArDuties.push(arDutiesField.value.trim());
        arDutiesField.value = '';

        let tileDelete = document.createElement('div');
        tileDelete.innerHTML = 'x';
        tileDelete.onclick = () => {
            arDutiesContainer.removeChild(tile);
            currentArDuties.splice(currentArDuties.indexOf(tileTitle.innerHTML), 1);
        }

        tile.appendChild(tileTitle)
        tile.appendChild(tileDelete);
        arDutiesContainer.appendChild(tile);
    }
    const arBenefitsField = document.querySelector('#carrers-form-dialog .body #ar-benefits input.single-line-field');
    const arBenefitsContainer = document.querySelector('#carrers-form-dialog .body #ar-benefits #cards');
    const arBenefitsAction = document.querySelector('#carrers-form-dialog .body #ar-benefits button.main-button');
    arBenefitsAction.onclick = () => {
        if (arBenefitsField.value.trim().length < 8 || arBenefitsField.value.trim().length > 64) {
            arBenefitsField.style.border = '2px red solid';
            statusMsg.innerHTML = 'Enter a valid Arabic Benefit';
            return;
        }
        arBenefitsField.style.border = 'none';
        statusMsg.innerHTML = '';

        let tile = document.createElement('div');
        tile.classList.add('spec-tile');

        let tileTitle = document.createElement('p');
        tileTitle.innerHTML = arBenefitsField.value.trim();
        currentArBenefits.push(arBenefitsField.value.trim());
        arBenefitsField.value = '';

        let tileDelete = document.createElement('div');
        tileDelete.innerHTML = 'x';
        tileDelete.onclick = () => {
            arBenefitsContainer.removeChild(tile);
            currentArBenefits.splice(currentArBenefits.indexOf(tileTitle.innerHTML), 1);
        }

        tile.appendChild(tileTitle)
        tile.appendChild(tileDelete);
        arBenefitsContainer.appendChild(tile);
    }

}

const deleteCarrer = async (jobId) => {
    const statusMsg = document.querySelector('#carrers-form-dialog .options #status-msg');
    const submit = document.querySelector('#carrers-form-dialog .options .main-button');
    const clear = document.querySelector('#carrers-form-dialog .options .shadow-button#clear');
    const close = document.querySelector('#carrers-form-dialog .options .shadow-button#cancel');
    const deleteBtn = document.querySelector('#carrers-form-dialog .options .shadow-button#delete');

    try {
        statusMsg.innerHTML = 'Loading...';
        submit.style.pointerEvents = 'none';
        clear.style.pointerEvents = 'none';
        close.style.pointerEvents = 'none';
        deleteBtn.style.pointerEvents = 'none';

        const res = await fetch(`./?jobId=${jobId}`, {
            method: 'DELETE',
        });

        if (res.status === 200) {
            window.open('./', '_self');
            return;
        }
        statusMsg.innerHTML = 'Try again later!';
        submit.innerHTML = 'Failed';
        setTimeout(() => {
            statusMsg.innerHTML = '';
            submit.innerHTML = 'Submit';
            submit.style.pointerEvents = 'all';
            clear.style.pointerEvents = 'all';
            close.style.pointerEvents = 'all';
            deleteBtn.style.pointerEvents = 'all';
        }, 3000);

    } catch (e) {
        console.log(e);
        statusMsg.innerHTML = 'Try again later!';
        submit.innerHTML = 'Failed';
        setTimeout(() => {
            statusMsg.innerHTML = '';
            submit.style.pointerEvents = 'all';
            clear.style.pointerEvents = 'all';
            close.style.pointerEvents = 'all';
        }, 3000);
    }

}

const updateCarrer = async (job) => {
    const statusMsg = document.querySelector('#carrers-form-dialog .options #status-msg');
    const submit = document.querySelector('#carrers-form-dialog .options .main-button');
    const clear = document.querySelector('#carrers-form-dialog .options .shadow-button#clear');
    const close = document.querySelector('#carrers-form-dialog .options .shadow-button#cancel');
    const deleteBtn = document.querySelector('#carrers-form-dialog .options .shadow-button#delete');

    try {
        const validationRes = carrerFormDialogValidator();
        if (validationRes === undefined) return;
        for (let jk of Object.keys(job)) {
            if (validationRes[jk])
                job[jk] = validationRes[jk]
        };

        statusMsg.innerHTML = 'Loading...';
        submit.style.pointerEvents = 'none';
        clear.style.pointerEvents = 'none';
        close.style.pointerEvents = 'none';
        deleteBtn.style.pointerEvents = 'none';

        const res = await fetch('./', {
            method: 'PATCH',
            body: JSON.stringify(job),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status === 200) {
            window.open('./', '_self');
            return;
        }
        statusMsg.innerHTML = 'Try again later!';
        submit.innerHTML = 'Failed';
        setTimeout(() => {
            statusMsg.innerHTML = '';
            submit.innerHTML = 'Submit';
            submit.style.pointerEvents = 'all';
            clear.style.pointerEvents = 'all';
            close.style.pointerEvents = 'all';
            deleteBtn.style.pointerEvents = 'all';
        }, 3000);

    } catch (e) {
        console.log(e);
        statusMsg.innerHTML = 'Try again later!';
        submit.innerHTML = 'Failed';
        setTimeout(() => {
            statusMsg.innerHTML = '';
            submit.style.pointerEvents = 'all';
            clear.style.pointerEvents = 'all';
            close.style.pointerEvents = 'all';
        }, 3000);
    }

}


const clearCarrerFormDialog = () => {
    const enTitle = document.querySelector('#carrers-form-dialog .body input.single-line-field#en-title');
    enTitle.value = '';
    const arTitle = document.querySelector('#carrers-form-dialog .body input.single-line-field#ar-title');
    arTitle.value = '';
    const enSubtitle = document.querySelector('#carrers-form-dialog .body input.single-line-field#en-subtitle');
    enSubtitle.value = '';
    const arSubtitle = document.querySelector('#carrers-form-dialog .body input.single-line-field#ar-subtitle');
    arSubtitle.value = '';
    const enBio = document.querySelector('#carrers-form-dialog .body input.single-line-field#en-bio');
    enBio.value = '';
    const arBio = document.querySelector('#carrers-form-dialog .body input.single-line-field#ar-bio');
    arBio.value = '';
    const enRequirmentsField = document.querySelector('#carrers-form-dialog .body #en-requirements input.single-line-field');
    enRequirmentsField.value = '';
    const enRequirmentsContainer = document.querySelector('#carrers-form-dialog .body #en-requirements #cards');
    enRequirmentsContainer.innerHTML = '';
    const enDutiesField = document.querySelector('#carrers-form-dialog .body #en-duties input.single-line-field');
    enDutiesField.value = '';
    const enDutiesContainer = document.querySelector('#carrers-form-dialog .body #en-duties #cards');
    enDutiesContainer.innerHTML = '';
    const enBenefitsField = document.querySelector('#carrers-form-dialog .body #en-benefits input.single-line-field');
    enBenefitsField.value = '';
    const enBenefitsContainer = document.querySelector('#carrers-form-dialog .body #en-benefits #cards');
    enBenefitsContainer.innerHTML = '';
    const arRequirmentsField = document.querySelector('#carrers-form-dialog .body #ar-requirements input.single-line-field');
    arRequirmentsField.value = '';
    const arRequirmentsContainer = document.querySelector('#carrers-form-dialog .body #ar-requirements #cards');
    arRequirmentsContainer.innerHTML = '';
    const arDutiesField = document.querySelector('#carrers-form-dialog .body #ar-duties input.single-line-field');
    arDutiesField.value = '';
    const arDutiesContainer = document.querySelector('#carrers-form-dialog .body #ar-duties #cards');
    arDutiesContainer.innerHTML = '';
    const arBenefitsField = document.querySelector('#carrers-form-dialog .body #ar-benefits input.single-line-field');
    arBenefitsField.value = '';
    const arBenefitsContainer = document.querySelector('#carrers-form-dialog .body #ar-benefits #cards');
    arBenefitsContainer.innerHTML = '';
    const salaryTypesTabs = document.querySelectorAll('#carrers-form-dialog .body #salary-types .salary-type-card');
    for (let salaryTypeTab of salaryTypesTabs) {
        if (salaryTypeTab.classList.contains('active')) salaryTypeTab.classList.remove('active');
    }
    const jobTypesTabs = document.querySelectorAll('#carrers-form-dialog .body #job-types .job-type-card');
    for (let jobTypeTab of jobTypesTabs) {
        if (jobTypeTab.classList.contains('active')) jobTypeTab.classList.remove('active');
    }
}

const createCarrer = async () => {
    const statusMsg = document.querySelector('#carrers-form-dialog .options #status-msg');
    const submit = document.querySelector('#carrers-form-dialog .options .main-button');
    const clear = document.querySelector('#carrers-form-dialog .options .shadow-button#clear');
    const close = document.querySelector('#carrers-form-dialog .options .shadow-button#cancel');

    try {
        const validationRes = carrerFormDialogValidator();
        if (validationRes === undefined) return;

        statusMsg.innerHTML = 'Loading...';
        submit.style.pointerEvents = 'none';
        clear.style.pointerEvents = 'none';
        close.style.pointerEvents = 'none';

        const res = await fetch('./', {
            method: 'POST',
            body: JSON.stringify(validationRes),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status === 201) {
            window.open('./', '_self');
            return;
        }
        statusMsg.innerHTML = 'Try again later!';
        submit.innerHTML = 'Failed';
        setTimeout(() => {
            statusMsg.innerHTML = '';
            submit.innerHTML = 'Submit';
            submit.style.pointerEvents = 'all';
            clear.style.pointerEvents = 'all';
            close.style.pointerEvents = 'all';
        }, 3000);

    } catch (e) {
        console.log(e);
        statusMsg.innerHTML = 'Try again later!';
        submit.innerHTML = 'Failed';
        setTimeout(() => {
            statusMsg.innerHTML = '';
            submit.style.pointerEvents = 'all';
            clear.style.pointerEvents = 'all';
            close.style.pointerEvents = 'all';
        }, 3000);
    }
}

const closeCarrerFormDialog = () => {
    clearCarrerFormDialog();
    document.querySelector('#carrers-form-dialog').style.display = 'none';
    document.querySelector('#carrers-form-dialog-overlay').style.display = 'none';
}

const carrerFormDialogValidator = () => {
    const enTitle = document.querySelector('#carrers-form-dialog .body input.single-line-field#en-title');
    const arTitle = document.querySelector('#carrers-form-dialog .body input.single-line-field#ar-title');
    const enSubtitle = document.querySelector('#carrers-form-dialog .body input.single-line-field#en-subtitle');
    const arSubtitle = document.querySelector('#carrers-form-dialog .body input.single-line-field#ar-subtitle');
    const enBio = document.querySelector('#carrers-form-dialog .body input.single-line-field#en-bio');
    const arBio = document.querySelector('#carrers-form-dialog .body input.single-line-field#ar-bio');
    const enRequirmentsField = document.querySelector('#carrers-form-dialog .body #en-requirements input.single-line-field');
    const enDutiesField = document.querySelector('#carrers-form-dialog .body #en-duties input.single-line-field');
    const enBenefitsField = document.querySelector('#carrers-form-dialog .body #en-benefits input.single-line-field');
    const arRequirmentsField = document.querySelector('#carrers-form-dialog .body #ar-requirements input.single-line-field');
    const arDutiesField = document.querySelector('#carrers-form-dialog .body #ar-duties input.single-line-field');
    const arBenefitsField = document.querySelector('#carrers-form-dialog .body #ar-benefits input.single-line-field');
    const salaryTypesTabs = document.querySelectorAll('#carrers-form-dialog .body #salary-types .salary-type-card');
    const jobTypesTabs = document.querySelectorAll('#carrers-form-dialog .body #job-types .job-type-card');
    const statusMsg = document.querySelector('#carrers-form-dialog .options #status-msg');

    if (enTitle.value.trim().length < 8) {
        enTitle.style.border = '2px red solid';
        statusMsg.innerHTML = 'Enter valid English title!';
        return;
    }
    enTitle.style.border = 'none';

    if (arTitle.value.trim().length < 8) {
        arTitle.style.border = '2px red solid';
        statusMsg.innerHTML = 'Enter valid Arabic title!';
        return;
    }
    arTitle.style.border = 'none';

    if (enSubtitle.value.trim().length < 8) {
        enSubtitle.style.border = '2px red solid';
        statusMsg.innerHTML = 'Enter valid English subtitle!';
        return;
    }
    enSubtitle.style.border = 'none';

    if (arSubtitle.value.trim().length < 8) {
        arSubtitle.style.border = '2px red solid';
        statusMsg.innerHTML = 'Enter valid Arabic subtitle!';
        return;
    }
    arSubtitle.style.border = 'none';

    if (enBio.value.trim().length < 8) {
        enBio.style.border = '2px red solid';
        statusMsg.innerHTML = 'Enter valid English bio!';
        return;
    }
    enBio.style.border = 'none';

    if (arBio.value.trim().length < 8) {
        arBio.style.border = '2px red solid';
        statusMsg.innerHTML = 'Enter valid Arabic bio!';
        return;
    }
    arBio.style.border = 'none';



    if (currentEnRequiremnts == undefined || currentEnRequiremnts.length < 1) {
        enRequirmentsField.style.border = '2px red solid';
        statusMsg.innerHTML = 'Enter valid English requirments!';
        return;
    }
    enRequirmentsField.style.border = 'none';

    if (currentArRequirments == undefined || currentArRequirments.length < 1) {
        arRequirmentsField.style.border = '2px red solid';
        statusMsg.innerHTML = 'Enter valid arabic requirments!';
        return;
    }
    arRequirmentsField.style.border = 'none';

    if (currentArRequirments.length !== currentArRequirments.length) {
        enRequirmentsField.style.border = '2px red solid';
        arRequirmentsField.style.border = '2px red solid';
        statusMsg.innerHTML = 'Requirments must have the same number of elements!';
        return;
    }
    enRequirmentsField.style.border = 'none';
    arRequirmentsField.style.border = 'none';

    if (currentEnBenefits == undefined || currentEnBenefits.length < 1) {
        enBenefitsField.style.border = '2px red solid';
        statusMsg.innerHTML = 'Enter valid English benefits!';
        return;
    }
    enBenefitsField.style.border = 'none';

    if (currentArBenefits == undefined || currentArBenefits.length < 1) {
        arBenefitsField.style.border = '2px red solid';
        statusMsg.innerHTML = 'Enter valid arabic benefits!';
        return;
    }
    arBenefitsField.style.border = 'none';

    if (currentArBenefits.length !== currentArBenefits.length) {
        enBenefitsField.style.border = '2px red solid';
        arBenefitsField.style.border = '2px red solid';
        statusMsg.innerHTML = 'Benefits must have the same number of elements!';
        return;
    }
    enBenefitsField.style.border = 'none';
    arBenefitsField.style.border = 'none';


    if (currentEnDuties == undefined || currentEnDuties.length < 1) {
        enDutiesField.style.border = '2px red solid';
        statusMsg.innerHTML = 'Enter valid English duties!';
        return;
    }
    enDutiesField.style.border = 'none';

    if (currentArDuties == undefined || currentArDuties.length < 1) {
        arDutiesField.style.border = '2px red solid';
        statusMsg.innerHTML = 'Enter valid arabic duties!';
        return;
    }
    arDutiesField.style.border = 'none';

    if (currentArDuties.length !== currentArDuties.length) {
        enDutiesField.style.border = '2px red solid';
        arDutiesField.style.border = '2px red solid';
        statusMsg.innerHTML = 'Duties must have the same number of elements!';
        return;
    }
    enDutiesField.style.border = 'none';
    arDutiesField.style.border = 'none';

    if (currentSalaryType === undefined) {
        statusMsg.innerHTML = 'Select salary type!';
        return;
    }

    if (currentJobType === undefined) {
        statusMsg.innerHTML = 'Select job type!';
        return;
    }

    return {
        title: {
            EN: enTitle.value.trim(),
            AR: arTitle.value.trim(),
        },
        subtitle: {
            EN: enSubtitle.value.trim(),
            AR: arSubtitle.value.trim(),
        },
        bio: {
            EN: enBio.value.trim(),
            AR: arBio.value.trim(),
        },
        requiremnts: {
            EN: currentEnRequiremnts,
            AR: currentArRequirments,
        },
        benefits: {
            EN: currentEnBenefits,
            AR: currentArBenefits,
        },
        duties: {
            EN: currentEnDuties,
            AR: currentArDuties,
        },
        salary_type: currentSalaryType,
        job_type: currentJobType,
    }
}

const openApplicationsFormDialog = (jobData, applications) => {
    document.querySelector('.form-dialog#application-form-dialog .carrer-card h3').innerHTML = jobData.title['EN'];
    document.querySelector('.form-dialog#application-form-dialog .carrer-card .subtitle').innerHTML = jobData.bio['EN'];
    document.querySelector('.form-dialog#application-form-dialog .carrer-card .bio').innerHTML = jobData.bio['EN'];
    document.querySelector('.form-dialog#application-form-dialog .carrer-card .info').innerHTML = `${salaryTypes[jobData.salary_type]} | ${jobTypes[jobData.job_type]}`;

    const cardsContainer = document.querySelector('.form-dialog#application-form-dialog .body #application-cards');
    cardsContainer.innerHTML = '';
    for (let app of applications) {
        const card = document.createElement('div');
        card.classList.add('application-card');
        const date = new Date(Date.parse(app.placed_in));

        const downloadCV = document.createElement('button');
        downloadCV.classList.add('shadow-button');
        downloadCV.innerHTML = 'Download CVs';
        downloadCV.onclick = () => {
            fetch(`/assets/applications/cvs/${app.id}`)
                .then(response => response.blob())
                .then(blob => {
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = `${app.name.replace(' ', '_').replace(' ', '_').replace(' ', '_')}_cv`;
                    link.click();
                })
                .catch(console.error);
        }

        const options = document.createElement('div');
        options.classList.add('options');
        options.appendChild(downloadCV);

        card.innerHTML = `
        <p><span>Place in: </span>${date.toLocaleDateString('en-EN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        })}</p>
        <p><span>Name: </span>${app.name}</p>
        <p><span>Email: </span>${app.email}</p>
        <p><span>Second Email: </span>${app.second_email}</p>
        <p><span>Phone: </span>${app.phone}</p>
        <p><span>Second Phone: </span>${app.second_phone}</p>
        <label for="message-container">Message</label>
        <div class="message">${app.message}</div>
        `;

        card.appendChild(options);

        cardsContainer.appendChild(card);
    }

    document.querySelector('.form-dialog-overlay#application-form-dialog-overlay').style.display = 'flex';
    document.querySelector('.form-dialog#application-form-dialog').style.display = 'flex';
}

const closeApplicationsFormDialog = () => {
    document.querySelector('.form-dialog-overlay#application-form-dialog-overlay').style.display = 'none';
    document.querySelector('.form-dialog#application-form-dialog').style.display = 'none';
}