var container = document.createElement("div");
container.innerHTML = `<div class="container">
<br/>
<div class="row justify-content-center">
                    <div class="col-12 col-md-10 col-lg-8">
                    <h4>Cats,cats Everywhere</h4>
                            <div class="card-body row no-gutters align-items-center">
                           
                                <div class="col-auto">
                                    <i class="fas fa-search h4 text-body"></i>
                                </div>
                                
                                <!--end of col-->
                                <div class="col">
                                    <input class="form-control form-control-lg form-control-borderless search_text" type="search" placeholder="Type something to search">
                                </div>
                                <!--end of col-->
                                <div class="col-auto search">
                                    <button onclick="search()" class="btn btn-lg btn-success">Search</button>
                                </div>
                                <!--end of col-->
                            </div>
                        
                    </div>
                    <!--end of col-->
                </div>
</div>`;
document.body.append(container);
const main_info = document.createElement("div");
main_info.setAttribute("class", "m_info");
async function getCatsData() {
    const data = await fetch("https://cataas.com/api/cats");
    const cats = await data.json();
    console.log(cats);
    cats.forEach((cat) => getCats(cat));
}
getCatsData();
function getCats({ id, created_at, tags }) {
    console.log("im here");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var date = new Date(created_at).getDate();
    var year = new Date(created_at).getFullYear();
    var month_name = monthNames[new Date(created_at).getMonth()];

    const info = document.createElement("div");
    info.setAttribute("class", "info");
    //  ${new Date(createdAt).toDateString()}
    info.innerHTML = `<div class="img_container"><img id="catImage" onclick="openImage('${id}')" src="https://cataas.com/cat/${id}"></div>`;
    const details = document.createElement("div");
    details.setAttribute("class", "details");
    const create_date = document.createElement("div");
    create_date.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
   </svg>
   ${date} ${month_name} ${year} <div class="modal myModal" id='${id}'>

   <!-- Modal content -->
   <div class="modal-content">
     <div class="modal-header">
     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
     <span aria-hidden="true">&times;</span>
   </button>
       
     </div>
     <div class="modal-body">
     <img src="https://cataas.com/cat/${id}">
    
     </div>
     <div class="modal-footer">
     <button type="button" onclick="close('${id}')" class="btn btn-secondary" data-dismiss="modal">Close</button>
     </div>
   </div>
 </div>`;
    
   
  



    const tag_div = document.createElement('div');
    tag_div.setAttribute("class", "tagdiv");
    tag_div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tag" viewBox="0 0 16 16">
<path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z"/>
<path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z"/>
</svg>`;
    tags.forEach((tag) => {
        const cat_tag = document.createElement('span');
        cat_tag.setAttribute("class", "badge badge-danger");
        console.log(tag);
        cat_tag.innerHTML = `${tag}`;
        tag_div.append(cat_tag);

    })
    details.append(create_date, tag_div);
    console.log("innertext");
    console.log(info.innerText);
info.append(details);
    main_info.append(info);
    document.body.append(main_info);
}
async function search() {
    console.log("function called");
    const search = document.querySelector(".search_text").value;
    console.log(search);
    const data = await fetch("https://cataas.com/api/cats?tags=" + search);
    const cats_data = await data.json();
    console.log("cats_data");
    console.log(cats_data);
    document.querySelector(".m_info").innerHTML = '';
    (".user_list").innerHTML = '';
    cats_data.forEach((cats) =>
        getCats(cats));
}


function openImage(id) {


    document.getElementById(id).style.display = 'block';
}

document.getElementsByClassName("close").addEventListener("click", close_modal, true);

function close(id) {
    console.log("close");

    document.getElementById(id).style.display = 'none';
}