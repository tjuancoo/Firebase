
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, getRedirectResult } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA8OTw0wrGKWvdX-5SXKBBMs5CGcjXpelE",
    authDomain: "prueba-2ac35.firebaseapp.com",
    projectId: "prueba-2ac35",
    storageBucket: "prueba-2ac35.appspot.com",
    messagingSenderId: "602138508420",
    appId: "1:602138508420:web:80717f7fde464c491a96d1",
    measurementId: "G-VPNGKG24LW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let crear = document.getElementById("btnCrear");
let email = document.getElementById("inEmail");
let password = document.getElementById("inPass");

crear.addEventListener('click', function(){
    createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("Su cuenta se ha creado exitosamente");

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + ' + ' + errorMessage)
    // ..
  });

})

let iniciar = document.getElementById("btnIniciar");
let usuario = document.getElementById("user")


iniciar.addEventListener('click', function(){
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("Has iniciado sesión correctamente " + user.email)
    // ...

    usuario.innerHTML = `<p>Bienvenido ${user.email} </p>`
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + ' + ' + errorMessage)
  });
})

let cerrar = document.getElementById("btnCerrar");
cerrar.addEventListener("click", function(){
  signOut(auth).then(() => {
    // Sign-out successful.
    alert("Has cerrado sesión correctamente")
    usuario.innerHTML = `<p></p>`
    location.reload()
  }).catch((error) => {
    // An error happened.
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + ' + ' + errorMessage)
  });
})

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
  
    
    
    // ...
  } else {
    // User is signed out
    // ...
    
  }
});

const provider = new GoogleAuthProvider();
let google = document.getElementById("btnGoogle")
google.addEventListener("click", function(){
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

})













