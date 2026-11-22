"""SymPy step-chain verifier for ch2Sec1 guidedHints (jc935-2-1-*)."""

import sympy as sp

x, t, h, k, u = sp.symbols("x t h k u", real=True)
a, b = sp.symbols("a b", real=True)
a_nz = sp.symbols("a_nz", real=True, nonzero=True)
x_pos = sp.symbols("x_pos", real=True, positive=True)
x_nz = sp.symbols("x_nz", real=True, nonzero=True)
h_nz = sp.symbols("h_nz", real=True, nonzero=True)


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
            if expected_limit in (sp.oo, -sp.oo, sp.zoo):
                assert lp == expected_limit, f"[{pid}] Step {idx} right limit {lp} != {expected_limit}"
                assert lm == expected_limit, f"[{pid}] Step {idx} left limit {lm} != {expected_limit}"
            else:
                assert sp.simplify(lp - expected_limit) == 0, f"[{pid}] Step {idx} right limit {lp} != {expected_limit}"
                assert sp.simplify(lm - expected_limit) == 0, f"[{pid}] Step {idx} left limit {lm} != {expected_limit}"
        else:
            lv = sp.limit(e, var, point, dir=dir_str)
            if expected_limit in (sp.oo, -sp.oo, sp.zoo):
                assert lv == expected_limit, f"[{pid}] Step {idx} limit {lv} != {expected_limit}"
            else:
                assert sp.simplify(lv - expected_limit) == 0, f"[{pid}] Step {idx} limit {lv} != {expected_limit}"
    if check_final_denom and point not in (sp.oo, -sp.oo):
        _, denom = sp.fraction(sp.together(exprs[-1]))
        assert denom.subs(var, point) != 0, f"[{pid}] Final step denominator vanishes at {point}"


def check_deriv_chain(pid: str, f_expr: sp.Expr, var: sp.Symbol, steps: list[sp.Expr], expected: sp.Expr):
    true_d = sp.diff(f_expr, var)
    assert sp.simplify(true_d - expected) == 0, f"[{pid}] diff={true_d} != {expected}"
    for i in range(1, len(steps)):
        assert sp.simplify(steps[i] - steps[i - 1]) == 0, f"[{pid}] step {i-1}->{i} mismatch"
    assert sp.simplify(steps[-1] - expected) == 0, f"[{pid}] final step {steps[-1]} != {expected}"


