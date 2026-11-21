import sympy as sp


def check_q1() -> None:
    x = sp.Symbol("x", positive=True)
    c = sp.Symbol("c", positive=True)
    f = sp.log(x) - x / sp.E**2 - 1 + c
    df = sp.diff(f, x)
    crit = sp.solve(sp.Eq(df, 0), x)
    assert crit == [sp.E**2], crit
    assert sp.simplify(f.subs(x, sp.E**2) - c) == 0
    assert sp.limit(f, x, 0, dir="+") == -sp.oo
    assert sp.limit(f, x, sp.oo) == -sp.oo
    assert sp.simplify(df.subs(x, 1)) > 0
    assert sp.simplify(df.subs(x, sp.E**3)) < 0


def check_q3() -> None:
    x = sp.Symbol("x", real=True)
    g = 2 - sp.Abs(x)
    assert sp.limit(g, x, 0, dir="-") == g.subs(x, 0)
    assert sp.limit(g, x, 0, dir="+") == g.subs(x, 0)
    secant = (g.subs(x, 2) - g.subs(x, -2)) / (2 - (-2))
    assert secant == 0
    xp = sp.Symbol("xp", positive=True)
    xn = sp.Symbol("xn", negative=True)
    assert sp.diff(2 - xp, xp) == -1
    assert sp.diff(2 + xn, xn) == 1


def check_q10() -> None:
    x = sp.Symbol("x", positive=True)
    # 10(1)
    lim1 = sp.limit((x**2 - x ** (2 * x)) / (1 - x + sp.log(x)), x, 1)
    assert lim1 == 4, lim1

    # 10(2)
    t = sp.Symbol("t", real=True)
    lim2 = sp.limit(1 / t - 2 / (sp.exp(2 * t) - 1), t, 0)
    assert lim2 == 1, lim2

    # 10(3)
    lim3 = sp.limit((2 / sp.pi * sp.atan(2 * x)) ** (3 * x), x, sp.oo)
    assert sp.simplify(lim3 - sp.exp(-3 / sp.pi)) == 0, lim3

    # 10(4)
    a, b, c = sp.symbols("a b c", positive=True)
    lim4 = sp.limit(((a ** (1 / x) + 2 * b ** (1 / x) + c ** (1 / x)) / 4) ** (4 * x), x, sp.oo)
    assert sp.simplify(lim4 - a * b**2 * c) == 0, lim4


def check_q11() -> None:
    x = sp.Symbol("x", real=True)
    xi = sp.Symbol("xi", positive=True)

    # 11(1): x^2 ln x at x0=1, n=3 with Lagrange remainder
    f1 = x**2 * sp.log(x)
    poly1 = sp.series(f1, x, 1, 4).removeO()
    expected_poly1 = (x - 1) + sp.Rational(3, 2) * (x - 1) ** 2 + sp.Rational(1, 3) * (x - 1) ** 3
    assert sp.simplify(poly1 - expected_poly1) == 0, poly1
    rem_coeff = sp.diff(f1, x, 4).subs(x, xi) / sp.factorial(4)
    assert sp.simplify(rem_coeff - (-1 / (12 * xi**2))) == 0, rem_coeff

    # 11(2): arcsin x at x0=0, n=3 Peano
    f2 = sp.asin(x)
    poly2 = sp.series(f2, x, 0, 4).removeO()
    assert sp.simplify(poly2 - (x + x**3 / 6)) == 0, poly2

    # 11(3): e^(tan x) at x0=0, n=3 Peano
    f3 = sp.exp(sp.tan(x))
    poly3 = sp.series(f3, x, 0, 4).removeO()
    assert sp.simplify(poly3 - (1 + x + x**2 / 2 + x**3 / 2)) == 0, poly3

    # 11(4): ln(cosh x) at x0=0, n=6 Peano
    f4 = sp.log(sp.cosh(x))
    poly4 = sp.series(f4, x, 0, 7).removeO()
    expected_poly4 = x**2 / 2 - x**4 / 12 + x**6 / 45
    assert sp.simplify(poly4 - expected_poly4) == 0, poly4


def check_q13() -> None:
    x = sp.Symbol("x", real=True)
    a = sp.Symbol("a", positive=True)
    f = a ** (2 * x) - a**4 * x
    df = sp.diff(f, x)
    # Solve a^(2x) * 2 ln a = a^4 -> x(a) = 2 - ln(2 ln a)/(2 ln a)
    xa = 2 - sp.log(2 * sp.log(a)) / (2 * sp.log(a))
    assert sp.simplify(df.subs(x, xa)) == 0
    dxa = sp.simplify(sp.diff(xa, a))
    crit_a = sp.solve(sp.Eq(dxa, 0), a)
    assert crit_a == [sp.exp(sp.E / 2)], crit_a
    min_val = sp.simplify(xa.subs(a, sp.exp(sp.E / 2)))
    assert sp.simplify(min_val - (2 - 1 / sp.E)) == 0, min_val
    assert sp.simplify(sp.diff(xa, a, 2).subs(a, sp.exp(sp.E / 2))) > 0


def check_q14() -> None:
    x, y = sp.symbols("x y", real=True)
    F = x**2 + 2 * x * y + 4 * y**2 - 12
    yprime = sp.simplify(-sp.diff(F, x) / sp.diff(F, y))
    assert sp.simplify(yprime - (-(x + y) / (x + 4 * y))) == 0
    sols = sp.solve([F, sp.Eq(x + y, 0)], (x, y), dict=True)
    pts = sorted((s[x], s[y]) for s in sols)
    assert pts == [(-2, 2), (2, -2)], pts


