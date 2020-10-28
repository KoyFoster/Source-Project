// import React from 'react';

class UserData {
  constructor(name) {
    // vars
    this.var = name;
  }
  Get() {
    return localStorage.getItem(this.var);
  }
  Set(data) {
    return localStorage.setItem(this.var, data);
  }
}

export default UserData;