def verify_all():
    # 1. jc935-2-1-1: theta(t) = 5t^2 + t, theta'(1) = 11
    theta = 5 * t**2 + t
    q0 = (theta.subs(t, 1 + h) - theta.subs(t, 1)) / h
    q1 = (5 * (1 + h) ** 2 + (1 + h) - 6) / h
    q2 = (11 * h + 5 * h**2) / h
    q3 = 11 + 5 * h
    check_step_chain("jc935-2-1-1", [q0, q1, q2, q3], h, 0, 11)
    assert sp.diff(theta, t).subs(t, 1) == 11

    # 2. jc935-2-1-2: T(t) = 22 + 36/(t+1), T'(2) = -4
    T = 22 + sp.Integer(36) / (t + 1)
    check_step_chain(
        "jc935-2-1-2",
        [
            (T.subs(t, 2 + h) - T.subs(t, 2)) / h,
            (sp.Integer(36) / (3 + h) - sp.Integer(36) / 3) / h,
            (-12 * h / (3 + h)) / h,
            -sp.Integer(12) / (3 + h),
        ],
        h,
        0,
        -4,
    )
    assert sp.diff(T, t).subs(t, 2) == -4

    # 3. jc935-2-1-3-1: C(x) = 1200 + 72x - x^2/5, C'(60) = 48
    C = 1200 + 72 * x - x**2 / 5
    check_deriv_chain("jc935-2-1-3-1", C, x, [0 + 72 - 2 * x / 5, 72 - 2 * x / 5], 72 - 2 * x / 5)
    assert sp.diff(C, x).subs(x, 60) == 48

    # 4. jc935-2-1-3-2: C(61) - C(60) = 239/5
    s0 = C.subs(x, 61) - C.subs(x, 60)
    s1 = 72 * (61 - 60) - (61**2 - 60**2) / sp.Integer(5)
    s2 = 72 - sp.Integer(121) / 5
    s3 = sp.Rational(360 - 121, 5)
    assert s0 == s1 == s2 == s3 == sp.Rational(239, 5)

    # 5. jc935-2-1-4: f(x) = prod_{k=1}^n (x-2k)/(x+2k), f'(2) = (-1)^(n-1)/(2n(n+1))
    for n_val in range(1, 7):
        f_n = sp.Integer(1)
        for kv in range(1, n_val + 1):
            f_n *= (x - 2 * kv) / (x + 2 * kv)
        assert f_n.subs(x, 2) == 0
        rem = sp.Integer(1) / (x + 2)
        for kv in range(2, n_val + 1):
            rem *= (x - 2 * kv) / (x + 2 * kv)
        expected_n = sp.Rational((-1) ** (n_val - 1), 2 * n_val * (n_val + 1))
        check_step_chain(f"jc935-2-1-4(n={n_val})", [f_n / (x - 2), rem], x, 2, expected_n)

    # 6. jc935-2-1-5: f(x) = cos(2x + pi/4), f'(x) = -2 sin(2x + pi/4)
    A = 2 * x + sp.pi / 4
    check_step_chain(
        "jc935-2-1-5",
        [
            (sp.cos(2 * (x + h) + sp.pi / 4) - sp.cos(2 * x + sp.pi / 4)) / h,
            (sp.cos(A + 2 * h) - sp.cos(A)) / h,
            (-2 * sp.sin(A + h) * sp.sin(h)) / h,
            -2 * sp.sin(A + h) * (sp.sin(h) / h),
        ],
        h,
        0,
        -2 * sp.sin(A),
        check_final_denom=False,
    )

    # 7. jc935-2-1-6-1: lim_{h->0} (f(2-3h)-f(2))/h = -3 f'(2)
    f_test = sp.sin(x) + x**3
    check_step_chain(
        "jc935-2-1-6-1",
        [
            (f_test.subs(x, 2 - 3 * h) - f_test.subs(x, 2)) / h,
            -3 * (f_test.subs(x, 2 - 3 * h) - f_test.subs(x, 2)) / (-3 * h),
        ],
        h,
        0,
        -3 * sp.diff(f_test, x).subs(x, 2),
        check_final_denom=False,
    )

    # 8. jc935-2-1-6-2: lim_{x->-2} f(x)/(x+2) = f'(-2) when f(-2)=0
    f_z = (x + 2) * (x**2 + 1)
    assert f_z.subs(x, -2) == 0
    check_step_chain(
        "jc935-2-1-6-2",
        [f_z / (x + 2), (f_z - f_z.subs(x, -2)) / (x - (-2))],
        x,
        -2,
        sp.diff(f_z, x).subs(x, -2),
        check_final_denom=False,
    )

    # 9. jc935-2-1-6-3: lim_{h->0} (f(1+2h)-f(1-2h))/h = 4 f'(1)
    check_step_chain(
        "jc935-2-1-6-3",
        [
            (f_test.subs(x, 1 + 2 * h) - f_test.subs(x, 1 - 2 * h)) / h,
            (f_test.subs(x, 1 + 2 * h) - f_test.subs(x, 1)) / h
            - (f_test.subs(x, 1 - 2 * h) - f_test.subs(x, 1)) / h,
            2 * (f_test.subs(x, 1 + 2 * h) - f_test.subs(x, 1)) / (2 * h)
            + 2 * (f_test.subs(x, 1 - 2 * h) - f_test.subs(x, 1)) / (-2 * h),
        ],
        h,
        0,
        4 * sp.diff(f_test, x).subs(x, 1),
        check_final_denom=False,
    )

    # 10. jc935-2-1-7: piecewise x^2/2 (x<=2), x+3 (x>2)
    f2_val = sp.Rational(2**2, 2)
    assert f2_val == 2
    check_step_chain("jc935-2-1-7-left", [(x**2 / 2 - 2) / (x - 2), (x + 2) / 2], x, 2, 2, dir_str="-")
    check_step_chain(
        "jc935-2-1-7-right",
        [((x + 3) - 2) / (x - 2), 1 + sp.Integer(3) / (x - 2)],
        x,
        2,
        sp.oo,
        dir_str="+",
        check_final_denom=False,
    )

    # 11. jc935-2-1-8: F(x) = f(x)(1 + |sin 2x|)
    assert sp.limit(sp.Abs(sp.sin(2 * x)) / x, x, 0, dir="+") == 2
    assert sp.limit(sp.Abs(sp.sin(2 * x)) / x, x, 0, dir="-") == -2
    c0, c1 = sp.symbols("c0 c1", real=True)
    assert sp.solve(sp.Eq(c1 + 2 * c0, c1 - 2 * c0), c0) == [0]

    # 12. jc935-2-1-9-1: y = 3x^5 -> 15x^4
    check_deriv_chain("jc935-2-1-9-1", 3 * x**5, x, [3 * 5 * x**4, 15 * x**4], 15 * x**4)

    # 13. jc935-2-1-9-2: y = cbrt(x^4)
    # Using u = cbrt(x), y = u^4, dy/dx = (dy/du)/(dx/du) = 4u^3/(3u^2) = 4u/3
    assert sp.simplify(sp.diff(u**4, u) / sp.diff(u**3, u) - sp.Rational(4, 3) * u) == 0
    assert sp.limit(u**4 / u**3, u, 0) == 0

    # 14. jc935-2-1-9-3: y = x^(7/5), x>0
    check_deriv_chain(
        "jc935-2-1-9-3",
        x_pos ** sp.Rational(7, 5),
        x_pos,
        [sp.Rational(7, 5) * x_pos ** (sp.Rational(7, 5) - 1), sp.Rational(7, 5) * x_pos ** sp.Rational(2, 5)],
        sp.Rational(7, 5) * x_pos ** sp.Rational(2, 5),
    )

    # 15. jc935-2-1-9-4: y = 2/sqrt(x), x>0 -> -x^(-3/2)
    check_deriv_chain(
        "jc935-2-1-9-4",
        2 / sp.sqrt(x_pos),
        x_pos,
        [2 * sp.Rational(-1, 2) * x_pos ** (sp.Rational(-1, 2) - 1), -(x_pos ** sp.Rational(-3, 2))],
        -(x_pos ** sp.Rational(-3, 2)),
    )

    # 16. jc935-2-1-9-5: y = 5/x^3, x!=0 -> -15/x^4
    check_deriv_chain(
        "jc935-2-1-9-5",
        5 / x_nz**3,
        x_nz,
        [5 * (-3) * x_nz ** (-3 - 1), -15 / x_nz**4],
        -15 / x_nz**4,
    )

    # 17. jc935-2-1-9-6: y = x^2 * (x^3)^(1/5), u = x^(1/5) -> y = u^13, y' = (13/5)u^8, y'(0)=0
    assert sp.simplify(sp.diff(u**13, u) / sp.diff(u**5, u) - sp.Rational(13, 5) * u**8) == 0
    assert sp.limit(u**13 / u**5, u, 0) == 0

    # 18. jc935-2-1-9-7: y = (x^3 * x^(1/3)) / sqrt(x^5) = x^(5/6), y' = (5/6)x^(-1/6)
    f_97 = (x_pos**3 * x_pos ** sp.Rational(1, 3)) / sp.sqrt(x_pos**5)
    assert sp.simplify(f_97 - x_pos ** sp.Rational(5, 6)) == 0
    check_deriv_chain(
        "jc935-2-1-9-7",
        f_97,
        x_pos,
        [sp.Rational(5, 6) * x_pos ** (sp.Rational(5, 6) - 1), sp.Rational(5, 6) * x_pos ** sp.Rational(-1, 6)],
        sp.Rational(5, 6) * x_pos ** sp.Rational(-1, 6),
    )

    # 19. jc935-2-1-10: s(t) = 2t^3 - t, v(3) = 53
    s_t = 2 * t**3 - t
    v_t = sp.diff(s_t, t)
    assert sp.simplify(v_t - (6 * t**2 - 1)) == 0
    assert v_t.subs(t, 3) == 53

    # 20. jc935-2-1-11-1: odd f -> even f'
    f_odd = sp.sin(x) + x**3
    assert sp.simplify(f_odd.subs(x, -x) + f_odd) == 0
    fp_odd = sp.diff(f_odd, x)
    assert sp.simplify(fp_odd.subs(x, -x) - fp_odd) == 0

    # 21. jc935-2-1-11-2: even g -> odd g'
    g_even = sp.cos(x) + x**4
    assert sp.simplify(g_even.subs(x, -x) - g_even) == 0
    gp_even = sp.diff(g_even, x)
    assert sp.simplify(gp_even.subs(x, -x) + gp_even) == 0

    # 22. jc935-2-1-11-3: even g differentiable at 0 -> g'(0)=0; counterexample 2|x|
    Q = (g_even.subs(x, h) - g_even.subs(x, 0)) / h
    assert sp.simplify(Q.subs(h, -h) + Q) == 0
    assert sp.limit(Q, h, 0) == 0
    assert sp.limit(2 * sp.Abs(h) / h, h, 0, dir="+") == 2
    assert sp.limit(2 * sp.Abs(h) / h, h, 0, dir="-") == -2

    # 23. jc935-2-1-12-1: y = 2 cos x, x = pi/6 -> k = -1
    y12 = 2 * sp.cos(x)
    assert sp.diff(y12, x).subs(x, sp.pi / 6) == -1

    # 24. jc935-2-1-12-2: y = 2 cos x, x = 3pi/2 -> k = 2
    assert sp.diff(y12, x).subs(x, 3 * sp.pi / 2) == 2

    # 25. jc935-2-1-13: y = 3 sin x at P(pi, 0)
    y13 = 3 * sp.sin(x)
    k_tan = sp.diff(y13, x).subs(x, sp.pi)
    k_norm = -1 / k_tan
    assert k_tan == -3 and k_norm == sp.Rational(1, 3)

    # 26. jc935-2-1-14: y = 2 e^(2x) at x = 0 -> y = 4x + 2
    y14 = 2 * sp.exp(2 * x)
    y0 = y14.subs(x, 0)
    k14 = sp.diff(y14, x).subs(x, 0)
    assert y0 == 2 and k14 == 4
    assert sp.simplify(y0 + k14 * (x - 0) - (4 * x + 2)) == 0

    # 27. jc935-2-1-15: y = 2x^2 + 1, secant (-1,3)-(5,51), parallel tangent at (2,9)
    y15 = 2 * x**2 + 1
    k_sec = (y15.subs(x, 5) - y15.subs(x, -1)) / (5 - (-1))
    assert k_sec == 8
    sol_x = sp.solve(sp.Eq(sp.diff(y15, x), k_sec), x)
    assert sol_x == [2] and y15.subs(x, 2) == 9

    # 28. jc935-2-1-16-1: f(x) = |sin 3x| at 0
    f16_1 = sp.Abs(sp.sin(3 * x))
    assert sp.limit(f16_1, x, 0) == 0
    check_step_chain("jc935-2-1-16-1-pos", [sp.sin(3 * x) / x, 3 * (sp.sin(3 * x) / (3 * x))], x, 0, 3, dir_str="+", check_final_denom=False)
    check_step_chain("jc935-2-1-16-1-neg", [-sp.sin(3 * x) / x, -3 * (sp.sin(3 * x) / (3 * x))], x, 0, -3, dir_str="-", check_final_denom=False)

    # 29. jc935-2-1-16-2: f(x) = x^3 cos(2/x) (x!=0), 0 (x=0)
    assert sp.limit(sp.Abs(x) ** 3, x, 0) == 0
    assert sp.simplify((x_nz**3 * sp.cos(2 / x_nz)) / x_nz - x_nz**2 * sp.cos(2 / x_nz)) == 0
    assert sp.limit(x**2, x, 0) == 0

    # 30. jc935-2-1-17: x^3/2 (x<=2), ax+b (x>2) -> a=6, b=-8
    eq1 = sp.Eq(2 * a + b, sp.Rational(2**3, 2))
    eq2 = sp.Eq(a, sp.diff(x**3 / 2, x).subs(x, 2))
    sol17 = sp.solve([eq1, eq2], [a, b])
    assert sol17 == {a: 6, b: -8}

    # 31. jc935-2-1-18: -2(x-1) (x<1), (x-1)^2 (x>=1)
    check_step_chain("jc935-2-1-18-left", [(-2 * (x - 1) - 0) / (x - 1), sp.Integer(-2)], x, 1, -2, dir_str="-")
    check_step_chain("jc935-2-1-18-right", [((x - 1) ** 2 - 0) / (x - 1), x - 1], x, 1, 0, dir_str="+")

    # 32. jc935-2-1-19: sin(3x) (x<0), 3x+x^2 (x>=0)
    assert sp.diff(sp.sin(3 * x), x) == 3 * sp.cos(3 * x)
    assert sp.diff(3 * x + x**2, x) == 3 + 2 * x
    check_step_chain("jc935-2-1-19-left", [sp.sin(3 * x) / x, 3 * (sp.sin(3 * x) / (3 * x))], x, 0, 3, dir_str="-", check_final_denom=False)
    check_step_chain("jc935-2-1-19-right", [(3 * x + x**2) / x, 3 + x], x, 0, 3, dir_str="+")

    # 33. jc935-2-1-20: xy = 12, tangent at (a, 12/a), triangle area = 24
    y20 = 12 / x_nz
    k20 = sp.diff(y20, x_nz).subs(x_nz, a_nz)
    assert sp.simplify(k20 + 12 / a_nz**2) == 0
    tan_line = 12 / a_nz + k20 * (x - a_nz)
    assert sp.simplify(tan_line - (-12 * x / a_nz**2 + 24 / a_nz)) == 0
    y_int = tan_line.subs(x, 0)
    x_int = sp.solve(sp.Eq(tan_line, 0), x)[0]
    assert sp.simplify(y_int - 24 / a_nz) == 0
    assert sp.simplify(x_int - 2 * a_nz) == 0
    area = sp.Rational(1, 2) * sp.Abs(x_int) * sp.Abs(y_int)
    assert sp.simplify(area) == 24

    print("ALL 33 ch2Sec1 guidedHints VERIFIED OK!")


if __name__ == "__main__":
    verify_all()
