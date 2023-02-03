const COUNT_MAX = 8;

let countProjects = 0;
let countWorkshops = 0;
let countExperiences = 0;

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
        if (char_count + tag.length <= 30){
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

    return `<span class="circle" style="background-color: ${getLanguageColor(language)}"></span>
            ${language}`;
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

function getRepos(username){
    $.ajax({
        url: "https://api.github.com/users/" + username + "/repos?type=all&sort=pushed",
        dataType: 'jsonp',
        success: function(data){
            $.each(data.data, function(index, repo){
                if(countProjects <= COUNT_MAX-1 && repo.topics.length > 0 && repo.description != null && !repo.description.includes("practice")){
                    countProjects++;
                    
                    $("#projects").append(
                        `<div class="col-sm-3 custom-card" style="padding-bottom: 2.5em">
                            <a href="${repo.html_url}"><h5>${repo.name}</h5></a>
                            <div>${generateTagHtml(repo.topics)}</div>
                            <div>${generateDescriptionHtml(repo.description)}</div>
                            <div class="language">${generateLanguageHtml(repo.language)}</div>
                        </div>`
                    );
                }         
            });

            $("#projects").append(
                `<div class="col-sm-3 custom-card d-flex align-items-center justify-content-center">
                    <a href="https://github.com/${username}?tab=repositories"><h5>See more →</h5></a>
                </div>`
            );
        }
    });
}

function getWorkshops(workshops){
    $.each(workshops, function(index, workshop){
            if (countWorkshops <= COUNT_MAX/2) {
                countWorkshops++;
                $("#workshops").append(
                    `<div class="col-sm-3 custom-card">
                        <h5>${workshop.title}</h5>
                        <p>${workshop.time}</p>
                        <p>${workshop.description}</p>
                    </div>`
                );
            }
    });
}

function getExperiences(experiences){
    $.each(experiences, function(index, experience){
            if (countExperiences <= COUNT_MAX/2) {
                countExperiences++;
                $("#experiences").append(
                    `<div class="col-sm-3 custom-card">
                        <h5>${experience.title}</h5>
                        <h6>${experience.company}</h6>
                        <p>${experience.time}</p>
                        <p>${experience.description}</p>
                    </div>`
                );
            }
    });
}