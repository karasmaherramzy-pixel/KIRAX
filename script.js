// تعريف المتغيرات
const youtubeBtn = document.getElementById('youtubeBtn');
const discordBtn = document.getElementById('discordBtn');
const lockBtn = document.getElementById('lockBtn');
const lockText = document.getElementById('lockText');
const skipContainer = document.getElementById('skipContainer');
const skipTimer = document.getElementById('skipTimer');
const codeContainer = document.getElementById('codeContainer');
const codeDisplay = document.getElementById('codeDisplay');
const copyBtn = document.getElementById('copyBtn');

let youtubeCompleted = false;
let discordCompleted = false;
let lockUnlocked = false;
let skipTimerInterval = null;
let secondsLeft = 60;

// مفاتيح الأيام (مفاتيح اليوم فقط، بدون أيام)
const dailyKeys = [
    "KIRA9X7A2FQ81MZ",
    "4TQKIRAP8Z1N6Y", 
    "X7KIRA2M9B5QF8",
    "9Z1MFKIRA7TQX8",
    "KIRA5Q7Z9M1X8F",
    "T8M9QKIRA1X7ZF",
    "7X9KIRAFQ1MZ8T"
];

// معالج حدث زر يوتيوب
youtubeBtn.addEventListener('click', function(e) {
    if (!youtubeCompleted) {
        // فتح رابط اليوتيوب في نافذة جديدة
        window.open('https://www.youtube.com/@KIRAX-q6b2y', '_blank');
        
        // تمييز الزر كمكتمل
        youtubeCompleted = true;
        youtubeBtn.classList.add('completed');
        youtubeBtn.querySelector('span').innerHTML = '<span class="success">✔ تمت المراجعة</span>';
        
        // التحقق من إتمام الخطوتين
        checkStepsCompletion();
    }
});

// معالج حدث زر ديسكورد
discordBtn.addEventListener('click', function(e) {
    if (!discordCompleted) {
        // فتح رابط الديسكورد في نافذة جديدة
        window.open('https://discord.gg/D7VpwYkU', '_blank');
        
        // تمييز الزر كمكتمل
        discordCompleted = true;
        discordBtn.classList.add('completed');
        discordBtn.querySelector('span').innerHTML = '<span class="success">✔ تمت المراجعة</span>';
        
        // التحقق من إتمام الخطوتين
        checkStepsCompletion();
    }
});

// التحقق من إتمام الخطوتين
function checkStepsCompletion() {
    if (youtubeCompleted && discordCompleted && !lockUnlocked) {
        // فتح القفل
        lockBtn.classList.remove('locked');
        lockBtn.classList.add('unlocked');
        lockBtn.innerHTML = '<i class="fas fa-unlock"></i>';
        lockText.textContent = 'تم فتح القفل! اضغط لبدء التخطي';
        lockText.classList.add('unlocked');
        lockUnlocked = true;
        
        // تفعيل النقر على القفل
        lockBtn.addEventListener('click', startSkipProcess);
    }
}

// بدء عملية التخطي
function startSkipProcess() {
    if (!lockUnlocked) return;
    
    // إخفاء المربع الرئيسي
    document.querySelector('.main-box').style.display = 'none';
    
    // إظهار مربع التخطي
    skipContainer.style.display = 'block';
    
    // بدء العد التنازلي
    secondsLeft = 60;
    updateSkipTimer();
    
    skipTimerInterval = setInterval(() => {
        secondsLeft--;
        updateSkipTimer();
        
        if (secondsLeft <= 0) {
            clearInterval(skipTimerInterval);
            showKey();
        }
    }, 1000);
}

// تحديث مؤقت التخطي
function updateSkipTimer() {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    skipTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// عرض مفتاح اليوم
function showKey() {
    // إخفاء مربع التخطي
    skipContainer.style.display = 'none';
    
    // الحصول على اليوم الحالي
    const today = new Date();
    const dayIndex = today.getDay(); // 0 للأحد، 1 للإثنين، إلخ
    const todayKey = dailyKeys[dayIndex];
    
    // عرض المفتاح
    codeDisplay.textContent = todayKey;
    
    // تحديث العنوان ليكون "مفتاح اليوم" فقط
    document.querySelector('.code-title').textContent = 'مفتاح اليوم';
    
    // إظهار مربع المفتاح
    codeContainer.style.display = 'block';
    
    // تسجيل في الكونسول
    console.log(`مفتاح اليوم هو: ${todayKey}`);
    console.log('المفاتيح الأخرى مخفية حسب الطلب.');
}

// نسخ المفتاح
copyBtn.addEventListener('click', function() {
    const key = codeDisplay.textContent;
    
    // استخدام Clipboard API إذا كان متاحًا
    if (navigator.clipboard) {
        navigator.clipboard.writeText(key).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
            copyBtn.style.background = 'linear-gradient(90deg, #00aa00, #008800)';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = 'linear-gradient(90deg, #ff0080, #aa00ff)';
            }, 2000);
        });
    } else {
        // طريقة بديلة للمتصفحات القديمة
        const textArea = document.createElement('textarea');
        textArea.value = key;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
        copyBtn.style.background = 'linear-gradient(90deg, #00aa00, #008800)';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = 'linear-gradient(90deg, #ff0080, #aa00ff)';
        }, 2000);
    }
});

// تهيئة الواجهة
function init() {
    // إضافة تأثيرات للخلفية
    const background = document.querySelector('.background');
    setInterval(() => {
        const hue = Math.floor(Math.random() * 360);
        background.style.background = `linear-gradient(45deg, #000000 0%, #0a0020 25%, #100033 50%, #1a0044 75%, #220055 100%)`;
    }, 10000);
    
    // تحديث الشريط المتحرك
    const marquee = document.querySelector('.marquee');
    const marqueeTexts = [
        "Neon Glow: 📺 YouTube 🔴 | 🤖 Roblox | 💻 أكواد برمجة",
        "KIRAX: بوابة الأكواد السايبرية | أكواد يومية مجانية",
        "انسخ المفتاح اليومي واستمتع بالمزايا الحصرية"
    ];
    let marqueeIndex = 0;
    
    setInterval(() => {
        marqueeIndex = (marqueeIndex + 1) % marqueeTexts.length;
        marquee.innerHTML = `<span class="neon-text">${marqueeTexts[marqueeIndex]}</span>`;
    }, 15000);
}

// تشغيل التهيئة عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', init);