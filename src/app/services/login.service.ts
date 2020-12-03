import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  /*static shuffle(array) {
    let currentIndex = array.length, temp, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    console.log('shuffled');
    return array;
  }*/

  static getInfo() {
      return {username:'tata_emp',password:'pass@123'};
  }

  static performLogin(username:string, password:string) {
    if(username == 'tata_emp' && password == 'pass@123')
        return true;
    return false;
  }
}
