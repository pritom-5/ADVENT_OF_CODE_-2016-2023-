class ReadNumber {
  s: string = "";

  constructor(private num: number) {
    this.num = num;
    this.s = String(this.num);
  }

  mutateNum() {
    let a = 0;
    let b = 1;
    let x = "";

    while (b <= this.s.length) {
      if (this.s[b] !== this.s[b - 1]) {
        x += `${this.s.slice(a, b).length}${this.s[b - 1]}`;
        a = b;
      }
      b++;
    }
    this.s = x;
  }

  mutationLoop(n: number) {
    while (n > 0) {
      this.mutateNum();
      n--;
    }

    console.log(this.s.length);
  }
}

const b = 1321131112;
const a = new ReadNumber(b);
a.mutationLoop(50);
