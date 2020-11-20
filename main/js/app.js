import { timeDifferenceForDate } from  '../js/utils';


  const githubUrl = 'https://api.github.com/graphql';
        const token = 'M2ZmY2ZmODFiY2EyMDA5NDYzNDA2MTk3NmM0OWY4YzIxZGY5ZjUzZQ==';
        let dec = atob(token);
        const oauth = {Authorization: 'bearer ' + dec}


        const content = {
            "query": `{
                user(login: "seyicole") {
                    repositories(affiliations: OWNER, first: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
                    totalCount
                    nodes {
                        updatedAt
                        description
                        forkCount
                        hasIssuesEnabled
                        languages(first: 1, orderBy: {field: SIZE, direction: ASC}) {
                        nodes {
                            name
                            color
                        }
                        }
                        name
                        url
                    }
                    }
                    avatarUrl(size: 460)
                    bio
                    name
                    url
                    followers {
                    totalCount
                    }
                    following {
                    totalCount
                    }
                    websiteUrl
                    starredRepositories {
                    totalCount
                    }
                    login
                }
                }`
        }
        const body = JSON.stringify(content);
        

        fetch(githubUrl,  {
            method: 'POST',
            headers: oauth,
            body: body
        })
            .then(res => res.json())
            .then((data) => {
                profileData(data.data.user), 
                console.log(data)
                repoData(data.data.user)
                })
             .catch(e => console.log(e));



// Destructuring n defining moments of the profile data from api

const profileData =  ({
  name, 
  login,
 avatarUrl, 
 bio, 
 followers, 
 following, 
 url, 
 starredRepositories,
 websiteUrl
 }) => {
 

let ffers =followers.totalCount
let ffing = following.totalCount
let starredRepos = starredRepositories.totalCount

document.querySelector('.profile-avi').src = avatarUrl
document.querySelector('.bio-avatar').src = avatarUrl;
document.querySelector('.mobile-avi').src = avatarUrl
document.querySelector('.bio-name').innerHTML = name;
document.querySelector('.login-name').innerHTML = login;
document.querySelector('.mobile-name').innerHTML = login;
document.querySelector('.followers').innerHTML = ffers
document.querySelector('.following').innerHTML = ffing
document.querySelector('.stars').innerHTML = starredRepos
document.querySelector('.website').innerHTML = websiteUrl
document.getElementById("web").href = websiteUrl;

 }


 //repositories data and list structuring

 const repoData = ({repositories}) => {
  const main = document.getElementById('repo-list')
    let repoList = repositories.nodes
    repoList.map((repo) => {
      let repoList = `<div class="repos"><div>
          <a href="${repo.url}" class="repo-name">${repo.name}</a>
          <p>${repo.description === null? '' : `<p class="desc">${repo.description}</p>`}</p> 
          <div class="color-lang">
              <div class="repo-color" style="background-color:${repo.languages.nodes[0].color};"></div>
              <p>${repo.languages.nodes[0].name}</p>
              <p>Updated ${ timeDifferenceForDate(repo.updatedAt)}</p>  
          </div>
      </div>
      <div class="star-repo">
          <button>
              <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" 
              aria-hidden="true">
              <path style="fill:gray" fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 
              01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766
              8a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018
               .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75
                0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75
                 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                 </path>
                 </svg>
          <p>Star</p>
          </button>
          <hr>    
      </div>
      </div>
      <hr class="hr">`
      ;
    main.innerHTML += repoList 
    })
 }



    // Navbar function

    function myFunction() {
        let element = document.getElementById("myLinks");
        element.classList.toggle("links");
    }    



    // Sticky header
    window.onscroll = function() {scrollFunction()};

    var header = document.getElementById("sticky-header");
    var sticky = header.offsetTop;

    function scrollFunction() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }

   