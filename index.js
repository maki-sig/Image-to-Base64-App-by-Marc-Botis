// marc botis
// image to base64 converter app
// 6/11/2025

const display = document.getElementById('text-area');
const image = document.getElementById('image-file');

// converter function by deepseek
async function imageToBase64(imageFile, includeMimeType = true) {
    // Validate input
    if (!(imageFile instanceof File)) {
        throw new Error('Input must be a File object');
    }

    // Check if file is an image
    if (!imageFile.type.startsWith('image/')) {
        throw new Error('File must be an image');
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result;
            resolve(includeMimeType ? result : result.split(',')[1]);
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(imageFile);
    });
}

function scrollToBottom(textarea) {
    textarea.scrollTop = textarea.scrollHeight;
}

async function convertClicked() {
    if (image.value === '') {
        display.value = 'Nothing to convert! Upload an image first.'
        return;
    }

    const base64String = await imageToBase64(image.files[0]);
    // const symbols = '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞';
    // const symbols = '10';
    const symbols = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    const targetLength = base64String.length;
    const intervalTime = 50; // every 50ms
    let interval;

    // Start shuffling
    interval = setInterval(() => {
        let shuffled = '';
        for (let i = 0; i < targetLength; i++) {
            shuffled += symbols[Math.floor(Math.random() * symbols.length)];
        }
        display.value = shuffled;

        // scrollToBottom(display);
    }, intervalTime);

    // Stop after 3 seconds and show final result
    setTimeout(() => {
        clearInterval(interval);
        display.value = base64String;
        // scrollToBottom(display);
    }, 1300);
}

function resetClicked() {
    display.value = '';
    image.value = '';
}

function copyClicked() {
    if (display.value === "" || display.value === 'Nothing to copy!' || display.value === 'Nothing to convert! Upload an image first.' || display.value === 'No image uploaded to preview.') {
        display.value = 'Nothing to copy!';
    } else {
        display.select();
        document.execCommand('copy');
        alert("Copied to clipboard!");
    }
}

function prevClicked() {
    const file = image.files[0];
    if (!file) {
        display.value = "No image uploaded to preview.";
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const imageUrl = e.target.result;
        const newTab = window.open();
        if (newTab) {
            newTab.document.write(`
                <html>
                    <head>
                        <title>Image Preview</title>
                        <style>
                            body {
                                margin: 0;
                                background-color: darkgrey;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                height: 100vh;
                            }
                            img {
                                max-width: 100%;
                                max-height: 100%;
                                object-fit: contain;
                            }
                        </style>
                    </head>
                        <body>
                            <img src="${imageUrl}" alt="Preview" />
                        </body>
                </html>
            `);
        } else {
            alert("Pop-up blocked! Please allow pop-ups for this site.");
        }
    };

    reader.readAsDataURL(file);
}