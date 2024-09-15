import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDZOc-usFL4HhA301bGtW7WWFcI5LjBqoQ",
    authDomain: "baantai.firebaseapp.com",
    projectId: "baantai",
    storageBucket: "baantai.appspot.com",
    messagingSenderId: "475982191992",
    appId: "1:475982191992:web:cc8b112f1cf41951f8fc8d",
    measurementId: "G-PLFHQN4K8B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const table = document.getElementById("table")
const form =  document.getElementById("addForm")

// ** Firebase Database **

async function getUsersFav(db) {
    const usersFavCol = collection(db, 'users_fav')
    const usersFavSnapshot = await getDocs(usersFavCol)
    return usersFavSnapshot
}

function showData(oneUser){
    const row = table.insertRow(-1)
    const menuFavCol = row.insertCell(0)
    const deleteCol = row.insertCell(1)
    menuFavCol.innerHTML = oneUser.data().favorites

    // delete btn
    let deleteBtn = document.createElement('button')
    deleteBtn.textContent = "ลบเมนู"
    deleteBtn.setAttribute('class','btn btn-danger')
    deleteBtn.setAttribute('data-id',oneUser.id)
    deleteCol.appendChild(deleteBtn)
    deleteBtn.addEventListener('click',(e)=>{
        let id = e.target.getAttribute('data-id')
        deleteDoc(doc(db,'users_fav',id))
    })
}

//ดึงกลุ่ม document
const data = await getUsersFav(db)
data.forEach(oneUser =>{
    showData(oneUser)
})

// ดึงจากการพิมพ์ MEMO
form.addEventListener('submit',(e) =>{
    e.preventDefault()
    addDoc(collection(db,'users_fav'), {
        favorites:form.favorites.value
    })
    form.favorites.value=""
    alert("ADDED ❤️")
})