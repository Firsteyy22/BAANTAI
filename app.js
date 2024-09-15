import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, reload, signOut, setPersistence, browserSessionPersistence, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

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
const auth = getAuth(app);
// Use one of the available persistence options, such as 'session', 'local', or 'none'
setPersistence(auth, browserSessionPersistence);

// ** LOGIN / SIGNUP **
document.addEventListener('DOMContentLoaded', () => {
    const formArea = document.getElementById("form-area");
    const registerForm = document.getElementById('registerForm');
    const welcome = document.getElementById("welcome");
    const emailShow = document.getElementById("emailShow"); 


    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = registerForm.email.value;
            const password = registerForm.password.value;
            const repassword = registerForm.repassword.value;
            const username = registerForm.username.value;

            if (password !== repassword) {
                alert('Password do not match');
                return;
            }

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Update user profile asynchronously
                await updateProfile(user, { displayName: username });

                // Reload user to get the updated information
                await reload(user);

                alert('สร้างบัญชีผู้ใช้ สำเร็จ');

                // Now you should be able to access user.displayName
                console.log('User Display Name:', user.displayName);
            } catch (error) {
                alert(error.message);
            }
        });
    }

    onAuthStateChanged(auth, (user) => {
        // login
        if (user) {
            profile.style.display = "block";
            formArea.style.display = "none";
            welcome.innerText = `ยินดีต้อนรับ ${user.displayName}`;
            emailShow.innerText = `Email: ${user.email}`;
        } else {
            profile.style.display = "none";
            formArea.style.display = "block";
        }
    });


});
    logout.addEventListener("click", (e) => {
        signOut(auth).then(() => {
            alert("ออกจากระบบเรียบร้อย");
        }).catch((error) => {
            alert(error.message);
        });
    });


    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        // const username = loginForm.displayName.value;
        signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
            alert("Log in successfully");
        }).catch((error) => {
            alert(error.message);
        });
    });