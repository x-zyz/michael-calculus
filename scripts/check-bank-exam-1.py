#!/usr/bin/env python3
"""Symbolic verification for Section exam-1 (Functions, Limits, and Continuity)."""

import math
import sympy as sp

x, t, a, b, k, n = sp.symbols("x t a b k n", real=True)
n_pos = sp.symbols("n_pos", positive=True, integer=True)


def check_eq(name: str, actual, expected):
    diff = sp.simplify((actual - expected).rewrite(sp.exp))
    assert diff == 0, f"{name} failed: actual={actual}, expected={expected}, diff={diff}"


def main():
    # Q1: counterexamples and strict monotonicity for 2a + atan(a) = 0
    assert sp.simplify(2 * 2 - 2**2) == 0
    assert sp.simplify(1 - sp.sqrt(abs(1))) == 0
    f3 = 2 * a + sp.atan(a)
    assert sp.simplify(f3.subs(a, 0)) == 0
    assert sp.simplify(sp.diff(f3, a) - (2 + 1 / (1 + a**2))) == 0

    # Q2: lim_{x->+oo} [(ax + b)e^{2/x} - 3x] = 5 => a=3, b=-1
    lim2 = sp.limit((3 * x - 1) * sp.exp(2 / x) - 3 * x, x, sp.oo)
    check_eq("jc935-exam-1-2", lim2, 5)

    # Q3: lim_{x->0+} (1 - cos(sqrt(3x))) / (a x) = 3 / (2a) => ab = 3/2
    a_nz = sp.symbols("a_nz", nonzero=True, real=True)
    lim3 = sp.limit((1 - sp.cos(sp.sqrt(3 * x))) / (a_nz * x), x, 0, dir="+")
    check_eq("jc935-exam-1-3", lim3 * a_nz, sp.Rational(3, 2))

    # Q4: 2x - arcsin(2x) ~ (-4/3) x^3 as x -> 0 => k = 3
    lim4 = sp.limit((2 * x - sp.asin(2 * x)) / x**3, x, 0)
    check_eq("jc935-exam-1-4", lim4, sp.Rational(-4, 3))

    # Q5: I(x) = int_0^{x^3} ln(1+t^2) dt; I(x)/x^9 -> 1/3, I(x)/x^8 -> 0
    # Using L'Hopital: d/dx I(x) = 3 x^2 ln(1 + x^6)
    i5_prime = 3 * x**2 * sp.log(1 + x**6)
    check_eq("jc935-exam-1-5 (order 9)", sp.limit(i5_prime / (9 * x**8), x, 0), sp.Rational(1, 3))
    check_eq("jc935-exam-1-5 (vs x^8)", sp.limit(i5_prime / (8 * x**7), x, 0), 0)

    # Q6: lim_{x->0} (e^{2x} + a x^2 + b x)^{1/x^2} = e^3 => a=1, b=-2
    lim6 = sp.limit((sp.exp(2 * x) + 1 * x**2 - 2 * x) ** (1 / x**2), x, 0)
    check_eq("jc935-exam-1-6", lim6, sp.exp(3))

    # Q7: compare orders of I1, I2, I3 as x -> 0+
    i7_1_p = sp.exp(x**3) - 1
    i7_2_p = sp.sin(sp.tan(x) ** 2) * sp.sec(x) ** 2
    i7_3_p = sp.sin(1 - sp.cos(2 * x)) ** 2 * (2 * sp.sin(2 * x))
    check_eq("jc935-exam-1-7 I1 (order 4)", sp.limit(i7_1_p / (4 * x**3), x, 0, dir="+"), sp.Rational(1, 4))
    check_eq("jc935-exam-1-7 I2 (order 3)", sp.limit(i7_2_p / (3 * x**2), x, 0, dir="+"), sp.Rational(1, 3))
    check_eq("jc935-exam-1-7 I3 (order 6)", sp.limit(i7_3_p / (6 * x**5), x, 0, dir="+"), sp.Rational(8, 3))

    # Q8: continuity of f(x)+g(x) at x=-1 and x=1 => a=3, b=-5
    sol8 = sp.solve([a * (-1) - 1 - (2 * (-1) - 2), 2 * 1 - 2 - (2 * 1 + b + 3)], [a, b])
    check_eq("jc935-exam-1-8 a", sol8[a], 3)
    check_eq("jc935-exam-1-8 b", sol8[b], -5)

    # Q9: f(x) = e^{1/(x-2)} ln|1+2x| / ((e^{3x}-1)(x-1))
    f9_pos = sp.exp(1 / (x - 2)) * sp.log(1 + 2 * x) / ((sp.exp(3 * x) - 1) * (x - 1))
    check_eq("jc935-exam-1-9 at x=0", sp.limit(f9_pos, x, 0), -sp.Rational(2, 3) * sp.exp(-sp.Rational(1, 2)))
    assert sp.limit(sp.Abs(f9_pos), x, 1, dir="+") == sp.oo
    assert sp.limit(f9_pos, x, 2, dir="+") == sp.oo
    assert sp.limit(sp.Abs(f9_pos), x, -sp.Rational(1, 2), dir="+") == sp.oo

    # Q10: lim_{x->0} ((1+sin 2x)/(1-sin 2x))^{1/tan(kx)} = e^2 => k=2
    lim10 = sp.limit(((1 + sp.sin(2 * x)) / (1 - sp.sin(2 * x))) ** (1 / sp.tan(2 * x)), x, 0)
    check_eq("jc935-exam-1-10", lim10, sp.exp(2))

    # Q11: lim_{x->0} (1/sin(x) - 1/ln(1+x)) = -1/2
    lim11 = sp.limit(1 / sp.sin(x) - 1 / sp.log(1 + x), x, 0)
    check_eq("jc935-exam-1-11", lim11, -sp.Rational(1, 2))

    # Q12: lim_{x->+oo} x^2 [arctan(x+3) - arctan(x)] = 3
    lim12 = sp.limit(x**2 * (sp.atan(x + 3) - sp.atan(x)), x, sp.oo)
    check_eq("jc935-exam-1-12", lim12, 3)

    # Q13: f(x) = lim_{n->oo} (2n+1)(x-1) / (n(x-1)^2 + 3) = 2/(x-1) for x!=1, 0 for x=1
    x_ne1 = sp.symbols("x_ne1", nonzero=True, real=True)
    lim13 = sp.limit((2 * n_pos + 1) * x_ne1 / (n_pos * x_ne1**2 + 3), n_pos, sp.oo)
    check_eq("jc935-exam-1-13", lim13, 2 / x_ne1)
    assert sp.limit(sp.Abs(2 / (x - 1)), x, 1, dir="+") == sp.oo

    # Q14: lim_{x->0+} (e^{sin 2x} - 1) / arctan(x/3) = 6 => a = 6
    lim14 = sp.limit((sp.exp(sp.sin(2 * x)) - 1) / sp.atan(x / 3), x, 0, dir="+")
    check_eq("jc935-exam-1-14", lim14, 6)

    # Q15: oblique asymptote of y = x(2 + arctan(3/x)) => y = 2x + 3
    y15 = x * (2 + sp.atan(3 / x))
    k15 = sp.limit(y15 / x, x, sp.oo)
    b15 = sp.limit(y15 - k15 * x, x, sp.oo)
    check_eq("jc935-exam-1-15 k", k15, 2)
    check_eq("jc935-exam-1-15 b", b15, 3)

    # Q16: lim_{x->0} (2x + 3^x)^{3/x} = 27 e^6
    lim16 = sp.limit((2 * x + 3**x) ** (3 / x), x, 0)
    check_eq("jc935-exam-1-16", lim16, 27 * sp.exp(6))

    # Q17: lim_{x->0} [(1 + int_0^x cos(t^2) dt) / ln(1+x) - 1 / tan(x)] = 3/2
    lim17_a = sp.limit(1 / sp.log(1 + x) - 1 / sp.tan(x), x, 0)
    lim17_b = sp.limit(sp.cos(x**2) / (1 / (1 + x)), x, 0)
    check_eq("jc935-exam-1-17", lim17_a + lim17_b, sp.Rational(3, 2))

    # Q18: oblique asymptote of y = x^{1+x} / (2+x)^x (x > 0) => y = x/e^2 + 2/e^2
    x_pos = sp.symbols("x_pos", positive=True)
    y18 = x_pos * sp.exp(-x_pos * sp.log(1 + 2 / x_pos))
    check_eq("jc935-exam-1-18 rewrite", sp.log(x_pos ** (1 + x_pos) / (2 + x_pos) ** x_pos), sp.log(y18))
    k18 = sp.limit(y18 / x_pos, x_pos, sp.oo)
    b18 = sp.limit(y18 - k18 * x_pos, x_pos, sp.oo)
    check_eq("jc935-exam-1-18 k", k18, sp.exp(-2))
    check_eq("jc935-exam-1-18 b", b18, 2 * sp.exp(-2))

    # Q19: (1 + 2/n)^n - e^2 ~ b / n^a as n -> oo => a=1, b=-2e^2
    lim19 = sp.limit(((1 + 2 / n_pos) ** n_pos - sp.exp(2)) / (-2 * sp.exp(2) / n_pos), n_pos, sp.oo)
    check_eq("jc935-exam-1-19", lim19, 1)

    # Q20: lim_{x->0} [a arctan(1/x) + (1 + 2|x|)^{1/x}] exists => a = (e^{-2} - e^2)/pi
    lim20_r = sp.limit(a * sp.atan(1 / x) + (1 + 2 * x) ** (1 / x), x, 0, dir="+")
    lim20_l = sp.limit(a * sp.atan(1 / x) + (1 - 2 * x) ** (1 / x), x, 0, dir="-")
    sol20 = sp.solve(lim20_r - lim20_l, a)[0]
    check_eq("jc935-exam-1-20", sol20, (sp.exp(-2) - sp.exp(2)) / sp.pi)

    # Q21: piecewise f(x) at x=0: left=6a, right=a^2+8, f(0)=12 => a=2 (cont), a=4 (removable)
    lim21_l = sp.limit(sp.log(1 + a * x**3) / (x - sp.sin(x)), x, 0, dir="-")
    lim21_r = sp.limit((sp.exp(a * x) + 4 * x**2 - a * x - 1) / (x * sp.sin(x / 2)), x, 0, dir="+")
    check_eq("jc935-exam-1-21 left", lim21_l, 6 * a)
    check_eq("jc935-exam-1-21 right", lim21_r, a**2 + 8)
    roots21 = sorted(sp.solve(lim21_l - lim21_r, a))
    assert roots21 == [2, 4], f"Unexpected roots: {roots21}"
    check_eq("jc935-exam-1-21 a=2", lim21_l.subs(a, 2), 12)
    check_eq("jc935-exam-1-21 a=4", lim21_l.subs(a, 4), 24)

    # Q22: x_{n+1} = sqrt(x_n (5 - x_n)), 0 < x_1 < 5 => limit = 5/2
    A = sp.symbols("A", positive=True)
    sol22 = sp.solve(A - sp.sqrt(A * (5 - A)), A)
    assert sol22 == [sp.Rational(5, 2)], f"Unexpected fixed point: {sol22}"
    xv = 0.7
    for _ in range(50):
        xv = math.sqrt(xv * (5.0 - xv))
    assert abs(xv - 2.5) < 1e-12

    # Q23: 2 x_n e^{2 x_{n+1}} = e^{2 x_n} - 1, x_1 > 0 => limit = 0
    h23 = 2 * t * sp.exp(2 * t) - sp.exp(2 * t) + 1
    check_eq("jc935-exam-1-23 h(0)", h23.subs(t, 0), 0)
    check_eq("jc935-exam-1-23 h'(t)", sp.diff(h23, t), 4 * t * sp.exp(2 * t))
    xv = 1.5
    for _ in range(80):
        xv = 0.5 * math.log((math.exp(2 * xv) - 1.0) / (2 * xv))
    assert abs(xv) < 1e-12

    print("All 23 exam-1 problems verified successfully!")


if __name__ == "__main__":
    main()
