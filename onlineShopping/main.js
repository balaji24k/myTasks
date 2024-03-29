function saveToLocalStorage(event) {
    event.preventDefault();
    const Sellingprice = event.target.Sellingprice.value;
    const Productname = event.target.Productname.value;
    const Category = event.target.Category.value;


    const obj = {
        Sellingprice,
        Productname,
        Category

    }

    axios.post("https://crudcrud.com/api/8c94fd416c0c4c97bb4fe4ea03381db8/shoppingdetails",obj)
        .then((response) => {
            console.log(response)
        })

        .catch((err) => {
            console.log(err)
        })

    showNewUserOnScreen(obj);
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/8c94fd416c0c4c97bb4fe4ea03381db8/shoppingdetails")
    .then((response) => {
        console.log(response)

        for (var i=0; i<response.data.length; i++) {
            showNewUserOnScreen(response.data[i])
        }
    })

    .catch((error) => {
        console.log(error)
    })
})

function showNewUserOnScreen (user) {

    document.getElementById('Sellingprice').value='';
    document.getElementById('Productname').value='';


   if(user.Category==="Electronic"){
    const parentNode = document.getElementById('Electronic');
        const childHTML = `<li id=${user._id}> ${user.Productname} - ${user.Sellingprice}
            <button onclick=deleteUser('${user._id}')> Delete User </button> 
             </li>`

        parentNode.innerHTML = parentNode.innerHTML+childHTML;
    }
    else if(user.Category==="Food"){
        const parentNode = document.getElementById('Food');
            const childHTML = `<li id=${user._id}> ${user.Productname} - ${user.Sellingprice}
                <button onclick=deleteUser('${user._id}')> Delete User </button> 
                </li>`

            parentNode.innerHTML = parentNode.innerHTML+childHTML;
        }
        else{
            const parentNode = document.getElementById('Skincare');
                const childHTML = `<li id=${user._id}> ${user.Productname} - ${user.Sellingprice}
                    <button onclick=deleteUser('${user._id}')> Delete User </button> 
                    </li>`

                parentNode.innerHTML = parentNode.innerHTML+childHTML;
            }


}

function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/8c94fd416c0c4c97bb4fe4ea03381db8/shoppingdetails/${userId}`)
        .then((response) => {
            removeUserFromScreen(userId)
        })
        .catch((err) => {
            console.log(err)
        })



}   

function removeUserFromScreen(userId){
    const parentNode = document.getElementById('Electronic','Food','Skincare');
    const childNodeToBeDeleted = document.getElementById(userId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }

}