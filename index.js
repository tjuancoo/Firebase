
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { collection, addDoc, doc, setDoc, deleteDoc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  getRedirectResult,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";


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
const db = getFirestore(app);
const auth = getAuth(app);


let crear = document.getElementById("btnCrear");
let email = document.getElementById("inEmail");
let password = document.getElementById("inPass");

crear.addEventListener('click', function () {
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
let usuario = document.getElementById("user");
let form = document.getElementById("form")


iniciar.addEventListener('click', function () {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert("Has iniciado sesión correctamente " + user.email)
      // ...

      usuario.innerHTML = `<p class="user">Bienvenido ${user.email} </p>`
      document.getElementById('form').style.display = 'block';
      document.getElementById('reg').style.display = 'none';

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ' + ' + errorMessage)
    });
})

let cerrar = document.getElementById("btnCerrar");
cerrar.addEventListener("click", function () {
  signOut(auth).then(() => {
    // Sign-out successful.
    alert("Has cerrado sesión correctamente")
    usuario.innerHTML = `<p></p>`
    document.getElementById('form').style.display = 'none';
    document.getElementById('reg').style.display = 'block';
    document.getElementById('user').style.display = 'none';
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
google.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      document.getElementById('form').style.display = 'block';
      document.getElementById('reg').style.display = 'none';
      
      usuario.innerHTML = `<p class="user">Bienvenido ${user.email} </p>`
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

const guardar = document.getElementById("btnGuardar");
const nombre = document.getElementById("nom");
const apPat = document.getElementById("app");
const apMat = document.getElementById("apm");
let idU = document.getElementById("idU")
guardar.addEventListener("click", async () => {
  try{
    await setDoc(doc(db, "users", idU.value), {
      id: idU.value,
      name: nombre.value,
      app: apPat.value,
      apm: apMat.value
    });
    alert("Se han guardado sus datos correctamente");

  }
  catch(error) {
    alert(error)
  }

});


const actualizar = document.getElementById("btnVer")
const tabla = document.getElementById("table")
actualizar.addEventListener("click", async () => {
  tabla.innerHTML =
      `<tr>
      <td>Id</td>
      <td>Nombre</td>
      <td>Apellido Paterno</td>
      <td>Apellido Materno</td>
  </tr>`;
  document.getElementById('table').style.display = 'block';

  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {

      console.log(doc.id, " => ", doc.data());
      tabla.innerHTML +=
          `<tr>
          <td>${doc.id}</td>
          <td>${doc.data().name}</td>
          <td>${doc.data().app}</td>
          <td>${doc.data().apm}</td>
      </tr>`;
  });
});

const update = document.getElementById("btnUpdate")
update.addEventListener("click", async() => {
  const elementRef = doc(db, "users", idU.value);

  await updateDoc(elementRef, {
      name: nombre.value,
      app: apPat.value,
      apm: apMat.value
  });
});

const eliminar = document.getElementById("btnEliminar")
eliminar.addEventListener("click", async()=>{
  await deleteDoc(doc(db, "users", idU.value));
})

const providerFacebook = new FacebookAuthProvider();
let facebook = document.getElementById("btnFace");
facebook.addEventListener("click", function () {
  signInWithPopup(auth, providerFacebook)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      document.getElementById('form').style.display = 'block';
      document.getElementById('reg').style.display = 'none';
      usuario.innerHTML = `<p class="user">Bienvenido ${user.email} </p>`
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });
})













