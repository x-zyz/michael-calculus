#!/usr/bin/env python3
"""Symbolic verification for Section 5-3 (bankDefiniteMethods.ts)."""

import mpmath as mp
import sympy as sp

x, t, y, u = sp.symbols("x t y u", real=True)
a = sp.Symbol("a", positive=True)
k = sp.Symbol("k", real=True, nonzero=True)
xp = sp.Symbol("xp", positive=True)


def check_eq(item_id: str, lhs, rhs) -> None:
    diff = sp.simplify(sp.expand_trig(lhs - rhs))
    if diff != 0:
        diff = sp.simplify(sp.trigsimp(lhs - rhs))
    if diff != 0:
        if diff.free_symbols:
            raise AssertionError(f"{item_id}: mismatch\n  lhs={lhs}\n  rhs={rhs}\n  diff={diff}")
        val = abs(complex(diff.evalf(30)))
        assert val < 1e-20, f"{item_id}: numerical mismatch {val}\n  lhs={lhs}\n  rhs={rhs}"
    print(f"OK  {item_id}", flush=True)


def double_factorial(n: int) -> int:
    res = 1
    while n > 1:
        res *= n
        n -= 2
    return res


def main() -> None:
    # 1-1 .. 1-26
    check_eq(
        "jc935-5-3-1-1",
        sp.integrate(sp.cos(x + sp.pi / 6), (x, sp.pi / 6, 5 * sp.pi / 6)),
        -sp.sqrt(3) / 2,
    )
    check_eq(
        "jc935-5-3-1-2",
        sp.integrate(1 / (2 + 3 * x) ** 3, (x, 0, 1)),
        sp.Rational(7, 200),
    )
    check_eq(
        "jc935-5-3-1-3",
        sp.integrate(sp.cos(x) * sp.sin(x) ** 4, (x, 0, sp.pi / 2)),
        sp.Rational(1, 5),
    )
    check_eq(
        "jc935-5-3-1-4",
        sp.integrate(2 - sp.sin(t) ** 3, (t, 0, sp.pi)),
        2 * sp.pi - sp.Rational(4, 3),
    )
    check_eq(
        "jc935-5-3-1-5",
        sp.integrate(sp.sin(x) ** 2, (x, sp.pi / 6, sp.pi / 2)),
        sp.pi / 6 + sp.sqrt(3) / 8,
    )
    check_eq(
        "jc935-5-3-1-6",
        sp.integrate(sp.sqrt(3 - x ** 2), (x, 0, sp.sqrt(3))),
        3 * sp.pi / 4,
    )
    check_eq(
        "jc935-5-3-1-7",
        sp.integrate(sp.sqrt(6 - 3 * y ** 2), (y, -1, 1)),
        sp.sqrt(3) * (sp.pi + 2) / 2,
    )
    check_eq(
        "jc935-5-3-1-8",
        sp.integrate(sp.sqrt(4 - x ** 2) / x ** 2, (x, 1, 2)),
        sp.sqrt(3) - sp.pi / 3,
    )
    # 1-9: substitute x = 2*a*sin(u), u in [0, pi/2]
    check_eq(
        "jc935-5-3-1-9",
        16 * a ** 4 * sp.integrate(sp.sin(u) ** 2 * sp.cos(u) ** 2, (u, 0, sp.pi / 2)),
        sp.pi * a ** 4,
    )
    check_eq(
        "jc935-5-3-1-10",
        sp.integrate(1 / (x ** 2 * sp.sqrt(4 + x ** 2)), (x, 2, 2 * sp.sqrt(3))),
        sp.sqrt(2) / 4 - sp.sqrt(3) / 6,
    )
    check_eq(
        "jc935-5-3-1-11",
        sp.integrate(x / sp.sqrt(9 - 4 * x), (x, 0, 2)),
        sp.Rational(7, 6),
    )
    check_eq(
        "jc935-5-3-1-12",
        sp.integrate(1 / (2 + sp.sqrt(x)), (x, 1, 9)),
        4 - 4 * sp.log(sp.Rational(5, 3)),
    )
    check_eq(
        "jc935-5-3-1-13",
        sp.integrate(1 / (sp.sqrt(4 - x) - 2), (x, 3, 4)),
        2 - 4 * sp.log(2),
    )
    # 1-14: substitute x = a*t, t in [0, sqrt(3)]
    check_eq(
        "jc935-5-3-1-14",
        a * sp.integrate(t / sp.sqrt(4 - t ** 2), (t, 0, sp.sqrt(3))),
        a,
    )
    check_eq(
        "jc935-5-3-1-15",
        sp.integrate(t * sp.exp(-t ** 2 / 4), (t, 0, 2)),
        2 * (1 - sp.exp(-1)),
    )
    check_eq(
        "jc935-5-3-1-16",
        sp.integrate(1 / (x * sp.sqrt(1 + sp.log(x))), (x, 1, sp.exp(3))),
        2,
    )
    check_eq(
        "jc935-5-3-1-17",
        sp.integrate((x + 1) / (x ** 2 - 2 * x + 2), (x, 0, 2)),
        sp.pi,
    )
    check_eq(
        "jc935-5-3-1-18",
        sp.integrate(x / (x ** 2 + 2 * x + 2) ** 2, (x, -2, 0)),
        -sp.pi / 4 - sp.Rational(1, 2),
    )
    # 1-19: odd integrand on symmetric interval [-2, 2]
    f19 = x ** 2 * sp.sin(3 * x)
    assert sp.simplify(f19.subs(x, -x) + f19) == 0
    check_eq("jc935-5-3-1-19", sp.integrate(f19, (x, -2, 2)), 0)

    check_eq(
        "jc935-5-3-1-20",
        sp.integrate(6 * sp.sin(x) ** 4, (x, -sp.pi / 2, sp.pi / 2)),
        9 * sp.pi / 4,
    )
    check_eq(
        "jc935-5-3-1-21",
        sp.integrate(sp.asin(x) ** 2 / sp.sqrt(1 - x ** 2), (x, -sp.sqrt(2) / 2, sp.sqrt(2) / 2)),
        sp.pi ** 3 / 96,
    )
    # 1-22: odd integrand on symmetric interval [-3, 3]
    f22 = x ** 5 * sp.cos(x) ** 2 / (x ** 4 + 3 * x ** 2 + 2)
    assert sp.simplify(f22.subs(x, -x) + f22) == 0
    print("OK  jc935-5-3-1-22", flush=True)

    check_eq(
        "jc935-5-3-1-23",
        sp.integrate(sp.sin(x) * sp.cos(2 * x), (x, 0, sp.pi)),
        -sp.Rational(2, 3),
    )
    # 1-24: sqrt(sin(x) - sin(x)^3) = sqrt(sin(x)) * |cos(x)| on [0, pi]
    assert sp.simplify(sp.sin(x) - sp.sin(x) ** 3 - sp.sin(x) * sp.cos(x) ** 2) == 0
    check_eq(
        "jc935-5-3-1-24",
        2 * sp.integrate(sp.sqrt(sp.sin(x)) * sp.cos(x), (x, 0, sp.pi / 2)),
        sp.Rational(4, 3),
    )
    # 1-25: sqrt(1 - cos(2x)) = sqrt(2) * |sin(x)| on [-pi/2, pi/2]
    assert sp.simplify(1 - sp.cos(2 * x) - 2 * sp.sin(x) ** 2) == 0
    check_eq(
        "jc935-5-3-1-25",
        2 * sp.integrate(sp.sqrt(2) * sp.sin(x), (x, 0, sp.pi / 2)),
        2 * sp.sqrt(2),
    )
    # 1-26: |cos(x - 2)| has period pi; verify both symbolically (per period) and via mpmath
    per_period = sp.integrate(sp.cos(u), (u, 0, sp.pi / 2)) + sp.integrate(-sp.cos(u), (u, sp.pi / 2, sp.pi))
    check_eq("jc935-5-3-1-26", 3 * per_period, 6)
    mp.mp.dps = 25
    q26 = mp.quad(lambda v: abs(mp.cos(v - 2)), [0, mp.pi / 2 + 2 - mp.pi, mp.pi / 2 + 2, 3 * mp.pi / 2 + 2, 5 * mp.pi / 2 + 2, 3 * mp.pi])
    assert abs(q26 - 6) < mp.mpf("1e-20"), f"1-26 quadrature mismatch: {q26}"

    # Question 3 (exact symbolic identity for xp > 0)
    lhs_q3 = sp.integrate(1 / (4 + t ** 2), (t, xp, 2))
    rhs_q3 = sp.integrate(1 / (4 + t ** 2), (t, 2, 4 / xp))
    diff_q3 = sp.simplify(sp.diff(lhs_q3 - rhs_q3, xp))
    assert diff_q3 == 0, f"jc935-5-3-3 derivative mismatch: {diff_q3}"
    assert sp.simplify((lhs_q3 - rhs_q3).subs(xp, 2)) == 0, "jc935-5-3-3 point mismatch"
    print("OK  jc935-5-3-3", flush=True)

    # Question 7 (inverse function integral via integration by parts)
    f_x = x * sp.exp(x ** 2 / 2)
    inv_integral = (x * f_x).subs(x, 2) - (x * f_x).subs(x, 0) - sp.integrate(f_x, (x, 0, 2))
    check_eq("jc935-5-3-7", inv_integral, 3 * sp.exp(2) + 1)

    # 8-1 .. 8-11
    check_eq(
        "jc935-5-3-8-1",
        sp.integrate(x * sp.exp(-2 * x), (x, 0, 1)),
        sp.Rational(1, 4) - 3 / (4 * sp.exp(2)),
    )
    check_eq(
        "jc935-5-3-8-2",
        sp.integrate(x ** 2 * sp.log(x), (x, 1, sp.E)),
        (2 * sp.E ** 3 + 1) / 9,
    )
    check_eq(
        "jc935-5-3-8-3",
        sp.integrate(t * sp.cos(k * t), (t, 0, sp.pi / k)),
        -2 / k ** 2,
    )
    check_eq(
        "jc935-5-3-8-4",
        sp.integrate(x / sp.cos(x) ** 2, (x, 0, sp.pi / 4)),
        sp.pi / 4 - sp.log(2) / 2,
    )
    # 8-5: verify via FTC (F'(x) = ln(x)/sqrt(x))
    F8_5 = 2 * sp.sqrt(x) * (sp.log(x) - 2)
    assert sp.simplify(sp.diff(F8_5, x) - sp.log(x) / sp.sqrt(x)) == 0
    check_eq("jc935-5-3-8-5", F8_5.subs(x, 9) - F8_5.subs(x, 1), 12 * sp.log(3) - 8)
    check_eq(
        "jc935-5-3-8-6",
        sp.integrate(x * sp.atan(x), (x, 0, sp.sqrt(3))),
        2 * sp.pi / 3 - sp.sqrt(3) / 2,
    )
    check_eq(
        "jc935-5-3-8-7",
        sp.integrate(sp.exp(3 * x) * sp.sin(x), (x, 0, sp.pi / 2)),
        (3 * sp.exp(3 * sp.pi / 2) + 1) / 10,
    )
    check_eq(
        "jc935-5-3-8-8",
        sp.integrate(x * sp.log(x, 3), (x, 1, 3)),
        sp.Rational(9, 2) - 2 / sp.log(3),
    )
    check_eq(
        "jc935-5-3-8-9",
        sp.integrate((x * sp.cos(x)) ** 2, (x, 0, sp.pi)),
        sp.pi ** 3 / 6 + sp.pi / 4,
    )
    # 8-10: verify via FTC (F'(x) = cos(ln x))
    F8_10 = x * (sp.cos(sp.log(x)) + sp.sin(sp.log(x))) / 2
    assert sp.simplify(sp.diff(F8_10, x) - sp.cos(sp.log(x))) == 0
    check_eq(
        "jc935-5-3-8-10",
        F8_10.subs(x, sp.E) - F8_10.subs(x, 1),
        (sp.E * (sp.cos(1) + sp.sin(1)) - 1) / 2,
    )
    check_eq(
        "jc935-5-3-8-11",
        sp.integrate(-sp.log(x), (x, 1 / sp.E, 1)) + sp.integrate(sp.log(x), (x, 1, sp.E ** 2)),
        sp.E ** 2 + 2 - 2 / sp.E,
    )

    # 8-12: Wallis formula check for n = 1..6 via x = 2 sin(u)
    for n in range(1, 7):
        val = 2 ** (n + 1) * sp.integrate(sp.cos(u) ** (n + 1), (u, 0, sp.pi / 2))
        if n % 2 == 1:
            expected = 2 ** (n + 1) * sp.Rational(double_factorial(n), double_factorial(n + 1)) * sp.pi / 2
        else:
            expected = 2 ** (n + 1) * sp.Rational(double_factorial(n), double_factorial(n + 1))
        check_eq(f"jc935-5-3-8-12 (n={n})", val, expected)

    # 8-13: Wallis formula check for n = 1..6 splitting at pi/2
    for n in range(1, 7):
        val = sp.integrate(x * sp.cos(x) ** n, (x, 0, sp.pi / 2)) + sp.integrate(
            x * (-sp.cos(x)) ** n, (x, sp.pi / 2, sp.pi)
        )
        if n == 1:
            expected = sp.pi
        elif n % 2 == 1:
            expected = sp.Rational(double_factorial(n - 1), double_factorial(n)) * sp.pi
        else:
            expected = sp.Rational(double_factorial(n - 1), double_factorial(n)) * sp.pi ** 2 / 2
        check_eq(f"jc935-5-3-8-13 (n={n})", val, expected)

    print("All Section 5-3 symbolic checks passed!", flush=True)


if __name__ == "__main__":
    main()
