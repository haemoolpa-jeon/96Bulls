class userTypeStore {
  currentUserType = 'student';

  changeUserType = (type) => {
    this.currentUserType = type;
  }
}

let store = new userTypeStore();

export default store;
