"""SymPy step-chain verifier for ch1Exam guidedHints (jc935-exam-1-1 .. jc935-exam-1-23)."""

import sympy as sp

x, t, u = sp.symbols("x t u", real=True)
x_pos = sp.symbols("x_pos", real=True, positive=True)
t_pos = sp.symbols("t_pos", real=True, positive=True)
a, b, k = sp.symbols("a b k", real=True)
n = sp.symbols("n", integer=True, positive=True)


def check_step_chain(
    pid: str,
    exprs: list[sp.Expr],
    var: sp.Symbol,
    point,
    expected_limit,
    dir_str: str = "+-",
    check_final_denom: bool = True,
):
    for i in range(1, len(exprs)):
        diff = sp.simplify(exprs[i] - exprs[i - 1])
        assert diff == 0, f"[{pid}] Step {i-1}->{i} not equivalent: diff={diff}"
    for idx, e in enumerate(exprs):
        if dir_str == "+-":
            lp = sp.limit(e, var, point, dir="+")
            lm = sp.limit(e, var, point, dir="-")
            assert sp.simplify(lp - expected_limit) == 0, f"[{pid}] Step {idx} right limit {lp} != {expected_limit}"
            assert sp.simplify(lm - expected_limit) == 0, f"[{pid}] Step {idx} left limit {lm} != {expected_limit}"
        else:
            lv = sp.limit(e, var, point, dir=dir_str)
            assert sp.simplify(lv - expected_limit) == 0, f"[{pid}] Step {idx} limit {lv} != {expected_limit}"
    if check_final_denom and point not in (sp.oo, -sp.oo):
        _, denom = sp.fraction(sp.together(exprs[-1]))
        assert denom.subs(var, point) != 0, f"[{pid}] Final step denominator vanishes at {point}"


