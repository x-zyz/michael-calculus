import sympy as sp

x, y, t, theta = sp.symbols("x y t theta", real=True)
C, C1, C2, C3 = sp.symbols("C C1 C2 C3", real=True)
a, b, k, m, g = sp.symbols("a b k m g", positive=True)


def check_zero(name, expr):
    simplified = sp.simplify(sp.expand(expr))
    if simplified != 0:
        simplified = sp.trigsimp(simplified)
    if simplified != 0:
        simplified = sp.radsimp(simplified)
    if simplified != 0:
        simplified = sp.simplify(sp.powsimp(simplified, force=True))
    assert simplified == 0, f"[{name}] FAILED: got {simplified}"
    print(f"[PASS] {name}")


def check_ode_explicit(name, sol, ode_fn, var=x, ics=None):
    res = ode_fn(sol)
    check_zero(f"{name} (ODE)", res)
    if ics:
        for idx, (pt, order, val) in enumerate(ics):
            d_sol = sp.diff(sol, var, order).subs(var, pt)
            check_zero(f"{name} (IC {idx + 1})", d_sol - val)


def check_ode_implicit(name, F_xy, ode_sub_fn):
    # F(x, y, C) = 0 => dy/dx = -Fx / Fy, then eliminate C using F(x, y, C) = 0
    Fx = sp.diff(F_xy, x)
    Fy = sp.diff(F_xy, y)
    yp = -Fx / Fy
    if C in F_xy.free_symbols:
        c_sol = sp.solve(F_xy, C)[0]
        yp = sp.simplify(yp.subs(C, c_sol))
    res = ode_sub_fn(yp)
    check_zero(f"{name} (implicit ODE)", res)


