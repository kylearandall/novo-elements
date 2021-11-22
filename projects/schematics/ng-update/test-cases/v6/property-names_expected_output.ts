/*
 * Fake definitions because the property name rules can only determine the host type
 * properly by using type checking.
 */

class NovoModalRef {
  _onClosed: any;
}

class NovoModalService {
  open: (x: string) => NovoModalRef;
}

/* Actual test case using the previously defined definitions. */

class A {
  self = { me: this };
  b: NovoModalRef;

  constructor(private a: NovoModalRef, private s: NovoModalService) {}

  onClick() {
    this.a.onClosed.then(() => console.log('Closed'));
    this.b.onClosed.then(() => console.log('Closed'));

    const c = this.s.open('test');
    c.onClosed.then(() => console.log('Closed'));
  }
}
