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
    
    // استدعاء API لمولد النصوص
    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
        },
        body: JSON.stringify({
            prompt: textInput,
            max_tokens: 150
        })
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

function generateImage() {
    const imagePrompt = document.getElementById('image-prompt').value;
    const imageOutput = document.getElementById('image-output');
    
    // استدعاء API لإنشاء الصور
    fetch('https://api.example.com/image-generator', {  // استبدل هذا بالـ API المناسب
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
            prompt: imagePrompt
        })
    })
    .then(response => response.json())
    .then(data => {
        imageOutput.innerHTML = `<img src="${data.image_url}" alt="Generated Image" class="img-fluid">`;
    })
    .catch(error => {
        console.error('Error:', error);
        imageOutput.textContent = 'حدث خطأ، يرجى المحاولة مرة أخرى.';
    });
}
