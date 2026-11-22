"""SymPy step-chain verifier for ch2Sec3to4 guidedHints (jc935-2-3-* & jc935-2-4-*, 56 problems)."""

import sympy as sp

x = sp.Symbol("x", real=True)
xp = sp.Symbol("xp", positive=True)
t = sp.Symbol("t", real=True)
tp = sp.Symbol("tp", positive=True)
th = sp.Symbol("th", real=True)
b = sp.Symbol("b", positive=True)
p = sp.Symbol("p", positive=True)
q = sp.Symbol("q", positive=True)
k_sym = sp.Symbol("k", real=True, nonzero=True)
B_sym, omega, phi = sp.symbols("B omega phi", real=True)


def check_eq(pid: str, label: str, lhs, rhs, var=None, test_pts=None):
    diff_expr = lhs - rhs
    if test_pts is None:
        s = sp.simplify(sp.trigsimp(diff_expr))
        assert s == 0, f"[{pid}] {label} mismatch: {s}"
    else:
        for pt in test_pts:
            val = abs(diff_expr.subs(var, sp.Rational(str(pt))).evalf(30))
            assert val < 1e-12, f"[{pid}] {label} mismatch at {pt}: {val}"


def check_chain(pid: str, step_exprs: list, expected, var=None, test_pts=None):
    chain = list(step_exprs) + [expected]
    for i in range(1, len(chain)):
        check_eq(pid, f"step {i-1}->{i}", chain[i], chain[i - 1], var=var, test_pts=test_pts)


