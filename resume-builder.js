 let experienceCount = 0;
        let educationCount = 0;

        function addExperience() {
            experienceCount++;
            const container = document.getElementById('experienceContainer');
            const div = document.createElement('div');
            div.className = 'item-group';
            div.id = `exp-${experienceCount}`;
            div.innerHTML = `
                <div class="form-group">
                    <label>Job Title</label>
                    <input type="text" class="exp-title" placeholder="Software Engineer">
                </div>
                <div class="form-group">
                    <label>Company</label>
                    <input type="text" class="exp-company" placeholder="Tech Corp">
                </div>
                <div class="form-group">
                    <label>Duration</label>
                    <input type="text" class="exp-duration" placeholder="Jan 2020 - Present">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="exp-description" placeholder="Key responsibilities and achievements..."></textarea>
                </div>
                <button class="remove-btn" onclick="removeElement('exp-${experienceCount}')">Remove</button>
            `;
            container.appendChild(div);
            attachListeners();
        }

        function addEducation() {
            educationCount++;
            const container = document.getElementById('educationContainer');
            const div = document.createElement('div');
            div.className = 'item-group';
            div.id = `edu-${educationCount}`;
            div.innerHTML = `
                <div class="form-group">
                    <label>Degree</label>
                    <input type="text" class="edu-degree" placeholder="Bachelor of Science">
                </div>
                <div class="form-group">
                    <label>Institution</label>
                    <input type="text" class="edu-institution" placeholder="University Name">
                </div>
                <div class="form-group">
                    <label>Duration</label>
                    <input type="text" class="edu-duration" placeholder="2016 - 2020">
                </div>
                <div class="form-group">
                    <label>Details (optional)</label>
                    <textarea class="edu-details" placeholder="GPA, honors, relevant coursework..."></textarea>
                </div>
                <button class="remove-btn" onclick="removeElement('edu-${educationCount}')">Remove</button>
            `;
            container.appendChild(div);
            attachListeners();
        }

        function addProject() {
            projectcount++;
            const container = document.getElementById('projectContainer');
            const div = document.createElement('div');
            div.className = 'item-group';
            div.id = `proj-${projectcount}`;
            div.innerHTML = `
                <div class="form-group">
                    <label>Project Name</label>
                    <input type="text" class="proj-name" placeholder="Project Name">
                </div>
                <div class="form-group  ">
                    <label>Description</label>
                    <textarea class="proj-description" placeholder="Brief description of the project..."></textarea>
                </div>
                <div class="form-group ">
                    <label>Add Project Link</label>
                    <input type="link" class="proj-link" placeholder="Paste the link of the project">
                </div>
                <button class="remove-btn" onclick="removeElement('proj-${projectcount}')">Remove</button>
            `;
            container.appendChild(div);
            attachListeners();
        }


        function removeElement(id) {
            document.getElementById(id).remove();
            updatePreview();
        }

        function updatePreview() {
            // Personal Info
            const name = document.getElementById('fullName').value || 'Your Name';
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const location = document.getElementById('location').value;
            const linkedin = document.getElementById('linkedin').value;

            document.getElementById('previewName').textContent = name;
            
            let contactParts = [];
            if (email) contactParts.push(email);
            if (phone) contactParts.push(phone);
            if (location) contactParts.push(location);
            if (linkedin) contactParts.push(linkedin);
            document.getElementById('previewContact').textContent = contactParts.join(' • ');

            // Summary
            const summary = document.getElementById('summary').value;
            const summarySection = document.getElementById('summarySection');
            if (summary) {
                document.getElementById('previewSummary').textContent = summary;
                summarySection.style.display = 'block';
            } else {
                summarySection.style.display = 'none';
            }

            // Experience
            const expItems = document.querySelectorAll('#experienceContainer .item-group');
            const expPreview = document.getElementById('previewExperience');
            const expSection = document.getElementById('experienceSection');
            expPreview.innerHTML = '';
            
            if (expItems.length > 0) {
                expItems.forEach(item => {
                    const title = item.querySelector('.exp-title').value;
                    const company = item.querySelector('.exp-company').value;
                    const duration = item.querySelector('.exp-duration').value;
                    const description = item.querySelector('.exp-description').value;

                    if (title || company) {
                        const expDiv = document.createElement('div');
                        expDiv.className = 'resume-item';
                        expDiv.innerHTML = `
                            <div class="resume-item-header">
                                <span class="resume-item-title">${title}</span>
                                <span class="resume-item-date">${duration}</span>
                            </div>
                            <div class="resume-item-subtitle">${company}</div>
                            ${description ? `<div class="resume-item-description">${description}</div>` : ''}
                        `;
                        expPreview.appendChild(expDiv);
                    }
                });
                expSection.style.display = 'block';
            } else {
                expSection.style.display = 'none';
            }

            // Education
            const eduItems = document.querySelectorAll('#educationContainer .item-group');
            const eduPreview = document.getElementById('previewEducation');
            const eduSection = document.getElementById('educationSection');
            eduPreview.innerHTML = '';
            
            if (eduItems.length > 0) {
                eduItems.forEach(item => {
                    const degree = item.querySelector('.edu-degree').value;
                    const institution = item.querySelector('.edu-institution').value;
                    const duration = item.querySelector('.edu-duration').value;
                    const details = item.querySelector('.edu-details').value;

                    if (degree || institution) {
                        const eduDiv = document.createElement('div');
                        eduDiv.className = 'resume-item';
                        eduDiv.innerHTML = `
                            <div class="resume-item-header">
                                <span class="resume-item-title">${degree}</span>
                                <span class="resume-item-date">${duration}</span>
                            </div>
                            <div class="resume-item-subtitle">${institution}</div>
                            ${details ? `<div class="resume-item-description">${details}</div>` : ''}
                        `;
                        eduPreview.appendChild(eduDiv);
                    }
                });
                eduSection.style.display = 'block';
            } else {
                eduSection.style.display = 'none';
            }

            // Skills
            const skills = document.getElementById('skills').value;
            const skillsPreview = document.getElementById('previewSkills');
            const skillsSection = document.getElementById('skillsSection');
            skillsPreview.innerHTML = '';
            
            if (skills) {
                const skillArray = skills.split(',').map(s => s.trim()).filter(s => s);
                skillArray.forEach(skill => {
                    const span = document.createElement('span');
                    span.className = 'skill-tag';
                    span.textContent = skill;
                    skillsPreview.appendChild(span);
                });
                skillsSection.style.display = 'block';
            } else {
                skillsSection.style.display = 'none';
            }
        }

        function attachListeners() {
            const inputs = document.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.removeEventListener('input', updatePreview);
                input.addEventListener('input', updatePreview);
            });
        }

        function downloadResume() {
            window.print();
        }

        // Initialize
        addExperience();
        addEducation();
        attachListeners();
        updatePreview();