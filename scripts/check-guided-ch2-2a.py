"""SymPy step-chain verifier for ch2Sec2a guidedHints (jc935-2-2-1-1 .. jc935-2-2-7-9, 37 problems)."""

import sympy as sp

x = sp.Symbol("x", real=True)
xp = sp.Symbol("xp", positive=True)
t = sp.Symbol("t", real=True)
th = sp.Symbol("th", real=True)


def check_deriv_chain(pid: str, var, func, step_exprs: list, expected, test_pts=None):
    """Verify every intermediate derivative expression matches sp.diff(func, var) and expected."""
    true_d = sp.diff(func, var)
    chain = [true_d] + list(step_exprs) + [expected]
    for i in range(1, len(chain)):
        diff_expr = chain[i] - chain[i - 1]
        if test_pts is None:
            s = sp.simplify(sp.trigsimp(diff_expr))
            assert s == 0, f"[{pid}] Step {i-1}->{i} mismatch: {s}"
        else:
            for pt in test_pts:
                exact_pt = sp.Rational(str(pt))
                val = complex(diff_expr.subs(var, exact_pt).evalf(30))
                assert abs(val) < 1e-25, f"[{pid}] Step {i-1}->{i} mismatch at {pt}: {val}"


def verify_all():
    # 1. jc935-2-2-1-1: y = cot(3x+1)
    u1 = 3 * x + 1
    check_deriv_chain(
        "jc935-2-2-1-1",
        x,
        sp.cot(u1),
        [
            ((-sp.sin(u1)) * sp.sin(u1) - sp.cos(u1) * sp.cos(u1)) / sp.sin(u1) ** 2 * 3,
            -(sp.sin(u1) ** 2 + sp.cos(u1) ** 2) / sp.sin(u1) ** 2 * 3,
            (-1 / sp.sin(u1) ** 2) * 3,
            (-sp.csc(u1) ** 2) * 3,
        ],
        -3 * sp.csc(u1) ** 2,
    )

    # 2. jc935-2-2-1-2: y = csc(2x-1)
    u2 = 2 * x - 1
    check_deriv_chain(
        "jc935-2-2-1-2",
        x,
        sp.csc(u2),
        [
            (-sp.cos(u2) / sp.sin(u2) ** 2) * 2,
            (-(1 / sp.sin(u2)) * (sp.cos(u2) / sp.sin(u2))) * 2,
            (-sp.csc(u2) * sp.cot(u2)) * 2,
        ],
        -2 * sp.csc(u2) * sp.cot(u2),
    )

    # 3. jc935-2-2-2-1: y = 2x^4 + 5/x^3 - 4/x + 9
    check_deriv_chain(
        "jc935-2-2-2-1",
        x,
        2 * x**4 + 5 / x**3 - 4 / x + 9,
        [
            2 * 4 * x**3 + 5 * (-3) * x ** (-4) - 4 * (-1) * x ** (-2),
            8 * x**3 - 15 * x ** (-4) + 4 * x ** (-2),
        ],
        8 * x**3 - 15 / x**4 + 4 / x**2,
    )

    # 4. jc935-2-2-2-2: y = 4x^3 - 3^x + 2e^x
    check_deriv_chain(
        "jc935-2-2-2-2",
        x,
        4 * x**3 - 3**x + 2 * sp.exp(x),
        [12 * x**2 - 3**x * sp.log(3) + 2 * sp.exp(x)],
        12 * x**2 - 3**x * sp.log(3) + 2 * sp.exp(x),
    )

    # 5. jc935-2-2-2-3: y = 3tan x - 2sec x + 7
    check_deriv_chain(
        "jc935-2-2-2-3",
        x,
        3 * sp.tan(x) - 2 * sp.sec(x) + 7,
        [3 * sp.sec(x) ** 2 - 2 * sp.sec(x) * sp.tan(x) + 0],
        3 * sp.sec(x) ** 2 - 2 * sp.sec(x) * sp.tan(x),
    )

    # 6. jc935-2-2-2-4: y = 3sin x cos x = (3/2)sin(2x)
    assert sp.simplify(3 * sp.sin(x) * sp.cos(x) - sp.Rational(3, 2) * sp.sin(2 * x)) == 0
    check_deriv_chain(
        "jc935-2-2-2-4",
        x,
        3 * sp.sin(x) * sp.cos(x),
        [sp.Rational(3, 2) * sp.cos(2 * x) * 2],
        3 * sp.cos(2 * x),
    )

    # 7. jc935-2-2-2-5: y = x^3 ln x (x > 0)
    check_deriv_chain(
        "jc935-2-2-2-5",
        xp,
        xp**3 * sp.log(xp),
        [
            3 * xp**2 * sp.log(xp) + xp**3 * (1 / xp),
            3 * xp**2 * sp.log(xp) + xp**2,
        ],
        xp**2 * (3 * sp.log(xp) + 1),
    )

    # 8. jc935-2-2-2-6: y = 2e^x sin x
    check_deriv_chain(
        "jc935-2-2-2-6",
        x,
        2 * sp.exp(x) * sp.sin(x),
        [2 * sp.exp(x) * sp.sin(x) + 2 * sp.exp(x) * sp.cos(x)],
        2 * sp.exp(x) * (sp.sin(x) + sp.cos(x)),
    )

    # 9. jc935-2-2-2-7: y = ln x / x^2 (x > 0)
    check_deriv_chain(
        "jc935-2-2-2-7",
        xp,
        sp.log(xp) / xp**2,
        [
            ((1 / xp) * xp**2 - 2 * xp * sp.log(xp)) / xp**4,
            (xp - 2 * xp * sp.log(xp)) / xp**4,
            xp * (1 - 2 * sp.log(xp)) / xp**4,
        ],
        (1 - 2 * sp.log(xp)) / xp**3,
    )

    # 10. jc935-2-2-2-8: y = e^x / x^3 + ln 5
    check_deriv_chain(
        "jc935-2-2-2-8",
        x,
        sp.exp(x) / x**3 + sp.log(5),
        [
            (sp.exp(x) * x**3 - 3 * x**2 * sp.exp(x)) / x**6,
            x**2 * sp.exp(x) * (x - 3) / x**6,
        ],
        sp.exp(x) * (x - 3) / x**4,
    )

    # 11. jc935-2-2-2-9: y = x ln x sin x (x > 0)
    check_deriv_chain(
        "jc935-2-2-2-9",
        xp,
        xp * sp.log(xp) * sp.sin(xp),
        [
            sp.log(xp) * sp.sin(xp) + xp * (1 / xp) * sp.sin(xp) + xp * sp.log(xp) * sp.cos(xp),
            sp.log(xp) * sp.sin(xp) + sp.sin(xp) + xp * sp.log(xp) * sp.cos(xp),
        ],
        (sp.log(xp) + 1) * sp.sin(xp) + xp * sp.log(xp) * sp.cos(xp),
    )

    # 12. jc935-2-2-2-10: y = (2+sin x)/(2+cos x)
    check_deriv_chain(
        "jc935-2-2-2-10",
        x,
        (2 + sp.sin(x)) / (2 + sp.cos(x)),
        [
            (sp.cos(x) * (2 + sp.cos(x)) + (2 + sp.sin(x)) * sp.sin(x)) / (2 + sp.cos(x)) ** 2,
            (2 * sp.cos(x) + sp.cos(x) ** 2 + 2 * sp.sin(x) + sp.sin(x) ** 2) / (2 + sp.cos(x)) ** 2,
        ],
        (1 + 2 * sp.cos(x) + 2 * sp.sin(x)) / (2 + sp.cos(x)) ** 2,
    )

    # 13. jc935-2-2-3-1: y = 2sin x + cos x at x=0, pi/3
    f31 = 2 * sp.sin(x) + sp.cos(x)
    d31 = 2 * sp.cos(x) - sp.sin(x)
    check_deriv_chain("jc935-2-2-3-1", x, f31, [d31], d31)
    assert sp.simplify(d31.subs(x, 0) - 2) == 0
    assert sp.simplify(d31.subs(x, sp.pi / 3) - (1 - sp.sqrt(3) / 2)) == 0

    # 14. jc935-2-2-3-2: rho = theta sin(theta) + 2cos(theta) at theta = pi/2
    f32 = th * sp.sin(th) + 2 * sp.cos(th)
    d32 = th * sp.cos(th) - sp.sin(th)
    check_deriv_chain(
        "jc935-2-2-3-2",
        th,
        f32,
        [sp.sin(th) + th * sp.cos(th) - 2 * sp.sin(th)],
        d32,
    )
    assert sp.simplify(d32.subs(th, sp.pi / 2) - (-1)) == 0

    # 15. jc935-2-2-3-3: f(x) = 4/(6-x) + x^2/4 at x=0, 2
    f33 = 4 / (6 - x) + x**2 / 4
    d33 = 4 / (6 - x) ** 2 + x / 2
    check_deriv_chain(
        "jc935-2-2-3-3",
        x,
        f33,
        [-4 * (6 - x) ** (-2) * (-1) + x / 2],
        d33,
    )
    assert sp.simplify(d33.subs(x, 0) - sp.Rational(1, 9)) == 0
    assert sp.simplify(d33.subs(x, 2) - sp.Rational(5, 4)) == 0

    # 16. jc935-2-2-4-1: s(t) = 5 + 18t - (9/2)t^2 -> v(t) = 18 - 9t
    s4 = 5 + 18 * t - sp.Rational(9, 2) * t**2
    v4 = 18 - 9 * t
    check_deriv_chain(
        "jc935-2-2-4-1",
        t,
        s4,
        [0 + 18 - sp.Rational(9, 2) * 2 * t],
        v4,
    )

    # 17. jc935-2-2-4-2: highest point of s(t)
    roots = sp.solve(v4, t)
    assert roots == [2], f"jc935-2-2-4-2 root mismatch: {roots}"
    assert v4.subs(t, 1) > 0 and v4.subs(t, 3) < 0
    assert s4.subs(t, 2) == 23 and s4.subs(t, 2) > 0

    # 18. jc935-2-2-5: y = 2x^2 + 3sin x tangent & normal at x=0
    f5 = 2 * x**2 + 3 * sp.sin(x)
    d5 = 4 * x + 3 * sp.cos(x)
    check_deriv_chain("jc935-2-2-5", x, f5, [d5], d5)
    assert f5.subs(x, 0) == 0
    k5 = d5.subs(x, 0)
    assert k5 == 3
    kn5 = -1 / k5
    assert kn5 == sp.Rational(-1, 3)

    # 19. jc935-2-2-6-1: y = (3x-2)^5
    check_deriv_chain(
        "jc935-2-2-6-1",
        x,
        (3 * x - 2) ** 5,
        [5 * (3 * x - 2) ** 4 * 3],
        15 * (3 * x - 2) ** 4,
    )

    # 20. jc935-2-2-6-2: y = cos(5-4x)
    check_deriv_chain(
        "jc935-2-2-6-2",
        x,
        sp.cos(5 - 4 * x),
        [(-sp.sin(5 - 4 * x)) * (-4)],
        4 * sp.sin(5 - 4 * x),
    )

    # 21. jc935-2-2-6-3: y = e^(-4x^2)
    check_deriv_chain(
        "jc935-2-2-6-3",
        x,
        sp.exp(-4 * x**2),
        [sp.exp(-4 * x**2) * (-8 * x)],
        -8 * x * sp.exp(-4 * x**2),
    )

    # 22. jc935-2-2-6-4: y = ln(4+3x^2)
    check_deriv_chain(
        "jc935-2-2-6-4",
        x,
        sp.log(4 + 3 * x**2),
        [1 / (4 + 3 * x**2) * (6 * x)],
        6 * x / (4 + 3 * x**2),
    )

    # 23. jc935-2-2-6-5: y = sin^2(2x)
    check_deriv_chain(
        "jc935-2-2-6-5",
        x,
        sp.sin(2 * x) ** 2,
        [
            2 * sp.sin(2 * x) * sp.cos(2 * x) * 2,
            4 * sp.sin(2 * x) * sp.cos(2 * x),
        ],
        2 * sp.sin(4 * x),
    )

    # 24. jc935-2-2-6-6: y = sqrt(16-4x^2), |x|<2
    check_deriv_chain(
        "jc935-2-2-6-6",
        x,
        sp.sqrt(16 - 4 * x**2),
        [1 / (2 * sp.sqrt(16 - 4 * x**2)) * (-8 * x)],
        -4 * x / sp.sqrt(16 - 4 * x**2),
        test_pts=[-1.5, -0.5, 0, 0.7, 1.8],
    )

    # 25. jc935-2-2-6-7: y = tan(3x^2)
    check_deriv_chain(
        "jc935-2-2-6-7",
        x,
        sp.tan(3 * x**2),
        [sp.sec(3 * x**2) ** 2 * (6 * x)],
        6 * x * sp.sec(3 * x**2) ** 2,
    )

    # 26. jc935-2-2-6-8: y = arctan(e^(2x))
    check_deriv_chain(
        "jc935-2-2-6-8",
        x,
        sp.atan(sp.exp(2 * x)),
        [1 / (1 + sp.exp(4 * x)) * (2 * sp.exp(2 * x))],
        2 * sp.exp(2 * x) / (1 + sp.exp(4 * x)),
    )

    # 27. jc935-2-2-6-9: y = (arcsin x)^3, |x|<1
    check_deriv_chain(
        "jc935-2-2-6-9",
        x,
        sp.asin(x) ** 3,
        [3 * sp.asin(x) ** 2 * (1 / sp.sqrt(1 - x**2))],
        3 * sp.asin(x) ** 2 / sp.sqrt(1 - x**2),
        test_pts=[-0.8, -0.3, 0, 0.4, 0.9],
    )

    # 28. jc935-2-2-6-10: y = ln(cos(3x)), cos(3x)>0
    check_deriv_chain(
        "jc935-2-2-6-10",
        x,
        sp.log(sp.cos(3 * x)),
        [
            1 / sp.cos(3 * x) * (-sp.sin(3 * x)) * 3,
            -3 * sp.sin(3 * x) / sp.cos(3 * x),
        ],
        -3 * sp.tan(3 * x),
        test_pts=[-0.4, -0.1, 0, 0.2, 0.45],
    )

    # 29. jc935-2-2-7-1: y = arcsin(2-3x), 1/3<x<1
    check_deriv_chain(
        "jc935-2-2-7-1",
        x,
        sp.asin(2 - 3 * x),
        [1 / sp.sqrt(1 - (2 - 3 * x) ** 2) * (-3)],
        -3 / sp.sqrt(1 - (2 - 3 * x) ** 2),
        test_pts=[0.4, 0.5, 0.65, 0.8, 0.95],
    )

    # 30. jc935-2-2-7-2: y = 1/sqrt(9-x^2), |x|<3
    check_deriv_chain(
        "jc935-2-2-7-2",
        x,
        1 / sp.sqrt(9 - x**2),
        [-sp.Rational(1, 2) * (9 - x**2) ** sp.Rational(-3, 2) * (-2 * x)],
        x / (9 - x**2) ** sp.Rational(3, 2),
        test_pts=[-2.5, -1.0, 0, 1.2, 2.7],
    )

    # 31. jc935-2-2-7-3: y = e^(-x/3) cos(2x)
    check_deriv_chain(
        "jc935-2-2-7-3",
        x,
        sp.exp(-x / 3) * sp.cos(2 * x),
        [-sp.Rational(1, 3) * sp.exp(-x / 3) * sp.cos(2 * x) - 2 * sp.exp(-x / 3) * sp.sin(2 * x)],
        -sp.exp(-x / 3) * (sp.Rational(1, 3) * sp.cos(2 * x) + 2 * sp.sin(2 * x)),
    )

    # 32. jc935-2-2-7-4: y = arccos(2/x), |x|>2 (must hold for both x>2 and x<-2!)
    check_deriv_chain(
        "jc935-2-2-7-4",
        x,
        sp.acos(2 / x),
        [
            (-1 / sp.sqrt(1 - 4 / x**2)) * (-2 / x**2),
            2 / (x**2 * sp.sqrt(1 - 4 / x**2)),
            2 * sp.Abs(x) / (x**2 * sp.sqrt(x**2 - 4)),
        ],
        2 / (sp.Abs(x) * sp.sqrt(x**2 - 4)),
        test_pts=[-10.0, -5.0, -2.5, 2.5, 5.0, 10.0],
    )

    # 33. jc935-2-2-7-5: y = (2-ln x)/(2+ln x), x>0, x!=e^-2
    u75 = sp.log(xp)
    check_deriv_chain(
        "jc935-2-2-7-5",
        xp,
        (2 - u75) / (2 + u75),
        [
            (-(2 + u75) - (2 - u75)) / (2 + u75) ** 2 * (1 / xp),
            -4 / (2 + u75) ** 2 * (1 / xp),
        ],
        -4 / (xp * (2 + u75) ** 2),
    )

    # 34. jc935-2-2-7-6: y = sin(3x)/x, x!=0
    check_deriv_chain(
        "jc935-2-2-7-6",
        x,
        sp.sin(3 * x) / x,
        [(3 * sp.cos(3 * x) * x - sp.sin(3 * x) * 1) / x**2],
        (3 * x * sp.cos(3 * x) - sp.sin(3 * x)) / x**2,
    )

    # 35. jc935-2-2-7-7: y = arcsin(sqrt(x/2)), 0<x<2
    check_deriv_chain(
        "jc935-2-2-7-7",
        x,
        sp.asin(sp.sqrt(x / 2)),
        [
            1 / sp.sqrt(1 - x / 2) * (1 / (2 * sp.sqrt(2 * x))),
            1 / (2 * sp.sqrt(2 * x * (1 - x / 2))),
        ],
        1 / (2 * sp.sqrt(x * (2 - x))),
        test_pts=[0.1, 0.5, 1.0, 1.5, 1.9],
    )

    # 36. jc935-2-2-7-8: y = ln(2x + sqrt(9+4x^2))
    v78 = sp.sqrt(9 + 4 * x**2)
    check_deriv_chain(
        "jc935-2-2-7-8",
        x,
        sp.log(2 * x + v78),
        [
            (2 + 4 * x / v78) / (2 * x + v78),
            (2 * (v78 + 2 * x) / v78) / (2 * x + v78),
        ],
        2 / v78,
        test_pts=[-3.0, -1.0, 0.0, 1.5, 4.0],
    )

    # 37. jc935-2-2-7-9: y = ln(sec(2x) + tan(2x)), sec(2x)+tan(2x)>0
    u79 = 2 * x
    check_deriv_chain(
        "jc935-2-2-7-9",
        x,
        sp.log(sp.sec(u79) + sp.tan(u79)),
        [
            (sp.sec(u79) * sp.tan(u79) + sp.sec(u79) ** 2) / (sp.sec(u79) + sp.tan(u79)) * 2,
            sp.sec(u79) * (sp.tan(u79) + sp.sec(u79)) / (sp.sec(u79) + sp.tan(u79)) * 2,
            sp.sec(u79) * 2,
        ],
        2 * sp.sec(u79),
        test_pts=[-0.5, -0.2, 0.0, 0.3, 0.6],
    )

    print("ALL 37 problems in ch2Sec2a verified successfully!")


if __name__ == "__main__":
    verify_all()
