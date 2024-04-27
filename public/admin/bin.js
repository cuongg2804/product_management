// const config = require("../../config/system");

//GET BUTTON 
// const button_list = document.querySelectorAll("[button_status]");
// if(button_list.length > 0) {
//     button_list.forEach((button) => {
//         const url = new URL(window.location.href)
//         button.addEventListener("click", () => {
//             if(button.getAttribute("button_status"))
//                 url.searchParams.set("status",button.getAttribute("button_status"))
//             else
//                 url.searchParams.delete("status")
        
//             window.location.href = url 
//         })
//     })
// }

//Pagination 
const button_page = document.querySelectorAll("[button-page]");
if(button_page.length > 0) {
    button_page.forEach((button) => {
        const url = new URL(window.location.href)
        button.addEventListener("click", () => {
            if(button.getAttribute("button-page"))
                url.searchParams.set("page",button.getAttribute("button-page"))
            else
                url.searchParams.delete("page")
            window.location.href = url 
        })
    })
}
//End Pagination

//Form Search
const  form_search = document.querySelector("#form-search");
if(form_search){
    const url = new URL(window.location.href);
    form_search.addEventListener("submit", (event) => {
        event.preventDefault();
        const keyword = event.target.elements.keyword.value ;
        if(keyword) {
            url.searchParams.set("keyword",keyword);
        }
        else{
            url.searchParams.delete("keyword");
        }
        window.location.href = url;
    })
}

//End form search 





//BIN

const button_recovery = document.querySelectorAll("[recovery]");
button_recovery.forEach((button) => {
    button.addEventListener("click", () => {
        const isConfirm = confirm("Bạn có chắc muốn khôi phục bản ghi ?");
        const form_recovery = document.querySelector("[form-recovery]");
        console.log(form_recovery);
        if(isConfirm){
            const id = button.getAttribute("id");
            const path = form_recovery.getAttribute("data-path") ;
            form_recovery.action = `${path}/${id}?_method=PATCH` ;
            form_recovery.submit();
        }
        
    })
})


//End Bin