def verify_sec3():
    # 1. jc935-2-3-1-1: y = 3x^3 - 2 ln x (x > 0)
    y = 3 * xp**3 - 2 * sp.log(xp)
    check_chain("jc935-2-3-1-1-d1", [sp.diff(y, xp), 9 * xp**2 - 2 / xp], 9 * xp**2 - 2 * xp**(-1))
    check_chain("jc935-2-3-1-1-d2", [sp.diff(y, xp, 2), 18 * xp - 2 * (-1) * xp**(-2), 18 * xp + 2 * xp**(-2)], 18 * xp + 2 / xp**2)

    # 2. jc935-2-3-1-2: y = e^(3x+2)
    y = sp.exp(3 * x + 2)
    check_eq("jc935-2-3-1-2-d1", "y'", sp.diff(y, x), 3 * sp.exp(3 * x + 2))
    check_chain("jc935-2-3-1-2-d2", [sp.diff(y, x, 2), 3 * 3 * sp.exp(3 * x + 2)], 9 * sp.exp(3 * x + 2))

    # 3. jc935-2-3-1-3: y = 2x sin x
    y = 2 * x * sp.sin(x)
    check_eq("jc935-2-3-1-3-d1", "y'", sp.diff(y, x), 2 * sp.sin(x) + 2 * x * sp.cos(x))
    check_chain("jc935-2-3-1-3-d2", [sp.diff(y, x, 2), 2 * sp.cos(x) + (2 * sp.cos(x) - 2 * x * sp.sin(x))], 4 * sp.cos(x) - 2 * x * sp.sin(x))

    # 4. jc935-2-3-1-4: y = e^(2t) cos(2t)
    y = sp.exp(2 * t) * sp.cos(2 * t)
    check_chain("jc935-2-3-1-4-d1", [sp.diff(y, t), 2 * sp.exp(2 * t) * sp.cos(2 * t) - 2 * sp.exp(2 * t) * sp.sin(2 * t)], 2 * sp.exp(2 * t) * (sp.cos(2 * t) - sp.sin(2 * t)))
    check_chain(
        "jc935-2-3-1-4-d2",
        [
            sp.diff(y, t, 2),
            4 * sp.exp(2 * t) * (sp.cos(2 * t) - sp.sin(2 * t)) + 2 * sp.exp(2 * t) * (-2 * sp.sin(2 * t) - 2 * sp.cos(2 * t)),
            4 * sp.exp(2 * t) * ((sp.cos(2 * t) - sp.sin(2 * t)) - (sp.sin(2 * t) + sp.cos(2 * t))),
        ],
        -8 * sp.exp(2 * t) * sp.sin(2 * t),
    )

    # 5. jc935-2-3-1-5: y = sqrt(b^2 + x^2)
    y = sp.sqrt(b**2 + x**2)
    check_eq("jc935-2-3-1-5-d1", "y'", sp.diff(y, x), x / sp.sqrt(b**2 + x**2))
    check_chain(
        "jc935-2-3-1-5-d2",
        [
            sp.diff(y, x, 2),
            (sp.sqrt(b**2 + x**2) - x**2 / sp.sqrt(b**2 + x**2)) / (b**2 + x**2),
            ((b**2 + x**2) - x**2) / ((b**2 + x**2) * sp.sqrt(b**2 + x**2)),
        ],
        b**2 / (b**2 + x**2) ** sp.Rational(3, 2),
    )

    # 6. jc935-2-3-1-6: y = ln(x^2 + 3)
    y = sp.log(x**2 + 3)
    check_eq("jc935-2-3-1-6-d1", "y'", sp.diff(y, x), 2 * x / (x**2 + 3))
    check_chain(
        "jc935-2-3-1-6-d2",
        [
            sp.diff(y, x, 2),
            (2 * (x**2 + 3) - 2 * x * 2 * x) / (x**2 + 3) ** 2,
            (6 - 2 * x**2) / (x**2 + 3) ** 2,
        ],
        2 * (3 - x**2) / (x**2 + 3) ** 2,
    )

    # 7. jc935-2-3-1-7: y = cot(2x)
    y = sp.cot(2 * x)
    check_eq("jc935-2-3-1-7-d1", "y'", sp.diff(y, x), -2 * sp.csc(2 * x) ** 2)
    check_chain(
        "jc935-2-3-1-7-d2",
        [sp.diff(y, x, 2), -4 * sp.csc(2 * x) * (-2 * sp.csc(2 * x) * sp.cot(2 * x))],
        8 * sp.csc(2 * x) ** 2 * sp.cot(2 * x),
    )

    # 8. jc935-2-3-1-8: y = 1/(x^3 + 2)
    y = 1 / (x**3 + 2)
    check_eq("jc935-2-3-1-8-d1", "y'", sp.diff(y, x), -3 * x**2 / (x**3 + 2) ** 2)
    check_chain(
        "jc935-2-3-1-8-d2",
        [
            sp.diff(y, x, 2),
            (-6 * x * (x**3 + 2) ** 2 + 3 * x**2 * 2 * (x**3 + 2) * 3 * x**2) / (x**3 + 2) ** 4,
            (-6 * x * (x**3 + 2) + 18 * x**4) / (x**3 + 2) ** 3,
            (12 * x**4 - 12 * x) / (x**3 + 2) ** 3,
        ],
        12 * x * (x**3 - 1) / (x**3 + 2) ** 3,
    )

    # 9. jc935-2-3-1-9: y = (1 + 4x^2) arctan(2x)
    y = (1 + 4 * x**2) * sp.atan(2 * x)
    check_chain("jc935-2-3-1-9-d1", [sp.diff(y, x), 8 * x * sp.atan(2 * x) + (1 + 4 * x**2) * 2 / (1 + 4 * x**2)], 8 * x * sp.atan(2 * x) + 2)
    check_chain("jc935-2-3-1-9-d2", [sp.diff(y, x, 2), 8 * sp.atan(2 * x) + 8 * x * 2 / (1 + 4 * x**2)], 8 * sp.atan(2 * x) + 16 * x / (1 + 4 * x**2))

    # 10. jc935-2-3-1-10: y = e^(2x)/x
    y = sp.exp(2 * x) / x
    check_eq("jc935-2-3-1-10-d1", "y'", sp.diff(y, x), (2 * x - 1) * sp.exp(2 * x) / x**2)
    check_eq("jc935-2-3-1-10-num", "num'", sp.diff((2 * x - 1) * sp.exp(2 * x), x), 4 * x * sp.exp(2 * x))
    check_chain(
        "jc935-2-3-1-10-d2",
        [
            sp.diff(y, x, 2),
            (4 * x * sp.exp(2 * x) * x**2 - (2 * x - 1) * sp.exp(2 * x) * 2 * x) / x**4,
            sp.exp(2 * x) * (4 * x**2 - 2 * (2 * x - 1)) / x**3,
        ],
        2 * sp.exp(2 * x) * (2 * x**2 - 2 * x + 1) / x**3,
    )

    # 11. jc935-2-3-1-11: y = x e^(-x^2)
    y = x * sp.exp(-(x**2))
    check_eq("jc935-2-3-1-11-d1", "y'", sp.diff(y, x), (1 - 2 * x**2) * sp.exp(-(x**2)))
    check_chain(
        "jc935-2-3-1-11-d2",
        [
            sp.diff(y, x, 2),
            (-4 * x) * sp.exp(-(x**2)) + (1 - 2 * x**2) * (-2 * x) * sp.exp(-(x**2)),
            (4 * x**3 - 6 * x) * sp.exp(-(x**2)),
        ],
        2 * x * (2 * x**2 - 3) * sp.exp(-(x**2)),
    )

    # 12. jc935-2-3-1-12: y = ln(x + sqrt(x^2 + 4))
    y = sp.log(x + sp.sqrt(x**2 + 4))
    check_chain(
        "jc935-2-3-1-12-d1",
        [sp.diff(y, x), (1 + x / sp.sqrt(x**2 + 4)) / (x + sp.sqrt(x**2 + 4))],
        1 / sp.sqrt(x**2 + 4),
    )
    check_chain(
        "jc935-2-3-1-12-d2",
        [sp.diff(y, x, 2), -sp.Rational(1, 2) * (x**2 + 4) ** sp.Rational(-3, 2) * 2 * x],
        -x / (x**2 + 4) ** sp.Rational(3, 2),
    )

    # 13. jc935-2-3-2: f(x) = (2x - 5)^5, f'''(4)
    f = (2 * x - 5) ** 5
    check_eq("jc935-2-3-2-d1", "f'", sp.diff(f, x), 10 * (2 * x - 5) ** 4)
    check_eq("jc935-2-3-2-d2", "f''", sp.diff(f, x, 2), 80 * (2 * x - 5) ** 3)
    check_eq("jc935-2-3-2-d3", "f'''", sp.diff(f, x, 3), 480 * (2 * x - 5) ** 2)
    assert sp.diff(f, x, 3).subs(x, 4) == 4320

    # 14. jc935-2-3-3-1: y = f(x^3)
    F = sp.Function("F")
    u_sym = sp.Symbol("u", real=True)
    y = F(x**3)
    check_eq(
        "jc935-2-3-3-1-d1",
        "y'",
        sp.diff(y, x),
        3 * x**2 * sp.Subs(sp.Derivative(F(u_sym), u_sym), u_sym, x**3),
    )
    check_eq(
        "jc935-2-3-3-1-d2",
        "y''",
        sp.diff(y, x, 2),
        6 * x * sp.Subs(sp.Derivative(F(u_sym), u_sym), u_sym, x**3)
        + 9 * x**4 * sp.Subs(sp.Derivative(F(u_sym), (u_sym, 2)), u_sym, x**3),
    )

    # 15. jc935-2-3-3-2: y = e^(f(x))
    y = sp.exp(F(x))
    check_eq("jc935-2-3-3-2-d1", "y'", sp.diff(y, x), sp.exp(F(x)) * sp.diff(F(x), x))
    check_eq(
        "jc935-2-3-3-2-d2",
        "y''",
        sp.diff(y, x, 2),
        sp.exp(F(x)) * (sp.diff(F(x), x, 2) + sp.diff(F(x), x) ** 2),
    )

    # 16. jc935-2-3-4-1: inverse 2nd derivative + u = t^3 + 2t at t=1
    G = sp.Function("G")
    d1_inv = 1 / sp.diff(G(t), t)
    d2_inv = sp.diff(d1_inv, t) * d1_inv
    check_eq("jc935-2-3-4-1-f", "d2t/du2", d2_inv, -sp.diff(G(t), t, 2) / sp.diff(G(t), t) ** 3)
    g1 = t**3 + 2 * t
    assert (-sp.diff(g1, t, 2) / sp.diff(g1, t) ** 3).subs(t, 1) == sp.Rational(-6, 125)

    # 17. jc935-2-3-4-2: inverse 3rd derivative + u = e^t + t at t=0
    d3_inv = sp.diff(d2_inv, t) * d1_inv
    expected_d3 = (3 * sp.diff(G(t), t, 2) ** 2 - sp.diff(G(t), t) * sp.diff(G(t), t, 3)) / sp.diff(G(t), t) ** 5
    check_eq("jc935-2-3-4-2-f", "d3t/du3", d3_inv, expected_d3)
    g2 = sp.exp(t) + t
    val_d3 = ((3 * sp.diff(g2, t, 2) ** 2 - sp.diff(g2, t) * sp.diff(g2, t, 3)) / sp.diff(g2, t) ** 5).subs(t, 0)
    assert val_d3 == sp.Rational(1, 32)

    # 18. jc935-2-3-5: x(t) = B cos(omega t + phi)
    xt = B_sym * sp.cos(omega * t + phi)
    check_eq("jc935-2-3-5-v", "v", sp.diff(xt, t), -B_sym * omega * sp.sin(omega * t + phi))
    check_eq("jc935-2-3-5-a", "a", sp.diff(xt, t, 2), -B_sym * omega**2 * sp.cos(omega * t + phi))
    check_eq("jc935-2-3-5-ode", "ode", sp.diff(xt, t, 2) + omega**2 * xt, 0)

    # 19. jc935-2-3-6: dh/dt = k/h
    h_sym = sp.Symbol("h", positive=True)
    v_h = k_sym / h_sym
    a_h = sp.diff(v_h, h_sym) * v_h
    check_eq("jc935-2-3-6", "a", a_h, -(k_sym**2) / h_sym**3)

    # 20. jc935-2-3-7: ds/dt = [g(s)]^2
    s_sym = sp.Symbol("s", real=True)
    v_s = G(s_sym) ** 2
    a_s = sp.diff(v_s, s_sym) * v_s
    check_eq("jc935-2-3-7", "a", a_s, 2 * G(s_sym) ** 3 * sp.diff(G(s_sym), s_sym))

    # 21. jc935-2-3-8: piecewise C^2 at x=0
    fl = sp.exp(2 * x) + sp.sin(x)
    c_val = fl.subs(x, 0)
    b_val = sp.limit((fl - c_val) / x, x, 0, "-")
    a_val = sp.limit((sp.diff(fl, x) - b_val) / x, x, 0, "-") / 2
    assert (a_val, b_val, c_val) == (2, 3, 1)

    # 22. jc935-2-3-9-1: y = e^(2x) sin x, y^(4)
    y = sp.exp(2 * x) * sp.sin(x)
    check_chain(
        "jc935-2-3-9-1",
        [
            sp.diff(y, x, 4),
            sp.exp(2 * x) * (16 * sp.sin(x) + 32 * sp.cos(x) - 24 * sp.sin(x) - 8 * sp.cos(x) + sp.sin(x)),
        ],
        sp.exp(2 * x) * (24 * sp.cos(x) - 7 * sp.sin(x)),
    )

    # 23. jc935-2-3-9-2: y = x^2 cos(3x), y^(20)
    y = x**2 * sp.cos(3 * x)
    expected_20 = 3**18 * (9 * x**2 - 380) * sp.cos(3 * x) + 120 * 3**18 * x * sp.sin(3 * x)
    check_eq("jc935-2-3-9-2", "y^(20)", sp.diff(y, x, 20), expected_20)

    # 24. jc935-2-3-10-1: y = (2x+1)^n + lower degree
    for n in range(1, 6):
        y_n = (2 * x + 1) ** n + 7 * x ** (n - 1) - 3
        assert sp.diff(y_n, x, n) == 2**n * sp.factorial(n)

    # 25. jc935-2-3-10-2: y = cos^2(2x)
    y = sp.cos(2 * x) ** 2
    check_eq("jc935-2-3-10-2-id", "reduce", y, (1 + sp.cos(4 * x)) / 2)
    for n in range(1, 7):
        check_eq("jc935-2-3-10-2", f"n={n}", sp.diff(y, x, n), 2 ** (2 * n - 1) * sp.cos(4 * x + n * sp.pi / 2))

    # 26. jc935-2-3-10-3: y = (2x-1) ln(2x-1) (x > 1/2)
    u_pos = sp.Symbol("u", positive=True)
    y_u = (2 * x - 1) * sp.log(2 * x - 1)
    check_eq("jc935-2-3-10-3-d1", "y'", sp.diff(y_u, x), 2 * sp.log(2 * x - 1) + 2)
    check_eq("jc935-2-3-10-3-d2", "y''", sp.diff(y_u, x, 2), 4 / (2 * x - 1))
    for n in range(2, 7):
        expected_n = (-1) ** n * 2**n * sp.factorial(n - 2) / (2 * x - 1) ** (n - 1)
        check_eq("jc935-2-3-10-3", f"n={n}", sp.diff(y_u, x, n), expected_n)

    # 27. jc935-2-3-10-4: y = x e^(3x)
    y = x * sp.exp(3 * x)
    for n in range(1, 7):
        check_eq("jc935-2-3-10-4", f"n={n}", sp.diff(y, x, n), 3 ** (n - 1) * (3 * x + n) * sp.exp(3 * x))

    # 28. jc935-2-3-11: f(x) = x^2 ln(1+2x), f^(n)(0) for n>=3
    f = x**2 * sp.log(1 + 2 * x)
    for n in range(3, 8):
        expected_val = (-1) ** (n - 1) * 2 ** (n - 2) * sp.factorial(n) / (n - 2)
        assert sp.diff(f, x, n).subs(x, 0) == expected_val


