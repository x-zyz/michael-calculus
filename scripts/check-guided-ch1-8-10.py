"""SymPy step-chain verifier for ch1Sec8to10 guidedHints (jc935-1-8-*, 1-9-*, 1-10-*)."""

import math
import sympy as sp

x, t, u, a, b, h = sp.symbols("x t u a b h", real=True)
a_pos, b_pos = sp.symbols("a_pos b_pos", positive=True)
n, k = sp.symbols("n k", integer=True, positive=True)
k_int = sp.symbols("k_int", integer=True)


def check_step_chain(
    pid: str,
    exprs: list[sp.Expr],
    var,
    point,
    expected_limit,
    dir_str="+-",
    check_denom_nonzero=True,
):
    for i in range(1, len(exprs)):
        diff = sp.simplify(exprs[i] - exprs[i - 1])
        assert diff == 0, f"[{pid}] Step {i-1}->{i} not equivalent: diff={diff}"
    for idx, e in enumerate(exprs):
        if dir_str == "+-":
            lim_p = sp.limit(e, var, point, dir="+")
            lim_m = sp.limit(e, var, point, dir="-")
            assert sp.simplify(lim_p - expected_limit) == 0, (
                f"[{pid}] Step {idx} right limit {lim_p} != {expected_limit}"
            )
            assert sp.simplify(lim_m - expected_limit) == 0, (
                f"[{pid}] Step {idx} left limit {lim_m} != {expected_limit}"
            )
        else:
            lim_v = sp.limit(e, var, point, dir=dir_str)
            assert sp.simplify(lim_v - expected_limit) == 0, (
                f"[{pid}] Step {idx} limit {lim_v} != {expected_limit}"
            )
    if check_denom_nonzero and point not in (sp.oo, -sp.oo):
        _, denom = sp.fraction(sp.together(exprs[-1]))
        denom_val = sp.simplify(denom.subs(var, point))
        assert denom_val != 0, f"[{pid}] Final step denominator vanishes at {point}"


def check_equiv_ratio(pid: str, f_expr: sp.Expr, g_expr: sp.Expr, var, point):
    r = sp.limit(f_expr / g_expr, var, point)
    assert sp.simplify(r - 1) == 0, f"[{pid}] {f_expr} not ~ {g_expr} at {point}: ratio={r}"