def check_q15() -> None:
    t = sp.Symbol("t", real=True)
    x = 6 * sp.cos(t)
    y = 4 * sp.sin(t)
    assert sp.simplify(x**2 / 36 + y**2 / 16 - 1) == 0
    S = sp.trigsimp(4 * x * y)
    assert sp.simplify(S - 48 * sp.sin(2 * t)) == 0
    dS = sp.diff(S, t)
    crit = [sol for sol in sp.solve(sp.Eq(dS, 0), t) if 0 < sol < sp.pi / 2]
    assert crit == [sp.pi / 4], crit
    assert sp.diff(S, t, 2).subs(t, sp.pi / 4) < 0
    assert S.subs(t, sp.pi / 4) == 48
    assert x.subs(t, sp.pi / 4) == 3 * sp.sqrt(2)
    assert y.subs(t, sp.pi / 4) == 2 * sp.sqrt(2)


def check_q16() -> None:
    x = sp.Symbol("x", positive=True)
    f = x**2 / 2**x
    df = sp.factor(sp.diff(f, x))
    crit = sp.solve(sp.Eq(df, 0), x)
    assert crit == [2 / sp.log(2)], crit
    assert 2 < float(crit[0]) < 3
    a2 = sp.Rational(2**2, 2**2)
    a3 = sp.Rational(3**2, 2**3)
    a4 = sp.Rational(4**2, 2**4)
    assert a3 == sp.Rational(9, 8)
    assert a3 > a2 and a3 > a4


def check_q17() -> None:
    x = sp.Symbol("x", positive=True)
    y = sp.log(x)
    yp = sp.diff(y, x)
    ypp = sp.diff(y, x, 2)
    K = sp.simplify(sp.Abs(ypp) / (1 + yp**2) ** sp.Rational(3, 2))
    assert sp.simplify(K - x / (x**2 + 1) ** sp.Rational(3, 2)) == 0
    dK = sp.simplify(sp.diff(K, x))
    crit = sp.solve(sp.Eq(dK, 0), x)
    assert crit == [sp.sqrt(2) / 2], crit
    K_max = sp.simplify(K.subs(x, sp.sqrt(2) / 2))
    rho_min = sp.simplify(1 / K_max)
    assert sp.simplify(rho_min - 3 * sp.sqrt(3) / 2) == 0, rho_min
    assert sp.simplify(y.subs(x, sp.sqrt(2) / 2) - (-sp.log(2) / 2)) == 0


def check_q18() -> None:
    x = sp.Symbol("x", real=True)
    f = x**3 - 3 * x - 4
    df = sp.diff(f, x)
    pos_crit = [r for r in sp.solve(sp.Eq(df, 0), x) if r > 0]
    assert pos_crit == [1], pos_crit
    assert f.subs(x, 0) == -4 < 0
    assert f.subs(x, 1) == -6 < 0
    assert f.subs(x, 2) == -2 < 0
    assert f.subs(x, 3) == 14 > 0
    root = sp.nsolve(f, x, 2.2)
    x0 = sp.Rational(22, 10)
    x1 = x0 - f.subs(x, x0) / df.subs(x, x0)
    assert abs(float(x1) - float(root)) < 1e-4
    assert abs(float(root) - 2.196) < 1e-3


def check_q21() -> None:
    x, a, b = sp.symbols("x a b", real=True)
    f = x - (a + b * sp.cos(x)) * sp.tan(x)
    ser = sp.series(f, x, 0, 6).removeO()
    poly = sp.Poly(ser, x)
    c1 = poly.coeff_monomial(x)
    c3 = poly.coeff_monomial(x**3)
    c5 = poly.coeff_monomial(x**5)
    sol = sp.solve([sp.Eq(c1, 0), sp.Eq(c3, 0)], (a, b))
    assert sol == {a: sp.Rational(1, 3), b: sp.Rational(2, 3)}, sol
    c5_val = sp.simplify(c5.subs(sol))
    assert c5_val == -sp.Rational(1, 20), c5_val


def check_manual_helpers() -> None:
    x = sp.Symbol("x", positive=True)
    # Q5 derivative
    p = x**3 - 12 * x
    assert sp.simplify(sp.diff(p, x) - 3 * (x - 2) * (x + 2)) == 0
    # Q12(1) derivative
    h1 = sp.sin(x) / x
    assert sp.simplify(sp.diff(h1, x) - (x * sp.cos(x) - sp.sin(x)) / x**2) == 0
    # Q12(2) derivative
    h2 = sp.log(1 + x) - 2 * x / (2 + x)
    assert sp.simplify(sp.diff(h2, x) - x**2 / ((1 + x) * (2 + x) ** 2)) == 0
    # Q12(3) auxiliary derivative
    phi = sp.log(x) ** 2 / x
    assert sp.simplify(sp.diff(phi, x) - sp.log(x) * (2 - sp.log(x)) / x**2) == 0


def main() -> None:
    check_q1()
    check_q3()
    check_q10()
    check_q11()
    check_q13()
    check_q14()
    check_q15()
    check_q16()
    check_q17()
    check_q18()
    check_q21()
    check_manual_helpers()
    print("All 17 symbolic checks + 4 manual helper checks for JC935 Section 3-review passed!")


if __name__ == "__main__":
    main()
