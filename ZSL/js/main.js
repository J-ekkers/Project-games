"use strict";
(self.webpackChunkBattleship = self.webpackChunkBattleship || []).push([
  [179],
  {
    747: () => {
      const e = function (e) {
          const t = {
              getHit() {
                --this.hitPoints, this.hitPoints <= 0 && (this.isSunk = !0);
              },
              rotate() {
                this.orientation =
                  "vertical" === this.orientation ? "horizontal" : "vertical";
              },
            },
            a = {
              name:
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "ship",
              length: e,
              hitPoints: e,
              orientation: "vertical",
              isOnBoard: !1,
              isSunk: !1,
            };
          return Object.assign(Object.create(t), a);
        },
        t = (e) => {
          const [t, a] = e;
          return {
            row: t,
            column: a,
            coordinates: e,
            id: null,
            isHit: !1,
            hasShip: !1,
            shipName: "",
          };
        },
        a = function () {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 10;
          const a = e ** 2,
            n = e,
            r = [],
            i = {
              findSquareWithID(e) {
                return this.state.find((t) => t.id === e);
              },
              findSquareWithRowCol(e) {
                return this.state.find(
                  (t) => t.row === e[0] && t.column === e[1],
                );
              },
              getValidSquaresToPlaceShipOn(e, t) {
                const [a, n] = e,
                  r = [];
                if ("vertical" === t.orientation)
                  for (let e = 0; e < t.length; e++) {
                    const t = this.findSquareWithRowCol([+a + e, n]);
                    if (!t || t.hasShip) return !1;
                    r.push(t);
                  }
                if ("horizontal" === t.orientation)
                  for (let e = 0; e < t.length; e++) {
                    const t = this.findSquareWithRowCol([a, +n + e]);
                    if (!t || t.hasShip) return !1;
                    r.push(t);
                  }
                return !this.getAdjacentSquares(r).some((e) => e.hasShip) && r;
              },
              placeShip(e, t) {
                const a = this.getValidSquaresToPlaceShipOn(e, t);
                return !(
                  !a ||
                  !a.length ||
                  (a.forEach((e) => {
                    (e.shipName = t.name), (e.hasShip = !0);
                  }),
                  0)
                );
              },
              getAdjacentSquares(e) {
                const t = [],
                  a = [-1, 0, 1];
                return (
                  e.forEach((e) => {
                    for (let n = 0; n < a.length; n++)
                      for (let r = 0; r < a.length; r++) {
                        const i = this.findSquareWithRowCol([
                          +e.row + a[n],
                          +e.column + a[r],
                        ]);
                        i && !t.find((e) => e.id === i.id) && t.push(i);
                      }
                  }),
                  t
                );
              },
              getExplodedSquares(e) {
                const t = this.findSquareWithRowCol(e).shipName,
                  a = r.filter((e) => e.shipName === t);
                return this.getAdjacentSquares(a);
              },
            };
          return (
            (() => {
              for (let a = 1; a <= e; a++) {
                const n = a;
                let i = 1;
                for (let a = 1; a <= e; a++) {
                  i = a;
                  const e = t([n, i]);
                  r.push(e);
                }
              }
              r.forEach((e, t) => (e.id = ++t));
            })(),
            Object.assign(Object.create(i), { size: a, state: r, dimension: n })
          );
        },
        n = function () {
          const t = {
              attack(e, t) {
                const a = e.board.findSquareWithRowCol(t);
                return (
                  !a.isHit &&
                  (a.isHit ||
                    (e.receiveAttack(t),
                    e.ships.every((e) => e.isSunk) && (this.isWinner = !0)),
                  !0)
                );
              },
              receiveAttack(e) {
                const t = this.board.findSquareWithRowCol(e);
                if (!t.isHit && ((t.isHit = !0), t.hasShip)) {
                  const a = this.ships.find((e) => e.name === t.shipName);
                  a.getHit(),
                    a.isSunk &&
                      this.board.getExplodedSquares(e).forEach((e) => {
                        e &&
                          (this.receiveAttack(e.coordinates), (e.isHit = !0));
                      });
                }
              },
              getRandomNumber: (e) => Math.ceil(Math.random() * +e),
              getRandomCoordinates(e) {
                return [this.getRandomNumber(e), this.getRandomNumber(e)];
              },
              generateAttack(e) {
                const t = this.getRandomCoordinates(e.board.dimension),
                  a = e.board.findSquareWithRowCol(t);
                return a.isHit
                  ? ((a && !a.isHit) || this.generateAttack(e), t)
                  : (this.attack(e, t), t);
              },
              generateShipPlacement(e, t) {
                t.orientation =
                  this.getRandomNumber(10) % 2 == 0 ? "vertical" : "horizontal";
                const a = this.getRandomCoordinates(e.dimension);
                e.getValidSquaresToPlaceShipOn(a, t)
                  ? this.board.placeShip(a, t)
                  : e.getValidSquaresToPlaceShipOn(a, t) ||
                    this.generateShipPlacement(e, t);
              },
              placeShipsOnGeneratedPlacements() {
                this.ships.map((e) =>
                  this.generateShipPlacement(this.board, e),
                );
              },
            },
            n = {
              name:
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : "human",
              board: a(10),
              ships: [
                e(5, "carrier"),
                e(4, "battleship"),
                e(3, "destroyer"),
                e(3, "submarine"),
                e(2, "patroller"),
              ],
              lastThreeMoves: [],
              isWinner: !1,
              isPlaying: !1,
              isComputer: !1,
            };
          return Object.assign(Object.create(t), n);
        },
        r = (e) => ({
          players: [n(e), n("computer")],
          playStatus: !0,
          currentPlayer: null,
          checkWinner() {
            return this.players.find((e) => e.isWinner);
          },
          goToNextPlayer() {
            this.players.forEach((e) => (e.isPlaying = !e.isPlaying));
          },
        }),
        i = (() => {
          const e = document.querySelector("#themeSwitch"),
            t = document.querySelector(".screen__start"),
            a = document.querySelector(".screen__ship-placement"),
            n = document.querySelector(".btn__start"),
            r = document.querySelector(".input__player-name"),
            i = (e) => {
              e.classList.add("hidden");
            },
            s = (e) => {
              e.classList.remove("hidden");
            };
          return {
            hideEl: i,
            unhideEl: s,
            addHandlerToggleTheme: () => {
              e.addEventListener("change", (e) => {
                e.target.checked
                  ? (document.body.classList.add("dark-mode"),
                    localStorage.setItem("preferredTheme", "dark"))
                  : (document.body.classList.remove("dark-mode"),
                    localStorage.setItem("preferredTheme", "light"));
              });
            },
            setPageTheme: () => {
              const t = localStorage.getItem("preferredTheme");
              t && "light" !== t
                ? "dark" === t &&
                  (document.body.classList.add("dark-mode"), (e.checked = !0))
                : (document.body.classList.remove("dark-mode"),
                  (e.checked = !1));
            },
            addHandlerStartGame: (e) => {
              n.addEventListener("click", (n) => {
                n.preventDefault(), r.value && (i(t), s(a), e(r.value));
              });
            },
          };
        })(),
        s = (() => {
          const e = document.querySelector(".board__ship-placement"),
            t = [...document.querySelectorAll(".ship__wrapper")],
            a = document.querySelector(".btn__rotate-ship");
          return {
            renderBoard: (t) => {
              const a = t
                .map((e) =>
                  ((e) =>
                    `\n            <div\n              class="square square__empty ${
                      e.hasShip ? "square__filled" : ""
                    }"\n              data-row="${
                      e.row
                    }"\n              data-column="${
                      e.column
                    }"\n              data-id="${
                      e.id
                    }"\n            ></div>\n  `)(e),
                )
                .join("");
              (e.innerHTML = ""), e.insertAdjacentHTML("afterbegin", a);
            },
            addHandlerFindShipSquares: (a, n) => {
              ((e) => {
                t.forEach((e) => e.classList.remove("ship__wrapper-active")),
                  t
                    .find((t) => t.dataset.ship === e.name)
                    .classList.add("ship__wrapper-active");
              })(a);
              const r = [...e.querySelectorAll(".square")];
              r.forEach((t) => {
                t.addEventListener("mouseenter", (t) => {
                  const { row: r, column: i } = t.target.dataset;
                  t.target.classList.add("square__placement-origin");
                  const s = n([+r, +i], a);
                  s &&
                    s.length === a.length &&
                    s.forEach((t) => {
                      e.querySelector(`.square[data-id="${t}"]`).classList.add(
                        "square__placement-adjacent",
                      );
                    });
                }),
                  t.addEventListener("mouseleave", (e) => {
                    e.target.classList.remove("square__placement-origin"),
                      r.forEach((e) =>
                        e.classList.remove("square__placement-adjacent"),
                      );
                  });
              });
            },
            addHandlerRotateShip: (e, t) => {
              a.addEventListener("click", () => {
                t(e);
              }),
                window.addEventListener("keydown", (a) => {
                  "spacebar" !== !a.key && t(e);
                });
            },
            addHandlerPlaceShip: (t, a) => {
              [...e.querySelectorAll(".square")].forEach((e) => {
                e.addEventListener("click", (e) => {
                  const { row: n, column: r } = e.target.dataset;
                  a([+n, +r], t);
                });
              });
            },
          };
        })(),
        o = s,
        d = (() => {
          const e = document.querySelector(".screen__ship-placement"),
            t = document.querySelector(".screen__game-display"),
            a = document.querySelector(".board__self"),
            n = document.querySelector(".board__opponent"),
            r = document.querySelector(".overlay__winner-display"),
            s = document.querySelector(".btn__reset"),
            o = document.querySelector(".battle-log"),
            d = document.querySelector(".battle-log__entry-wrapper"),
            c = (e) => {
              const t = e.isComputer ? n : a,
                r = e.board.state
                  .map((e) =>
                    ((e) =>
                      `\n    <div class="square square__${
                        e.isHit ? "damaged" : "base"
                      } ${
                        e.isHit && e.hasShip ? "square__has-ship" : ""
                      }" data-row="${e.row}" data-column="${
                        e.column
                      }" data-id="${e.id}"></div>`)(e),
                  )
                  .join("");
              (t.innerHTML = `<span class="board__label">${
                e.isComputer ? "Computer" : `${e.name}`
              } </span>`),
                t.insertAdjacentHTML("beforeend", r);
            };
          return {
            displayScreen: (a) => {
              i.hideEl(e),
                i.unhideEl(t),
                i.unhideEl(o),
                (d.innerHTML =
                  '<div class="battle-log__entry">\n              Het spel is begonnen\n            </div>'),
                (s.textContent = "Restart spel");
              const { players: n } = a,
                [r, l] = n;
              c(r), c(l);
            },
            renderBoard: c,
            addHandlerAttackEnemy: (e) => {
              [...n.querySelectorAll(".square")].forEach((t) =>
                t.addEventListener("click", (t) => {
                  const { row: a, column: n } = t.target.dataset;
                  e([+a, +n]);
                }),
              );
            },
            addHandlerNewGame: (a, n) => {
              s.addEventListener("click", () => {
                i.hideEl(t), i.hideEl(r), i.unhideEl(e), a(n);
              });
            },
            displayWinner: (e) => {
              i.unhideEl(r),
                (s.textContent = "Start nieuw spel"),
                (r.querySelector(".message__winner-main").textContent =
                  `De winnaar is ${e.name}!`),
                (r.querySelector(".message__winner-sub").textContent =
                  e.isComputer
                    ? "Je hebt verloren"
                    : "Je hebt gewonnen.");
            },
            updateLogs: (e, t) => {
              d.insertAdjacentHTML(
                "afterbegin",
                ` <div class="battle-log__entry">\n            ${e.name.toUpperCase()} valt aan op [${
                  t[0]
                }, ${t[1]}]\n        </div>\n    `,
              );
            },
          };
        })(),
        c = d;
      let l, h, u, m;
      const p = (e) => {
          e.rotate();
        },
        S = (e, t) => {
          const a = h.board.getValidSquaresToPlaceShipOn(e, t);
          return !(!a || a.some((e) => e.hasShip)) && a.map((e) => e.id);
        },
        g = (e) => {
          h.attack(u, e) &&
            (h.attack(u, e),
            c.renderBoard(u),
            c.updateLogs(h, e),
            l.checkWinner()
              ? c.displayWinner(h)
              : ((() => {
                  const e = u.generateAttack(h);
                  c.renderBoard(h),
                    c.updateLogs(u, e),
                    l.checkWinner() && c.displayWinner(u);
                })(),
                c.addHandlerAttackEnemy(g)));
        },
        y = (e, t) => {
          h.board.placeShip(e, t) &&
            (h.board.placeShip(e, t),
            o.renderBoard(h.board.state),
            (m.isOnBoard = !0),
            (m = h.ships.find((e) => !e.isOnBoard)),
            m
              ? _(m)
              : m ||
                (u.placeShipsOnGeneratedPlacements(),
                c.displayScreen(l),
                c.addHandlerAttackEnemy(g),
                c.addHandlerNewGame(q, h.name)));
        },
        _ = (e) => {
          o.addHandlerFindShipSquares(e, S),
            o.addHandlerRotateShip(e, p),
            o.addHandlerPlaceShip(e, y);
        },
        q = (e) => {
          (l = r(e)),
            ([h, u] = l.players),
            (u.isComputer = !0),
            ([m] = h.ships),
            o.renderBoard(h.board.state),
            _(m);
        };
      i.setPageTheme(), i.addHandlerToggleTheme(), i.addHandlerStartGame(q);
    },
  },
  (e) => {
    e((e.s = 747));
  },
]);