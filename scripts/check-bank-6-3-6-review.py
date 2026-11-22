"""Symbolic verification for bankIntegralPhysicsReview (6-3 & 6-review)."""

from __future__ import annotations

import sympy as sp


def check_eq(name: str, lhs: sp.Expr, rhs: sp.Expr) -> None:
    diff = sp.simplify(lhs - rhs)
    assert diff == 0, f"{name} failed: lhs={lhs}, rhs={rhs}, diff={diff}"
    print(f"[PASS] {name}: {sp.simplify(lhs)}")


def main() -> None:
    x, y, t, s, h, theta = sp.symbols("x y t s h theta", real=True)
    k, c, a, b, d, r, q = sp.symbols("k c a b d r q", positive=True)
    R, H, L, w, m, g, g0, G, lam, rho, alpha = sp.symbols(
        "R H L w m g g0 G lam rho alpha", positive=True
    )

    # ==================== 6-3 ====================
    # 6-3-1: Spring work, F = k*s, s in [0, 8] cm
    w_6_3_1 = sp.integrate(k * s, (s, 0, 8))
    check_eq("jc935-6-3-1 (N*cm)", w_6_3_1, 32 * k)
    check_eq("jc935-6-3-1 (J)", w_6_3_1 / 100, sp.Rational(8, 25) * k)

    # 6-3-2: Isothermal compression, diameter 40 cm (r=0.2 m), height 1 m, p0=5 N/cm^2 = 50000 N/m^2
    # Compress to 1/3 volume -> h from 0 to 2/3
    S_area = sp.pi * sp.Rational(1, 5) ** 2
    C_gas = 50000 * S_area * 1
    check_eq("jc935-6-3-2 C_gas", C_gas, 2000 * sp.pi)
    w_6_3_2 = sp.integrate(C_gas / (1 - h), (h, 0, sp.Rational(2, 3)))
    check_eq("jc935-6-3-2", w_6_3_2, 2000 * sp.pi * sp.log(3))

    # 6-3-3-1: Gravitational work lifting mass m from R to R+H
    w_6_3_3_1 = sp.integrate(m * g0 * R**2 / x**2, (x, R, R + H))
    check_eq("jc935-6-3-3-1", w_6_3_3_1, m * g0 * R * H / (R + H))

    # 6-3-3-2: Numerical satellite work (m=250 kg, H=600 km, R=6400 km, g=9.8 m/s^2)
    w_6_3_3_2 = (
        250 * sp.Rational(49, 5) * (6400 * 1000) * (600 * 1000) / ((6400 + 600) * 1000)
    )
    check_eq("jc935-6-3-3-2 (kJ)", w_6_3_3_2 / 1000, sp.Integer(1344000))

    # 6-3-4: x = c*t^2, resistance R = k*v^3, from x=0 to x=a
    v_expr = sp.diff(c * t**2, t)
    dx_dt = v_expr
    T_end = sp.sqrt(a / c)
    w_6_3_4 = sp.integrate(k * v_expr**3 * dx_dt, (t, 0, T_end))
    check_eq(
        "jc935-6-3-4",
        w_6_3_4,
        sp.Rational(16, 5) * k * c ** sp.Rational(3, 2) * a ** sp.Rational(5, 2),
    )

    # 6-3-5: Driving a stake, R = k*h, first blow 2 cm, equal work on second blow
    w1_6_3_5 = sp.integrate(k * h, (h, 0, 2))
    h0 = sp.Symbol("h0", positive=True)
    w2_6_3_5 = sp.integrate(k * h, (h, 2, 2 + h0))
    sol_h0 = sp.solve(sp.Eq(w2_6_3_5, w1_6_3_5), h0)
    assert len(sol_h0) == 1
    check_eq("jc935-6-3-5", sol_h0[0], 2 * (sp.sqrt(2) - 1))

    # 6-3-6: Conical tank, depth 12 m, top diameter 16 m (radius 8 m)
    w_6_3_6 = sp.integrate(
        rho * g * sp.pi * (sp.Rational(2, 3) * y) ** 2 * (12 - y), (y, 0, 12)
    )
    check_eq("jc935-6-3-6", w_6_3_6, 768 * sp.pi * rho * g)

    # 6-3-7: Vertical rectangular gate w x H split by diagonal
    p1_6_3_7 = sp.integrate(rho * g * y * w * (1 - y / H), (y, 0, H))
    p2_6_3_7 = sp.integrate(rho * g * y * w * (y / H), (y, 0, H))
    check_eq("jc935-6-3-7 P1", p1_6_3_7, rho * g * w * H**2 / 6)
    check_eq("jc935-6-3-7 P2", p2_6_3_7, rho * g * w * H**2 / 3)
    check_eq("jc935-6-3-7 ratio", p2_6_3_7 - 2 * p1_6_3_7, sp.Integer(0))

    # 6-3-8: Trapezoid gate, top 12 m (surface), bottom 8 m, height 10 m
    f_6_3_8 = sp.integrate(rho * g * y * (12 - sp.Rational(2, 5) * y), (y, 0, 10))
    check_eq("jc935-6-3-8", f_6_3_8, sp.Rational(1400, 3) * rho * g)

    # 6-3-9: Submerged triangle, base 10 cm, height 9 cm, vertex 6 cm below surface
    f_6_3_9 = sp.integrate(
        rho * g * (x + sp.Rational(6, 100)) * (sp.Rational(10, 9) * x),
        (x, 0, sp.Rational(9, 100)),
    )
    check_eq("jc935-6-3-9", f_6_3_9, sp.Rational(27, 50000) * rho * g)
    check_eq(
        "jc935-6-3-9 (N)",
        f_6_3_9.subs({rho: 1000, g: sp.Rational(49, 5)}),
        sp.Rational(1323, 250),
    )

    # 6-3-10: Uniform rod on [0, L], point mass at (d, 0)
    fx_6_3_10 = sp.integrate(-G * m * lam * d / (d**2 + y**2) ** sp.Rational(3, 2), (y, 0, L))
    fy_6_3_10 = sp.integrate(G * m * lam * y / (d**2 + y**2) ** sp.Rational(3, 2), (y, 0, L))
    check_eq("jc935-6-3-10 Fx", fx_6_3_10, -G * m * lam * L / (d * sp.sqrt(d**2 + L**2)))
    check_eq(
        "jc935-6-3-10 Fy",
        fy_6_3_10,
        G * m * lam * (1 / d - 1 / sp.sqrt(d**2 + L**2)),
    )

    # 6-3-11: Circular arc wire of radius r, central angle 2*alpha
    fx_6_3_11 = sp.integrate(G * m * lam * sp.cos(theta) / r, (theta, -alpha, alpha))
    fy_6_3_11 = sp.integrate(G * m * lam * sp.sin(theta) / r, (theta, -alpha, alpha))
    check_eq("jc935-6-3-11 Fx", fx_6_3_11, 2 * G * m * lam * sp.sin(alpha) / r)
    check_eq("jc935-6-3-11 Fy", fy_6_3_11, sp.Integer(0))

    # ==================== 6-review ====================
    # 6-review-1-1: Area of y = x^3 - 5x^2 + 4x with x-axis
    f_r1_1 = x**3 - 5 * x**2 + 4 * x
    area_r1_1 = sp.integrate(f_r1_1, (x, 0, 1)) - sp.integrate(f_r1_1, (x, 1, 4))
    check_eq("jc935-6-review-1-1", area_r1_1, sp.Rational(71, 6))

    # 6-review-1-2: Arc length of y = (sqrt(x)/6)*(12 - x) on [1, 4]
    y_r1_2 = sp.sqrt(x) * (12 - x) / 6
    ds_r1_2 = sp.simplify(sp.sqrt(1 + sp.diff(y_r1_2, x) ** 2))
    arc_r1_2 = sp.integrate(ds_r1_2, (x, 1, 4))
    check_eq("jc935-6-review-1-2", arc_r1_2, sp.Rational(19, 6))

    # 6-review-2-1: Rod on [0, L], point mass at L + d
    f_r2_1 = sp.integrate(G * m * lam / (L + d - x) ** 2, (x, 0, L))
    check_eq("jc935-6-review-2-1", f_r2_1, G * m * lam * L / (d * (L + d)))

    # 6-review-2-2 is a pure inequality proof (verified manually; sanity check with f(x)=1/x on [1,2])
    f_test = 1 / x
    i1 = sp.integrate(f_test, (x, 1, 2))
    i2 = f_test.subs(x, 2) * (2 - 1)
    i3 = sp.Rational(1, 2) * (f_test.subs(x, 1) + f_test.subs(x, 2)) * (2 - 1)
    assert i2 < i1 < i3, "Sanity check for jc935-6-review-2-2 failed"
    print("[PASS] jc935-6-review-2-2 (sanity check with f(x)=1/x on [1,2])")

    # 6-review-2-3: Napkin ring volume V = (pi/6) H^3
    # Using washer method along y in [-H/2, H/2], R^2 - r^2 = H^2 / 4
    v_r2_3 = sp.integrate(sp.pi * (H**2 / 4 - y**2), (y, -H / 2, H / 2))
    check_eq("jc935-6-review-2-3", v_r2_3, sp.pi * H**3 / 6)

    # 6-review-3: Rod length 8 m, density 1/sqrt(1+x), half-mass point
    m_x = sp.integrate(1 / sp.sqrt(1 + t), (t, 0, x))
    m_total = m_x.subs(x, 8)
    check_eq("jc935-6-review-3 total mass", m_total, sp.Integer(4))
    sol_r3 = sp.solve(sp.Eq(m_x, m_total / 2), x)
    check_eq("jc935-6-review-3 x", sol_r3[0], sp.Integer(3))

    # 6-review-4: Common area of rho = 2a cos(theta) and rho = 2a(cos(theta)+sin(theta))
    a_r4 = sp.Rational(1, 2) * sp.integrate(
        (2 * a * (sp.cos(theta) + sp.sin(theta))) ** 2, (theta, -sp.pi / 4, 0)
    ) + sp.Rational(1, 2) * sp.integrate((2 * a * sp.cos(theta)) ** 2, (theta, 0, sp.pi / 2))
    check_eq("jc935-6-review-4", a_r4, a**2 * (sp.pi - 1))

    # 6-review-5: Equal areas A and B with y=x^2, y=4x^2, and C: x = f(y)
    B_y = sp.integrate(4 * x**2 - x**2, (x, 0, sp.sqrt(y) / 2))
    f_y = sp.simplify(sp.sqrt(y) / 2 - sp.diff(B_y, y))
    check_eq("jc935-6-review-5 f(y)", f_y, sp.Rational(5, 16) * sp.sqrt(y))
    # Verify A(y) == B(y)
    A_y = sp.integrate(sp.sqrt(t) / 2 - sp.Rational(5, 16) * sp.sqrt(t), (t, 0, y))
    check_eq("jc935-6-review-5 A-B", A_y, B_y)

    # 6-review-6: Parabola y = a*x^2 + b*x through (0,0), area on [0,1] is 2/3, minimize V
    a_sym, b_sym = sp.symbols("a_sym b_sym", real=True)
    area_r6 = sp.integrate(a_sym * x**2 + b_sym * x, (x, 0, 1))
    a_of_b = sp.solve(sp.Eq(area_r6, sp.Rational(2, 3)), a_sym)[0]
    v_of_b = sp.expand(
        sp.integrate(sp.pi * (a_of_b * x**2 + b_sym * x) ** 2, (x, 0, 1))
    )
    b_opt = sp.solve(sp.Eq(sp.diff(v_of_b, b_sym), 0), b_sym)[0]
    a_opt = a_of_b.subs(b_sym, b_opt)
    check_eq("jc935-6-review-6 b_opt", b_opt, sp.Integer(3))
    check_eq("jc935-6-review-6 a_opt", a_opt, sp.Rational(-5, 2))
    check_eq("jc935-6-review-6 V_min", v_of_b.subs(b_sym, b_opt), sp.pi / 2)

    # 6-review-7-1: Tangent from origin to y = ln(2x), area D
    # Tangent point (e/2, 1), tangent line x = (e/2)*y, curve x = e^y / 2
    area_r7_1 = sp.integrate(sp.exp(y) / 2 - sp.E * y / 2, (y, 0, 1))
    check_eq("jc935-6-review-7-1", area_r7_1, sp.E / 4 - sp.Rational(1, 2))

    # 6-review-7-2: Revolve D around x = e/2
    v_r7_2 = sp.integrate(
        sp.pi * ((sp.E / 2 - sp.E * y / 2) ** 2 - (sp.E / 2 - sp.exp(y) / 2) ** 2),
        (y, 0, 1),
    )
    check_eq(
        "jc935-6-review-7-2",
        v_r7_2,
        sp.pi * (5 * sp.E**2 - 12 * sp.E + 3) / 24,
    )

    # 6-review-8: y = x*e^(-2x), inflection point M(1, e^-2), tangent y = e^-2*(2-x)
    y_r8 = x * sp.exp(-2 * x)
    x_inf = sp.solve(sp.Eq(sp.diff(y_r8, x, 2), 0), x)[0]
    check_eq("jc935-6-review-8 x_inf", x_inf, sp.Integer(1))
    y_inf = y_r8.subs(x, x_inf)
    slope_inf = sp.diff(y_r8, x).subs(x, x_inf)
    tan_x_int = sp.solve(sp.Eq(y_inf + slope_inf * (x - x_inf), 0), x)[0]
    check_eq("jc935-6-review-8 x_int", tan_x_int, sp.Integer(2))
    area_r8 = sp.integrate(y_r8, (x, x_inf, sp.oo)) - sp.Rational(1, 2) * (
        tan_x_int - x_inf
    ) * y_inf
    check_eq("jc935-6-review-8", area_r8, sp.exp(-2) / 4)

    # 6-review-9: y = 3*x^(3/2), x=1, x-axis around y-axis
    v_r9 = sp.integrate(2 * sp.pi * x * (3 * x ** sp.Rational(3, 2)), (x, 0, 1))
    check_eq("jc935-6-review-9", v_r9, sp.Rational(12, 7) * sp.pi)

    # 6-review-10: Disk (x-3)^2 + y^2 <= 4 revolved around y-axis
    v_r10 = sp.integrate(
        sp.pi * ((3 + sp.sqrt(4 - y**2)) ** 2 - (3 - sp.sqrt(4 - y**2)) ** 2),
        (y, -2, 2),
    )
    check_eq("jc935-6-review-10", v_r10, 24 * sp.pi**2)

    # 6-review-11: Arc length of y = x^2 cut by x^2 + y^2 = 2
    arc_r11 = sp.integrate(sp.sqrt(1 + (2 * x) ** 2), (x, -1, 1)).rewrite(sp.log)
    check_eq(
        "jc935-6-review-11",
        arc_r11,
        sp.sqrt(5) + sp.Rational(1, 2) * sp.log(2 + sp.sqrt(5)),
    )

    # 6-review-12: Work lifting submerged sphere of radius R (same density as water)
    w_r12 = sp.integrate(rho * g * sp.pi * (R**2 - x**2) * (R + x), (x, -R, R))
    check_eq("jc935-6-review-12", w_r12, sp.Rational(4, 3) * sp.pi * rho * g * R**4)

    # 6-review-13: Oblique rectangular plate a x b at angle theta, upper edge depth d
    f_r13 = sp.integrate(rho * g * a * (d + x * sp.sin(theta)), (x, 0, b))
    check_eq("jc935-6-review-13", f_r13, rho * g * a * b * (d + b * sp.sin(theta) / 2))

    # 6-review-14: Astroid first quadrant, density k*r^3, unit mass at O
    fx_r14 = sp.integrate(
        3 * G * k * R**2 * sp.cos(t) ** 4 * sp.sin(t), (t, 0, sp.pi / 2)
    )
    fy_r14 = sp.integrate(
        3 * G * k * R**2 * sp.sin(t) ** 4 * sp.cos(t), (t, 0, sp.pi / 2)
    )
    check_eq("jc935-6-review-14 Fx", fx_r14, sp.Rational(3, 5) * G * k * R**2)
    check_eq("jc935-6-review-14 Fy", fy_r14, sp.Rational(3, 5) * G * k * R**2)
    check_eq(
        "jc935-6-review-14 |F|",
        sp.sqrt(fx_r14**2 + fy_r14**2),
        sp.Rational(3, 5) * sp.sqrt(2) * G * k * R**2,
    )

    # 6-review-15-1: Pile driver after 4 blows
    x4_sq = d**2 * (1 + q + q**2 + q**3)
    w1_15 = sp.integrate(k * x, (x, 0, d))
    x1_sq = d**2
    x2_sq = x1_sq + q * d**2
    x3_sq = x2_sq + q**2 * d**2
    x4_sq_check = x3_sq + q**3 * d**2
    check_eq("jc935-6-review-15-1", x4_sq_check, x4_sq)
    check_eq("jc935-6-review-15-1 W1", w1_15, k * d**2 / 2)

    # 6-review-15-2: Limiting depth as n -> oo (0 < q < 1)
    n_sym = sp.Symbol("n", integer=True, positive=True)
    q_sub = sp.Symbol("q_sub", positive=True)
    # Use substitution q_sub < 1 via limit of geometric sum
    x_n = d * sp.sqrt((1 - q_sub**n_sym) / (1 - q_sub))
    lim_depth = sp.limit(x_n.subs(q_sub, sp.Rational(1, 2)), n_sym, sp.oo)
    check_eq(
        "jc935-6-review-15-2 (at q=1/2)",
        lim_depth,
        d / sp.sqrt(1 - sp.Rational(1, 2)),
    )
    # Symbolic geometric series sum for |q| < 1
    geo_sum = sp.summation(q**n_sym, (n_sym, 0, sp.oo)).subs(q, sp.Rational(1, 3))
    check_eq("jc935-6-review-15-2 geo check", geo_sum, 1 / (1 - sp.Rational(1, 3)))

    print("ALL 32 CHECKS PASSED!")


if __name__ == "__main__":
    main()
