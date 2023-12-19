class Password {
  private letter_arr: number[] = [];
  private expired_passwords: string[] = [];

  private bad_letters = [105, 111, 108];

  constructor(private input: string) {
    this.input = input;

    this.makeLetterArr(this.input);
  }

  private makeLetterArr(password: string) {
    for (let i = 0; i < password.length; i++) {
      this.letter_arr.push(password[i].charCodeAt(0));
    }
  }

  private updatePassword() {
    let i = 1;
    while (true) {
      if (this.letter_arr[this.letter_arr.length - i] === 122) {
        this.letter_arr[this.letter_arr.length - i] = 97;
        i++;
      } else {
        this.letter_arr[this.letter_arr.length - i]++;
        break;
      }
    }
  }

  private has3increasingLetters() {
    let l = 0;
    let h = 2;

    while (h < this.letter_arr.length) {
      if (
        this.letter_arr[l] + 1 === this.letter_arr[l + 1] &&
        this.letter_arr[l + 1] + 1 === this.letter_arr[h]
      ) {
        return true;
      }
      l++;
      h++;
    }
    return false;
  }

  private doesntHaveBadLetters() {
    for (let i = 0; i < this.letter_arr.length; i++) {
      if (this.bad_letters.includes(this.letter_arr[i])) {
        return false;
      }
    }
    return true;
  }

  private hasTwoPairRepeatingCh() {
    let count = 0;
    let s = 0;
    let prev_pair = 0;

    while (s < this.letter_arr.length - 1) {
      if (
        this.letter_arr[s] === this.letter_arr[s + 1] &&
        this.letter_arr[s] !== prev_pair
      ) {
        count++;
        prev_pair = this.letter_arr[s];
      }
      s++;
    }

    return count > 1;
  }

  addExpiredPassword(pass: string) {
    this.expired_passwords.push(pass);
  }

  private hasExpired() {
    if (
      this.expired_passwords.includes(
        this.convertPasswordToString(this.letter_arr)
      )
    ) {
      return true;
    }
    return false;
  }

  findNewPassword() {
    while (true) {
      console.log(this.letter_arr);
      if (
        this.has3increasingLetters() &&
        this.doesntHaveBadLetters() &&
        this.hasTwoPairRepeatingCh() &&
        !this.hasExpired()
      ) {
        break;
      }
      this.updatePassword();
    }

    return this.convertPasswordToString();
  }

  private convertPasswordToString(pass_arr: number[] = this.letter_arr) {
    let new_password = "";
    pass_arr.forEach((item) => {
      new_password += String.fromCharCode(item);
    });

    return new_password;
  }
}

const a = "hijklmmn";
const b = "abbceffg";
const c = "abd";
const d = "hxbxwxba";
const e = "hxbxxyzz";
const p = new Password(e);
p.addExpiredPassword(e);
console.log(p.findNewPassword());