def verify_all():
    # 1. jc935-exam-1-1: counterexamples & f(a) = 2a + arctan(a)
    assert sp.solve(2 * a - a**2, a) == [0, 2]
    assert sp.simplify(1 - sp.sqrt(sp.Abs(1))) == 0
    f1 = 2 * a + sp.atan(a)
    df1 = sp.diff(f1, a)
    assert sp.simplify(df1 - (2 + 1 / (1 + a**2))) == 0
    assert f1.subs(a, 0) == 0
    assert sp.ask(sp.Q.positive(df1)) is True

    # 2. jc935-exam-1-2: lim_{x->+oo} [(ax+b)e^{2/x} - 3x] = 5 => a=3, b=-1
    e2_t = (a / t_pos + b) * sp.exp(2 * t_pos) - 3 / t_pos
    s2 = sp.series(e2_t, t_pos, 0, 1).removeO()
    assert sp.simplify(s2 - ((a - 3) / t_pos + (2 * a + b))) == 0
    sol2 = sp.solve([a - 3, 2 * a + b - 5], [a, b])
    assert sol2 == {a: 3, b: -1}
    e2_orig = (3 * x - 1) * sp.exp(2 / x) - 3 * x
    assert sp.limit(e2_orig, x, sp.oo) == 5

    # 3. jc935-exam-1-3: f(x) = (1 - cos(sqrt(3x)))/(ax) for x>0, b for x<=0 => ab = 3/2
    a_nz = sp.symbols("a_nz", real=True, nonzero=True)
    e3 = (1 - sp.cos(sp.sqrt(3 * x_pos))) / (a_nz * x_pos)
    lim3 = sp.limit(e3, x_pos, 0, dir="+")
    assert sp.simplify(lim3 - sp.Rational(3, 2) / a_nz) == 0
    assert sp.simplify(sp.limit((1 - sp.cos(sp.sqrt(3 * x_pos))) / (sp.Rational(3, 2) * x_pos), x_pos, 0, dir="+") - 1) == 0
    assert sp.simplify(a_nz * lim3 - sp.Rational(3, 2)) == 0

    # 4. jc935-exam-1-4: lim_{x->0} (2x - arcsin(2x))/x^k => k=3, limit=-4/3
    s4 = sp.series(sp.asin(2 * x), x, 0, 4).removeO()
    assert sp.simplify(s4 - (2 * x + sp.Rational(4, 3) * x**3)) == 0
    assert sp.simplify((2 * x - s4) - (-sp.Rational(4, 3) * x**3)) == 0
    assert sp.limit((2 * x - sp.asin(2 * x)) / x**3, x, 0) == sp.Rational(-4, 3)

    # 5. jc935-exam-1-5: I(x) = int_0^{x^3} ln(1+t^2) dt => ~ (1/3)x^9, higher order than x^8
    I5_prime = sp.log(1 + (x**3)**2) * sp.diff(x**3, x)
    assert sp.simplify(I5_prime - 3 * x**2 * sp.log(1 + x**6)) == 0
    assert sp.limit(I5_prime / (3 * x**8), x, 0) == 1
    assert sp.limit(I5_prime / (9 * x**8), x, 0) == sp.Rational(1, 3)
    assert sp.limit(I5_prime / (8 * x**7), x, 0) == 0

    # 6. jc935-exam-1-6: lim_{x->0} (e^{2x} + a x^2 + b x)^{1/x^2} = e^3 => a=1, b=-2
    s6 = sp.series(sp.exp(2 * x) + a * x**2 + b * x, x, 0, 3).removeO()
    assert sp.simplify(s6 - (1 + (b + 2) * x + (a + 2) * x**2)) == 0
    sol6 = sp.solve([b + 2, a + 2 - 3], [a, b])
    assert sol6 == {a: 1, b: -2}
    assert sp.limit((sp.exp(2 * x) + x**2 - 2 * x) ** (1 / x**2), x, 0) == sp.exp(3)

    # 7. jc935-exam-1-7: I1 ~ x^4/4, I2 ~ x^3/3, I3 ~ 8x^6/3
    I7_1p = sp.exp(x**3) - 1
    I7_2p = sp.sin(sp.tan(x) ** 2) * (1 / sp.cos(x) ** 2)
    I7_3p = sp.sin(1 - sp.cos(2 * x)) ** 2 * (2 * sp.sin(2 * x))
    assert sp.limit(I7_1p / (4 * x**3), x, 0, dir="+") == sp.Rational(1, 4)
    assert sp.limit(I7_2p / (3 * x**2), x, 0, dir="+") == sp.Rational(1, 3)
    assert sp.limit(I7_3p / (6 * x**5), x, 0, dir="+") == sp.Rational(8, 3)

    # 8. jc935-exam-1-8: piecewise sum continuous on R => a=3, b=-5
    h_left = (-2) + (a * x + 1)
    h_mid = (-2) + (2 * x)
    h_right = 3 + (2 * x + b)
    assert sp.simplify(h_left - (a * x - 1)) == 0
    assert sp.simplify(h_mid - (2 * x - 2)) == 0
    assert sp.simplify(h_right - (2 * x + b + 3)) == 0
    sol8 = sp.solve([h_left.subs(x, -1) - h_mid.subs(x, -1), h_mid.subs(x, 1) - h_right.subs(x, 1)], [a, b])
    assert sol8 == {a: 3, b: -5}

    # 9. jc935-exam-1-9: discontinuities of e^{1/(x-2)} ln|1+2x| / ((e^{3x}-1)(x-1))
    f9 = sp.exp(1 / (x - 2)) * sp.log(sp.Abs(1 + 2 * x)) / ((sp.exp(3 * x) - 1) * (x - 1))
    lim9_0 = sp.limit(f9, x, 0)
    assert sp.simplify(lim9_0 - (-2 / (3 * sp.sqrt(sp.E)))) == 0
    assert sp.limit(sp.Abs(f9), x, -sp.Rational(1, 2), dir="+") == sp.oo
    assert sp.limit(sp.Abs(f9), x, 1, dir="+") == sp.oo
    assert sp.limit(f9, x, 2, dir="+") == sp.oo

    # 10. jc935-exam-1-10: lim_{x->0} ((1+sin 2x)/(1-sin 2x))^{1/tan(kx)} = e^2 => k=2
    k_nz = sp.symbols("k_nz", real=True, nonzero=True)
    base10 = (1 + sp.sin(2 * x)) / (1 - sp.sin(2 * x))
    assert sp.simplify(base10 - (1 + 2 * sp.sin(2 * x) / (1 - sp.sin(2 * x)))) == 0
    exp10 = 2 * sp.sin(2 * x) / ((1 - sp.sin(2 * x)) * sp.tan(k_nz * x))
    lim10 = sp.limit(exp10, x, 0)
    assert sp.simplify(lim10 - 4 / k_nz) == 0
    assert sp.solve(lim10 - 2, k_nz) == [2]
    assert sp.limit(base10 ** (1 / sp.tan(2 * x)), x, 0) == sp.exp(2)

    # 11. jc935-exam-1-11: lim_{x->0} (1/sin x - 1/ln(1+x)) = -1/2
    check_step_chain(
        "jc935-exam-1-11",
        [
            1 / sp.sin(x) - 1 / sp.log(1 + x),
            (sp.log(1 + x) - sp.sin(x)) / (sp.sin(x) * sp.log(1 + x)),
        ],
        var=x,
        point=0,
        expected_limit=sp.Rational(-1, 2),
        check_final_denom=False,
    )
    assert sp.limit((sp.log(1 + x) - sp.sin(x)) / x**2, x, 0) == sp.Rational(-1, 2)

    # 12. jc935-exam-1-12: lim_{x->+oo} x^2 [arctan(x+3) - arctan x] = 3
    e12 = x**2 * (sp.atan(x + 3) - sp.atan(x))
    assert sp.limit(e12, x, sp.oo) == 3
    low12 = 3 * x**2 / (1 + (x + 3) ** 2)
    high12 = 3 * x**2 / (1 + x**2)
    assert sp.limit(low12, x, sp.oo) == 3
    assert sp.limit(high12, x, sp.oo) == 3
    assert sp.diff(sp.atan(t), t) == 1 / (1 + t**2)

    # 13. jc935-exam-1-13: f(x) = lim_{n->oo} (2n+1)(x-1)/(n(x-1)^2+3)
    f13_n = (2 * n + 1) * (x - 1) / (n * (x - 1) ** 2 + 3)
    assert f13_n.subs(x, 1) == 0
    x_ne1 = sp.symbols("x_ne1", real=True)
    # Using positive symbol d = x - 1 != 0 via nonzero symbol
    d_nz = sp.symbols("d_nz", real=True, nonzero=True)
    e13_0 = (2 * n + 1) * d_nz / (n * d_nz**2 + 3)
    e13_1 = (2 + 1 / n) * d_nz / (d_nz**2 + 3 / n)
    assert sp.simplify(e13_0 - e13_1) == 0
    assert sp.simplify(sp.limit(e13_1, n, sp.oo) - 2 / d_nz) == 0
    assert sp.limit(2 / (x - 1), x, 1, dir="+") == sp.oo

    # 14. jc935-exam-1-14: f(x) = (e^{sin 2x}-1)/arctan(x/3) for x>0, a cos x for x<=0 => a=6
    e14 = (sp.exp(sp.sin(2 * x)) - 1) / sp.atan(x / 3)
    assert sp.limit(e14, x, 0, dir="+") == 6
    assert (a * sp.cos(x)).subs(x, 0) == a

    # 15. jc935-exam-1-15: y = x(2 + arctan(3/x)) => y = 2x + 3
    y15 = x * (2 + sp.atan(3 / x))
    k15 = sp.limit(y15 / x, x, sp.oo)
    b15 = sp.limit(y15 - k15 * x, x, sp.oo)
    assert k15 == 2 and b15 == 3
    assert sp.limit(3 * sp.atan(t) / t, t, 0) == 3

    # 16. jc935-exam-1-16: lim_{x->0} (2x + 3^x)^{3/x} = 27 e^6
    e16 = (2 * x + 3**x) ** (3 / x)
    L16_0 = 3 * (2 * x + 3**x - 1) / x
    L16_1 = 3 * (2 + (3**x - 1) / x)
    assert sp.simplify(L16_0 - L16_1) == 0
    L16_val = sp.limit(L16_1, x, 0)
    assert sp.simplify(L16_val - (6 + 3 * sp.log(3))) == 0
    assert sp.simplify(sp.exp(L16_val) - 27 * sp.exp(6)) == 0
    assert sp.simplify(sp.limit(e16, x, 0) - 27 * sp.exp(6)) == 0

    # 17. jc935-exam-1-17: lim_{x->0} ((1 + int_0^x cos(t^2)dt)/ln(1+x) - 1/tan x) = 3/2
    L17_1 = sp.limit(1 / sp.log(1 + x) - 1 / sp.tan(x), x, 0)
    assert L17_1 == sp.Rational(1, 2)
    L17_2 = sp.limit(sp.cos(x**2), x, 0)
    assert L17_2 == 1
    assert L17_1 + L17_2 == sp.Rational(3, 2)

    # 18. jc935-exam-1-18: y = x^{1+x}/(2+x)^x (x>0) => y = x/e^2 + 2/e^2
    y18 = x_pos ** (1 + x_pos) / (2 + x_pos) ** x_pos
    k18 = sp.limit(y18 / x_pos, x_pos, sp.oo)
    assert sp.simplify(k18 - sp.exp(-2)) == 0
    b18_t = ((1 + 2 * t_pos) ** (-1 / t_pos) - sp.exp(-2)) / t_pos
    assert sp.simplify(sp.limit(b18_t, t_pos, 0, dir="+") - 2 * sp.exp(-2)) == 0
    s18 = sp.series(-sp.log(1 + 2 * t_pos) / t_pos, t_pos, 0, 2).removeO()
    assert sp.simplify(s18 - (-2 + 2 * t_pos)) == 0

    # 19. jc935-exam-1-19: (1 + 2/n)^n - e^2 ~ -2e^2 / n => a=1, b=-2e^2
    e19 = (1 + 2 / n) ** n - sp.exp(2)
    assert sp.simplify(sp.limit(e19 / (-2 * sp.exp(2) / n), n, sp.oo) - 1) == 0

    # 20. jc935-exam-1-20: lim_{x->0} [a arctan(1/x) + (1+2|x|)^{1/x}] exists => a=(e^-2 - e^2)/pi
    f20 = a * sp.atan(1 / x) + (1 + 2 * sp.Abs(x)) ** (1 / x)
    Lp20 = sp.limit(f20, x, 0, dir="+")
    Lm20 = sp.limit(f20, x, 0, dir="-")
    assert sp.simplify(Lp20 - (sp.pi * a / 2 + sp.exp(2))) == 0
    assert sp.simplify(Lm20 - (-sp.pi * a / 2 + sp.exp(-2))) == 0
    sol20 = sp.solve(Lp20 - Lm20, a)
    assert len(sol20) == 1 and sp.simplify(sol20[0].rewrite(sp.exp) - (sp.exp(-2) - sp.exp(2)) / sp.pi) == 0

    # 21. jc935-exam-1-21: piecewise continuous at a=2, removable at a=4
    L21_left = sp.limit(sp.log(1 + a * x**3) / (x - sp.sin(x)), x, 0, dir="-")
    L21_right = sp.limit((sp.exp(a * x) + 4 * x**2 - a * x - 1) / (x * sp.sin(x / 2)), x, 0, dir="+")
    assert sp.simplify(L21_left - 6 * a) == 0
    assert sp.simplify(L21_right - (a**2 + 8)) == 0
    roots21 = sorted(sp.solve(L21_right - L21_left, a))
    assert roots21 == [2, 4]
    assert L21_left.subs(a, 2) == 12
    assert L21_left.subs(a, 4) == 24 and L21_left.subs(a, 4) != 12

    # 22. jc935-exam-1-22: x_{n+1} = sqrt(x_n(5-x_n)), 0 < x_1 < 5 => lim = 5/2
    xn = sp.symbols("xn", real=True, positive=True)
    diff22_a = sp.sqrt(xn * (5 - xn)) - xn
    diff22_b = sp.sqrt(xn) * (5 - 2 * xn) / (sp.sqrt(5 - xn) + sp.sqrt(xn))
    # Verify identity on (0, 5)
    for val in [sp.Rational(1, 2), sp.Rational(3, 2), sp.Rational(5, 2)]:
        assert sp.simplify(diff22_a.subs(xn, val) - diff22_b.subs(xn, val)) == 0
    A = sp.symbols("A", real=True, positive=True)
    assert sp.solve(2 * A**2 - 5 * A, A) == [sp.Rational(5, 2)]

    # 23. jc935-exam-1-23: 2 x_n e^{2 x_{n+1}} = e^{2 x_n} - 1, x_1 > 0 => lim = 0
    h23 = 2 * t * sp.exp(2 * t) - sp.exp(2 * t) + 1
    dh23 = sp.diff(h23, t)
    assert sp.simplify(dh23 - 4 * t * sp.exp(2 * t)) == 0
    assert h23.subs(t, 0) == 0
    assert sp.ask(sp.Q.positive(dh23.subs(t, t_pos))) is True

    print("ALL 23 ch1Exam guidedHints SymPy checks PASSED.")


if __name__ == "__main__":
    verify_all()