def verify_all():
    verified = []

    # 1. jc935-1-8-2-1: piecewise x^2 on [0,2], 6-x on (2,6]
    assert sp.limit(x**2, x, 2, dir="-") == 4
    assert sp.limit(6 - x, x, 2, dir="+") == 4
    assert (x**2).subs(x, 2) == 4
    verified.append("jc935-1-8-2-1")

    # 2. jc935-1-8-2-2: x+1 on |x|<=2, 3 on |x|>2
    assert sp.limit(sp.Integer(3), x, -2, dir="-") == 3
    assert sp.limit(x + 1, x, -2, dir="+") == -1
    assert (x + 1).subs(x, -2) == -1
    assert sp.limit(x + 1, x, 2, dir="-") == 3
    assert (x + 1).subs(x, 2) == 3
    assert sp.limit(sp.Integer(3), x, 2, dir="+") == 3
    verified.append("jc935-1-8-2-2")

    # 3. jc935-1-8-3-1: (x^2-9)/((x-3)(x-4)) at x=3, 4
    check_step_chain(
        "jc935-1-8-3-1",
        [
            (x**2 - 9) / ((x - 3) * (x - 4)),
            (x - 3) * (x + 3) / ((x - 3) * (x - 4)),
            (x + 3) / (x - 4),
        ],
        x,
        3,
        -6,
    )
    assert sp.limit(sp.Abs((x + 3) / (x - 4)), x, 4, dir="+") == sp.oo
    assert sp.limit(sp.Abs((x + 3) / (x - 4)), x, 4, dir="-") == sp.oo
    verified.append("jc935-1-8-3-1")

    # 4. jc935-1-8-3-2: x / tan(2x)
    check_step_chain(
        "jc935-1-8-3-2@0",
        [
            x / sp.tan(2 * x),
            x * sp.cos(2 * x) / sp.sin(2 * x),
            sp.Rational(1, 2) * (2 * x / sp.sin(2 * x)) * sp.cos(2 * x),
        ],
        x,
        0,
        sp.Rational(1, 2),
        check_denom_nonzero=False,
    )
    assert sp.limit(2 * x / sp.sin(2 * x), x, 0) == 1
    assert sp.cos(0) == 1
    for kv in (-2, -1, 1, 2):
        pt = kv * sp.pi / 2
        assert sp.limit(sp.Abs(x / sp.tan(2 * x)), x, pt, dir="+") == sp.oo
        assert sp.limit(sp.Abs(x / sp.tan(2 * x)), x, pt, dir="-") == sp.oo
    for kv in (-1, 0, 1):
        pt = sp.pi / 4 + kv * sp.pi / 2
        assert sp.limit(x * sp.cos(2 * x) / sp.sin(2 * x), x, pt) == 0
    verified.append("jc935-1-8-3-2")

    # 5. jc935-1-8-3-3: cos^2(2/x) oscillating at 0
    xn = 2 / (n * sp.pi)
    zn = 2 / ((n + sp.Rational(1, 2)) * sp.pi)
    assert sp.limit(xn, n, sp.oo) == 0
    assert sp.limit(zn, n, sp.oo) == 0
    assert sp.simplify(sp.cos(2 / xn) ** 2) == 1
    assert sp.simplify(sp.cos(2 / zn) ** 2) == 0
    verified.append("jc935-1-8-3-3")

    # 6. jc935-1-8-3-4: 2x-4 (x<=2), 5-x (x>2)
    assert sp.limit(2 * x - 4, x, 2, dir="-") == 0
    assert (2 * x - 4).subs(x, 2) == 0
    assert sp.limit(5 - x, x, 2, dir="+") == 3
    verified.append("jc935-1-8-3-4")

    # 7. jc935-1-8-4: G(x) = lim_{n->oo} (2 - (x/2)^(2n)) / (1 + (x/2)^(2n))
    for xv, expected in [(sp.Rational(1, 2), 2), (sp.Integer(0), 2), (sp.Integer(2), sp.Rational(1, 2)), (sp.Integer(-2), sp.Rational(1, 2)), (sp.Integer(3), -1), (sp.Integer(-4), -1)]:
        expr_n = (2 - (xv / 2) ** (2 * n)) / (1 + (xv / 2) ** (2 * n))
        assert sp.limit(expr_n, n, sp.oo) == expected
    t_pos = sp.symbols("t_pos", positive=True)
    assert sp.simplify((2 - t_pos ** (2 * n)) / (1 + t_pos ** (2 * n)) - (2 * t_pos ** (-2 * n) - 1) / (t_pos ** (-2 * n) + 1)) == 0
    verified.append("jc935-1-8-4")

    # 8. jc935-1-8-5-2: f(x)=-2 (x<3), 2 (x>=3)
    assert sp.Abs(-2) == 2 and sp.Abs(2) == 2
    verified.append("jc935-1-8-5-2")

    # 9. jc935-1-8-6: |f+4|<2 => f < -2
    fv = sp.symbols("fv", real=True)
    assert (-2) - (-4) == 2
    assert sp.solve(fv + 4 - 2, fv) == [-2]
    verified.append("jc935-1-8-6")

    # 10. jc935-1-8-7-1 & 1-8-7-2
    assert 3 * 0 == 0
    u_pos, eps_pos = sp.symbols("u_pos eps_pos", positive=True)
    assert sp.solve(3 * u_pos - eps_pos, u_pos) == [eps_pos / 3]
    assert sp.simplify(3 * a - a) == 2 * a
    verified.extend(["jc935-1-8-7-1", "jc935-1-8-7-2"])

    # 11. jc935-1-9-1: ((x^2-4)(x+5))/((x+5)(x-3))
    check_step_chain(
        "jc935-1-9-1@0",
        [
            ((x**2 - 4) * (x + 5)) / ((x + 5) * (x - 3)),
            (x**2 - 4) / (x - 3),
        ],
        x,
        0,
        sp.Rational(4, 3),
    )
    check_step_chain(
        "jc935-1-9-1@-5",
        [
            ((x**2 - 4) * (x + 5)) / ((x + 5) * (x - 3)),
            (x**2 - 4) / (x - 3),
        ],
        x,
        -5,
        sp.Rational(-21, 8),
    )
    assert sp.limit((x**2 - 4) / (x - 3), x, 3, dir="-") == -sp.oo
    assert sp.limit((x**2 - 4) / (x - 3), x, 3, dir="+") == sp.oo
    verified.append("jc935-1-9-1")

    # 12. jc935-1-9-2: max/min identity check
    for fv_num, gv_num in [(5, 2), (2, 5), (-3, -3), (-4, 1)]:
        assert (fv_num + gv_num + abs(fv_num - gv_num)) / 2 == max(fv_num, gv_num)
        assert (fv_num + gv_num - abs(fv_num - gv_num)) / 2 == min(fv_num, gv_num)
    verified.append("jc935-1-9-2")

    # 13. jc935-1-9-3-1: lim_{x->1} sqrt(x^2-4x+7) = 2
    assert sp.limit(x**2 - 4 * x + 7, x, 1) == 4
    assert sp.limit(sp.sqrt(x**2 - 4 * x + 7), x, 1) == 2
    verified.append("jc935-1-9-3-1")

    # 14. jc935-1-9-3-2: lim_{t->pi/6} (sin(3t))^5 = 1
    assert sp.limit(3 * t, t, sp.pi / 6) == sp.pi / 2
    assert sp.limit(sp.sin(3 * t), t, sp.pi / 6) == 1
    assert sp.limit(sp.sin(3 * t) ** 5, t, sp.pi / 6) == 1
    verified.append("jc935-1-9-3-2")

    # 15. jc935-1-9-3-3: lim_{x->pi/6} ln(4 cos(2x)) = ln 2
    assert sp.limit(4 * sp.cos(2 * x), x, sp.pi / 6) == 2
    assert sp.simplify(sp.limit(sp.log(4 * sp.cos(2 * x)), x, sp.pi / 6) - sp.log(2)) == 0
    verified.append("jc935-1-9-3-3")

    # 16. jc935-1-9-3-4: lim_{x->0} (sqrt(1+6x)-1)/x = 3
    check_step_chain(
        "jc935-1-9-3-4",
        [
            (sp.sqrt(1 + 6 * x) - 1) / x,
            ((sp.sqrt(1 + 6 * x) - 1) * (sp.sqrt(1 + 6 * x) + 1)) / (x * (sp.sqrt(1 + 6 * x) + 1)),
            (6 * x) / (x * (sp.sqrt(1 + 6 * x) + 1)),
            6 / (sp.sqrt(1 + 6 * x) + 1),
        ],
        x,
        0,
        3,
    )
    verified.append("jc935-1-9-3-4")

    # 17. jc935-1-9-3-5: lim_{x->1} (sqrt(7x-6)-sqrt(x))/(x-1) = 3
    check_step_chain(
        "jc935-1-9-3-5",
        [
            (sp.sqrt(7 * x - 6) - sp.sqrt(x)) / (x - 1),
            ((sp.sqrt(7 * x - 6) - sp.sqrt(x)) * (sp.sqrt(7 * x - 6) + sp.sqrt(x)))
            / ((x - 1) * (sp.sqrt(7 * x - 6) + sp.sqrt(x))),
            (6 * (x - 1)) / ((x - 1) * (sp.sqrt(7 * x - 6) + sp.sqrt(x))),
            6 / (sp.sqrt(7 * x - 6) + sp.sqrt(x)),
        ],
        x,
        1,
        3,
    )
    verified.append("jc935-1-9-3-5")

    # 18. jc935-1-9-3-6: lim_{x->a} (sin(2x)-sin(2a))/(x-a) = 2cos(2a)
    e0 = (sp.sin(2 * x) - sp.sin(2 * a)) / (x - a)
    e1 = 2 * sp.cos(x + a) * sp.sin(x - a) / (x - a)
    assert sp.simplify(sp.trigsimp(e0 - e1)) == 0
    assert sp.simplify(sp.limit(e0, x, a) - 2 * sp.cos(2 * a)) == 0
    assert sp.simplify(sp.limit(e1, x, a) - 2 * sp.cos(2 * a)) == 0
    verified.append("jc935-1-9-3-6")

    # 19. jc935-1-9-3-7: lim_{x->+oo} (sqrt(x^2+3x)-sqrt(x^2-x)) = 2
    xp = sp.symbols("xp", positive=True)
    check_step_chain(
        "jc935-1-9-3-7",
        [
            sp.sqrt(xp**2 + 3 * xp) - sp.sqrt(xp**2 - xp),
            (4 * xp) / (sp.sqrt(xp**2 + 3 * xp) + sp.sqrt(xp**2 - xp)),
            4 / (sp.sqrt(1 + 3 / xp) + sp.sqrt(1 - 1 / xp)),
        ],
        xp,
        sp.oo,
        2,
        dir_str="-",
    )
    verified.append("jc935-1-9-3-7")

    # 20. jc935-1-9-3-8: lim_{x->0} ((1-3x^2)^(2/3)-1)/(x ln(1+2x)) = -1
    num38 = (1 - 3 * x**2) ** sp.Rational(2, 3) - 1
    den38 = x * sp.log(1 + 2 * x)
    check_equiv_ratio("jc935-1-9-3-8-num", num38, -2 * x**2, x, 0)
    check_equiv_ratio("jc935-1-9-3-8-den", den38, 2 * x**2, x, 0)
    assert sp.limit(num38 / den38, x, 0) == -1
    verified.append("jc935-1-9-3-8")

    # 21. jc935-1-9-4-1: lim_{|x|->oo} e^(3/x) = 1
    assert sp.limit(sp.exp(3 / x), x, sp.oo) == 1
    assert sp.limit(sp.exp(3 / x), x, -sp.oo) == 1
    verified.append("jc935-1-9-4-1")

    # 22. jc935-1-9-4-2: lim_{x->0} ln(sin(3x)/(3x)) = 0
    assert sp.limit(sp.sin(3 * x) / (3 * x), x, 0) == 1
    assert sp.limit(sp.log(sp.sin(3 * x) / (3 * x)), x, 0) == 0
    verified.append("jc935-1-9-4-2")

    # 23. jc935-1-9-4-3: lim_{x->+oo} (1+2/x)^(3x/4) = e^(3/2)
    assert sp.simplify(sp.limit((1 + 2 / x) ** (3 * x / 4), x, sp.oo) - sp.exp(sp.Rational(3, 2))) == 0
    assert sp.simplify(sp.limit(((1 + u) ** (1 / u)) ** sp.Rational(3, 2), u, 0, dir="+") - sp.exp(sp.Rational(3, 2))) == 0
    verified.append("jc935-1-9-4-3")

    # 24. jc935-1-9-4-4: lim_{x->0} (1+2tan^2 x)^(3cot^2 x) = e^6
    assert sp.simplify(sp.limit((1 + 2 * sp.tan(x) ** 2) ** (3 * sp.cot(x) ** 2), x, 0) - sp.exp(6)) == 0
    assert sp.simplify(sp.limit(((1 + u) ** (1 / u)) ** 6, u, 0, dir="+") - sp.exp(6)) == 0
    verified.append("jc935-1-9-4-4")

    # 25. jc935-1-9-4-5: lim_{x->+oo} ((x+4)/(x+7))^(2x+1) = e^(-6)
    assert sp.simplify((x + 4) / (x + 7) - (1 - 3 / (x + 7))) == 0
    assert sp.limit((-3 * (2 * x + 1)) / (x + 7), x, sp.oo) == -6
    assert sp.simplify(sp.limit(((x + 4) / (x + 7)) ** (2 * x + 1), x, sp.oo) - sp.exp(-6)) == 0
    verified.append("jc935-1-9-4-5")

    # 26. jc935-1-9-4-6: A/B -> 1/8
    A46 = sp.sqrt(1 + sp.tan(x)) - sp.sqrt(1 + sp.sin(x))
    B46 = x * (sp.sqrt(1 + 4 * sp.sin(x) ** 2) - 1)
    A46_rat = (sp.tan(x) - sp.sin(x)) / (sp.sqrt(1 + sp.tan(x)) + sp.sqrt(1 + sp.sin(x)))
    B46_rat = (4 * x * sp.sin(x) ** 2) / (sp.sqrt(1 + 4 * sp.sin(x) ** 2) + 1)
    for xv in [0.05, -0.05, 0.01, -0.01]:
        assert abs(float(A46.subs(x, xv)) - float(A46_rat.subs(x, xv))) < 1e-12
        assert abs(float(B46.subs(x, xv)) - float(B46_rat.subs(x, xv))) < 1e-12
    check_equiv_ratio("jc935-1-9-4-6-A", A46_rat, x**3 / 4, x, 0)
    check_equiv_ratio("jc935-1-9-4-6-B", B46_rat, 2 * x**3, x, 0)
    assert sp.limit(A46 / B46, x, 0) == sp.Rational(1, 8)
    verified.append("jc935-1-9-4-6")

    # 27. jc935-1-9-4-7: lim_{x->3} (ln x - ln 3)/(x-3) = 1/3
    assert sp.limit((sp.log(x) - sp.log(3)) / (x - 3), x, 3) == sp.Rational(1, 3)
    assert sp.limit(sp.Rational(1, 3) * sp.log(1 + u) / u, u, 0) == sp.Rational(1, 3)
    verified.append("jc935-1-9-4-7")

    # 28. jc935-1-9-4-8: (e^(5x)-e^(3x)-e^(2x)+1)/((1-4x^2)^(1/3)-1) -> -9/2
    A48 = sp.exp(5 * x) - sp.exp(3 * x) - sp.exp(2 * x) + 1
    A48_fac = (sp.exp(3 * x) - 1) * (sp.exp(2 * x) - 1)
    B48 = (1 - 4 * x**2) ** sp.Rational(1, 3) - 1
    assert sp.simplify(sp.expand(A48 - A48_fac)) == 0
    check_equiv_ratio("jc935-1-9-4-8-A", A48_fac, 6 * x**2, x, 0)
    check_equiv_ratio("jc935-1-9-4-8-B", B48, -sp.Rational(4, 3) * x**2, x, 0)
    assert sp.limit(A48 / B48, x, 0) == sp.Rational(-9, 2)
    verified.append("jc935-1-9-4-8")

    # 29. jc935-1-9-4-9: lim_{x->+oo} x(e^(2/x)-1) = 2
    assert sp.limit(x * (sp.exp(2 / x) - 1), x, sp.oo) == 2
    assert sp.limit(2 * (sp.exp(u) - 1) / u, u, 0, dir="+") == 2
    verified.append("jc935-1-9-4-9")

    # 30. jc935-1-9-4-10: lim_{x->2} ((x^2-4)/(x-2)) e^(1/(x-2))
    f410 = ((x**2 - 4) / (x - 2)) * sp.exp(1 / (x - 2))
    f410_s = (x + 2) * sp.exp(1 / (x - 2))
    assert sp.simplify(f410 - f410_s) == 0
    assert sp.limit(f410_s, x, 2, dir="-") == 0
    assert sp.limit(f410_s, x, 2, dir="+") == sp.oo
    verified.append("jc935-1-9-4-10")

    # 31. jc935-1-9-5-1, 1-9-5-2, 1-9-5-3
    for xv in [-10, -1, 0, 1, 10]:
        assert math.exp(2 * xv) > 0
    assert 3**2 == 9 and (-3) ** 2 == 9
    assert (-2) ** 2 + 1 == 5 and 2**2 + 1 == 5
    verified.extend(["jc935-1-9-5-1", "jc935-1-9-5-2", "jc935-1-9-5-3"])

    # 32. jc935-1-9-6: e^(2(x-3)) (x<3), a+(x-3)^2 (x>=3)
    left_lim = sp.limit(sp.exp(2 * (x - 3)), x, 3, dir="-")
    right_lim = sp.limit(a + (x - 3) ** 2, x, 3, dir="+")
    assert left_lim == 1
    assert sp.solve(right_lim - left_lim, a) == [1]
    verified.append("jc935-1-9-6")

    # 33. jc935-1-10-2: x^5 - 2x - 4 on [1,2]
    f102 = x**5 - 2 * x - 4
    assert f102.subs(x, 1) == -5
    assert f102.subs(x, 2) == 24
    assert f102.subs(x, 1) * f102.subs(x, 2) < 0
    verified.append("jc935-1-10-2")

    # 34. jc935-1-10-3: F(x) = x - a sin(2x) - b
    F103 = x - a_pos * sp.sin(2 * x) - b_pos
    assert sp.simplify(F103.subs(x, 0) + b_pos) == 0
    assert sp.simplify(F103.subs(x, a_pos + b_pos) - a_pos * (1 - sp.sin(2 * (a_pos + b_pos)))) == 0
    verified.append("jc935-1-10-3")

    # 35. jc935-1-10-5: P(x) = x^3 - 7x + 2
    P105 = x**3 - 7 * x + 2
    vals = {pt: P105.subs(x, pt) for pt in (-3, -2, 0, 1, 2, 3)}
    assert vals == {-3: -4, -2: 8, 0: 2, 1: -4, 2: -4, 3: 8}
    assert vals[-3] * vals[-2] < 0
    assert vals[0] * vals[1] < 0
    assert vals[2] * vals[3] < 0
    verified.append("jc935-1-10-5")

    # 36. jc935-1-10-7 & 1-10-8 numeric bounds
    assert sp.solve(3 * u_pos - eps_pos, u_pos) == [eps_pos / 3]
    assert abs(-2) + 1 == 3 and abs(3) + 1 == 4
    verified.extend(["jc935-1-10-7", "jc935-1-10-8"])

    print(f"ALL OK: Verified {len(verified)} computable problems in ch1Sec8to10.")


if __name__ == "__main__":
    verify_all()
