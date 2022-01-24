function getRepos(username){
    $.ajax({
        url: "https://api.github.com/users/" + username + "/repos",
        dataType: 'jsonp',
        success: function(data){
            var count = 0;

            $.each(data.data, function(index, repo){
                if(count < 7 && repo.topics.length > 0 && repo.description != null){
                    count += 1;
                    
                    $('#projects').append(
                        `<div class="custom-card">
                            <a href="${repo.html_url}"><h5>${repo.name}</h5></a>
                            <div style="height:30px">${generateTagHtml(repo.topics)}</div>
                            <div style="height:50px">${generateDescriptionHtml(repo.description)}</div>
                            <div style="height:25px">${generateLanguageHtml(repo.language)}</div>
                        </div>`
                    );
                }         
            });

            if (count >= 7){
                $('#projects').append(
                    `<div class="custom-card">
                        <a href="https://github.com/${username}"><h5>See more</h5></a>
                    </div>`
                );
            }
        }
    });
}

function generateDescriptionHtml(description){
    if (description == null){
        return "";
    }

    return `<p>${description}</p>`;
}

function generateTagHtml(tags){
    var html = "";
    var char_count = 0;
    $.each(tags, function(index, tag){
        if (char_count + tag.length <= 35){
            html += `<span class="tag">${tag}</span>`;
            char_count += tag.length;
        }
    });
    return html;
}

function generateLanguageHtml(language){
    if (language == null){
        return "";
    }

    return `<span class="language">
                <span class="circle" style="background-color: ${getLanguageColor(language)}"></span>
                ${language}
            </span>`;
}

function getLanguageColor(language){
    var result = "";

    if (language == null){
        return null;
    }
    
    $.ajax({
        async: false,
        url: "/assets/json/colors.json",
        dataType: 'json',
        success: function(data){
            result = data[language].color;
        }
    });

    return result;
}

function getHardSkills(hardskills){
    $('#hard-skills').append(
        `hard-skills<br>`
    );

    $.each(hardskills, function(index, hardskill){
        if(index == hardskills.length - 1){
            $('#hard-skills').append(
                `└── ${hardskill.name}<br>
                ${generateSkillsHtml(hardskill.skills, true)}`
            );
        }
        else{
            $('#hard-skills').append(
                `├── ${hardskill.name}<br>
                ${generateSkillsHtml(hardskill.skills, false)}`
            );
        }
    });
}

function generateSkillsHtml(skills, last){
    var html = "";

    $.each(skills, function(index, skill){
        if (!last){
            html += "|";
        }
        else{
            html+= "&nbsp;";
        }

        if(index == skills.length - 1){
            html += `&nbsp;&nbsp;&nbsp;└── ${skill.name}<br>`;
        }
        else{
            html += `&nbsp;&nbsp;&nbsp;├── ${skill.name}<br>`;
        }
    });
    
    return html;
}

function getSoftSkills(softskills){
    $.each(softskills, function(index, softskill){
        $('#soft-skills').append(
            `<span class="tag" style="font-size:1em;line-height:2em;">${softskill.name}</span>`
        );
    });
}

function getExperiences(experiences){
    $.each(experiences, function(index, experience){
        if(experience.end == null){
            $('#experiences').append(
                `<div class="custom-card">
                    <h5>${experience.title}</h5>
                    <p>${experience.company}</p>
                    <p>${experience.start} - Present</p>
                </div>`
            );
        }
        else{
            $('#experiences').append(
                `<div class="custom-card">
                    <h5>${experience.title}</h5>
                    <p>${experience.company}</p>
                    <p>${experience.start} - ${experience.end}</p>
                </div>`
            );
        }
    });
}

function getEducation(educations){
    $.each(educations, function(index, education){
        if(education.end == null){
            $('#education').append(
                `<div class="custom-card">
                    <h5>${education.name}</h5>
                    <p>${education.school}</p>
                    <p>${education.start} - Present</p>
                </div>`
            );
        }
        else if(education.start == null){
            $('#education').append(
                `<div class="custom-card">
                    <h5>${education.name}</h5>
                    <p>${education.school}</p>
                    <p>Graduated in ${education.end}</p>
                </div>`
            );
        }
        else if(education.start == education.end){
            $('#education').append(
                `<div class="custom-card">
                    <h5>${education.name}</h5>
                    <p>${education.school}</p>
                    <p>${education.start}</p>
                </div>`
            );
        }
        else{
            $('#education').append(
                `<div class="custom-card">
                    <h5>${education.name}</h5>
                    <p>${education.school}</p>
                    <p>${education.start} - ${education.end}</p>
                </div>`
            );
        }
    });
}