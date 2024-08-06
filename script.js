function showTool(toolName) {
    const toolContainer = document.getElementById('tool-container');
    
    switch(toolName) {
        case 'text-generator':
            toolContainer.innerHTML = `
                <h2>مولد النصوص</h2>
                <div>
                    <textarea id="text-input" class="form-control" rows="4" placeholder="اكتب نص هنا..."></textarea>
                    <button class="btn btn-primary mt-2" onclick="generateText()">توليد النص</button>
                    <div id="text-output" class="mt-3"></div>
                </div>
            `;
            break;
        case 'image-generator':
            toolContainer.innerHTML = `
                <h2>أداة إنشاء الصور</h2>
                <div>
                    <input type="text" id="image-prompt" class="form-control" placeholder="أدخل وصف الصورة...">
                    <button class="btn btn-primary mt-2" onclick="generateImage()">توليد الصورة</button>
                    <div id="image-output" class="mt-3"></div>
                </div>
            `;
            break;
        // أضف باقي الأدوات هنا بنفس الطريقة
        default:
            toolContainer.innerHTML = `<p>يرجى اختيار أداة من القائمة.</p>`;
    }
}

function generateText() {
    const textInput = document.getElementById('text-input').value;
    const textOutput = document.getElementById('text-output');
    
    fetch('http://localhost:3000/generate-text', { // تأكد من استخدام عنوان الخادم المناسب في الإنتاج
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: textInput })
    })
    .then(response => response.json())
    .then(data => {
        textOutput.textContent = data.choices[0].text.trim();
    })
    .catch(error => {
        console.error('Error:', error);
        textOutput.textContent = 'حدث خطأ، يرجى المحاولة مرة أخرى.';
    });
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign up new users
function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log('User signed up:', user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing up:', errorCode, errorMessage);
        });
}

// Sign in existing users
function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('User signed in:', user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing in:', errorCode, errorMessage);
        });
}
<div id="auth-container">
    <h2>تسجيل الدخول</h2>
    <div>
        <input type="email" id="login-email" placeholder="البريد الإلكتروني">
            <input type="password" id="login-password" placeholder="كلمة المرور">
                <button onclick="signIn(document.getElementById('login-email').value, document.getElementById('login-password').value)">تسجيل الدخول</button>
            </div>

            <h2>إنشاء حساب</h2>
            <div>
                <input type="email" id="signup-email" placeholder="البريد الإلكتروني">
                    <input type="password" id="signup-password" placeholder="كلمة المرور">
                        <button onclick="signUp(document.getElementById('signup-email').value, document.getElementById('signup-password').value)">إنشاء حساب</button>
                    </div>
            </div>
