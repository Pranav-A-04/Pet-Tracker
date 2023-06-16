const searchInput = document.querySelector("#search");
    searchInput.addEventListener("input", e=>{
        const value = e.target.value;
        console.log(value);
        let pets=[]
        pets.forEach(pet => {
            
        })
})


const searchFun = () => {
    let filter = document.getElementById('search');
    let table = document.getElementById('table');
    let tr = table.getElementsByTagName('tr');

    for(var i=0;i<tr.length;i++){
        let td = tr[i].getElementsByTagName('td')[0]
    }
}