def main():
    # ==================== 习题 7-4 ====================
    # 7-4-1-1: y' + 2y = 3e^{-2x}
    sol = sp.exp(-2 * x) * (3 * x + C)
    check_ode_explicit("jc935-7-4-1-1", sol, lambda u: sp.diff(u, x) + 2 * u - 3 * sp.exp(-2 * x))

    # 7-4-1-2: xy' + y = 3x^2 - 4x + 5
    sol = x**2 - 2 * x + 5 + C / x
    check_ode_explicit("jc935-7-4-1-2", sol, lambda u: x * sp.diff(u, x) + u - (3 * x**2 - 4 * x + 5))

    # 7-4-1-3: y' - y sin x = 2 e^{-cos x}
    sol = sp.exp(-sp.cos(x)) * (2 * x + C)
    check_ode_explicit("jc935-7-4-1-3", sol, lambda u: sp.diff(u, x) - u * sp.sin(x) - 2 * sp.exp(-sp.cos(x)))

    # 7-4-1-4: y' - y cot x = sin 2x
    sol = 2 * sp.sin(x) ** 2 + C * sp.sin(x)
    check_ode_explicit("jc935-7-4-1-4", sol, lambda u: sp.diff(u, x) - u * sp.cot(x) - sp.sin(2 * x))

    # 7-4-1-5: (x^2 + 4)y' + 2xy - sin x = 0
    sol = (C - sp.cos(x)) / (x**2 + 4)
    check_ode_explicit("jc935-7-4-1-5", sol, lambda u: (x**2 + 4) * sp.diff(u, x) + 2 * x * u - sp.sin(x))

    # 7-4-1-6: d\rho/d\theta + 4\rho = 6
    sol = sp.Rational(3, 2) + C * sp.exp(-4 * theta)
    check_ode_explicit("jc935-7-4-1-6", sol, lambda u: sp.diff(u, theta) + 4 * u - 6, var=theta)

    # 7-4-1-7: y' + 4xy = 12x
    sol = 3 + C * sp.exp(-2 * x**2)
    check_ode_explicit("jc935-7-4-1-7", sol, lambda u: sp.diff(u, x) + 4 * x * u - 12 * x)

    # 7-4-1-8: y ln y dx + (x - 2 ln^2 y) dy = 0 => dx/dy + x/(y ln y) = 2 ln y / y
    sol_x = sp.Rational(2, 3) * sp.log(y) ** 2 + C / sp.log(y)
    check_ode_explicit(
        "jc935-7-4-1-8",
        sol_x,
        lambda u: y * sp.log(y) * sp.diff(u, y) + (u - 2 * sp.log(y) ** 2),
        var=y,
    )

    # 7-4-1-9: (x + 3)y' = y + 3(x + 3)^4
    sol = (x + 3) ** 4 + C * (x + 3)
    check_ode_explicit("jc935-7-4-1-9", sol, lambda u: (x + 3) * sp.diff(u, x) - u - 3 * (x + 3) ** 4)

    # 7-4-1-10: (y^3 - 4x)y' + y = 0 => y dx/dy + y^3 - 4x = 0
    sol_x = y**3 + C * y**4
    check_ode_explicit("jc935-7-4-1-10", sol_x, lambda u: y * sp.diff(u, y) + y**3 - 4 * u, var=y)

    # 7-4-2-1: y' + y tan x = 2 sec x, y(0) = 1
    sol = 2 * sp.sin(x) + sp.cos(x)
    check_ode_explicit(
        "jc935-7-4-2-1",
        sol,
        lambda u: sp.diff(u, x) + u * sp.tan(x) - 2 / sp.cos(x),
        ics=[(0, 0, 1)],
    )

    # 7-4-2-2: y' + y/x = cos x / x, y(pi/2) = 2
    sol = (sp.sin(x) + sp.pi - 1) / x
    check_ode_explicit(
        "jc935-7-4-2-2",
        sol,
        lambda u: sp.diff(u, x) + u / x - sp.cos(x) / x,
        ics=[(sp.pi / 2, 0, 2)],
    )

    # 7-4-2-3: y' + y cot x = 3 e^{cos x}, y(pi/2) = 2
    sol = (5 - 3 * sp.exp(sp.cos(x))) / sp.sin(x)
    check_ode_explicit(
        "jc935-7-4-2-3",
        sol,
        lambda u: sp.diff(u, x) + u * sp.cot(x) - 3 * sp.exp(sp.cos(x)),
        ics=[(sp.pi / 2, 0, 2)],
    )

    # 7-4-2-4: y' + 2y = 10, y(0) = 3
    sol = 5 - 2 * sp.exp(-2 * x)
    check_ode_explicit(
        "jc935-7-4-2-4",
        sol,
        lambda u: sp.diff(u, x) + 2 * u - 10,
        ics=[(0, 0, 3)],
    )

    # 7-4-2-5: y' + (3 - 4x^3)/x^4 * y = 1, y(1) = 0
    sol = x**4 / 3 * (1 - sp.exp(1 / x**3 - 1))
    check_ode_explicit(
        "jc935-7-4-2-5",
        sol,
        lambda u: sp.diff(u, x) + (3 - 4 * x**3) / x**4 * u - 1,
        ics=[(1, 0, 0)],
    )

    # 7-4-2-6: x(4 + x^2)y' + 4y = 4 + x^2, y(2) = 0
    xp = sp.Symbol("xp", positive=True)
    sol = sp.sqrt(4 + xp**2) / xp * sp.log((xp + sp.sqrt(4 + xp**2)) / (2 * (1 + sp.sqrt(2))))
    check_ode_explicit(
        "jc935-7-4-2-6",
        sol,
        lambda u: xp * (4 + xp**2) * sp.diff(u, xp) + 4 * u - (4 + xp**2),
        var=xp,
        ics=[(2, 0, 0)],
    )

    # 7-4-3: y' = 3x + y, y(0) = 1
    sol = 4 * sp.exp(x) - 3 * x - 3
    check_ode_explicit("jc935-7-4-3", sol, lambda u: sp.diff(u, x) - (3 * x + u), ics=[(0, 0, 1)])

    # 7-4-4: m dv/dt = a t - b v, v(0) = 0
    sol = a / b * t - a * m / b**2 * (1 - sp.exp(-b / m * t))
    check_ode_explicit(
        "jc935-7-4-4",
        sol,
        lambda u: m * sp.diff(u, t) - (a * t - b * u),
        var=t,
        ics=[(0, 0, 0)],
    )

    # 7-4-5: 3 di/dt + 12 i = 24 sin 4t, i(0) = 0
    sol = sp.exp(-4 * t) + sp.sin(4 * t) - sp.cos(4 * t)
    check_ode_explicit(
        "jc935-7-4-5",
        sol,
        lambda u: 3 * sp.diff(u, t) + 12 * u - 24 * sp.sin(4 * t),
        var=t,
        ics=[(0, 0, 0)],
    )
    check_zero("jc935-7-4-5 (trig form)", sol - (sp.exp(-4 * t) + sp.sqrt(2) * sp.sin(4 * t - sp.pi / 4)))

    # 7-4-6: y P(xy) dx + x Q(xy) dy = 0 with u = xy
    u_fn = sp.Function("u")(x)
    P_fn = sp.Function("P")
    Q_fn = sp.Function("Q")
    y_sub = u_fn / x
    lhs = y_sub * P_fn(u_fn) + x * Q_fn(u_fn) * sp.diff(y_sub, x)
    expected = (u_fn * (P_fn(u_fn) - Q_fn(u_fn)) + x * Q_fn(u_fn) * sp.diff(u_fn, x)) / x
    check_zero("jc935-7-4-6 (substitution identity)", lhs - expected)

    # 7-4-7-1: y' = (x + y)^2 + 3
    sol = -x + 2 * sp.tan(2 * x + C)
    check_ode_explicit("jc935-7-4-7-1", sol, lambda u: sp.diff(u, x) - ((x + u) ** 2 + 3))

    # 7-4-7-2: y' = 2/(2x - y) + 2, implicit: (2x - y)^2 + 4x = C
    check_ode_implicit(
        "jc935-7-4-7-2",
        (2 * x - y) ** 2 + 4 * x - C,
        lambda yp: yp - (2 / (2 * x - y) + 2),
    )

    # 7-4-7-3: xy' + y = 2y ln(xy)
    xp = sp.Symbol("xp", positive=True)
    sol = sp.exp(C * xp**2) / xp
    check_ode_explicit(
        "jc935-7-4-7-3",
        sol,
        lambda u: xp * sp.diff(u, xp) + u - 2 * u * sp.log(xp * u),
        var=xp,
    )

    # 7-4-7-4: y' = y^2 + 2(cos x + 1)y + cos^2 x + 2 cos x + sin x + 1
    sol = -1 - sp.cos(x) - 1 / (x + C)
    check_ode_explicit(
        "jc935-7-4-7-4",
        sol,
        lambda u: sp.diff(u, x)
        - (u**2 + 2 * (sp.cos(x) + 1) * u + sp.cos(x) ** 2 + 2 * sp.cos(x) + sp.sin(x) + 1),
    )

    # 7-4-7-5: y(2xy + 1)dx + x(1 + 2xy + x^2 y^2)dy = 0
    # Implicit: 2 x^2 y^2 ln|y| - 4xy - 1 - C x^2 y^2 = 0
    yp_sym = sp.Symbol("yp_sym", positive=True)
    F_75 = 2 * x**2 * yp_sym**2 * sp.log(yp_sym) - 4 * x * yp_sym - 1 - C * x**2 * yp_sym**2
    Fx = sp.diff(F_75, x)
    Fy = sp.diff(F_75, yp_sym)
    dydx = -Fx / Fy
    # Note: substituting C = (2 x^2 y^2 ln y - 4xy - 1)/(x^2 y^2) into dydx
    C_expr = (2 * x**2 * yp_sym**2 * sp.log(yp_sym) - 4 * x * yp_sym - 1) / (x**2 * yp_sym**2)
    dydx_clean = sp.simplify(dydx.subs(C, C_expr))
    check_zero(
        "jc935-7-4-7-5",
        yp_sym * (2 * x * yp_sym + 1) + x * (1 + 2 * x * yp_sym + x**2 * yp_sym**2) * dydx_clean,
    )

    # 7-4-8-1: y' - y = y^2 (cos x + sin x)
    sol = 1 / (C * sp.exp(-x) - sp.sin(x))
    check_ode_explicit(
        "jc935-7-4-8-1",
        sol,
        lambda u: sp.diff(u, x) - u - u**2 * (sp.cos(x) + sp.sin(x)),
    )

    # 7-4-8-2: y' - 2xy = 4xy^2
    sol = 1 / (-2 + C * sp.exp(-(x**2)))
    check_ode_explicit("jc935-7-4-8-2", sol, lambda u: sp.diff(u, x) - 2 * x * u - 4 * x * u**2)

    # 7-4-8-3: y' + (1/2)y = (1/2)(1 - 3x)y^3 => y^{-2} = C e^x - 3x - 2
    check_ode_implicit(
        "jc935-7-4-8-3",
        y ** (-2) - (C * sp.exp(x) - 3 * x - 2),
        lambda yp: yp + sp.Rational(1, 2) * y - sp.Rational(1, 2) * (1 - 3 * x) * y**3,
    )

    # 7-4-8-4: y' - y = 2xy^4 => y^{-3} = -2x + 2/3 + C e^{-3x}
    check_ode_implicit(
        "jc935-7-4-8-4",
        y ** (-3) - (-2 * x + sp.Rational(2, 3) + C * sp.exp(-3 * x)),
        lambda yp: yp - y - 2 * x * y**4,
    )

    # 7-4-8-5: x dy - [y + 2xy^3 ln x] dx = 0 => y^{-2} = -(4/3)x ln x + (4/9)x + C/x^2
    check_ode_implicit(
        "jc935-7-4-8-5",
        y ** (-2) - (-sp.Rational(4, 3) * x * sp.log(x) + sp.Rational(4, 9) * x + C / x**2),
        lambda yp: x * yp - (y + 2 * x * y**3 * sp.log(x)),
    )

    # ==================== 习题 7-5 ====================
    # 7-5-1-1: y'' = 2x + cos x
    sol = x**3 / 3 - sp.cos(x) + C1 * x + C2
    check_ode_explicit("jc935-7-5-1-1", sol, lambda u: sp.diff(u, x, 2) - (2 * x + sp.cos(x)))

    # 7-5-1-2: y''' = x e^{-x}
    sol = -(x + 3) * sp.exp(-x) + C1 * x**2 + C2 * x + C3
    check_ode_explicit("jc935-7-5-1-2", sol, lambda u: sp.diff(u, x, 3) - x * sp.exp(-x))

    # 7-5-1-3: y'' = 1 / (4 + x^2)
    sol = x / 2 * sp.atan(x / 2) - sp.Rational(1, 2) * sp.log(4 + x**2) + C1 * x + C2
    check_ode_explicit("jc935-7-5-1-3", sol, lambda u: sp.diff(u, x, 2) - 1 / (4 + x**2))

    # 7-5-1-4: y'' = 4 + y'^2
    sol = -sp.log(sp.cos(2 * x + C1)) + C2
    check_ode_explicit("jc935-7-5-1-4", sol, lambda u: sp.diff(u, x, 2) - (4 + sp.diff(u, x) ** 2))

    # 7-5-1-5: y'' = 2y' + 4x
    sol = C1 * sp.exp(2 * x) - x**2 - x + C2
    check_ode_explicit("jc935-7-5-1-5", sol, lambda u: sp.diff(u, x, 2) - (2 * sp.diff(u, x) + 4 * x))

    # 7-5-1-6: x y'' + 2y' = 0
    sol = C1 / x + C2
    check_ode_explicit("jc935-7-5-1-6", sol, lambda u: x * sp.diff(u, x, 2) + 2 * sp.diff(u, x))

    # 7-5-1-7: y y'' + 3 y'^2 = 0 => y^4 = C1 x + C2
    sol = (C1 * x + C2) ** sp.Rational(1, 4)
    check_ode_explicit("jc935-7-5-1-7", sol, lambda u: u * sp.diff(u, x, 2) + 3 * sp.diff(u, x) ** 2)

    # 7-5-1-8: y^3 y'' - 4 = 0 => C1 y^2 - 4 = (C1 x + C2)^2
    c1p = sp.Symbol("c1p", positive=True)
    sol = sp.sqrt(((c1p * x + C2) ** 2 + 4) / c1p)
    check_ode_explicit("jc935-7-5-1-8", sol, lambda u: u**3 * sp.diff(u, x, 2) - 4)

    # 7-5-1-9: y'' = 1 / (4 sqrt(y))
    # x = 4/3 (sqrt(y)+C1)^{3/2} - 4 C1 (sqrt(y)+C1)^{1/2} + C2
    yp_pos = sp.Symbol("yp_pos", positive=True)
    x_of_y = sp.Rational(4, 3) * (sp.sqrt(yp_pos) + C1) ** sp.Rational(3, 2) - 4 * C1 * sp.sqrt(sp.sqrt(yp_pos) + C1) + C2
    dx_dy = sp.simplify(sp.diff(x_of_y, yp_pos))
    dy_dx = 1 / dx_dy
    d2y_dx2 = sp.simplify(sp.diff(dy_dx, yp_pos) * dy_dx)
    check_zero("jc935-7-5-1-9", d2y_dx2 - 1 / (4 * sp.sqrt(yp_pos)))

    # 7-5-1-10: y'' = 2 y'^3 + 2 y' => y = (1/2) arcsin(C2 e^{2x}) + C1/2
    sol = sp.Rational(1, 2) * sp.asin(C2 * sp.exp(2 * x)) + C1 / 2
    check_ode_explicit(
        "jc935-7-5-1-10",
        sol,
        lambda u: sp.diff(u, x, 2) - (2 * sp.diff(u, x) ** 3 + 2 * sp.diff(u, x)),
    )

    # 7-5-2: [f'(x)]^2 = 2 f(x) + 2 \int_0^x [f'(t)]^3 dt, f'(0) = 1
    sol = -sp.log(sp.cos(x + sp.pi / 4)) + sp.Rational(1, 2) - sp.Rational(1, 2) * sp.log(2)
    check_ode_explicit(
        "jc935-7-5-2",
        sol,
        lambda u: sp.diff(u, x, 2) - (1 + sp.diff(u, x) ** 2),
        ics=[(0, 0, sp.Rational(1, 2)), (0, 1, 1)],
    )
    # Also verify the integral equation directly by differentiating RHS - LHS and checking x=0
    fp = sp.diff(sol, x)
    check_zero("jc935-7-5-2 (integral eq diff)", sp.diff(fp**2, x) - (2 * fp + 2 * fp**3))

    # 7-5-3-1: y^3 y'' + 4 = 0, y(1) = 2, y'(1) = 0
    sol = sp.sqrt(3 + 2 * x - x**2)
    check_ode_explicit(
        "jc935-7-5-3-1",
        sol,
        lambda u: u**3 * sp.diff(u, x, 2) + 4,
        ics=[(1, 0, 2), (1, 1, 0)],
    )

    # 7-5-3-2: y'' - k y'^2 = 0, y(0) = 1, y'(0) = -1
    sol = 1 - sp.log(k * x + 1) / k
    check_ode_explicit(
        "jc935-7-5-3-2",
        sol,
        lambda u: sp.diff(u, x, 2) - k * sp.diff(u, x) ** 2,
        ics=[(0, 0, 1), (0, 1, -1)],
    )

    # 7-5-3-3: y''' = e^{kx}, y(0) = y'(0) = y''(0) = 0
    sol = (sp.exp(k * x) - 1) / k**3 - x / k**2 - x**2 / (2 * k)
    check_ode_explicit(
        "jc935-7-5-3-3",
        sol,
        lambda u: sp.diff(u, x, 3) - sp.exp(k * x),
        ics=[(0, 0, 0), (0, 1, 0), (0, 2, 0)],
    )

    # 7-5-3-4: y'' = 2 e^{4y}, y(0) = 0, y'(0) = 0
    sol = -sp.Rational(1, 2) * sp.log(sp.cos(2 * x))
    check_ode_explicit(
        "jc935-7-5-3-4",
        sol,
        lambda u: sp.diff(u, x, 2) - 2 * sp.exp(4 * u),
        ics=[(0, 0, 0), (0, 1, 0)],
    )

    # 7-5-3-5: y'' = 12 sqrt(y), y(0) = 1, y'(0) = 4
    sol = (x + 1) ** 4
    # On x > -1, sqrt((x+1)^4) = (x+1)^2
    check_ode_explicit(
        "jc935-7-5-3-5",
        sol,
        lambda u: sp.diff(u, x, 2) - 12 * (x + 1) ** 2,
        ics=[(0, 0, 1), (0, 1, 4)],
    )

    # 7-5-3-6: y'' + 2 y'^2 = 2, y(0) = 0, y'(0) = 0
    sol = sp.Rational(1, 2) * sp.log((sp.exp(2 * x) + sp.exp(-2 * x)) / 2)
    check_ode_explicit(
        "jc935-7-5-3-6",
        sol,
        lambda u: sp.diff(u, x, 2) + 2 * sp.diff(u, x) ** 2 - 2,
        ics=[(0, 0, 0), (0, 1, 0)],
    )

    # 7-5-4: y'' = 6x, y(0) = 2, y'(0) = 3
    sol = x**3 + 3 * x + 2
    check_ode_explicit(
        "jc935-7-5-4",
        sol,
        lambda u: sp.diff(u, x, 2) - 6 * x,
        ics=[(0, 0, 2), (0, 1, 3)],
    )

    # 7-5-5: m s'' = m g - k s', s(0) = 0, s'(0) = 0
    sol = m * g / k * t + m**2 * g / k**2 * (sp.exp(-k / m * t) - 1)
    check_ode_explicit(
        "jc935-7-5-5",
        sol,
        lambda u: m * sp.diff(u, t, 2) - (m * g - k * sp.diff(u, t)),
        var=t,
        ics=[(0, 0, 0), (0, 1, 0)],
    )

    print("\nALL 49 ITEMS SYMBOLICALLY VERIFIED!")


if __name__ == "__main__":
    main()
