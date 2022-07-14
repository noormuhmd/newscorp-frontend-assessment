const collections = getCollections();

//fetching landingCollection info if 'landing' is present
const landingCollectionId = collections && collections.length != 0 ? collections.find(c=> c.name.toLowerCase() === 'landing') : null;

if(landingCollectionId){
    loadLandingPage(landingCollectionId)
}

//function to fetch landing page block
function loadLandingPage(id){
    const collectionDetailsData = getCollectionDetails(2);
    if(collectionDetailsData){
        collectionDetailsData.forEach((d, i) =>{
            //to bind data to UI
            //detailedView(intro, comments) will be only shown for first two
            if(d){
                bindCollectionDetails(i, d, i<=1);
                if(i == 0){
                    // handling highlight of first two words of breaking news explicitily
                    let introWords = d.intro ? d.intro.split(' ') : null;
                    if(introWords && introWords.length > 2){
                        document.getElementById("cl-0-intro").innerHTML = `
                        <span>${introWords.slice(0, 2).join(' ')} </span>
                        ${introWords.slice(2).join(' ')}
                    `
                    }
                }
            }
        });
    }
}

//function to bind collection details
//intro and comments count are shown for detailed view only
//make use of index to identify the ids of corresponding element
function bindCollectionDetails(index, data, detailedView = false){
    document.getElementById(`cl-${index}-img`).src = data.imageUrl;
    document.getElementById(`cl-${index}-title`).innerHTML = data.title;
    if(detailedView){
        document.getElementById(`cl-${index}-intro`).innerHTML = data.intro;
        document.getElementById(`cl-${index}-footer`).innerHTML = getFooterContents(data.published, data.comments);
    }
    else{
        document.getElementById(`cl-${index}-footer`).innerHTML = getFooterContents(data.published, null);
    }
}

//function to set footer(published, comments section at the bottom) contents
function getFooterContents(published, comments){
    let contents = '';
    if(published){
        contents += `
            <i class="fa-regular fa-clock fa-sm"></i>
            <span>${getPublishedTime(published)}</span>
        `;
    }
    if(comments || comments == 0){
        contents += `<i class="fa-regular fa-message fa-sm"></i>`;
        if(comments != 0){
            contents += `<span>${comments}</span>`;
        }
    }
    
    return contents;
}

//functions to convert minutes to approximate hour, day, etc..
function getPublishedTime(minutes){
    if(!minutes) return '';
    if(minutes < 60) return `${minutes}m`;
    if(minutes < 1440) return `${Math.round(minutes/60)}h`;
    if(minutes < 10080) return `${Math.round(minutes/1440)}d`;
    if(minutes < 525600) return `${Math.round(minutes/10080)}w`;
    return `${Math.round(minutes/525600)}y`;
}

//mock method to get collections
//this will be replaced by actual api call
function getCollections(){
    return [
        {
            id: 1,
            name: "Home"
        },
        {
            id: 2,
            name: "landing"
        },
        {
            id: 3,
            name: "announcements"
        }
    ]
};

//mock method to get collection details based on collectionId
//this will be replaced by actual api call
function getCollectionDetails(collectionId){
    return [
        {
            id:1,
            title: "Live: Greg Inglis to announce NRL Retirement",
            imageUrl: "./assets/image-1.png",
            intro: "Rabbitohs star Greg Inglis has arrived at South Sydney headquarters and will front a media conference later this morning to announce his retirement from rugby league.",
            published: 2,
            comments:0
        },
        {
            id:2,
            title: "Opal Tower units still closed as work only approved now",
            imageUrl: "./assets/image-2.png",
            intro: "People are still unable to move back into almost half the apartments in Opal Tower more than three months after cracks appeared in the trouble-plagued building and final rectification works have only just been given the green light",
            published: 60,
            comments:1
        },
        {
            id:3,
            title: "One Nation Support has crashed: Newspoll",
            imageUrl: "./assets/image-3.png",
            intro: "This is a sample intro",
            published: 75
        },
        {
            id:4,
            title: "Two fake cops robbed Sydney currency exchange shop",
            imageUrl: "./assets/image-4.png",
            intro: "Another sample intro",
            published: 185
        }
    ]
};

