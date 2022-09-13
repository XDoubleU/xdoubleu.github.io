const COUNT_MAX = 8;

let count = 0;


function getExtraRepos(repos){
    $.each(repos, function(index, repo){
        $.ajax({
            url: "https://api.github.com/repos/" + repo.name,
            dataType: 'jsonp',
            success: function(data){
                count+=1;

                data = data.data;
                $("#projects").append(
                    `<div class="col-sm-3 custom-card">
                            <a href="${data.html_url}"><h5>${data.name}</h5></a>
                            <div>${generateTagHtml(data.topics)}</div>
                            <div>${generateDescriptionHtml(data.description)}</div>
                            <div>${generateLanguageHtml(data.language)}</div>
                    </div>`
                );
            }
        })
    });
}

function getRepos(username){
    $.ajax({
        url: "https://api.github.com/users/" + username + "/repos?type=all&sort=pushed",
        dataType: 'jsonp',
        success: function(data){
            $.each(data.data, function(index, repo){
                if(count < COUNT_MAX && repo.topics.length > 0 && repo.description != null){
                    count += 1;
                    
                    $("#projects").append(
                        `<div class="col-sm-3 custom-card">
                            <a href="${repo.html_url}"><h5>${repo.name}</h5></a>
                            <div>${generateTagHtml(repo.topics)}</div>
                            <div>${generateDescriptionHtml(repo.description)}</div>
                            <div>${generateLanguageHtml(repo.language)}</div>
                        </div>`
                    );
                }         
            });

            if (count >= COUNT_MAX){
                $("#projects").append(
                    `<div class="col-sm-3 custom-card d-flex align-items-center justify-content-center">
                        <a href="https://github.com/${username}?tab=repositories"><h5>See more →</h5></a>
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

function getWorkshops(workshops){
    $.each(workshops, function(index, workshop){
            $("#workshops").append(
                `<div class="col-sm-3 custom-card">
                    <h5><a href="${workshop.url}">${workshop.title}</a></h5>
                    <p>${workshop.time}</p>
                    <p>${workshop.description}</p>
                </div>`
            );
    });
}
