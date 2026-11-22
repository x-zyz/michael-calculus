"""SymPy step-chain verifier for ch2Sec2b guidedHints (37 problems: jc935-2-2-7-10 through jc935-2-2-14)."""

import sympy as sp

x, t = sp.symbols("x t", real=True)
n = sp.symbols("n", integer=True, positive=True)


def check_equiv(pid: str, label: str, a: sp.Expr, b: sp.Expr, var=x, pts=None):
    """Verify a == b symbolically, falling back to high-precision multi-point check if needed."""
    if pts is None:
        diff = sp.simplify(a - b)
        if diff == 0:
            return
        # Try trigsimp / rewrite(exp)
        diff2 = sp.simplify(diff.rewrite(sp.exp))
        if diff2 == 0:
            return
        raise AssertionError(f"[{pid}] {label} symbolic mismatch: diff={diff}")
    else:
        for pv in pts:
            va = complex(sp.N(a.subs(var, pv), 30))
            vb = complex(sp.N(b.subs(var, pv), 30))
            assert abs(va - vb) < 1e-20, f"[{pid}] {label} numeric mismatch at {var}={pv}: {va} vs {vb}"


def check_deriv_chain(pid: str, y_expr: sp.Expr, steps: list[sp.Expr], expected: sp.Expr, var=x, pts=None):
    """Verify y' == steps[0] == ... == steps[-1] == expected, and denominator non-zero on pts."""
    dy = sp.diff(y_expr, var)
    chain = [dy] + steps + [expected]
    for i in range(1, len(chain)):
        check_equiv(pid, f"step {i-1}->{i}", chain[i - 1], chain[i], var=var, pts=pts)
    if pts is not None:
        _, denom = sp.fraction(sp.together(steps[-1]))
        for pv in pts:
            dv = complex(sp.N(denom.subs(var, pv), 20))
            assert abs(dv) > 1e-12, f"[{pid}] final step denominator vanishes at {var}={pv}"


