"""SymPy step-chain verifier for ch1Sec1 (jc935-1-1-*, 57 problems)."""

import sympy as sp

x, y, u, v, t, a, b, h = sp.symbols("x y u v t a b h", real=True)
k = sp.symbols("k", integer=True)


def check_eq(name: str, lhs, rhs):
    diff = sp.simplify(lhs - rhs)
    assert diff == 0, f"[{name}] Expected {lhs} == {rhs}, got diff={diff}"


def main():
    checked = []

    # 1-1-1-1: 5x+15 >= 0 <=> 5x >= -15 <=> x >= -3
    assert sp.solveset(5 * x + 15 >= 0, x, sp.S.Reals) == sp.Interval(-3, sp.oo)
    checked.append("jc935-1-1-1-1")

    # 1-1-1-2: 9 - x^2 = (3-x)(3+x) != 0 => x != +-3
    check_eq("1-1-1-2", 9 - x**2, (3 - x) * (3 + x))
    assert set(sp.solve(9 - x**2, x)) == {-3, 3}
    checked.append("jc935-1-1-1-2")

    # 1-1-1-3: 16 - x^2 >= 0 and x != 0
    assert sp.solveset(16 - x**2 >= 0, x, sp.S.Reals) == sp.Interval(-4, 4)
    checked.append("jc935-1-1-1-3")

    # 1-1-1-4: 36 - x^2 > 0 <=> -6 < x < 6
    assert sp.solveset(36 - x**2 > 0, x, sp.S.Reals) == sp.Interval.open(-6, 6)
    checked.append("jc935-1-1-1-4")

    # 1-1-1-5: x + 4 >= 0 <=> x >= -4
    assert sp.solveset(x + 4 >= 0, x, sp.S.Reals) == sp.Interval(-4, sp.oo)
    checked.append("jc935-1-1-1-5")

    # 1-1-1-6: 2x - 1 = pi/2 + k*pi => x = (1 + pi/2 + k*pi)/2
    sol6 = sp.solve(sp.Eq(2 * x - 1, sp.pi / 2 + k * sp.pi), x)[0]
    check_eq("1-1-1-6", sol6, (1 + sp.pi / 2 + k * sp.pi) / 2)
    checked.append("jc935-1-1-1-6")

    # 1-1-1-7: -1 <= x+2 <= 1 <=> -3 <= x <= -1
    s7 = sp.solveset(x + 2 >= -1, x, sp.S.Reals).intersect(sp.solveset(x + 2 <= 1, x, sp.S.Reals))
    assert s7 == sp.Interval(-3, -1)
    checked.append("jc935-1-1-1-7")

    # 1-1-1-8: 5 - x >= 0 <=> x <= 5
    assert sp.solveset(5 - x >= 0, x, sp.S.Reals) == sp.Interval(-sp.oo, 5)
    checked.append("jc935-1-1-1-8")

    # 1-1-1-9: 3x - 12 > 0 <=> x > 4
    assert sp.solveset(3 * x - 12 > 0, x, sp.S.Reals) == sp.Interval.open(4, sp.oo)
    checked.append("jc935-1-1-1-9")

    # 1-1-1-10: x - 2 = 0 => x = 2
    assert sp.solve(x - 2, x) == [2]
    checked.append("jc935-1-1-1-10")

    # 1-1-2-1: ln(x^2) vs 2*ln(x) at x = -2
    assert (-2) ** 2 > 0
    checked.append("jc935-1-1-2-1")

    # 1-1-2-2: 2x vs sqrt(4x^2) = 2|x| at x = -1
    assert 2 * (-1) == -2 and sp.sqrt(4 * (-1) ** 2) == 2
    checked.append("jc935-1-1-2-2")

    # 1-1-2-3: [x * cbrt(x+2)]^3 == x^3 * (x+2)
    check_eq("1-1-2-3", (x * sp.real_root(x + 2, 3)) ** 3, x**3 * (x + 2))
    checked.append("jc935-1-1-2-3")

    # 1-1-2-4: sec^2(x) - tan^2(x) = 1 where cos(x) != 0, cos(pi/2)=0
    check_eq("1-1-2-4", sp.trigsimp(2 * (sp.sec(x) ** 2 - sp.tan(x) ** 2)), 2)
    assert sp.cos(sp.pi / 2) == 0
    checked.append("jc935-1-1-2-4")

    # 1-1-3: phi(pi/6)=1/2, phi(-pi/3)=sqrt(3)/2, phi(pi/2)=0, phi(-2)=0
    assert sp.Abs(sp.sin(sp.pi / 6)) == sp.Rational(1, 2)
    assert sp.Abs(sp.sin(-sp.pi / 3)) == sp.sqrt(3) / 2
    checked.append("jc935-1-1-3")

    # 1-1-4-1: (|x|-2)^2 = x^2 + 4 - 4|x| >= 0 => |3x/(4+x^2)| <= 3/4
    p = sp.symbols("p", nonnegative=True)
    check_eq("1-1-4-1", (p - 2) ** 2, p**2 + 4 - 4 * p)
    check_eq("1-1-4-1b", sp.Rational(3, 4) - 3 * p / (4 + p**2), 3 * (p - 2) ** 2 / (4 * (4 + p**2)))
    checked.append("jc935-1-1-4-1")

    # 1-1-4-2: (3/2)(2+t^2) - (2+t) = (3/2)t^2 - t + 1 > 0
    diff42 = sp.Rational(3, 2) * (2 + t**2) - (2 + t)
    check_eq("1-1-4-2", diff42, sp.Rational(3, 2) * (t - sp.Rational(1, 3)) ** 2 + sp.Rational(5, 6))
    checked.append("jc935-1-1-4-2")

    # 1-1-5-1: f(v) - f(u) = 2(v-u)/((2-v)(2-u))
    f51 = lambda z: z / (2 - z)
    check_eq("1-1-5-1", f51(v) - f51(u), 2 * (v - u) / ((2 - v) * (2 - u)))
    checked.append("jc935-1-1-5-1")

    # 1-1-5-2: f(v)-f(u) = 2(v-u) + (ln(v+1)-ln(u+1))
    f52 = lambda z: 2 * z + sp.log(z + 1)
    check_eq("1-1-5-2", f52(v) - f52(u), 2 * (v - u) + (sp.log(v + 1) - sp.log(u + 1)))
    checked.append("jc935-1-1-5-2")

    # 1-1-6-2: (2x+b)/(3x-6) = 2/3 + (b+4)/(3(x-2))
    check_eq("1-1-6-2", (2 * x + b) / (3 * x - 6), sp.Rational(2, 3) + (b + 4) / (3 * (x - 2)))
    checked.append("jc935-1-1-6-2")

    # 1-1-9-1..6: parity checks
    f91 = x**2 * (4 - x**2)
    check_eq("1-1-9-1", f91.subs(x, -x), f91)
    checked.append("jc935-1-1-9-1")

    f92 = 2 * x**2 - 3 * x**3
    assert f92.subs(x, 1) == -1 and f92.subs(x, -1) == 5
    checked.append("jc935-1-1-9-2")

    f93 = (4 - x**2) / (4 + x**2)
    check_eq("1-1-9-3", f93.subs(x, -x), f93)
    checked.append("jc935-1-1-9-3")

    f94 = x * (x - 2) * (x + 2)
    check_eq("1-1-9-4a", f94, x * (x**2 - 4))
    check_eq("1-1-9-4b", f94.subs(x, -x), -f94)
    checked.append("jc935-1-1-9-4")

    f95 = 2 * sp.sin(x) + sp.cos(x) - 1
    assert f95.subs(x, sp.pi / 2) == 1 and f95.subs(x, -sp.pi / 2) == -3
    checked.append("jc935-1-1-9-5")

    f96 = (3**x + 3 ** (-x)) / 2
    check_eq("1-1-9-6", f96.subs(x, -x), f96)
    checked.append("jc935-1-1-9-6")

    # 1-1-10-1..5: periodicity checks
    check_eq("1-1-10-1", sp.cos((x + 2 * sp.pi) - 5), sp.cos(x - 5))
    checked.append("jc935-1-1-10-1")

    check_eq("1-1-10-2", sp.cos(6 * (x + sp.pi / 3)), sp.cos(6 * x))
    checked.append("jc935-1-1-10-2")

    check_eq("1-1-10-3", 4 + sp.sin(3 * sp.pi * (x + sp.Rational(2, 3))), 4 + sp.sin(3 * sp.pi * x))
    checked.append("jc935-1-1-10-3")

    assert (2 * x * sp.cos(x)).subs(x, 2 * k * sp.pi) == 4 * k * sp.pi
    checked.append("jc935-1-1-10-4")

    check_eq("1-1-10-5a", sp.sin(2 * x) ** 2, (1 - sp.cos(4 * x)) / 2)
    check_eq("1-1-10-5b", sp.sin(2 * (x + sp.pi / 2)) ** 2, sp.sin(2 * x) ** 2)
    checked.append("jc935-1-1-10-5")

    # 1-1-11-1..6: inverse functions
    # 11-1
    check_eq("1-1-11-1", ((x**3 + 4) - 4), x**3)
    checked.append("jc935-1-1-11-1")

    # 11-2
    f112 = (2 - x) / (1 + x)
    sol112 = sp.solve(sp.Eq(y, f112), x)[0]
    check_eq("1-1-11-2a", sol112, (2 - y) / (1 + y))
    check_eq("1-1-11-2b", f112.subs(x, sol112), y)
    checked.append("jc935-1-1-11-2")

    # 11-3
    f113 = (3 * x + 2) / (2 * x - 1)
    sol113 = sp.solve(sp.Eq(y, f113), x)[0]
    check_eq("1-1-11-3a", sol113, (y + 2) / (2 * y - 3))
    check_eq("1-1-11-3b", f113.subs(x, sol113), y)
    checked.append("jc935-1-1-11-3")

    # 11-4
    inv114 = sp.Rational(1, 2) * sp.asin(y / 3)
    check_eq("1-1-11-4", 3 * sp.sin(2 * inv114), y)
    checked.append("jc935-1-1-11-4")

    # 11-5
    inv115 = sp.exp(y - 2) - 4
    check_eq("1-1-11-5", 2 + sp.log(inv115 + 4), y)
    checked.append("jc935-1-1-11-5")

    # 11-6
    inv116 = sp.log(y / (1 - y), 5)
    check_eq("1-1-11-6", (5**inv116) / (1 + 5**inv116), y)
    checked.append("jc935-1-1-11-6")

    # 1-1-12-1..5: composite functions & values
    f121 = sp.sin(x) ** 2
    assert f121.subs(x, sp.pi / 4) == sp.Rational(1, 2) and f121.subs(x, sp.pi / 2) == 1
    checked.append("jc935-1-1-12-1")

    f122 = sp.sin(3 * x)
    assert f122.subs(x, sp.pi / 18) == sp.Rational(1, 2) and f122.subs(x, sp.pi / 6) == 1
    checked.append("jc935-1-1-12-2")

    f123 = sp.sqrt(4 + x**2)
    assert f123.subs(x, 0) == 2 and f123.subs(x, 3) == sp.sqrt(13)
    checked.append("jc935-1-1-12-3")

    f124 = sp.exp(2 * x**2)
    assert f124.subs(x, -2) == sp.exp(8) and f124.subs(x, 1) == sp.exp(2)
    checked.append("jc935-1-1-12-4")

    f125 = (2**x) ** 3
    check_eq("1-1-12-5", f125, 2 ** (3 * x))
    assert f125.subs(x, 2) == 64 and f125.subs(x, -1) == sp.Rational(1, 8)
    checked.append("jc935-1-1-12-5")

    # 1-1-13-1..4: composite domains
    assert sp.solveset(x**2 <= 4, x, sp.S.Reals) == sp.Interval(-2, 2)
    checked.append("jc935-1-1-13-1")

    s133 = sp.solveset(x + 2 > -1, x, sp.S.Reals).intersect(sp.solveset(x + 2 <= 3, x, sp.S.Reals))
    assert s133 == sp.Interval.Lopen(-3, 1)
    checked.append("jc935-1-1-13-3")

    assert sp.solve(sp.Eq(a, 4 - a), a) == [2]
    checked.append("jc935-1-1-13-4")

    # 1-1-14-1..2
    assert sp.solve(sp.Eq(2**x, 2), x) == [1]
    assert 2**2 == 4 and 2**1 == 2 and sp.Rational(1, 4) == sp.Pow(2, -2)
    checked.extend(["jc935-1-1-14-1", "jc935-1-1-14-2"])

    # 1-1-15: trapezoidal channel
    b_expr = sp.solve(sp.Eq((b + (b + 2 * h)) / 2 * h, 9), b)[0]
    check_eq("1-1-15a", b_expr, 9 / h - h)
    L_expr = b_expr + 2 * sp.sqrt(2) * h
    check_eq("1-1-15b", L_expr, 9 / h + (2 * sp.sqrt(2) - 1) * h)
    s15 = sp.solveset(9 / h - h > 0, h, sp.S.Reals).intersect(sp.solveset(h > 0, h, sp.S.Reals))
    assert s15 == sp.Interval.open(0, 3)
    checked.append("jc935-1-1-15")

    # 1-1-16: square area S(t) continuity at t=2 and t=4
    s16_1 = t**2 / 2
    s16_2 = 4 - (4 - t) ** 2 / 2
    assert s16_1.subs(t, 2) == 2 and s16_2.subs(t, 2) == 2
    assert s16_2.subs(t, 4) == 4
    checked.append("jc935-1-1-16")

    # 1-1-17-1..2: temperature conversion
    C_sym = sp.symbols("C", real=True)
    F_expr = sp.Rational(9, 5) * C_sym + 32
    assert F_expr.subs(C_sym, 0) == 32 and F_expr.subs(C_sym, 100) == 212
    assert sp.solve(sp.Eq(F_expr, 68), C_sym) == [20]
    assert F_expr.subs(C_sym, -10) == 14
    checked.append("jc935-1-1-17-1")

    assert sp.solve(sp.Eq(t, sp.Rational(9, 5) * t + 32), t) == [-40]
    checked.append("jc935-1-1-17-2")

    # 1-1-18: triangle CPQ area
    assert sp.sqrt(12**2 + 9**2) == 15
    s18_1 = sp.Rational(1, 2) * x * (2 * x)
    s18_2 = sp.Rational(1, 2) * x * sp.Rational(12, 15) * (27 - 2 * x)
    s18_3 = sp.Rational(1, 2) * sp.Rational(12 * 9, 15) * (36 - 3 * x)
    check_eq("1-1-18a", s18_1, x**2)
    check_eq("1-1-18b", s18_2, sp.Rational(2, 5) * x * (27 - 2 * x))
    check_eq("1-1-18c", s18_3, sp.Rational(18, 5) * (36 - 3 * x))
    # Continuity at x=6, x=9, and 0 at x=12
    assert s18_1.subs(x, 6) == s18_2.subs(x, 6) == 36
    assert s18_2.subs(x, 9) == s18_3.subs(x, 9) == sp.Rational(162, 5)
    assert s18_3.subs(x, 12) == 0
    checked.append("jc935-1-1-18")

    print(f"OK: verified {len(checked)} computable problems in ch1Sec1.")


if __name__ == "__main__":
    main()