def verify_sec4():
    y_sym = sp.Symbol("y", real=True)
    yp = sp.Symbol("yp", real=True)
    ypp = sp.Symbol("ypp", real=True)
    Y = sp.Function("Y")

    def implicit_d1(eq_expr):
        d_eq = sp.diff(eq_expr.subs(y_sym, Y(x)), x).subs({sp.diff(Y(x), x): yp, Y(x): y_sym})
        return sp.solve(d_eq, yp)[0]

    def implicit_d2(eq_expr, d1_expr):
        d2_eq = sp.diff(eq_expr.subs(y_sym, Y(x)), x, 2).subs(
            {sp.diff(Y(x), x, 2): ypp, sp.diff(Y(x), x): d1_expr, Y(x): y_sym}
        )
        return sp.solve(d2_eq, ypp)[0]

    # 29. jc935-2-4-1-1: y^2 - 4xy + 5 = 0
    check_eq("jc935-2-4-1-1", "dy/dx", implicit_d1(y_sym**2 - 4 * x * y_sym + 5), 2 * y_sym / (y_sym - 2 * x))

    # 30. jc935-2-4-1-2: x^3 + y^3 - 6bxy = 0
    check_eq("jc935-2-4-1-2", "dy/dx", implicit_d1(x**3 + y_sym**3 - 6 * b * x * y_sym), (2 * b * y_sym - x**2) / (y_sym**2 - 2 * b * x))

    # 31. jc935-2-4-1-3: xy - e^(2x+y) = 0
    check_eq("jc935-2-4-1-3", "dy/dx", implicit_d1(x * y_sym - sp.exp(2 * x + y_sym)), (2 * sp.exp(2 * x + y_sym) - y_sym) / (x - sp.exp(2 * x + y_sym)))

    # 32. jc935-2-4-1-4: y - 2 + x e^(2y) = 0
    check_eq("jc935-2-4-1-4", "dy/dx", implicit_d1(y_sym - 2 + x * sp.exp(2 * y_sym)), -sp.exp(2 * y_sym) / (1 + 2 * x * sp.exp(2 * y_sym)))

    # 33. jc935-2-4-2: x^(2/3) + y^(2/3) = 5 b^(2/3) at (8b, b)
    yp_ast = implicit_d1(x ** sp.Rational(2, 3) + y_sym ** sp.Rational(2, 3) - 5 * b ** sp.Rational(2, 3))
    k_tan = sp.simplify(yp_ast.subs({x: 8 * b, y_sym: b}))
    assert k_tan == sp.Rational(-1, 2)
    assert sp.simplify((y_sym - b) - k_tan * (x - 8 * b) - (x + 2 * y_sym - 10 * b) / 2) == 0
    assert sp.simplify((y_sym - b) - (-1 / k_tan) * (x - 8 * b) + (2 * x - y_sym - 15 * b)) == 0

    # 34. jc935-2-4-3: x^2 y + x y^2 = 16
    eq3 = x**2 * y_sym + x * y_sym**2 - 16
    d1_3 = implicit_d1(eq3)
    check_eq("jc935-2-4-3-d1", "dy/dx", d1_3, -y_sym * (2 * x + y_sym) / (x * (x + 2 * y_sym)))
    assert eq3.subs({x: 2, y_sym: -4}) == 0 and d1_3.subs({x: 2, y_sym: -4}) == 0
    assert eq3.subs({x: -4, y_sym: 2}) == 0 and (1 / d1_3).subs({x: -4, y_sym: 2}) == 0

    # 35. jc935-2-4-4-1: q^2 y^2 - p^2 x^2 = p^2 q^2
    eq41 = q**2 * y_sym**2 - p**2 * x**2 - p**2 * q**2
    d1_41 = implicit_d1(eq41)
    check_eq("jc935-2-4-4-1-d1", "y'", d1_41, p**2 * x / (q**2 * y_sym))
    d2_41 = implicit_d2(eq41, d1_41)
    check_eq("jc935-2-4-4-1-d2", "y''", d2_41.subs(x**2, (q**2 * y_sym**2 - p**2 * q**2) / p**2), p**4 / (q**2 * y_sym**3))

    # 36. jc935-2-4-4-2: y = tan(x - y)
    d1_42 = (1 + y_sym**2) / (2 + y_sym**2)
    check_eq("jc935-2-4-4-2-d1", "y'", d1_42, 1 - 1 / (2 + y_sym**2))
    d2_42 = sp.diff(d1_42, y_sym) * d1_42
    check_eq("jc935-2-4-4-2-d2", "y''", d2_42, 2 * y_sym * (1 + y_sym**2) / (2 + y_sym**2) ** 3)

    # 37. jc935-2-4-4-3: y = 2 - x e^y
    eq43 = y_sym - 2 + x * sp.exp(y_sym)
    d1_43 = implicit_d1(eq43)
    check_eq("jc935-2-4-4-3-d1", "y'", d1_43, -sp.exp(y_sym) / (1 + x * sp.exp(y_sym)))
    d2_43 = implicit_d2(eq43, d1_43)
    check_eq("jc935-2-4-4-3-d2", "y''", d2_43, sp.exp(2 * y_sym) * (2 + x * sp.exp(y_sym)) / (1 + x * sp.exp(y_sym)) ** 3)

    # 38. jc935-2-4-4-4: 2y - x = (x + y) ln(x + y)
    eq44 = 2 * y_sym - x - (x + y_sym) * sp.log(x + y_sym)
    d1_44 = implicit_d1(eq44)
    check_eq("jc935-2-4-4-4-d1", "y'", d1_44, (sp.log(x + y_sym) + 2) / (1 - sp.log(x + y_sym)))
    check_eq("jc935-2-4-4-4-1py", "1+y'", 1 + d1_44, 3 / (1 - sp.log(x + y_sym)))
    d2_44 = implicit_d2(eq44, d1_44)
    check_eq("jc935-2-4-4-4-d2", "y''", d2_44, 9 / ((x + y_sym) * (1 - sp.log(x + y_sym)) ** 3))

    # 39. jc935-2-4-5-1: y = (x/(x+2))^x (x > 0)
    y51 = (xp / (xp + 2)) ** xp
    check_eq("jc935-2-4-5-1", "y'", sp.diff(y51, xp), y51 * (sp.log(xp / (xp + 2)) + 2 / (xp + 2)))

    # 40. jc935-2-4-5-2: y = ((x-2)/(x^2+3)^(1/4))^(1/3) (x > 2)
    y52 = (x - 2) ** sp.Rational(1, 3) * (x**2 + 3) ** sp.Rational(-1, 12)
    check_eq("jc935-2-4-5-2", "y'", sp.diff(y52, x), y52 * (1 / (3 * (x - 2)) - x / (6 * (x**2 + 3))), var=x, test_pts=[3, 5, 10])

    # 41. jc935-2-4-5-3: y = sqrt(x+3)(4-x)^3/(x+2)^4 (-2 < x < 4)
    y53 = sp.sqrt(x + 3) * (4 - x) ** 3 / (x + 2) ** 4
    check_eq("jc935-2-4-5-3", "y'", sp.diff(y53, x), y53 * (1 / (2 * (x + 3)) - 3 / (4 - x) - 4 / (x + 2)), var=x, test_pts=[-1, 0, 2])

    # 42. jc935-2-4-5-4: y = sqrt(x cos x sqrt(1 + e^(2x))) (0 < x < pi/2)
    y54 = sp.sqrt(x * sp.cos(x) * sp.sqrt(1 + sp.exp(2 * x)))
    check_eq("jc935-2-4-5-4", "y'", sp.diff(y54, x), sp.Rational(1, 2) * y54 * (1 / x - sp.tan(x) + sp.exp(2 * x) / (1 + sp.exp(2 * x))), var=x, test_pts=[0.3, 0.8, 1.2])

    # 43. jc935-2-4-6-1: x = p t^3, y = q t^4
    check_eq("jc935-2-4-6-1", "dy/dx", sp.diff(q * t**4, t) / sp.diff(p * t**3, t), 4 * q * t / (3 * p))

    # 44. jc935-2-4-6-2: x = th(1 + cos th), y = th sin th
    check_eq(
        "jc935-2-4-6-2",
        "dy/dx",
        sp.diff(th * sp.sin(th), th) / sp.diff(th * (1 + sp.cos(th)), th),
        (sp.sin(th) + th * sp.cos(th)) / (1 + sp.cos(th) - th * sp.sin(th)),
    )

    # 45. jc935-2-4-7: x = e^(2t) cos t, y = e^(2t) sin t at t=pi/4
    d1_7 = sp.diff(sp.exp(2 * t) * sp.sin(t), t) / sp.diff(sp.exp(2 * t) * sp.cos(t), t)
    check_eq("jc935-2-4-7-d1", "dy/dx", d1_7, (2 * sp.sin(t) + sp.cos(t)) / (2 * sp.cos(t) - sp.sin(t)))
    assert sp.simplify(d1_7.subs(t, sp.pi / 4)) == 3

    # 46. jc935-2-4-8-1: x = 2 cos t, y = 2 sin 2t at t = pi/6
    x81, y81 = 2 * sp.cos(t), 2 * sp.sin(2 * t)
    assert x81.subs(t, sp.pi / 6) == sp.sqrt(3) and y81.subs(t, sp.pi / 6) == sp.sqrt(3)
    k81 = sp.simplify((sp.diff(y81, t) / sp.diff(x81, t)).subs(t, sp.pi / 6))
    assert k81 == -2
    assert sp.simplify((y_sym - sp.sqrt(3)) - k81 * (x - sp.sqrt(3)) - (2 * x + y_sym - 3 * sp.sqrt(3))) == 0
    assert sp.simplify(2 * ((y_sym - sp.sqrt(3)) - (-1 / k81) * (x - sp.sqrt(3))) + (x - 2 * y_sym + sp.sqrt(3))) == 0

    # 47. jc935-2-4-8-2: x = 9bt/(1+t^3), y = 9bt^2/(1+t^3) at t = 2
    x82, y82 = 9 * b * t / (1 + t**3), 9 * b * t**2 / (1 + t**3)
    assert x82.subs(t, 2) == 2 * b and y82.subs(t, 2) == 4 * b
    d1_82 = sp.diff(y82, t) / sp.diff(x82, t)
    check_eq("jc935-2-4-8-2-d1", "dy/dx", d1_82, (2 * t - t**4) / (1 - 2 * t**3))
    k82 = sp.simplify(d1_82.subs(t, 2))
    assert k82 == sp.Rational(4, 5)
    assert sp.simplify(5 * ((y_sym - 4 * b) - k82 * (x - 2 * b)) + (4 * x - 5 * y_sym + 12 * b)) == 0
    assert sp.simplify(4 * ((y_sym - 4 * b) - (-1 / k82) * (x - 2 * b)) - (5 * x + 4 * y_sym - 26 * b)) == 0

    # 48. jc935-2-4-9-1: x = t^2/3, y = 2t + 5
    x91, y91 = t**2 / 3, 2 * t + 5
    d1_91 = sp.diff(y91, t) / sp.diff(x91, t)
    d2_91 = sp.diff(d1_91, t) / sp.diff(x91, t)
    check_eq("jc935-2-4-9-1-d1", "d1", d1_91, 3 / t)
    check_eq("jc935-2-4-9-1-d2", "d2", d2_91, -9 / (2 * t**3))

    # 49. jc935-2-4-9-2: x = p sin t, y = q cos t
    x92, y92 = p * sp.sin(t), q * sp.cos(t)
    d1_92 = sp.diff(y92, t) / sp.diff(x92, t)
    d2_92 = sp.diff(d1_92, t) / sp.diff(x92, t)
    check_eq("jc935-2-4-9-2-d1", "d1", d1_92, -q * sp.tan(t) / p)
    check_eq("jc935-2-4-9-2-d2", "d2", d2_92, -q / (p**2 * sp.cos(t) ** 3))

    # 50. jc935-2-4-9-3: x = 2 e^(2t), y = 5 e^(-t)
    x93, y93 = 2 * sp.exp(2 * t), 5 * sp.exp(-t)
    d1_93 = sp.diff(y93, t) / sp.diff(x93, t)
    d2_93 = sp.diff(d1_93, t) / sp.diff(x93, t)
    check_eq("jc935-2-4-9-3-d1", "d1", d1_93, sp.Rational(-5, 4) * sp.exp(-3 * t))
    check_eq("jc935-2-4-9-3-d2", "d2", d2_93, sp.Rational(15, 16) * sp.exp(-5 * t))

    # 51. jc935-2-4-9-4: x = 3 g'(t), y = 2t g'(t) - 2 g(t) + 1
    G = sp.Function("G")
    x94, y94 = 3 * sp.diff(G(t), t), 2 * t * sp.diff(G(t), t) - 2 * G(t) + 1
    d1_94 = sp.simplify(sp.diff(y94, t) / sp.diff(x94, t))
    d2_94 = sp.simplify(sp.diff(d1_94, t) / sp.diff(x94, t))
    check_eq("jc935-2-4-9-4-d1", "d1", d1_94, sp.Rational(2, 3) * t)
    check_eq("jc935-2-4-9-4-d2", "d2", d2_94, 2 / (9 * sp.diff(G(t), t, 2)))

    # 52. jc935-2-4-10-1: x = t^2 + 2, y = t^3 + 3t
    x101, y101 = t**2 + 2, t**3 + 3 * t
    d1_101 = sp.diff(y101, t) / sp.diff(x101, t)
    d2_101 = sp.diff(d1_101, t) / sp.diff(x101, t)
    d3_101 = sp.diff(d2_101, t) / sp.diff(x101, t)
    check_eq("jc935-2-4-10-1-d1", "d1", d1_101, sp.Rational(3, 2) * t + sp.Rational(3, 2) / t)
    check_eq("jc935-2-4-10-1-d2", "d2", d2_101, sp.Rational(3, 4) / t - sp.Rational(3, 4) / t**3)
    check_eq("jc935-2-4-10-1-d3", "d3", d3_101, 3 * (3 - t**2) / (8 * t**5))

    # 53. jc935-2-4-10-2: x = ln(4 + t^2), y = t - 2 arctan(t/2)
    x102, y102 = sp.log(4 + t**2), t - 2 * sp.atan(t / 2)
    d1_102 = sp.simplify(sp.diff(y102, t) / sp.diff(x102, t))
    d2_102 = sp.simplify(sp.diff(d1_102, t) / sp.diff(x102, t))
    d3_102 = sp.simplify(sp.diff(d2_102, t) / sp.diff(x102, t))
    check_eq("jc935-2-4-10-2-d1", "d1", d1_102, t / 2)
    check_eq("jc935-2-4-10-2-d2", "d2", d2_102, 1 / t + t / 4)
    check_eq("jc935-2-4-10-2-d3", "d3", d3_102, (t**4 - 16) / (8 * t**3))

    # 54. jc935-2-4-11: S = pi r^2, dr/dt = 4, r(0) = 0, t = 3
    r_t = 4 * t
    S_t = sp.pi * r_t**2
    assert sp.diff(S_t, t).subs(t, 3) == 96 * sp.pi

    # 55. jc935-2-4-12: cone H=12, R=3, dV/dt=3, h=4
    h_sym = sp.Symbol("h", positive=True)
    V_h = sp.Rational(1, 3) * sp.pi * (h_sym / 4) ** 2 * h_sym
    dh_dt = 3 / sp.diff(V_h, h_sym)
    assert dh_dt.subs(h_sym, 4) == 3 / sp.pi

    # 56. jc935-2-4-13: funnel H0=15, R1=5 -> cyl R2=4, H=9, dH/dt=-2
    H_sym = sp.Symbol("H", positive=True)
    V_funnel = sp.Rational(1, 3) * sp.pi * (H_sym / 3) ** 2 * H_sym
    dh_dt_13 = (-sp.diff(V_funnel, H_sym) * (-2)) / (16 * sp.pi)
    assert dh_dt_13.subs(H_sym, 9) == sp.Rational(9, 8)


if __name__ == "__main__":
    verify_sec3()
    verify_sec4()
    print("OK: all 56 problems in ch2Sec3to4 verified by SymPy.")