def verify_all():
    # 1. jc935-2-2-7-10: y = ln(csc(3x) - cot(3x))
    u = 3 * x
    y_7_10 = sp.log(sp.csc(u) - sp.cot(u))
    check_deriv_chain(
        "jc935-2-2-7-10",
        y_7_10,
        [
            (-sp.csc(u) * sp.cot(u) + sp.csc(u) ** 2) / (sp.csc(u) - sp.cot(u)) * 3,
            sp.csc(u) * (sp.csc(u) - sp.cot(u)) / (sp.csc(u) - sp.cot(u)) * 3,
        ],
        3 * sp.csc(3 * x),
        pts=[sp.Rational(1, 5), sp.Rational(2, 5), sp.Rational(1, 2)],
    )

    # 2. jc935-2-2-8-1: y = (arcsin(x/3))^2, |x|<3
    y_8_1 = sp.asin(x / 3) ** 2
    check_deriv_chain(
        "jc935-2-2-8-1",
        y_8_1,
        [
            2 * sp.asin(x / 3) / (3 * sp.sqrt(1 - x**2 / 9)),
            2 * sp.asin(x / 3) / sp.sqrt(9 * (1 - x**2 / 9)),
        ],
        2 * sp.asin(x / 3) / sp.sqrt(9 - x**2),
        pts=[sp.Rational(-2, 1), sp.Rational(-1, 2), sp.Rational(1, 2), sp.Rational(5, 2)],
    )

    # 3. jc935-2-2-8-2: y = ln(tan(x/3)), tan(x/3)>0
    u = x / 3
    y_8_2 = sp.log(sp.tan(u))
    check_deriv_chain(
        "jc935-2-2-8-2",
        y_8_2,
        [
            sp.sec(u) ** 2 / sp.tan(u) * sp.Rational(1, 3),
            1 / (3 * sp.sin(u) * sp.cos(u)),
            2 / (3 * (2 * sp.sin(u) * sp.cos(u))),
        ],
        2 / (3 * sp.sin(2 * x / 3)),
        pts=[sp.Rational(1, 2), sp.Rational(1, 1), sp.Rational(2, 1)],
    )

    # 4. jc935-2-2-8-3: y = sqrt(4 + (ln x)^2), x>0
    y_8_3 = sp.sqrt(4 + sp.log(x) ** 2)
    check_deriv_chain(
        "jc935-2-2-8-3",
        y_8_3,
        [
            2 * sp.log(x) / (2 * x * sp.sqrt(4 + sp.log(x) ** 2)),
        ],
        sp.log(x) / (x * sp.sqrt(4 + sp.log(x) ** 2)),
        pts=[sp.Rational(1, 2), sp.Rational(1, 1), sp.Rational(3, 1)],
    )

    # 5. jc935-2-2-8-4: y = exp(arctan(sqrt(2x))), x>0
    y_8_4 = sp.exp(sp.atan(sp.sqrt(2 * x)))
    check_deriv_chain(
        "jc935-2-2-8-4",
        y_8_4,
        [
            sp.exp(sp.atan(sp.sqrt(2 * x))) * (1 / (1 + 2 * x)) * (1 / sp.sqrt(2 * x)),
        ],
        sp.exp(sp.atan(sp.sqrt(2 * x))) / ((1 + 2 * x) * sp.sqrt(2 * x)),
        pts=[sp.Rational(1, 4), sp.Rational(1, 1), sp.Rational(3, 2)],
    )

    # 6. jc935-2-2-8-5: y = sin^n(2x) cos(2nx)
    y_8_5 = sp.sin(2 * x) ** n * sp.cos(2 * n * x)
    check_deriv_chain(
        "jc935-2-2-8-5",
        y_8_5,
        [
            2 * n * sp.sin(2 * x) ** (n - 1) * sp.cos(2 * x) * sp.cos(2 * n * x)
            - 2 * n * sp.sin(2 * x) ** n * sp.sin(2 * n * x),
            2 * n * sp.sin(2 * x) ** (n - 1) * (sp.cos(2 * x) * sp.cos(2 * n * x) - sp.sin(2 * x) * sp.sin(2 * n * x)),
        ],
        2 * n * sp.sin(2 * x) ** (n - 1) * sp.cos(2 * (n + 1) * x),
    )

    # 7. jc935-2-2-8-6: y = arctan((x+2)/(x-2)), x!=2
    y_8_6 = sp.atan((x + 2) / (x - 2))
    check_deriv_chain(
        "jc935-2-2-8-6",
        y_8_6,
        [
            (x - 2) ** 2 / ((x - 2) ** 2 + (x + 2) ** 2) * (-4) / (x - 2) ** 2,
            -4 / ((x - 2) ** 2 + (x + 2) ** 2),
            -4 / (2 * x**2 + 8),
        ],
        -2 / (x**2 + 4),
    )

    # 8. jc935-2-2-8-7: y = arcsin(x/2) / arccos(x/2), |x|<2
    y_8_7 = sp.asin(x / 2) / sp.acos(x / 2)
    check_deriv_chain(
        "jc935-2-2-8-7",
        y_8_7,
        [
            (sp.acos(x / 2) + sp.asin(x / 2)) / (sp.sqrt(4 - x**2) * sp.acos(x / 2) ** 2),
        ],
        sp.pi / (2 * sp.sqrt(4 - x**2) * sp.acos(x / 2) ** 2),
        pts=[sp.Rational(-3, 2), sp.Rational(-1, 2), sp.Rational(1, 2), sp.Rational(3, 2)],
    )

    # 9. jc935-2-2-8-8: y = ln(ln(ln(2x))), x > e/2
    y_8_8 = sp.log(sp.log(sp.log(2 * x)))
    check_deriv_chain(
        "jc935-2-2-8-8",
        y_8_8,
        [
            1 / sp.log(sp.log(2 * x)) * (1 / sp.log(2 * x)) * (1 / x),
        ],
        1 / (x * sp.log(2 * x) * sp.log(sp.log(2 * x))),
        pts=[sp.Rational(2, 1), sp.Rational(5, 1), sp.Rational(10, 1)],
    )

    # 10. jc935-2-2-8-9: y = (sqrt(4+x)-sqrt(4-x))/(sqrt(4+x)+sqrt(4-x)), |x|<4
    y_8_9 = (sp.sqrt(4 + x) - sp.sqrt(4 - x)) / (sp.sqrt(4 + x) + sp.sqrt(4 - x))
    y_8_9_simp = x / (4 + sp.sqrt(16 - x**2))
    check_equiv("jc935-2-2-8-9", "rationalize", y_8_9, y_8_9_simp, pts=[-3, -1, 0, 1, 3])
    v = sp.sqrt(16 - x**2)
    check_deriv_chain(
        "jc935-2-2-8-9",
        y_8_9,
        [
            ((4 + v) - x * (-x / v)) / (4 + v) ** 2,
            (4 * v + 16) / (v * (4 + v) ** 2),
            4 * (4 + v) / (v * (4 + v) ** 2),
        ],
        4 / (v * (4 + v)),
        pts=[sp.Rational(-3, 1), sp.Rational(-1, 2), sp.Rational(1, 2), sp.Rational(3, 1)],
    )

    # 11. jc935-2-2-8-10: y = arcsin(sqrt((2-x)/(2+x))), 0<x<2
    v10 = (2 - x) / (2 + x)
    y_8_10 = sp.asin(sp.sqrt(v10))
    check_deriv_chain(
        "jc935-2-2-8-10",
        y_8_10,
        [
            (-4 / (2 + x) ** 2) / (2 * sp.sqrt(v10 * (1 - v10))),
            (2 + x) / (2 * sp.sqrt(2 * x * (2 - x))) * (-4 / (2 + x) ** 2),
        ],
        -sp.sqrt(2) / ((2 + x) * sp.sqrt(x * (2 - x))),
        pts=[sp.Rational(1, 4), sp.Rational(1, 1), sp.Rational(7, 4)],
    )

    # 12. jc935-2-2-9: y = sqrt(2 u(x)^2 + 3 v(x)^2)
    uf = sp.Function("u")(x)
    vf = sp.Function("v")(x)
    y_9 = sp.sqrt(2 * uf**2 + 3 * vf**2)
    check_deriv_chain(
        "jc935-2-2-9",
        y_9,
        [
            (4 * uf * sp.diff(uf, x) + 6 * vf * sp.diff(vf, x)) / (2 * sp.sqrt(2 * uf**2 + 3 * vf**2)),
        ],
        (2 * uf * sp.diff(uf, x) + 3 * vf * sp.diff(vf, x)) / sp.sqrt(2 * uf**2 + 3 * vf**2),
    )

    # 13. jc935-2-2-10-1: y = f(x^3 + 1)
    ff = sp.Function("f")
    y_10_1 = ff(x**3 + 1)
    fp_u = sp.Subs(sp.Derivative(ff(t), t), t, x**3 + 1)
    check_deriv_chain(
        "jc935-2-2-10-1",
        y_10_1,
        [
            fp_u * sp.diff(x**3 + 1, x),
        ],
        3 * x**2 * fp_u,
    )

    # 14. jc935-2-2-10-2: y = f(sin^2(2x)) - f(cos^2(2x))
    y_10_2 = ff(sp.sin(2 * x) ** 2) - ff(sp.cos(2 * x) ** 2)
    fp_sin = sp.Subs(sp.Derivative(ff(t), t), t, sp.sin(2 * x) ** 2)
    fp_cos = sp.Subs(sp.Derivative(ff(t), t), t, sp.cos(2 * x) ** 2)
    check_deriv_chain(
        "jc935-2-2-10-2",
        y_10_2,
        [
            4 * sp.sin(2 * x) * sp.cos(2 * x) * fp_sin + 4 * sp.cos(2 * x) * sp.sin(2 * x) * fp_cos,
            2 * sp.sin(4 * x) * fp_sin + 2 * sp.sin(4 * x) * fp_cos,
        ],
        2 * sp.sin(4 * x) * (fp_sin + fp_cos),
    )

    # 15. jc935-2-2-10-3: y = f(e^{2x}) / e^{2 f(x)}
    y_10_3 = ff(sp.exp(2 * x)) / sp.exp(2 * ff(x))
    fp_e2x = sp.Subs(sp.Derivative(ff(t), t), t, sp.exp(2 * x))
    fp_x = sp.diff(ff(x), x)
    check_deriv_chain(
        "jc935-2-2-10-3",
        y_10_3,
        [
            (2 * sp.exp(2 * x) * fp_e2x * sp.exp(2 * ff(x)) - 2 * fp_x * ff(sp.exp(2 * x)) * sp.exp(2 * ff(x)))
            / sp.exp(2 * ff(x)) ** 2,
            2 * sp.exp(2 * ff(x)) * (sp.exp(2 * x) * fp_e2x - fp_x * ff(sp.exp(2 * x))) / sp.exp(2 * ff(x)) ** 2,
        ],
        2 * sp.exp(-2 * ff(x)) * (sp.exp(2 * x) * fp_e2x - fp_x * ff(sp.exp(2 * x))),
    )

    # 16. jc935-2-2-11-1: y = e^{-2x}(x^2 - x + 1)
    y_11_1 = sp.exp(-2 * x) * (x**2 - x + 1)
    check_deriv_chain(
        "jc935-2-2-11-1",
        y_11_1,
        [
            -2 * sp.exp(-2 * x) * (x**2 - x + 1) + sp.exp(-2 * x) * (2 * x - 1),
            sp.exp(-2 * x) * (-2 * x**2 + 2 * x - 2 + 2 * x - 1),
        ],
        sp.exp(-2 * x) * (-2 * x**2 + 4 * x - 3),
    )

    # 17. jc935-2-2-11-2: y = cos^2(x) * cos(x^2)
    y_11_2 = sp.cos(x) ** 2 * sp.cos(x**2)
    check_deriv_chain(
        "jc935-2-2-11-2",
        y_11_2,
        [
            (-sp.sin(2 * x)) * sp.cos(x**2) + sp.cos(x) ** 2 * (-2 * x * sp.sin(x**2)),
        ],
        -sp.sin(2 * x) * sp.cos(x**2) - 2 * x * sp.cos(x) ** 2 * sp.sin(x**2),
    )

    # 18. jc935-2-2-11-3: y = (arctan(x/3))^2
    y_11_3 = sp.atan(x / 3) ** 2
    check_deriv_chain(
        "jc935-2-2-11-3",
        y_11_3,
        [
            2 * sp.atan(x / 3) * (1 / (1 + x**2 / 9)) * sp.Rational(1, 3),
            2 * (9 / (9 + x**2)) * sp.Rational(1, 3) * sp.atan(x / 3),
        ],
        6 / (9 + x**2) * sp.atan(x / 3),
    )

    # 19. jc935-2-2-11-4: y = ln(2x) / x^n, x>0
    y_11_4 = sp.log(2 * x) / x**n
    check_deriv_chain(
        "jc935-2-2-11-4",
        y_11_4,
        [
            ((1 / x) * x**n - n * x ** (n - 1) * sp.log(2 * x)) / (x**n) ** 2,
            x ** (n - 1) * (1 - n * sp.log(2 * x)) / x ** (2 * n),
        ],
        (1 - n * sp.log(2 * x)) / x ** (n + 1),
    )

    # 20. jc935-2-2-11-5: y = (e^{2t} - e^{-2t}) / (e^{2t} + e^{-2t})
    u5 = sp.exp(2 * t) - sp.exp(-2 * t)
    v5 = sp.exp(2 * t) + sp.exp(-2 * t)
    y_11_5 = u5 / v5
    check_deriv_chain(
        "jc935-2-2-11-5",
        y_11_5,
        [
            2 * (v5**2 - u5**2) / v5**2,
            2 * 4 / v5**2,
        ],
        8 / v5**2,
        var=t,
    )

    # 21. jc935-2-2-11-6: y = ln(sin(2/x)), sin(2/x)>0
    y_11_6 = sp.log(sp.sin(2 / x))
    check_deriv_chain(
        "jc935-2-2-11-6",
        y_11_6,
        [
            sp.cot(2 / x) * (-2 / x**2),
        ],
        -2 / x**2 * sp.cot(2 / x),
        pts=[sp.Rational(1, 1), sp.Rational(2, 1), sp.Rational(3, 1)],
    )

    # 22. jc935-2-2-11-7: y = exp(-cos^2(2/x)), x!=0
    y_11_7 = sp.exp(-sp.cos(2 / x) ** 2)
    check_deriv_chain(
        "jc935-2-2-11-7",
        y_11_7,
        [
            sp.exp(-sp.cos(2 / x) ** 2) * (2 * sp.sin(2 / x) * sp.cos(2 / x)) * (-2 / x**2),
            -2 / x**2 * sp.sin(4 / x) * sp.exp(-sp.cos(2 / x) ** 2),
        ],
        -2 / x**2 * sp.sin(4 / x) * sp.exp(-sp.cos(2 / x) ** 2),
        pts=[sp.Rational(-2, 1), sp.Rational(1, 2), sp.Rational(3, 1)],
    )

    # 23. jc935-2-2-11-8: y = sqrt(2x + sqrt(2x)), x>0
    y_11_8 = sp.sqrt(2 * x + sp.sqrt(2 * x))
    check_deriv_chain(
        "jc935-2-2-11-8",
        y_11_8,
        [
            1 / (2 * sp.sqrt(2 * x + sp.sqrt(2 * x))) * (2 + 1 / sp.sqrt(2 * x)),
            1 / (2 * sp.sqrt(2 * x + sp.sqrt(2 * x))) * ((2 * sp.sqrt(2 * x) + 1) / sp.sqrt(2 * x)),
        ],
        (2 * sp.sqrt(2 * x) + 1) / (2 * sp.sqrt(2 * x) * sp.sqrt(2 * x + sp.sqrt(2 * x))),
        pts=[sp.Rational(1, 2), sp.Rational(2, 1), sp.Rational(9, 2)],
    )

    # 24. jc935-2-2-11-9: y = x arcsin(x/3) + sqrt(9 - x^2), |x|<3
    y_11_9 = x * sp.asin(x / 3) + sp.sqrt(9 - x**2)
    check_deriv_chain(
        "jc935-2-2-11-9",
        y_11_9,
        [
            sp.asin(x / 3) + x / sp.sqrt(9 - x**2) - x / sp.sqrt(9 - x**2),
        ],
        sp.asin(x / 3),
        pts=[sp.Rational(-2, 1), sp.Rational(-1, 2), sp.Rational(1, 2), sp.Rational(2, 1)],
    )

    # 25. jc935-2-2-11-10: y = arcsin(4t / (4 + t^2)), t != +-2
    y_11_10 = sp.asin(4 * t / (4 + t**2))
    # |t| < 2 -> +4/(4+t^2)
    check_deriv_chain(
        "jc935-2-2-11-10(|t|<2)",
        y_11_10,
        [
            (4 + t**2) / sp.Abs(4 - t**2) * (4 * (4 - t**2) / (4 + t**2) ** 2),
            (4 - t**2) / sp.Abs(4 - t**2) * (4 / (4 + t**2)),
        ],
        4 / (4 + t**2),
        var=t,
        pts=[sp.Rational(-3, 2), sp.Rational(0, 1), sp.Rational(1, 1)],
    )
    # |t| > 2 -> -4/(4+t^2)
    check_deriv_chain(
        "jc935-2-2-11-10(|t|>2)",
        y_11_10,
        [
            (4 + t**2) / sp.Abs(4 - t**2) * (4 * (4 - t**2) / (4 + t**2) ** 2),
            (4 - t**2) / sp.Abs(4 - t**2) * (4 / (4 + t**2)),
        ],
        -4 / (4 + t**2),
        var=t,
        pts=[sp.Rational(-4, 1), sp.Rational(3, 1), sp.Rational(5, 1)],
    )

    # 26. jc935-2-2-12-1: y = sinh(cosh(2x))
    y_12_1 = sp.sinh(sp.cosh(2 * x))
    check_deriv_chain(
        "jc935-2-2-12-1",
        y_12_1,
        [
            sp.cosh(sp.cosh(2 * x)) * sp.sinh(2 * x) * 2,
        ],
        2 * sp.sinh(2 * x) * sp.cosh(sp.cosh(2 * x)),
    )

    # 27. jc935-2-2-12-2: y = cosh(x) * exp(sinh(x))
    y_12_2 = sp.cosh(x) * sp.exp(sp.sinh(x))
    check_deriv_chain(
        "jc935-2-2-12-2",
        y_12_2,
        [
            sp.sinh(x) * sp.exp(sp.sinh(x)) + sp.cosh(x) ** 2 * sp.exp(sp.sinh(x)),
        ],
        sp.exp(sp.sinh(x)) * (sp.sinh(x) + sp.cosh(x) ** 2),
    )

    # 28. jc935-2-2-12-3: y = tanh(ln(3x)), x>0
    y_12_3 = sp.tanh(sp.log(3 * x))
    check_deriv_chain(
        "jc935-2-2-12-3",
        y_12_3,
        [
            1 / (x * sp.cosh(sp.log(3 * x)) ** 2),
        ],
        1 / (x * sp.cosh(sp.log(3 * x)) ** 2),
        pts=[sp.Rational(1, 2), sp.Rational(1, 1), sp.Rational(3, 1)],
    )

    # 29. jc935-2-2-12-4: y = cosh^3(x) + sinh^2(x)
    y_12_4 = sp.cosh(x) ** 3 + sp.sinh(x) ** 2
    check_deriv_chain(
        "jc935-2-2-12-4",
        y_12_4,
        [
            3 * sp.cosh(x) ** 2 * sp.sinh(x) + 2 * sp.sinh(x) * sp.cosh(x),
        ],
        sp.sinh(x) * sp.cosh(x) * (3 * sp.cosh(x) + 2),
    )

    # 30. jc935-2-2-12-5: y = tanh(2 - 3x^2)
    y_12_5 = sp.tanh(2 - 3 * x**2)
    check_deriv_chain(
        "jc935-2-2-12-5",
        y_12_5,
        [
            -6 * x / sp.cosh(2 - 3 * x**2) ** 2,
        ],
        -6 * x / sp.cosh(2 - 3 * x**2) ** 2,
    )

    # 31. jc935-2-2-12-6: y = arsinh(2x^2 + 1)
    y_12_6 = sp.asinh(2 * x**2 + 1)
    check_deriv_chain(
        "jc935-2-2-12-6",
        y_12_6,
        [
            4 * x / sp.sqrt(1 + (2 * x**2 + 1) ** 2),
            4 * x / sp.sqrt(1 + 4 * x**4 + 4 * x**2 + 1),
        ],
        4 * x / sp.sqrt(4 * x**4 + 4 * x**2 + 2),
    )

    # 32. jc935-2-2-12-7: y = arcosh(e^{3x}), x>0
    y_12_7 = sp.acosh(sp.exp(3 * x))
    check_deriv_chain(
        "jc935-2-2-12-7",
        y_12_7,
        [
            1 / sp.sqrt(sp.exp(6 * x) - 1) * 3 * sp.exp(3 * x),
        ],
        3 * sp.exp(3 * x) / sp.sqrt(sp.exp(6 * x) - 1),
        pts=[sp.Rational(1, 5), sp.Rational(1, 2), sp.Rational(1, 1)],
    )

    # 33. jc935-2-2-12-8: y = arctan(tanh(2x))
    y_12_8 = sp.atan(sp.tanh(2 * x))
    check_deriv_chain(
        "jc935-2-2-12-8",
        y_12_8,
        [
            1 / (1 + sp.tanh(2 * x) ** 2) * (2 / sp.cosh(2 * x) ** 2),
            2 / (sp.cosh(2 * x) ** 2 + sp.sinh(2 * x) ** 2),
        ],
        2 / sp.cosh(4 * x),
    )

    # 34. jc935-2-2-12-9: y = ln(cosh(2x)) + 1/(2 cosh^2(2x))
    y_12_9 = sp.log(sp.cosh(2 * x)) + 1 / (2 * sp.cosh(2 * x) ** 2)
    check_deriv_chain(
        "jc935-2-2-12-9",
        y_12_9,
        [
            2 * sp.sinh(2 * x) / sp.cosh(2 * x) - 2 * sp.sinh(2 * x) / sp.cosh(2 * x) ** 3,
            2 * sp.sinh(2 * x) * (sp.cosh(2 * x) ** 2 - 1) / sp.cosh(2 * x) ** 3,
            2 * sp.sinh(2 * x) ** 3 / sp.cosh(2 * x) ** 3,
        ],
        2 * sp.tanh(2 * x) ** 3,
    )

    # 35. jc935-2-2-12-10: y = sinh^2((x-2)/(x+2)), x != -2
    u10 = (x - 2) / (x + 2)
    y_12_10 = sp.sinh(u10) ** 2
    check_deriv_chain(
        "jc935-2-2-12-10",
        y_12_10,
        [
            2 * sp.sinh(u10) * sp.cosh(u10) * (4 / (x + 2) ** 2),
            sp.sinh(2 * u10) * (4 / (x + 2) ** 2),
        ],
        4 / (x + 2) ** 2 * sp.sinh((2 * x - 4) / (x + 2)),
    )

    # 36. jc935-2-2-13 (proof): h(x)=f(x)g(x), f(1)=0, g continuous at 1 => h'(1)=f'(1)g(1)
    # Concrete non-differentiable g example: f(x)=(x-1)(x+2), g(x)=|x-1|+5
    f13 = (x - 1) * (x + 2)
    g13 = sp.Abs(x - 1) + 5
    h13 = f13 * g13
    assert f13.subs(x, 1) == 0 and h13.subs(x, 1) == 0
    dq13 = (h13 - 0) / (x - 1)
    assert sp.simplify(dq13 - ((f13 - 0) / (x - 1)) * g13) == 0
    lim_p = sp.limit(dq13, x, 1, dir="+")
    lim_m = sp.limit(dq13, x, 1, dir="-")
    expected_13 = sp.diff(f13, x).subs(x, 1) * g13.subs(x, 1)
    assert lim_p == expected_13 and lim_m == expected_13

    # 37. jc935-2-2-14 (proof): f(x+y)=2f(x)f(y)
    # Verify f(0)=1/2 and difference quotient identity on concrete solution f(x)=exp(a*x)/2
    a_sym, h_sym = sp.symbols("a h", real=True)
    f14 = sp.exp(a_sym * x) / 2
    assert sp.simplify(f14.subs(x, x + t) - 2 * f14 * f14.subs(x, t)) == 0
    assert f14.subs(x, 0) == sp.Rational(1, 2)
    dq14_lhs = (f14.subs(x, x + h_sym) - f14) / h_sym
    dq14_rhs = 2 * f14 * (f14.subs(x, h_sym) - f14.subs(x, 0)) / h_sym
    assert sp.simplify(dq14_lhs - dq14_rhs) == 0
    assert sp.simplify(sp.limit(dq14_rhs, h_sym, 0) - 2 * f14 * sp.diff(f14, x).subs(x, 0)) == 0

    print("ALL 37 problems in ch2Sec2b passed SymPy step-chain verification!")


if __name__ == "__main__":
    verify_all()
