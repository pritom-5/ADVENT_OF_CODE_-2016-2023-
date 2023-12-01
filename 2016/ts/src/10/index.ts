function hello() {
  let h = "hello there";
  for (let i = 0; i < 10; i++) {
    h += `${i}`;
  }
  return h;
}
hello();
