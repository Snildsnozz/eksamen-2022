function logud() {
    localStorage.removeItem('user'); //logger brugeren ud. 
    location.href = '/views/login.html';
}