//頁籤切換
const tabButtons = document.querySelectorAll('.tab_btn');
const loginForm = document.getElementById('login_form');
const registerForm = document.getElementById('register_form');
const modal = document.getElementById('successModal');
// const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');

//驗證規則

const validators = {
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ,
        message: '請輸入正確的電子信箱格式'
    },
    password: {
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
        message: '密碼至少需要6個字符，且包含1個字母和1個數字'
    },
    nickname: {
        pattern: /^.{2,10}$/,
        message: '長度需要在2-20個字符之間'
    }
};

//驗證錯誤訊息
function showError(input, message) {
    const errorElement = input.parentNode.querySelector('.error_message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.classList.add('input-error');
        input.classList.remove('input-success');
    }
}

//隱藏錯誤訊息
function hideError(input) {
    const errorElement = input.parentNode.querySelector('.error_message');
    if (errorElement) {
        errorElement.style.display = 'none';
        input.classList.remove('input-error');
        input.classList.add('input-success');
    }
}

//驗證單個輸入欄位
function validateField(input) {
    const value = input.value.trim();
    const fieldType = input.name;

    //檢查是否為空
    if (!value) {
        showError(input, '此欄位為必填');
        return false;
    }

    //根據欄位類型進行特定驗證
    if (validators[fieldType]) {
        if (!validators[fieldType].pattern.test(value)) {
            showError(input, validators[fieldType].message);
            return false;
        }
    }

    hideError(input);
    return true;
}

//驗證整個表單
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)){
            isValid = false;
        }
    });

    return isValid;
}

//即時驗證功能
function addRealTimeValidation() {
    const allInputs = document.querySelectorAll('input');

    allInputs.forEach(input => {
        //失去焦點時驗證
        input.addEventListener('blur', () =>{
            if (input.value.trim()) {
                validateField(input);
            }
        });

        //輸入時清除錯誤狀態
        input.addEventListener('input', () => {
            if(input.classList.contains('input-error')) {
                input.classList.remove('input-error');
                const errorElement = input.parentNode.querySelector('.error_message');
                if(errorElement) {
                    errorElement.style.display = 'none';
                }
            }
        });
    });
}

//切換標籤
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        clearAllErrors();

        //切換表單顯示
        const tabType = button.getAttribute('data-tab');
        if (tabType === 'login') {
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        }else{
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
        }
    });
});

//清除所有錯誤狀態
function clearAllErrors() {
    const allInputs = document.querySelectorAll('input');
    const allErrors = document.querySelectorAll('.error_message');

    allInputs.forEach(input => {
        input.classList.remove('input-error', 'input-success');
        input.value = '';
    });

    allErrors.forEach(error =>{
        error.style.display = 'none';
    });
}

/* 登入表單處理 */
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm(loginForm)) {
            showErrorModal('請檢查輸入格式並填寫所有必填欄位！');
            return;
    }

    const email = loginForm.querySelector('input[name="email"]').value;
    const password = loginForm.querySelector('input[name="password"]').value;

    modalMessage.textContent = '登入成功！歡迎回到 Mewseum！';
    showSuccessModal();
    console.log('登入資料', { email, password });
});

//註冊表單提交
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm(registerForm)) {
        showErrorModal('請檢查輸入格式並填寫所有必填欄位！');
        return;
    }

    const nickname = registerForm.querySelector('input[name="nickname"]').value;
    const email = registerForm.querySelector('input[name="email"]').value;
    const password = registerForm.querySelector('input[name="password"]').value;

    modalMessage.textContent = '註冊成功！';
    showSuccessModal();
    console.log('註冊資料', { nickname, email, password });
});

/* 新增 showErrorModal 函數*/
function showErrorModal(message) {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.classList.add('error');
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

//顯示成功彈跳視窗
function showSuccessModal() {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.classList.remove('error');
    modal.style.display = 'block';
}

//關閉彈跳視窗
function closeModal() {
    modal.style.display ='none';
    const modalContent = modal.querySelector('.modal-content');
    modalContent.classList.remove('error');
}

//點擊彈跳視窗外部關閉
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

//初始化即時驗證
document.addEventListener('DOMContentLoaded', () => {
    addRealTimeValidation();
})