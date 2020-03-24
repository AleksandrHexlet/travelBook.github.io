class UserInfo {
  constructor (form, username, job, avatar) {
    this.form = form;
    this.username = username;
    this.job = job;
    this.avatar = avatar;
  }
  setUserInfo () {
    this.form.username.value = this.username.textContent;
    this.form.job.value = this.job.textContent;
  }
  updateUserInfo (data) {
    this.username.textContent = data.name;
    this.job.textContent = data.about;
  }
  updateUserAvatar (data) {
    this.avatar.style.backgroundImage = `url(${data.avatar})`;
  }
}















// class UserInfo {
//   constructor (form, username, job, api) {
//     this.form = form;
//     this.username = username;
//     this.job = job;
//     this.api = api;
//   }

//   setUserInfo () {
//     api.getUserInfoFromServer ( this.username,this.job).then (res => {
//       this.username.textContent = res.name;
//       this.job.textContent = res.about;
//     });
//   }
//   updateUserInfo () {
// 	  api.sendUserInfo().then(res => {
// 		this.username.textContent = this.form.username.value;
// 		this.job.textContent = this.form.job.value;
// 		console.log (this.form);
// 	  });

//   }
// }

// api.getUserInfoFromServer(){

// class UserInfo {
//   constructor(form, username, job) {
//     this.form = form;
//     this.username = username;
//     this.job = job;
//   }
//   setUserInfo() {
//     this.form.username.value = this.username.textContent;
//     this.form.job.value = this.job.textContent;
//   }
//   updateUserInfo() {
//     this.username.textContent = this.form.username.value;
//     this.job.textContent = this.form.job.value;
//     console.log(this.form);
//   }
// }
